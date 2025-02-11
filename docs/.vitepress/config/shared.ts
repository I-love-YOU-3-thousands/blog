import { defineConfig } from 'vitepress';
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader,
} from 'vitepress-plugin-group-icons';
import { search as enSearch } from './en';
import { search as zhSearch } from './zh';
export const shared = defineConfig({
  title: 'Safety',
  base: '/blog/',
  rewrites: {
    'zh/:rest*': ':rest*',
  },
  lastUpdated: true,
  cleanUrls: false, //开启纯净链接
  metaChunk: true,

  markdown: {
    math: true,
    image: {
      // 开启图片懒加载
      lazyLoading: true,
    },
    lineNumbers: true,
    // theme: "material-theme-palenight",
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code');
        },
      },
    ],
    // 组件插入h1标题下
    config: (md) => {
      md.use(groupIconMdPlugin);
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      };
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          ts: localIconLoader(
            import.meta.url,
            '../../public/svg/typescript.svg'
          ), //本地ts图标导入
          md: localIconLoader(import.meta.url, '../../public/svg/md.svg'), //markdown图标
          css: localIconLoader(import.meta.url, '../../public/svg/css.svg'), //css图标
          js: 'logos:javascript', //js图标
        },
      }), //代码组图标
    ],
  },

  sitemap: {
    hostname: 'https://vitepress.dev',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'));
    },
  },

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/blog/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/jpg', href: '/blog/logo.jpg' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh' }],
    ['meta', { property: 'og:title', content: 'VitePress | Vite & Vue Powered Static Site Generator' }],
    ['meta', { property: 'og:site_name', content: 'VitePress' }],
    ['meta', { property: 'og:image', content: 'https://vitepress.dev/vitepress-og.jpg' }],
    ['meta', { property: 'og:url', content: 'https://vitepress.dev/' }],
    ['script', { src: 'https://cdn.usefathom.com/script.js', 'data-site': 'AZBRSFGG', 'data-spa': 'auto', defer: '' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' }],
    // ['script', { src: 'https://giscus.app/client.js', type: 'module' }]

  ],
  ignoreDeadLinks: true, //忽略死链
  themeConfig: {
    //上次更新时间
    lastUpdated: {
      text: '上次更新时间',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium', // 可选值full、long、medium、short
      },
    },
    // logo: { src: "/logo.svg", width: 24, height: 24 },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/I-love-YOU-3-thousands/blog',
        ariaLabel: 'github',
      },
      {
        icon: {
          svg: '<svg t="1727406569967" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21231" width="200" height="200"><path d="M306.005333 117.632L444.330667 256h135.296l138.368-138.325333a42.666667 42.666667 0 1 1 60.373333 60.373333L700.330667 256H789.333333A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.333333 149.333333 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 1 1 60.373333-60.373334v0.042667zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.856L853.333333 746.666667v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 1 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="#09121F" p-id="21232"></path></svg>',
        },
        link: 'https://space.bilibili.com/388661286',
        ariaLabel: 'bilibili',
      },
    ],

    search: {
      provider: 'algolia',
      options: {
        appId: '8J64VVRP8K',
        apiKey: '52f578a92b88ad6abde815aae2b0ad7c',
        indexName: 'vitepress',
        locales: {
          ...zhSearch,
          ...enSearch,
        },
      },
    },

    carbonAds: { code: 'CEBDT27Y', placement: 'vuejsorg' },
  },
});
