# 随堂记

# 1. CSS总论 | CSS语法的研究

css 标准不像js，比较分散

### CSS总体结构（CSS 2.1）
- @charset
- @import
- rules
    - @media
    - @page
    - rule（我们平时写的比较多）

新版本的css，rule会有变化，其他结构基本不会有太大变化。

# 2. CSS总论 | CSS @规则的研究

### At-rules：

链接可以看《重学前端》课程里边的链接，或附件ppt

- @chartset
- @import
- @media
- @page
- @counter-style
- @keyframes
- @fontface
- @supports
- @namespace

当前css比较重要的：@media、@keyframes、@fontface。一定要掌握的。

其他的要么不常用，要么不推荐。

# 3. CSS总论 | CSS规则的结构

### CSS规则

- 选择器
- 声明
    - key
    - value

#### Selector
 - selectors-3
 - selectors-4
现在实现的状态比较好的是selector的level3，level4现在还在标准制定途中，目测会有不少阻力

#### Key
- properties（属性）
- variables（变量，双减号开头）
#### Value


# 4. CSS总论 | 收集标准

实验：爬虫 w3网站

# 5. CSS总论 | CSS总论总结

# 6. CSS选择器 | 选择器语法

## 简单选择器（css2，css3）

- \*
- div svg|a（html是有命名空间的）
- .cls
- #id
- [attr=value]
- :hover（伪类）
- ::before（伪元素选择器）

## 复合选择器

- 简单选择器挨着写就变成了复合选择器，是与的关系。
如：.app-layout-sidebar.open {width: 320px}
- *或者div必须写在最前面，伪类写在最后面。
如：div.app{}

## 复杂选择器

复合选择器中间用连接符链接就可以变成复杂选择器。是针对元素的结构进行选择的。

- "空格"， css设计的最早的一种方式。子孙选择器。
如：.lesson-menu li[data-v-5ca9b98c] {}

- ">"，父子选择器，必须是直接上级父元素
- "~"，邻接关系进行选择
- "+"，邻接关系进行选择
- "||"，selector level4 才有的，做table的时候表示可以选中某一个列

复杂选择器，还可以用逗号相连接，构成一个选择器列表，不过一般不把逗号算进选择器里面，因为逗号相当于是两个选择器，逗号之前是或的关系。


# 7. CSS选择器 | 选择器的优先级

# 8. CSS选择器 | 伪类

# 9. CSS选择器 | 伪元素

- ::before
- ::after
- ::first-line
- ::first-letter

before 和 after是分别表示，在元素的内容的前和后插入一个伪元素。一旦用了，declaration里面就可以写一个content属性，然后就会像一个真正的dom元素一样，生成盒，参与后续排版和渲染。可以理解为就是通过选择器，向界面上添加了一个不存在的元素。

如：

    <div>
        <::before/>
        content content content content
        content content content content
        content content content content
        <::after/>
    </div>

first-line 和 first-letter 它的机制又有点不一样，这两个其实原本已经存在了content。

first-line：选中第一行，第一行是已经完成排版之后的一个结果。

first-letter：选中第一个字母。他的特点并不是添加一个不存在的元素，而是用一个不存在的元素，把一部分的文本给它括了起来，让我们可以对它进行处理。可以添加任意不同的属性，当然改不了他的content。

如果说报刊上那种首个字特别大的那种效果就可以用这个实现。比用js实现更加的稳定，代码也更加优雅。

如：

    <div>
        <::first-line>c</::first-line>ontent content content content
        content content content content
        content content content content
    </div>
