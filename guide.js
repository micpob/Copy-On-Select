const optionPageLinks = document.getElementsByClassName('option-page-link')
Array.from(optionPageLinks).forEach(link => {
  link.addEventListener('click', () => {
    chrome.runtime.sendMessage("showOptions")
  })
})