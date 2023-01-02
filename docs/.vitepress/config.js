import { defineConfig } from "vitepress";

export default defineConfig({
  title: "首页",
  description: "本项目描述搭建一个基础工具库的工程化流程。",
  base: "/blog/",
  lang: "zh-hans",
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "指南", link: "/guide/Getting-Started" },
      { text: "React", link: "/react/How-do-React-hooks-really-work" },
      { text: "ECMAScript", link: "/ecmaScript/type_compare" },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/jucttr/blog/" }],
    sidebar: {
      "/react/": [
        {
          text: "React",
          items: [
            {
              text: "React是如何真正工作的",
              link: "/react/How-do-React-hooks-really-work",
            },
            {
              text: "useContext重渲染问题",
              link: "/react/useContext重渲染问题",
            },
            {
              text: "Vue和React的区别",
              link: "/react/Vue和React的区别",
            },
          ],
        },
      ],
      "/guide/": [
        {
          text: "基础",
          items: [
            {
              text: "Getting Started",
              link: "/guide/Getting-Started",
            },
          ],
        },
      ],
      "/ecmaScript/": [
        {
          text: "使用步骤",
          items: [
            {
              text: "显式类型转换和隐式类型转换",
              link: "/ecmaScript/type_compare",
            },
          ],
        },
      ],
    },
  },
});
