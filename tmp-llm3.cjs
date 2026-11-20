const body = {
  model: 'openai',
  messages: [
    {
      role: 'system',
      content:
        'You translate Hindi fiction into natural literary English. Preserve the sensual but non-explicit tone and keep character genders correct.',
    },
    {
      role: 'user',
      content:
        'Characters: Kabir (male), Nandini (female). Translate this passage into English. Output only the translation.\n\nकबीर उसके पीछे खड़ा था। एक हाथ उसकी बाँह पर रखे, वह उसके कंधे पर एक चुंबन देने के लिए झुका। नंदिनी ने आँखें मूँद लीं और सिर ज़रा पीछे कर लिया।',
    },
  ],
};

(async () => {
  const start = Date.now();
  try {
    const response = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(90000),
    });
    console.log('status', response.status, 'ms', Date.now() - start);
    const text = await response.text();
    console.log(text.slice(0, 1500));
  } catch (error) {
    console.log('FAIL', error.message);
  }
})();
