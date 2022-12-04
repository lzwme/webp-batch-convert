export interface CwebpOptions {
  /** <float>  --  quality factor (0:small..100:big), default=75 */
  q?: number;
  /** <int>  --  transparency-compression quality (0..100), default=100 */
  alpha_q?: number;
  /**
   * preset setting
   * - one of: default, photo, picture, drawing, icon, text
   * - preset must come first, as it overwrites other parameters
   */
  preset?: string;
  /** activates lossless preset with given level in [0:fast, ..., 9:slowest] */
  z?: number;
  /** compression method (0=fast, 6=slowest), default=4 */
  m?: number;
  /** <int>  --  number of segments to use (1..4), default=4 */
  segments?: number;
  /** <int>  --  target size (in bytes) */
  size?: number;
  /** <float>  --  target PSNR (in dB. typically: 42) */
  psnr?: number;
  /** <int> <int>  --  input size (width x height) for YUV */
  s?: number;
  /** <int>  --  spatial noise shaping (0:off, 100:max), default=50 */
  sns?: number;
  /** <int>  --  filter strength (0=off..100), default=60 */
  f?: number;
  /** <int>  --  filter sharpness (0:most .. 7:least sharp), default=0 */
  sharpness?: number;
  //   /** use strong filter instead of simple (default) */
  //   strong?: boolean;
  /**  use simple filter instead of strong */
  nostrong?: boolean;
  /** use sharper (and slower) RGB->YUV conversion */
  sharp_yuv?: boolean;
  /** <int>  --  limit quality to fit the 512k limit on the first partition (0=no degradation ... 100=full) */
  partition_limit?: number;
  /** <int>  --  analysis pass number (1..10) */
  pass?: number;
  /** <min> <max>  --  specifies the permissible quality range (default: 0 100) */
  qrange?: number[];
  /** <x> <y> <w> <h> - crop picture with the given rectangle */
  crop?: number[];
  /** <w> <h> - resize picture (after any cropping) */
  resize?: number[];
  /** use multi-threading if available */
  mt?: boolean;
  /** reduce memory usage (slower encoding) */
  low_memory?: boolean;
  /** <int> - print map of extra info */
  map?: number;
  /** prints averaged PSNR distortion */
  print_psnr?: boolean;
  /** prints averaged SSIM distortion */
  print_ssim?: boolean;
  /** prints local-similarity distortion */
  print_lsim?: boolean;
  /**  <file.pgm>  --  dump the compressed output (PGM file) */
  d?: string;
  /**  <int>  --  transparency-compression method (0..1), default=1 */
  alpha_method?: number;
  /**  <string>  --  predictive filtering for alpha plane, one of: none, fast (default) or best */
  alpha_filter?: string;
  /** preserve RGB values in transparent area, default=off */
  exact?: boolean;
  /**  <hex>  --  blend colors against background color expressed as RGB values written in hexadecimal, e.g. 0xc0e0d0 for red=0xc0 green=0xe0 and blue=0xd0 */
  blend_alpha?: string;
  /** discard any transparency information */
  noalpha?: boolean;
  /** encode image losslessly, default=off */
  lossless?: boolean;
  /**  <int>  --  use near-lossless image preprocessing (0..100=off), default=100 */
  near_lossless?: number;
  /**  <string>  --  specify image characteristics hint, one of: photo, picture or graph */
  hint?: string;
  /**  <string>  --  comma separated list of metadata to copy from the input to the output if present. Valid values: all, none (default), exif, icc, xmp */
  metadata?: string;
  /** condense printed message */
  short?: boolean;
  /** don't print anything */
  quiet?: boolean;
  /** disable all assembly optimizations */
  noasm?: boolean;
  /** verbose, e.g. print encoding/decoding times */
  v?: boolean;
  /** report encoding progress */
  progress?: boolean;
  /** roughly match expected JPEG size */
  jpeg_like?: boolean;
  /** auto-adjust filter strength */
  af?: boolean;
  /**  <int>  --  pre-processing filter` */
  pre?: boolean;
}

export interface WBCOptions extends CwebpOptions {
  debug?: boolean;
  rootDir?: string;
  /** Image extensions. default: ['.jpg', '.png', '.bmp', '.jpg', '.jpeg'] */
  extensions?: string[];
  skipExists?: boolean;
  /** The number of parallel processed task in the compilation. default: 8 */
  parallelism?: number;
}
