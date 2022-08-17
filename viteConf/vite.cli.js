const { resolve } = require('path');
const { createServer, build, preview } = require('vite');
const postcssConfig = require('./postcss.config');
const alias = require('./alias');
const plugins = require('./plugins');
const { mode, env, is_preview } = require('./commander');


let config = {
  mode,
  configFile: false,
  root: resolve(__dirname, `../`),
  publicDir: resolve(__dirname, `../src/public`),
  plugins,
  base:'./',
  assetsInclude: ['**/*.svga'],
  css: {
    postcss: postcssConfig,
    // 防止 @charset 'UTF-8' 不在第一行报错
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  resolve: {
    alias,
    extensions: [".js", ".ts", ".vue", ".mjs", ".cjs"]
  },
  define: {
    'process.env': {
      ENV: env
    }
  }
};

if (mode === 'development') {
  config.server = {
    host: '0.0.0.0',
    port: 9000,
    open: true
  }
} else {
  const isProd = env === 'prod';
  config.build = {
    target: 'es2020',
    reportCompressedSize: false, // 计算文件大小，会影响打包速度
    // assetsDir: 'img',
    cssCodeSplit: true, // css文件分多个
    assetsInlineLimit: 5 * 1024, // base64编码
    sourcemap:!isProd,
    minify: 'terser',
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020'
      }
    },
    terserOptions: {
      compress: {
        warnings: isProd,
        drop_console: isProd,  // 是否删除console
        drop_debugger: isProd,  // 打包时删除 debugger
      },
      output: {
        // 去掉注释内容
        comments: isProd
      },
    },
    outDir: resolve(__dirname, `../dist}`),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        dir: resolve(__dirname, `../dist}`),
        manualChunks: {
          // 拆分代码，这个就是分包，配置完后自动按需加载
          vue: ['vue', 'vue-router', 'vuex'],
          vant: ['vant'],
        },
        // 打包后文件名
        assetFileNames: (file) => {
          let extType = file.name.slice(file.name.indexOf('.') + 1);
          if (
            /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(file.name)
          ) {
            extType = 'media'
          } else if (/\.(png|jpe?g|gif|svga?)(\?.*)?$/.test(file.name)) {
            extType = 'img'
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(file.name)) {
            extType = 'fonts'
          }
          return `${extType}/[name].[hash].[ext]`;
        },
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
      }
    }
  };

  if (is_preview) {
    config.preview = {
      host: '0.0.0.0',
      port: 9000,
      open: true
    };
  }
}
(async () => {
  if (mode === 'development') {
    const server = await createServer(config);
    await server.listen();
    server.printUrls();
  } else {
    await build(config);
    if (is_preview) {
      const previewServer = await preview(config);
      previewServer.printUrls();
    }
  }
})();
