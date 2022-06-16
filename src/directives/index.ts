import { App } from "vue";

/**
 * 注册指令
 */
export default {
  install(app: App) {
    // ./modules/lazy.ts: Module {Symbol(Symbol.toStringTag): 'Module'
    // 同步导入
    const modules = import.meta.globEager("./modules/*.ts");
    Object.entries(modules).forEach(([path, module]) => {
      // console.log(/\/(\w*).ts$/.exec(path)?.[1]);
      // console.log(module.default);
      // 指令名 就是文件名
      const name = /\/(\w*).ts$/.exec(path)?.[1];
      name && app.directive(name, module.default);
    });
  }
};
