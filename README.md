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
