const fs = require('fs');
const file = 'src/content/copy/hi.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// Lines are 0-indexed. Remove lines 1035-1077 (1-indexed) = indices 1034-1076 (0-indexed)
lines.splice(1034, 43); // remove 43 lines starting at index 1034

fs.writeFileSync(file, lines.join('\n'));
console.log('Removed orphaned lines. New line count:', lines.length);
