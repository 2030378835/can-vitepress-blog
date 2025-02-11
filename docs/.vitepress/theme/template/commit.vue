<template>
  <div class="commits">
    <Timeline>
        <TimelineItem v-for="(i,key,index) in commits" :key="key">
          <span>Commits on {{key}}</span>
          <div class="commits-item-box">
            <div v-for="(commit,index) in i" :key="index">
              <div class="title">{{ commit.message }}</div>
              <div class="commitor">{{ commit.author }} committed {{ getTimePassed(commit.date) }} ago</div>
            </div>
          </div>
        </TimelineItem>
    </Timeline>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCommits } from '../../utils/commits'
import { Timeline, TimelineItem, Avatar, Tooltip } from 'ant-design-vue'

const commits = ref([])
const loading = ref(false)

const formatDateWidthEn = (originalDateStr) => {
  // 创建 Date 对象
  const date = new Date(originalDateStr);
  // 配置日期格式化选项
  const options = {
      // weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
  };
  // 创建 Intl.DateTimeFormat 对象
  const formatter = new Intl.DateTimeFormat('en-US', options);
  // 格式化日期
  const formattedDate = formatter.format(date);
  return formattedDate;
}

function getTimePassed(specifiedTime) {
    // 将指定时间字符串转换为时间戳（毫秒）
    const specifiedTimestamp = new Date(specifiedTime).getTime();
    // 获取当前时间的时间戳（毫秒）
    const currentTimestamp = new Date().getTime();
    // 计算时间差（毫秒）
    const timeDifference = currentTimestamp - specifiedTimestamp;

    // 定义不同时间单位对应的毫秒数
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    if (timeDifference < minute) {
        // 时间差小于一分钟，以秒为单位
        const seconds = Math.floor(timeDifference / second);
        return `${seconds} seconds`;
    } else if (timeDifference < hour) {
        // 时间差小于一小时，以分钟为单位
        const minutes = Math.floor(timeDifference / minute);
        return `${minutes} minutes`;
    } else if (timeDifference < day) {
        // 时间差小于一天，以小时为单位
        const hours = Math.floor(timeDifference / hour);
        return `${hours} hours`;
    } else if (timeDifference < week) {
        // 时间差小于一周，以天为单位
        const days = Math.floor(timeDifference / day);
        return `${days} days`;
    } else if (timeDifference < month) {
        // 时间差小于一个月，以周为单位
        const weeks = Math.floor(timeDifference / week);
        return `${weeks} weeks`;
    } else if (timeDifference < year) {
        // 时间差小于一年，以月为单位
        const months = Math.floor(timeDifference / month);
        return `${months} months`;
    } else {
        // 时间差大于等于一年，以年为单位
        const years = Math.floor(timeDifference / year);
        return `${years} years`;
    }
}

onMounted(async () => {
  loading.value = true
  const res = await getCommits()
  res.forEach((element, index) => {
    res[index].titleTime = formatDateWidthEn(element.date)
  });
  // 通过titleTime 进行分类
  commits.value = res.reduce((acc, commit) => {
    const { titleTime } = commit;
    if (!acc[titleTime]) {
      acc[titleTime] = [];
    }
    acc[titleTime].push(commit);
    return acc;
  }, {});
  console.log(commits.value)
  // console.log(groupedCommits)
  loading.value = false
})
</script>

<style lang="scss" scoped>
.commits {
  padding: 50px 20%;
  .commits-item-box {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--commit-item-border-color);
    border-radius: 6px;
    overflow: hidden;
    >div {
      padding: 10px;
      border-bottom: 1px solid var(--commit-item-border-color);
    }
    >div:last-child {
      border-bottom: none;
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      color: var(--vp-c-text-1);
    }
    .commitor {
      font-size: 12px;
      color: var(--vp-c-text-2);
      // color: var(--commit-item-commitor-color);
    }
  }
}
</style>