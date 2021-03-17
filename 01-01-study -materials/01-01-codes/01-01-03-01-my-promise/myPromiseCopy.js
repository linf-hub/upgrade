const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败
class MyPromise {
  constructor (/*执行器*/executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  // 状态
  status = PENDING
  // 成功之后的值
  value = undefined
  // 失败之后的原因
  reason = undefined
  // 成功回调
  // successCallback = undefined
  successCallback = []
  // 失败回调
  // failCallback = undefined
  failCallback = []
  // 使用箭头函数是为了在调用时this指向这个类
  resolve = value => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return
    // 更新状态为成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
    // 如果成功回调存在，调用，并传入成功值
    // this.successCallback && this.successCallback(value)
    while (this.successCallback.length) this.successCallback.shift()()
  }
  reject = reason => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return
    // 更新状态为失败
    this.status = REJECTED
    // 保存失败之后的原因
    this.reason = reason
    // 如果失败回调存在，调用，并传入失败原因
    // this.failCallback && this.failCallback(reason)
    while (this.failCallback.length) this.failCallback.shift()()
  }
  then(successCallback, failCallback) {
    let parmise2 = new MyPromise((resolve, reject) => {

      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            // 判断x是普通值还是promise对象
            // 如果是普通值,直接调用resolve
            // 如果是promise对象 查看promise对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve reject
            // resolve(x)
            resolvePromise(parmise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else if (this.status === REJECTED) {
        // let y = failCallback(this.reason)
        // reject(y)
        setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            // 判断x是普通值还是promise对象
            // 如果是普通值,直接调用resolve
            // 如果是promise对象 查看promise对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve reject
            // resolve(x)
            resolvePromise(parmise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else {
        // 等待
        // 将成功、失败回调存储
        // this.successCallback = successCallback
        // this.successCallback.push(successCallback)
        // this.failCallback = failCallback
        // this.failCallback.push(failCallback)
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value)
              // 判断x是普通值还是promise对象
              // 如果是普通值,直接调用resolve
              // 如果是promise对象 查看promise对象返回的结果
              // 再根据promise对象返回的结果 决定调用resolve reject
              // resolve(x)
              resolvePromise(parmise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason)
              // 判断x是普通值还是promise对象
              // 如果是普通值,直接调用resolve
              // 如果是promise对象 查看promise对象返回的结果
              // 再根据promise对象返回的结果 决定调用resolve reject
              // resolve(x)
              resolvePromise(parmise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return parmise2
  }
}

function resolvePromise (parmise2, x, resolve, reject) {
  if (parmise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (x instanceof MyPromise) {
    // promise 对象
    x.then(value => resolve(value), reason => reject(reason))
  } else {
    // 普通值
    resolve(x)
  }
}

module.exports = MyPromise