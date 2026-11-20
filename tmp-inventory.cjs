const fs = require('fs');
const path = require('path');
const root = 'C:/Users/Narwal/Downloads/Story App 1 (1)';
const dirs = fs.readdirSync(root, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort((a,b)=>+a-+b);
for (const d of dirs) {
  const files = fs.readdirSync(path.join(root, d));
  const txt = files.find(f => f.toLowerCase().endsWith('.txt'));
  const mp3 = files.find(f => f.toLowerCase().endsWith('.mp3'));
  let info = '';
  if (txt) {
    const p = path.join(root, d, txt);
    const buf = fs.readFileSync(p);
    let text = '';
    if (buf[0] === 0xFF && buf[1] === 0xFE) text = buf.toString('utf16le');
    else if (buf[0] === 0xFE && buf[1] === 0xFF) text = buf.swap16().toString('utf16le');
    else text = buf.toString('utf8');
    text = text.replace(/^\uFEFF/, '');
    const paras = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    info = `paras=${paras.length} chars=${text.length} first="${paras[0] ? paras[0].slice(0, 60) : ''}"`;
  } else info = 'NO TXT';
  console.log(`${d}\t${txt ? 'txt' : '-'}\t${mp3 ? 'mp3' : '-'}\t${info}`);
}
