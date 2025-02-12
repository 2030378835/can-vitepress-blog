<!-- Layout.vue -->
<template>
  <!-- ConfigProvider 用于andtv全局主题配置 -->
  <ConfigProvider
  :theme="{
      token: {
        colorPrimary: '#1677ff',
        colorBorder: 'var(--color-border-secondary)',
        colorBorderSecondary: 'var(--color-border-secondary)',
        colorText: 'var(--color-text)',
        colorTextTertiary: 'var(--color-bg-mask)',
      },
      components: {
        Tag: {
          colorBgContainer: 'var(--color-bg-container)'
        },
        Input: {
          colorBgContainer: 'var(--color-bg-container)'
        },
        Select: {
          colorBgContainer: 'var(--color-bg-container)'
        },
        Textarea: {
          colorBgContainer: 'var(--color-bg-container)'
        },
        DatePicker: {
          colorBgContainer: 'var(--color-bg-container)',
          colorBgElevated: 'var(--color-bg-elevated)',
        },
        RadioButton: {
          colorBgContainer: 'var(--color-bg-container)'
        },
        Table: {
          colorFillSecondary: 'var(--color-bg-container)'
        }
      },
    }"
  >
    <Layout>
      <template #doc-before>
        <div style="display: flex; align-items: flex-end;">        
          <span
            style="
              font-size: 32px;
              font-weight: 600;
              line-height: 42px;
            "
          > 
            {{ page.frontmatter.title }}
          </span>
          <span style="margin:0 8px;font-size: small;">by</span>
          <Tooltip placement="topLeft">
            <template #title>
              <span>{{articleData?.author ? articleData.author : defaultConfigES.defaultAuther}}</span>
            </template>
            <Avatar 
              :size="40" 
              :src="!articleData?.author ? defaultConfigES.base+defaultConfigES.blogLogo :  defaultConfigES.base+'/icon/user.svg'"
            />
          </Tooltip>
        </div>

      </template>
      <template #doc-after>
        <div style="margin-top: 24px">
          <!-- https://giscus.app/zh-CN (评论功能配置手册)-->
          <Giscus 
            :key="page.filePath"
            repo="2030378835/can-blog"
            repo-id="R_kgDONk5GDw"
            category="General"
            category-id="DIC_kwDONk5GD84Clqya"
            mapping="pathname"
            strict="0"
            reactions-enabled="1"
            emit-metadata="0"
            input-position="top"
            lang="zh-CN"
            crossorigin="anonymous"
            :theme="isDark ? 'dark' : 'light'"
          />
        </div>
      </template>
    </Layout>
  </ConfigProvider>
</template>

<script setup>
import { computed, onMounted, createApp, h, watch } from 'vue'
import Giscus from "@giscus/vue";
import DefaultTheme from "vitepress/theme";
import { useSidebar } from 'vitepress/theme'
import { Image, ConfigProvider, Avatar, Tooltip } from 'ant-design-vue'
import { useData, withBase, useRoute } from "vitepress";
import defaultConfigES from '../../../../vitepress.config.ES.ts'

import RootAction from '../components/rootAction/index.vue'

const { Layout } = DefaultTheme;
const { isDark, page } = useData();
const sidebar = useSidebar()  
const route = useRoute()

const articleData = computed(() => {
  return page.value.frontmatter
})

watch(() => route.path, (newV, oldV) => {
  console.log(newV, oldV,'sidebar')
})

onMounted(() => {
  const VPNav = document.getElementsByClassName('VPNav')[0]

  // 创建子组件实例
  // 创建子组件实例并传递 props
  const childApp = createApp({
    render() {
      return h(RootAction, {
        actions: [
          {
            title: 'WELCOME',
            desc: '欢迎来到 can-vitepress-blog 使用文档',
            style: {
              justifyContent: 'center',
            },
            closable: true,
          },
          {
            title: '新功能！！！',
            desc: '文档支持查看代码提交的记录啦，点击进入Commits页面吧',
            link: withBase('/commit'),
            style: {
              justifyContent: 'center',
            },
            closable: true,
          },
        ]
      });
    }
  });
  // 创建一个临时的 div 作为挂载点
  const tempDiv = document.createElement('div');
  // 获取 VPNav 的第一个子元素
  const firstChild = VPNav.firstChild;
  // VPNav.appendChild(tempDiv);
  // 将临时的 div 插入到 VPNav 的第一个子元素前
  VPNav.insertBefore(tempDiv, firstChild);

  childApp.mount(tempDiv);
})
</script>