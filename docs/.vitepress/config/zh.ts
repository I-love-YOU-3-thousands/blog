import { createRequire } from 'module';
import { defineConfig, type DefaultTheme } from 'vitepress';
import { set_sidebar } from '../theme/utils/autoSiderbar.mjs';

const require = createRequire(import.meta.url);
const pkg = require('vitepress/package.json');

export const zh = defineConfig({
  lang: 'zh-CN',
  description: '通过vitepress 构建的 Vue 风格的静态站点博客。',

  themeConfig: {
    nav: nav(),
    // sidebar: {
    //   "/guide/": { base: "/guide/", items: sidebarGuide() },
    //   "/reference/": { base: "/reference/", items: sidebarReference() },
    // },

    sidebar: {
      '/guide/': set_sidebar('zh/guide'),
      '/knowledgePopularization/': set_sidebar('zh/knowledgePopularization'),
      '/interview/': set_sidebar('zh/interview'),
      '/resourceSharing/': set_sidebar('zh/resourceSharing'),
    },

    editLink: {
      pattern:
        'https://github.com/I-love-YOU-3-thousands/blog/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2019-${new Date().getFullYear()} 小十三`,
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      level: [2, 4], // 显示2-4级标题
      // level: 'deep', // 显示2-6级标题
      label: '当前页大纲', // 文字显示
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '指南',
      activeMatch: '/guide/',
      items: [
        {
          text: '介绍',
          items: [{ text: '前言', link: '/guide/introduce/preface' }],
        },
        {
          text: '基础配置',
          items: [
            {
              text: '快速上手',
              link: '/guide/basicConfiguration/getting-started',
            },
            { text: '配置', link: '/guide/basicConfiguration/configuration' },
            { text: '页面', link: '/guide/basicConfiguration/page' },
            {
              text: 'Frontmatter',
              link: '/guide/basicConfiguration/frontmatter',
            },
          ],
        },
        {
          text: '进阶玩法',
          items: [
            { text: 'Markdown', link: '/guide/advancedGameplay/markdown' },
            { text: '团队', link: '/guide/advancedGameplay/team' },
            { text: '静态部署', link: '/guide/advancedGameplay/assets' },
            { text: '样式美化', link: '/guide/advancedGameplay/style' },
            { text: '组件', link: '/guide/advancedGameplay/components' },
            { text: '布局插槽', link: '/guide/advancedGameplay/layout' },
            { text: '插件', link: '/guide/advancedGameplay/plugin' },
            { text: '更新及卸载', link: '/guide/advancedGameplay/update' },
            { text: '搭建导航', link: '/guide/advancedGameplay/nav' },
          ],
        },
      ],
    },
    {
      text: '前端面经',
      activeMatch: '/interview/',
      items: [
        {
          text: '基础进阶',
          // link: "/interview/basicAdvanced/index",
          items: [
            { text: '基础篇', link: '/interview/basicAdvanced/1-base' },
            { text: '进阶篇', link: '/interview/basicAdvanced/2-advanced' },
            {
              text: '高频篇',
              link: '/interview/basicAdvanced/3-highFrequency',
            },
            {
              text: '综合题型篇',
              link: '/interview/basicAdvanced/4-comprehensive',
            },
            { text: '手写篇', link: '/interview/basicAdvanced/5-handwriting' },
          ],
        },
        {
          //精选模块
          text: '精选模块',
          items: [
            { text: '精选篇', link: '/interview/featuredModules/featured' },
            { text: '进阶篇', link: '/interview/featuredModules/advanced' },
            {
              text: '场景再现',
              link: '/interview/featuredModules/sceneReproduction',
            },
            {
              text: '面试案例',
              link: '/interview/basicAdvanced/4-comprehensive',
            },
          ],
        },
      ],
    },
    {
      text: '知识科普',
      items: [
        {
          text: '科学上网',
          link: '/knowledgePopularization/scientificInternet/introduce',
          activeMatch: '/knowledgePopularization/scientificInternet',
        },
        {
          text: '电脑相关',
          link: '/knowledgePopularization/computer/system/wepe',
          activeMatch: '/knowledgePopularization/computer',
        },
        {
          text: '网站相关',
          link: '/knowledgePopularization/websiteRelated/base/server/introduce',
          activeMatch: '/knowledgePopularization/websiteRelated',
        },
      ],
    },
    {
      text: '项目开发',
      items: [
        {
          text: 'React',
          link: '/project/react/1',
          activeMatch: '/project/react',
        },
      ],
    },
    {
      text: '文章分享',
      link: '/resourceSharing/index.md',
      activeMatch: '/resourceSharing/',
    },
    {
      text: pkg.version,
      items: [
        {
          text: '更新日志',
          link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md',
        },
        {
          text: '参与贡献',
          link: 'https://github.com/vuejs/vitepress/blob/main/.github/contributing.md',
        },
      ],
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '简介',
      collapsed: false,
      items: [
        { text: '什么是 VitePress？', link: 'what-is-vitepress' },
        { text: '快速开始', link: 'getting-started' },
        { text: '路由', link: 'routing' },
        { text: '部署', link: 'deploy' },
      ],
    },
    {
      text: '写作',
      collapsed: false,
      items: [
        { text: 'Markdown 扩展', link: 'markdown' },
        { text: '资源处理', link: 'asset-handling' },
        { text: 'frontmatter', link: 'frontmatter' },
        { text: '在 Markdown 使用 Vue', link: 'using-vue' },
        { text: '国际化', link: 'i18n' },
      ],
    },
    {
      text: '自定义',
      collapsed: false,
      items: [
        { text: '自定义主题', link: 'custom-theme' },
        { text: '扩展默认主题', link: 'extending-default-theme' },
        { text: '构建时数据加载', link: 'data-loading' },
        { text: 'SSR 兼容性', link: 'ssr-compat' },
        { text: '连接 CMS', link: 'cms' },
      ],
    },
    {
      text: '实验性功能',
      collapsed: false,
      items: [
        { text: 'MPA 模式', link: 'mpa-mode' },
        { text: 'sitemap 生成', link: 'sitemap-generation' },
      ],
    },
    { text: '配置和 API 参考', base: '/reference/', link: 'site-config' },
  ];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '参考',
      items: [
        { text: '站点配置', link: 'site-config' },
        { text: 'frontmatter 配置', link: 'frontmatter-config' },
        { text: '运行时 API', link: 'runtime-api' },
        { text: 'CLI', link: 'cli' },
        {
          text: '默认主题',
          base: '/reference/default-theme-',
          items: [
            { text: '概览', link: 'config' },
            { text: '导航栏', link: 'nav' },
            { text: '侧边栏', link: 'sidebar' },
            { text: '主页', link: 'home-page' },
            { text: '页脚', link: 'footer' },
            { text: '布局', link: 'layout' },
            { text: '徽章', link: 'badge' },
            { text: '团队页', link: 'team-page' },
            { text: '上下页链接', link: 'prev-next-links' },
            { text: '编辑链接', link: 'edit-link' },
            { text: '最后更新时间戳', link: 'last-updated' },
            { text: '搜索', link: 'search' },
            { text: 'Carbon Ads', link: 'carbon-ads' },
          ],
        },
      ],
    },
  ];
}

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
  zh: {
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档',
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消',
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除',
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接',
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索提供者',
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈',
        },
      },
    },
  },
};
