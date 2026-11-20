const p =
  'कबीर उसके पीछे खड़ा था। एक हाथ उसकी बाँह पर रखे, वह उसके कंधे पर एक चुंबन देने के लिए झुका।';
const q = '“हँस क्यों रही हो?” कबीर ने धीरे से पूछा।';

(async () => {
  for (const text of [p, q]) {
    const url =
      'https://www.google.com/transliterate?langpair=hi|en&text=' + encodeURIComponent(text);
    const response = await fetch(url);
    console.log('CT', response.headers.get('content-type'));
    const buffer = Buffer.from(await response.arrayBuffer());
    console.log('first bytes', [...buffer.slice(0, 20)].map((x) => x.toString(16)).join(' '));
    console.log('utf8', buffer.toString('utf8').slice(0, 300));
    console.log('latin1', buffer.toString('latin1').slice(0, 200));
    console.log('---');
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
})();
