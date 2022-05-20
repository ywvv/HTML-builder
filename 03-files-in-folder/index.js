const { readdir, stat } = require('fs');
const { resolve, extname, basename } = require('path');

const folderPath = resolve(__dirname, 'secret-folder');

const readFiles = (path) => {
  readdir(path, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      const filePath = resolve(path, file.name);

      if (/^secret-folder$/.test(file.name)) {
        readFiles(filePath);
      }

      stat(filePath, (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) return;

        const ext = extname(file.name);
        const name = basename(filePath, ext);
        const size = stats.size / 1024;

        console.log(`${name} - ${ext.slice(1)} - ${size.toFixed(2)}kb`);
      });
    }
  });
};

readFiles(folderPath);