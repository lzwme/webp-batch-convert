/**
 * 清空目录测试（utils.delDir）
 */

const fs = require('fs');

const utils = require('../lib/utils');
const baseDirs = '__test-del-dir';

function createFiles(dir) {
    // 创建目录
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // 生成 10 个文件
    let total = 10;
    while(total--) {
        fs.appendFileSync(`${dir}/message-${10 - total}.txt`, `data to append-${10 - total}`, 'utf8');
    }
}

createFiles(baseDirs);
createFiles(baseDirs + '/subdir');

setTimeout(() => {
    const total = utils.delDir(baseDirs);

    console.log('del files total: ' + total, total === 20);
}, 2000);
