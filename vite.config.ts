import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    vueJsx({
      // 开启优化
      optimize: true
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(__dirname, "src/assets/icons")],
      // 指定 symbolId的格式
      symbolId: "icon-[name]"
    })
  ],
  resolve: {
    alias: {
      // 绝对路径
      "@": resolve(__dirname, "src")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.imooc-front.lgdsunday.club/api",
        // 跨域
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  }
});
