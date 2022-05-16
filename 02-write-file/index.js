const { createWriteStream } = require('fs');
const { createInterface } = require('readline');
const { resolve } = require('path');
const { stdin: input, stdout: output } = require('process');

const file = resolve(__dirname, 'text.txt');
const writeStream = createWriteStream(file);
const interface = createInterface({ input, output });

output.write('Hey, type something! (´• ◡ •`)\n');

interface.on('line', (string) => {
  if (string === 'exit') {
    output.write('Awesome, bye bye! (´^ ◡ ^`)');
    return interface.close();
  }
  writeStream.write(`${string}\n`);
});

interface.on('SIGINT', () => {
  output.write('Awesome, bye bye! (´^ ◡ ^`)/');
  return interface.close();
});