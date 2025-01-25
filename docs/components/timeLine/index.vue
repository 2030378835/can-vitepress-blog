<!-- 归档时间线 -->
<template>
 <Timeline style="margin: 20px">
    <TimelineItem v-for="item in props.timelineData" :key="item.date">
      <span>{{ item.date }} ({{ item.data.count }}篇)</span>
      <div 
        style="
          display: flex; 
          justify-content: space-between;
          margin: 20px 0;
        " 
        v-for="(i, index) in item.data.data" 
        :key="index"
      >
        <span>
          {{index+1}}、
          <a :href="i.url">{{ i.title }}（{{i.tags?.join('、')}}）</a> 
          by 
          <Tooltip placement="topLeft">
            <template #title>
              <span>{{i?.author ? i.author : defaultConfigES.defaultAuther}}</span>
            </template>
            <Avatar 
              :size="20" 
              :src="!i?.author ? defaultConfigES.base+defaultConfigES.blogLogo :  defaultConfigES.base+'/icon/user.svg'"
            />
          </Tooltip>
        </span>
        <span>{{i.date}}</span>
      </div>
    </TimelineItem>
  </Timeline>
</template>

<script setup>
  import { defineProps } from 'vue'
  import { Timeline, TimelineItem, Avatar, Tooltip } from 'ant-design-vue'
  import defaultConfigES from '../../../vitepress.config.ES.ts'
  const props = defineProps(['timelineData'])
</script>

<style scoped>
  :deep(.ant-timeline span), :deep(.css-dev-only-do-not-override-1p3hq3p span) {
    color: var(--vp-c-text-1);
  }
</style>