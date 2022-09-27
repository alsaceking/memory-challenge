const myStorage = {
  setLocalData: (key, val) => {
    const obj = {
      dataType: typeof val,
      content: val,
      datetime: new Date().getTime()
    }
    window.localStorage.setItem(key, JSON.stringify(obj))
  },
  getLocalData: (key, defval) => {
    const result = window.localStorage.getItem(key)
    return !result && defval ? defval : !result ? null : JSON.parse(result)
  },
  removeLocalData: (key) => {
    window.localStorage.removeItem(key)
  },
  clearLocalData: () => {
    window.localStorage.clear()
  }
}

export default myStorage
