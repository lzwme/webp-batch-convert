import { existsSync, mkdirSync } from 'fs'; // node:fs
import { dirname, resolve } from 'path';
import { execFile } from 'child_process';
import glob from 'fast-glob';
import { concurrency } from './utils.js';
import { WBCOptions } from './type';

const ignoreKeys = new Set(['debug', 'rootDir', 'extensions', 'skipExists', 'parallelism']);

function getCwebpArgs(options: WBCOptions) {
  let o: string[] = [];

  if (typeof options !== 'object') return o;

  for (let [key, value] of Object.entries(options)) {
    if (ignoreKeys.has(key) || value === false || value === 'false') continue;

    o.push('-' + key);

    if (value && value !== true && value !== 'true') {
      if (Array.isArray(value)) value.forEach(v => o.push(v));
      else o.push(value);
    }
  }

  return o;
}

export async function cwebp(src: string, dest: string, options: WBCOptions) {
  const startTime = Date.now();
  const result = { total: 0, exist: 0, converted: 0, timecost: 0 };

    if (!src || !dest) {
    console.error('请指定 src 和 dest 参数');
    return result;
  }

  options = { rootDir: process.cwd(), ...options };
  if (!options.extensions?.length) options.extensions = ['png', 'jpg', 'jpeg', 'bmp'];
  src = resolve(options.rootDir, src);
  dest = resolve(options.rootDir, dest);

  const args = getCwebpArgs(options);
  const exts = options.extensions.map(d => d.replace(/^\./, '')).join(',');
  const extGlobPattern = `**/*.${options.extensions.length > 1 ? `{${exts}}` : exts}`;
  const fileList = await glob(extGlobPattern, { cwd: src, absolute: false });
  const cwebpBin = await eval(`import('cwebp-bin')`);
  const handler = (shortpath: string) => {
    const fileSrc = resolve(src, shortpath);
    const fileDesc = resolve(dest, shortpath.replace(/\.[a-z]+$/i, '.webp'));
    if (options.debug) console.log(fileSrc, '\x1b[35m=>\x1b[m', fileDesc);

    return new Promise((rs, rj) => {
      if (existsSync(fileDesc)) {
        result.exist++;
        if (options.skipExists !== false) return rs(fileDesc);
      } else if (!existsSync(dirname(fileDesc))) {
        mkdirSync(dirname(fileDesc), { recursive: true });
      }

      execFile(cwebpBin.default || cwebpBin, args.concat([fileSrc, '-o', fileDesc]), (err: unknown, stdout: string, stderr: string) => {
        if (err) {
          console.error(err);
          return rj(err);
        }

        result.converted++;
        if (!options.quiet) console.log(`\x1b[32m[${result.converted}] Image is converted! - ${fileSrc}\x1b[0m`);
        if (options.debug) console.log(stdout || stderr || err);
        rs(fileDesc);
      });
    });
  };
  const taskList = fileList.map(shortpath => () => handler(shortpath));

  result.total = fileList.length;
  if (options.debug && args.length) console.log('cwebp args:', args);
  await concurrency(taskList, Math.max(1, +options.parallelism || 8));

  result.timecost = Date.now() - startTime;
  return result;
}
