import { defineConfig } from 'vitepress'
import { getSidebar } from '../router';
// https://vitepress.dev/reference/site-config
const defaultConfig = require('../../vitepress.config')

const vitePressOptions = {
  base: defaultConfig.base+'/',
  title: defaultConfig.blogTitle,
  description: defaultConfig.blogDescription,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '../public/favicon.ico',
        type: 'image/x-icon',
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archive' },
      { text: '写作', link: '/upload' },
      { 
        text: '空间', 
        items: [
          { text: '音乐空间', link: '/music' },
          // { text: '相册空间', link: '/album' }
        ]
      },
      {
        text: '作品集',
        items: [
          { text: 'can-cli（未发布）', link: 'https://gitee.com/qq2057187934/can-cli' },
        ]
      }
    ],

    socialLinks: [
      {
        icon: {
          svg: '<svg t="1736350247685" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2742" width="200" height="200"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z" fill="#515151" p-id="2743"></path></svg>'
        },
        link: 'https://gitee.com/qq2057187934/can-blog/tree/release%2FV1.120_%E7%94%A8%E6%88%B7%E5%88%86%E6%94%AF/'
      }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Can'
    },

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full' as const,  // 使用常量断言确保类型正确
        timeStyle: 'medium' as const // 使用常量断言确保类型正确
      }
    },
    outline: {
      level: [2, 6],
      label: '页面导航'
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        less: {
            javascriptEnabled: true,
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
};
export default defineConfig(getSidebar(vitePressOptions));