module.exports = {
  // 站点配置
  lang: "zh-CN",
  title: "Project Anni",
  description:
    "为音频元数据整理、音频仓库分发、音频附加数据管理提供完整的解决方案。",

  // 主题和它的配置
  theme: "@vuepress/theme-default",
  themeConfig: {
    logo: null,
    repo: "https://github.com/ProjectAnni",
    navbar: [
      {
        text: "开发文档",
        link: "https://book.anni.rs",
      },
      {
        text: "项目",
        children: [
          {
            text: "Anni - 音频处理工具",
            link: "https://github.com/ProjectAnni/anni",
          },
          {
            text: "Annil - 音频分发服务端",
            link: "https://github.com/ProjectAnni/anni/annil",
          },
          {
            text: "Anniv - 附加信息服务端",
            link: "https://github.com/ProjectAnni/anniv-go",
          },
          {
            text: "Anniw - 网页应用",
            link: "https://github.com/ProjectAnni/anniw",
          },
          {
            text: "Annix - 客户端应用",
            link: "https://github.com/ProjectAnni/annix",
          },
        ],
      },
    ],
    sidebar: [
      {
        title: "教程",
        path: "/guide",
        children: [
          'intro',
          'deploy',
        ],
      }
    ],
  },
};
