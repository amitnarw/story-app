(async()=>{
  const parts=['आधी रात थी।','कबीर उसके पीछे खड़ा था।','नंदिनी ने आँखें मूँद लीं और सिर ज़रा पीछे कर लिया।'];
  const url='https://www.google.com/transliterate?langpair=hi|en&'+parts.map(p=>'text='+encodeURIComponent(p)).join('&');
  const r=await fetch(url); const t=await r.text();
  console.log(t.slice(0,600));
})();
