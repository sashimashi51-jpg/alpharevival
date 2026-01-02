import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');
const publicDir = path.join(__dirname, 'public');

// Track all WebP files that exist
const webpFiles = new Set();

function findWebPFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            findWebPFiles(fullPath);
        } else if (file.name.endsWith('.webp')) {
            // Store relative path from public folder
            const relativePath = fullPath.replace(publicDir + path.sep, '').replace(/\\/g, '/');
            webpFiles.add(relativePath.toLowerCase());
        }
    }
}

function updateImageReferences(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let updatedFiles = 0;
    let updatedRefs = 0;

    for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            const result = updateImageReferences(fullPath);
            updatedFiles += result.files;
            updatedRefs += result.refs;
        } else if (['.jsx', '.js', '.tsx', '.html'].some(ext => file.name.endsWith(ext))) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            const originalContent = content;
            let fileRefs = 0;

            // Replace image references: /assets/image.png -> /assets/image.webp
            content = content.replace(/(['"`])([^'"`]*\/assets\/[^'"`]*?)\.(png|jpg|jpeg)(['"`])/gi, (match, quote1, path, ext, quote2) => {
                const webpPath = `${path}.webp`;
                const checkPath = webpPath.replace(/^\//, '').toLowerCase();

                // Only replace if WebP exists
                if (webpFiles.has(checkPath)) {
                    fileRefs++;
                    return `${quote1}${webpPath}${quote2}`;
                }
                return match;
            });

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf-8');
                console.log(`✓ Updated ${file.name} (${fileRefs} references)`);
                updatedFiles++;
                updatedRefs += fileRefs;
            }
        }
    }

    return { files: updatedFiles, refs: updatedRefs };
}

console.log('🔍 Finding all WebP files...\n');
findWebPFiles(path.join(publicDir, 'assets'));
console.log(`   Found ${webpFiles.size} WebP files\n`);

console.log('🔄 Updating image references in code...\n');
const result = updateImageReferences(srcDir);

console.log(`\n✅ Update complete!`);
console.log(`   Updated ${result.files} files`);
console.log(`   Changed ${result.refs} image references to WebP`);
console.log(`\n💡 Run 'git diff' to review changes before committing`);
