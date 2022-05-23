const { createReadStream, createWriteStream } = require('fs');
const { rm, readdir } = require('fs/promises');
const { resolve, extname } = require('path');

const src = resolve(__dirname, 'styles');
const dest = resolve(__dirname, 'project-dist');
const bundle = resolve(dest, 'bundle.css');

const generateCSS = async (src, dest) => {
  await rm(bundle, { force: true });
  const files = await readdir(src);

  for (const file of files) {
    if (extname(file) === '.css') {
      const readableStream = createReadStream(resolve(src, file), 'utf8');

      const writableStream = createWriteStream(resolve(dest, 'bundle.css'), {
        flags: 'a',
      });

      readableStream.pipe(writableStream);
    }
  }
};

generateCSS(src, dest);