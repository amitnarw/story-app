import type { Messages } from './en';

/**
 * Hinglish — romanized Hindi the way urban India actually speaks it: Hindi
 * sentence bones with English words left in wherever they feel natural
 * (settings, library, story, saved). Kept easy to read, not slangy.
 */
export const hinglish: Messages = {
  common: {
    back: 'Wapas',
    cancel: 'Cancel',
    done: 'Done',
    exitTitle: '{app} band karein?',
    exitBody: 'Kya aap app band karna chahte hain?',
    exitYes: 'Haan',
    exitNo: 'Nahi',
  },
  onboarding: {
    eyebrow: 'Kahaniyon ka collection',
    tagline: 'Kahaniyan padhiye. Ek baar mein ek chapter.',
    getStarted: 'Shuru karein',
    caption: 'Aapki library isi device par rehti hai.',
    ageTitle: 'Kya aap 18 saal ya usse zyada ke hain?',
    ageBody:
      'Is library mein kuch kahaniyon mein adult themes aur sensuality hain jo adult readers ke liye hain.',
    ageConfirm: 'Haan, main 18 saal ya usse zyada ka hoon.',
  },
  tabs: {
    home: 'Home',
    settings: 'Settings',
  },
  home: {
    subtitle: 'Aapke time ki kahaniyan',
    emptyTitle: 'Abhi koi kahani nahi',
    emptyBody: 'Nayi kahaniyon ke liye thodi der baar dekhiye.',
    a11ySearch: 'Search',
    a11ySaved: 'Saved stories',
    a11yTheme: 'Theme badlein',
  },
  settings: {
    title: 'Settings',
    subtitle: 'Chhote-chhote choices. Yahan kuch bhi zaroori nahi hai.',
    appearance: 'Look',
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
    language: 'Bhasha',
    preferences: 'Preferences',
    haptics: 'Haptics',
    hapticsDesc: 'Kuch bhi chhoone par halka sa vibration milta hai.',
    mature: 'Mature stories',
    matureDesc:
      'Adult themes aur sensuality wali stories. Iske liye 18 saal ya usse zyada umar hone ki confirmation chahiye.',
    privacy: 'Privacy',
    privacyA11y: 'Privacy policy',
    reset: 'Sab kuch reset karein',
    resetA11y: 'Sab kuch reset karein',
    resetTitle: 'Sab kuch reset karein?',
    resetMessage:
      'Isse aapki saved stories, reading progress aur settings mit jayengi. Ye wapas nahi ho sakta.',
    resetConfirm: 'Reset karein',
    cancel: 'Cancel',
    versionNote: 'Romantic Stories {version} · Aapki library isi device par rehti hai',
  },
  search: {
    back: 'Wapas',
    placeholder: 'Stories, authors ya tags search karein...',
    clear: 'Search clear karein',
    title: 'Kahaniyan search karein',
    hint: 'Title, author ya tag se poori library mein stories dhoondhiye.',
    noMatches: 'Koi match nahi mila',
    noMatchesBody:
      '“{query}” se match karne wala kuch nahi mila. Koi doosra word try karein.',
    results: 'Stories ({count})',
  },
  saved: {
    title: 'Saved',
    subtitle: 'Aapka private story collection',
    emptyTitle: 'Abhi koi story saved nahi hai',
    emptyBody: 'Kisi bhi story card par dil ko tap karke usse yahan rakhein.',
    saveStory: 'Story save karein',
    removeFavorite: 'Favorites se hatayein',
  },
  story: {
    back: 'Wapas',
    minRead: '{minutes} min ka read',
    saveStory: 'Story save karein',
    removeSaved: 'Save se hatayein',
    byAuthor: 'by {author}',
    storyNumber: 'Story {number} · {tags}',
    nextStory: 'Agli story',
    nextStoryMeta: 'by {author} · {minutes} min',
    backToAll: 'Sab stories par wapas',
    nextA11y: 'Agli story: {title}',
    backHomeA11y: 'Home par wapas',
    backToTop: 'Wapas upar jayein',
    backToTopA11y: 'Story ke shuru par wapas jayein',
    notFoundTitle: 'Story nahi mili.',
    notFoundBody: 'Shayad woh kahin aur chali gayi ho. Library ek tap door hai.',
    backToStories: 'Stories par wapas',
    saveCardA11y: '{title} save karein',
    removeCardA11y: '{title} ko save se hatayein',
    rowA11y: '{title}, by {author}',
    rowMeta: 'by {author} · {minutes} min read',
  },
  audio: {
    listen: 'Suno',
    play: 'Audio chalao',
    pause: 'Audio roko',
    replay: 'Phir se suno',
    hindi: 'Hindi audio',
    skipBack: '15 second peeche',
    skipAhead: '15 second aage',
    seek: 'Audio mein aage-peeche jaayein',
    position: '{current} / {duration}',
    unlockTitle: 'Audio locked hai',
    unlockBody: 'Is kahani ka audio {days} din tak unlock karne ke liye ek chhota video dekhein.',
    unlock: 'Unlock karein',
    unlockFailed: 'Abhi ad available nahi hai. Kripya thodi der baad dobara try karein.',
  },
  offline: {
    title: 'Internet connection nahi hai',
    body: 'Padhna continue karne ke liye kripya internet se connect karein.',
    retry: 'Retry',
  },
  privacy: {
    title: 'Privacy policy',
    intro:
      'Ye app bade padhne walon ke liye kahaniyon ka collection hai. Ye policy batati hai ki app kaun si jaankari ikattha karta hai aur ads kaise kaam karte hain.',
    deviceTitle: 'Data jo sirf aapke device par rehta hai',
    deviceBody:
      'Aapki saved stories, reading progress, theme aur haptics settings sirf aapke device par save hoti hain. Kuch bhi server par upload nahi hota, aur koi account nahi banta.',
    adsTitle: 'Ads',
    adsBody:
      'Is app ka development chalane ke liye ads dikhaye jaate hain. Ads story lists mein banners ki tarah, aur theek-thaak breaks par kabhi-kabhi full-screen interstitials ki tarah dikh sakte hain.',
    adsBullets: [
      'Ad networks ads dikhane aur measure karne ke liye aapka device/advertising identifier aur thodi device jaankari paa sakte hain. Aap device settings mein ad tracking limit kar sakte hain.',
      'Hum aapke padhe, save kiye ya reading progress ke basis par ads nahi dikhaate. App ka personal data ad networks ke saath share nahi hota.',
      'Development ke dauraan test ads use hote hain aur koi kamai nahi hoti.',
    ],
    childrenTitle: 'Age rating',
    childrenBody:
      'Ye app adult readers ke liye hai. Kuch kahaniyon mein mature themes aur sensuality hai. Pehle baar kholne par age confirmation dikhayi jaati hai, aur mature stories ko Settings se hide kiya ja sakta hai.',
    contactTitle: 'Contact',
    contactBody:
      'Is policy ya aapke data se jude sawaal app ki Settings screen se bheje ja sakte hain.',
    done: 'Done',
  },
  ads: {
    label: 'Advertisement',
    bookTeaser: 'Ek zabardast kitaab jo aapko pasand aa sakti hai',
    discoverTeaser: 'Apni agli favourite story khojiye',
  },
  progress: {
    short: 'Chhota read',
    quick: 'Fursat ka read',
    long: 'Lamba, slow read',
  },
};
