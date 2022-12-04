/**
 * cwebp test
 */

const { readFileSync, mkdirSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const convert = require('../cjs');
const imgDir = './output/';
let res;

async function start() {
  // test1: 不存在的目录
  res = await convert.cwebp(imgDir + '/img', imgDir + 'webp');
  console.log(res === 0);

  // test2: 生成 test/img 目录下的 webp 文件
  console.log('convert folder: ', __dirname + '/img');
  res = await convert.cwebp(__dirname + '/img', imgDir + 'webp');
  console.log('total: ', res);
  convert.utils.delDir(imgDir);

  // test3: 生成 test/img 目录下的 webp 文件，附带质量等参数
  console.log('convert folder: ', __dirname + '/img');

  const cwebpOpts = {
    quiet: '', // 不输出详情
    q: 60, // 质量
  };

  res = await convert.cwebp(__dirname + '/img', imgDir + 'webp', cwebpOpts);
  console.log('total: ', res);
  convert.utils.delDir(imgDir);

  // test4: 大量图片测试
  console.log('convert folder: ', __dirname + '/img');
  let startTime = Date.now();
  const rawImg = resolve(__dirname, './img/share.jpg');
  const rawImgBuf = readFileSync(rawImg);
  const testImgDir = resolve(__dirname, './img-test');
  mkdirSync(testImgDir, { recursive: true });
  for (let i = 0; i < 1000; i++) {
    writeFileSync(resolve(testImgDir, `share-${i}.jpg`), rawImgBuf);
  }

  imgDir += 'webp';
  res = await convert.cwebp(testImgDir, imgDir, cwebpOpts);
  console.log('total: ', res, 'TimeCost:', Date.now() - startTime);
  convert.utils.delDir(testImgDir);
  convert.utils.delDir(imgDir);
}

start();
