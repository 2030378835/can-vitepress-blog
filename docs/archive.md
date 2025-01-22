---
# 归档
layout: home
hero:
  name: "归档"
  tagline: 记录一年的提交记录
  image:
    src: '/logo/logo.svg'
    alt: 归档
---
<!-- 只需在规定的目录（/docs/pages/docs/文件夹/yoursMDFile）下写作方可直接使用 -->
<style scoped>
  :deep(.ant-timeline span), :deep(.css-dev-only-do-not-override-1p3hq3p span) {
    color: var(--vp-c-text-1);
  }
</style>
<script setup>
  import { useData } from 'vitepress'
  import { onMounted, ref, watch, computed } from 'vue' 
  import { data } from '/.vitepress/theme/post.data'

  import { Timeline, TimelineItem, Result, Button } from 'ant-design-vue'
  import HeatMap from './components/heatmap/index.vue'
  import TimeLineVue from './components/timeLine/index.vue'

  const dataPage = useData()

  const posts = ref([])
  const heatMapData = ref([])
  const timelineData = ref([])

  function convertTimeFormat(timeStr) {
    // 创建Date对象，传入时间字符串（去除末尾的Z）
    if (timeStr.length === 10) {
      return timeStr
    }
    const date = new Date(timeStr.slice(0, -1));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  function countDatesByDate(arr) {
    const result = [];
    const dateCountMap = new Map();
    // 遍历数组，统计每个日期出现的次数
    arr.forEach(item => {
      const date = item.date;
      if (dateCountMap.has(date)) {
        dateCountMap.set(date, dateCountMap.get(date) + 1);
      } else {
        dateCountMap.set(date, 1);
      }
    });
    // 将统计结果转换为指定格式的数组
    dateCountMap.forEach((count, date) => {
      result.push({ date, count });
    });
    return result;
  }

  function countMouthBydate(arr) {
    const result = []
    const MouthCoutMap = new Map()
    arr.forEach(item => {
      const date = item.date.split('-');
      date.pop()
      const yearMouth = date.join('-')
      if (MouthCoutMap.has(yearMouth)) {
        MouthCoutMap.set(yearMouth, {
         count: MouthCoutMap.get(yearMouth).count + 1,
         data: [...MouthCoutMap.get(yearMouth).data, item]
        });
      } else {
        MouthCoutMap.set(yearMouth, {
          count: 1,
          data: [item]
        });
      }
    });
    MouthCoutMap.forEach((data, date) => {
      result.push({ date, data });
    });
    return result;
  }

  onMounted(() => {
    posts.value = data.map((item) => ({
      ...item,
      date: convertTimeFormat(item.date)
    }))
    heatMapData.value = countDatesByDate(posts.value)
    timelineData.value = countMouthBydate(posts.value)
  })

  const isDark = computed(() => dataPage.isDark.value)
  const goToUpload = () => {
    window.open('/upload')
  }
</script>
<div style="height: 50px"></div>
<div v-if ="posts.length">
  <HeatMap :dark="isDark" :data="heatMapData" />
  <TimeLineVue :timelineData="timelineData"/>
</div>
<Result v-else status="warning" title="你还没有提交任何文章！">
  <template #extra>
    <Button key="console" type="primary" @click="goToUpload">去写作</Button>
  </template>
</Result>