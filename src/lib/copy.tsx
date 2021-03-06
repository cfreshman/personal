export function copy(text) {
   if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
   } else {
      let textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
   }
}