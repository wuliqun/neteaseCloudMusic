const vue = require('@vitejs/plugin-vue');
const legacy = require('@vitejs/plugin-legacy');
const babel = require('vite-plugin-babel')
const { createHtmlPlugin } = require('vite-plugin-html');

const { mode, env } = require('./commander');
const plugins = [
  vue(), // 加载.vue
];


if (env === 'prod') {
  // 压缩html
  plugins.push(createHtmlPlugin());
}

if (mode === 'production') {
  // 兼容性
  plugins.push(
    legacy({
      targets: ['> 1%, last 2 version, not dead, not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  );
  // 添加babel 转换 ?.  ??, 以兼容iphone 6
  plugins.push(babel.default({
    babelConfig:{
      presets:[['@babel/preset-typescript',{onlyRemoveTypeImports:true}]],
      plugins: ['@babel/plugin-proposal-optional-chaining','@babel/plugin-proposal-nullish-coalescing-operator']
    },
    // 排除node_modules
    filter:/^((?!node_modules).)*\.(j|t)sx?$/
  }));
}

module.exports = plugins;