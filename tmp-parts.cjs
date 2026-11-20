const fs=require('fs'),path=require('path');
function splitSentences(text){return text.match(/[^.!?।]+[.!?।]*/g)||[text];}
function splitForTranslit(text){const parts=[];for(const s of splitSentences(text)){let rest=s.trim();while(rest.length>110){let cut=rest.lastIndexOf(',',110);if(cut<40)cut=rest.lastIndexOf(' ',110);if(cut<40)cut=110;parts.push(rest.slice(0,cut+1).trim());rest=rest.slice(cut+1).trim();}if(rest)parts.push(rest);}return parts.filter(Boolean);}
const p=require('./staging/plan.json').slice(0,2);
for(const e of p){const dir=path.join('C:/Users/Narwal/Downloads/Story App 1 (1)',e.folder);const raw=fs.readFileSync(path.join(dir,fs.readdirSync(dir).find(f=>f.toLowerCase().endsWith('.txt'))),'utf8');const paras=raw.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);for(const s of paras){for(const part of splitForTranslit(s)){if(!/[\u0900-\u097F]/.test(part)) console.log('NOLETTER',JSON.stringify(part)); if(part.length<3) console.log('SHORT',JSON.stringify(part));}}}
console.log('ok');
