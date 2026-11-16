const fs = require('fs');
const file = 'src/content/copy/hinglish.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// Lines are 0-indexed. Remove lines 962-967 (1-indexed) = indices 961-966 (0-indexed)
// These are: orphaned text line + 5 duplicate closing bracket lines
lines.splice(960, 6);

fs.writeFileSync(file, lines.join('\n'));
console.log('Removed orphaned lines. New line count:', lines.length);
