---
theme: orange
highlight: gruvbox-dark
---
# 深入探讨：React Hooks是如何工作的？
> 作者注：这篇文章仅仅只是对于上下文（context）的一个讨论，此外，本文也没有提及React调度程序或state实际上是如何存储在React中的。


`Hooks`是封装用户界面中有状态行为和副作用的一种更简单的方法。它们最初是在React中引入的，后来被Vue、Svelte等其他框架广泛采用，甚至被用于通用的函数式JS。然而，要明白它们的功能设计，需要你对JavaScript中的闭包有一个很好的理解。

在这篇文章，我们通过构建一个`React Hooks` 小例子来引入闭包。我们有两个目的 - 演示闭包的有效使用，以及展示如何用仅仅29行具有可读行的JavaScript代码来构建一个`Hooks`例子。最后，我们可以了解到自定义hooks是如何自然产生的。

> ⚠️注意：你不需要为了理解`Hooks`，而刻意去做这些工作。如果你完成这个练习，它可能会对你理解JavaScript基础有所帮助。别担心，没那么难！

## 什么是闭包？
使用`Hooks`最大的卖点之一就是可以完全避免class和高阶组件带来的复杂性。然而，对于使用`Hooks`，有一些开发者认为我们可能把一个问题变成了另外的一个问题。现在我们不需要担心（this）绑定上下文，而是担心闭包带来的问题。正如Mark Dalgleish令人难忘的总结：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79e298f7ac9843c3aded9f9d9d3fe646~tplv-k3u1fbpfcp-watermark.image?)

闭包是JavaScript中的一个基本概念。尽管如此，它们还是会让很多人，尤其是新开发人员感到困惑。Kyle Simpson的[《You Don 't Know JS》](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md)对闭包的定义是这样的。

*闭包是指函数能够记住并访问其词法作用域，即使该函数在其词法作用域之外执行。*

它们显然与词法作用域的概念密切相关，MDN将其定义为“当函数嵌套时，解析器如何解析变量名”。想要更好地说明这一点，让我们看一个实际的例子:

```js
// Example 0
function useState(initialValue) {
  var _val = initialValue // _val 是useState创建的一个局部变量
  function state() {
    // state 是一个内部函数，一个闭包
    return _val // state() 使用由父函数声明的 _val
  }
  function setState(newVal) {
    // same
    _val = newVal // 对_val赋值，不返回
  }
  return [state, setState] // 返回函数供外部使用
}
var [foo, setFoo] = useState(0) // 使用数组解构
console.log(foo()) // logs 0 - 我们给的默认值initialValue
setFoo(1) // 在useState的作用域内给_val赋值
console.log(foo()) // logs 1 - 新的 initialValue, 尽管调用完全相同
```
以上，我们创建一个最初（原始）的`React useState hook`例子。在我们的函数中，有两个内部函数，`state`和`setState`。state返回一个上方定义的局部变量_val，`setState`将局部变量设置为传入的参数（即`newVal`）。
这里state的实现是一个getter函数，当然这不是理想状态下的，我们稍后会修正它。重要的是，我们能够通过foo和setFoo去访问和操作内部的变量_val。它们保留对useState函数作用域的访问，这个引用就称为闭包。在React和其他框架的上下文中，这看起来就像是状态，而这正是它的本质。

如果你想深入了解闭包，我建议你阅读[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)、[YDKJS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md)和[DailyJS](https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8)，但是如果你理解了上面的代码例子，你就有了所需的一切。

## 在函数组件中使用
让我们在一个看起来很熟悉的setting中应用我们新创建的useState例子。我们将制作一个计数器组件！

```js
// Example 1
function Counter() {
  const [count, setCount] = useState(0) // 和上面例子一样的useState
  return {
    click: () => setCount(count() + 1),
    render: () => console.log('render:', { count: count() })
  }
}
const C = Counter()
C.render() // render: { count: 0 }
C.click()
C.render() // render: { count: 1 }
```
这里，我们选择了console.log来打印（输出）state（状态），而不是呈现给DOM。我们还为Counter暴露了一个编程API，这样我们就可以在脚本中运行它，而不是附加一个事件处理程序。通过这种设计，我们能够模拟组件的渲染和对用户操作的反应。

虽然以上这些，是可行的（可以正常工作），但是调用一个getter来访问state并不是真正的`React.useState`hook的API（意思就是这种方式不是React.useState这个API真正的设计），让我们来修正它。

## 失效的闭包
如果我们想要写出（匹配）真正的React API，我们的state必须是一个变量而不是一个函数。如果我们只是返回_val而不是将其封装在函数里面，就会出现一个bug：

```js
// Example 0, revisited - this is BUGGY!
function useState(initialValue) {
  var _val = initialValue
  // 没有 state() 函数
  function setState(newVal) {
    _val = newVal
  }
  return [_val, setState] // 直接返回_val
}
var [foo, setFoo] = useState(0)
console.log(foo) // logs 0 无需函数调用
setFoo(1) // 在useState的作用域内给_val赋值
console.log(foo) // logs 0 - oops!!
```
这是stale Closure 问题的一种形式。当我们从useState的输出中解构foo时，它会在第一次调用useState时引用_val...并且之后再也不会改变！这显然不是我们想要的；我们通常需要我们的组件状态来反映当前的状态，而这里仅仅只是一个变量而不是一个函数调用，这两个目标似乎截然相反的。

## 模块中的闭包
我们可以通过将我们的闭包移动到另一个闭包来解决useState的难题！*(Yo dawg i heard you like closures...)*

```js
// Example 2
const MyReact = (function() {
  let _val // hold our state in module scope
  return {
    render(Component) {
      const Comp = Component()
      Comp.render()
      return Comp
    },
    useState(initialValue) {
      _val = _val || initialValue // assign anew every run
      function setState(newVal) {
        _val = newVal
      }
      return [_val, setState]
    }
  }
})()
```
这里我们选择使用Module模式来写我们的微型React例子。像React一样，它会跟踪组件的状态（在我们的例子中，它只跟踪一个足迹，状态在_val中）。这种设计允许MyReact“渲染”你的函数组件，这允许它在每次使用正确的闭包时为内部的_val赋值：

```js
// Example 2 continued
function Counter() {
  const [count, setCount] = MyReact.useState(0)
  return {
    click: () => setCount(count + 1),
    render: () => console.log('render:', { count })
  }
}
let App
App = MyReact.render(Counter) // render: { count: 0 }
App.click()
App = MyReact.render(Counter) // render: { count: 1 }
```
现在看起来更像React with Hooks!
你可以[阅读更多关于YDKJS中的Module模式和闭包的信息](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md)。

## 复制useEffect
到目前为止，我们已经介绍完useState，它是第一个最基础的React Hook.下一个最重要的hook是useEffect。与setState不同，useEffect是异步执行的，这意味着有更多的机会遇到闭包问题。

我们可以扩展我们在上方已经建立的React小模型，包括以下内容：

```js
// Example 3
const MyReact = (function() {
  let _val, _deps // 在作用域内记录（保持）state和依赖项之间的关系
  return {
    render(Component) {
      const Comp = Component()
      Comp.render()
      return Comp
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray
      const hasChangedDeps = _deps ? !depArray.every((el, i) => el === _deps[i]) : true
      if (hasNoDeps || hasChangedDeps) {
        callback()
        _deps = depArray
      }
    },
    useState(initialValue) {
      _val = _val || initialValue
      function setState(newVal) {
        _val = newVal
      }
      return [_val, setState]
    }
  }
})()

// usage
function Counter() {
  const [count, setCount] = MyReact.useState(0)
  MyReact.useEffect(() => {
    console.log('effect', count)
  }, [count])
  return {
    click: () => setCount(count + 1),
    noop: () => setCount(count),
    render: () => console.log('render', { count })
  }
}
let App
App = MyReact.render(Counter)
// effect 0
// render {count: 0}
App.click()
App = MyReact.render(Counter)
// effect 1
// render {count: 1}
App.noop()
App = MyReact.render(Counter)
// // no effect run
// render {count: 1}
App.click()
App = MyReact.render(Counter)
// effect 2
// render {count: 2}
```

为了跟踪依赖项(因为当依赖项改变时useEffect会重新运行)，我们引入了另一个变量来跟踪_deps。

## 不是魔法（黑盒），只是数组
我们现在有一个很好的具备useState和useEffect功能的克隆（拷贝）例子，但是它们都是糟糕的单例实现（每一个都只能够存在一个，否则就会发生bugs）。要做任何有意思的事（使得最终的stale closure 示例成为可能），我们需要将它们泛化来获得任意数量的状态和效果（we need to generalize them to take arbitrary numbers of state and effects.）。幸运的是，正如Rudi Yardley所写的那样，React Hooks 不是魔法，仅仅只是数组。我们有一个 hooks 数组。我们将利用这个机会去将所有（状态）_val和deps放到hooks数组中，因为它们不会出现重复的情况：

```js
// Example 4
const MyReact = (function() {
  let hooks = [],
    currentHook = 0 // array of hooks, and an iterator!
  return {
    render(Component) {
      const Comp = Component() // run effects
      Comp.render()
      currentHook = 0 // reset for next render
      return Comp
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray
      const deps = hooks[currentHook] // type: array | undefined
      const hasChangedDeps = deps ? !depArray.every((el, i) => el === deps[i]) : true
      if (hasNoDeps || hasChangedDeps) {
        callback()
        hooks[currentHook] = depArray
      }
      currentHook++ // done with this hook
    },
    useState(initialValue) {
      hooks[currentHook] = hooks[currentHook] || initialValue // type: any
      const setStateHookIndex = currentHook // for setState's closure!
      const setState = newState => (hooks[setStateHookIndex] = newState)
      return [hooks[currentHook++], setState]
    }
  }
})()
```
请注意我们在这里使用的setStateHookIndex，它似乎没有做任何事情，但用于防止setState在currentHook变量上关闭（but is used to prevent setState from closing over the currentHook variable!）!如果你把它拿出来，setState再次停止工作，因为关闭的currentHook过时了。(试一试!)

> 这里应该是说防止执行setState时，currentHook已经不是原来的currentHook了，所以新增setStateHookIndex来存储初始化时的currentHook.

```js
// Example 4 continued - in usage
function Counter() {
  const [count, setCount] = MyReact.useState(0)
  const [text, setText] = MyReact.useState('foo') // 2nd state hook!
  MyReact.useEffect(() => {
    console.log('effect', count, text)
  }, [count, text])
  return {
    click: () => setCount(count + 1),
    type: txt => setText(txt),
    noop: () => setCount(count),
    render: () => console.log('render', { count, text })
  }
}
let App
App = MyReact.render(Counter)
// effect 0 foo
// render {count: 0, text: 'foo'}
App.click()
App = MyReact.render(Counter)
// effect 1 foo
// render {count: 1, text: 'foo'}
App.type('bar')
App = MyReact.render(Counter)
// effect 1 bar
// render {count: 1, text: 'bar'}
App.noop()
App = MyReact.render(Counter)
// // no effect run
// render {count: 1, text: 'bar'}
App.click()
App = MyReact.render(Counter)
// effect 2 bar
// render {count: 2, text: 'bar'}
```

所以基本的原理（intuition）是有一个Hooks数组和一个索引，在每一个hook（如useState、useEffect）被调用而增加，并在函数组件被重新渲染时重置。

你也可以轻松地获得自定义hooks：

```js
// Example 4, revisited
function Component() {
  const [text, setText] = useSplitURL('www.netlify.com')
  return {
    type: txt => setText(txt),
    render: () => console.log({ text })
  }
}
function useSplitURL(str) {
  const [text, setText] = MyReact.useState(str)
  const masked = text.split('.')
  return [masked, setText]
}
let App
App = MyReact.render(Component)
// { text: [ 'www', 'netlify', 'com' ] }
App.type('www.reactjs.org')
App = MyReact.render(Component)
// { text: [ 'www', 'reactjs', 'org' ] }}
```

This truly underlies how “not magic” hooks are – Custom Hooks simply fall out of the primitives provided by the framework – whether it is React, or the tiny clone we’ve been building.
（这真正地揭秘了hooks不是魔法（黑盒）--自定义hooks只是从框架提供的原语（基本体）中脱离出来——无论是React，还是我们正在构建的小克隆（例子）。）

> 不知道这一句怎么翻译才好，水平有限，大概的意思应该就是 hooks并没那么神奇，我们可以通过以上的例子和想法，去构造自己的hooks。

## 推导Hooks规则

注意，从这里你可以轻松地理解hook的第一个规则：[只在最顶层使用hook](https://zh-hans.reactjs.org/docs/hooks-rules.html)。我们已经用currentHook变量显式地模拟了React对调用顺序的依赖。您可以带着我们的实现阅读整个规则的解释，并完全理解正在发生的一切。

还要注意第二条规则，“[只从React函数中调用Hooks](https://zh-hans.reactjs.org/docs/hooks-rules.html#only-call-hooks-from-react-functions)”，也不是我们实现的必要结果，但明确划分代码的哪些部分依赖于有状态逻辑肯定是一个很好的实践。(作为一个很好的副作用，它还使编写工具（自定义hooks）更容易，以确保您遵循第一条规则。在循环和条件中封装有状态的函数(如常规JavaScript函数)，不会意外地伤了自己的脚。遵循规则2可以帮助你遵循规则1。)

> 这里也不知道怎么翻译好，大概意思就是，只能在React函数中调用hooks，有利于我们明确划分代码的哪些依赖，哪些具有副作用，这是一个比较好的代码实践。


## 结论
在这一点上，我们可能已经尽可能地扩展了这个练习。你可以尝试用一行代码实现useRef（夸张手法？），或者让渲染函数实际获取JSX并挂载到DOM中，或者我们在这个28行React Hooks克隆（例子）中忽略了其他上百万个重要细节。但希望您已经获得了一些在上下文中使用闭包的经验，并获得了一个有用的心智模型，揭开了React Hooks是如何工作的神秘面纱。

我要感谢Dan Abramov和Divya Sasidharan审阅了这篇文章的早期草稿，并通过他们有价值的反馈来改进（修正）它。所有剩余的错误都是我的...

> 翻译自原文：https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/
