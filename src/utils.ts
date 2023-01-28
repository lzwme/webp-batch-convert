import { existsSync, mkdirSync, readdirSync, rmdirSync, statSync, unlinkSync } from 'fs';
import { normalize, sep } from 'path';

export const utils = {
  mkDir(dir: string) {
    if (!dir || (existsSync(dir) && statSync(dir).isDirectory())) return;

    const dirList: string[] = [];
    let len: number;

    dir = normalize(dir);

    try {
      mkdirSync(dir, { recursive: true });
    } catch (e) {
      dir.split(sep).forEach(name => {
        if (!name) return;

        len = dirList.length;
        dirList.push((len ? dirList[len - 1] + sep : '') + name);
      });

      dirList.forEach(pathName => {
        if (!existsSync(pathName) || !statSync(pathName).isDirectory()) {
          mkdirSync(pathName);
        }
      });
    }
  },
  /**
   * 删除指定目录及目录下的所有文件
   */
  delDir(pathName: string, ext?: string | RegExp) {
    // 不存在
    if (!existsSync(pathName)) return 0;

    // 是文件，直接删除
    if (statSync(pathName).isFile()) {
      unlinkSync(pathName);
      return 1;
    }

    // 是目录
    let files = readdirSync(pathName);
    let curPath;
    let count = 0;

    // 空目录，移除它
    if (!files.length) {
      rmdirSync(pathName);
      return 0;
    }

    // 转换为正则
    if (ext && typeof ext === 'string') {
      ext = new RegExp(ext + '$');
    }

    files.forEach((file /*, index*/) => {
      curPath = pathName + sep + file;

      if (statSync(curPath).isDirectory()) {
        count += this.delDir(curPath, ext);
      } else if (!(ext instanceof RegExp) || ext.test(curPath)) {
        unlinkSync(curPath);
        count++;
      }
    });

    // 不按后缀方式删除，移除空目录
    files = readdirSync(pathName);
    if (!files.length) rmdirSync(pathName);

    return count;
  },
};

export function concurrency<T, E = T | undefined>(taskList: ITask<Promise<T>>[], maxDegreeOfParalellism = 5) {
  const total = taskList.length;
  let idx = 0;
  const resut: { result: T; error: E }[] = [];
  const onFinish = (result: T, error?: E) => {
    resut.push({ result, error: error as never });
    return next();
  };
  const next = (): Promise<void> => {
    if (idx >= total) return Promise.resolve();
    return taskList[idx++]()
      .then(r => onFinish(r))
      .catch(error => onFinish(null as never as T, error));
  };
  const size = Math.min(maxDegreeOfParalellism, total);
  const queue: Promise<void>[] = [];
  for (let i = 0; i < size; i++) queue.push(next());

  return Promise.allSettled(queue).then(() => resut);
}

export interface ITask<T> {
  (): T;
}
