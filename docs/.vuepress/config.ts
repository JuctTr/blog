module.exports = {
    base: '/blog/',
    title: 'JuctTr的博客',
    description: '记录自己的学习过程',
    theme: 'reco',
    themeConfig: {
        subSidebar: 'auto',
        nav: [
            { text: '首页', link: '/' },
            { 
                text: '导航', 
                items: [
                    { text: 'Github', link: 'https://github.com/JuctTr' },
                    { text: '掘金', link: 'https://juejin.cn/user/3087084381549549/posts' }
                ]
            }
        ],
        sidebar: [
            {
                title: '首页',
                path: '/',
                collapsable: false, // 不折叠
                children: [
                    { title: "学前必读", path: "/" }
                ]
            },
            {
              title: "React",
              path: '/react/How-do-React-hooks-really-work',
              collapsable: false, // 不折叠
              children: [
                { title: "React是如何真正工作的", path: "/handbook/How-do-React-hooks-really-work" },
                // { title: "泛型", path: "/handbook/type" }
              ],
            },
            {
              title: "ECMAScript",
              path: '/ecmaScript/type_compare',
              collapsable: false, // 不折叠
              children: [
                { title: "显式类型转换和隐式类型转换", path: "/ecmaScript/type_compare" },
                // { title: "泛型", path: "/handbook/type" }
              ],
            }
        ],
        locales: {
            '/': {
                lang: 'zh-CN'
            }
        },
    }
  }