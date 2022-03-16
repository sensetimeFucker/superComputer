export default {
  isJSON(str) {
    if (typeof str === 'string') {
      try {
        let obj = JSON.parse(str);
        if (str.indexOf('{') > -1) {
          return true;
        } else {
          return false;
        }

      } catch (e) {
        return false;
      }
    }
    return false;
  },
  toThousands(msg) {
    let num = (msg || 0).toString(), result = '';
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return result;
  }
}
