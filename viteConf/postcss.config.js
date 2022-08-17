const autoprefixer = require('autoprefixer');
const PostcssPxToViewport = require('postcss-px-to-viewport');
const cssnano = require('cssnano');


module.exports = {
  plugins:[
    // 自动添加前缀
    autoprefixer({
      overrideBrowserslist:[
        "> 1%",
        "last 2 versions",
        "not dead",
        "not IE 11"
      ],
    }),
    // 压缩优化
    cssnano({
      preset:'default'
    })
  ]
};