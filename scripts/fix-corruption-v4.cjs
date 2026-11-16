const fs = require('fs');
const file = 'src/content/copy/hi.ts';
let content = fs.readFileSync(file, 'utf8');

// Exact corrupted text (from debug output)
const bad = "  },\r\n    ],\r\n  },\r\n  {\r\n      },\n      {\n        title: 'राज',";
// Exact replacement
const good = "  },\r\n      {\r\n        title: 'राज',";

const idx = content.indexOf(bad);
if (idx < 0) {
  console.error('Exact bad string not found!');
  // Try to find 'राज' title and show context
  const titleIdx = content.indexOf("title: 'राज'");
  if (titleIdx >= 0) {
    console.error('Found title: राज at:', titleIdx);
    console.error('Context:', JSON.stringify(content.substring(titleIdx - 200, titleIdx + 50)));
  }
  process.exit(1);
}

content = content.replace(bad, good);
fs.writeFileSync(file, content);
console.log('Fixed!');
