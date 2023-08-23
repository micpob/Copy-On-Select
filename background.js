chrome.runtime.onStartup.addListener( () => {
  chrome.storage.local.set({'lastSelection': ''})
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
          const browserLanguage = chrome.i18n.getUILanguage().slice(0, 2)
          let guideFileName = 'guide.html'
          switch (browserLanguage) {
            case 'it':
              guideFileName = 'guide-it.html'
              break;
            case 'es':
              guideFileName = 'guide-es.html'
              break;
            case 'pt':
              guideFileName = 'guide-pt.html'
              break;  
            case 'fr':
              guideFileName = 'guide-fr.html'
              break;  
            default:
              break;
          }
          chrome.tabs.create({ url: chrome.runtime.getURL(`${guideFileName}`) })
          setUpContextMenus()
        })
        break;
     case 'update':
        chrome.storage.local.get(['active', 'copyOnSelect', 'showCopiedAlert', 'pasteOnDoubleClick', 'pasteOnMiddleClick', 'lastSelection', 'trimSelection', 'alwaysCleanField'], (result) => {
          let active = typeof result.active == 'boolean' ? result.active : true
          let copyOnSelect = typeof result.copyOnSelect == 'boolean' ? result.copyOnSelect : true
          let showCopiedAlert = typeof result.showCopiedAlert == 'boolean' ? result.showCopiedAlert : true
          let pasteOnDoubleClick = typeof result.pasteOnDoubleClick == 'boolean' ? result.pasteOnDoubleClick : true
          let pasteOnMiddleClick = typeof result.pasteOnMiddleClick == 'boolean' ? result.pasteOnMiddleClick : true
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
