
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '../public/assets');

async function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                const newPath = fullPath.replace(ext, '.webp');
                console.log(`Converting: ${fullPath} -> ${newPath}`);

                try {
                    await sharp(fullPath)
                        .webp({ quality: 80 })
                        .toFile(newPath);

                    // Optional: Delete original if you are sure
                    // fs.unlinkSync(fullPath); 
                } catch (err) {
                    console.error(`Error converting ${fullPath}:`, err);
                }
            }
        }
    }
}

console.log('Starting image conversion...');
if (fs.existsSync(rootDir)) {
    processDirectory(rootDir).then(() => {
        console.log('All images converted!');
    });
} else {
    console.error(`Directory not found: ${rootDir}`);
}
