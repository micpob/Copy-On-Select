const setUpContextMenus = () => {
  chrome.contextMenus.removeAll(() => {
    const contextMenuHowItWorks = {
      id: 'howItWorks',
      title: chrome.i18n.getMessage("context_menu_how_it_works"),
      contexts: ['action']
    }
    chrome.contextMenus.create(contextMenuHowItWorks, () => chrome.runtime.lastError)

/*     const contextMenuDivisorLine = {
      id: 'divisorLine',
      title: '---------------',
      contexts: ['action']
    }
    chrome.contextMenus.create(contextMenuDivisorLine, () => chrome.runtime.lastError)
 */
    const contextMenuMyOtherExtyensions = {
      id: 'myOtherExtensions',
      title: chrome.i18n.getMessage("context_menu_my_other_extensions"),
      contexts: ['action']
    }
    chrome.contextMenus.create(contextMenuMyOtherExtyensions, () => chrome.runtime.lastError)

  })
}

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == 'howItWorks') {
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
      case 'de':
        guideFileName = 'guide-de.html'
        break;  
      case 'pl':
        guideFileName = 'guide-pl.html'
        break;  
      default:
        break;
    }
      chrome.tabs.create({ url: chrome.runtime.getURL(`${guideFileName}`) })
  }

  if (clickData.menuItemId == 'myOtherExtensions') {
    chrome.tabs.create({ url: 'https://chromewebstore.google.com/search/micpob' })
  }
})