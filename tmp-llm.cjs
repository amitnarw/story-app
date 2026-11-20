const prompt =
  'Translate this Hindi story paragraph into natural English. Keep the gender of the characters correct. Output only the translation.\n\nकबीर उसके पीछे खड़ा था। एक हाथ उसकी बाँह पर रखे, वह उसके कंधे पर एक चुंबन देने के लिए झुका। नंदिनी ने आँखें मूँद लीं और सिर ज़रा पीछे कर लिया।';

(async () => {
  const url = 'https://text.pollinations.ai/' + encodeURIComponent(prompt) + '?model=openai';
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
    console.log('status', response.status);
    const text = await response.text();
    console.log(text.slice(0, 1000));
  } catch (error) {
    console.log('FAIL', error.message);
  }
})();
