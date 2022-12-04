<template>
  <div class="challenge-model">
    <!-- <TopTitle title="快速完成，会有惊喜。"></TopTitle> -->
    <div class="wrap">
      <div class="game-box">
        <div
          v-for="card in cardList"
          class="card-wrap"
          :key="card.id"
          :style="{
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
            <!-- <img src="/src/assets/images/back2.png" alt="" /> -->
            <div class="face">
              <div class="eye eye1"></div>
              <div class="eye eye2"></div>
              <div class="mouth"></div>
              <!-- <div class="cheek cheek1"></div>
              <div class="cheek cheek2"></div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="reset-wrap">
      <div @click="backIndex" style="display: inline-block">
        <div class="back-btn back-btn1"></div>
        <div class="back-btn back-btn2"></div>
      </div>
      <div class="reset-btn" @click="initStatus"></div>
    </div>
  </div>
</template>

<script setup>
import myStorage from '@/assets/js/myStorage'
import { useRouter } from 'vue-router'
import useCardContainer from '../useCardContainer.js'

// 储存的游戏数据
const CHALLENGE_RANK = '__MEMORY_CHALLENGE_CHALLENGE_RANK__'

const CARD_NUM = 15, // 初始化卡片的数量
  LATTICENUM_X = 6,
  LATTICENUM_Y = 5,
  CARD_WIDTH = 14,
  CARD_HEIGHT = 14,
  GAP_X = 5,
  GAP_Y = 5,
  CARD_POOL = 71, // 卡片池的数量
  BASEURL = '/memory-challenge/iconfood/card'

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

const finishedOpe = () => {
  const storageList = myStorage.get(CHALLENGE_RANK)
  let rankList = []
  if (!storageList) {
    rankList.push({
      name: '雨析',
      sec: 108
    })
  } else if (storageList.length < 5) {
    rankList = storageList.slice()
    rankList.push({
      name: '☆',
      sec: spendTime.value
    })
    rankList.sort((a, b) => a.sec - b.sec)
  } else {
    rankList = storageList.slice()
    rankList.push({
      name: '☆',
      sec: spendTime.value
    })
    rankList.sort((a, b) => a.sec - b.sec)
    rankList.pop()
  }
  myStorage.set(CHALLENGE_RANK, rankList)
}

// back home
const router = useRouter()
const backIndex = () => {
  router.push({
    path: '/'
  })
}

const { cardList, initStatus, check, spendTime } = useCardContainer(
  params,
  finishedOpe
)
</script>

<style scoped lang="less">
.challenge-model {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: linear-gradient(
    to bottom,
    #bdc2e8 0%,
    #bdc2e8 1%,
    #e6dee9 100%
  );
  // background: linear-gradient(to bottom, #d5dee7 0%, #e8ebf2 50%, #e2e7ed 100%);
  .reset-wrap {
    z-index: 3;
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

  .wrap {
    position: relative;
    height: 88vh;

    .game-box {
      position: absolute;
      left: 0;
      right: 0px;
      bottom: 10px;
      top: 10px;

      .card-wrap {
        display: inline-block;
        width: 14vw;
        height: 14vw;
        margin-left: 5vw;
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
          // background: linear-gradient(145deg, #e8ebf2, #d5dee7);
          // box-shadow: -5px -5px 10px #e0e8f5, 5px 5px 15px #c2c6cf;
        }

        .card-back {
          filter: drop-shadow(5px 5px 8px rgba(0, 0, 0, 0.3));
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
            width: 80%;
            transform: translate3d(-50%, -50%, 0);
          }

          &.hidden-card {
            opacity: 0;
          }
        }
      }
    }
  }
}
// 笑脸
.face {
  width: 90%;
  height: 90%;
  border-radius: 50%;
  border: 2px solid #f0d349;
  background-color: #e2e7ed;
  // background-color: #5f5b58;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.8vw;
  // background: linear-gradient(145deg, #e8ebf2, #d5dee7);
  // box-shadow: -5px -5px 10px #e0e8f5, 5px 5px 15px #c2c6cf;
  .eye {
    width: 1em;
    height: 2px;
    // border-bottom: 2px solid #5f5b58;
    border-bottom: 2px solid #03a3ee;
    // border-radius: 100% 0 0 100% /50%;
    // border-right: none;
    position: absolute;
    top: 1.5em;
    &1 {
      // transform: rotate(100deg);
      left: 1em;
    }
    &2 {
      // transform: rotate(80deg);
      right: 1em;
    }
  }
  .mouth {
    width: 1.6em;
    height: 0.5em;
    // border-radius: 120px / 30px;
    // border-radius: 0 0 50% 50% / 0 0 100% 100%;
    border-radius: 50% 50% 0 0 / 100% 100% 0% 0%;
    background-color: #bdc2e8;
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
