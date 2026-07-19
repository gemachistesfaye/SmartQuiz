const fs = require('fs');
let c = fs.readFileSync('src/data/theoryVault.js', 'utf8');
c = c.replace(/'self'/g, "\\'self\\'");
fs.writeFileSync('src/data/theoryVault.js', c);
