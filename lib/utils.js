const fs = require('fs');

module.exports = {
    /**
     * 生成一个深度的目录
     * @param  {String} dir 目录路径
     * @return {void}
     */
    mkDir(dir) {
        // 目录已存在
        if (!dir || fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
            return;
        }

        const dirList = [];
        let len;

        dir.replace(/\\/g, '/').split('/').forEach((name) => {
            if (!name) {
                return;
            }

            len = dirList.length;
            dirList.push((len ? (dirList[len - 1] + '/') : '') + name);
        });

        dirList.forEach((pathName) => {
            // console.log(pathName)
            // 不存在或者不是一个目录
            if (!fs.existsSync(pathName) || !fs.statSync(pathName).isDirectory()) {
                fs.mkdirSync(pathName);
            }
        });

        return dirList[dirList.length - 1];
    },
    /**
     * 删除指定目录及目录下的所有文件
     * @param  {String} pathName 要清空的目录
     * @return {Number}          删除的文件数目
     */
    delDir(pathName) {
        // 不存在
        if (!fs.existsSync(pathName)) {
            return 0;
        }

        // 是文件，删除
        if (fs.statSync(pathName).isFile()) {
            fs.unlinkSync(pathName);
            return 1;
        }

        // 是目录
        const files = fs.readdirSync(pathName);
        let curPath;
        let count = 0;

        files.forEach((file /*, index*/) => {
            curPath = pathName + '/' + file;

            if (fs.statSync(curPath).isDirectory()) {
                count += this.delDir(curPath);
            } else {
                fs.unlinkSync(curPath);
                count++;
            }
        });

        fs.rmdirSync(pathName);

        return count;
    }
};
