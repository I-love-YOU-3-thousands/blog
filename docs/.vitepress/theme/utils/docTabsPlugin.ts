import type MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';

interface TabItem {
  key: string;
  label: string;
}

const parseTabLabel = (info: string) => {
  const match = info.trim().match(/^tab\s+(.+)$/);
  return match?.[1]?.trim() ?? '';
};

const escapeAttr = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const collectTabsMeta = (tokens: MarkdownIt.Token[]) => {
  let groupIndex = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type !== 'container_tabs_open' || token.nesting !== 1) continue;

    const items: TabItem[] = [];
    let depth = 1;
    let tabIndex = 0;

    for (let j = i + 1; j < tokens.length; j++) {
      const currentToken = tokens[j];

      if (currentToken.type === 'container_tabs_open' && currentToken.nesting === 1) {
        depth++;
        continue;
      }

      if (currentToken.type === 'container_tabs_close' && currentToken.nesting === -1) {
        depth--;
        if (depth === 0) break;
        continue;
      }

      if (depth !== 1) continue;
      if (currentToken.type !== 'container_tab_open' || currentToken.nesting !== 1) continue;

      const label = parseTabLabel(currentToken.info) || `选项 ${tabIndex + 1}`;
      const key = `tab_${groupIndex}_${tabIndex}`;
      const tabItem = { key, label };

      items.push(tabItem);
      currentToken.meta = {
        ...(currentToken.meta || {}),
        docTab: tabItem,
      };
      tabIndex++;
    }

    token.meta = {
      ...(token.meta || {}),
      docTabs: {
        items,
      },
    };
    groupIndex++;
  }
};

export const docTabsPlugin = (md: MarkdownIt) => {
  md.use(container, 'tabs', {
    validate(params) {
      return params.trim() === 'tabs';
    },
    render(tokens, idx) {
      const token = tokens[idx];

      if (token.nesting === 1) {
        const items: TabItem[] = token.meta?.docTabs?.items ?? [];
        const itemsAttr = escapeAttr(JSON.stringify(items));
        const defaultTab = items[0]?.key ?? '';

        return `<DocTabs :items='${itemsAttr}' default-tab="${md.utils.escapeHtml(defaultTab)}">\n`;
      }

      return '</DocTabs>\n';
    },
  });

  md.use(container, 'tab', {
    validate(params) {
      return /^tab\s+.+$/.test(params.trim());
    },
    render(tokens, idx) {
      const token = tokens[idx];
      const currentTab: TabItem | undefined = token.meta?.docTab;

      if (token.nesting === 1) {
        if (!currentTab) return '';
        return `<template v-slot:${currentTab.key}>\n`;
      }

      return '</template>\n';
    },
  });

  md.core.ruler.after('block', 'doc-tabs-meta', (state) => {
    collectTabsMeta(state.tokens);
  });
};
