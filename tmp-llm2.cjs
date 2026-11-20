const prompt = `Translate the Hindi passage into natural, literary English. The characters are Kabir (male) and Nandini (female); use the correct pronouns for each. Keep the sensual but non-explicit tone. Output only the translation.

कबीर उसके पीछे खड़ा था। एक हाथ उसकी बाँह पर रखे, वह उसके कंधे पर एक चुंबन देने के लिए झुका। नंदिनी ने आँखें मूँद लीं और सिर ज़रा पीछे कर लिया।`;

(async () => {
  const start = Date.now();
  const url = 'https://text.pollinations.ai/' + encodeURIComponent(prompt) + '?model=openai';
  const response = await fetch(url, { signal: AbortSignal.timeout(90000) });
  const text = await response.text();
  console.log('status', response.status, 'ms', Date.now() - start);
  console.log(text.slice(0, 1200));
})();
