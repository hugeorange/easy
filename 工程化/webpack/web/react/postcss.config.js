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
      'precss': {}, // scss 语法风格，各种功能均可使用
      'postcss-cssnext': {
        browsers: AUTOPREFIXER_BROWSERS
      },
    },
  };
  