let clipboardContent

const copySelectionToclipboard = (event) => {
  chrome.storage.sync.get('active', (result) => {
    if (result.active) {
      console.log('Some text selected:', window.getSelection().toString())
      const selection = window.getSelection()
    
      if (typeof selection !== 'undefined' && selection.toString().length > 0 && selection.toString() !== clipboardContent) {
        console.log('selection:', selection.toString())
        /* const oRange = selection.getRangeAt(0); 
        const oRect = oRange.getBoundingClientRect(); */
    
        navigator.clipboard.writeText(selection.toString()).then(
          function () {
            clipboardContent = selection.toString()
            chrome.storage.sync.get('showCopiedAlert', (result) => {
              if (result.showCopiedAlert) {
                showCopiedAlert(event)
              }
            })  
    
          },
          function (e) {
          console.log('NOT copied to clipboard:', e)
    
          }
        )
      }
    }
  })  
}

const showCopiedAlert = (event) => {
  const alertContainer = document.createElement('div')
  const alertText = document.createElement('p')
  alertText.innerText = 'copied!'  
  alertText.style.color = 'white'
  alertText.style.fontWeight = '700'
  alertText.style.fontSize = '20px'
  alertText.style.fontSizeAdjust = '100%'
  alertText.style.margin = '0'
  alertText.style.padding = '1px 5px'
  alertContainer.appendChild(alertText)

  alertContainer.style.zIndex = '1000'
  /* alertContainer.style.left = oRect.x + "px"
  alertContainer.style.top = oRect.y + "px" */
  /* alertContainer.style.left = (oRect.x + (oRect.width / 2)) + "px"
  alertContainer.style.top = (oRect.y + (oRect.height / 2)) + "px" */
/*  alertContainer.style.left = (oRect.x + (oRect.width / 2) - (alertContainer.width / 2)) + "px"
  alertContainer.style.top = (oRect.y + (oRect.heigth / 2) - (alertContainer.heigth / 2)) + "px" */
  alertContainer.style.left = event.pageX + "px"
  alertContainer.style.top = (event.pageY - 40) + "px"
  alertContainer.style.position = 'absolute'
  alertContainer.style.userSelect = 'none'   
  alertContainer.style.background = 'black'
  alertContainer.style.opacity = '1'
  alertContainer.style.borderRadius = '4px'
  
  document.body.appendChild(alertContainer)

  setTimeout(() => {
    document.body.removeChild(alertContainer)
  }, 1000);

}

const pasteOnDoubleClick = () => {
  chrome.storage.sync.get(['active', 'pasteOnDoubleClick'], (result) => {
    if (result.active && result.pasteOnDoubleClick) {
      setTimeout(() => {
        document.execCommand('paste')
      }, 100)
    }
  })  
}

document.addEventListener('pointerup', (e) => {
  if (e.ctrlKey || e.metaKey) {
    return
  } else {
    copySelectionToclipboard(e)
  }  
})

/* document.addEventListener('selectionchange', (e) => {
  if (e.ctrlKey || e.metaKey) {
    return
  } else {
  console.log(document.getSelection());

    copySelectionToclipboard(e)
  }  
}) */
/* document.addEventListener('keyup', function(){
  console.log('highlight');
}) */

document.addEventListener('dblclick', (e) => {
  //console.log('double click detected')
  if (e.ctrlKey || e.metaKey) {
    pasteOnDoubleClick()
  } 
})

console.log('End of script')
