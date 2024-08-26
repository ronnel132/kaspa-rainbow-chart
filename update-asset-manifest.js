const fs = require('fs');
const path = require('path');

// Path to the build directory and the asset-manifest.json file
const buildDir = path.join(__dirname, 'build-obfuscated');
const manifestFile = path.join(buildDir, 'asset-manifest.json');

// Read the asset-manifest.json file
let manifestContent = fs.readFileSync(manifestFile, 'utf8');
let manifest = JSON.parse(manifestContent);

// Update the manifest to point to app.min.js instead of main.***.js
if (manifest.files && manifest.files['main.js']) {
  manifest.files['main.js'] = '/static/js/app.min.js';
}

if (manifest.entrypoints && manifest.entrypoints.length > 0) {
  manifest.entrypoints = manifest.entrypoints.map(entry => {
    if (entry.endsWith('.js')) {
      return 'static/js/app.min.js';
    }
    return entry;
  });
}

// Write the updated manifest back to the file
fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2), 'utf8');

console.log('Updated asset-manifest.json to reference app.min.js.');
