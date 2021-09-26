const setUpContextMenus = () => {
  console.log('setUpContextMenus')
  chrome.contextMenus.removeAll(() => {
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
})

chrome.storage.onChanged.addListener((changes) => {
  for(key in changes) {
    if (key === 'showCopiedAlert') {
      // chrome.i18n not working yet on manifest v3
      //const title = changes.showCopiedAlert.newValue ? chrome.i18n.getMessage("context_menu_hide_copied_alert") : chrome.i18n.getMessage("context_menu_show_copied_alert") 
      const title = changes.showCopiedAlert.newValue ? `Hide 'Copied!' popup` : `Show 'Copied!' popup`   
      chrome.contextMenus.update('showHideCopiedAlertContextMenu', {title: `${title}`}, () => chrome.runtime.lastError);
    }
  }
})
