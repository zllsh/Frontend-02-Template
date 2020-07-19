function stringToNumber(str) {
    if (!str) return null;
    if (typeof str !== 'string') return null;
    const pointCount = str.split('.').length - 1
    if (pointCount> 1) return null; // 多个小数点也不行
    
    const numberArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const letterArr = ['A', 'B', 'C', 'D', 'E', 'F'];  
    let isNumberStr = false;
    
    if (pointCount === 1) { // 如果有小数点
      const _str = str.replace('.', '');
      let valid = true;
      // 去掉小数点后的所有字符只要有一个不是数字，就不行
      for(let i=0;i < _str.length;i++){
        if (numberArr.indexOf(_str.substr(i,1)) === -1) {
          valid = false;
          break;
        }
      }
      if (valid) isNumberStr = true
    } else { // 如果没有小数点 
        const str_first = str.substr(0,1); // 第1个字符
        const str_second = str.substr(1,1); // 第2个字符
        const str_other = str.substring(2); // 剩下的字符
        
        if (numberArr.indexOf(str_first) === -1) {
            return null
        }      
        
        if (str_first === '0' && str_second.toLocaleLowerCase() === 'b') { // 二进制
            let valid = true;
            for(let i = 0;i<str_other.length;i++) {
                let char = str_other.substr(i,1)
                if (['0', '1'].indexOf(char) === -1) {
                    valid = false;
                    break;
                }
            }
            if (valid) isNumberStr = true
        } else if(str_first === '0' && str_second.toLocaleLowerCase() === 'o') { // 八进制
            let valid = true;
            for(let i = 0;i<str_other.length;i++) {
                let char = str_other.substr(i,1)
                if (['0', '1', '2', '3', '4', '5', '6', '7'].indexOf(char) === -1) {
                    valid = false;
                    break;
                }
            }
            if (valid) isNumberStr = true
        } else if(str_first === '0' && str_second.toLocaleLowerCase() === 'x') { // 十六进制
            let valid = true;
            for(let i = 0;i<str_other.length;i++) {
                let char = str_other.substr(i,1)
                if (numberArr.indexOf(char) === -1 && letterArr.indexOf(char) === -1) {
                    valid = false;
                    break;
                }
            }
            if (valid) isNumberStr = true
        } else if (numberArr.indexOf(str_second) > -1) { // 十进制
            let valid = true;
            for(let i = 0;i<str_other.length;i++) {
                let char = str_other.substr(i,1)
                if (numberArr.indexOf(char) === -1) {
                    valid = false;
                    break;
                }
            }
            if (valid) isNumberStr = true
        } else if (str_second.toLocaleLowerCase() === 'e') {// 十进制
            let valid = true;
            for(let i = 0;i<str_other.length;i++) {
                let char = str_other.substr(i,1)
                if (numberArr.indexOf(char) === -1) {
                    valid = false;
                    break;
                }
            }
            if (valid) isNumberStr = true
        }
    }
    
    if (isNumberStr) return str - 0
    return null
}

function numberToString(nub) {
    if (!nub) return null; 
    if (typeof nub !== 'number') return null;
    return nub.toString();
}

console.log(stringToNumber('0'))
console.log(stringToNumber('0.'))
console.log(stringToNumber('.2'))
console.log(stringToNumber('1e3'))
console.log(stringToNumber('0b111'))
console.log(stringToNumber('0o10'))
console.log(stringToNumber('0xFF'))
console.log(stringToNumber('0b1112'))
console.log(stringToNumber('0o108'))
console.log(stringToNumber('0xFFg'))