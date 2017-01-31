/**
 * cwebp test
 */

const convert = require('../');
const imgDir = './output/';
let res;

// test1: 不存在的目录
res = convert.cwebp(imgDir + '/img', imgDir + 'webp');
console.log(res === 0);

// test2: 生成 test/img 目录下的 webp 文件
console.log('convert folder: ', __dirname + '/img');
res = convert.cwebp(__dirname + '/img', imgDir + 'webp');
console.log('total: ', res);
convert.utils.delDir(imgDir);

// test3: 生成 test/img 目录下的 webp 文件，附带质量等参数
console.log('convert folder: ', __dirname + '/img');

const cwebpOpts = {
    q: 60 // 质量
};

res = convert.cwebp(__dirname + '/img', imgDir + 'webp', cwebpOpts);
console.log('total: ', res);
convert.utils.delDir(imgDir);
