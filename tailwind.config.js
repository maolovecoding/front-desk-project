module.exports = {
  content: ["index.html", "./src/**/*.{vue,tsx}"],
  // 手动切换暗黑模式
  darkMode: "class",
  theme: {
    extend: {
      // 配置默认的基准值
      fontSize: {
        xs: ["0.25rem", "0.35rem"],
        sm: ["0.35rem", "0.45rem"],
        base: ["0.42rem", "0.52rem"],
        lg: ["0.55rem", "0.65rem"],
        xl: ["0.65rem", "0.75rem"]
      },
      // 配置阴影
      boxShadow: {
        "l-white": "-10px 0 10px white",
        "l-zinc": "-10px 0 10px #18181b"
      },
      // 配置高度
      height: {
        header: "72px", // 头部高度直接固定
        main: "calc(100vh - 72px)" // 主体的高度 就是去掉头部header的高度
      },
      // bg-main 主色调
      colors: {
        main: "#f44c58",
        "hover-main": "#f32836",
        "success-100": "#F2F9EC",
        "success-200": "#E4F2DB",
        "success-300": "#7EC050",
        "warn-100": "#FCF6ED",
        "warn-200": "#F8ECDA",
        "warn-300": "#DCA550",
        "error-100": "#ED7456",
        "error-200": "#f3471c",
        "error-300": "#ffffff"
      },
      backdropBlur:{
        "4xl":"240px"
      },
      // scrollbar插件 支持暗黑模式
      variants: {
        scrollbar: ["dark"]
      }
    }
  },
  plugins: [
    // 清除难看的滚动条
    require("tailwind-scrollbar")
  ]
};
