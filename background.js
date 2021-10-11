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
          "restrictedDomains": []
        }, () => {
          //setUpContextMenus()
        })
        break;
     case 'update':
        //setUpContextMenus()
        //chrome.tabs.create({ url: chrome.extension.getURL('update.html') })
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

/* chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  const tab = tabs[0]
  const tabUrl = tab.url
  if (tabUrl && tabUrl.includes('helpshift.com/admin/issue')) {
    chrome.tabs.sendMessage(tabs[0].id, {content: finalAnswer, numberOfLinesIncipit: numberOfLinesIncipit, numberOfLinesClosing: numberOfLinesClosing})
    close()
  }                                        
}) */