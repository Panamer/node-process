function compose(middlewares) {
    return function() {
      const first = middlewares[0]
      console.log(first());
      
      middlewares.reduce((a, b) => {
        console.log(a)
        if (!a) {
          return Promise.resolve()
        }
        console.log(a.then())
        return a.then(Promise.resolve(b()))
       
      }, first())
    }
}

console.log(
  [1, 2, 3].reduce((a, b) => {
    return a + b
  })
)
// function compose(middlewares) {
//   // middlewares 是数组  返回一个function
//   return function () {
//     // 返回第一个执行的结果
//     return dispatch(0)
//     // 声明dispatch方法
//     function dispatch(i) {
//       // 从 middlewares中取出那一项
//       const fn = middlewares[i]
//       if (!fn) {
//         // 如果fn不存在, 返回一个空promise
//         return Promise.resolve()
//       }
//       // fn存在
//       return Promise.resolve(
//         // 执行fn next的返回结果是执行下一个
//         fn(function next() {
//           // 执行下一个
//           return dispatch(i + 1)
//         })
//       )
//     }
//   }
// }

async function fn1(next) {
  console.log("fn1");
  await next();
  console.log("end fn1");
}
async function fn2(next) {
  console.log("fn2");
  await delay();
  await next();
  console.log("end fn2");
}
function fn3(next) {
  console.log("fn3");
}
function delay() {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove();
    }, 2000);
  });
}
const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
finalFn();