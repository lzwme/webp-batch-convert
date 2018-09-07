// cwebp

const fs= require('fs');
const path = require('path');
const execFileSync = require('child_process').execFileSync;
const cwebp = require('cwebp-bin');
const utils = require('./utils');
// cwebp 额外的参数
let options;
// 是否为图片，后缀判断正则
const regIsImg = /\.(png|jpg|jpeg|bmp|gif)$/i;
const CWD = process.cwd();

// 缓存已扫描过的目录
let handleredFolderList = [];

/**
 * 根据图片所在目录以及 webp 输出目录，获取所有的图片对应列表组
 * @param  {String} src 图片所在目录
 * @param  {String} dst webp 输出目录
 * @return {Array}
 */
function getFileList(src, dst) {
    let list = [];
    const rawSrc = src;
    const rawDst = dst;
    src = path.resolve(CWD, src);
    dst = path.resolve(CWD, dst);

    // 输入目录不存在或者已处理，返回空
    if (!fs.existsSync(src) || handleredFolderList.includes(src)) {
        return list;
    }

    handleredFolderList.push(src);

    // 输出目录是输入目录的子目录，则过滤它，防止造成死循环
    if (dst.includes(src) && dst !== src) {
        console.log('ok')
        handleredFolderList.push(dst);
    }

    // 输出目录不存在，创建它
    if (!fs.existsSync(dst)) {
        utils.mkDir(dst);
        handleredFolderList.push(dst);
    }

    // 读取目录中的所有文件/目录
    const paths = fs.readdirSync(src);

    paths.forEach((pathname) => {
        const _src = rawSrc + '/' + pathname,
            _dst = rawDst + '/' + pathname,
            st = fs.statSync(_src);

        // 为文件
        if (st.isFile()) {
            if (!regIsImg.test(pathname)) {
                return;
            }

            list.push({
                src: _src,
                dst: _dst.replace(regIsImg, '.webp')
            });
        } else if (st.isDirectory() && fs.readdirSync(_src).length) {
            // 是目录，创建输出路径对应的子目录
            if (!fs.existsSync(_dst) && !handleredFolderList.includes(path.resolve(CWD, _dst))) {
                fs.mkdirSync(_dst);
            }
            // 递归调用
            list = list.concat(getFileList(_src, _dst));
        }
    });

    return list;
}

/**
 * 获取额外的 webp 配置
 * @param  {Object} opts key 为配置项，value 为配置参数值
 * @return {Array}
 */
function getOptions(opts) {
    let o = [];
    // option white list
    // let optsList = ['q', 'sns', 'size', 'noalpha'];

    if (typeof opts !== 'object') {
        return o;
    }

    for (let opt in opts) {
        // 白名单.. todo
        // if (optsList.indexOf(opt) === -1) {
        //     continue;
        // }

        // 值为 false 忽略
        if (opts[opt] === false || opts[opt] === 'false') {
            continue;
        }

        // 选项
        o.push('-' + opt);

        // 值不是 true，压入选项
        if (opts[opt] && opts[opt] !== true && opts[opt] !== 'true') {
            o.push(opts[opt]);
        }
    }

    return o;
}

/**
 * 执行webp 处理（递归执行）
 * @param  {Array} list   getFileList 方法生成的输入与输出文件对应列表
 * @param  {Number} index 已处理的序列
 * @return {Number}       处理的图片数量
 */
function handlerCwebp(list, index = 0) {
    if (!list || !list.length || !list[0].src) {
        console.log('Do nothing.');
        return 0;
    }

    // 删除已存在的文件
    if (src !== dst && fs.existsSync(dst)) {
    if (fs.existsSync(list[0].dst)) {
        fs.unlinkSync(list[0].dst);
    }

    execFileSync(cwebp, options.concat([list[0].src, '-o', list[0].dst]));

    console.log(`[${index + 1}] Image is converted! - ${list[0].src}`);

    let count = index + 1;

    if (list.length > 1) {
        count = handlerCwebp(list.slice(1), count);
    }

    return count;
}

/**
 * cwebp 执行
 * @param  {String} src  要转换的图片所在目录
 * @param  {String} dst  webp 输出目录
 * @param  {Object} opts cwebp 额外的参数，键值对对象
 * @return {Number}      处理的图片数量
 */
module.exports = function(src, dst, opts) {
    // 输入目录与输出目录不相同，清空输出目录
    if (src !== dst && fs.existsSync(dst)) {
        utils.delDir(dst, /\.webp$/);
    }

    options = getOptions(opts);

    const count = handlerCwebp(getFileList(src, dst));

    // 移除空目录
    utils.delDir(dst, '.abcdefg');

    handleredFolderList = [];
    return count;
}
