import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// const path = require("path");
// const resolve = (dir: string) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 路径别名
    },
    // extensions: [".js", ".json", ".ts"], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  plugins: [vue()],
  base: './',

  server: {
    port: 10086,
    // 反向代理
    proxy: {
      "/api-dev": {
        // target: "https://repair.woogugu.cn/",
        // target: "https://wrz.lty923.com/",
        // target: "https://baoxiu.lty923.com/",
        // target: "http://192.168.1.101:8090",
        target: "http://baoxiu1.woogugu.cn/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-dev/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            "src/assets/css/base.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
