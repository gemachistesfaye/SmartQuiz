const fs = require('fs');
const path = './src/data/theoryVault.js';
let content = fs.readFileSync(path, 'utf8');

// The previous script added "'," but because of \r, it might have added it as \r',
// Let's fix the endings
content = content.replace(/\.',\r?',/g, "',");
content = content.replace(/\.'\r?',/g, "',");
content = content.replace(/\.\r',/g, "',");

// Just to be safe, any period followed by \r', or ', \r', or ',',
content = content.replace(/\.',',/g, "',");
content = content.replace(/\.'',/g, "',");

fs.writeFileSync(path, content);
console.log('Fixed theoryVault.js again');
