<template>
  <div style="width: 100%;padding: 5px;">
    <ActionComVue type="success">
      Action: 该bar为作者收集的一些好用的网站，作者不提供维护和付费使用；谨防网站中的各种广告，防止上当受骗！
    </ActionComVue>
    <div class="list">
      <Card 
        :hoverable="true"
        v-for="item in data" 
        :key="item.title" 
        style="
          border: none;
          width: 24%;
          cursor: pointer;
          background-color: var(--vp-bg-card);
          margin: 5px;
          height: 120px;
        "
        @click="() => goToPage(item.link)"
      >
        <div class="title">
          <img v-if="item.icon" :src="item.icon" :alt="item.title">
          <span v-else>{{ item.moj }}</span>
          {{ item.title  }}
        </div>
        <div class="des">{{ item.des }}</div>
      </Card>
    </div>  
  </div>

</template>

<script setup>
import { onMounted } from 'vue'
import { useSidebar } from 'vitepress/theme'
import { Card } from 'ant-design-vue'

import ActionComVue from '../action/index.vue'
// import { reRenderSidebar } from '../router/index'

const sidebar = useSidebar()
const data = [
  {
    title: 'React',
    icon: '/icon/react.svg',
    des: '这里是react官网',
    link: 'https://zh-hans.react.dev/'
  },
  {
    title: 'Vue',
    icon: '/icon/vue.svg',
    des: '这里是vue官网',
    link: 'https://cn.vuejs.org/'  
  },
  {
    title: 'JavaScript',
    icon: '/icon/js.svg',
    des: '这里是w3school中的js教程',
    link: 'https://www.w3school.com.cn/js/index.asp'
  },
  {
    title: '歌曲宝',
    icon: '/icon/music.svg',
    // icon: 'https://www.gequbao.com/static/img/logo.png',
    des: '本站歌曲信息皆来源于此',
    link: 'https://www.gequbao.com/'
  },
  {
    title: '哲风壁纸',
    icon: '/icon/picture.svg',
    des: '本站4K壁纸来源',
    link: 'https://haowallpaper.com/'
  },
  {
    title: 'iconfont',
    icon: 'https://img.alicdn.com/imgextra/i1/O1CN01EI93PS1xWbnJ87dXX_!!6000000006451-2-tps-150-150.png',
    des: '本站图标来源',
    link: 'https://www.iconfont.cn/?spm=a313x.search_index.i3.d4d0a486a.17343a81DbEp9T'
  },
  {
    title: '英才简历',
    icon: '/icon/jianli.svg',
    des: '一个兼职制作实用网站',
    link: 'https://www.ycresume.com/'
  },
  {
    title: 'Antdv',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    des: 'Antdv组件库',
    link: 'https://www.antdv.com/docs/vue/introduce-cn'
  }
]

onMounted(() => {
  console.log(sidebar.sidebarGroups)
})

const goToPage = (link) => {
  window.open(link)
}
</script>

<style scoped lang="scss"">
.list {
  display: flex;
  flex-wrap: wrap;
  .title {
    display: flex;
    align-items: end;
    color: var(--vp-c-text-1);
    img {
      width: 36px;
      height: 36px;
      margin-right: 10px;
    }
    span {
      font-size: 36px;
      padding: 0px;
      height: 36px;
      line-height: 36px;
      margin-right: 10px;
    }
    font-size: 18px;
    font-weight: bold;
  }
  .des {
    font-size: 12px;
    color: var(--vp-c-text-2);
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
  }
}
.action {
  padding: 5px;
  >span {
    display: flex;
    border: 1px solid #b7eb8fef;
    border-radius: 4px;
    padding: 4px 8px;
    align-items: center;
    background-color: #92ec3921;
    color: #399e0df3;
    font-size: 14px;
    // font-weight: bold;
  }
}
</style>