const fs = require('fs');
const path = require('path');

const files = ['tailwind.config.ts', 'postcss.config.js', 'postcss.config.mjs'];
for (const file of files) {
  try {
    fs.unlinkSync(path.join(__dirname, file));
    console.log(`Deleted ${file}`);
  } catch (e) {
    console.log(`Could not delete ${file}:`, e.message);
  }
}

try {
  fs.rmSync(path.join(__dirname, '.next'), { recursive: true, force: true });
  console.log('Deleted .next directory');
} catch (e) {
  console.log(`Could not delete .next:`, e.message);
}
