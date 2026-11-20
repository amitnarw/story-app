const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Narwal/Downloads/Story App 1 (1)/4';
const raw = fs.readFileSync(
  path.join(dir, fs.readdirSync(dir).find((f) => f.toLowerCase().endsWith('.txt'))),
  'utf8',
);
const body = raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean).slice(1, 7).join('\n');

(async () => {
  const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=hi&tl=en&dt=t';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'q=' + encodeURIComponent(body),
  });
  console.log('status', response.status);
  const text = await response.text();
  console.log(text.slice(0, 300));
})();
