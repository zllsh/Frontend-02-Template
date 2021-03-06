# 课堂笔记

# 1. 浏览器总论 | 浏览器工作原理总论
     
# 2. 状态机 | 有限状态机

# 3. 状态机 | 不使用状态机处理字符串（一）

# 4. 状态机 | 不使用状态机处理字符串（二）

# 5. 状态机 | 不使用状态机处理字符串（三）

# 6. 状态机 | 使用状态机处理字符串（一）

# 7. 状态机 | 使用状态机处理字符串（二）

# 8. HTTP请求 | HTTP的协议解析

ISO-OSI七层网络模型

- 应用
- 表示
- 会话
- 传输
- 网络
- 数据链路
- 物理层

TCP：全双工通道，你可以给我发，我也可以给你发，不存在什么优先关系。
HTTP：必须得先由客户端发起一个request，然后服务端返回一个response，每一个request对应着一个response，任何一个多了都说明这个协议出错。

HTTP在TCP的基础上看似做了更严格梗死的规定， 但是在实践中大家发现这种模式还挺好。所以HTTP变成了当今互联网上最流程的网络协议。

# 9. HTTP请求 | 服务端环境准备

HTTP协议,是一个文本型的协议,文本型协议一般来说是跟我们二进制型的协议是相对的。文本型的协议就意味着说这个协议里面所有的内容都是字符串。每个字节都被理解为字符串的一部分。

- request line
- headers
- body

注意：header中的content-type必须要设置，它决定了body的解析方式

# 10. HTTP请求 | 实现一个HTTP的请求

# 11. HTTP请求 | send函数的编写，了解response格式

### http常见状态码

- 500系列，服务器内部错误
- 404，找不到网页
- 200， 嗨皮
- 301、302、304

# 12. HTTP请求 | 发送请求

# 13. HTTP请求 | response解析

- response必须分段构造，所以要用一个responseParse来“装配”
- responseParse分段处理responseText，用状态机来分析文本的结构

# 14. HTTP请求 | response body的解析

# 15. HTML解析 | HTML parse模块的文件拆分

## 浏览器解析过程
- 1、url通过http拿到html（也就是前面的http请求的部分）
- 2、html通过parser变成dom
- 3、dom经过css computing 变成dom with css（就是带样式的dom）
- 4、dom with css经过layout变成 dom with position（就是带位置的dom）
- 5、dom with position进过render就画出一个Bitmap，我们视觉就可以看到了。

第一步总结：

- perse接收一个html文本，返回一棵dom树。

# 16. HTML解析 | 用FSM实现HTML的分析

解析html这种文本类的操作，一定会用到状态机。

创建状态机前，要了解html语法。

html标准非常贴心，已经把状态机给设计好了。不需要像js那样，先去了解词法。

winter老师课上用的一个html标准网址：html.spec.whatwg.org/multipage

12.2.5 Tokenization 章节， 整个这一章就是html的词法，它整个的描述法师完全就是一台状态机。它是写给浏览器的实现者去看的的。几乎这个标准的描述就是个伪代码，只需要写的时候把伪代码翻译成真实代码就可以了。

第二步总结：

- 我们用FSM来实现HTML的分析
- 在html标准中，已经规定了html的状态
- toy-browser只挑选其中一部分状态，完成一个最简单版本


# 17. HTML解析 | 解析标签

3种标签：
- 开始标签
- 结束标签
- 自封闭标签

解析标签，会用到左尖括号、正斜杠、右尖括号，标签名大小写正则匹配。

第三步总结：

- 3种标签
- 这一步暂时忽略属性

# 18. HTML解析 | 创建元素

第四步总结：

- 在状态机中，除了状态迁移，我们还会要加入业务逻辑
- 我们在标签结束状态提交标签token

还没构建树形结构。

# 19. HTML解析 | 处理属性

演示浏览器原理的话，处理属性这一步也可以忽略。但处理属性这块还是展现了一些状态机的使用和技巧。和html解析的一些特有的部分。

第五步总结：

- 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
- 处理属性的方式跟标签类似
- 属性结束时，我们把属性加到标签Token上

# 20. HTML解析 | 用token构建DOM树

前面几节完成了使用状态机对html进行初步的解析，这种解析在编译原理上面叫做词法分析。

接下来就是html的语法分析。html语法用一个栈就可以完成它的分析。

但是真正的浏览器，光用栈还是不行的。还要加很多特殊的处理。比如你标签没有好好写封闭没有关系，全都给你包容。toy-browser就不用这么包容啦。

用栈构建dom树。

element是对tag的一个抽象，无论是stargTag还是endTag，对应同一个element。

第六步总结：

- 从标签构建dom树的基本技巧是使用栈
- 遇到开始标签时创建元素并入栈，遇到结束标签时出栈。
- 自封闭节点可视为入栈后立刻出栈
- 任何元素的父元素是它出栈前的栈顶。

通过一个数据结构栈，简单的构建了一个dom树。


# 21. HTML解析 | 将文本节点加到DOM树

第七步总结：

- 文本节点与自封闭标签处理类似
- 多个文本节点需要合并

文本节点，它跟自封闭标签的处理比较类似，并不会真的去入栈，但是文本节点跟自封闭标签不同的是因为我们token是一个一个过来的，所以多个文本节点它最终是需要合并的。

