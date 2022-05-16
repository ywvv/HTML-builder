const { createReadStream } = require('fs');
const { resolve } = require('path');
const { stdout } = require('process');

const file = resolve(__dirname, 'text.txt');
const readStream = createReadStream(file, 'utf8');

readStream.pipe(stdout);