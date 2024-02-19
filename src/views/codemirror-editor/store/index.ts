import { ref } from 'vue'

const code = ref('')

const codes = {
  1: `
  let obj = {}
  
  Object.defineProperty(obj, 'key', {
    value: 1,
    writable: true, // 是否可以赋值
    enumerable: true, // 是否可以循环
    configurable: true // 是否可以删除
  })
  
  let obj1 = {}
  
  let value = 'wuxian'
  
  // 当读取属性时，会执行get方法。当修改属性时，会执行set方法。
  Object.defineProperty(obj1, 'key', {
    get: function () {
      console.log('执行了获取操作')
      return value
    },
    set: function (newValue) {
      console.log('执行了设置操作')
      observer(obj)
      value = newValue
    }
  })
  `,

  2: `
  let obj = {
    name: 'wuxian',
    friend: {
      name: 'Alxian',
      arr: [1, 2, 3]
    }
  }

  // 封装监听数据变化的函数
  function defineProperty(obj, key, val) {
    observer(val)
    Object.defineProperty(obj, key, {
      get() {
        return val
      },
      set(newValue) {
        if(newValue === val) return
        observer(newValue)
        val = newValue
      }
    })
  }

  function observer(obj) {
    if (obj && typeof obj !== 'object' || obj === null) return

    for(const key in obj) {
      defineProperty(obj, key, obj[key])
    }
  }

  observer(obj)

  obj.name = 'Alxian'

  // 在defineProperty方法没调用observer方法时不会触发Set方法
  obj.friend.name = 'Wuxian'

  obj.name = {
    sname: 'Alxian'
  }

  obj.name.sname = 'Wuxian'

  obj.arr.push[4] // 监听不到

  // 重写了数组的方法 'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'
  `,

  3: `
  let obj = {
    name: 'wuxian',
    friend: {
      name: 'Alxian',
      arr: [1, 2, 3]
    }
  }

  const arrayMethods = Array.prototype
  // 先克隆一份Array原型
  const arrayProto = Object.create(arrayMethods)
  const methodsToPatch = ['push', 'pop','shift', 'unshift','splice','sort','reverse']
  methodsToPatch.forEach(method => {
    arrayProto[method] = function () {
      // 执行原始操作
      arrayMethods[method].apply(this, arguments)
      console.log('监听赋值成功', method)
    }
  });

  function defineProperty(obj, key, val) {
    observer(val)
    Object.defineProperty(obj, key, {
      get() {
        return val
      },
      set(newValue) {
        if (newValue === val) return
        observer(newValue)
        val = newValue
      }
    }) 
  }

  function observer(obj) {
    if (obj && typeof obj!== 'object' || obj === null) return

    if (Array.isArray(obj)) {
      // 如果是数组，重写原型
      obj.__proto__ = arrayProto
      // 传入的数据可能是多维度的，也需要执行响应式
      for (let i = 0; i < obj.length; i++) {
        observer(obj[i])
      }
    } else {
      for (const key in obj) {
        // 给对象中的每一个方法都设置响应式
        defineProperty(obj, key, obj[key])
      }
    }
  }

  observer(obj)

  obj.arr.push(4)
  `,

  4: `
  let arr = [1, 2, 3]

  let proxy = new Proxy(arr, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver)
    }
  })

  arr.push(4)
  `
}

code.value = codes[1]

const stepActive = ref(1)

const stepChange = (val: number) => {
  stepActive.value = val
  code.value = codes[val]
}

export const useCodemirrorEditorStore = () => {
  return {
    code,
    stepActive,
    stepChange
  }
}
