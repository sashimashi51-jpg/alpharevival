# Read the file
with open(r'c:\Users\Kubrat\Documents\AlphaRevive\alpha-revival\src\pages\ClinicalStudy.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find line numbers for removal (lines 228-248 contain the duplicate video)
# We'll identify them by looking for the "Real Results: 90-Day Transformation" heading
in_duplicate = False
duplicate_start = -1
duplicate_end = -1

for i, line in enumerate(lines, 1):
    if 'Real Results: 90-Day Transformation' in line:
        # Found the heading, go back to find the comment start
        for j in range(i-1, max(0, i-10), -1):
            if '{/* Before/After Transformation Video */}' in lines[j-1]:
                duplicate_start = j
                break
    elif duplicate_start > 0 and duplicate_end == -1:
        if '{/* Social Proof' in line:
            duplicate_end = i - 1
            break

if duplicate_start > 0 and duplicate_end > 0:
    print(f'Found duplicate from line {duplicate_start} to {duplicate_end}')
    # Remove those lines
    new_lines = lines[:duplicate_start-1] + lines[duplicate_end:]
    
    # Write back
    with open(r'c:\Users\Kubrat\Documents\AlphaRevive\alpha-revival\src\pages\ClinicalStudy.jsx', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print(f'Successfully removed {duplicate_end - duplicate_start + 1} lines')
else:
    print(f'Could not find duplicate section. Start: {duplicate_start}, End: {duplicate_end}')
