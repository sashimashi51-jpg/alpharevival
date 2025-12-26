const fs = require('fs');
const filePath = 'c:/Users/Kubrat/Documents/AlphaRevive/alpha-revival/src/pages/ClinicalStudy.jsx';

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Define start and end markers for the duplicate video section
const startMarker = '{/* Before/After Transformation Video */}';
const endMarker = '{/* Social Proof - Testimonials Carousel */}';

// Find all occurrences of the start marker
const startOccurrences = [];
let index = 0;
while ((index = content.indexOf(startMarker, index)) !== -1) {
    startOccurrences.push(index);
    index++;
}

console.log(`Found ${startOccurrences.length} occurrences of the start marker`);

// If there are 2 occurrences, remove the second one
if (startOccurrences.length === 2) {
    const secondStart = startOccurrences[1];
    const socialProofIndex = content.indexOf(endMarker, secondStart);

    if (socialProofIndex !== -1) {
        // Find the start of the line containing the second marker
        const lineStart = content.lastIndexOf('\n', secondStart - 1) + 1;

        // Extract before and after
        const before = content.substring(0, lineStart);
        const after = content.substring(socialProofIndex);

        // Combine
        content = before + '\n                ' + after;

        // Write back
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Successfully removed duplicate video section');
    } else {
        console.log('Could not find Social Proof marker after second video');
    }
} else {
    console.log('Expected 2 occurrences but found:', startOccurrences.length);
}
