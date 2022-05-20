const { copyFile, readdir, mkdir, rm } = require('fs/promises');
const { resolve } = require('path');

const copyDir = async (folderPath, copyFolderPath) => {
  await rm(copyFolderPath, { recursive: true, force: true });
  await mkdir(copyFolderPath);

  const files = await readdir(folderPath);

  for (const file of files) {
    copyFile(resolve(folderPath, file), resolve(copyFolderPath, file));
  }
  console.log('File copying is finished!');
};

copyDir(resolve(__dirname, 'files'), resolve(__dirname, 'files-copy'));