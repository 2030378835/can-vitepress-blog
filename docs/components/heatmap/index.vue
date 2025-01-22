<!-- 归档热力图 -->
<template>
  <div>
    <calendar-heatmap 
      :values="props.data" 
      :end-date="endDate"
      :round="2"
      :range-color="props.dark? rangeDarkColor : rangeColor"
      :max="10"
      :locale="locale"
    />
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['data','dark'])

const rangeColor = ref(['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'])
const rangeDarkColor = ref(['rgb(50, 50, 50)', 'rgb(17, 109, 5)', '#16a34a', 'rgb(31, 221, 6)', 'rgb(129, 255, 112)'])

const locale = ref({
  months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  days: ['日', '一', '二', '三', '四', '五', '六'],
  years: [2024, 2025]
});
const endDate = ref(new Date().toISOString().split('T')[0])

</script>

<style lang="scss">
.tippy-box {
  border-radius: 4px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.24);
  font-size: 14px;
  padding: 4px 8px;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
}

</style>