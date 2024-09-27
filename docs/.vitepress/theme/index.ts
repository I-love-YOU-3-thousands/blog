import DefaultTheme from "vitepress/theme";
import CommentLayout from "./components/CommentLayout.vue";
import confetti from './components/confetti.vue'
import browseStatistics from './components/browseStatistics.vue'

import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
export default {
  extends: DefaultTheme,
  // 使用注入插槽的包装组件覆盖 Layout
  Layout: CommentLayout,
  enhanceApp({ app, router }) {
    app.component("confetti", confetti);
    app.component('browseStatistics', browseStatistics)
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
