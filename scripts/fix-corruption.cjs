const fs = require('fs');
const file = 'src/content/copy/hi.ts';
let content = fs.readFileSync(file, 'utf8');

// Match the corrupted pattern: } , ] , } , { , } , { title: 'राज',
// With flexible whitespace/newlines between tokens
const badRegex = /  \},\s*\n\s*\]\s*\n\s*\,\s*\n\s*\{\s*\n\s*\}\s*,\s*\n\s*\{\s*\n\s*title:\s*'राज',/;
const good = `  },\r\n      {\r\n        title: 'राज',`;

if (badRegex.test(content)) {
  content = content.replace(badRegex, good);
  fs.writeFileSync(file, content);
  console.log('Fixed corrupted structure with flexible regex.');
} else {
  console.error('Bad pattern not found!');
  const idx = content.indexOf("title: 'राज'");
  if (idx >= 0) {
    console.error('Context:', JSON.stringify(content.substring(idx - 300, idx + 50)));
  }
}
