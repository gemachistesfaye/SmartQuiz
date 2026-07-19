const fs = require('fs');
let c = fs.readFileSync('src/data/theoryVault.js', 'utf8');
let lines = c.split(/\r?\n/);

for(let i=0; i<lines.length; i++) {
  let line = lines[i];
  if (/^\s*(content|title|description|category|subcategory):\s*'(.*)',$/.test(line)) {
    let match = line.match(/^(\s*(?:content|title|description|category|subcategory):\s*')([^]*)(',)$/);
    if(match) {
      let prefix = match[1];
      let body = match[2];
      let suffix = match[3];
      
      // escape unescaped single quotes in body
      body = body.replace(/(?<!\\)'/g, "\\'");
      
      lines[i] = prefix + body + suffix;
    }
  }
}
fs.writeFileSync('src/data/theoryVault.js', lines.join('\n'));
