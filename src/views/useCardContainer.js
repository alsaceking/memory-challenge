import { onMounted, ref } from 'vue'

const CARD_NUM = 10, // 初始化卡片的数量
  LATTICENUM_X = 5,
  LATTICENUM_Y = 4,
  CARD_WIDTH = 20,
  CARD_HEIGHT = 20,
  GAP_X = 4,
  GAP_Y = 4,
  CARD_POOL = 71 // 卡片池的数量

export default function useCardContainer () {

  onMounted(() => {
    initLocations()
    initStatus()
  })
  // 获取随机的图片索引
  const getCardNum = () => {
    let allNum = [],
      selectedNum = []

    for (let i = 0; i < CARD_POOL; i++) {
      allNum.push(i + 1)
    }

    for (let i = 0; i < CARD_NUM; i++) {
      let index = getRandomNum(CARD_POOL - i) - 1
      selectedNum.push(allNum[index])
      allNum.splice(index, 1)
    }
    return selectedNum
  }

  const getRandomNum = (max) => {
    return Math.floor(Math.random() * max) + 1
  }

  // 初始化卡片
  const cardNum = CARD_NUM
  const cardList = ref([])

  const initImage = (cardNumList) => {
    cardList.value = []
    for (let i = 0; i < cardNum; i++) {
      cardList.value.push({
        url: `/src/assets/images/iconfood/card${cardNumList[i]}.png`,
        marks: i,
        id: `pic${i}`,
        flip: false,
        location: null,
        show: false
      })
      cardList.value.push({
        url: `/src/assets/images/iconfood/card${cardNumList[i]}.png`,
        marks: i,
        id: `pic${i}copy`,
        flip: false,
        location: null,
        show: false
      })
    }
    // console.log(cardList.value)
  }

  // 初始化卡片位置
  const latticeNumX = LATTICENUM_X,
    latticeNumY = LATTICENUM_Y,
    cardWidth = CARD_WIDTH,
    cardHeight = CARD_HEIGHT,
    gapX = GAP_X,
    gapY = GAP_Y
  const locationList = ref([])

  const initLocations = () => {
    for (let i = 0; i < latticeNumX; i++) {
      for (let j = 0; j < latticeNumY; j++) {
        locationList.value.push({
          x: j * (cardWidth + gapX),
          y: i * (cardHeight + gapY)
        })
      }
    }
    // console.log(locationList.value)
  }

  // 初始化游戏状态
  const initStatus = () => {
    startTime = -1
    endTimer = null
    animation = false
    timer = null
    resetCard()
  }

  const resetCard = () => {
    initImage(getCardNum())
    const locList = locationList.value
    locList.sort(() => {
      return 0.5 - Math.random()
    })
    cardList.value.forEach((el, index) => {
      el.flip = false
      el.show = false
      el.location = locList[index]
    })
  }

  // 纪录游戏用时
  let startTime = -1,
    endTimer = null

  const spendTime = ref(0)

  const recordTime = () => {
    if (startTime === -1) startTime = new Date().getTime()
    if (
      !cardList.value.some((card) => {
        return card.flip === false
      })
    ) {
      let endTime = new Date().getTime()
      spendTime.value = (endTime - startTime) / 1000
      endTimer = setTimeout(() => {
        alert(`总共用时${spendTime.value}秒！`)
        console.log(`总共用时${Math.round(spendTime.value)}秒！`)
        clearTimeout(endTimer)
      }, 500)
    }
  }

  let animation = false,
    timer = null
  const currentCard = ref(null)

  const check = (card) => {
    if (card.flip || animation) return
    card.flip = !card.flip

    if (currentCard.value === null) {
      currentCard.value = card
      return
    }

    if (currentCard.value.marks === card.marks) {
      animation = true
      timer = setTimeout(() => {
        card.show = true
        currentCard.value.show = true
        currentCard.value = null
        animation = false
        clearTimeout(timer)

        recordTime()
      }, 500)
    } else {
      animation = true
      timer = setTimeout(() => {
        card.flip = !card.flip
        currentCard.value.flip = !currentCard.value.flip
        currentCard.value = null
        animation = false
        clearTimeout(timer)
      }, 500)
    }
  }

  return {
    cardList,
    initStatus,
    check
  }
}