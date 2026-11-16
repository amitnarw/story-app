const fs = require('fs');
const file = 'src/content/copy/hi.ts';
const content = fs.readFileSync(file, 'utf8');

// Find 'राज' and show surrounding bytes
const idx = content.indexOf('राज');
console.log('Found राज at index:', idx);
console.log('Context (200 chars before, 100 after):');
const context = content.substring(Math.max(0, idx - 200), idx + 100);
// Show character codes for the section around title:
for (let i = 0; i < context.length; i++) {
  const c = context.charCodeAt(i);
  const ch = context[i];
  if (c < 32 || c > 126) {
    process.stdout.write(`[${c}]`);
  } else {
    process.stdout.write(ch);
  }
}
console.log('\n---');
