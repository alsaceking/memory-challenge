<template>
  <div class="title">
    <div class="back-wrap" @click="backIndex">
      <img src="/src/assets/images/left.png" alt="" />
    </div>
    <h1 class="name">{{ props.title }}</h1>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: '弱者模式'
  }
})

const router = useRouter()
const backIndex = () => {
  router.push({
    path: '/'
  })
}
</script>

<style scoped lang="less">
.title {
  display: flex;
  height: 7vh;
  line-height: 7vh;
  text-align: center;
  color: #fff;
  position: relative;
  .back-wrap {
    width: 50px;
    color: black;
    img {
      width: 80%;
    }
  }
  .name {
    flex: 1;
    font-weight: bold;
    text-shadow: 0 0 8px black;
    letter-spacing: 3px;
    padding-right: 50px;
    font-style: italic;
    animation: arisen 2s ease;
    transform-origin: 0% 100%;
  }

  @keyframes arisen {
    0% {
      opacity: 0;
      transform: translateX(400px) skew(-45deg);
    }

    30% {
      opacity: 1;
      transform: translateX(0) skew(8deg);
    }

    50% {
      transform: translateX(0) skew(-3deg);
    }

    70% {
      transform: translateX(0) skew(1deg);
    }
  }
}
</style>
