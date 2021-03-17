const myPromise = require('./myPromiseCopy')

let promise = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success...')
  }, 2000)
  // throw new Error('executor error')
  // resolve('success')
  // reject('error')
})

promise.then(value => {
  console.log(value)
  // throw new Error('then error')
  return 'abc'
}, reason => {
  // console.log(reason.message)
  return 666
}).then(value => {
  console.log(value)
}, reason => {
  console.log('555')
  console.log(reason.message)
})

// 多次调用
// promise.then(value => {
//   console.log(1)
//   console.log(value)
// }, reason => {
//   console.log(1)
//   console.log(reason)
// })

// promise.then(value => {
//   console.log(2)
//   console.log(value)
// }, reason => {
//   console.log(2)
//   console.log(reason)
// })

// promise.then(value => {
//   console.log(3)
//   console.log(value)
// }, reason => {
//   console.log(3)
//   console.log(reason)
// })

// 链式调用
// promise.then(value => {
//   console.log(value)
//   return 5
// }).then(value => {
//   console.log(value)
// })

// 返回promise对象
// promise.then(value => {
//   console.log(value)
//   return other()
// }).then(value => {
//   console.log(value)
// })

// function other () {
//   return new myPromise((resolve, reject) => {
//     resolve('other')
//   })
// }

// 自己调用自己
// let p1 = promise.then(value => {
//   console.log(value)
//   return p1
// })

// p1.then(value => {
//   console.log(value)
// }, reason => {
//   console.log(reason.message)
// })