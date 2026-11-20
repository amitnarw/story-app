const fs=require('fs');
const raw=fs.readFileSync('C:/Users/Narwal/Downloads/Story App 1 (1)/6/'+fs.readdirSync('C:/Users/Narwal/Downloads/Story App 1 (1)/6').find(f=>f.toLowerCase().endsWith('.txt')),'utf8');
const paras=raw.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
console.log(JSON.stringify(paras.slice(0,6),null,2));
