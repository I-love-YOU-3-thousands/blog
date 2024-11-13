// vitepress官方建议的获取文章方法。本身具有缓存机制
import { createContentLoader } from 'vitepress'
import type { Post } from './types'

declare const data: Post[]
export { data }

export default createContentLoader('zh/resourceSharing/article/*/*/*.md', {
    excerpt: true,
    transform(rawData): Post[] {
        console.log('咩咩咩咩咩咩咩咩咩咩', rawData)
        return rawData.map(({ url, frontmatter }) => {
            frontmatter.readTime = 0
            return {
                frontmatter: frontmatter,
                relativePath: url,
            }
        })
            .sort((a, b) => {
                return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
            })
    }
})