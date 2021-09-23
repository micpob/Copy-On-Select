chrome.runtime.onInstalled.addListener((details) => {
  /* const currentVersion = chrome.runtime.getManifest().version
  const previousVersion = details.previousVersion */
  const reason = details.reason

  switch (reason) {
     case 'install':
        chrome.storage.local.set({
          "settings": {
            "active": true,
            "showCopiedAlert": true,
            "excludedDomains": [],
          },
        }, () => {

        })
        break;
     case 'update':
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