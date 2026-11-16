/**
 * English UI strings. This file is the shape every other language must match.
 */
export const en = {
  common: {
    back: 'Back',
    cancel: 'Cancel',
    done: 'Done',
  },
  onboarding: {
    eyebrow: 'A library of stories',
    tagline: 'Read stories. One chapter at a time.',
    getStarted: 'Get started',
    caption: 'Your library stays on this device.',
    ageTitle: 'Are you 18 or older?',
    ageBody:
      'Some stories in this library contain mature themes and sensuality intended for adult readers.',
    ageConfirm: 'Yes, I am 18 or older',
  },
  tabs: {
    home: 'Home',
    settings: 'Settings',
  },
  home: {
    subtitle: 'Stories worth your time',
    emptyTitle: 'No stories yet',
    emptyBody: 'Check back soon for new stories.',
    a11ySearch: 'Search',
    a11ySaved: 'Saved stories',
    a11yTheme: 'Theme toggle',
  },
  settings: {
    title: 'Settings',
    subtitle: 'Small choices. Nothing here is required.',
    appearance: 'Appearance',
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
    language: 'Language',
    preferences: 'Preferences',
    haptics: 'Haptics',
    hapticsDesc: 'A light tap when you touch something.',
    ads: 'Allow advertising',
    adsDesc: 'Banners and occasional breaks keep this app free.',
    mature: 'Mature stories',
    matureDesc:
      'Stories with adult themes and sensuality. Requires confirmation you are 18 or older.',
    privacy: 'Privacy',
    privacyA11y: 'Privacy policy',
    reset: 'Reset everything',
    resetA11y: 'Reset everything',
    resetTitle: 'Reset everything?',
    resetMessage:
      'This clears your saved stories, reading progress, and settings. It cannot be undone.',
    resetConfirm: 'Reset',
    cancel: 'Cancel',
    versionNote: 'Loom {version} · Your library stays on this device',
  },
  search: {
    back: 'Back',
    placeholder: 'Search stories, authors, tags...',
    clear: 'Clear search',
    title: 'Search stories',
    hint: 'Find stories by title, author, or tag across the library.',
    noMatches: 'No matches found',
    noMatchesBody:
      'We could not find anything matching “{query}”. Try a different search term.',
    results: 'Stories ({count})',
  },
  saved: {
    title: 'Saved',
    subtitle: 'Your private collection of stories',
    emptyTitle: 'No saved stories yet',
    emptyBody: 'Tap the heart on any story card to keep it here.',
    saveStory: 'Save story',
    removeFavorite: 'Remove from favorites',
  },
  story: {
    back: 'Back',
    minRead: '{minutes} min read',
    saveStory: 'Save story',
    removeSaved: 'Remove from saved',
    byAuthor: 'by {author}',
    storyNumber: 'Story {number} · {tags}',
    nextStory: 'Next story',
    nextStoryMeta: 'by {author} · {minutes} min',
    backToAll: 'Back to all stories',
    nextA11y: 'Next story: {title}',
    backHomeA11y: 'Back to home',
    backToTop: 'Back to top',
    backToTopA11y: 'Back to top of story',
    notFoundTitle: 'Story not found.',
    notFoundBody: 'It may have moved. The library is one tap away.',
    backToStories: 'Back to stories',
    saveCardA11y: 'Save {title}',
    removeCardA11y: 'Remove {title} from saved',
    rowA11y: '{title}, by {author}',
    rowMeta: 'by {author} · {minutes} min read',
  },
  privacy: {
    title: 'Privacy policy',
    intro:
      'This app is a library of stories for adults. This policy describes what information the app collects and how advertising works.',
    deviceTitle: 'Data that stays on your device',
    deviceBody:
      'Your saved stories, reading progress, theme, and haptics settings are stored locally on your device only. Nothing is uploaded to a server, and no account is created.',
    adsTitle: 'Advertising',
    adsBody:
      'This app shows advertising to support development. Ads may appear as banners in story lists and as occasional full-screen interstitials at natural breaks.',
    adsBullets: [
      'Ad networks may receive your device/advertising identifier and limited device information to serve and measure ads. You can limit ad tracking in your device settings.',
      'We do not serve ads based on your story views, saves, or reading progress. Personal app data is not shared with ad networks.',
      'During development, test ads are used and no revenue is generated.',
    ],
    childrenTitle: 'Age rating',
    childrenBody:
      'This app is intended for adult readers. Some stories contain mature themes and sensuality. An age confirmation is shown on first launch, and mature stories can be hidden in Settings.',
    contactTitle: 'Contact',
    contactBody:
      'Questions about this policy or your data can be sent through the app Settings screen.',
    done: 'Done',
  },
  ads: {
    label: 'Advertisement',
    bookTeaser: 'A great book you might enjoy',
    discoverTeaser: 'Discover your next favorite story',
  },
  progress: {
    short: 'A short read',
    quick: 'A quick read',
    long: 'A long, slow read',
  },
};

export type Messages = typeof en;
