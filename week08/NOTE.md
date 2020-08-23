# 第8周 | 重学HTML、浏览器API - 课堂笔记


# 1. 重学HTML | HTML的定义：XML与SGML

# 2. 重学HTML | HTML标签语义

# 3. 重学HTML | HTML语法

# 4. 浏览器API | DOM API

浏览器API分了很多种类, DOM API 是其中很重要的一个种类。
重要到什么程度呢，很多人会有一个误解，所有的浏览器API都叫DOM API。
当然了，从重要性来讲，确实有百分之七八十的API都是DOM API。

还有一个容易混淆的词是BOM，浏览器对象模型。
BOM听起来是一个包含DOM的一个词，其实不是，BOM只是一个很小的一组API，它最早也是一个浏览器私有的名称。
并没有特别好的名字来指代所有的浏览器API，这里我们就是browser API。浏览器编程的所有接口。

DOM API分为4各部分：
- 1、已废。traversal系列的API，可以访问DOM树的所有的节点的一个自动的迭代工具。用了比不用还麻烦。
- 2、节点类API。我们目前比较常用的。
- 3、事件API。js和html的交互。
- 4、Range API。非常强大，但是理解起来非常费劲，用起来也非常麻烦。比起节点类的API，它能够更精确的操纵DOM树，往往性能也是更好的，但是应用性很差，只有少数专业人士，比如喜欢做HTML编辑器的一些专家，会用到这部分。

备注：
- Node： 节点
- Element： 元素

所有DOM树上能挂着的东西，都是统一继承自一个叫做Node的类。所以Node是所有这些节点的基类。
挂在DOM树上一定叫Node，但是不一定是Element。
Node和Element也容易被混淆，确实这个Node里面，百分之八九十的节点都是Element。

- Node
    - Element：元素型节点，跟标签相对应。
        - HTMLElement
        - SVGElement
    - Document：文档根节点。
    - characterData字符数据
        - Text：文本节点
        - Comment：注释
        - processingInstruction：处理信息
    - DocumentFragment：文档片段（没法挂到DOM树上，但也是继承了Node节点，也可以执行挂到DOM树上的操作）
    - DocumentType：文档类型

## Node API

### 导航类操作

分为节点Node的导航和元素Element的导航。

- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- prevousSibling

有时候我们写HTML为了一些格式，会用Tab，换行之类的，所有如果HTML不压缩的的，会产生一些空白的文本节点，这时候用Node导航就比如用nextSibling，prevousSibling，多半找到的都是空白节点。所以也就有了Element的导航，只找元素。

- parentElement
- children
- firstElementChild
- lastElementChild
- nextElementSibling
- previousElmentSibling

两者这里边是有一个重复的API，parentNode和parentElement是百分之百没有任何可能性不相等的。但是从API设计的美感的角度，还是都有。

### 修改操作

- appendChild
- insertBefore
- removeChild（移除的操作必须在它的parent上进行，没有办法直接把一个元素自身remove）
- replaceChild（按最小化设计原则，这也是个多余的api）

疑问：有insertBefore怎么就没有insertAfter？
解答：最小化设计原则。insertAfter是可以用insertBefore和appendChild两个去实现出来的。insertBefore和appendChild就足够我们把节点插到任何位置。

很多API是历史上的财富，也有很多是包袱。

### 高级操作

- compareDocumentPosition：是一个用于比较两个节点中关系的函数。
- contains：检查一个节点是否包含另一个节点的函数。
- isEqualNode：检查两个节点是否完全相同。
- isSameNode：检查两个节点是否是同一个节点，实际上在JavaScript中可以用“===”。（这个API存在的意义可能是出于多语言考虑）
- cloneNode：复制一个节点，如果传入参数true，则会连同子元素做深拷贝。


# 5. 浏览器API | 事件API

## Event：冒泡和捕获

跟监听是没有关系的。

它在任何一次事件触发的过程中，两个过程都会发生。不管你是否监听这个事件。
所以可能会有一个误解，不加addEventListener()，两个过程就没有了？不是的。

冒泡和捕获的过程就是浏览器自己去处理事件的这样的一套机制。

任何一个事件都有一个先捕获再冒泡的过程。

疑问：为什么是先捕获？
解答：如果我们鼠标在网页点击，它并不能够提供我们到底点在哪个元素上这样的信息，真正点在哪个元素上，是要通过浏览器计算出来的，所以一定有一个过程就是捕获。从外到内一层一层的计算到底这个事件是发生在哪个元素上的。

而冒泡，则是已经算出来到点了哪个元素，层层的向外触发，让后让这个元素去响应这个事件的过程。冒泡的过程更符合人类的直觉。

# 6. 浏览器API | Range API

前面的Node API 其实已经可以对节点进行各种操作了。但是有局限。

操作半个节点或是批量节点，这时候就需要Range API。

Range API 比 Node API 更强大更细致当然也更难用难理解。可以说是对DOM树的操作的一个万能API。对DOM树精确的处理，要靠Range API。

winter老师的一个用了两年的面试题：

- 把一个元素的所有子元素逆序。顺序为1、2、3、4、5的逆序为5、4、3、2、1

如果用node api 操作，要进行4次插入操作。使用Range api就可以进行高效的操作。

如果对DOM树有高性能操作的要求，比如写框架，里边会用到fragment和range这对好基友，range负责在DOM树上选中并且把它摘下来，fragment可以批量的把它append上去。这两个具有非常强大的DOM树操作能力。

到此为止DOM API结束。

# 7. 浏览器API | CSSOM

浏览器API不等于DOM API。

DOM API约等于HTML 语言的一个对象化。DOM API的能力和HTML 能力基本是对等的。DOM 是对 HTML 所描述的文档的一个抽象。

对CSS文档的一个抽象就是CSSOM。

## document.styleSheets

CSSOM 严格来说他也是需要从DOM API去进行访问的，因为css代码就是嵌在HTML的代码里面的。所以css的一起API,都需要通过document.styleSheets这个属性去访问。

创建使用css有两种用法：
- 使用style标签
- 使用link标签

## Rules
- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule("p {color:pink;}", 0)
- document.styleSheets[0].removeRule(0)

## getComputedStyle

- window.getComputedStyle(elt, pseudoElt)
    - elt 想要获取的元素
    - pseudoElt 可选，伪元素

# 8. 浏览器API | CSSOM View

跟浏览器最后画上去的视图非常的相关。

## window

- window.innerHeight, window.innerWidth
- window.outerWidth, window.outerHeight（浏览器窗口包含哪些标签栏啥的，没多大作用，只是API完备性有这个）
- window.devicePixelRatio（屏幕上的物理像素，跟我们代码里面的逻辑像素px它俩之间的一个比值，正常的设备都是1:1，retina屏上是1:2，有些安卓机上是1:3，DPR跟我去实现代码时候的布局是非常相关的）
- window.screen
    - window.screen.width
    - window.screen.height
    - window.screen.availWidth
    - window.screen.availHeight

screen的 width和height 代表是我们实际上的屏幕的宽和高
screen的 availWidth 和 availHeight 代表的是可以使用的宽和高，这里的使用不是指浏览器可以使用，有些安卓机会把屏幕上的一部分做成物理上的按钮，这种情况下两种尺寸就会不一样，都是跟设备硬件信息相关的一些信息。

我们平时实际使用的时候不关注屏幕的信息，有些浏览器对这些屏幕的信息实现的也不一定准确。所以实际我们常用的就这三个，其他了解即可。

- window.innerHeight 
- window.innerWidth
- window.devicePixelRatio

## Window API

- window.open()
- moveTo(x, y)
- moveBy(x, y)
- resizeTo(x, y)
- resizeBy(x, y)

## scroll

- 元素的 scroll
    - scrollTop
    - scrollLeft
    - scrollWidth
    - scrollHeight
    - scroll(x, y)  （别名scrollTo，滚动到特定位置）
    - scrollBy(x, y)  （在原来的基础上滚动一个差值）
    - scrollIntoView(x, y)  （强制滚动到屏幕的可见区域）
- window scroll
    - scrollX
    - scrollY
    - scroll(x, y)
    - scrollBy(x, y)

在有滚动条的情况下这些API才会生效。

## layout

- getClientRects() （在每个元素上可以调用这个来获取它所生成的所有的盒，所有的元素都会生成盒，有些元素会生成多个盒，所以这个API后面有个s）
- getBoundingClientRect()  （相比getClientRects，它一定只能取到一个盒）

虽然只有2个，但非常好用，实现一些拖拽效果啥的可能会用到。


# 9. 浏览器API | 其它API

## API来源主要来自4个标准化组织。

- khronos
    - WebGL
- ECMA
    - ECMAScript
- WHATWG
    - HTML
- W3C
    - webaudio
    - CG/WG

khronos 主要在计算机图形和视频非常有权威性，加入的成员跟W3C高度重合，最著名的作品是OpenGL标准。

WHATWG 算是W3C分裂出去的一个子组织，所以它的标准和W3C会有一些重合，两边现在也是高度协作。

## 全部API的分类

- Object.getOwnPropertyNames(window)  获取window上所有的属性名





