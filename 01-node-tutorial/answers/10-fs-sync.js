const { readFileSync, writeFileSync } = require('fs')
console.log('start')
//const first = readFileSync('./temporary/first.txt', 'utf8')
//const second = readFileSync('./temporary/second.txt', 'utf8')

writeFileSync(
  './temporary/fileA.txt',
  `Line 1`
);
writeFileSync(
    './temporary/fileA.txt',
    `Line 2`,
    { flag: 'a' }
  );
  writeFileSync(
  './temporary/fileA.txt',
  `Line 3`,
  { flag: 'a' }
);
const first = readFileSync('./temporary/fileA.txt', 'utf8');
console.log(`${first}`);
console.log('starting the next one')
