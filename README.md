[![Code Climate](https://lzw.me/images/logo.png)](https://lzw.me)
[![webp-batch-convert](https://nodei.co/npm/webp-batch-convert.png)](https://npmjs.org/package/webp-batch-convert)

Webp Batch Convert
========
webp 图片批量转换。将指定目录内 png/jpg/jpeg/bmp/gif 格式的图片批量转换为 webp 格式。

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](https://gruntjs.com/)
[![NPM version][npm-image]][npm-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/webp-batch-convert.svg?style=flat-square
[npm-url]: https://npmjs.org/package/webp-batch-convert
[gemnasium-image]: https://img.shields.io/gemnasium/lzwme/webp-batch-convert.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/lzwme/webp-batch-convert
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: https://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/webp-batch-convert.svg?style=flat-square
[download-url]: https://npmjs.org/package/webp-batch-convert

## 快速上手

### 在项目目录中安装

```bash
npm install --save-dev webp-batch-convert
```

### 使用示例(nodejs 模块 API 方式)

```js
//import convert from 'webp-batch-convert';
const convert = require('webp-batch-convert');
let res;

// 示例一: 生成 img 目录下的图片文件至 webp 目录
res = convert.cwebp('./img', './webp');
console.log('total: ', res);

// 示例二: 生成 img 目录下的图片文件至 webp 目录，附带质量等参数
// 更多参数参考：https://developers.google.com/speed/webp/docs/cwebp?csw=1#options
const cwebpOpts = {
    quiet: true, // 不输出详情
    q: 60 // 质量
};
// 清空输出目录
convert.utils.delDir('./webp');
res = convert.cwebp('./img','./webp', cwebpOpts);
console.log('total: ', res);
```

## 命令行方式使用(cwebp-batch)

### 全局安装

```js
npm install -g webp-batch-convert
```

### 使用示例

```js
cwebp-batch --in img-folder --out webp-folder <-q 75 -quiet>
```
或者局部安装，然后如下方式使用：
```js
./node_modules/.bin/cwebp-batch --in img-folder --out webp-folder <-q 75 -quiet>
```
<p align="center">
    <img src="https://cdn.rawgit.com/lzwme/webp-batch-convert/master/test/img/snapshot.png">
</p>
## API

- `.cwebp(imgDir, webpDir, cwebpOptions)`

批量转换生成 webp。示例：
```js
// 将 img 目录下的所有图片转换为 webp 文件，输出至 webp 目录
const res = convert.cwebp('./img','./webp', {
    quiet: true, // 不输出详情
    q: 60        // 质量
});
console.log('total: ' + res);
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
// 删除 webp 目录下的所有 .webp 后缀的文件
convert.utils.delDir('./webp', /\.webp$/);
```

## 二次开发

- 依赖安装 `yarn install`
- 修改/新增功能
- 添加测试并执行 `yarn test`
- `cwebp-batch` 命令行命令全局安装与测试 `npm i -g ./`

## License

`webp-batch-convert` is released under the MIT license.

该插件由[志文工作室](https://lzw.me)开发和维护。
