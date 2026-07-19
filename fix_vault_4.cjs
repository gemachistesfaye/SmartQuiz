const fs = require('fs');
const path = './src/data/theoryVault.js';
let content = fs.readFileSync(path, 'utf8');

let lines = content.split(/\r?\n/);

for(let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Fix title, category, subcategory, description
  if (/^\s*(title|category|subcategory|description):\s*'.*/.test(line)) {
    if (!line.endsWith("',") && !line.endsWith("',\r")) {
       line = line.replace(/['\,]+$/, '');
       lines[i] = line + "',";
    }
  }
}

// Fix content before example:
for(let i = 0; i < lines.length - 1; i++) {
  if (lines[i+1].trim().startsWith('example:')) {
    let line = lines[i];
    if (!line.endsWith("',")) {
       line = line.replace(/['\,]+$/, '');
       lines[i] = line + "',";
    }
  }
}

fs.writeFileSync(path, lines.join('\n'));
console.log('Fixed theoryVault.js strings correctly!');
