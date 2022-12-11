import { onMounted, ref } from 'vue'

export default function useCardContainer (
  { cardSourceList, cardPool, cardNum, latticeNumX, latticeNumY, cardWidth, cardHeight, gapX, gapY, imgBaseUrl }, finishedOpe, flipOpe, resetShowCard
) {

  onMounted(() => {
    initLocations()
    initStatus()
  })
  // 获取随机的图片索引
  const getCardNum = () => {
    let allNum = [],
      selectedNum = []

    for (let i = 0; i < cardPool; i++) {
      allNum.push(i + 1)
    }

    for (let i = 0; i < cardNum; i++) {
      let index = getRandomNum(cardPool - i) - 1
      selectedNum.push(allNum[index])
      allNum.splice(index, 1)
    }
    return selectedNum
  }

  const getRandomNum = (max) => {
    return Math.floor(Math.random() * max) + 1
  }

  // 初始化卡片
  const cardListIndex = ref(1)
  const cardList = ref([])

  const initImage = (cardNumList) => {
    cardListIndex.value = getRandomNum(cardSourceList)
    cardList.value = []

    for (let i = 0; i < cardNum; i++) {
      if (cardPool) {
        cardList.value.push({
          url: `${imgBaseUrl}${cardNumList[i]}.png`,
          marks: i,
          id: `pic${i}`,
          flip: false,
          location: null,
          show: false
        })
        cardList.value.push({
          url: `${imgBaseUrl}${cardNumList[i]}.png`,
          marks: i,
          id: `pic${i}copy`,
          flip: false,
          location: null,
          show: false
        })
      } else {
        cardList.value.push({
          url: `${imgBaseUrl}/beauty${cardListIndex.value}/img${[i + 1]}.png`,
          marks: i,
          id: `pic${i}`,
          flip: false,
          location: null,
          show: false
        })
        cardList.value.push({
          url: `${imgBaseUrl}/beauty${cardListIndex.value}/img${[i + 1]}.png`,
          marks: i,
          id: `pic${i}copy`,
          flip: false,
          location: null,
          show: false
        })
      }
    }
    // console.log(cardList.value)
  }

  // 初始化卡片位置
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

  // 初始化需要展示的卡片
  const showCardList = ref([])
  const initShowImage = () => {
    showCardList.value = []
    for (let i = 0; i < cardNum; i++) {
      showCardList.value.push({
        url: `${imgBaseUrl}/beauty${cardListIndex.value}/img${[i + 1]}.png`,
        id: `pic${i}`,
        show: false
      })
    }
  }

  // 初始化游戏状态
  const initStatus = () => {
    startTime = -1
    endTimer = null
    animation = false
    timer = null
    currentCard.value = null
    resetCard()
  }

  const resetCard = () => {
    if (cardPool) {
      initImage(getCardNum())
    } else {
      resetShowCard()
      initImage()
      initShowImage()
    }
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
      spendTime.value = Math.round((endTime - startTime) / 1000)
      endTimer = setTimeout(() => {
        // alert(`总共用时${spendTime.value}秒！`)
        // console.log(`总共用时${spendTime.value}秒！`)
        finishedOpe()
        if (!flipOpe) {
          initStatus()
        }
        clearTimeout(endTimer)
      }, 500)
    }
  }

  let animation = false,
    timer = null
  const currentCard = ref(null) // 当前选中的卡片
  const currentMatchCard = ref(null) // 当前已匹配的卡片

  const check = (card) => {
    if (card.flip || animation) return

    card.flip = !card.flip

    if (currentCard.value === null) {
      currentCard.value = card
      return
    }

    // 卡片匹配时
    if (currentCard.value.marks === card.marks) {
      currentMatchCard.value = currentCard.value
      if (flipOpe) {
        flipOpe()
      }
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
    showCardList,
    initStatus,
    check,
    spendTime,
    currentMatchCard
  }
}
