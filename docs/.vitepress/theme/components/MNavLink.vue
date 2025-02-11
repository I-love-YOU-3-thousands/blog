<script setup lang="ts">
import { computed } from 'vue';
import { withBase } from 'vitepress';
import { slugify } from '@mdit-vue/shared';

import type { NavLink } from '../utils/types';

const props = defineProps<{
  noIcon?: boolean;
  icon?: NavLink['icon'];
  badge?: NavLink['badge'];
  title?: NavLink['title'];
  desc?: NavLink['desc'];
  link: NavLink['link'];
  color: NavLink['color'];
}>();

const formatTitle = computed(() => {
  if (!props.title) {
    return '';
  }
  return slugify(props.title);
});

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg;
  return '';
});

const formatBadge = computed(() => {
  if (typeof props.badge === 'string') {
    return { text: props.badge, type: 'info' };
  }
  return props.badge;
});
</script>

<template>
  <!-- <div class="framework-row">
    <a
      class="framework-card active"
      :href="link"
      target="_blank"
      rel="noopener"
      :style="{ '--glow-color': color }"
    >
      <template v-if="!noIcon">
        <div v-if="svg" class="icon" v-html="svg"></div>
        <template v-else-if="icon && typeof icon === 'string'" class="icon">
          <img :src="withBase(icon)" :alt="title" />
        </template>
      </template>
    </a>
  </div> -->
  <div class="linkBox">
    <a
      v-if="link"
      class="m-nav-link"
      :href="link"
      target="_blank"
      rel="noreferrer"
      :style="{ '--glow-color': color }"
    >
      <article class="box" :class="{ 'has-badge': formatBadge }">
        <div class="box-header">
          <template v-if="!noIcon">
            <div v-if="svg" class="icon" v-html="svg"></div>
            <div v-else-if="icon && typeof icon === 'string'" class="icon">
              <img
                :src="withBase(icon)"
                :alt="title"
                onerror="this.parentElement.style.display='none'"
              />
            </div>
          </template>
          <h5
            v-if="title"
            :id="formatTitle"
            class="title"
            :class="{ 'no-icon': noIcon }"
          >
            {{ title }}
          </h5>
        </div>
        <!-- <Badge
          v-if="formatBadge"
          class="badge"
          :type="formatBadge.type"
          :text="formatBadge.text"
        /> -->
        <p v-if="desc" class="desc">{{ desc }}</p>
      </article>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.linkBox {
  // display: grid;
  // grid-auto-columns: 96px;
  // grid-gap: 24px;
  // margin-bottom: 24px;
  position: relative;
  // white-space: nowrap;
}
.m-nav-link {
  --m-nav-icon-box-size: 50px;
  --m-nav-icon-size: 45px;
  --m-nav-box-gap: 12px;

  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  // background-color: var(--vp-c-bg-soft);
  background: var(--vp-backdrop-bg-color);
  // transition: all 0.25s;
  transition: opacity 0.4s ease;

  &:before {
    content: '';
    position: absolute;
    top: 10%;
    left: 5%;
    right: 5%;
    bottom: 10%;
    background-color: var(--glow-color);
    filter: blur(18px);
    z-index: -1;
    opacity: 0;
    transition: opacity 3s ease;
    will-change: opacity;
  }

  &:hover {
    // transform: translateY(0); 导致整个卡片都出现颜色
    box-shadow: var(--glow-color);
    &:before {
      opacity: 1;
      transition: opacity 0.2s ease;
    }
    .box {
      color: var(--glow-color);
    }
    .desc {
      color: var(--glow-color);
    }
  }
  // &:hover {
  //   box-shadow: var(--vp-shadow-2);
  //   //border-color: var(--vp-c-brand);
  //   text-decoration: initial;
  //   background-color: var(--vp-c-bg-soft-up);
  //   transform: translateY(-5px);
  // }

  .box {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: var(--m-nav-box-gap);
    height: 100%;
    color: var(--vp-c-text-1);
    &.has-badge {
      padding-top: calc(var(--m-nav-box-gap) + 2px);
    }
    &-header {
      display: flex;
      align-items: center;
    }
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: calc(var(--m-nav-box-gap) - 2px);
    border-radius: 6px;
    width: var(--m-nav-icon-box-size);
    height: var(--m-nav-icon-box-size);
    font-size: var(--m-nav-icon-size);
    background-color: var(--vp-c-bg-soft-down);
    transition: background-color 0.25s;
    :deep(svg) {
      width: var(--m-nav-icon-size);
      fill: currentColor;
    }
    :deep(img) {
      border-radius: 4px;
      width: var(--m-nav-icon-size);
    }
  }

  .title {
    overflow: hidden;
    flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 600;
    &:not(.no-icon) {
      line-height: var(--m-nav-icon-box-size);
    }
  }

  .badge {
    position: absolute;
    top: 2px;
    right: 0;
    transform: scale(0.8);
  }

  .desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    margin: calc(var(--m-nav-box-gap) - 2px) 0 0;
    line-height: 1.5;
    font-size: 12px;
    color: var(--vp-c-text-2);
  }
}
.framework-row {
  display: grid;
  grid-auto-columns: 96px;
  grid-gap: 24px;
  justify-content: flex-start;
  margin-bottom: 24px;
  position: relative;
  white-space: nowrap;
  grid-auto-flow: column;

  &:nth-child(even) {
    --row-offset: 36px;
  }

  &:nth-child(odd) {
    --row-offset: 12px;
  }

  @media (min-width: 1080px) {
    &:nth-child(even) {
      --row-offset: 24px;
    }

    &:nth-child(odd) {
      --row-offset: -24px;
    }
  }
}
.framework-card {
  width: 96px;
  height: 96px;
  border-radius: 12px;
  border: 1px solid rgba(38, 38, 38, 0.7);
  background: var(--vp-backdrop-bg-color);
  // background: rgba(0, 0, 0, 0.6);
  // background: var(--vp-c-bg);

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  --glow-color: rgba(0, 0, 0, 0);
  opacity: 0;
  transition: opacity 0.4s ease;
  user-select: none;

  img {
    width: 47px;
    height: auto;
    border-radius: 0.8rem;
    user-select: none;
    filter: drop-shadow(
      0 0 0.8rem color-mix(in srgb, var(--glow-color) 40%, transparent)
    );
  }

  &.active {
    opacity: 1;
  }
}
.framework-card:not(:has(img)) {
  transform: scale(1) translate3d(0, 0, 0);
  transition: transform 3s ease;

  &:hover {
    transform: scale(0.9) translate3d(0, 0, 0);
    transition: transform 0.2s ease-in-out;
  }
}
.framework-card:has(img) {
  cursor: pointer;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 10%;
    left: 10%;
    right: 10%;
    bottom: 10%;
    background-color: var(--glow-color);
    filter: blur(18px);
    z-index: -1;
    opacity: 0;
    transition: opacity 3s ease;
    will-change: opacity;
  }

  &:hover {
    &:before {
      opacity: 1;
      transition: opacity 0.2s ease;
    }
  }
}

@media (max-width: 960px) {
  .m-nav-link {
    --m-nav-icon-box-size: 36px;
    --m-nav-icon-size: 20px;
    --m-nav-box-gap: 8px;

    .title {
      font-size: 14px;
    }
  }
}
</style>
