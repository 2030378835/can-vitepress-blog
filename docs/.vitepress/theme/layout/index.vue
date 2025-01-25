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
          // colorBgContainer: 'var(--table-bg-container)'
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

        <!-- <Image
          v-if="page.frontmatter.cover"
          :src="page.frontmatter.cover"
          style=" 
            height: 240px;
            width: 688px;
            object-fit: cover
          "
        /> -->
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
import { computed } from 'vue'
import Giscus from "@giscus/vue";
import DefaultTheme from "vitepress/theme";
import { Image, ConfigProvider, Avatar, Tooltip } from 'ant-design-vue'
import { useData } from "vitepress";
import defaultConfigES from '../../../../vitepress.config.ES.ts'
const { Layout } = DefaultTheme;
const { isDark, page } = useData();

const articleData = computed(() => {
  return page.value.frontmatter
})
</script>