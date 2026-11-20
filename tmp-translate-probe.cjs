const text = 'नंदिनी ने आँखें मूँद लीं और सिर ज़रा पीछे कर लिया।';

async function probe(name, url, init) {
  try {
    const response = await fetch(url, { ...init, signal: AbortSignal.timeout(20000) });
    const body = await response.text();
    console.log(name, response.status, '|', body.slice(0, 220).replace(/\n/g, ' '));
  } catch (error) {
    console.log(name, 'FAIL', error.message);
  }
}

(async () => {
  await probe(
    'gtx',
    'https://translate.googleapis.com/translate_a/single?client=gtx&sl=hi&tl=en&dt=t&q=' +
      encodeURIComponent(text),
  );
  await probe(
    'clients5',
    'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=hi&tl=en&q=' +
      encodeURIComponent(text),
  );
  await probe(
    'yandex',
    'https://translate.yandex.net/api/v1/tr.json/translate?srv=android&lang=hi-en&text=' +
      encodeURIComponent(text),
  );
  await probe(
    'lingva',
    'https://lingva.ml/api/v1/hi/en/' + encodeURIComponent(text),
  );
  await probe(
    'mymemory',
    'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=hi|en',
  );
})();
