/**
 * utils.mkDir test
 */
const fs = require('fs');
const utils = require('../lib/utils');

const dir = 'a/b-c/d/f\\g/m';
const newDir = dir.replace(/\\/, '/');

const created = utils.mkDir(dir);

console.log('created dir: ', created);
console.log(`fs.statSync('${newDir}').isDirectory(): `,
    fs.statSync(newDir).isDirectory());

setTimeout(() => {
    utils.delDir(dir.split('/')[0]);
}, 2000);
