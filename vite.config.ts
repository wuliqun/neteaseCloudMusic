import { resolve } from "path";
import { defineConfig,UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'



export default defineConfig(({ command, mode }) => {
  let env = 'beta';
  let config: UserConfig = {
    root: "./src",
    resolve: {
      alias: {
        "CONFIG": resolve('./', "src/config"),
        "UTILS": resolve('./', "src/utils"),
        "API": resolve('./', "src/api"),
        "CMT": resolve('./', "src/components"),
      }
    },
    plugins: [vue()]
  };
  if (command === 'serve') {
    config.server = {
      host: '0.0.0.0',
      port: 9000,
      hmr: true
    };
  } else if (command === 'build') {
    env = "prod";
    config.build = {
      outDir: "../dist"
    };
  }
  config.define = {
    'process.env': {
      ENV: env
    }
  };
  return config;
})