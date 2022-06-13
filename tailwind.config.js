module.exports = {
  content: ["index.html", "./src/**/*.{vue,tsx}"],
  theme: {
    extend: {
      // 配置默认的基准值
      fontSize: {
        xs: ["0.25rem", "0.35rem"],
        sm: ["0.35rem", "0.45rem"],
        base: ["0.45rem", "0.55rem"],
        lg: ["0.55rem", "0.65rem"],
        xl: ["0.65rem", "0.75rem"]
      },
      // 配置阴影
      boxShadow: {
        "l-white": "-10px 0 10px white"
      },
      // 配置高度
      height: {
        header: "72px", // 头部高度直接固定
        main: "calc(100vh - 72px)" // 主体的高度 就是去掉头部header的高度
      },
      // bg-main 主色调
      colors: {
        main: "#f44c58",
        "hover-main": "#f32836"
      }
    }
  },
  plugins: []
};
