let clipboardContent
const imageSource = chrome.runtime.getURL("./Res/copied.svg")

const copySelectionToclipboard = (event) => {
  chrome.storage.sync.get(['active', 'copyOnSelect'], (result) => {
    if (result.active && result.copyOnSelect) {
      //console.log('Some text selected:', window.getSelection().toString())
      const selection = window.getSelection()
      if (typeof selection !== 'undefined' && selection.toString().trim().length > 0 && selection.toString() !== clipboardContent) {
        navigator.clipboard.writeText(selection.toString()).then(
          () => {
            clipboardContent = selection.toString()
            chrome.storage.sync.get('showCopiedAlert', (result) => {
              if (result.showCopiedAlert) {
                showCopiedAlert(event)
              }
            })  
          },
          (e) => {
            //console.log('NOT copied to clipboard:', e)
            //fallback for iframes
            document.execCommand('copy')
            chrome.storage.sync.get('showCopiedAlert', (result) => {
              if (result.showCopiedAlert) {
                showCopiedAlert(event)
              }
            })
          }
        )
      }
    }
  })  
}

const showCopiedAlert = (event) => {
  const alertContainer = document.createElement('div')

  const alertImage =  document.createElement('img')
  alertImage.style.width = '70px'
  alertImage.src = imageSource
  alertContainer.appendChild(alertImage)

  alertContainer.style.zIndex = '1000000'
  alertContainer.style.position = 'absolute'
  alertContainer.style.userSelect = 'none'   
  alertContainer.style.background = 'transparent'
  alertContainer.style.opacity = '1'
  alertContainer.id = 'copy_on_select_popup_alert'
  
  document.body.appendChild(alertContainer)

  const popup = document.getElementById('copy_on_select_popup_alert')
  popup.style.left = (window.innerWidth - event.pageX) < popup.offsetWidth || (document.documentElement.clientWidth - event.pageX) < popup.offsetWidth ? (event.pageX - popup.offsetWidth) + "px" : event.pageX + "px"
  popup.style.top = event.pageY < 45 ? (event.pageY + 15) + "px" : (event.pageY - 40) + "px"

  setTimeout(() => {
    document.body.removeChild(alertContainer)
  }, 400)

}

const pasteOnDoubleClick = (e) => {
  chrome.storage.sync.get(['active', 'pasteOnDoubleClick'], (result) => {
    if (result.active && result.pasteOnDoubleClick) {
      setTimeout(() => {
        if (e.shiftKey) {
          e.target.value = ''
        }
        document.execCommand('paste')
      }, 100)
    }
  })  
}

const isElementInput = (element) => {
  if (element.nodeName == 'INPUT' || element.nodeName == 'TEXTAREA' || element.isContentEditable) {
    return true
  } else {
    return false
  }
}

const pasteOnMiddleClick = (e) => {
  chrome.storage.sync.get(['active', 'pasteOnMiddleClick'], (result) => {
    if (result.active && result.pasteOnMiddleClick && isElementInput(e.target)) {
      if (e.shiftKey) {
        e.target.value = ''
      }
      document.execCommand('paste')
    }
  })
}

document.addEventListener('pointerup', (e) => {
  if (e.which == 2|| e.button == 4 ) {
    pasteOnMiddleClick(e)
  } else if (e.ctrlKey || e.metaKey) {
    return
  } else {
    copySelectionToclipboard(e)
  }
    
})

document.addEventListener('pointerdown', (e) => {
  if (e.which == 2|| e.button == 4) {
    if (isElementInput(e.target)) {
      e.target.focus()
      e.preventDefault()
      e.stopPropagation()
    }
    /* chrome.storage.sync.get(['active', 'pasteOnMiddleClick'], (result) => {
      if (result.active && result.pasteOnMiddleClick && isElementInput(e.target)) {
        e.target.focus()
        e.preventDefault()
        e.stopPropagation()
      }
    }) */
  }
})

document.addEventListener('dblclick', (e) => {
  if (e.ctrlKey || e.metaKey) {
    pasteOnDoubleClick(e)
  } 
})

//console.log('End of script')
