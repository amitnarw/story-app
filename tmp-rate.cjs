const fs=require('fs');
const dir='C:/Users/Narwal/Downloads/Story App 1 (1)/6';
const raw=fs.readFileSync(dir+'/'+fs.readdirSync(dir).find(f=>f.toLowerCase().endsWith('.txt')),'utf8');
const body=raw.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).slice(1,13);
(async()=>{
  let ok=0,fail=0;
  for (const p of body) {
    const r=await fetch('https://www.google.com/transliterate?langpair=hi|en&text='+encodeURIComponent(p));
    if(r.ok){ok++;}else{fail++; console.log('status',r.status);}
    await new Promise(x=>setTimeout(x,350));
  }
  console.log('ok',ok,'fail',fail);
})();
