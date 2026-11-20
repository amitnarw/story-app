const samples = [
  'एक हाथ उसकी बाँह पर रखे, वह उसके कंधे पर एक चुंबन देने के लिए झुका।',
  'एक हाथ उसकी बाँह पर रखे और वह उसके कंधे पर एक चुंबन देने के लिए झुका।',
  'वह उसके कंधे पर एक चुंबन देने के लिए झुका।',
  'नंदिनी ने आँखें मूँद लीं, और सिर ज़रा पीछे कर लिया।',
];

(async () => {
  for (const text of samples) {
    const url =
      'https://www.google.com/transliterate?langpair=hi|en&text=' + encodeURIComponent(text);
    const data = await (await fetch(url)).json();
    console.log('IN ', text);
    console.log('EW ', data[0].ew);
    console.log('OUT', data[0].hws[0]);
    console.log('---');
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
})();
