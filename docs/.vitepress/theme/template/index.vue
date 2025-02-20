
<template>
  <div class="home">
    <h1 class="name">
      <span class="title">
        <span>CAN BLOG</span>
        Vitepress & Antdv.
      </span>
    </h1>
    <div class="other">
      快速搭建，简单易学、功能强大的vitepress博客主题框架
    </div>
    <div class="buttons">
      <div 
        @click="goToPath('/pages/about/1、开始/1_includes')" 
        class="btn primary hover-rotate"
        style="width: 126px;"
      >
        快速上手
        <span class="hand" style="display: block;">👋</span>
      </div>
      <div 
        @click="goToLink('https://2030378835.github.io/can-vitepress-blog-user/')" 
        class="btn vp-external-link-icon"
      >
        🌰 Example
      </div>
      <div 
        @click="goToLink('https://github.com/2030378835/can-vitepress-blog-user')"
        class="btn vp-external-link-icon"
      >
        Github to it
      </div>
    </div>
    <div class="divider" style="margin: 100px 0 40px 0"></div>
    <div class="other-box">
      <div class="description">
        <div v-for="item in description" :key="item.title">
          <div class="title-des">{{ item.title }}</div>
          <div class="text">{{ item.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, withBase } from 'vitepress'

const router = useRouter()
const goToPath = (path) => {
  router.go(withBase(path))
}

const goToLink = (link) => {
  window.open(link, '_blank')
}

const description = [
  {
    title: '快速上手',
    text: '基于viteress + antdv的博客主题框架，拓展了一些主题功能以及优化了博客文章的写作体验。'  
  },
  {
    title: '性能强大',
    text: '经过编译器优化、完全响应式的渲染系统，几乎不需要手动优化。'
  },
  {
    title: '灵活多变',
    text: '丰富的、可渐进式集成的生态系统，可以根据应用规模在库和框架间切换自如。'
  }
]

</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 0;
}
.name {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 48px;
  }
}
.title {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  >span:nth-child(1) {
    background: -webkit-linear-gradient(
      120deg,
      var(--vp-c-brand-1),
      #7d41ff
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.other {
  max-width: 960px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  transition: color .5s;
  font-size: 22px;
  margin: 24px auto 40px;
  letter-spacing: 1px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 18px;
    margin: 20px auto 30px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin: 16px auto 24px;
  }
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 960px;
  >div {
    margin:0 10px;
  }
  .btn {
    border-radius: 8px;
    padding: 10px 18px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.5s ease !important; /* 明确指定所有属性过渡 */
    background-color: var(--vp-button-alt-bg);
    border: 1px solid var(--vp-button-alt-bg);
    min-width: 126px;
    &:hover {
      opacity: .6;
    }
    
    @media (max-width: 768px) {
      // transform: scale(0.8);
      padding: 8px 16px;
      font-size: 14px;
    }
    
    @media (max-width: 480px) {
      // transform: scale(0.6);
      padding: 6px 12px;
      font-size: 12px;
    }
  }
  .primary {
    border: 1px solid var(--vp-c-brand-1);
    background: var(--vp-c-brand-1);
    color: #fff;
    transition: all 0.5s ease !important; /* 明确指定所有属性过渡 */
    &:hover {
      opacity: 1;
      color: #fff;
    }
  }
  .hover-rotate {
    display: flex;
    .hand {
      margin-left: 4px;
      transition: 300ms;
      font-size: small;
    }
  }
  .hover-rotate:hover .hand {
    transform: rotate(30deg);
    margin-left: 10px;
  }
}
.divider {
  background-color: var(--commit-item-border-color);
  height: 1px;
  width: 100%;
  margin: 20px 0;
  border-radius: 1px;
  margin-bottom: 30px;
}
.other-box {
  width: 100%;
  display: flex;
  justify-content: center;
  .description {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    >div {
      margin: 40px;
      width: 220px;
      >.title-des {
        font-size: 22px;
        font-weight: 600;
        color: var(--vp-c-text-1);
        margin-bottom: 14px;
      }
      >.text {
        font-size: 16px;
        color: var(--vp-c-text-2);
        line-height: 1.8;
      }
    }
  }
}
</style>
