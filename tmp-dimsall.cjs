const fs=require('fs'),path=require('path');
const ROOT='C:/Users/Narwal/Downloads/Story App 1 (1)';
function dims(p){const buf=fs.readFileSync(p);let w=0,h=0;if(buf.slice(0,8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]))){w=buf.readUInt32BE(16);h=buf.readUInt32BE(20);}else{let i=2;while(i<buf.length){if(buf[i]!==0xff){i++;continue;}const m=buf[i+1];if(m>=0xc0&&m<=0xcf&&![0xc4,0xc8,0xcc].includes(m)){h=buf.readUInt16BE(i+5);w=buf.readUInt16BE(i+7);break;}i+=2+buf.readUInt16BE(i+2);}}return{w,h};}
const dirs=fs.readdirSync(ROOT,{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name).sort((a,b)=>+a-+b);
for(const d of dirs){
  const files=fs.readdirSync(path.join(ROOT,d)).filter(f=>/\.(jpe?g|png)$/i.test(f));
  const rows=files.map(f=>{const {w,h}=dims(path.join(ROOT,d,f));return {f:`${f.slice(0,8)}`,w,h,r:+(w/h).toFixed(2)};});
  const lands=rows.filter(r=>r.r>1.6);
  console.log(`${d}\t${rows.length} imgs\tland=${lands.length}${lands.length?': '+lands.map(l=>`${l.f}(${l.w}x${l.h})`).join(' '):''}`);
}
