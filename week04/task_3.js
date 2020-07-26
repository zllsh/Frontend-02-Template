// 在一个字符串中找"a"

function findStr1(str) {
    if (str.indexOf('a') > -1) {
        console.log('findStr1', str, '找到了')
        return true
    }
    console.log('findStr1', str, '没找到')
    return false
}

function findStr2(str) {
    for(let item of str) {
        // console.log('findStr2', item)
        if (item === 'a') {
            console.log('findStr2', str, '找到了')
            return true
        }
    }
    console.log('findStr2', str, '没找到')
    return false
}


function findStr3(str) {
    let res = '没找到'
    const array = str
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        // console.log('findStr3', str, element)
        if (element === 'a') {
            res = '找到了'
            break;
        }
    }
    console.log('findStr3', str, res)
}

findStr1('this is a apply');
findStr1('fdsfdflsdj');
findStr2('this is a apply');
findStr2('fdsfdflsdj');
findStr3('this is a apply');
findStr3('fdsfdflsdj');