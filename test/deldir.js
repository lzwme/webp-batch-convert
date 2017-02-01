/**
 * 清空目录测试（utils.delDir）
 */

const fs = require('fs');

const utils = require('../lib/utils');
const baseDirs = '__test-del-dir';
let total;

function createFiles(dir) {
    // 创建目录
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // 生成 10 个文件
    let count = 10;

    while(count--) {
        fs.appendFileSync(`${dir}/message-${10 - count}.txt`, `data to append-${10 - count}`, 'utf8');
    }
}

// test1:  删除 txt 文件
createFiles(baseDirs);
createFiles(baseDirs + '/subdir');

total = utils.delDir(baseDirs, /\.txt$/);
console.log('del files total: ' + total, total === 20);

// test2:  删除整个目录
setTimeout(() => {
    createFiles(baseDirs);
    createFiles(baseDirs + '/subdir');
    setTimeout(() => {

        total = utils.delDir(baseDirs);
        console.log('del files total: ' + total, total === 20);
    }, 2000);
}, 2000);
