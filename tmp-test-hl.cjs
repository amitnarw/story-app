const p='आधी रात थी। परदे के पास रखे लैम्प की हल्की रोशनी में नंदिनी की लाल साड़ी चमक रही थी।';
(async()=>{
  for (const q of [p, p.split(' ').slice(0,6).join(' '), 'आधी रात थी।', 'नंदिनी की लाल साड़ी चमक रही थी।']) {
    const r=await fetch('https://www.google.com/transliterate?langpair=hi|en&text='+encodeURIComponent(q));
    const txt=await r.text();
    console.log(q.length, '=>', txt.slice(0,220));
  }
})();
