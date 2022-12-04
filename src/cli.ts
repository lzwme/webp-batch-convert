import { program } from 'commander';
import { utils, cwebp } from './index.js';

const pkg = require('../package.json');
program
  .version(pkg.version, '-V, --version', '当前版本')
  .helpOption('-h, --help', '查看帮助信息')
  .description(pkg.description)
  .allowUnknownOption()
  // .argument('[in]', '图片源文件目录')
  // .argument('[out]', 'webp图片输出目录')
  .option('-I, --in <src>', '图片源文件目录')
  .option('-O, --out <dest>', 'webp图片输出目录')
  .option('-D, --debug', '调试模式', false)
  .option('-R, --root-dir <dirpath>', '指定程序工作目录')
  .option('-E, --extensions <ext...>', `指定要处理的图片类型`, ['jpg', 'png', 'bmp', 'jpg', 'jpeg'])
  .option('-N, --no-skip-exists', '跳过在输出目录已存在的文件', true)
  .option('-P, --parallelism <num>', '并行处理的数量。', '8')
  // ---- cwebp options start ----
  .option('-q <int>', `quality factor (0:small..100:big), default=75`)
  .option('--alpha_q <int>', `transparency-compression quality (0..100), default=100`)
  .option('-preset <string>', `preset setting.one of: default, photo, picture, drawing, icon, text`)
  .option('-z <int>', `activates lossless preset with given level in [0:fast, ..., 9:slowest]`)
  .option('-m <int>', `compression method (0=fast, 6=slowest), default=4`)
  .option('--segments <int>', `number of segments to use (1..4), default=4`)
  .option('--size <int>', `target size (in bytes)`)
  .option('--psnr <float>', `target PSNR (in dB. typically: 42)`)
  .option('-s <width...>', `input size (width x height) for YUV`)
  .option('--sns <int>', `spatial noise shaping (0:off, 100:max), default=50`)
  .option('-f <int>', `filter strength (0=off..100), default=60`)
  .option('--sharpness <int>', `filter sharpness (0:most .. 7:least sharp), default=0`)
  .option('--nostrong', `use simple filter instead of strong`)
  .option('--sharp_yuv', `use sharper (and slower) RGB->YUV conversion`)
  .option('--partition_limit <int>', `limit quality to fit the 512k limit on the first partition (0=no degradation ... 100=full)`)
  .option('--pass <int>', `analysis pass number (1..10)`)
  .option('--qrange <int...>', `<min> <max> - specifies the permissible quality range (default: 0 100)`)
  .option('--crop <int...>', `<x> <y> <w> <h> - crop picture with the given rectangle`)
  .option('--resize <int...>', `<w> <h> - resize picture (after any cropping)`)
  .option('--mt', `use multi-threading if available`)
  .option('--low_memory', `reduce memory usage (slower encoding)`)
  .option('--map <int>', `print map of extra info`)
  .option('--print_psnr', `prints averaged PSNR distortion`)
  .option('--print_ssim', `prints averaged SSIM distortion`)
  .option('--print_lsim', `prints local-similarity distortion`)
  .option('-d <file.pgm>', `dump the compressed output (PGM file)`)
  .option('--alpha_method <int>', `transparency-compression method (0..1), default=1`)
  .option('--alpha_filter <str>', `predictive filtering for alpha plane, one of: none, fast (default) or best`)
  .option('--exact', `preserve RGB values in transparent area, default=off`)
  .option(
    '--blend_alpha <hex>',
    `blend colors against background color expressed as RGB values written in hexadecimal, e.g. 0xc0e0d0 for red=0xc0 green=0xe0 and blue=0xd0`
  )
  .option('--noalpha', `discard any transparency information`)
  .option('--lossless', `encode image losslessly, default=off`)
  .option('--near_lossless <int>', `use near-lossless image preprocessing (0..100=off), default=100`)
  .option('--hint <string>', `specify image characteristics hint, one of: photo, picture or graph`)
  .option(
    '--metadata <string>',
    `comma separated list of metadata to copy from the input to the output if present. Valid values: all, none (default), exif, icc, xmp`
  )
  .option('--short', `condense printed message`)
  .option('--quiet', `don't print anything`)
  .option('--noasm', `disable all assembly optimizations`)
  .option('-v', `verbose, e.g. print encoding/decoding times`)
  .option('--progress', `report encoding progress`)
  .option('--jpeg_like', `roughly match expected JPEG size`)
  .option('--af', `auto-adjust filter strength`)
  .option('--pre', `pre-processing filter`)
  // ---- cwebp options end ----
  .action(options => {
    const src = options.in;
    const dest = options.out;
    if (options.debug) console.log(options);
    if (!src || !dest) return program.help();

    delete options.in;
    delete options.out;
    return cwebp(src, dest, options).then(r => {
      console.log(
        [
          `Successfully in \x1b[32m${r.timecost}\x1b[0m ms!`,
          ` - Total     : \x1b[96m${r.total}\x1b[0m`,
          ` - Exists    : \x1b[93m${r.exist}\x1b[0m`,
          ` - Converted : \x1b[92m${r.converted}\x1b[0m`,
        ].join('\n')
      );
    });
  });

program
  .command('rm <dirpath>')
  .description('删除一个目录及其子目录')
  .option('--ext <extension>', '按文件后缀删除文件', '.webp')
  .action((dirpath: string, options) => {
    utils.delDir(dirpath, options.ext);
  });

program.parse(process.argv);
