//调用位置
/*
function baz(){
    // 当前调用栈是:baz
    // 因此，当前调用位置是全局作用域
    console.log("baz");
    bar();// <-- bar 的调用位置
}
function bar(){
    // 当前调用栈是 baz -> bar
    // 因此，当前调用位置在 baz 中
    console.log("bar");
    foo();// <-- foo 的调用位置
}
function foo(){
    // 当前调用栈是 baz -> bar -> foo 
    // 因此，当前调用位置在 bar 中
    console.log("foo");
}
baz();// <-- baz 的调用位置
*/

//绑定规则
//1.默认绑定
/*
function foo(){
    console.log(this.a);
}
var a = 2;
foo();
*/
//声明在全局作用域中的变量(比如 var a = 2)就是全局对 象的一个同名属性
//接下来我们可以看到当调用 foo() 时，this.a 被解析成了全局变量 a,函数调用时应用了 this 的默认绑定，因此 this 指向全局对象
//在代码中，foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用 默认绑定
/*
function foo(){
    "use strict";
    console.log(this.a);
}
var a = 2;
foo();// TypeError: this is undefined
*/
//如果使用严格模式(strict mode)，那么全局对象将无法使用默认绑定，因此 this 会绑定 到 undefine

//但是只 有 foo() 运行在非 strict mode 下时，默认绑定才能绑定到全局对象;严格模式下与 foo() 的调用位置无关:
/*
function foo(){
    console.log(this.a);
}
var a = 2;
(function(){
    "use strict";
    foo();
})();
*/

//2. 隐式绑定
/*
function foo(){
    console.log(this.a);
}
var obj = {
    a:2,
    foo:foo
};
obj.foo();
*/
//无论是直接在 obj 中定义还是先定义再添加为引用属性，这个函数严格来说都不属于 obj 对象。
//当 foo() 被调用时，它的落脚点确实指向 obj 对象。当函数引 用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象

//对象属性引用链中只有最顶层或者说最后一层会影响调用位置。
/*
function foo(){
    console.log(this.a);
}

var obj2 = {
    a:42,
    foo:foo
};

var obj1 = {
    a:2,
    obj2:obj2
};

obj1.obj2.foo();
*/

//隐式丢失
//最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式。
/*
function foo(){
    console.log(this.a);
}
var obj = {
    a:2,
    foo:foo
};
var bar = obj.foo;
var a = "oops,global";
bar();
*/
//虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的 bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。
/*
function foo(){
    console.log(this.a);
}
function doFoo(fn){
    // fn 其实引用的是 foo
    fn(); // <-- 调用位置!
}
var obj={
    a:2,
    foo:foo
};

var a ="oops,global";// a 是全局对象的属性
doFoo(obj.foo);
*/
//参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值
/*
function foo() { 
    console.log( this.a );
}
var obj = { a: 2,
foo: foo };
var a = "oops, global"; // a 是全局对象的属性
setTimeout( obj.foo, 100 ); // "oops, global"
*/


//3.显式绑定
//JavaScript 提供的绝大多数函数以及你自 己创建的所有函数都可以使用 call(..) 和 apply(..) 方法。
//它们的第一个参数是一个对象，它们会把这个对象绑定到 this，接着在调用函数时指定这个 this。因为你可以直接指定 this 的绑定对象，因此我 们称之为显式绑定。
/*
function foo(){
    console.log(this.a);
}
var obj ={
    a:2
};
foo.call(obj);
*/
//通过 foo.call(..)，我们可以在调用 foo 时强制把它的 this 绑定到 obj 上。
//如果你传入了一个原始值(字符串类型、布尔类型或者数字类型)来当作 this 的绑定对象，这个原始值会被转换成它的对象形式(也就是new String(..)、new Boolean(..)或者 new Number(..))。这通常被称为“装箱”。

//3.1硬绑定
/*
function foo(){
    console.log(this.a);
}
var obj = {
    a:2
};
var bar = function(){
    foo.call(obj);
};
bar();
setTimeout(bar,100);
// 硬绑定的 bar 不可能再修改它的 this
bar.call(window);
*/
//我们创建了函数 bar()，并在它的内部手动调用 了 foo.call(obj)，因此强制把 foo 的 this 绑定到了 obj。无论之后如何调用函数 bar，它 总会手动在 obj 上调用 foo。这种绑定是一种显式的强制绑定，因此我们称之为硬绑定。
/*
function foo(something){
    console.log(this.a,something);
    return this.a+something;
}
var obj = {
    a:2
};
var bar = function(){
    return foo.apply(obj,arguments);
};
var b =bar(3);
console.log(b);
*/
/*
function foo(something){
    console.log(this.a,something);
    return this.a+something;
}

function bind(fn,obj){
    return function(){
        return fn.apply(obj,arguments);
    };
}

var obj = {
    a:2
};

var bar = bind(foo,obj);
var b = bar(3);
console.log(b);
//ES5 中提供了内置的方法 Function.prototype. bind，它的用法如下:
function foo(something){
    console.log(this.a,something);
    return this.a+something;
}
var obj = {
    a:2
};

var bar = bind(foo,obj);
var b = bar(3);
console.log(b);
*/

//API调用的“上下文”
//第三方库的许多函数，以及 JavaScript 语言和宿主环境中许多新的内置函数，都提供了一 个可选的参数，通常被称为“上下文”(context)，其作用和 bind(..) 一样，确保你的回调 函数使用指定的 this
//forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
/*
function foo(el) {
    console.log( el, this.id );
    }
    var obj = {
    id: "awesome"
    };
    // 调用 foo(..) 时把 this 绑定到 obj
    [1, 2, 3].forEach( foo, obj );
    // 1 awesome 2 awesome 3 awesome
*/

//4.new绑定
//1. 创建(或者说构造)一个全新的对象。
//2. 这个新对象会被执行[[原型]]连接。
//3. 这个新对象会绑定到函数调用的this。
//4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象

//优先级
/*
function foo(){
    console.log(this.a);
}
var obj1={
    a:2,
    foo:foo
};
var obj2={
    a:3,
    foo:foo
};
obj1.foo();//2
obj2.foo();//3
obj1.foo.call(obj2);//3
obj2.foo.call(obj1);//2
//显式绑定优先级更高
*/
/*
function foo(something){
    this.a=something;
}

var obj1 ={
    foo:foo
};

var obj2={};

obj1.foo(2);
console.log(obj1.a);

obj1.foo.call(obj2,3);
console.log(obj2.a);

var bar = new obj1.foo(4);
console.log(obj1.a);
console.log(bar.a);
//new 绑定比隐式绑定优先级高
*/

//之所以要在 new 中使用硬绑定函数，主要目的是预先设置函数的一些参数，这样在使用 new 进行初始化时就可以只传入其余的参数。bind(..) 的功能之一就是可以把除了第一个 参数(第一个参数用于绑定 this)之外的其他参数都传给下层的函数(这种技术称为“部 分应用”，是“柯里化”的一种)。

/*
function foo(p1,p2){
    this.val = p1+p2;
}
// 之所以使用 null 是因为在本例中我们并不关心硬绑定的 this 是什么 
// 反正使用 new 时 this 会被修改
var bar = foo.bind(null,"p1");
var baz = new bar("p2");
baz.val
*/

//1. 函数是否在new中调用(new绑定)?如果是的话this绑定的是新创建的对象。
//var bar = new foo()
//2. 函数是否通过call、apply(显式绑定)或者硬绑定调用?如果是的话，this绑定的是 指定的对象。
//var bar = foo.call(obj2)
//3. 函数是否在某个上下文对象中调用(隐式绑定)?如果是的话，this 绑定的是那个上 下文对象。
//var bar = obj1.foo()
//如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined，否则绑定到 全局对象。
//var bar = foo()



//绑定例外
/*
function foo(){
    console.log(this.a);
}
var a=2;
foo.call(null);//2
//如果你把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值在调用时会被忽略，实际应用的是默认绑定规则
*/

/*
function foo(a,b){
    console.log("a:"+a+",b:"+b);
}
// 把数组“展开”成参数
foo.apply(null,[2,3]);
// 使用 bind(..) 进行柯里化
var bar = foo.bind(null,2);
bar(3);
//如果函数并不关心 this 的话，你 仍然需要传入一个占位值，这时 null 可能是一个不错的选择，
*/

/*
function foo(a,b){
    console.log("a:"+a+",b:"+b);
}
// 我们的 DMZ 空对象
var ø = Object.create( null );
// 把数组展开成参数
foo.apply(ø,[2,3]);
//// 使用 bind(..) 进行柯里化
var bar = foo.bind(ø,2);
bar(3);
*/
/*
function foo(){
    console.log(this.a);
}
var a = 2;
var o = {a:3,foo:foo};
var p = {a:4};

o.foo();
(p.foo = o.foo)();
*/
//赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是 foo() 而不是 p.foo() 或者 o.foo()。这里会应用默认绑定
/*
if(!Function.prototype.softBind){
    Function.prototype.softBind = function(obj){
        var fn = this;
        var curried = [].slice.call(arguments,1);
        var bound = function(){
            (!this || this === (window || global)) ?
           obj : this
           curried.concat.apply( curried, arguments );

        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    };
}

function foo(){
    console.log("name:" + this.name);
}

var obj = {nmae:"obj"},
    obj2 = {name:"obj2"},
    obj3 = {name:"obj3"};

    var fooOBJ = foo.softBind( obj );
    fooOBJ(); // name: obj
    obj2.foo = foo.softBind(obj); 
    obj2.foo(); // name: obj2 <---- 看!!!
    fooOBJ.call( obj3 ); // name: obj3 <---- 看!\
    setTimeout( obj2.foo, 10 );
// name: obj <---- 应用了软绑定
*/

function foo(){
    return(a)=>{
        console.log(this.a)
    };
}
var obj1 = {
    a:2
};

var obj2 ={
    a:3
};

var bar = foo.call(obj1);
bar.call(obj2);
//foo() 内部创建的箭头函数会捕获调用时 foo() 的 this。由于 foo() 的 this 绑定到 obj1， bar(引用箭头函数)的 this 也会绑定到 obj1，箭头函数的绑定无法被修改。(new 也不 行!)