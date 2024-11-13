import type { Post } from './types'

// 文字格式转换
export function formatSearch(se: any) {
    if (typeof se !== "undefined") {
        se = se.substr(1);
        var arr = se.split("&"),
            obj = {},
            newarr = [];
        arr.forEach((item: any) => {
            newarr = item.split("=");
            if (newarr[0]) {
                obj[newarr[0]] = decodeURIComponent(newarr[1]);
            }
        })
        return obj;
    }
}
const pattern
    = /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g

export function countWord(data: string) {
    const m = data.match(pattern)
    let count = 0
    if (!m) {
        return 0
    }
    for (let i = 0; i < m.length; i += 1) {
        if (m[i].charCodeAt(0) >= 0x4E00) {
            count += m[i].length
        }
        else {
            count += 1
        }
    }
    return count
}

// 获取所有存档
export function initArchives(post: Post[]) {
    let data = {} as any
    for (let index = 0; index < post.length; index++) {
        const element = post[index]
        if (element?.frontmatter?.date) {
            let y = (new Date(element.frontmatter.date).getFullYear());
            let m = (new Date(element.frontmatter.date).getMonth() + 1) + '月';
            if (!data[y]) {
                data[y] = {};
            }
            if (!(data[y][m])) {
                data[y][m] = [];
            }
            data[y][m].push(element);
        }
    }
    return data
}
// 获取所有 tag
export function initTags(post: Post[]) {
    const data: any = {}
    for (let index = 0; index < post.length; index++) {
        const element = post[index]
        const tags = element?.frontmatter?.tags
        if (tags) {
            tags.forEach((item: any) => {
                if (data[item]) {
                    data[item].push(element)
                } else {
                    data[item] = []
                    data[item].push(element)
                }
            })
        }
    }
    return data
}
// 获取所有分类
export function initCats(post: Post[]) {
    const data: any = {}
    for (let index = 0; index < post.length; index++) {
        const element = post[index]
        const categories = element?.frontmatter?.categories
        if (categories) {
            categories.forEach((item: any) => {
                if (data[item]) {
                    data[item].push(element)
                } else {
                    data[item] = []
                    data[item].push(element)
                }
            })
        }
    }
    return data
}