let clipboardContent

const copySelectionToclipboard = (event) => {
  chrome.storage.sync.get(['active', 'copyOnSelect'], (result) => {
    if (result.active && result.copyOnSelect) {
      console.log('Some text selected:', window.getSelection().toString())
      const selection = window.getSelection()
      if (typeof selection !== 'undefined' && selection.toString().length > 0 && selection.toString() !== clipboardContent) {
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
  const alertText = document.createElement('p')
  alertText.innerText = 'copied!'  
  alertText.style.color = 'white'
  alertText.style.fontWeight = '700'
  alertText.style.fontSize = '20px !important'
  alertText.style.fontSizeAdjust = '100%'
  alertText.style.margin = '0'
  alertText.style.padding = '1px 5px'
  alertContainer.appendChild(alertText)

  alertContainer.style.zIndex = '1000000'
  alertContainer.style.position = 'absolute'
  alertContainer.style.userSelect = 'none'   
  alertContainer.style.background = 'black'
  alertContainer.style.opacity = '1'
  alertContainer.style.borderRadius = '4px'

  alertContainer.id = 'copy_on_select_popup_alert'
  
  document.body.appendChild(alertContainer)

  const popup = document.getElementById('copy_on_select_popup_alert')
  const rect = popup.getBoundingClientRect()
  //console.log('window.innerWidth:', window.innerWidth)
  //console.log('event.pageX:', event.pageX)
  //console.log('popup.width:', popup.offsetWidth)

  popup.style.left = (window.innerWidth - event.pageX) < popup.offsetWidth || (document.documentElement.clientWidth - event.pageX) < popup.offsetWidth ? (event.pageX - popup.offsetWidth) + "px" : event.pageX + "px"
  popup.style.top = event.pageY < 45 ? (event.pageY + 15) + "px" : (event.pageY - 40) + "px"

  setTimeout(() => {
    document.body.removeChild(alertContainer)
  }, 400);

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
  if (e.ctrlKey || e.metaKey) {
    return
  } else {
    if (e.which == 2|| e.button == 4) {
      pasteOnMiddleClick(e)
    } else {
      copySelectionToclipboard(e)
    }
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
