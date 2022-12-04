<template>
  <div class="common-model">
    <div class="wrap">
      <!-- game-box -->
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
            <div class="face">
              <div class="eye eye1"></div>
              <div class="eye eye2"></div>
              <div class="mouth"></div>
              <div class="cheek cheek1"></div>
              <div class="cheek cheek2"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- show-box -->
      <div
        class="show-box"
        :class="{ 'finish-show': isFinished }"
        :style="{
          width: `${showCardWrapWidth}vh`,
          height: `${showCardWrapHeight}vh`
        }"
      >
        <div
          class="card-wrap"
          v-for="card in showCardList"
          :style="{
            width: `${showCardWidth}vh`,
            height: `${showCardHeight}vh`
          }"
          :class="{ 'show-card': card.show }"
          :key="card.id"
        >
          <img :src="card.url" alt="" />
        </div>
      </div>
      <!-- ope btn -->
      <div class="reset-wrap">
        <div @click="backIndex" style="display: inline-block">
          <div class="back-btn back-btn1"></div>
          <div class="back-btn back-btn2"></div>
        </div>
        <div class="reset-btn" @click="initStatus"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import myStorage from '@/assets/js/myStorage'
import useCardContainer from '../useCardContainer.js'

// 储存的游戏数据
// const COMMON_RANK = '__MEMORY_CHALLENGE_COMMON_RANK__'

const CARD_NUM = 8, // 初始化卡片的数量
  LATTICENUM_X = 4,
  LATTICENUM_Y = 4,
  CARD_WIDTH = 20,
  CARD_HEIGHT = 20,
  GAP_X = 4,
  GAP_Y = 4,
  CARD_SOURCE_LIST = 5,
  BASEURL = '/memory-challenge/cardsource'

const params = {
  cardSourceList: CARD_SOURCE_LIST,
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
// const showCardList = ref([])
// for (let i = 0; i < CARD_NUM; i++) {
//   showCardList.value.push({
//     url: `${BASEURL}/beauty2/beauty0${[i + 1]}.png`,
//     id: `pic${i}`,
//     show: false
//   })
// }

const isFinished = ref(false)
const showCardWrapWidth = ref(30),
  showCardWrapHeight = ref(60),
  showCardWidth = ref(15),
  showCardHeight = ref(15)

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

// 游戏结束时的操作
const finishedOpe = () => {
  console.log(spendTime.value)
  isFinished.value = true
  showCardWrapWidth.value = 50
  showCardWrapHeight.value = 100
  showCardWidth.value = 25
  showCardHeight.value = 25
}
const resetShowCard = () => {
  isFinished.value = false
  showCardWrapWidth.value = 30
  showCardWrapHeight.value = 60
  showCardWidth.value = 15
  showCardHeight.value = 15
  showCardList.value.map((el) => {
    el.show = false
  })
}
// const finishedOpe = () => {
//   const storageList = myStorage.get(COMMON_RANK)
//   let rankList = []
//   if (!storageList) {
//     rankList.push({
//       name: '雨析',
//       sec: 25
//     })
//   } else if (storageList.length < 5) {
//     rankList = storageList.slice()
//     rankList.push({
//       name: '❤',
//       sec: spendTime.value
//     })
//     rankList.sort((a, b) => a.sec - b.sec)
//   } else {
//     rankList = storageList.slice()
//     rankList.push({
//       name: '❤',
//       sec: spendTime.value
//     })
//     rankList.sort((a, b) => a.sec - b.sec)
//     rankList.pop()
//   }
//   myStorage.set(COMMON_RANK, rankList)
// }

// back home
const router = useRouter()
const backIndex = () => {
  router.push({
    path: '/'
  })
}

const {
  cardList,
  showCardList,
  initStatus,
  check,
  spendTime,
  currentMatchCard
} = useCardContainer(params, finishedOpe, flipOpe, resetShowCard)
</script>

<style scoped lang="less">
.common-model {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(to bottom, #d5dee7 0%, #e8ebf2 50%, #e2e7ed 100%);

  .wrap {
    position: relative;
    height: 100%;
    .reset-wrap {
      z-index: 6;
      position: absolute;
      height: 50px;
      padding: 5px;
      bottom: 0;
      width: 100%;
      cursor: pointer;
      // box-shadow: -15px -15px 25px #e0e8f5, 15px 15px 25px #959aa5;
      .back-btn {
        display: inline-block;
        width: 0;
        height: 0;
        filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
        &1 {
          border-right: 25px solid #f0d349;
          border-top: 25px solid transparent;
          border-bottom: 25px solid transparent;
        }
        &2 {
          margin-left: 5px;
          border-left: 25px solid #f0d349;
          border-top: 25px solid transparent;
          border-bottom: 25px solid transparent;
        }
      }
      .reset-btn {
        position: absolute;
        right: 20px;
        display: inline-block;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        background-color: #5a677a;
        filter: drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.6));
      }
    }
    .game-box {
      position: absolute;
      left: 0;
      right: 0px;
      bottom: 10px;
      top: 10px;
      z-index: 5;
      .card-wrap {
        display: inline-block;
        // width: 20vw;
        // height: 20vw;
        margin-left: 4vw;
        // margin-bottom: 12px;
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
          background: linear-gradient(145deg, #e8ebf2, #d5dee7);
          box-shadow: -5px -5px 10px #e0e8f5, 5px 5px 15px #c2c6cf;
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
            width: 100%;
            // position: absolute;
            // top: 50%;
            // left: 50%;
            // transform: translate3d(-50%, -50%, 0);
          }

          &.hidden-card {
            opacity: 0;
          }
        }
      }
    }
    .show-box {
      position: absolute;
      bottom: 75px;
      left: calc((100vw - 30vh) / 2);
      font-size: 0;
      opacity: 0.2;
      transition: all 1s;
      &.finish-show {
        opacity: 1;
        left: calc((100vw - 50vh) / 2);
        bottom: 0;
      }
      .card-wrap {
        // width: 15vh;
        // height: 15vh;
        display: inline-block;
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
.face {
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background-color: #e2e7ed;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.8vw;
  .eye {
    width: 0.3em;
    height: 0.6em;
    border: 2px solid #5f5b58;
    border-radius: 100% 0 0 100% /50%;
    border-right: none;
    position: absolute;
    top: 1.5em;
    &1 {
      transform: rotate(100deg);
      left: 1.2em;
    }
    &2 {
      transform: rotate(80deg);
      right: 1.2em;
    }
  }
  .mouth {
    width: 1.6em;
    height: 0.5em;
    // border-radius: 120px / 30px;
    border-radius: 0 0 50% 50% / 0 0 100% 100%;
    background-color: #f0d349;
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .cheek {
    position: absolute;
    top: 55%;
    transform: rotate(45deg);
    &:before,
    &:after {
      display: block;
      content: '';
      width: 0.2em;
      height: 0.8em;
      border-radius: 2px;
      background-color: #eec4cc;
      position: absolute;
    }
    &:after {
      left: 0.4em;
      top: -0.2em;
    }
    &1 {
      left: 1em;
    }
    &2 {
      right: 1em;
    }
  }
}
</style>
