const fs = require('fs');
let content = fs.readFileSync('src/data/mockData.ts', 'utf-8');

const regex = /https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9_-]+)(\?[^"'\s]*)?/g;
let count = 0;
const replaced = content.replace(regex, (match, id) => {
  const localPath = `public/images/photo-${id}.jpg`;
  if (fs.existsSync(localPath)) {
    count++;
    return `/images/photo-${id}.jpg`;
  }
  return match;
});

fs.writeFileSync('src/data/mockData.ts', replaced, 'utf-8');
console.log(`Replaced ${count} image references with local /images/photo-*.jpg`);
