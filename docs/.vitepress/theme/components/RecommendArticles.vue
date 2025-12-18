<template>
  <div class="recommend-articles">
    <div class="recommend-header">
      <span class="title">🔥 推荐文章</span>
      <span class="page-info">{{ currentPage }}/{{ totalPages }}</span>
    </div>
    
    <div class="recommend-list">
      <a
        v-for="(article, index) in currentArticles"
        :key="article.relativePath"
        :href="withBase(article.relativePath || '')"
        class="recommend-item"
        :class="{ active: isCurrentArticle(article.relativePath) }"
      >
        <span class="index">{{ (currentPage - 1) * pageSize + index + 1 }}</span>
        <span class="article-title">{{ article.frontmatter?.title || '未命名文章' }}</span>
      </a>
    </div>

    <div class="recommend-pagination">
      <button 
        class="page-btn" 
        :disabled="currentPage <= 1"
        @click="prevPage"
      >
        上一页
      </button>
      <button 
        class="page-btn" 
        :disabled="currentPage >= totalPages"
        @click="nextPage"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { withBase, useData, useRoute } from 'vitepress'
import { data as posts } from '../utils/posts.data'

const { page } = useData()
const route = useRoute()

// 每页显示数量
const pageSize = 5
// 当前页码
const currentPage = ref(1)

// 总页数
const totalPages = computed(() => Math.ceil(posts.length / pageSize))

// 当前页的文章
const currentArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return posts.slice(start, end)
})

// 判断是否是当前文章
const isCurrentArticle = (articlePath: string | undefined) => {
  if (!articlePath) return false
  // 移除开头的斜杠和 .html 后缀进行比较
  const currentPath = page.value.relativePath?.replace(/\.md$/, '') || ''
  const targetPath = articlePath.replace(/^\//, '').replace(/\.html$/, '')
  // 处理 zh 前缀的情况
  const normalizedCurrent = currentPath.replace(/^zh\//, '')
  const normalizedTarget = targetPath.replace(/^zh\//, '')
  return normalizedCurrent === normalizedTarget
}

// 找到当前文章所在页并跳转
const locateCurrentArticle = () => {
  const currentPath = page.value.relativePath?.replace(/\.md$/, '') || ''
  const normalizedCurrent = currentPath.replace(/^zh\//, '')
  
  const index = posts.findIndex((post) => {
    const targetPath = (post.relativePath || '').replace(/^\//, '').replace(/\.html$/, '').replace(/^zh\//, '')
    return normalizedCurrent === targetPath
  })
  
  if (index !== -1) {
    currentPage.value = Math.floor(index / pageSize) + 1
  }
}

// 页面加载和路由变化时定位当前文章
onMounted(locateCurrentArticle)
watch(() => route.path, locateCurrentArticle)

// 上一页
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// 下一页
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped lang="scss">
.recommend-articles {
  padding: 12px 0;
}

.recommend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  .title {
    font-size: 14px;
    font-weight: 600;
    color: var(--vp-c-text-1);
  }
  
  .page-info {
    font-size: 12px;
    color: var(--vp-c-text-3);
  }
}

.recommend-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.recommend-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--vp-c-bg-soft);
  }
  
  // 当前文章高亮
  &.active {
    background-color: var(--vp-c-brand-soft);
    
    .article-title {
      color: var(--vp-c-brand);
      font-weight: 500;
    }
  }
  
  .index {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    background-color: var(--vp-c-brand);
    border-radius: 4px;
  }
  
  // 前三名特殊颜色
  &:nth-child(1) .index {
    background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
  }
  &:nth-child(2) .index {
    background: linear-gradient(135deg, #ffa94d, #ff922b);
  }
  &:nth-child(3) .index {
    background: linear-gradient(135deg, #ffd43b, #fab005);
  }
  
  .article-title {
    flex: 1;
    font-size: 13px;
    line-height: 1.4;
    color: var(--vp-c-text-2);
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    transition: color 0.2s;
  }
  
  &:hover .article-title {
    color: var(--vp-c-brand);
  }
}

.recommend-pagination {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
}

.page-btn {
  padding: 4px 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    color: var(--vp-c-brand);
    border-color: var(--vp-c-brand);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
