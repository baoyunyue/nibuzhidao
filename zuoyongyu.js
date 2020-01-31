//作用域是一套规则，用于确定在何处以及如何查找变量(标识符)。如果查找的目的是对
//变量进行赋值，那么就会使用 LHS 查询;如果目的是获取变量的值，就会使用 RHS 查询。

/*function foo(a){
    console.log(a+b);
}
var b = 2;
foo(2);//4
*/

//对 b 进行的 RHS 引用无法在函数 foo 内部完成，但可以在上一级作用域(在这个例子中就 是全局作用域)中完成
//LHS 和 RHS 查询都会在当前执行作用域中开始，如果有需要(也就是说它们没有找到所 需的标识符)，就会向上级作用域继续查找///目标标识符，这样每次上升一级作用域(一层 楼)，最后抵达全局作用域(顶层)，无论找到或没找到都将停止。

//作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突
//作用域包含全局作用域、函数作用域、和es6中新增的块级作用域。

//1.全局作用域
//1.1函数外面定义的变量拥有全局作用域，全局变量拥有全局作用域，网页中所有脚本和函数均可使用。全局变量在页面关闭后销毁
/*
var n = 2;
function fn(){
    var a = 1;
    return a;
}
console.log(fn());
console.log(n);
console.log(a);//error
*/
//1.2未定义直接赋值的变量自动声明为全局变量拥有全局作用域
/*
var n = 2;
function fn(){
    a = 1;
    return a;  
}

console.log(fn());   //1
console.log(n);  // 2
console.log(a);   //1
*/
//1.3.window对象的属性拥有全局作用域
//此处可使用 window.carName
/*
function myFunction() {
    carName = "Volvo";
}
*/
//2.局部作用域
//局部作用域一般只在固定的代码片段内能访问到，最常见的例如函数内部，所以也称为函数作用域
//变量在函数内声明，变量为局部作用域
//局部变量：只能在函数内访问
/*
// 此处不能调用 carName 变量
function myFunction() {
    var carName = "Volvo";
    // 函数内可调用 carName 变量
}
*/
//因局部变量只作用于函数内，所以不同的函数内可以使用相同名称的变量名
//局部变量在函数开始执行时创建，函数执行完成后局部变量会自动销毁

//3.ES6的块级作用域
//ES5只有全局作用域和函数作用域，没有块级作用域，会带来以下问题
/*
//3.1.变量提升导致内层变量可能会覆盖外层变量
var i = 5;
function func(){
    console.log(i);
    if(true){
        var i = 6;
    }
}
func();
//3.2.用来计数的循环变量泄露为全局变量
for(var i = 0;i<10;i++){
    console.log(i)
}
console.log(i);//10
//ES6引入了块级作用域，明确允许在块级作用域中申明函数，let和const命令都涉及块级作用域
//块级作用域允许声明函数只在使用大括号的情况下成立，如果未使用大括号报错
if (true) {

    function func1() {} // 不报错
    
    }
    
if (true)
    
    function func2() {} // 报错
*/
//4.作用域链
//当声明一个函数时，局部作用域一级一级向上包起来，就是作用域链

//.当执行函数时，总是先从函数内部寻找局部变量

//.如果内部找不到（函数的局部作用域没有），则会像创建函数的作用域（声明函数的作用域）寻找，依次向上
/*
var a = 1;
function fn(){
    var a = 10;
    function fn1(){
        var a = 20;
        console.log(a);  //20 
     }
    function fn2(){
       console.log(a);  //10
    }
    fn1();
    fn2();
}      
fn();
console.log(a);  //1  
*/

//作用域共有两种主要的工作模型。第一种是最为普遍的，被大多数编程语言所采用的词法作用域，我们会对这种作用域进行深入讨论。另外一种叫作动态作用域
//所谓的词法作用域就是在你写代码时将变量和块作用域写在哪里来决定，也就是词法作用域是静态的作用域，在你书写代码时就确定了。
//词法作用域意味着作用域是由书写代码时函数声明的位置来决定的。编译的词法分析阶段 基本能够知道全部标识符在哪里以及是如何声明的，从而能够预测在执行过程中如何对它 们进行查找。
//全局变量会自动成为全局对象(比如浏览器中的 window 对象)的属性，因此 可以不直接通过全局对象的词法名称，而是间接地通过对全局对象属性的引 用来对其进行访问。比如 window.a

//而动态作用域并不关心函数和作用域是如何声明以及在何处声明的，只关心它们从何处调 用。换句话说，作用域链是基于调用栈的，而不是代码中的作用域嵌套。

//函数作用域
//任意代码片段外部添加包装函数，可以将内部的变量和函数定义“隐藏”起来，外部作用域无法访问包装函数内部的任何内容。
/*var a = 2;
function foo(){
    var a = 3;
    console.log(a);
}
foo();
console.log(a);
//虽然这种技术可以解决一些问题，但是它并不理想，因为会导致一些额外的问题。首先， 必须声明一个具名函数 foo()，意味着 ///foo 这个名称本身“污染”了所在作用域(在这个 例子中是全局作用域)。其次，必须显式地通过函数名(foo())调用这个函数才能运
//行其中的代码。
*/
//如果函数不需要函数名(或者至少函数名可以不污染所在作用域)，并且能够自动运行， 这将会更加理想。
/*
var a=2;
(function foo(){
    var a=3;
    console.log(a);
})();//函数会被当作函数表达式而不是一个标准的函数声明来处理。
console.log(a);
//(function foo(){ .. })作为函数表达式意味着foo只能在..所代表的位置中 被访问,外部作用域则不行.foo 变量名被隐藏在自身中意味着不会非必要地污染外部作用域。
*/

//1.匿名具名
/*
setTimeout(function(){
    console.log("aa");
},1000);
setTimeout(function timer(){
    console.log("bb");
},1000);
*/
//2.立即执行函数表达式IIFE
/*
var a=2;
(function foo(){
    var a=3;
    console.log(a);
})();
console.log(a);
*/
//由于函数被包含在一对 ( ) 括号内部，因此成为了一个表达式，通过在末尾加上另外一个 ( ) 可以立即执行这个函数，比如 (function foo(){ .. })()。第一个 ( ) 将函数变成表 达式，第二个 ( ) 执行了这个函数
//IIFE的目的是为了隔离作用域，防止污染全局命名空间。

//IIFE 的另一个非常普遍的进阶用法是把它们当作函数调用并传递参数进去。
/*
var a = 2;
(function IIFE(global){
    var a=3;
    console.log(a);
    console.log(global.a);
})(window);
console.log(a);
*/

//IIFE 还有一种变化的用途是倒置代码的运行顺序，将需要运行的函数放在第二位，在 IIFE 执行之后当作参数传递进去。
/*
var a=2;
(function IIFE(def){
    def(window);
})(function def(global){
    var a=3;
    console.log(a);
    console.log(global.a);
});
*/

//解决 undefined 标识符的默认值被错误覆盖导致的异常(虽 然不常见)。将一个参数命名为 undefined，但是在对应的位置不传入任何值，这样就可以 保证在代码块中 undefined 标识符的值真的是 undefined
/*
undefined = true;
(function IIFE(undefined){
    var a;
    if(a === undefined){
        console.log("Undefined is safe here!");
    }
})();
*/

//try/catch 的 catch 分句会创建一个块作用域，其中声明的变量仅在 catch 内部有效。
/*
try{
    undefined();
}
catch(err){
    console.log(err);
}
console.log(err);
*/
//err 仅存在 catch 分句内部，当试图从别处引用它时会抛出错误。
/*
var foo = true;
if(foo){
    {
        let bar = foo*2;
        bar = 2*bar;
        console.log(bar);
    }
}
console.log(bar);
*/
//在声明中的任意位置都可以使用 { .. } 括号来为 let 创建一个用于绑 定的块。在这个例子中，我们在 if 声明内部显式地创建了一个块，如果需要对其进行重 构，整个块都可以被方便地移动而不会对外部 if 声明的位置和语义产生任何影响。
//let 进行的声明不会在块作用域中进行提升。声明的代码被运行之前，声明并不“存在”。
/*{
    console.log( bar ); // ReferenceError! 
    let bar = 2;
    }
*/
//1. 垃圾收集
//另一个块作用域非常有用的原因和闭包及回收内存垃圾的回收机制相关。
/*function process(data){
    //// 在这里做点有趣的事情

//在这个块中定义的内容可以销毁了!
{
    let someReallyBigData = {..};
    process(someReallyBigData);
}
var btn =document.getElementById("my_buttn");
btn.addEventListener("click",function click(evt){
    console.log("buttn clicked");
},false);
*/

//提升
/*
foo(); // TypeError
bar(); // ReferenceError
var foo = function bar() { // ...
};
//这个代码片段经过提升后，实际上会被理解为以下形式:
var foo;
foo(); // TypeError
      bar(); // ReferenceError
foo = function() {
var bar = ...self... // ...
}
*/

//函数声明和变量声明都会被提升。
//是函数会首先被提升，然后才是变量。
/*
foo(); // 1
var foo;
function foo() { console.log( 1 );
}
foo = function() { console.log( 2 );
};
//会输出 1 而不是 2 !这个代码片段会被引擎理解为如下形式:
function foo() { console.log( 1 );
}
foo(); // 1
foo = function() { console.log( 2 );
};
//注意，var foo 尽管出现在 function foo()... 的声明之前，但它是重复的声明(因此被忽 略了)，因为函数声明会被提升到普通变量之前。

//尽管重复的 var 声明会被忽略掉，但出现在后面的函数声明还是可以覆盖前面的。
foo(); // 3
function foo() { console.log( 1 );
}
var foo = function() { console.log( 2 );
};
function foo() { console.log( 3 );
}
*/
//声明本身会被提升，而包括函数表达式的赋值在内的赋值操作并不会提升。 要注意避免重复声明，特别是当普通的 var 声明和函数声明混合在一起的时候，否则会引起很多危险的问题!