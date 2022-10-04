const myStorage = {
  set: (key, val) => {
    // const obj = {
    //   dataType: typeof val,
    //   content: val,
    //   datetime: new Date().getTime()
    // }
    window.localStorage.setItem(key, JSON.stringify(val))
  },
  get: (key, defval) => {
    const result = window.localStorage.getItem(key)
    return !result && defval ? defval : !result ? null : JSON.parse(result)
  },
  remove: (key) => {
    window.localStorage.removeItem(key)
  },
  // clear: () => {
  //   window.localStorage.clear()
  // }
}

export default myStorage
