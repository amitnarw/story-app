const fs=require('fs'),path=require('path');
const p=require('./staging/plan.json');
let maxChars=0,maxWords=0,over=0,total=0,overStories=[];
for(const e of p){
  const dir=path.join('C:/Users/Narwal/Downloads/Story App 1 (1)',e.folder);
  const raw=fs.readFileSync(path.join(dir,fs.readdirSync(dir).find(f=>f.toLowerCase().endsWith('.txt'))),'utf8');
  const paras=raw.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).slice(1);
  for(const s of paras){total++;const c=s.length;const w=s.split(/\s+/).length;if(c>maxChars)maxChars=c;if(w>maxWords)maxWords=w;if(w>20||c>150)over++;}
}
console.log({total,maxChars,maxWords,over});
