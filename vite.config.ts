import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // 开启优化
      optimize: true
    })
  ],
  resolve: {
    alias: {
      // 绝对路径
      "@": resolve(__dirname, "src")
    }
  }
});
