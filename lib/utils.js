const fs = require('fs');
const path = require('path');

module.exports = {
    /**
     * 生成一个深度的目录
     * @param  {String} dir 目录路径
     * @return {void}
     */
    mkDir(dir) {
        // 目录已存在
        if (!dir || (fs.existsSync(dir) && fs.statSync(dir).isDirectory())) {
            return;
        }

        const dirList = [];
        let len;

        dir = path.normalize(dir);

        try {
            fs.mkdirSync(dir, { recursive: true });
        } catch (e) {
            dir.split(path.sep).forEach((name) => {
                if (!name) {
                    return;
                }

                len = dirList.length;
                dirList.push((len ? dirList[len - 1] + path.sep : '') + name);
            });

            dirList.forEach((pathName) => {
                // console.log(pathName)
                // 不存在或者不是一个目录
                if (!fs.existsSync(pathName) || !fs.statSync(pathName).isDirectory()) {
                    fs.mkdirSync(pathName);
                }
            });

            return dirList[dirList.length - 1];
        }
    },
    /**
     * 删除指定目录及目录下的所有文件
     * @param  {String}             pathName 要清空的目录
     * @param  {String|RegExp} ext  只删除指定后缀的文件
     * @return {Number}             删除的文件数目
     */
    delDir(pathName, ext) {
        // 不存在
        if (!fs.existsSync(pathName)) {
            return 0;
        }

        // 是文件，直接删除
        if (fs.statSync(pathName).isFile()) {
            fs.unlinkSync(pathName);
            return 1;
        }

        // 是目录
        let files = fs.readdirSync(pathName);
        let curPath;
        let count = 0;

        // 空目录，移除它
        if (!files.length) {
            fs.rmdirSync(pathName);
            return;
        }

        // 转换为正则
        if (ext && typeof ext === 'string') {
            ext = new RegExp(ext + '$');
        }

        files.forEach((file /*, index*/) => {
            curPath = pathName + '/' + file;

            if (fs.statSync(curPath).isDirectory()) {
                count += this.delDir(curPath, ext);
            } else if (!(ext instanceof RegExp) || ext.test(curPath)) {
                fs.unlinkSync(curPath);
                count++;
            }
        });

        // 不按后缀方式删除，移除空目录
        files = fs.readdirSync(pathName);
        if (!files.length) {
            fs.rmdirSync(pathName);
        }

        return count;
    },
};
