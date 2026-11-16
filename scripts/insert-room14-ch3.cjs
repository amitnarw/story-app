const fs = require('fs');
const file = 'src/content/copy/hi.ts';
let content = fs.readFileSync(file, 'utf8');

// Find room-14-third-floor story and add chapter 3 before what-the-dark-kept
// Match from "      },\n    ],\n  },\n  {\n    slug: 'what-the-dark-kept'," with flexible whitespace
const anchorRegex = /[ \t]*\}\r?\n[ \t]*\]\r?\n[ \t]*\}\r?\n[ \t]*\{\r?\n[ \t]*slug: 'what-the-dark-kept',/;

const match = content.match(anchorRegex);
if (!match) {
  console.error('Anchor not found!');
  // Debug: show what's around what-the-dark-kept
  const idx = content.indexOf("slug: 'what-the-dark-kept'");
  if (idx >= 0) {
    console.error('Context:', JSON.stringify(content.substring(idx - 100, idx + 50)));
  }
  process.exit(1);
}

console.log('Found anchor at:', match.index);
console.log('Matched:', JSON.stringify(match[0]));

const eol = '\r\n';
const chapter3 = `      },${eol}      {${eol}        title: 'राज',${eol}        blocks: [${eol}          {${eol}            kind: 'paragraph',${eol}            text:${eol}              'अर्जुन ने ध्यान से सुना, और जितना उसने सुना, उतना ही वह उसे बचाना चाहता था — इसलिए नहीं कि वह कमज़ोर थी, बल्कि इसलिए कि वह मज़बूत थी, और उसकी तरह की मज़बूती सुरक्षा की हकदार थी। वे हर शाम बात करने लगे, लैंडिंग पर या उसके कमरे में, चाय साझा करते हुए जो श्रीमती देसी बिना पूछे ऊपर लाती थीं। अर्जुन ने उसे अपने कॉल सेंटर की नौकरी के बारे में बताया, नागपुर में अपने परिवार के बारे में, कॉलेज में उस लड़की के बारे में जिससे वह लगभग शादी करने वाला था। मीरा ने उसे किताबों के बारे में बताया, जो वह अकेले देखती थी, जो भोजन वह अकेले बनाती थी जब वह अकेली होती है।',${eol}          },${eol}          {${eol}            kind: 'image',${eol}            alt: 'रेल टिकट, पुराना फोन, बिस्तर पर बैग',${eol}            caption: 'वे चीज़ें जो मीरा भागते समय लाई थी।',${eol}          },${eol}          {${eol}            kind: 'paragraph',${eol}            text:${eol}              'एक बरसाती गुरुवार को, मीरा ने अर्जुन के दस्तक देने से पहले ही दरवाज़ा खोल दिया। वह सलवार कमीज़ की जगह साड़ी पहने थी, उसके बाल खुले थे, उसका चेहरा बेख़ौफ़ था। "रुको," उसने कहा। "बस आज रात के लिए। प्लीज़।"',${eol}          },${eol}          {${eol}            kind: 'paragraph',${eol}            text:${eol}              "वह रुक गया। उन्होंने ज़्यादा बात नहीं की। वे उसके बिस्तर पर बैठे, कंधे से कंधा मिलाकर, और जब उसने उसे चूमा, तो वह पीछे नहीं हटी। पहले यह नरम था, अनिश्चित, जैसे वे दोनों कुछ तोड़ने से डर रहे थे। फिर यह नरम नहीं रहा, और कमरा गर्म था, और बारिश छत पर हथौड़े की तरह बज रही थी, और तीन साल में पहली बार मीरा ने पीछे मुड़कर नहीं देखा।",${eol}          },${eol}          {${eol}            kind: 'paragraph',${eol}            text:${eol}              'अगली सुबह, श्रीमती देसी ने अर्जुन के कमरे पर दस्तक दी। "कमरा 14 खाली है," उसने कहा। "मीरा कल रात चली गई। उसने तुम्हारे लिए एक खत छोड़ा है।"',${eol}          },${eol}          {${eol}            kind: 'paragraph',${eol}            text:${eol}              'अर्जुन कमरे में गया। बिस्तर बना था, अलमारी बंद थी, खिड़की पुणे की छतों के लिए खुली थी। मेज़ पर एक लिफ़ाफ़ा था जिस पर उसका नाम लिखा था। अंदर एक काग़ज़ का टुकड़ा था: धन्यवाद, अर्जुन। तुम मेरे साथ दयालु थे जब कोई और नहीं था। मैं घर जा रही हूँ। मैं आशा करती हूँ कि तुम्हें भी अपना सुरक्षित स्थान मिले। — मीरा।',${eol}          },${eol}          {${eol}            kind: 'paragraph',${eol}            text:${eol}              'अर्जुन ने खत मोड़ा और अपनी जेब में रख लिया। वह श्रीमती देसी के पास गया और पूछा कि क्या कमरा 14 उपलब्ध है। उसने उसे लंबे और स्थिर तरीके से देखा, और कहा, "यह उपलब्ध है। लेकिन नियम अभी भी लागू है। वहाँ कोई नहीं जाता।" अर्जुन मुस्कुराया। "मैं पहले ही जा चुका हूँ," उसने कहा। और उसने चाबी ली।',${eol}          },${eol}        ],${eol}      },${eol}    ],${eol}  },${eol}  {${eol}    slug: 'what-the-dark-kept',`;

content = content.replace(anchorRegex, chapter3);
fs.writeFileSync(file, content);
console.log('Added room-14 chapter 3.');
