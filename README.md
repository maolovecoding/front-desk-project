# Vue3 + ts + Vite + vue-router + vuex / pinia + jsx

关于vite的.env配置文件

```yaml
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码

```yaml
VITE_SOME_KEY=123
```

## Vite处理矢量图svg

安装插件：

```shell
pnpm install -D vite-plugin-svg-icons
```

### 在vite.config.ts中配置插件

```ts
import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(__dirname, "src/assets/icons")],
      // 指定 symbolId的格式 因为我们在组件上指定名称的时候也是 icon-[name]的形式
      symbolId: "icon-[name]"
    })
  ],
});
```

### 导入svg

最后，在项目启动的时候，该插件会给我们生成一个虚拟地址，我们需要在项目中导入注册这些svg

```ts
// 注册svg-icons 虚拟地址 是插件 vite-plugin-svg-icons 生成的虚拟地址
import "virtual:svg-icons-register";
// 或者 
// import 'vite-plugin-svg-icons/register';
```
