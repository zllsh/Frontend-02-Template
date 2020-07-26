// 在字符串中查看'abcdef'

function findStrFun(str) {
    let res1 = false;
    let res2 = false;
    let res3 = false;
    let res4 = false;
    let res5 = false;
    let res6 = false;
    for(let item of str) {
        // console.log('findStrFun', item)
        if (item === 'a') {
            res1 = true
        } else if(item === 'b') {
            res2 = true
        } else if(item === 'c') {
            res3 = true
        } else if(item === 'd') {
            res4 = true
        } else if(item === 'e') {
            res5 = true
        } else if(item === 'f') {
            res6 = true
        }
        if(res1 && res2 && res3 && res4 && res5 && res6) return true
    }
    return false
}

console.log(findStrFun('abcdef'))
console.log(findStrFun('a1b1c1d1e1f1'))
console.log(findStrFun('ababcdef'))
console.log(findStrFun('a1b1c1d1e1'))
console.log(findStrFun('1b1c1d1e1'))