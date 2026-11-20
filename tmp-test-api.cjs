const fs=require('fs');
const dir='C:/Users/Narwal/Downloads/Story App 1 (1)/6';
const raw=fs.readFileSync(dir+'/'+fs.readdirSync(dir).find(f=>f.toLowerCase().endsWith('.txt')),'utf8');
const paras=raw.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).slice(1,8);
(async()=>{
  for(const p of paras.slice(0,3)){
    const t=await (await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=hi&tl=en&dt=t&q='+encodeURIComponent(p))).json();
    const h=await (await fetch('https://www.google.com/transliterate?langpair=hi|en&text='+encodeURIComponent(p))).json();
    console.log('HI:',p);
    console.log('EN:',t[0].map(x=>x[0]).join(''));
    console.log('HL:',h.hws&&h.hws[0]);
    console.log('');
  }
})();
