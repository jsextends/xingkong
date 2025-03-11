import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "星空",
  description: "一个canvas2d的渲染引擎库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "快速开始", link: "/quick-start" },
    ],

    sidebar: [
      {
        text: "形状",
        items: [
          { text: "点", link: "/geometry/point" },
          { text: "圆", link: "/geometry/circle" },
          { text: "矩形", link: "/geometry/rect" },
          { text: "椭圆", link: "/geometry/ellipse" },
          { text: "扇形", link: "/geometry/sector" },
          { text: "圆环", link: "/geometry/ring" },
        ],
      },
      {
        text: "图形",
        items: [{ text: "圆", link: "/graphics/circle" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/jsextends/xingkong" },
    ],
  },
});
