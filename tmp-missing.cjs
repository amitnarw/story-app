const fs=require('fs'),path=require('path');
const ROOT='C:/Users/Narwal/Downloads/Story App 1 (1)';
const hashes=new Map();
for(const line of fs.readFileSync('staging/hashes.tsv','utf8').split(/\r?\n/)){if(!line.trim())continue;const parts=line.split('\t');if(parts.length<3){console.log('BAD LINE',JSON.stringify(line));continue;}hashes.set(`${parts[0]}/${parts[1]}`,parts[2]);}
console.log('hash count',hashes.size);
const plan=JSON.parse(fs.readFileSync('staging/plan.json','utf8'));
for(const e of plan){const files=fs.readdirSync(path.join(ROOT,e.folder)).filter(f=>/\.(jpe?g|png)$/i.test(f));for(const f of files){if(!hashes.has(`${e.folder}/${f}`))console.log('missing',e.folder,JSON.stringify(f));}}
