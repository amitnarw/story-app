const fs=require('fs'),path=require('path');
const p=require('./staging/plan.json');
let total=0;
for(const e of p){const f=path.join('C:/Users/Narwal/Downloads/Story App 1 (1)',e.folder,e.audioSource);total+=fs.statSync(f).size;}
console.log('stories',p.length,'audio MB',(total/1048576).toFixed(1));
const d='staging/processed';let img=0;for(const e of p){for(const f of fs.readdirSync(path.join(d,e.folder)))img+=fs.statSync(path.join(d,e.folder,f)).size;}
console.log('images MB',(img/1048576).toFixed(1));
