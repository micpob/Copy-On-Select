const imageSource = chrome.runtime.getURL("./Res/copied.svg")

const copySelectionToclipboard = (event) => {
  chrome.storage.local.get(['active', 'copyOnSelect', 'lastSelection', 'trimSelection', 'copyOnlyWithAlt', 'bypassCopyOnEditableElements'], (result) => {
    if (result.active && result.copyOnSelect) {
      if (result.copyOnlyWithAlt && !event.altKey) return
      if (result.bypassCopyOnEditableElements && isEditableElement(event.target)) return
      //console.log('Something selected:', window.getSelection())
      const selection = window.getSelection().toString()
      const selectionTrimmed = selection.trim()
      if (typeof selection !== 'undefined' && selectionTrimmed.length > 0) {
        const finalSelection = result.trimSelection ? selectionTrimmed : selection
        if (finalSelection === result.lastSelection) return
        navigator.clipboard.writeText(finalSelection).then(
          () => {
            chrome.storage.local.set({'lastSelection': finalSelection})
            chrome.storage.local.get('showCopiedAlert', (result) => {
              if (result.showCopiedAlert) {
                showCopiedAlert(event)
              }
            })  
          },
          (e) => {
            //console.log('NOT copied to clipboard:', e)
            //fallback for iframes
            document.execCommand('copy')
            chrome.storage.local.set({'lastSelection': finalSelection})
            chrome.storage.local.get('showCopiedAlert', (result) => {
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
  alertImage.style.filter = 'none'
  alertImage.src = imageSource
  alertContainer.appendChild(alertImage)

  alertContainer.style.zIndex = '1000000'
  alertContainer.style.position = 'absolute'
  alertContainer.style.userSelect = 'none'   
  alertContainer.style.background = 'transparent'
  alertContainer.style.opacity = '1'
  alertContainer.id = 'copy_on_select_popup_alert'

  const alertAlreadyShowing = document.getElementById('copy_on_select_popup_alert')

  if (alertAlreadyShowing == null) {
    document.body.appendChild(alertContainer)

    const popup = document.getElementById('copy_on_select_popup_alert')
    popup.style.left = (window.innerWidth - event.pageX) < popup.offsetWidth || (document.documentElement.clientWidth - event.pageX) < popup.offsetWidth ? (event.pageX - popup.offsetWidth) + "px" : event.pageX + "px"
    popup.style.top = event.pageY < 45 ? (event.pageY + 15) + "px" : (event.pageY - 40) + "px"
  
    setTimeout(() => {
      document.body.removeChild(alertContainer)
    }, 400)
  }
}

const pasteContent = (e) => {
  chrome.storage.local.get(['alwaysCleanField'], (result) => {
    if (e.shiftKey && !result.alwaysCleanField || result.alwaysCleanField && !e.shiftKey || e.metaKey && !result.alwaysCleanField || result.alwaysCleanField && !e.metaKey) {
      e.target.value = ''
      e.target.innerText = ''
      if (e.target instanceof HTMLDivElement || e.target instanceof HTMLParagraphElement) {
        if (isEditableElement(e.target.parentElement)) {
            e.target.parentElement.value = ''
            e.target.parentElement.innerText = ''
          } 
        document.execCommand('paste')
      } else {
        document.execCommand('paste')
      }
    } else {
      document.execCommand('paste')
    }
  })
}

const pasteOnDoubleClick = (e) => {
  chrome.storage.local.get(['active', 'pasteOnDoubleClick'], (result) => {
    if (result.active && result.pasteOnDoubleClick && isEditableElement(e.target)) {
      setTimeout(() => {
        pasteContent(e)
      }, 100)
    }
  })  
}

const pasteOnMiddleClick = (e) => {
  chrome.storage.local.get(['active', 'pasteOnMiddleClick'], (result) => {
    if (result.active && result.pasteOnMiddleClick && isEditableElement(e.target)) {
      pasteContent(e)
    }
  })
}

const isEditableElement = (el) =>{
  if (el instanceof HTMLElement && el.isContentEditable) return true
  if (el instanceof HTMLInputElement) {
    if (/text|email|number|password|search|tel|url/.test(el.type || '')) {
      return !(el.disabled || el.readOnly)
    }
  }
  if (el instanceof HTMLTextAreaElement) return !(el.disabled || el.readOnly)
  return false
}

document.addEventListener('pointerup', (e) => {
  if (e.which == 2 || e.button == 4 ) {
    pasteOnMiddleClick(e)
  } else if (e.ctrlKey || e.metaKey) {
    return
  } else {
    copySelectionToclipboard(e)
  }
})

document.addEventListener('pointerdown', (e) => {
  if (e.which == 2 || e.button == 4) {
    if (isEditableElement(e.target)) {
      e.target.focus()
      e.preventDefault()
      e.stopPropagation()
    }
  }
})

document.addEventListener('dblclick', (e) => {
  if (e.ctrlKey || e.metaKey) {
    pasteOnDoubleClick(e)
  } 
})
