import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public', 'assets');

async function convertToWebP(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .webp({ quality: 85 }) // High quality WebP
            .toFile(outputPath);

        const inputSize = fs.statSync(inputPath).size;
        const outputSize = fs.statSync(outputPath).size;
        const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

        console.log(`✓ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${savings}% smaller)`);
        return true;
    } catch (error) {
        console.error(`✗ Failed to convert ${inputPath}:`, error.message);
        return false;
    }
}

async function findAndConvertImages(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let converted = 0;
    let skipped = 0;

    for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            const result = await findAndConvertImages(fullPath);
            converted += result.converted;
            skipped += result.skipped;
        } else if (file.isFile()) {
            const ext = path.extname(file.name).toLowerCase();

            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                const webpPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

                // Skip if WebP already exists
                if (fs.existsSync(webpPath)) {
                    console.log(`⊘ Skipping ${file.name} (WebP exists)`);
                    skipped++;
                    continue;
                }

                const success = await convertToWebP(fullPath, webpPath);
                if (success) converted++;
            }
        }
    }

    return { converted, skipped };
}

console.log('🔄 Starting image conversion to WebP...\n');

findAndConvertImages(publicDir)
    .then(({ converted, skipped }) => {
        console.log(`\n✅ Conversion complete!`);
        console.log(`   Converted: ${converted} images`);
        console.log(`   Skipped: ${skipped} images (WebP already exists)`);
        console.log(`\n💡 Next: Update image references in your code to use .webp extension`);
    })
    .catch(error => {
        console.error('❌ Conversion failed:', error);
        process.exit(1);
    });
