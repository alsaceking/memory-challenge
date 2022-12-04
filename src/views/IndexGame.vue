<template>
  <div class="wrapper">
    <div class="logo-wrap">
      <img src="../assets/images/logo.png" alt="" />
      <p class="tipText">
        沧海横流，物转星移，这尘寰三千年能被记住的又有多少。即便是天尧，也只不过是一瞬的星火。<br />
        用记忆去揭开尘封已久的神秘画卷，一睹它的风采。
      </p>
    </div>
    <div class="ope-wrap">
      <div class="button-wrap">
        <div class="ope-buttun" @click="commonModel">欣赏模式</div>
      </div>
      <div class="button-wrap">
        <div class="ope-buttun" @click="challengeModel">计时模式</div>
      </div>
      <!-- <div class="button-wrap">
        <div class="ope-buttun" @click="tasteModel">拼图模式</div>
      </div> -->
      <div class="button-wrap" style="margin-top: 8px">
        <div
          class="ope-buttun ope-buttun1"
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
    .tipText {
      text-align: left;
      padding: 10px 20px;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 2px;
      text-indent: 36px;
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
      position: relative;
      display: inline-block;
      width: 50%;
      padding: 10px;
      margin-bottom: 25px;
      font-size: 18px;
      color: #fff;
      text-shadow: 5px 2px 2px black;
      letter-spacing: 2px;
      text-align: center;
      letter-spacing: 3px;
      cursor: pointer;
      background-color: #5a677a;
      box-shadow: -15px -15px 25px #e0e8f5, 15px 15px 25px #959aa5;
      // -webkit-box-reflect: below 3px linear-gradient( transparent,rgba(6, 133, 133,0.3));
      &::before {
        content: '';
        position: absolute;
        top: 3px;
        right: -6px;
        height: 100%;
        width: 6px;
        background: linear-gradient(to right, #808fb7, #c2c6cf);
        transform: skewY(45deg);
      }
      &::after {
        content: '';
        position: absolute;
        bottom: -6px;
        right: -3px;
        height: 6px;
        width: 100%;
        background: linear-gradient(to bottom, #808fb7, #c2c6cf);
        transform: skewX(45deg);
      }
    }
    .ope-buttun1 {
      &::before {
        content: '';
        position: absolute;
        top: 3px;
        right: -6px;
        height: 100%;
        width: 6px;
        background: linear-gradient(to right, #e8f1a7, #c2c6cf);
        transform: skewY(45deg);
      }
      &::after {
        content: '';
        position: absolute;
        bottom: -6px;
        right: -3px;
        height: 6px;
        width: 100%;
        background: linear-gradient(to bottom, #e8f1a7, #c2c6cf);
        transform: skewX(45deg);
      }
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
