//当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行
/*
function foo(){
    var a = 2;
    function bar(){
        console.log(a);
    }
    return bar;
}
var baz = foo();
baz();
*/
//函数 bar() 的词法作用域能够访问 foo() 的内部作用域
//我们将 bar 所引用的函数对象本身当作返回值。
//在 foo() 执行后，其返回值(也就是内部的 bar() 函数)赋值给变量 baz 并调用 baz()
//bar() 显然可以被正常执行。它在自己定义的词法作用域以外的地方 执行。
//在 foo() 执行后，通常会期待 foo() 的整个内部作用域都被销毁，因为我们知道引擎有垃 圾回收器用来释放不再使用的内存空间
//而闭包的“神奇”之处正是可以阻止这件事情的发生。事实上内部作用域依然存在，因此 没有被回收。谁在使用这个内部作用域?原来是 bar() 本身在使用
//拜 bar() 所声明的位置所赐，它拥有涵盖 foo() 内部作用域的闭包，使得该作用域能够一 直存活，以供 bar() 在之后任何时间进行引用。

/*
function foo(){
    var a = 2;
    function baz(){
        console.log(a);
    }
    bar(baz);
}
function bar(fn){
    fn();//闭包
}
*/
//把内部函数 baz 传递给 bar，当调用这个内部函数时(现在叫作 fn)，它涵盖的 foo() 内部作用域的闭包就可以观察到了，因为它能够访问a。
/*
var fn;
function foo(){
    var a =2;
    function baz(){
        console.log(a);
    }
    fn = baz;
}
function bar(){
    fn();
}
foo();
bar();
*/
//内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用 域的引用，无论在何处执行这个函数都会使用闭包。
/*
function wait(message){
    setTimeout(
        function timer(){
            console.log(message);
        },1000
    );
}
wait("hello");
*/
//内部函数(名为 timer)传递给 setTimeout(..)。timer 具有涵盖 wait(..) 作用域的闭包，因此还保有对变量 message 的引用
/*
for(let i=1;i<=5;i++){
    setTimeout( function timer(){
        console.log(i);
    },i*1000 );
}
*/
//for 循环头部的 let 声明还会有一 个特殊的行为。这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。随 后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量。


/*
function CoolModule(){
    var something = "cool";
    var anthor = [1,2,3];

    function doSomething(){
        console.log(something);
    }

    function doAnother(){
        console.log(anthor.join("!"));
    }

    return{
        doSomething:doSomething,
        doAnother:doAnother
    };
}
var foo = CoolModule();
foo.doSomething();
foo.doAnother();
*/
//首先，CoolModule() 只是一个函数，必须要通过调用它来创建一个模块实例。如果不执行 外部函数，内部作用域和闭包都无法被创建。
//其次，CoolModule() 返回一个用对象字面量语法 { key: value, ... } 来表示的对象。这 个返回的对象中含有对内部函数而不是内部数据变量的引用。我们保持内部数据变量是隐 藏且私有的状态。可以将这个对象类型的返回值看作本质上是模块的公共 API。
//这个对象类型的返回值最终被赋值给外部的变量 foo，然后就可以通过它来访问 API 中的 属性方法，比如 foo.doSomething()。

//模块模式需要具备两个必要条件。
//1. 必须有外部的封闭函数，该函数必须至少被调用一次(每次调用都会创建一个新的模块 实例)。
//2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并 且可以访问或者修改私有的状态。
/*
var foo =(function CoolModule(id){
    function change(){
        publicAPI.identify = identify2;
    }
    function identify1(){
        console.log(id);
    }
    function identify2(){
        console.log(id.toUpperCase());
    }
    var publicAPI = {
        change:change,
        identify:identify1
    };

    return publicAPI;
})("foo module");
foo.identify();
foo.change();
foo.identify();
*/
//通过在模块实例的内部保留对公共 API 对象的内部引用，可以从内部对模块实例进行修 改，包括添加或删除方法和属性，以及修改它们的值。
var MyModules = (function Manager() {
    var modules = {};
    function define(name, deps, impl) {
    for (var i=0; i<deps.length; i++) {
                     deps[i] = modules[deps[i]];
                 }
                 modules[name] = impl.apply( impl, deps );
             }
    function get(name) { return modules[name];}
        return {
            define: define,
            get: get };
            })();
            

MyModules.define( "bar", [], function() { function hello(who) {
    return "Let me introduce: " + who; }
    return {
    hello: hello
    }; } );
         MyModules.define( "foo", ["bar"], function(bar) {
             var hungry = "hippo";
    function awesome() {
    console.log( bar.hello( hungry ).toUpperCase() );
    }
    return {
    awesome: awesome
    }; } );
         var bar = MyModules.get( "bar" );
         var foo = MyModules.get( "foo" );
         console.log(
             bar.hello( "hippo" )
    ); // Let me introduce: hippo 
    foo.awesome(); // LET ME INTRODUCE: HIPPO