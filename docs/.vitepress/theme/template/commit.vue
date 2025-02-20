<template>
  <div v-if="!loading" class="commits">
    <span style="font-size: larger; font-weight: 600;">Commits</span>
    <div class="divider"></div>
    <Timeline>
      <TimelineItem v-for="(i,key,index) in commits" :key="key">
        <span>Commits on {{key}}</span>
        <div class="commits-item-box">
          <div v-for="(commit,index) in i" :key="index">
            <div>
              <EllipsisSpan width="100%" class="title">
                <a :href="commit.url" target="_blank" rel="noopener noreferrer">{{ commit.message }}</a>
              </EllipsisSpan>
              <div class="commitor">
                <img v-if="!commit.avatar_url" src="https://github.githubassets.com/images/gravatars/gravatar-user-420.png?size=32" />
                <img v-else :src="commit.avatar_url" />
                <span v-if="commit.author">
                  <a class="anthor" target="_blank" rel="noopener noreferrer" :href="commit.author.html_url">{{ commit.author.login }}</a>
                  {{ ' anthored ' + getTimePassed(commit.date) + ' ago'}}
                </span>
                <span v-else>{{ commit.commit_author+ ' commited ' + getTimePassed(commit.date) + ' ago'}}</span>
              </div>
            </div>
            <div>
              <span style="min-width: 60px;" v-if="commit.verification?.verified">verified</span>
              <div style="min-width: 42px;">
                <a :href="commit.parents[0]?.html_url" style="font-size: 14px;">{{ `</>` }}</a>
              </div>
            </div>
          </div>
        </div>
      </TimelineItem>
    </Timeline>
  </div>
  <div style="text-align: center; height: 300px; line-height: 300px;" v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCommits } from '../../utils/commits'
import { Timeline, TimelineItem, Avatar, Tooltip } from 'ant-design-vue'
import EllipsisSpan from '../../../components/ellipsisSpan/index.vue'
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
  padding: 50px 10%;
  .commits-item-box {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--commit-item-border-color);
    border-radius: 6px;
    overflow: hidden;
    margin-top: 10px;
    >div {
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--commit-item-border-color);
      >div:nth-child(2) {
        display:flex;
        >div {
          display: flex;
          align-items: center;
          a {
            display: flex;
            align-items: center;
            color: var(--vp-c-text-2);
            margin-left: 10px;
          }
        }
        >span {
          font-size: 12px;
          color: rgb(33, 189, 33);
          background-color: rgba(22, 175, 22, 0.05);
          padding: 2px 8px;
          border-radius: 12px;
          transform: scale(0.8);
          border: 1px solid rgb(33, 189, 33);
        }
      }
    }
    >div:last-child {
      border-bottom: none;
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      color: var(--vp-c-text-1);
      a:hover, .anthor:hover {
        color: var( --vp-c-brand-1);
        text-decoration: underline;
      }
    }
    .commitor {
      font-size: 12px;
      color: var(--vp-c-text-2);
      display: flex;
      align-items: center;
      @media (max-width: 480px) {
        display: none;
      }
      img {
        width: 14px;
        height: 14px;
        margin-right: 4px;
        border-radius: 50%;
      }
      .anthor:hover {
        color: var( --vp-c-brand-1);
        text-decoration: underline;
      }
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
}
</style>