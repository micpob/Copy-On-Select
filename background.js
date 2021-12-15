chrome.runtime.onStartup.addListener( () => {
  //chrome.storage.sync.set({'lastSelection': ''})
  chrome.storage.sync.get('active', (result) => {
    if (result.active) {
      chrome.action.setIcon({path: 'Res/Icons/icon64.png'})
    } else {
      chrome.action.setIcon({path: 'Res/Icons/icon64_off.png'})
    } 
  })
})

chrome.runtime.onInstalled.addListener((details) => {
  /* const currentVersion = chrome.runtime.getManifest().version
  const previousVersion = details.previousVersion */
  const reason = details.reason

  switch (reason) {
     case 'install':
        chrome.storage.sync.set({
          "active": true,
          "copyOnSelect": true,
          "showCopiedAlert": true,
          "pasteOnDoubleClick": true,
          "pasteOnMiddleClick": true,
          "lastSelection": ""
        }, () => {
          chrome.tabs.create({ url: chrome.runtime.getURL('guide.html') })
          setUpContextMenus()
        })
        break;
     case 'update':
        setUpContextMenus()
        //chrome.tabs.create({ url: chrome.runtime.getURL('guide.html') })
        break;
     case 'chrome_update':
        break;
     case 'shared_module_update':
        break;
     default:
        
        break;
  }

})

chrome.action.onClicked.addListener( () => {
  chrome.storage.sync.get('active', (result) => {
    if (result.active) {
      chrome.storage.sync.set({ 'active': false })
      chrome.action.setIcon({path: 'Res/Icons/icon64_off.png'})
    } else {
      chrome.storage.sync.set({ 'active': true })
      chrome.action.setIcon({path: 'Res/Icons/icon64.png'})
    }
  })  
})

chrome.runtime.onMessage.addListener((request) => {
  if (request === "showOptions") {
    chrome.runtime.openOptionsPage()
  }
})
