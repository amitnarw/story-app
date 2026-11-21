import fs from 'fs';
const mapPath = 'android/app/build/generated/sourcemaps/react/release/index.android.bundle.map';
const srcs = JSON.parse(fs.readFileSync(mapPath, 'utf8')).sources || [];
console.log('HMRClient.js (dev):', srcs.includes('/node_modules/react-native/Libraries/Utilities/HMRClient.js'));
console.log('HMRClientProdShim.js (prod):', srcs.some(s => s.includes('HMRClientProdShim')));
console.log('DevMenu.js:', srcs.some(s => s.endsWith('DevMenu.js')));
const b = fs.readFileSync('android/app/build/generated/assets/react/release/index.android.bundle');
console.log('bundle bytes:', b.length);
