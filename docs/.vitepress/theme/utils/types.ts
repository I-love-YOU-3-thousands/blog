/* type.ts */
export interface NavLink {
  /** 站点图标 */
  icon?: string | { svg: string };
  badge?:
    | string
    | {
        text?: string;
        type?: "info" | "tip" | "warning" | "danger";
      };
  /** 站点名称 */
  title: string;
  /** 站点描述 */
  desc?: string;
  /** 站点链接 */
  link: string;
  /** 主题色（可选，用于卡片边框/背景等） */
  color?: string;
}

export interface NavData {
  title: string;
  items: NavLink[];
}

export interface Post {
  frontmatter?: Record<string, any>;
  relativePath?: string;
}
