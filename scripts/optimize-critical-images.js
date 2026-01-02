import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target the HUGE images identified by PageSpeed
const criticalImages = [
    'public/assets/product_photos_final/second_photo.png',
    'public/assets/product-upscaled.png',
    'public/photoassets/peter_successful_story.png',
    'public/photoassets/alexan_successful_story.png',
    'public/assets/banner_1.png',
    'public/photoassets/mitch_successful_story.png',
    'public/assets/product_photos_final/first_photo.png',
    'public/photoassets/mike_successful_story.png',
    'public/photoassets/georgig.png',
];

async function optimizeImage(relativePath) {
    const inputPath = path.join(__dirname, relativePath);

    if (!fs.existsSync(inputPath)) {
        console.log(`⊘ Skipping ${relativePath} (not found)`);
        return;
    }

    // Create WebP version with aggressive compression
    const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    try {
        const inputStats = fs.statSync(inputPath);
        const inputSize = (inputStats.size / 1024 / 1024).toFixed(2); // MB

        await sharp(inputPath)
            .resize(1200, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({
                quality: 75,  // Aggressive compression
                effort: 6     // Maximum compression effort
            })
            .toFile(outputPath);

        const outputStats = fs.statSync(outputPath);
        const outputSize = (outputStats.size / 1024 / 1024).toFixed(2); // MB
        const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

        console.log(`✓ ${path.basename(inputPath)}`);
        console.log(`  ${inputSize} MB → ${outputSize} MB (${savings}% smaller)\n`);

        return {
            input: inputSize,
            output: outputSize,
            savings: parseFloat(savings)
        };
    } catch (error) {
        console.error(`✗ Failed to optimize ${relativePath}:`, error.message);
        return null;
    }
}

async function optimizeAllCritical() {
    console.log('🚀 AGGRESSIVE IMAGE OPTIMIZATION\n');
    console.log('Target: Reduce 26 MB → ~3 MB\n');
    console.log('='.repeat(50) + '\n');

    let totalInputSize = 0;
    let totalOutputSize = 0;

    for (const imagePath of criticalImages) {
        const result = await optimizeImage(imagePath);
        if (result) {
            totalInputSize += parseFloat(result.input);
            totalOutputSize += parseFloat(result.output);
        }
    }

    console.log('='.repeat(50));
    console.log(`\n📊 RESULTS:`);
    console.log(`   Total Before: ${totalInputSize.toFixed(2)} MB`);
    console.log(`   Total After:  ${totalOutputSize.toFixed(2)} MB`);
    console.log(`   Total Saved:  ${(totalInputSize - totalOutputSize).toFixed(2)} MB (${((1 - totalOutputSize / totalInputSize) * 100).toFixed(1)}%)\n`);
    console.log(`✅ Optimization complete!`);
    console.log(`💡 Next: Update image references to use .webp extension\n`);
}

optimizeAllCritical().catch(error => {
    console.error('❌ Optimization failed:', error);
    process.exit(1);
});
