const numbers = [1,2,3,4,5]

const ret = numbers.reduce((a, b) => (...args) => a(b(...args)))

console.log(ret)