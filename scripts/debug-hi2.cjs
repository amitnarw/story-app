const fs = require('fs');
const file = 'src/content/copy/hi.ts';
const content = fs.readFileSync(file, 'utf8');

// Find 'title: ' followed by 'राज'
const regex = /title:\s*'राज'/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log('Found title: राज at index:', match.index);
  const context = content.substring(Math.max(0, match.index - 100), match.index + 100);
  // Show char codes for non-ASCII
  let debug = '';
  for (let i = 0; i < context.length; i++) {
    const c = context.charCodeAt(i);
    if (c < 32 || c > 126) {
      debug += `[${c}]`;
    } else {
      debug += context[i];
    }
  }
  console.log('Context:', debug);
  console.log('---');
}
