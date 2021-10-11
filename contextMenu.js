/* const setUpContextMenus = () => {
  console.log('setUpContextMenus')
  chrome.contextMenus.removeAll(() => {
    //Show 'Copied!' popup alert
    chrome.storage.sync.get('showCopiedAlert', (result) => {
      const showCopiedAlert = result.showCopiedAlert
      // chrome.i18n not working yet on manifest v3
      //const title = showCopiedAlert ? chrome.i18n.getMessage("context_menu_hide_copied_alert") : chrome.i18n.getMessage("context_menu_show_copied_alert") 
      const title = showCopiedAlert ? `Hide 'Copied!' popup` : `Show 'Copied!' popup`      
      const contextMenushowCopiedAlert = {
        id: 'showHideCopiedAlertContextMenu',
        title: `${title}`,
        contexts: ['action']
      }
      chrome.contextMenus.create(contextMenushowCopiedAlert, () => chrome.runtime.lastError)
    })

    //Paste on double click + ctrl
    chrome.storage.sync.get('pasteOnDoubleClick', (result) => {
      const pasteOnDoubleClick = result.pasteOnDoubleClick
      // chrome.i18n not working yet on manifest v3
      //const title = showCopiedAlert ? chrome.i18n.getMessage("context_menu_hide_copied_alert") : chrome.i18n.getMessage("context_menu_show_copied_alert") 
      const title = pasteOnDoubleClick ? `Turn OFF paste on ctrl + double click` : `Turn ON paste on ctrl + double click`      
      const pasteOnDoubleClickContextMenu = {
        id: 'pasteOnDoubleClickContextMenu',
        title: `${title}`,
        contexts: ['action']
      }
      chrome.contextMenus.create(pasteOnDoubleClickContextMenu, () => chrome.runtime.lastError)
    })

    //Deactivate on this domain 
    const contextMenuDeactiveOnThisDomain = {
      id: 'deactiveOnThisDomainContextMenu',
      title: `Turn off on this domain`,
      contexts: ['action']
    }
    chrome.contextMenus.create(contextMenuDeactiveOnThisDomain, () => chrome.runtime.lastError)
  })
}

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == 'showHideCopiedAlertContextMenu') {
    chrome.storage.sync.get('showCopiedAlert', (result) => {
      const showCopiedAlert = result.showCopiedAlert
      chrome.storage.sync.set({'showCopiedAlert': !showCopiedAlert}, () => {
        
      })
    })
  }
  if (clickData.menuItemId == 'pasteOnDoubleClickContextMenu') {
    chrome.storage.sync.get('pasteOnDoubleClick', (result) => {
      const pasteOnDoubleClick = result.pasteOnDoubleClick
      chrome.storage.sync.set({'pasteOnDoubleClick': !pasteOnDoubleClick}, () => {
        
      })
    })
  }
  if (clickData.menuItemId == 'deactiveOnThisDomainContextMenu') {
    console.log('deactiveOnThisDomainContextMenu')
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      const url = new URL(tabs[0].url)
      const hostname = url.hostname
      chrome.storage.sync.get('restrictedDomains', (result) => {
        const restrictedDomains = result.restrictedDomains
        if (!restrictedDomains.includes(hostname)) {
          restrictedDomains.push(hostname)
          chrome.storage.sync.set({'restrictedDomains': restrictedDomains}, () => {
          
          })
        }
      })
    })
    
  }
})

chrome.storage.onChanged.addListener((changes) => {
  for(key in changes) {
    if (key === 'showCopiedAlert') {
      // chrome.i18n not working yet on manifest v3
      //const title = changes.showCopiedAlert.newValue ? chrome.i18n.getMessage("context_menu_hide_copied_alert") : chrome.i18n.getMessage("context_menu_show_copied_alert") 
      const title = changes.showCopiedAlert.newValue ? `Hide 'Copied!' popup` : `Show 'Copied!' popup`   
      chrome.contextMenus.update('showHideCopiedAlertContextMenu', {title: `${title}`}, () => chrome.runtime.lastError);
    }
    if (key === 'pasteOnDoubleClick') {
      // chrome.i18n not working yet on manifest v3
      //const title = changes.showCopiedAlert.newValue ? chrome.i18n.getMessage("context_menu_hide_copied_alert") : chrome.i18n.getMessage("context_menu_show_copied_alert") 
      const title = changes.pasteOnDoubleClick.newValue ? `Turn OFF paste on ctrl + double click` : `Turn ON paste on ctrl + double click`   
      chrome.contextMenus.update('pasteOnDoubleClickContextMenu', {title: `${title}`}, () => chrome.runtime.lastError);
    }
  }
})
 */