const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function (config) {
  return withAndroidManifest(config, (cfg) => {
    const app = cfg.modResults.manifest.application?.[0];
    if (!app) return cfg;
    app['meta-data'] = app['meta-data'] ?? [];
    const name = 'com.google.android.gms.ads.flag.NATIVE_AD_DEBUGGER_ENABLED';
    const exists = app['meta-data'].some((m) => m.$?.['android:name'] === name);
    if (!exists) {
      app['meta-data'].push({
        $: {
          'android:name': name,
          'android:value': 'false',
          'tools:replace': 'android:value',
        },
      });
    }
    return cfg;
  });
};