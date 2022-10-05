<template>
  <div class="challenge-model">
    <TopTitle title="快速完成，会有惊喜。"></TopTitle>
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
            <img src="/src/assets/images/back2.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="ope">
      <button @click="initStatus">重新开始</button>
    </div>
  </div>
</template>

<script setup>
import myStorage from '@/assets/js/myStorage'
import TopTitle from '@/components/common/topTitle/TopTitle.vue'
import useCardContainer from '../useCardContainer.js'

// 储存的游戏数据
const CHALLENGE_RANK = '__MEMORY_CHALLENGE_CHALLENGE_RANK__'

const CARD_NUM = 20, // 初始化卡片的数量
  LATTICENUM_X = 8,
  LATTICENUM_Y = 5,
  CARD_WIDTH = 15,
  CARD_HEIGHT = 15,
  GAP_X = 4,
  GAP_Y = 3,
  CARD_POOL = 20, // 卡片池的数量
  BASEURL = '/memory-challenge/iconavatar/card'

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

  .ope {
    height: 5vh;
    text-align: center;
    position: relative;
    button {
      position: absolute;
      width: 80%;
      left: 10%;
      right: 10%;
      bottom: 10px;
      background: #bdc2e8;
      box-sizing: border-box;
      color: #fff;
      font-size: 14px;
      letter-spacing: 3px;
      font-weight: 700;
      line-height: 24px;
      opacity: 1;
      outline: 0 solid transparent;
      height: 5vh;
      padding: 0 15px;
      user-select: none;
      touch-action: manipulation;
      word-break: break-word;
      border: 0;
      border-radius: 5px;
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
        width: 15vw;
        height: 15vw;
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
</style>
