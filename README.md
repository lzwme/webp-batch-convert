[![Code Climate](http://lzw.me/images/logo.png)](http://lzw.me)

Webp Batch Convert
========

[Demo|示例](http://lzw.me/pages/demo/webp-batch-convert)

webp 图片批量转换。将 png/jpg/bmp 格式的图片批量转换为 webp 格式。

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![NPM version][npm-image]][npm-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/webp-batch-convert.svg?style=flat-square
[npm-url]: http://npmjs.org/package/webp-batch-convert
[gemnasium-image]: http://img.shields.io/gemnasium/lzwme/webp-batch-convert.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/lzwme/webp-batch-convert
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/webp-batch-convert.svg?style=flat-square
[download-url]: https://npmjs.org/package/webp-batch-convert

## 浏览器支持

* 支持 ie8+,chrome,firefox,safari

## 功能说明

* 搜索方式：从 data.value 的有效字段数据中查询 keyword 的出现，或字段数据包含于 keyword 中
* 支持单关键字、多关键字的输入搜索建议，多关键字可自定义分隔符
* 支持按 data 数组数据搜索、按  URL 请求搜索和按首次请求URL数据并缓存搜索三种方式
* 单关键字会设置 data-id 和输入框内容两个值，以 indexId/idField 和 indexKey/idFiled 取值 data 的数据为准；多关键字只设置输入框值

## 快速上手

### 安装

[![webp-batch-convert](https://nodei.co/npm/webp-batch-convert.png)](https://npmjs.org/package/webp-batch-convert)

```bash
npm install --save-dev webp-batch-convert
```

### 使用示例

```js
const convert = require('webp-batch-convert');
//import convert from 'webp-batch-convert';
const imgDir = './output/';
let res;

// 示例一: 生成 img 目录下的 webp 文件至 output/webp 目录
res = convert.cwebp(__dirname + '/img', imgDir + 'webp');
console.log('total: ', res);

// 示例二: 生成 img 目录下的 webp 文件至 output/webp 目录，附带质量等参数
// 更多参数参考：https://developers.google.com/speed/webp/docs/cwebp?csw=1#options
const cwebpOpts = {
    q: 60 // 质量
};
// 清空输出目录
convert.utils.delDir(imgDir + 'webp');
res = convert.cwebp(__dirname + '/img', imgDir + 'webp', cwebpOpts);
console.log('total: ', res);
```

## API

- `.cwebp`

批量生成 webp。

- `.utils.mkDir`

创建一个(深度的)目录

- `.utils.delDir`

清空一个（非空的）目录

## License

webp-batch-convert is released under the MIT license.

该插件由[志文工作室](https://lzw.me)开发和维护。
