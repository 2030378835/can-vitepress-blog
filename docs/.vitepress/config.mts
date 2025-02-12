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
        href: defaultConfig.base+'/public/favicon.ico',
        type: 'image/x-icon',
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        component: 'DropdownItem',
        props: {
          config: {
            title: '归档',
            path: '/archive',
            style: {background: 'rgba(0,0,0,0)'}
          }
        }
      },
      // {
      //   component: 'Dropdown',
      //   props: {
      //     configs: {
      //       title: '空间',
      //       items:[
      //         { title: '音乐空间', path: '/music' },
      //       ]
      //     }
      //   }
      // },
      {
        component: 'Dropdown',
        props: {
          configs: {
            title: '作品集',
            items: [
              {
                title: 'can-cli（未发布）',
                link: 'https://gitee.com/qq2057187934/can-cli',
              },
              {
                isNew: true,
                title: 'can-vitepress-blog',
                link: 'https://github.com/2030378835/can-vitepress-blog'
              }
            ]
          }
        }
      },
      {
        component: 'Dropdown',
        props: {
          configs: {
            title: '更多',
            // isNew: true,
            items: [
              {
                title: 'About',
                path: '/readme',
              },
              {
                isNew: true,
                title: 'Commits',
                path: '/commit'
              }
            ]
          }
        }
      }
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/2030378835'
      },
      {
        icon: {
          svg: '<svg t="1736350247685" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2742" width="200" height="200"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z" fill="#bfbfbf" p-id="2743"></path></svg>'
        },
        link: 'https://gitee.com/qq2057187934/can-blog/tree/release%2FV1.120_%E7%94%A8%E6%88%B7%E5%88%86%E6%94%AF/'
      },
      {
        icon: {
          svg: '<svg t="1737604483656" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4223" width="200" height="200"><path d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m189.952 752l11.2-108.224c-31.904 9.536-100.928 16.128-147.712 16.128-134.464 0-205.728-47.296-195.328-146.304 11.584-110.688 113.152-145.696 232.64-145.696 54.784 0 122.432 8.8 151.296 18.336L768 272.704C724.544 262.24 678.272 256 599.584 256c-203.2 0-388.704 94.88-406.4 263.488C178.336 660.96 303.584 768 535.616 768c80.672 0 138.464-6.432 166.336-16z" fill="#bfbfbf" p-id="4224"></path></svg>'
        },
        link: 'https://www.csdn.net/'
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
      // 不建议对代理作出修改
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