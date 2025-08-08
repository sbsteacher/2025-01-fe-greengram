export const checkValidation = () => {
  const validList = document.querySelectorAll('.valid');
  console.log('validList:', validList);
  if(validList) {
    const result = Array.from(validList).reduce((prev, item) => {
      let message = ''
      const value = item.value;
      const notNull = item.getAttribute('not-null');
      if(notNull === 'true' && value.trim().length === 0) {
        message = item.getAttribute('not-null-message') + '\n';
      } else {
        const regexp = item.getAttribute('regexp');
        const regexpObj = new RegExp(regexp);

        if(!value.match(regexpObj)) {
          message += item.getAttribute('regexp-message') + '\n';
        }   
      }
      return prev + message;
    }, '');
    if(result.length > 0) {
      alert(result);
    }
    return result.length > 0
  }
  return false;
}