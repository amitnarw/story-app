const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Narwal/Downloads/Story App 1 (1)/6';
const raw = fs.readFileSync(
  path.join(dir, fs.readdirSync(dir).find((f) => f.toLowerCase().endsWith('.txt'))),
  'utf8',
);
const paras = raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean).slice(1, 5);
const joined = paras.join('\n');

(async () => {
  const url =
    'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=hi&tl=en&q=' +
    encodeURIComponent(joined);
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  const text = await response.text();
  console.log('status', response.status);
  console.log(text.slice(0, 800));
  let ok = 0;
  for (let i = 0; i < 8; i += 1) {
    const r = await fetch(
      'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=hi&tl=en&q=' +
        encodeURIComponent('यह एक परीक्षण वाक्य है।'),
      { signal: AbortSignal.timeout(20000) },
    );
    if (r.ok) ok += 1;
    else console.log('burst status', r.status);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.log('burst ok', ok, '/ 8');
})();
