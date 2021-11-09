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
    chrome.tabs.create({ url: chrome.runtime.getURL('guide.html') })
  }
})