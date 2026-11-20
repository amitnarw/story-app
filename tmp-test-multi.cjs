const fs=require('fs');
const dir='C:/Users/Narwal/Downloads/Story App 1 (1)/6';
const raw=fs.readFileSync(dir+'/'+fs.readdirSync(dir).find(f=>f.toLowerCase().endsWith('.txt')),'utf8');
const paras=raw.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).slice(1,4);
(async()=>{
  const joined=paras.join('\n');
  const t=await (await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=hi&tl=en&dt=t&q='+encodeURIComponent(joined))).json();
  console.log('EN>>', t[0].map(x=>x[0]).join('').replace(/\n/g,'\\n'));
  const h=await (await fetch('https://www.google.com/transliterate?langpair=hi|en&text='+encodeURIComponent(joined))).json();
  console.log('HL>>', h[0].hws[0].replace(/\n/g,'\\n'));
})();
