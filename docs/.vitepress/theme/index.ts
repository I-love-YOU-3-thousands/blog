import DefaultTheme from "vitepress/theme";
import CommentLayout from "./components/CommentLayout.vue";
import confetti from './components/confetti.vue'
import browseStatistics from './components/browseStatistics.vue'
import HomeUnderline from "./components/HomeUnderline.vue"
import update from "./components/update.vue"
import ArticleMetadata from "./components/ArticleMetadata.vue"
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import './style/index.css'
export default {
  extends: DefaultTheme,
  // 使用注入插槽的包装组件覆盖 Layout
  Layout: CommentLayout,
  enhanceApp({ app, router }) {
    app.component("confetti", confetti);
    app.component('browseStatistics', browseStatistics)
    app.component('HomeUnderline', HomeUnderline)
    app.component('update', update)
    app.component('ArticleMetadata', ArticleMetadata)
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch();
      };
    }
    // // app.use(BgmPlayer.install);
    // vitepressMusic(playlist);
    // BgmPlayer;
  },
};
