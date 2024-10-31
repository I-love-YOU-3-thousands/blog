import path from "node:path";
import fs, { link } from "node:fs";
// 文件根目录
const DIR_PATH = path.resolve("docs");
// 白名单,过滤不是文章的文件和文件夹
const WHITE_LIST = [
  "index.md",
  ".vitepress",
  "node_modules",
  "assets",
  "public",
];
// 判断是否是文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory();
// 取差值
const intersections = (arr1, arr2) =>
  Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))));

// 把方法导出直接使用
function getList(params, path1, pathname) {
  // 存放结果
  const res = [];
  // 开始遍历params
  for (let file in params) {
    // 拼接目录
    const dir = path.join(path1, params[file]);
    // 判断是否assets文件夹
    if (dir.endsWith(".assets")) {
      continue;
    }

    // 判断是否是文件夹
    const isDir = isDirectory(dir);
    if (isDir) {
      // 获取index.md
      // sortValue: 侧边栏排列顺序,值越小排前面
      // sideName: 侧边栏名称
      let sortValue, sideName;
      let indexPath = path.join(dir, "index.md");
      const markdownContent = readMarkdownFile(indexPath);
      if (markdownContent) {
        sortValue = extractSortValue(markdownContent);
        sideName = extractSideName(markdownContent);
      }
      // 如果是文件夹,读取之后作为下一次递归参数
      const files = fs.readdirSync(dir);
      res.push({
        // text: params[file].replace(/^\d+\./g, ""),
        text: sideName,
        collapsible: true, // 表示可折叠
        collapsed: true, // 表示默认折叠
        items: getList(files, dir, `${pathname}/${params[file]}`),
        sort: sortValue,
      });
    } else {
      // 主逻辑
      let sortValue, sideName, layout;
      const markdownContent = readMarkdownFile(dir);
      if (markdownContent) {
        sortValue = extractSortValue(markdownContent);
        sideName = extractSideName(markdownContent);
      }
      // 获取名字
      const name = path.basename(params[file]);

      // 排除非 md 文件
      const suffix = path.extname(params[file]);
      if (suffix !== ".md") {
        continue;
      }
      if (name == "index.md") {
        continue;
      }
      const newStr = `/${pathname}/${name}`
        .replace("/zh", "")
        .replace(".md", "");

      res.push({
        // text: name.replace(/(^\d+\.)|(\.md$)/g, ""),
        text: sideName,
        // link: `/${pathname}/${name}`,
        // link: `${name}`,
        link: `${newStr}`,
        sort: sortValue,
      });
    }
  }
  return sortData(res);
}

function sortData(arr) {
  return arr
    .sort((a, b) => a.sort - b.sort)
    .map((item) => {
      if (item.items && item.items.length > 0) {
        item.items = sortData(item.items);
      }
      return item;
    });
}
function extractPath(path) {
  // 按'/'切割字符串，得到数组
  const parts = path.split(".")[0];

  const pathActive = parts.split("/");
  pathActive.splice(1, 1);
  return pathActive.join("/");
}

// 读取 Markdown 文件内容的函数
function readMarkdownFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}
// 从 Markdown 内容中提取 sort 值的函数
function extractSortValue(content) {
  // 使用正则表达式匹配 --- sort: 数字 --- 的格式
  const regex = /sort:\s*(\d+)/;
  const match = content.match(regex);
  // 如果匹配成功，返回捕获的数字，否则返回 null
  return match ? parseInt(match[1], 10) : null;
}

function extractSideName(content) {
  // 使用正则表达式匹配 #后的文字 来当作侧边栏名称
  // const regex = /sideName:\s*(.+)/;
  const regex = /sideName:\s*([\w\u4e00-\u9fa5]+)/;
  // const regex = /^#\s*(.+?)$/m;

  const match = content.match(regex);
  // 如果匹配成功，返回捕获的数字，否则返回 null
  return match ? match[1] : null;
}

function extractLayout(content) {
  // 使用正则表达式匹配 --- sort: 数字 --- 的格式
  const regex = /layout:\s*(.+)/;
  //   const regex = /^#\s*(.+?)$/m;

  const match = content.match(regex);
  // 如果匹配成功，返回捕获的数字，否则返回 null
  return match ? match[1] : null;
}

export const set_sidebar = (pathname) => {
  // 获取pathname的路径
  const dirPath = path.join(DIR_PATH, pathname);
  // 读取pathname下的所有文件或者文件夹
  const files = fs.readdirSync(dirPath);
  // 过滤掉
  const items = intersections(files, WHITE_LIST);
  const a = getList(items, dirPath, pathname);
  // getList 函数后面会讲到
  return getList(items, dirPath, pathname);
};
