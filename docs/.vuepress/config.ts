module.exports = {
    base: '/blog/',
    title: 'JuctTr的博客',
    description: 'JuctTr的博客',
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
                title: '欢迎学习',
                path: '/',
                collapsable: false, // 不折叠
                children: [
                    { title: "学前必读", path: "/" }
                ]
            },
            {
              title: "基础学习",
              path: '/handbook/type',
              collapsable: false, // 不折叠
              children: [
                { title: "条件类型", path: "/handbook/type" },
                { title: "泛型", path: "/handbook/type" }
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