// 在字符串中查看'ab'

function findStrFun(str) {
    let res1 = false;
    let res2 = false;
    for(let item of str) {
        // console.log('findStrFun', item)
        if (item === 'a') {
            res1 = true
        } else if(item === 'b') {
            res2 = true
        }
        if(res1 && res2) return true
    }
    return false
}

console.log(findStrFun('a1b2a'))
console.log(findStrFun('123ab2a'))
console.log(findStrFun('a12a'))
console.log(findStrFun('123456'))
console.log(findStrFun('12b'))