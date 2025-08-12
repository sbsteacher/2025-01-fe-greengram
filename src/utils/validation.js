export const checkValidation = () => {
  const validList = document.querySelectorAll('.valid');
  console.log('validList:', validList);
  if(validList.length > 0) { //유효성 검사를 해야하는 input이 하나 이상이라면
    //validList는 유사배열
    //Array.from(validList) 진짜배열로 전환

    //reduce는 하나로 만들 때 사용
    //여러개의 유효성에 걸리는 message 문자열들을 하나의 문자열로 만드는 작업
    const result = Array.from(validList).reduce((prev, item) => {
      let message = ''
      const value = item.value.trim();
      const notNullMessage = item.getAttribute('not-null-message');
      if(notNullMessage && value.length === 0) {
        message = notNullMessage + '\n';
      } else if(value.length > 0) {
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
    return result.length > 0 //유효성 문제가 하나라도 있다면 return true가 된다.
  }
  return false; //유효성 문제가 하나도 없다면 return false가 된다.
}