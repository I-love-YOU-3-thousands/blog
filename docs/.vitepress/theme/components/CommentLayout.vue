<!-- 评论组件 -->
<template>
  <Layout>
    <template #doc-footer-before
      ><ElImageViewer
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
  watch,
  nextTick,
  provide,
  onMounted,
  onUnmounted,
  reactive,
  ref,
} from "vue";
import { ElImageViewer } from "element-plus";
import { inBrowser, useData } from "vitepress";
import { log } from "console";
// import {imagePreview} from './imagePreview.vue'
const { isDark, page } = useData();
const { Layout } = DefaultTheme;
const show = ref(false);
const previewImageInfo = reactive<{ url: string; list: string[]; idx: number }>(
  {
    url: "",
    list: [],
    idx: 0,
  }
);
function previewImage(e: Event) {
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
    console.log(url, "asdasdasasdddddddddddd");

    // 兼容点击main之外的图片
    if (idx === -1 && url) {
      previewImageInfo.list.push(url);
      previewImageInfo.idx = previewImageInfo.list.length - 1;
    }
    show.value = true;
  }
}
onMounted(() => {
  const docDomContainer = document.querySelector("#VPContent");
  console.log("wwwwwwwwwwww", docDomContainer);

  docDomContainer?.addEventListener("click", previewImage);
});

onUnmounted(() => {
  const docDomContainer = document.querySelector("#VPContent");
  docDomContainer?.removeEventListener("click", previewImage);
});

watch(isDark, (dark) => {
  if (!inBrowser) return;

  const iframe = document
    .querySelector("giscus-widget")
    ?.shadowRoot?.querySelector("iframe");

  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
    "https://giscus.app"
  );
});

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
