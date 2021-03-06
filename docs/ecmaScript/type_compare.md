---
title: 显式类型转换和隐式类型转换
categories: 前端
date: 2019-07-03 20:59:11
tags: [JavaScript,Web,编程]
---
在学习JavaScript的一些总结和经验，供大家参考和学习，同时也欢迎大家参与讨论。

<!--more-->

> 先放一张图，可以看出来 **弱类型**、**强类型**、**动态类型**、**静态类型**语言的区别。

![弱类型、强类型、动态类型、静态类型语言的区别](https://wexqza.bn.files.1drv.com/y4mQL6AoS1CYeIxtPNpnw3jlEPmy6Ltx1B8A7vhlBOesUSwO3TII0jucrz3a7znlns5xJtcuwBGmv5e-NozKXIbDyg6zTOLfObjIpMoysIg_rH93phsR7H9etobewRb3dP_-Ww_tA2JdFDxTXtqSQsCA-gj0UZJfdbudv39a3MpbkI209i5gO9kxUC8uL0jmUqpruD2Dy2i_IXU3KrcFULiyQ?width=500&height=337&cropmode=none)

![弱类型、强类型、动态类型、静态类型语言的区别](https://weunyg.bn.files.1drv.com/y4mMmdhHEtw-pwVVBpSqH8w2hJ7cEJ1_aQxXCYl4v9PTlmjbOVqoxYXoEBuF1ttyfN7SOVkXiNmQN0xWCpDBfU9ylJJQRiRqPWD-efPir9uTqMu_hjJxE9jMlFwP3XZOcnH-jdWyJq8Dg_zmYTuOZ9kAXXoyTL8AHzHTyTFHWrcxgSucketorLh-xettRxtH7uvkmLdqhVww3Xi3hR93EhlZQ?width=1000&height=810&cropmode=none)





## 强(数据)类型语言

定义：一旦一个变量被指定了某个数据类型，如果不经过强制转换，那么它就永远是这个数据类型了。比如你定义了一个整型变量a，那么我们不能将a当作字符串类型来处理处理。

## 弱(数据)类型语言

> **问题：** 你描述一下为什么javascript是弱类型语言?

#### 弱在哪里？体现在哪？

JavaScript 声明变量的时候并没有预先确定的类型(只是用var声明)，变量的类型就是其值的类型，也就是说变量当前的类型由其值所决定。虽然弱类型的这种**不需要预先确定类型**的特性给我们带来了便利，同时也会给我们带来困扰。为了能充分利用该特性就必须掌握类型转换的原理。

> 例子1：

```javascript
var a = 1 + '2'; // a的值输出的是12，而这种情况在“强类型语言”中会报错的
```
> 例子2：我们var了一个a（它的类型由赋值等号后面的值决定），而在下面还可以对a进行随意修改

```javascript
var a = 0; 
console.log(typeof a);// number
a = true;
console.log(typeof a);// boolean
a = '12';
console.log(typeof a);// string
```

等等等等。。。

# 显式（强）类型转换

## Number()

> 先看一下例子：

```javascript
Number(undefined),		//NaN
Number(null),			//0

Number(true),			//1
Number(false),			//0

Number(''),				//0
Number(' '),			//0

Number('12'),			//12
Number('012'),			//12
Number('0xff90'),		//65424
Number('5e5'),			//500000
Number('k'),			//NaN

Number({}),				//NaN
Number(function(){}),	//NaN
Number([]),				//0
Number(['']),			//0
Number([2]),			//2
Number(['2']),			//2
Number([2,3]),			//NaN
```

从上面的例子我们可以得出**Number**运算符的**转换规则**：

- undefined  转换为  NaN
- null  转换为  0
- true  转换为  1，false  转换为  0
- 字符串
  1. 空格字符串转为0
  2. 非空字符串，并且内容为纯数字（包含进制与科学表示法）转成对应的数字
  3. 其余都是NaN，比如`Number('funcation(){}')或Number('AB')`
- 数字  转换为  数字本身
- 对象（引用类型）
  1. 如果是对象{}、函数，则转换为  NaN

  2. 空数组  转换为  0，数组里**只有一个数据**并且这个**数据能转成数字**，则转成对应的数字，其它都转成NaN 

     

## String()

```javascript
String(null),			//'null'
String(undefined)        // 'undefined'

String(1)                // '1'
String(-1)               // '-1'
String(0)                // '0'
String(-0)               // '0'

String(Infinity)         // 'Infinity'
String(-Infinity)        // '-Infinity'
String(true)             // 'true'
/* 引用类型 */
String([1,[2]]),		// '1,2'
String([1,[2,3]])        // '1,2,3'
String(['koala',1])      // 'koala,1'
String(function(){}),	 // 'function(){}'
String({}),				// '[object Object]'

String(Math.pow(1000,10))// '1e+30'
String(new Date()) // "Thu Jul 04 2019 10:07:58 GMT+0800 (中国标准时间)"
```

从上面的例子我们可以得出**String**运算符的**转换规则**：

- 基本数据类型、null、undefined的结果就是给数据加上引号变成字符串
- 引用数据类型
  1. 如果是数组，结果为把所有**中括号**去掉，外面加个引号

  2. 如果是对象，结果为'[object Object]'（除了日期对象）

  3. 如果是函数，结果为在函数整体外面加个引号 

     

## Boolean()

```javascript
Boolean(undefined) 		// false
Boolean(null) 		    // false
Boolean(0)		        // false
Boolean(NaN) // false
Boolean('') // false

Boolean(' ') // true
Boolean({}) // true
Boolean([]) // true
Boolean(!NaN) // true
Boolean(new Boolean(false)) // true
```

从上面的例子我们可以得出**Boolean**运算符的**转换规则**：

除了下述 6 个值转换结果为 false，其他全部为 true：

1. undefined

2. null

3. -0或0或+0

4. NaN

5. ''（空字符串）

   

> 在这讲一个额外的知识点**Truthy**：

在 [JavaScript](https://developer.mozilla.org/en-US/docs/Glossary/JavaScript) 中，**truthy**（真值）指的是在[布尔值](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)上下文中，转换后的值为真的值。所有值都是真值，除非它们被定义为 [假值](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)（即除 `false`、`0`、`""`、`null`、`undefined` 和 `NaN` 以外皆为真值）。

JavaScript 中的真值示例如下（将被转换为 true，`if` 后的代码段将被执行）：

```javascript
if (true)
if ({})
if ([])
if (42)
if ("foo")
if (new Date())
if (-42)
if (3.14)
if (-3.14)
if (Infinity)
if (-Infinity)
```

> 接下来**重点**来了，那他们三个转换背后的原理是什么？

# 转换背后的原理



> 在JavaScript中每一个对象都有一个valueOf()和toString()方法



### valueOf()  返回该对象对应的原始值

> JavaScript的许多内置对象（Array、Function、String、Boolean、Number）都**重写**了该函数，以实现更适合自身的功能需要。因此，不同类型对象的valueOf()方法的返回值和返回值类型均可能不同。

| **对象** | **返回值**                                               |
| :------: | -------------------------------------------------------- |
|  Array   | 返回数组对象本身。                                       |
| Boolean  | 布尔值。                                                 |
|   Date   | 存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。 |
| Function | 函数本身。                                               |
|  Number  | 数字值。                                                 |
|  Object  | 对象本身。这是默认情况。                                 |
|  String  | 字符串值。                                               |
|          | Math 和 Error 对象没有 valueOf 方法。                    |



### toString  返回对象的字符串的表现形式

> 每个对象都有一个 toString() 方法，当对象被表示为文本值时或者当以期望字符串的方式引用对象时，该方法被自动调用。

这里先记住，valueOf() 和 toString() 在特定的场合下会自行调用。

| **对象** | **返回值**                                                   |
| :------: | :----------------------------------------------------------- |
|  Number  | 数据转成字符串的形式     ，如： '123'                        |
| Boolean  | 数据转成字符串的形式     ，如： 'true'、'false'              |
|  String  | 数据转成字符串的形式     ，如： 'jsldkfjsl'                  |
| Function | 在数据外面加了个引号     ，如： 'function foo(){}'           |
|  Object  | "[object Object]"                                            |
|   Date   | "Thu Jul 04 2019 11:53:31 GMT+0800 (中国标准时间)"   当前时间 |
​                                         

### Number方法背后的原理

> 1. 调用对象的**valueOf**方法。如果返回原始类型的值，再使用**Number**函数，不再进行后续步骤。
> 2. 如果**valueOf**方法返回的**不是**原始值，则调用**toString**方法。
> 3. **toString**方法返回原始类型的值，则对该值使用**Number**函数，不再进行后续步骤。
> 4. 如果**toString**方法后返回的依然**不是**原始值，就报错，抛出`TypeError `异常（一般不会出现）

### String方法背后的原理

> 1. 调用对象的**toString**方法。如果返回原始类型的值，再使用**String**函数，不再进行后续步骤。
> 2. 如果**toString**方法返回的**不是**原始值，则调用**valueOf**方法。
> 3. **valueOf**方法返回原始类型的值，则对该值使用**String**函数，不再进行后续步骤。
> 4. 如果**valueOf**方法后返回的依然**不是**原始值，就报错，抛出`TypeError `异常（一般不会出现）

**注意：**`两者的调用顺序是相反的`



# 隐式类型转换



```javascript
/*
隐式类型转换出现场景
	1、不同类型的数据间运算、比较
	2、对非布尔值类型的数据求布尔值
	3、条件语句的括号里

隐式转数字出现的场景
	1、数学运算符（+ - * / %），但是加号运算里不能出现字符串或对象类型数据
    2、一元+-（正负操作符）后的数据
    3、某些比较运算符
*/
console.log(
    Number({1: 2}),
    [] + {}, 					// '[object, Object]'
    {} + [], 					// '[object, Object]'
    [] + function(){}, 			// "function(){}"
    2 + [2,3], 					// '22,3'
    10 + function(){}, 			// "10function(){}"
    null + undefined, 			// NaN
    [] - 5, 					// -5
    '6' * [], 					// 0
    null % true, 				// 0 % 1 === 0
    true / [7], 				// 1 / 7 === 0.14285714285714285
    'a'-'b'						//NaN-NaN=NaN
    'A' - 'A' + 2, 				// NaN
    1+undefined,		//NaN
    1+null,				//1
    3+'6',				//'36'
    2+[],				//'2'
    2+{a:12},			//'2[object Object]'
    3+{},				//'3[object Object]'
    {}+3				//'[object Object]3'
);
// 逗号运算符 输出括号最后一个
console.log(1,2,3);		//1 2 3
console.log((1,2,3));	//3


```

### ==   两边发生的隐式转换

```javascript
/* 
	为什么'12' == 12?我们知道等于true，但是其中的原理是什么?
	1、当==号两边都是原始数据类型的时候，两边都会隐式转换为数字Number(mix)
*/
console.log(
    '12' == 12,
    0 == '',
    1 == true,
    2 == false,
    'true' == true,
    ' ' == false,
    !!NaN == false
);

console.log(
    undefined == 0,
    undefined == '',
    undefined == false,
    undefined == undefined, // true
    null == 0,
    null == '',
    null == false,
    null == undefined // true
)
/* 
	2、如果==两边有一边出现对象，
 */
console.log(
    [1] == 1,
    [] == 0,
    [1] == true,
    [1, 'a', 3] == '1,a,3',
    [] == undefined,
    {a: 1} == 1,
    [null] == null
)
```

### 逗号运算符

```javascript
console.log((1,2,3)); // 3


// 题目：
var a = 10, b = 20;
function fn(){
    return a++, b++, 10;
}
console.log(a, b, fn());
var c = fn();
console.log(a, b, c);
// 解释：
```



> **引用：**
>
> - [经常被面试官考的JavaScript数据类型知识你真的懂吗？](https://mp.weixin.qq.com/s/_THIZY4KTa1IlVb4k9qbJg )
> - [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf )
