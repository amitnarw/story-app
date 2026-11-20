const fs=require('fs');
const raw=fs.readFileSync('C:/Users/Narwal/Downloads/Story App 1 (1)/1/'+fs.readdirSync('C:/Users/Narwal/Downloads/Story App 1 (1)/1').find(f=>f.toLowerCase().endsWith('.txt')),'utf8');
const paras=raw.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
console.log('paras',paras.length);
paras.forEach((p,i)=>console.log(i,p.slice(0,50)));
