[![webp-batch-convert](https://nodei.co/npm/webp-batch-convert.png)](https://npmjs.com/package/webp-batch-convert)

Webp Batch Convert
========
webp 图片批量转换。将指定目录内 png/jpg/jpeg/bmp/gif 格式的图片批量转换为 webp 格式。

[![NPM version][npm-image]][npm-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![GitHub issues][issues-img]][issues-url]
[![GitHub forks][forks-img]][forks-url]
[![GitHub stars][stars-img]][stars-url]
[![minzipped size][bundlephobia-img]][bundlephobia-url]

[stars-img]: https://img.shields.io/github/stars/lzwme/webp-batch-convert.svg
[stars-url]: https://github.com/lzwme/webp-batch-convert/stargazers
[forks-img]: https://img.shields.io/github/forks/lzwme/webp-batch-convert.svg
[forks-url]: https://github.com/lzwme/webp-batch-convert/network
[issues-img]: https://img.shields.io/github/issues/lzwme/webp-batch-convert.svg
[issues-url]: https://github.com/lzwme/webp-batch-convert/issues
[npm-image]: https://img.shields.io/npm/v/webp-batch-convert.svg?style=flat-square
[npm-url]: https://npmjs.com/package/webp-batch-convert
[node-image]: https://img.shields.io/badge/node.js-%3E=_12-green.svg?style=flat-square
[node-url]: https://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/webp-batch-convert.svg?style=flat-square
[download-url]: https://npmjs.com/package/webp-batch-convert
[bundlephobia-url]: https://bundlephobia.com/result?p=webp-batch-convert@latest
[bundlephobia-img]: https://badgen.net/bundlephobia/minzip/webp-batch-convert@latest

## 快速上手

### 在项目目录中安装

```bash
npm install --save-dev webp-batch-convert
npm exec wbc -h
```

### 使用示例(nodejs 模块 API 方式)

```js
//import convert from 'webp-batch-convert';
const convert = require('webp-batch-convert');
let res;

// 示例一: 生成 img 目录下的图片文件至 webp 目录
res = await convert.cwebp('./img', './webp');
console.log('total: ', res);

// 示例二: 生成 img 目录下的图片文件至 webp 目录，附带质量等参数
// 更多参数参考：https://developers.google.com/speed/webp/docs/cwebp?csw=1#options
// 也可以执行如下命令通过 cwebp 帮助信息了解： `yarn cwebp --longhelp`
const cwebpOpts = {
    /** don't print anything */
    quiet: true,
    /** quality factor (0:small..100:big), default=75 */
    q: 75,
    /** transparency-compression quality (0..100), default=100 */
    alpha_q: 100,
    /** spatial noise shaping (0:off, 100:max), default=50 */
    sns: 50,
    /** filter strength (0=off..100), default=60 */
    f: 60,
    /** use simple filter instead of strong */
    nostrong: false,
};
// 先清空输出目录
convert.utils.delDir('./webp');
res = await convert.cwebp('./img','./webp', cwebpOpts);
console.log('total: ', res);
```

### `best-practice`

- [https://github.com/lzwme/webp-batch-convert/tree/master/best-practice](https://github.com/lzwme/webp-batch-convert/tree/master/best-practice)

## 命令行方式使用(wbc / cwebp-batch)

### 全局安装

```bash
npm install -g webp-batch-convert
wbc -h
# or 
cwebp-batch -h
```

也可以不安装，使用 `npx` 执行：

```bash
npx webp-batch-convert -h
```

### 使用示例

```js
wbc --in img-folder --out webp-folder <--debug --q 75>
```

或者局部安装，然后如下方式使用：

```js
./node_modules/.bin/wbc --in img-folder --out webp-folder <-D -q 75>
```

<p align="center">
    <img src="https://cdn.rawgit.com/lzwme/webp-batch-convert/master/test/img/snapshot.png">
</p>

## API

- `.cwebp(imgDir, webpDir, cwebpOptions)`

批量转换生成 webp。示例：
```js
// 将 img 目录下的所有图片转换为 webp 文件，输出至 webp 目录
const res = await convert.cwebp('./img','./webp', {
    debug: true,
    q: 60        // 质量
});
console.log('result: ' + res);
```

- `.utils.mkDir(dirPath)`

创建一个(深度的)目录。示例：
```js
// 创建目录
convert.utils.mkDir('./src/assets/webp');
```

- `.utils.delDir(dirPath, ext)`

清空一个（非空的）目录。示例：
```js
// 删除 webp 目录
convert.utils.delDir('./webp');
// 删除 webp 目录下的所有 webp 后缀的文件
convert.utils.delDir('./webp', 'webp');
// 删除 webp 目录下的所有 .webp、png 后缀的文件
convert.utils.delDir('./webp', /\.(webp|png)$/);
```

## 二次开发

- 依赖安装 `pnpm install`
- 修改/新增功能
- 添加测试并执行 `pnpm test`
- 全局安装与测试 `npm link . && wbc -h`

## License

`webp-batch-convert` is released under the MIT license.

该插件由[志文工作室](https://lzw.me)开发和维护。
