const fs = require('fs');
const { execSync } = require('child_process');
const id = process.env.BUILD_ID || execSync('git rev-parse --short HEAD').toString().trim();
fs.writeFileSync('./public/build-id.txt', id);
console.log('Wrote build id', id);
