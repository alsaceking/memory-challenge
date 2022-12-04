<template>
  <div class="wrapper">
    <TopTitle title="~❤~"></TopTitle>
    <div class="wrap">
      <div class="game-box">
        <div
          v-for="card in cardList"
          class="card-wrap"
          :key="card.id"
          :style="{
            width: `${CARD_WIDTH}vw`,
            height: `${CARD_HEIGHT}vw`,
            transform: `translate(${card.location.x}vw, ${
              card.location.y
            }vw) rotateY(${card.flip ? 180 : 0}deg)`
          }"
          @click="check(card)"
        >
          <div
            class="card-face card-font"
            :class="{ 'hidden-card': card.show }"
          >
            <img :src="card.url" />
          </div>
          <div class="card-face card-back">
            <img src="/src/assets/images/back.png" alt="" />
          </div>
        </div>
      </div>
      <!-- show-wrap -->
      <div
        class="show-box"
        :class="{ 'finish-show': isFinished }"
        :style="{
          width: `${showCardWrapWidth}vw`
        }"
      >
        <div
          class="card-wrap"
          v-for="card in showCardList"
          :style="{
            width: `${showCardWidth}vw`,
            height: `${showCardHeight}vw`
          }"
          :class="{ 'show-card': card.show }"
          :key="card.id"
        >
          <img :src="card.url" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopTitle from '@/components/common/topTitle/TopTitle.vue'
import { ref } from 'vue'
import useCardContainer from '../useCardContainer.js'

const CARD_NUM = 12, // 初始化卡片的数量
  LATTICENUM_X = 6,
  LATTICENUM_Y = 4,
  CARD_WIDTH = 17,
  CARD_HEIGHT = 17,
  GAP_X = 4,
  GAP_Y = 4,
  CARD_POOL = 10,
  BASEURL = '/memory-challenge/icontaste/card'

const params = {
  cardPool: CARD_POOL,
  cardNum: CARD_NUM,
  latticeNumX: LATTICENUM_X,
  latticeNumY: LATTICENUM_Y,
  cardWidth: CARD_WIDTH,
  cardHeight: CARD_HEIGHT,
  gapX: GAP_X,
  gapY: GAP_Y,
  imgBaseUrl: BASEURL
}

// 初始化需要展示的卡片
const showCardList = ref([])
for (let i = 0; i < CARD_NUM; i++) {
  showCardList.value.push({
    url: `${BASEURL}${[i + 1]}.png`,
    id: `pic${i}`,
    show: false
  })
}

const showCardWidth = ref(26),
  showCardHeight = ref(26),
  showCardWrapWidth = ref(80)
const isFinished = ref(false)

const finishedOpe = () => {
  isFinished.value = true
  showCardWrapWidth.value = 100
  showCardWidth.value = 33
  showCardHeight.value = 33
}

// 每次卡片匹配时展示卡片
const flipOpe = () => {
  showCardList.value.map((el) => {
    if (
      currentMatchCard.value.id === el.id ||
      currentMatchCard.value.id === el.id + 'copy'
    ) {
      el.show = true
    }
  })
}
const { cardList, check, currentMatchCard } = useCardContainer(
  params,
  finishedOpe,
  flipOpe
)
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
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  .wrap {
    position: relative;
    height: 93vh;
    .game-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 80vw;
      bottom: 10%;
      z-index: 5;
      .card-wrap {
        display: inline-block;
        // width: 17vw;
        // height: 17vw;
        position: absolute;
        transform-style: preserve-3d;
        transition: all 1s;

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          backface-visibility: hidden;
          text-align: center;
        }

        .card-back {
          img {
            width: 100%;
            // height: 100%;
            border-radius: 3px;
          }
        }

        .card-font {
          transition: all 1s;
          transform: rotateY(180deg);

          img {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            transform: translate3d(-50%, -50%, 0);
          }

          &.hidden-card {
            opacity: 0;
          }
        }
      }
    }
    .show-box {
      position: absolute;
      top: 20%;
      left: 20vw;
      // width: 80vw;
      bottom: 5%;
      opacity: 0.2;
      transition: all 1s;
      font-size: 0;
      &.finish-show {
        opacity: 1;
        left: 0.5vw;
        top: 0;
      }
      .card-wrap {
        display: inline-block;
        // width: 26vw;
        // height: 26vw;
        opacity: 0;
        transition: all 1s;
        &.show-card {
          opacity: 1;
        }
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
