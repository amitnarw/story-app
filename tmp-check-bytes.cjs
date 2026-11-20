const fs = require('fs');
const text = fs.readFileSync('src/content/copy/hinglish.batch.ts', 'utf8');
const index = text.indexOf('hans kyon');
const slice = text.slice(index - 12, index + 10);
console.log(JSON.stringify(slice));
console.log([...slice].map((ch) => ch.codePointAt(0).toString(16)).join(' '));
