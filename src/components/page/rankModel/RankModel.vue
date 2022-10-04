<template>
  <div class="wrapper">
    <TopTitle title="查看成绩"></TopTitle>
    <div class="rank-list">
      <h2 class="title">普通模式</h2>
      <div class="rank" v-for="(item, index) in commonRank" :key="index">
        <div class="num">{{ index + 1 }}. {{ item.name }}</div>
        <div class="sec">
          <span>{{ item.sec }}s</span>
        </div>
      </div>
    </div>
    <div class="rank-list">
      <h2 class="title">挑战模式</h2>
      <div class="rank" v-for="(item, index) in challengeRank" :key="index">
        <div class="num">{{ index + 1 }}. {{ item.name }}</div>
        <div class="sec">
          <span>{{ item.sec }}s</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import myStorage from '@/assets/js/myStorage'
import TopTitle from '@/components/common/topTitle/TopTitle.vue'
import { onMounted, ref } from 'vue'

// 储存的游戏数据
const COMMON_RANK = '__MEMORY_CHALLENGE_COMMON_RANK__'
const CHALLENGE_RANK = '__MEMORY_CHALLENGE_CHALLENGE_RANK__'

const commonRank = ref([])
const challengeRank = ref([])

onMounted(() => {
  commonRank.value = myStorage.get(COMMON_RANK, [])
  challengeRank.value = myStorage.get(CHALLENGE_RANK, [])
})
</script>

<style scoped lang="less">
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  .rank-list {
    padding: 20px;
    font-family: sans-serif;
    .title {
      margin-bottom: 10px;
      letter-spacing: 8px;
      font-size: 20px;
      font-weight: bold;
      color: #5a677a;
      text-shadow: 3px 2px 3px #9db4c6;
    }
    .rank {
      display: flex;
      margin-top: 10px;
      padding-bottom: 5px;
      .num {
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #5a677a;
      }
      .sec {
        flex: 1;
        text-align: right;
        border-bottom: 3px dashed #d9c684;
        color: #9db4c6;
      }
    }
  }
}
</style>
