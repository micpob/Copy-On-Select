const copySelectionToclipboard = (event) => {
  console.log('Some text selected:', window.getSelection().toString())
  const selection = window.getSelection()

  if (typeof selection !== 'undefined' && selection.toString().length > 0) {
    console.log('selection', selection.toString())
    const oRange = selection.getRangeAt(0); //get the text range
    const oRect = oRange.getBoundingClientRect();
    
    navigator.clipboard.writeText(selection.toString()).then(
      function () {
      /* success */
      console.log('copied to clipboard')
      const alertContainer = document.createElement('div')
      const alertText = document.createElement('p')
      alertContainer.style.width = 'auto'
      alertContainer.style.zIndex = '1000'
      alertContainer.style.left = oRect.x + "px"
      alertContainer.style.top = oRect.y + "px"
      /* alertContainer.style.left = event.pageX + "px"
      alertContainer.style.top = (event.pageY - 40) + "px" */
      alertContainer.style.position = 'absolute'
      alertContainer.style.userSelect = 'none'   
      alertContainer.style.background = 'black'
      alertContainer.style.opacity = '1'
      alertContainer.style.borderRadius = '4px'

      alertText.innerText = 'copied!'  
      alertText.style.color = 'white'
      alertText.style.fontWeight = '700'
      alertText.style.fontSize = '20px'
      alertText.style.fontSizeAdjust = '100%'
      alertText.style.margin = '0'
      alertText.style.padding = '1px 5px'
      
      alertContainer.appendChild(alertText)
      
      document.body.appendChild(alertContainer)
      setTimeout(() => {
        document.body.removeChild(alertContainer)
      }, 1000);

      console.log(`event.pageX`, event.pageX)
      console.log(`event.pageY`, event.pageY)
      },
      function (e) {
      /* failure */
      console.log('NOT copied to clipboard:', e)

      }
  );
  }
}

document.addEventListener('pointerup', copySelectionToclipboard)
/* document.addEventListener('keyup', function(){
  console.log('highlight');
}) */

console.log('End of script')
