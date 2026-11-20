const fs=require('fs');
const dir='C:/Users/Narwal/Downloads/Story App 1 (1)/6';
const raw=fs.readFileSync(dir+'/'+fs.readdirSync(dir).find(f=>f.toLowerCase().endsWith('.txt')),'utf8');
const body=raw.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).slice(1);
const long=body.join(' ');
console.log('total chars',long.length);
(async()=>{
  for (const n of [120,160,200,240,300]) {
    const q=long.slice(0,n);
    const r=await fetch('https://www.google.com/transliterate?langpair=hi|en&text='+encodeURIComponent(q));
    const t=await r.text();
    let len=0, out='';
    try { const j=JSON.parse(t); out=j[0].hws[0]; len=out.length; } catch(e){ out=t.slice(0,80); }
    console.log(n, '->', len, '|', out.slice(-40));
    await new Promise(r=>setTimeout(r,500));
  }
})();
