# Vue 和 React 的对比

##

## Vue Template 和 JSX

这两者应该只是实现思路上的不同，但是都逃离不了模板编译这一阶段

### Vue Template

Vue 中的`<template></template>`标签中，存在一些`Vue`指令，如`v-on`、`v-if`等，而原生`HTML`语法中不存在这些，所以会经过 Vue 中模板编译阶段（功能类似 Babel 编译）编译、处理，最终生成`render`函数，

### [JSX](https://zh-hans.reactjs.org/docs/jsx-in-depth.html#gatsby-focus-wrapper)

JSX 仅仅只是 `React.createElement(component, props, ...children)` 函数的语法糖

```javascript
const element = <h1>Hello, world!</h1>;
const container = document.getElementById("root");
ReactDOM.render(element, container);
```

经过 Babel 编译成

```javascript
const element = /*#__PURE__*/ React.createElement("h1", null, "Hello, world!");
const container = document.getElementById("root");
ReactDOM.render(element, container);
```

## Vue 和 React 的逻辑复用

### React

Minix

高阶组件

Render Props

### Vue

Minix

高阶组件示例：https://codesandbox.io/s/5xp39rx4kn

模板复用（UI 层）

slot

Vuex

Composition API

## 数据监测

相比之下，Vue 由于采用依赖追踪，默认就是优化状态：你动了多少数据，就触发多少更新，不多也不少，而 React 对数据变化毫无感知，它就提供 React.createElement 调用已生成 virtual dom

### React

函数式、链表

### Vue

数据拦截/代理

## 事件函数中的 this 指向

Vue 是指向组件实例

React 指向调用它的

**从事件 API** **上我们就能看出前端框架在设计的一个不同思路： React 设计是改变开发者，提供强大而复杂的机制，开发者按照我的来；Vue 是适应开发者，让开发者怎么爽怎么来。**

## 参考

[Vue 和 React 的优点分别是什么？](https://www.zhihu.com/question/301860721/answer/724759264)
