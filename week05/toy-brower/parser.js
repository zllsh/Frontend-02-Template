const css = require('css');

const EOF = Symbol("EOF");

const layout = require('./layout.js')

let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;

let stack = [{type:"document",children:[]}];

// week05 新函数，这里我们把css规则暂存到一个数组里
// 1. CSS计算 | 收集CSS规则
let rules = [];
function addCSSRules(text) {
    var ast = css.parse(text);
    // console.log(JSON.stringify(ast, null, ""));
    rules.push(...ast.stylesheet.rules);
}

// 5. CSS计算 | 计算选择器与元素匹配
function match(element, selector) {
    if (!selector || !element.attributes) 
        return false;

    if (selector.charAt(0) == "#") { // id选择器
        var attr = element.attributes.filter(attr => attr.name === "id")[0];
        if (attr && attr.value === selector.replace("#", '')) 
            return true;
    } else if (selector.charAt(0) == ".") { // class选择器
        var attr = element.attributes.filter(attr => attr.name === "class")[0];
        if (attr && attr.value === selector.replace(".", '')) 
            return true;
    } else { // 默认是tagName选择器
        if (element.tagName === selector)
            return true;
    }
    return false;
}

// 7. CSS计算 | specificity的计算逻辑
function specificity(selector) {
    var p = [0, 0, 0, 0];
    var selectorParts = selector.split(" ");
    for(let part of selectorParts) {
        if (part.charAt(0) == "#") {
            p[1] += 1;
        } else if (part.charAt(0) == ".") {
            p[2] += 1;
        } else { // tag
            p[3] += 1;
        }
    }
    return p
}

// 7. CSS计算 | specificity的计算逻辑
function compare(sp1, sp2) {
    if (sp1[0] - sp2[0]) 
        return sp1[0] - sp2[0];
    if (sp1[1] - sp2[1]) 
        return sp1[1] - sp2[1];
    if (sp1[2] - sp2[2]) 
        return sp1[2] - sp2[2];
    return sp1[3] - sp2[3];
}

// 2. CSS计算 | 添加调用
function computeCSS(element) {
    // console.log(rules);
    console.log("compute CSS for Element", element);
    // 3. CSS计算 | 获取父元素序列
    var elements = stack.slice().reverse();

    // 4. CSS计算 | 选择器与元素的匹配
    if (!element.computedStyle) 
        element.computedStyle = {}


    for (let rule of rules) {
        var selectorParts = rule.selectors[0].split(" ").reverse();

        if (!match(element, selectorParts[0])) continue;

        let matched = false;

        var j = 1;

        for (let i = 0; i < elements.length; i++) {
            if(match(elements[i], selectorParts[j])) {
                j++;
            }
            // 是否所有的元素都被匹配到了
            if (j >= selectorParts.length) matched = true;

            // 如果匹配成功
            if (matched) {
                // console.log('匹配成功：element', element, 'matched rule', rule)
                var sp = specificity(rule.selectors[0]);

                // 6. CSS计算 | 生成computed属性
                var computedStyle = element.computedStyle;
                for (let declaration  of rule.declarations) {
                    if(!computedStyle[declaration.property]) {
                        computedStyle[declaration.property] = {}
                        computedStyle[declaration.property].value = declaration.value
                    }

                    if(!computedStyle[declaration.property].specificity) {
                        computedStyle[declaration.property].value = declaration.value
                        computedStyle[declaration.property].specificity = sp
                    } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
                        computedStyle[declaration.property].value = declaration.value
                        computedStyle[declaration.property].specificity = sp
                    }
                }
                console.log('element.computedStyle:', element.computedStyle)
            }
        }
    }
}

function emit(token){
    let top = stack[stack.length - 1];

    if(token.type == "startTag"){
        let element = {
            type:"element",
            children:[],
            attributes:[]
        };

        element.tagName = token.tagName;

        for(let p in token){
            if(p != "type" && p != "tagName"){
                element.attributes.push({
                    name:p,
                    value:token[p]
                })
            }
        }
        // 计算css的时机
        computeCSS(element);

        top.children.push(element);
        element.parent = top;

        if(!token.isSelfClosing){
            stack.push(element);
        }

        currentTextNode = null;
    }else if(token.type == "endTag"){
        if(top.tagName != token.tagName){
            throw new Error("Tag start end doesn't match!");
        }else{
            // ++++++++++++++ 遇到style标签时，执行天假css规则的操作+++++++++++++++ // 
            if (top.tagName === "style") {
                // 这里只考虑style标签和内联css的写法（link标签此处不考虑了，涉及网络请求啥的比较复杂）
                addCSSRules(top.children[0].content)
            }
            // 8. 排版 | 根据浏览器属性进行排版
            layout(top);

            stack.pop();
        }
        currentTextNode = null;
    }else if(token.type == "text"){
        if(currentTextNode == null){
            currentTextNode = {
                type:"text",
                content:""
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }

}

function data(c){
    if(c == "<"){
        return tagOpen;
    }else if(c == EOF){
        emit({
            type:"EOF"
        });
        return ;
    }else{
        emit({
            type:"text",
            content:c
        });
        return data;
    }
}

function tagOpen(c){
    if(c == "/"){
        return endTagOpen;
    }else if(c.match(/^[a-zA-z]$/)){
        currentToken = {
            type:"startTag",
            tagName:""
        }
        return tagName(c);
    }else{
        return ;
    }
}

function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type:"endTag",
            tagName:""
        }
        return tagName(c);
    }else if(c == ">"){

    }else if(c == EOF){
        return ;
    }else{

    }
}

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == "/"){
        return selfClosingStartTag;
    }else if(c.match(/^[a-zA-z]$/)){
        currentToken.tagName += c;
        return tagName;
    }else if(c == ">"){
        emit(currentToken);
        return data;
    }else{
        return tagName;
    }
}

function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == "/" || c == ">" || c == EOF){
        return afterAttributeName(c);
    }else if(c == "="){

    }else{
        currentAttribute = {
            name:"",
            value:"",
        }
        return attributeName(c);
    }
}

function attributeName(c){
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == "EOF"){
        return afterAttributeName(c);
    }else if(c == "="){
        return beforeAttributeValue;
    }else if(c == "\u0000"){

    }else if(c == "\"" || c == "'" || c == "<"){

    }else{
        currentAttribute.name += c;
        return attributeName;
    }
}

function beforeAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == "EOF"){
        return beforeAttributeValue;
    }else if(c == "\""){
        return doubleQuotedAttributeValue;
    }else if(c == "\'"){
        return singleQuotedAttributeValue;
    }else if(c == ">"){

    }else{
        return unQuotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c){
    if(c == "\""){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else if(c == "\u0000"){

    }else if(c == "EOF"){

    }else{
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c){
    if(c == "\'"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else if(c == "\u0000"){

    }else if(c == "EOF"){

    }else{
        currentAttribute.value += c;
        return singleQuotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == "/"){
        return selfClosingStartTag;
    }else if( c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if (c == EOF){

    }else{
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function unQuotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    }else if(c == "/"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == "\u0000"){

    }else if(c == "\"" || c == "'" || c == "<" || c == "="){

    }else if(c == "EOF"){

    }else{
        currentAttribute.value += c;
        return unQuotedAttributeValue;
    }
}

// <img />
function selfClosingStartTag(c){
    if(c == ">"){
        currentToken.isSelfClosing = true;
        return data;
    }else if(c == EOF){

    }else{
        
    }
}

function afterAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return afterAttributeName;
    }else if(c == "/"){
        return selfClosingStartTag;
    }else if(c == "="){
        return beforeAttributeValue;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == "EOF"){

    }else{
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name:"",
            value:""
        };
        return attributeName(c);
    }
}

module.exports.parserHTML = function parserHTML(html){
    let state = data;

    for(let c of html){
        state = state(c);
    }

    state = state(EOF);

    return stack[0];
}