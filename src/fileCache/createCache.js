const fs = require('fs');

const readFile = (path, file, cacheHolder) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    cacheHolder[file] = data;
    console.log(Object.keys(cacheHolder));
  })
};

const fileCache = (file, directory, cacheHolder) => {
  const path = `${directory}/${file}`;
  if (fs.statSync(path).isFile()) {
    readFile(path, file, cacheHolder);
    return;
  }
  createCache(path, cacheHolder);
};

const createCache = (directory, cacheHolder) => {
  const files = fs.readdirSync(directory);
  files.forEach((file) => fileCache(file, directory, cacheHolder));
};

exports.createCache = createCache;
