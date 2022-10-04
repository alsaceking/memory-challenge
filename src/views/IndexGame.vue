<template>
  <div class="wrapper">
    <div class="logo-wrap">
      <img src="../assets/images/logo.png" alt="" />
    </div>
    <div class="ope-wrap">
      <div class="button-wrap">
        <div class="ope-buttun" @click="commonModel">普通模式</div>
      </div>
      <div class="button-wrap">
        <div class="ope-buttun" @click="challengeModel">挑战模式</div>
      </div>
      <div class="button-wrap">
        <div class="ope-buttun" @click="tasteModel">拼图模式</div>
      </div>
      <div class="button-wrap" style="margin-top: 8px">
        <div
          class="ope-buttun"
          style="transform: rotate(5deg); background-color: #e6dfaf"
          @click="rankModel"
        >
          查看成绩
        </div>
      </div>
    </div>
  </div>
  <router-view v-slot="{ Component }">
    <transition appear name="slide">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const commonModel = () => {
  router.push({
    path: '/common-model'
  })
}

const challengeModel = () => {
  router.push({
    path: '/challenge-model'
  })
}

const tasteModel = () => {
  router.push({
    path: '/taste-model'
  })
}

const rankModel = () => {
  router.push({
    path: '/rank-model'
  })
}
</script>

<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100vh;
  position: relative;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  // background: url('../assets/images/bg.png');
  // background-size: cover;
  .logo-wrap {
    text-align: center;
    img {
      width: 80%;
    }
  }
  .ope-wrap {
    // padding: 10px;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    top: 50vh;
    .ope-buttun {
      display: inline-block;
      width: 50%;
      padding: 10px;
      margin-bottom: 20px;
      font-size: 18px;
      letter-spacing: 2px;
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      color: #fff;
      cursor: pointer;
      border: 3px solid #9db4c6;
      text-shadow: 5px 2px 2px black;
      box-shadow: 1px 1px 0px 0px #9db4c6, 2px 2px 0px 0px #9db4c6,
        3px 3px 0px 0px #9db4c6, 4px 4px 0px 0px #9db4c6,
        5px 5px 0px 0px #9db4c6;
      background-color: #5a677a;
      position: relative;
      user-select: none;
      touch-action: manipulation;
    }
    .ope-buttun1 {
      display: inline-block;
      width: 70%;
      margin-bottom: 20px;
    }
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  // transform: translate3d(100%, 0, 0);
}
</style>
