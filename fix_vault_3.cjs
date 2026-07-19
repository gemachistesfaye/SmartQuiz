const fs = require('fs');
const path = './src/data/theoryVault.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove all messed up endings that were appended
content = content.replace(/\r',/g, '\r');
content = content.replace(/',\r/g, '\r');
content = content.replace(/',',/g, "',");
content = content.replace(/\.',',/g, "',");

// 2. Properly add ', to the end of any line right before "example:" if it's missing
let lines = content.split(/\r?\n/);
let fixed = false;

for(let i = 0; i < lines.length - 1; i++) {
  if (lines[i+1].trim().startsWith('example:')) {
    let line = lines[i];
    // Remove any trailing commas or quotes first to normalize
    line = line.replace(/,+$/, '').replace(/'+$/, '');
    // Now add ',
    lines[i] = line + "',";
    fixed = true;
  }
}

if (fixed) {
  fs.writeFileSync(path, lines.join('\n'));
  console.log('Successfully fixed theoryVault.js strings');
} else {
  console.log('No fixes needed');
}
