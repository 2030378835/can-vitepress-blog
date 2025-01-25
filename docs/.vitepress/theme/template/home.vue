<template>
  <div class="home-container">
    <div class="home-content">
      <SwiperVue />
      <div style="display: flex;">
        <div class="ant-layout-content" style="flex: 1; margin: 20px 0; padding:0 20px; padding-bottom: 15px;">
          <Segmented style="
              background-color: var(--vp-bg-segmented-bar);
              margin: 20px 0;
            " 
            v-model:value="value" 
            :options="data" 
          />
          <div v-if="value === '留言板'">
            <Giscus 
              :key="page.filePath"
              repo="2030378835/can-blog"
              repo-id="R_kgDONk5GDw"
              category="General"
              category-id="DIC_kwDONk5GD84Clqya"
              mapping="pathname"
              strict="0"
              reactions-enabled="0"
              emit-metadata="0"
              input-position="top"
              lang="zh-CN"
              crossorigin="anonymous"
              :theme="isDark ? 'dark' : 'light'"
            />
          </div>
          <div class="comment-box" v-else style="display: flex;">
            <a 
              v-for="item in renderArticles.filter(i => i.key === value)[0].value" 
              :href="item.url"
              :key="item.url"
            >
              <Card
                hoverable
                style="
                  background: var(--vp-bg-article-bg);
                  width: calc(960px / 3);
                  height: 300px;
                  border: none;
                "
              >
                <template #cover>
                  <img
                    alt="example"
                    :src="item.cover"
                    style="width: 100%; height: 160px; object-fit: cover;"
                  />
                </template>
                <CardMeta 
                  :title="item.title" 
                  :description="item.desc"
                />
                <div style="margin-top: 10px;">
                  {{ item.date }}
                </div>
              </Card>
            </a>
          </div>
        </div>
        <div class="ant-layout-sider ant-layout-sider-right">
          <Card 
            style="
              background: linear-gradient(to bottom right, var(--vp-h-bar) 0%, var(--vp-bg-user) 50%);
              width: 320px;
            "
          >
            <CardMeta title="can" description="前端牛马工程师">
              <template #avatar>
                <Avatar src="/logo/logo.png" />
              </template>
            </CardMeta>
          </Card>
          <Card style="background: var(--vp-bg-article-bg);">
            <CardMeta title="标签云" />
            <div v-if="renderArticles.length" style="display: flex; flex-wrap: wrap;margin-top: 10px;">
              <CheckableTag class="tag-link" v-for="i in renderArticles" :key="i" style="border-radius: 50px;">
                <a style="display: flex; padding: 4px 8px;" :href="i.value[0].url">
                  #{{ i.key }} 
                  <div style="font-size: 10px;margin-left: 4px;display: flex;align-items: start;">
                    {{ i.value.length }}
                  </div>
                </a>
              </CheckableTag>
            </div>
            <Empty :image="Empty.PRESENTED_IMAGE_SIMPLE" v-else>
              <template #description>
                <span>
                  暂无标签
                </span>
              </template>
            </Empty>
            <template #actions>
              <div>
                <span>文章数</span>
                <span id="vercount_value_page_pv">
                  {{ posData.length }}
                </span>
              </div>
              <div>
                <span>标签数</span>
                <span id="vercount_value_page_pv">
                  {{ data.length - 1 }}
                </span>
              </div>
            </template>
          </Card>
          <Card style="background: var(--vp-bg-article-bg);">
            <CardMeta title="最近发布" />
            <div v-if="posData.length" class="new-list">
              <div @click="handleClick(item.url)" v-for="(item, index) in posData.slice(0,10)" :key="item.title+index">
                <span>{{ item.title }}</span>
                <span>{{ item.date.slice(0,10) }}</span>
              </div>
            </div>
            <Empty :image="Empty.PRESENTED_IMAGE_SIMPLE" v-else>
              <template #description>
                <span>
                  暂无文章
                </span>
              </template>
            </Empty>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useData } from "vitepress";
import Giscus from "@giscus/vue";
import { data as posData } from '/.vitepress/theme/post.data'

import { Segmented, Card, CardMeta, Avatar, Empty, CheckableTag } from 'ant-design-vue'
import SwiperVue from '../../../components/swiper/index.vue'


const { isDark, page } = useData();

const data = ref(['留言板']);
const value = ref(data.value[0]);
const renderArticles = ref([])

const getKindDataOfArticles = (articles) => {
  const kindMap = new Map()
  articles.forEach(article => {
    const { tags } = article
    tags.forEach(tag => {
      if (kindMap.has(tag)) {
        kindMap.get(tag).push(article)
      } else {
        kindMap.set(tag, [article])
      }
    })
  });
  console.log(kindMap, 'kindMap')
  // 将 Map 转换为数组
  const result = Array.from(kindMap, ([key, value]) => ({ key, value }));
  renderArticles.value = result
  data.value = ['留言板', ...result.map(item => item.key)]
}
const handleClick = (url) => {
  window.open(url)
}
onMounted(() => {
  console.log(posData)
  getKindDataOfArticles(posData)
})
</script>

<style scoped lang="scss">
.home-container {
  width: 100%;
  height: 100vh;
  padding: 0 32px;
  // 背景从上到下渐变
  background: linear-gradient(to bottom, var(--vp-bg-color) 0%, rgba(192, 95, 95, 0) 100%);
}
.home-content {
  margin: 0 auto;
  max-width: calc(var(--vp-layout-max-width) - 64px);
  height: 90vh;
  padding: 40px 0;
  // border: 1px solid rgb(240, 240, 240);
}
.comment-box {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  // justify-content: space-between;
}
.tag-link:hover {
  transform: scale(1.1);
  background-color: var(--color-Fill-Secondary);
  a {
    color: #fff;
  }
}
.ant-layout-sider-right {
  >div {
    margin: 20px 0;
  }
}
.new-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  >div {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    span {
      font-size: 14px;
      color: var(--vp-user-card-font-cl-2);
    }
    span:nth-child(1) {
      // 超出一行省略号
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 180px;
    }
  }
  >div:hover span{
    color: var( --vp-c-brand-1);
  }
}
</style>