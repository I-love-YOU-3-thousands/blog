import DefaultTheme from "vitepress/theme";
import CommentLayout from "./components/CommentLayout.vue";
import confetti from './components/confetti.vue'
import browseStatistics from './components/browseStatistics.vue'
import HomeUnderline from "./components/HomeUnderline.vue"
import update from "./components/update.vue"
import ArticleMetadata from "./components/ArticleMetadata.vue"
import backtotop from "./components/backtotop.vue";
import Linkcard from "./components/Linkcard.vue"
import MNavLinks from './components/MNavLinks.vue'
import Archives from './components/Archives.vue'
import Tags from './components/Tags.vue'
import PageNavi from './components/PageNavi.vue'
import PageCtrol from './components/PageCtrol.vue'
import ArticleList from './components/ArticleList.vue'
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import 'element-plus/theme-chalk/el-icon.css'
import 'element-plus/theme-chalk/el-image.css'
import 'element-plus/theme-chalk/el-image-viewer.css'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import './style/index.css'
import 'virtual:group-icons.css' //代码组样式
import { h } from "vue";
import { useData } from 'vitepress'
export default {

  extends: DefaultTheme,
  // Layout: CommentLayout,
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取frontmatter
    const { frontmatter } = useData()
    if (frontmatter.value.type == 'cardList') {
      props.type = frontmatter.value.type
    } else {
      // 添加自定义class
      if (frontmatter.value?.layoutClass) {
        props.class = frontmatter.value.layoutClass
      }
    }
    return h(CommentLayout, props)
  },
  enhanceApp({ app, router }) {
    app.component("confetti", confetti);
    app.component('browseStatistics', browseStatistics)
    app.component('HomeUnderline', HomeUnderline)
    app.component('update', update)
    app.component('ArticleMetadata', ArticleMetadata)
    app.component('backtotop', backtotop)
    app.component('Linkcard', Linkcard)
    app.component('MNavLinks', MNavLinks)
    app.component('Tags', Tags)
    app.component('Archives', Archives)
    app.component('PageCtrol', PageCtrol)
    app.component('ArticleList', ArticleList)
    app.component('PageNavi', PageNavi)
    app.use(FloatingVue, {
      themes: {
        'tooltip': {
          distance: 8,
          delay: { show: 500, hide: 0 },
        },
      },
    })
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
