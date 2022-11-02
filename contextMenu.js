const setUpContextMenus = () => {
  chrome.contextMenus.removeAll(() => {
    const contextMenuHowItWorks = {
      id: 'howItWorks',
      title: `How it works`,
      contexts: ['action']
    }
    chrome.contextMenus.create(contextMenuHowItWorks, () => chrome.runtime.lastError)
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
      default:
        break;
    }
      chrome.tabs.create({ url: chrome.runtime.getURL(`${guideFileName}`) })
  }
})