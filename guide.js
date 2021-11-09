const openOptionsPage = () => {
  console.log('openOptionsPage')
  chrome.runtime.sendMessage("showOptions")
  console.log('showOptions')
  /* return false */
}