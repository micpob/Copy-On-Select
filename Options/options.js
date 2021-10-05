//Set texts in local language
/* const objects = document.getElementsByTagName('*')
for(let i = 0; i < objects.length; i++) {
  if (objects[i].hasAttribute('data-text')) {
    const textKey = objects[i].getAttribute('data-text')
    objects[i].innerText = chrome.i18n.getMessage(textKey)
  }
}   */

//Copy on select
const copyOnSelectSetter = document.getElementById('copy_on_select_setter')
const copyOnSelectSwitch = document.getElementById('copy_on_select_switch')
const copyOnSelectonOffIndicator = document.getElementById('copy_on_select_on_off_label')

chrome.storage.sync.get('copyOnSelect', (result) => {  
  if (result.copyOnSelect) {
    copyOnSelectSetter.classList.remove('inactive')
    copyOnSelectSwitch.checked = true
    copyOnSelectonOffIndicator.innerHTML = 'on'
  }
})

copyOnSelectSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.sync.set({'copyOnSelect': true})    
    copyOnSelectSetter.classList.remove('inactive')
    copyOnSelectonOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.sync.set({'copyOnSelect': false})    
    copyOnSelectSetter.classList.add('inactive')
    copyOnSelectonOffIndicator.innerHTML = 'off'
  }
})

//Show 'copied!' popup alert
const showCopiedAlertSetter = document.getElementById('show_copied_alert_setter')
const showCopiedAlertSwitch = document.getElementById('show_copied_alert_switch')
const showCopiedAlertonOffIndicator = document.getElementById('show_copied_alert_on_off_label')

chrome.storage.sync.get('showCopiedAlert', (result) => {  
  if (result.showCopiedAlert) {
    showCopiedAlertSetter.classList.remove('inactive')
    showCopiedAlertSwitch.checked = true
    showCopiedAlertonOffIndicator.innerHTML = 'on'
  }
})

showCopiedAlertSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.sync.set({'showCopiedAlert': true})    
    showCopiedAlertSetter.classList.remove('inactive')
    showCopiedAlertonOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.sync.set({'showCopiedAlert': false})    
    showCopiedAlertSetter.classList.add('inactive')
    showCopiedAlertonOffIndicator.innerHTML = 'off'
  }
})

//Paste on middle click
const pasteOnMiddleClickSetter = document.getElementById('paste_on_middle_click_setter')
const pasteOnMiddleClickSwitch = document.getElementById('paste_on_middle_click_switch')
const pasteOnMiddleClickonOffIndicator = document.getElementById('paste_on_middle_click_on_off_label')

chrome.storage.sync.get('pasteOnMiddleClick', (result) => {  
  if (result.pasteOnMiddleClick) {
    pasteOnMiddleClickSetter.classList.remove('inactive')
    pasteOnMiddleClickSwitch.checked = true
    pasteOnMiddleClickonOffIndicator.innerHTML = 'on'
  }
})

pasteOnMiddleClickSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.sync.set({'pasteOnMiddleClick': true})    
    pasteOnMiddleClickSetter.classList.remove('inactive')
    pasteOnMiddleClickonOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.sync.set({'pasteOnMiddleClick': false})    
    pasteOnMiddleClickSetter.classList.add('inactive')
    pasteOnMiddleClickonOffIndicator.innerHTML = 'off'
  }
})

//Paste on double click + ctrl
const pasteOnDoubleClickSetter = document.getElementById('paste_on_double_click_ctrl_setter')
const pasteOnDoubleClickSwitch = document.getElementById('paste_on_double_click_ctrl_switch')
const pasteOnDoubleClickonOffIndicator = document.getElementById('paste_on_double_click_ctrl_on_off_label')

chrome.storage.sync.get('pasteOnDoubleClick', (result) => {  
  if (result.pasteOnDoubleClick) {
    pasteOnDoubleClickSetter.classList.remove('inactive')
    pasteOnDoubleClickSwitch.checked = true
    pasteOnDoubleClickonOffIndicator.innerHTML = 'on'
  }
})

pasteOnDoubleClickSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.sync.set({'pasteOnDoubleClick': true})    
    pasteOnDoubleClickSetter.classList.remove('inactive')
    pasteOnDoubleClickonOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.sync.set({'pasteOnDoubleClick': false})    
    pasteOnDoubleClickSetter.classList.add('inactive')
    pasteOnDoubleClickonOffIndicator.innerHTML = 'off'
  }
})


//Close page button
document.getElementById('close').addEventListener('click', () => { window.close() })