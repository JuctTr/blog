import{_ as e,c as a,o as s,a as n}from"./app.077a1882.js";const y=JSON.parse('{"title":"Vue 和 React 的对比","description":"","frontmatter":{},"headers":[{"level":2,"title":"","slug":"","link":"#","children":[]},{"level":2,"title":"Vue Template 和 JSX","slug":"vue-template-和-jsx","link":"#vue-template-和-jsx","children":[{"level":3,"title":"Vue Template","slug":"vue-template","link":"#vue-template","children":[]},{"level":3,"title":"JSX","slug":"jsx","link":"#jsx","children":[]}]},{"level":2,"title":"Vue 和 React 的逻辑复用","slug":"vue-和-react-的逻辑复用","link":"#vue-和-react-的逻辑复用","children":[{"level":3,"title":"React","slug":"react","link":"#react","children":[]},{"level":3,"title":"Vue","slug":"vue","link":"#vue","children":[]}]},{"level":2,"title":"数据监测","slug":"数据监测","link":"#数据监测","children":[{"level":3,"title":"React","slug":"react-1","link":"#react-1","children":[]},{"level":3,"title":"Vue","slug":"vue-1","link":"#vue-1","children":[]}]},{"level":2,"title":"事件函数中的 this 指向","slug":"事件函数中的-this-指向","link":"#事件函数中的-this-指向","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"relativePath":"react/Vue和React的区别.md"}'),l={name:"react/Vue和React的区别.md"},t=n(`<h1 id="vue-和-react-的对比" tabindex="-1">Vue 和 React 的对比 <a class="header-anchor" href="#vue-和-react-的对比" aria-hidden="true">#</a></h1><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h2><h2 id="vue-template-和-jsx" tabindex="-1">Vue Template 和 JSX <a class="header-anchor" href="#vue-template-和-jsx" aria-hidden="true">#</a></h2><p>这两者应该只是实现思路上的不同，但是都逃离不了模板编译这一阶段</p><h3 id="vue-template" tabindex="-1">Vue Template <a class="header-anchor" href="#vue-template" aria-hidden="true">#</a></h3><p>Vue 中的<code>&lt;template&gt;&lt;/template&gt;</code>标签中，存在一些<code>Vue</code>指令，如<code>v-on</code>、<code>v-if</code>等，而原生<code>HTML</code>语法中不存在这些，所以会经过 Vue 中模板编译阶段（功能类似 Babel 编译）编译、处理，最终生成<code>render</code>函数，</p><h3 id="jsx" tabindex="-1"><a href="https://zh-hans.reactjs.org/docs/jsx-in-depth.html#gatsby-focus-wrapper" target="_blank" rel="noreferrer">JSX</a> <a class="header-anchor" href="#jsx" aria-hidden="true">#</a></h3><p>JSX 仅仅只是 <code>React.createElement(component, props, ...children)</code> 函数的语法糖</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> element </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Hello, world!</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> container </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">root</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">ReactDOM</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">render</span><span style="color:#A6ACCD;">(element</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> container)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>经过 Babel 编译成</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> element </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*#__PURE__*/</span><span style="color:#A6ACCD;"> React</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createElement</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">h1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello, world!</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> container </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">root</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">ReactDOM</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">render</span><span style="color:#A6ACCD;">(element</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> container)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="vue-和-react-的逻辑复用" tabindex="-1">Vue 和 React 的逻辑复用 <a class="header-anchor" href="#vue-和-react-的逻辑复用" aria-hidden="true">#</a></h2><h3 id="react" tabindex="-1">React <a class="header-anchor" href="#react" aria-hidden="true">#</a></h3><p>Minix</p><p>高阶组件</p><p>Render Props</p><h3 id="vue" tabindex="-1">Vue <a class="header-anchor" href="#vue" aria-hidden="true">#</a></h3><p>Minix</p><p>高阶组件示例：<a href="https://codesandbox.io/s/5xp39rx4kn" target="_blank" rel="noreferrer">https://codesandbox.io/s/5xp39rx4kn</a></p><p>模板复用（UI 层）</p><p>slot</p><p>Vuex</p><p>Composition API</p><h2 id="数据监测" tabindex="-1">数据监测 <a class="header-anchor" href="#数据监测" aria-hidden="true">#</a></h2><p>相比之下，Vue 由于采用依赖追踪，默认就是优化状态：你动了多少数据，就触发多少更新，不多也不少，而 React 对数据变化毫无感知，它就提供 React.createElement 调用已生成 virtual dom</p><h3 id="react-1" tabindex="-1">React <a class="header-anchor" href="#react-1" aria-hidden="true">#</a></h3><p>函数式、链表</p><h3 id="vue-1" tabindex="-1">Vue <a class="header-anchor" href="#vue-1" aria-hidden="true">#</a></h3><p>数据拦截/代理</p><h2 id="事件函数中的-this-指向" tabindex="-1">事件函数中的 this 指向 <a class="header-anchor" href="#事件函数中的-this-指向" aria-hidden="true">#</a></h2><p>Vue 是指向组件实例</p><p>React 指向调用它的</p><p><strong>从事件 API</strong> <strong>上我们就能看出前端框架在设计的一个不同思路： React 设计是改变开发者，提供强大而复杂的机制，开发者按照我的来；Vue 是适应开发者，让开发者怎么爽怎么来。</strong></p><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-hidden="true">#</a></h2><p><a href="https://www.zhihu.com/question/301860721/answer/724759264" target="_blank" rel="noreferrer">Vue 和 React 的优点分别是什么？</a></p>`,35),o=[t];function p(r,c,i,d,h,u){return s(),a("div",null,o)}const F=e(l,[["render",p]]);export{y as __pageData,F as default};
