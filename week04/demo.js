function fun() {
    console.log('---------字符串-----------')
    const str = 'abcdef'
    for(let item of str) {
        console.log('for..of:', item);
    }
    for(let item in str) {
        console.log('for..in:', item);
    }
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        console.log('for:', element);
        
    }
    console.log('---------数组-----------')
    const arr = [{a: '11'}, {b: '22'}, {c: '33'}];
    for(let item of arr) {
        console.log('for..of:', item);
    }
    for(let item in arr) {
        console.log('for..in:', item);
    }
    arr.forEach((item)=>{
        console.log('forEach:', item);
    })
}
fun()