<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface TabItem {
  key: string;
  label: string;
}

interface Props {
  items: TabItem[];
  defaultTab?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultTab: '',
});

const initialTab = computed(() => {
  if (
    props.defaultTab &&
    props.items.some((item) => item.key === props.defaultTab)
  ) {
    return props.defaultTab;
  }

  return props.items[0]?.key ?? '';
});

const activeTab = ref('');

watch(
  () => [props.defaultTab, props.items],
  () => {
    activeTab.value = initialTab.value;
  },
  {
    immediate: true,
    deep: true,
  }
);

const panelId = (key: string) => `doc-tab-panel-${key}`;
const tabId = (key: string) => `doc-tab-${key}`;

const switchTab = (key: string) => {
  activeTab.value = key;
};

const onKeydown = (event: KeyboardEvent, currentIndex: number) => {
  if (!props.items.length) return;

  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

  event.preventDefault();

  const offset = event.key === 'ArrowRight' ? 1 : -1;
  const nextIndex =
    (currentIndex + offset + props.items.length) % props.items.length;
  const nextTab = props.items[nextIndex];

  if (!nextTab) return;

  activeTab.value = nextTab.key;

  requestAnimationFrame(() => {
    const nextElement = document.getElementById(tabId(nextTab.key));
    nextElement?.focus();
  });
};
</script>

<template>
  <div class="doc-tabs">
    <div class="doc-tabs__list" role="tablist" aria-label="内容切换标签">
      <button
        v-for="(item, index) in props.items"
        :id="tabId(item.key)"
        :key="item.key"
        class="doc-tabs__tab"
        :class="{ 'doc-tabs__tab--active': activeTab === item.key }"
        :aria-selected="activeTab === item.key"
        :aria-controls="panelId(item.key)"
        role="tab"
        type="button"
        :tabindex="activeTab === item.key ? 0 : -1"
        @click="switchTab(item.key)"
        @keydown="onKeydown($event, index)"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="doc-tabs__content">
      <section
        v-for="item in props.items"
        :id="panelId(item.key)"
        :key="item.key"
        class="doc-tabs__panel"
        :class="{ 'doc-tabs__panel--active': activeTab === item.key }"
        :aria-labelledby="tabId(item.key)"
        role="tabpanel"
        v-show="activeTab === item.key"
      >
        <slot :name="item.key" />
      </section>
    </div>
  </div>
</template>
