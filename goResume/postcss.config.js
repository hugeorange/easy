const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 6',
    'Opera >= 12',
    'Safari >= 7.1',
];
module.exports = {
    plugins: {
    //   'postcss-import': {},
    //   'postcss-nested': {},
      'precss': {}, // scss 语法风格
      'postcss-cssnext': {
        browsers: AUTOPREFIXER_BROWSERS
      },
      'cssnano': {}  // 放在 postcss-cssnext 这个后面才会自动加前缀
    },
  };
  