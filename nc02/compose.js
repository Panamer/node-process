// https://segmentfault.com/a/1190000016707187#item-7-5


function compose(middlewares) {
  return function () {
    // 自执行 async 函数返回 Promise
    return (async function () {
      // 定义默认的 next，最后一个中间件内执行的 next
      let next = async () => Promise.resolve();

      // middleware 为每一个中间件函数，oldNext 为每个中间件函数中的 next
      // 函数返回一个 async 作为新的 next，async 执行返回 Promise，解决异步问题
      function createNext(middleware, oldNext) {
        return async () => {
          await middleware(oldNext);
        }
      }

      // 反向遍历中间件数组，先把 next 传给最后一个中间件函数
      // 将新的中间件函数存入 next 变量
      // 调用下一个中间件函数，将新生成的 next 传入
      for (let i = middlewares.length - 1; i >= 0; i--) {
        next = createNext(middlewares[i], next);
      }

      await next();
    })();
  }
}

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