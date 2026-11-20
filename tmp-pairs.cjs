const fs=require('fs'),path=require('path');
const ROOT='C:/Users/Narwal/Downloads/Story App 1 (1)';
const STAGE='staging';
const hashes=new Map();
for(const line of fs.readFileSync(path.join(STAGE,'hashes.tsv'),'utf8').split(/\r?\n/)){if(!line.trim())continue;const[f,file,h]=line.split('\t');hashes.set(`${f}/${file}`,h);}
function dist(a,b){let d=0;for(let i=0;i<a.length;i++){const x=parseInt(a[i],16)^parseInt(b[i],16);d+=(x&1)+((x>>1)&1)+((x>>2)&1)+((x>>3)&1);}return d;}
function dims(p){const buf=fs.readFileSync(p);let w=0,h=0;if(buf.slice(0,8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]))){w=buf.readUInt32BE(16);h=buf.readUInt32BE(20);}else{let i=2;while(i<buf.length){if(buf[i]!==0xff){i++;continue;}const m=buf[i+1];if(m>=0xc0&&m<=0xcf&&![0xc4,0xc8,0xcc].includes(m)){h=buf.readUInt16BE(i+5);w=buf.readUInt16BE(i+7);break;}i+=2+buf.readUInt16BE(i+2);}}return{w,h};}
const plan=JSON.parse(fs.readFileSync(path.join(STAGE,'plan.json'),'utf8'));
for(const e of plan){
  const dir=path.join(ROOT,e.folder);
  const files=fs.readdirSync(dir).filter(f=>/\.(jpe?g|png)$/i.test(f)&&f!==e.coverAltSource);
  const imgs=files.map(f=>{const d=dims(path.join(dir,f));return{file:f,...d,area:d.w*d.h};}).sort((a,b)=>b.area-a.area);
  const pairs=[];
  for(let i=0;i<imgs.length;i++)for(let j=i+1;j<imgs.length;j++){const d=dist(hashes.get(`${e.folder}/${imgs[i].file}`),hashes.get(`${e.folder}/${imgs[j].file}`));if(d<45)pairs.push(`${imgs[i].file.slice(0,8)}~${imgs[j].file.slice(0,8)}:${d}`);}
  console.log(`${e.folder}\tthumb=${e.coverAltSource.slice(0,8)}\tnonThumb=${imgs.length}\t${imgs.map(i=>i.file.slice(0,8)+'('+Math.round(i.area/1000)+'k)').join(',')}\tclose=${pairs.join(' ')||'-'}`);
}
