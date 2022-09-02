chrome.runtime.onStartup.addListener( () => {
  //chrome.storage.local.set({'lastSelection': ''})
  chrome.storage.local.get('active', (result) => {
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
        chrome.storage.local.set({
          "active": true,
          "copyOnSelect": true,
          "showCopiedAlert": true,
          "pasteOnDoubleClick": true,
          "pasteOnMiddleClick": true,
          "lastSelection": "",
          "trimSelection": false,
          "alwaysCleanField": false
        }, () => {
          chrome.tabs.create({ url: chrome.runtime.getURL('guide.html') })
          setUpContextMenus()
        })
        break;
     case 'update':
        chrome.storage.sync.get(['active', 'copyOnSelect', 'showCopiedAlert', 'pasteOnDoubleClick', 'pasteOnMiddleClick', 'lastSelection', 'trimSelection', 'alwaysCleanField'], (result) => {
          let active = result.active ? result.active : true
          let copyOnSelect = result.copyOnSelect ? result.copyOnSelect : true
          let showCopiedAlert = result.showCopiedAlert ? result.showCopiedAlert : true
          let pasteOnDoubleClick = result.pasteOnDoubleClick ? result.pasteOnDoubleClick : true
          let pasteOnMiddleClick = result.pasteOnMiddleClick ? result.pasteOnMiddleClick : true
          let lastSelection = result.lastSelection ? result.lastSelection : ""
          let trimSelection = result.trimSelection ? result.trimSelection : false
          let alwaysCleanField = result.alwaysCleanField ? result.alwaysCleanField : false
          chrome.storage.local.set({
            "active": active,
            "copyOnSelect": copyOnSelect,
            "showCopiedAlert": showCopiedAlert,
            "pasteOnDoubleClick": pasteOnDoubleClick,
            "pasteOnMiddleClick": pasteOnMiddleClick,
            "lastSelection": lastSelection,
            "trimSelection": trimSelection,
            "alwaysCleanField": alwaysCleanField
          }, () => {
            chrome.contextMenus.removeAll(() => {
              setUpContextMenus()
            })
          })
        })
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
  chrome.storage.local.get('active', (result) => {
    if (result.active) {
      chrome.storage.local.set({ 'active': false })
      chrome.action.setIcon({path: 'Res/Icons/icon64_off.png'})
    } else {
      chrome.storage.local.set({ 'active': true })
      chrome.action.setIcon({path: 'Res/Icons/icon64.png'})
    }
  })  
})

chrome.runtime.onMessage.addListener((request) => {
  if (request === "showOptions") {
    chrome.runtime.openOptionsPage()
  }
})
