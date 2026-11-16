const fs = require('fs');
const file = 'src/content/copy/hi.ts';
let content = fs.readFileSync(file, 'utf8');

// Find the corrupted section by locating unique markers
const startMarker = "    ],\r\n  },\r\n  {\r\n      },\n      {\n        title: \n'राज',";
const endMarker = "'राज',\n        blocks: [";

const startIdx = content.indexOf(startMarker);
if (startIdx < 0) {
  console.error('Start marker not found!');
  // Try without \r\n
  const startMarker2 = "    ],\n  },\n  {\n      },\n      {\n        title:\n'राज',";
  const startIdx2 = content.indexOf(startMarker2);
  if (startIdx2 >= 0) {
    console.error('Found with single LF!');
    console.error('Context:', JSON.stringify(content.substring(startIdx2 - 50, startIdx2 + startMarker2.length + 50)));
  }
  process.exit(1);
}

console.log('Found start marker at:', startIdx);
console.log('Matched:', JSON.stringify(content.substring(startIdx, startIdx + startMarker.length)));

// Replace the corrupted section
// Before: "    ],\r\n  },\r\n  {\r\n      },\n      {\n        title:\n'राज',"
// After:  "      {\r\n        title: 'राज',"
const replacement = "      {\r\n        title: 'राज',";
content = content.substring(0, startIdx) + replacement + content.substring(startIdx + startMarker.length);

fs.writeFileSync(file, content);
console.log('Fixed!');
