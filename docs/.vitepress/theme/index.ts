import DefaultTheme from "vitepress/theme";
import CommentLayout from "./components/CommentLayout.vue";
import confetti from './components/confetti.vue'
export default {
  extends: DefaultTheme,
  // 使用注入插槽的包装组件覆盖 Layout
  Layout: CommentLayout,
  enhanceApp({ app }) {
    app.component("confetti", confetti);
    // // app.use(BgmPlayer.install);
    // vitepressMusic(playlist);
    // BgmPlayer;
  },
};
