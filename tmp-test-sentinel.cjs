const fs=require('fs');
const dir='C:/Users/Narwal/Downloads/Story App 1 (1)/6';
const raw=fs.readFileSync(dir+'/'+fs.readdirSync(dir).find(f=>f.toLowerCase().endsWith('.txt')),'utf8');
const paras=raw.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).slice(1,4);
(async()=>{
  const joined=paras.join(' ZZZ ');
  const h=await (await fetch('https://www.google.com/transliterate?langpair=hi|en&text='+encodeURIComponent(joined))).json();
  console.log(h[0].hws[0]);
})();
