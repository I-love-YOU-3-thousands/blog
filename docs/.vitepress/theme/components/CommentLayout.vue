<!-- 评论组件 -->
<template>
  <Layout>
    <template v-if="page.frontmatter.type == 'cardList'" #sidebar-nav-before>
      <span class="date">🔥&nbsp;更新时间：{{ frontmatter.type }}</span>
      <button @click="next">点击点击</button>
    </template>
    <template v-if="page.frontmatter.type == 'cardList'" #doc-before>
      <PageNavi type="top" />
    </template>
    <template v-if="page.frontmatter.type == 'cardList'" #doc-footer-before>
      <PageCtrol :bread="breadrxt" :count="posts.length" />
      <Page :posts="getposts" />
    </template>
    <template v-if="page.frontmatter.type != 'cardList'" #doc-bottom>
      <ElImageViewer
        v-if="show"
        :infinite="false"
        hide-on-click-modal
        teleported
        :url-list="previewImageInfo.list"
        :initial-index="previewImageInfo.idx"
        @close="show = false" />
      <backtotop
    /></template>

    <template #doc-after>
      <div style="margin-top: 24px">
        <Giscus
          :key="page.filePath"
          repo="I-love-YOU-3-thousands/blog"
          repo-id="R_kgDOM3cCzw"
          category="Announcements"
          category-id="DIC_kwDOM3cCz84Ci1UC"
          mapping="title"
          strict="0"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="top"
          lang="zh-CN"
          crossorigin="anonymous"
          :theme="isDark ? 'dark' : 'light'"
        />
      </div>
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import Giscus from "@giscus/vue";
import DefaultTheme from "vitepress/theme";
import {
  computed,
  watch,
  nextTick,
  provide,
  onMounted,
  onUnmounted,
  reactive,
  ref,
} from "vue";
import { useBrowserLocation, useStorage } from "@vueuse/core";
import { ElImageViewer } from "element-plus";
import { inBrowser, useData, useRouter } from "vitepress";
import { data as themeposts } from "../utils/posts.data";
import type { Post } from "../utils/types";
import { formatSearch } from "../utils/functions";
import Page from "./cardPage.vue";
const router = useRouter();
const { Layout } = DefaultTheme;
const location = useBrowserLocation();
const per_page = ref(23);

// import {imagePreview} from './imagePreview.vue'
// const props = defineProps({
//   class: {
//     type: String,
//     default: "",
//   },
//   layoutClass: {
//     type: String,
//     default: "",
//   },
//   type: {
//     type: String,
//     default: "",
//   },
// });
const { isDark, page, frontmatter } = useData();
const show = ref(false);
const previewImageInfo = reactive<{ url: string; list: string[]; idx: number }>(
  {
    url: "",
    list: [],
    idx: 0,
  }
);
function previewImage(e: Event) {
  console.log(e, "eeeeeeeeeeee", page.value.frontmatter);
  if (
    page.value.frontmatter?.type == "cardList" ||
    page.value.frontmatter?.type == "home"
  ) {
    return;
  } else {
    const target = e.target as HTMLElement;
    const currentTarget = e.currentTarget as HTMLElement;
    if (target.tagName.toLowerCase() === "img") {
      const imgs = currentTarget.querySelectorAll<HTMLImageElement>(
        ".content-container .main img"
      );
      const idx = Array.from(imgs).findIndex((el) => el === target);
      const urls = Array.from(imgs).map((el) => el.src);

      const url = target.getAttribute("src");
      previewImageInfo.url = url!;
      previewImageInfo.list = urls;
      previewImageInfo.idx = idx;
      // 兼容点击main之外的图片
      if (idx === -1 && url) {
        previewImageInfo.list.push(url);
        previewImageInfo.idx = previewImageInfo.list.length - 1;
      }
      show.value = true;
    }
  }
}

// const posts = ref<Post[]>(themeposts); //所有文章
const posts = computed(() => {
  if (selectCategory.value) {
    return themeposts.filter(
      (article: any) =>
        article?.frontmatter?.categories &&
        article?.frontmatter?.categories.includes(selectCategory.value)
    );
  } else if (selectTag.value) {
    return themeposts.filter(
      (article: any) =>
        article?.frontmatter?.tags &&
        article?.frontmatter?.tags.includes(selectTag.value)
    );
  } else if (selectYear.value && selectMonth.value) {
    return themeposts.filter(
      (article: any) =>
        article?.frontmatter?.date &&
        new Date(article?.frontmatter?.date).getFullYear() + "" ==
          selectYear.value &&
        new Date(article?.frontmatter?.date).getMonth() + 1 + "月" ==
          selectMonth.value
    );
  } else if (selectYear.value) {
    return themeposts.filter(
      (article: any) =>
        article?.frontmatter?.date &&
        new Date(article?.frontmatter?.date).getFullYear() + "" ==
          selectYear.value
    );
  } else {
    return themeposts;
  }
});

const currentpage = ref(1); //当前第几页
// const getPosts = ref<Post[]>([]); //当前页的文章
const activeTag = ref(""); //当前选中的tag
const selectTag = computed(() => activeTag.value);
const activeCategory = ref("");
const selectCategory = computed(() => activeCategory.value);
const activeYear = ref("");
const activeMonth = ref("");
const selectYear = computed(() => activeYear.value);
const selectMonth = computed(() => activeMonth.value);
const bread = ref("全部内容");
const breadrxt = computed(() => bread.value);
router.onBeforeRouteChange = (to) => {
  console.log("to", to, window.location.origin);
  const url = new URL(to, window.location.origin);
  const params = formatSearch(url.search);
  console.log("笑笑笑笑笑笑笑笑笑", url, params);
  activeTag.value = params?.tag || "";
  activeCategory.value = params?.category || "";
  activeYear.value = params?.year || "";
  activeMonth.value = params?.month || "";
  currentpage.value = Number(params?.page) || 1;
  if (params?.tag) {
    console.log("new");
    bread.value = "标签：" + params.tag;
  } else if (params?.category) {
    bread.value = "分类：" + params.category;
  } else if (params?.year && params?.month) {
    bread.value = "存档：" + params.year + "/" + params.month;
  } else if (params?.year) {
    bread.value = "存档：" + params.year;
  } else {
    bread.value = "全部内容";
  }
};
onMounted(() => {
  // getPosts.value = posts.value.slice(
  //   per_page.value * (currentpage.value - 1),
  //   per_page.value * currentpage.value
  // );

  const docDomContainer = document.querySelector("#VPContent");
  docDomContainer?.addEventListener("click", previewImage);
});

onUnmounted(() => {
  const docDomContainer = document.querySelector("#VPContent");
  docDomContainer?.removeEventListener("click", previewImage);
});

const getposts = computed(() => {
  return posts.value.slice(
    per_page.value * (currentpage.value - 1),
    per_page.value * currentpage.value
  ); //获取当前第几页的的文章集合
});

function next() {
  console.log("点击了");
  currentpage.value++;
  console.log(currentpage.value, posts);
}
watch(
  [isDark, location],
  ([dark, newlocation], [oldDark, oldLocation]) => {
    console.log("location", location, oldLocation);
    if (location.value.href) {
      const url = new URL(location.value.href!);
      activeTag.value = url.searchParams.get("tag") || "";
      activeCategory.value = url.searchParams.get("category") || "";
      activeYear.value = url.searchParams.get("year") || "";
      activeMonth.value = url.searchParams.get("month") || "";
      currentpage.value = Number(url.searchParams.get("page")) || 1;
      console.log(url.searchParams, "wqwwwwwwwwww");
      if (url.searchParams.get("tag")) {
        bread.value = "标签：" + url.searchParams.get("tag");
      } else if (url.searchParams.get("category")) {
        bread.value = "分类：" + url.searchParams.get("category");
      } else if (
        url.searchParams.get("year") &&
        url.searchParams.get("month")
      ) {
        bread.value =
          "存档：" +
          url.searchParams.get("year") +
          "/" +
          url.searchParams.get("month");
      } else if (url.searchParams.get("year")) {
        bread.value = "存档：" + url.searchParams.get("year");
      } else {
        bread.value = "全部内容";
      }
    }
    if (!inBrowser) return;

    const iframe = document
      .querySelector("giscus-widget")
      ?.shadowRoot?.querySelector("iframe");

    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
      "https://giscus.app"
    );

    // if (oldPage.relativePath != "resourceSharing/index.md") {
    //   activeCategory.value = "";
    // }
    // if (newPage.frontmatter.type === "cardList") {
    //   posts.value = themeposts;
    //   getPosts.value = posts.value.slice(
    //     per_page.value * (newCurrentpage - 1),
    //     per_page.value * newCurrentpage
    //   );
    // } else {
    //   currentpage.value = 1;
    // }
  },
  { deep: true, immediate: true }
);

// 处理主题切换动画
const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    }
  );
});
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
