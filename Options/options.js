//Set texts in local language
const objects = document.getElementsByTagName('*')
for(let i = 0; i < objects.length; i++) {
  if (objects[i].hasAttribute('data-text')) {
    const textKey = objects[i].getAttribute('data-text')
    objects[i].innerText = chrome.i18n.getMessage(textKey)
  }
}  

//Copy on select
const copyOnSelectSetter = document.getElementById('copy_on_select_setter')
const copyOnSelectSwitch = document.getElementById('copy_on_select_switch')
const copyOnSelectonOffIndicator = document.getElementById('copy_on_select_on_off_label')

chrome.storage.local.get('copyOnSelect', (result) => {  
  if (result.copyOnSelect) {
    copyOnSelectSetter.classList.remove('inactive')
    copyOnSelectSwitch.checked = true
    copyOnSelectonOffIndicator.innerHTML = 'on'
  }
})

copyOnSelectSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.local.set({'copyOnSelect': true})    
    copyOnSelectSetter.classList.remove('inactive')
    copyOnSelectonOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.local.set({'copyOnSelect': false})    
    copyOnSelectSetter.classList.add('inactive')
    copyOnSelectonOffIndicator.innerHTML = 'off'
  }
})

//Copy only if Alt is pressed
const copyOnlyWithAltSetter = document.getElementById('copy_only_with_alt_setter')
const copyOnlyWithAltSwitch = document.getElementById('copy_only_with_alt_switch')
const copyOnlyWithAltOnOffIndicator = document.getElementById('copy_only_with_alt_label')

const bypassCopyWithAltSetter = document.getElementById('bypass_copy_with_alt_setter')
const bypassCopyWithAltSwitch = document.getElementById('bypass_copy_with_alt_switch')
const bypassCopyWithAltOnOffIndicator = document.getElementById('bypass_copy_with_alt_label')

chrome.storage.local.get('copyOnlyWithAlt', (result) => {  
  if (result.copyOnlyWithAlt) {
    copyOnlyWithAltSetter.classList.remove('inactive')
    copyOnlyWithAltSwitch.checked = true
    copyOnlyWithAltOnOffIndicator.innerHTML = 'on'
  }
})

copyOnlyWithAltSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.local.set({'copyOnlyWithAlt': true, 'bypassCopyWithAlt': false})    
    copyOnlyWithAltSetter.classList.remove('inactive')
    copyOnlyWithAltOnOffIndicator.innerHTML = 'on'
    bypassCopyWithAltSetter.classList.add('inactive')
    bypassCopyWithAltOnOffIndicator.innerHTML = 'off'
    bypassCopyWithAltSwitch.checked = false
  } else {
    chrome.storage.local.set({'copyOnlyWithAlt': false})    
    copyOnlyWithAltSetter.classList.add('inactive')
    copyOnlyWithAltOnOffIndicator.innerHTML = 'off'
  }
})

//Bypass copy if Alt is pressed

chrome.storage.local.get('bypassCopyWithAlt', (result) => {  
  if (result.bypassCopyWithAlt) {
    bypassCopyWithAltSetter.classList.remove('inactive')
    bypassCopyWithAltSwitch.checked = true
    bypassCopyWithAltOnOffIndicator.innerHTML = 'on'
  }
})

bypassCopyWithAltSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.local.set({'bypassCopyWithAlt': true, 'copyOnlyWithAlt': false})    
    bypassCopyWithAltSetter.classList.remove('inactive')
    bypassCopyWithAltOnOffIndicator.innerHTML = 'on'
    copyOnlyWithAltSetter.classList.add('inactive')
    copyOnlyWithAltOnOffIndicator.innerHTML = 'off'
    copyOnlyWithAltSwitch.checked = false
  } else {
    chrome.storage.local.set({'bypassCopyWithAlt': false})    
    bypassCopyWithAltSetter.classList.add('inactive')
    bypassCopyWithAltOnOffIndicator.innerHTML = 'off'
  }
})

//Show 'copied!' popup alert
const showCopiedAlertSetter = document.getElementById('show_copied_alert_setter')
const showCopiedAlertSwitch = document.getElementById('show_copied_alert_switch')
const showCopiedAlertonOffIndicator = document.getElementById('show_copied_alert_on_off_label')

chrome.storage.local.get('showCopiedAlert', (result) => {  
  if (result.showCopiedAlert) {
    showCopiedAlertSetter.classList.remove('inactive')
    showCopiedAlertSwitch.checked = true
    showCopiedAlertonOffIndicator.innerHTML = 'on'
  }
})

showCopiedAlertSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.local.set({'showCopiedAlert': true})    
    showCopiedAlertSetter.classList.remove('inactive')
    showCopiedAlertonOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.local.set({'showCopiedAlert': false})    
    showCopiedAlertSetter.classList.add('inactive')
    showCopiedAlertonOffIndicator.innerHTML = 'off'
  }
})

//Paste on middle click
const pasteOnMiddleClickSetter = document.getElementById('paste_on_middle_click_setter')
const pasteOnMiddleClickSwitch = document.getElementById('paste_on_middle_click_switch')
const pasteOnMiddleClickonOffIndicator = document.getElementById('paste_on_middle_click_on_off_label')

chrome.storage.local.get('pasteOnMiddleClick', (result) => {  
  if (result.pasteOnMiddleClick) {
    pasteOnMiddleClickSetter.classList.remove('inactive')
    pasteOnMiddleClickSwitch.checked = true
    pasteOnMiddleClickonOffIndicator.innerHTML = 'on'
  }
})

pasteOnMiddleClickSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.local.set({'pasteOnMiddleClick': true})    
    pasteOnMiddleClickSetter.classList.remove('inactive')
    pasteOnMiddleClickonOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.local.set({'pasteOnMiddleClick': false})    
    pasteOnMiddleClickSetter.classList.add('inactive')
    pasteOnMiddleClickonOffIndicator.innerHTML = 'off'
  }
})

//Paste on double click + ctrl
const pasteOnDoubleClickSetter = document.getElementById('paste_on_double_click_ctrl_setter')
const pasteOnDoubleClickSwitch = document.getElementById('paste_on_double_click_ctrl_switch')
const pasteOnDoubleClickonOffIndicator = document.getElementById('paste_on_double_click_ctrl_on_off_label')

chrome.storage.local.get('pasteOnDoubleClick', (result) => {  
  if (result.pasteOnDoubleClick) {
    pasteOnDoubleClickSetter.classList.remove('inactive')
    pasteOnDoubleClickSwitch.checked = true
    pasteOnDoubleClickonOffIndicator.innerHTML = 'on'
  }
})

pasteOnDoubleClickSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.local.set({'pasteOnDoubleClick': true})    
    pasteOnDoubleClickSetter.classList.remove('inactive')
    pasteOnDoubleClickonOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.local.set({'pasteOnDoubleClick': false})    
    pasteOnDoubleClickSetter.classList.add('inactive')
    pasteOnDoubleClickonOffIndicator.innerHTML = 'off'
  }
})

//Trim selection
const trimSelectionSetter = document.getElementById('trim_selection_setter')
const trimSelectionSwitch = document.getElementById('trim_selection_switch')
const trimSelectionOnOffIndicator = document.getElementById('trim_selection_on_off_label')

chrome.storage.local.get('trimSelection', (result) => {  
  if (result.trimSelection) {
    trimSelectionSetter.classList.remove('inactive')
    trimSelectionSwitch.checked = true
    trimSelectionOnOffIndicator.innerHTML = 'on'
  }
})

trimSelectionSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.local.set({'trimSelection': true})    
    trimSelectionSetter.classList.remove('inactive')
    trimSelectionOnOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.local.set({'trimSelection': false})    
    trimSelectionSetter.classList.add('inactive')
    trimSelectionOnOffIndicator.innerHTML = 'off'
  }
})

//Always clean field before pasting selection
const alwaysCleanFieldSetter = document.getElementById('always_clean_field_setter')
const alwaysCleanFieldSwitch = document.getElementById('always_clean_field_switch')
const alwaysCleanFieldOnOffIndicator = document.getElementById('always_clean_field_on_off_label')

chrome.storage.local.get('alwaysCleanField', (result) => {  
  if (result.alwaysCleanField) {
    alwaysCleanFieldSetter.classList.remove('inactive')
    alwaysCleanFieldSwitch.checked = true
    alwaysCleanFieldOnOffIndicator.innerHTML = 'on'
  }
})

alwaysCleanFieldSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.local.set({'alwaysCleanField': true})    
    alwaysCleanFieldSetter.classList.remove('inactive')
    alwaysCleanFieldOnOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.local.set({'alwaysCleanField': false})    
    alwaysCleanFieldSetter.classList.add('inactive')
    alwaysCleanFieldOnOffIndicator.innerHTML = 'off'
  }
})

//Bypass auto-copy on input fields
const bypassCopyOnEditableElementsSetter = document.getElementById('bypass_copy_in_input_fields_setter')
const bypassCopyOnEditableElementsSwitch = document.getElementById('bypass_copy_in_input_fields_switch')
const bypassCopyOnEditableElementsOnOffIndicator = document.getElementById('bypass_copy_in_input_fields_label')

chrome.storage.local.get('bypassCopyOnEditableElements', (result) => {  
  if (result.bypassCopyOnEditableElements) {
    bypassCopyOnEditableElementsSetter.classList.remove('inactive')
    bypassCopyOnEditableElementsSwitch.checked = true
    bypassCopyOnEditableElementsOnOffIndicator.innerHTML = 'on'
  }
})

bypassCopyOnEditableElementsSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.local.set({'bypassCopyOnEditableElements': true})    
    bypassCopyOnEditableElementsSetter.classList.remove('inactive')
    bypassCopyOnEditableElementsOnOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.local.set({'bypassCopyOnEditableElements': false})    
    bypassCopyOnEditableElementsSetter.classList.add('inactive')
    bypassCopyOnEditableElementsOnOffIndicator.innerHTML = 'off'
  }
})

//Prepend text option switch
const prependTextSetter = document.getElementById('prepend_text_setter')
const prependTextSwitch = document.getElementById('prepend_text_switch')
const prependTextOnOffIndicator = document.getElementById('prepend_text_label')

chrome.storage.local.get('prependText', (result) => {  
  if (result.prependText) {
    prependTextSetter.classList.remove('inactive')
    prependTextSwitch.checked = true
    prependTextOnOffIndicator.innerHTML = 'on'
  }
})

prependTextSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.local.set({'prependText': true})    
    prependTextSetter.classList.remove('inactive')
    prependTextOnOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.local.set({'prependText': false})    
    prependTextSetter.classList.add('inactive')
    prependTextOnOffIndicator.innerHTML = 'off'
  }
})

//Prepend text input field
const prependTextInputField = document.getElementById('prepend_text_input_field')

chrome.storage.local.get('textToPrepend', (result) => {  
  if (result.textToPrepend) {
    prependTextInputField.value = result.textToPrepend
  }
})

prependTextInputField.addEventListener('input', (e) => {
  chrome.storage.local.set({'textToPrepend': e.target.value})    
})

//Postpend text option switch
const postpendTextSetter = document.getElementById('postpend_text_setter')
const postpendTextSwitch = document.getElementById('postpend_text_switch')
const postpendTextOnOffIndicator = document.getElementById('postpend_text_label')

chrome.storage.local.get('postpendText', (result) => {  
  if (result.postpendText) {
    postpendTextSetter.classList.remove('inactive')
    postpendTextSwitch.checked = true
    postpendTextOnOffIndicator.innerHTML = 'on'
  }
})

postpendTextSwitch.addEventListener('change', (e) => {
  if (e.target.checked) {
    chrome.storage.local.set({'postpendText': true})    
    postpendTextSetter.classList.remove('inactive')
    postpendTextOnOffIndicator.innerHTML = 'on'
  } else {
    chrome.storage.local.set({'postpendText': false})    
    postpendTextSetter.classList.add('inactive')
    postpendTextOnOffIndicator.innerHTML = 'off'
  }
})

//Postpend text input field
const postpendTextInputField = document.getElementById('postpend_text_input_field')

chrome.storage.local.get('textToPostpend', (result) => {  
  if (result.textToPostpend) {
    postpendTextInputField.value = result.textToPostpend
  }
})

postpendTextInputField.addEventListener('input', (e) => {
  chrome.storage.local.set({'textToPostpend': e.target.value})    
})


//Open user guide button
document.getElementById('guide_button').addEventListener('click', () => { 
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
})

//Close page button
document.getElementById('close').addEventListener('click', () => { window.close() })

//info buttons
const infoButtons = document.getElementsByClassName('info-button')
for(let i = 0; i < infoButtons.length; i++) {
  infoButtons[i].addEventListener('pointerover', (e) => {
    const popupId = `${e.target.id}_popup`
    const popup = document.getElementById(popupId)
    if (popup) popup.style.display = 'block'
  })
  infoButtons[i].addEventListener('pointerleave', (e) => {
    const popupId = `${e.target.id}_popup`
    const popup = document.getElementById(popupId)
    if (popup) popup.style.display = 'none'
  })
}