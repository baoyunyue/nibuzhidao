//JavaScript 中的对象有一个特殊的 [[Prototype]] 内置属性，其实就是对于其他对象的引用。几乎所有的对象在创建时 [[Prototype]] 属性都会被赋予一个非空的值
/*
var myObject = {
    a:2
};
myObject.a;
*/
//对于默认的 [[Get]] 操作来说，第一步是检查对象本身是 否有这个属性，如果有的话就使用它。但是如果 a 不在 myObject 中，就需要使用对象的 [[Prototype]] 链了。
/*
var anotherObject = {
    a:2
};
var myObject = Object.create(anotherObject);
//创建一个 对象并把这个对象的 [[Prototype]] 关联到指定的对象。
myObject.a;
*/

//使用 for..in 遍历对象时原理和查找 [[Prototype]] 链类似，任何可以通过原型链访问到 (并且是 enumerable)的属性都会被枚举。使用 in 操作符来检查属性在对象中是否存在时，同样会查找对象的整条原型链(无论属性是否可枚举):
/*
var anotherObject = {
    a:2
};
var myObject = Object.create(anotherObject);
for(var k in myObject){
    console.log("found:" + k );
}
("a" in myObject);
*/

//普通的 [[Prototype]] 链最终都会指向内置的 Object.prototype        
//myObject.foo = "bar";
//如果 myObject 对象中包含名为 foo 的普通数据访问属性，这条赋值语句只会修改已有的属性值。
//如果 foo 不是直接存在于 myObject 中，[[Prototype]] 链就会被遍历，类似 [[Get]] 操作。如果原型链上找不到 foo，foo 就会被直接添加到 myObject 上
//如果属性名 foo 既出现在 myObject 中也出现在 myObject 的 [[Prototype]] 链上层，那 么就会发生屏蔽。myObject 中包含的 foo 属性会屏蔽原型链上层的所有 foo 属性，因为 myObject.foo 总是会选择原型链中最底层的 foo 属性。

// foo 不直接存在于 myObject 中而是存在于原型链上层时 myObject.foo = "bar" 会出现的三种情况。
//1. 如果在[[Prototype]]链上层存在名为foo的普通数据访问属性(参见第3章)并且没 有被标记为只读(writable:false)，那就会直接在 myObject 中添加一个名为 foo 的新 属性，它是屏蔽属性。
//2. 如果在[[Prototype]]链上层存在foo，但是它被标记为只读(writable:false)，那么 无法修改已有属性或者在 myObject 上创建屏蔽属性。如果运行在严格模式下，代码会 抛出一个错误。否则，这条赋值语句会被忽略。总之，不会发生屏蔽。
//3. 如果在[[Prototype]]链上层存在foo并且它是一个setter，那就一定会 调用这个 setter。foo 不会被添加到(或者说屏蔽于)myObject，也不会重新定义 foo 这 个 setter。
//如果你希望在第二种和第三种情况下也屏蔽 foo，那就不能使用 = 操作符来赋值，而是使 用 Object.defineProperty(..)(参见第 3 章)来向 myObject 添加 foo。
/*
var anotherObject = {
    a:2
};

var myObject = Object.create( anotherObject );
anotherObject.a;//2
myObject.a;//2

anotherObject.hasOwnProperty("a");//true
myObject.hasOwnProperty("a");//false

myObject.a++; // 隐式屏蔽!

anotherObject.a;//2
myObject.a;//3

myObject.hasOwnProperty("a");//true
*/
//myObject.a++ 看起来应该(通过委托)查找并增加 anotherObject.a 属性，但是别忘 了 ++ 操作相当于 myObject.a = myObject.a + 1。因此 ++ 操作首先会通过 [[Prototype]] 查找属性 a 并从 anotherObject.a 获取当前属性值 2，然后给这个值加 1，接着用 [[Put]] 将值 3 赋给 myObject 中新建的屏蔽属性 a
//function Foo(){
    //...
//}
//Foo.prototype;//{}
//所有的函数默认都会拥有一个 名为 prototype 的公有并且不可枚举的属性,它会指向另一个对象:这个对象通常被称为 Foo 的原型
//function Foo(){
    //...
//}
//var a = new Foo();
//Object.getPrototypeOf(a) === Foo.prototype;//true

//function Foo(){
    //...
//}
//Foo.prototype.constructor === Foo;//true

//var a = new Foo();
//a.constructor === Foo;//true
//Foo.prototype 默认(在代码中第一行声明时!)有一个公有并且不可枚举(参见第 3 章) 的属性 .constructor，这个属性引用的是对象关联的函数(本例中是 Foo)
//通过“构造函数”调用 new Foo() 创建的对象也有一个 .constructor 属性，指向 “创建这个对象的函数”。

/*
function NothingSpecial(){
    console.log("Don't mind me!")
}
var a = new NothingSpecial();//// "Don't mind me!"
a;//{}
*/

/*
function Foo(name){
    this.name = name;
}
Foo.prototype.myName = function(){
    return this.name;
};
var a = new Foo("a");
var b = new Foo("b");
a.myName();
b.myName();
*/
//1. this.name = name 给每个对象都添加 了 .name 属性，有点像类实例封装的数据值。
//Foo.prototype.myName = ... 可能个更有趣的技巧，它会给 Foo.prototype 对象添加一 个属性(函数)
//在创建的过程中，a 和 b 的内部 [[Prototype]] 都会关联到 Foo.prototype 上。当 a 和 b 中无法找到 myName 时，它会在 Foo.prototype 上找到

//如果 你创建了一个新对象并替换了函数默认的 .prototype 对象引用，那么新对象并不会自动获 得 .constructor 属性。

//function Foo(){/* .. */}
//Foo.prototype = {/*.. */};// 创建一个新原型对象
//var a1 = new Foo();
//a1.constructor ===Foo;//false
//a1.constructor === Object;//true!


// a1 并没有 .constructor 属性，所以它会委托 [[Prototype]] 链上的 Foo. prototype。但是这个对象也没有 .constructor 属性.所以它会继续委托，这次会委托给委托链顶端的 Object.prototype。这个对象 有 .constructor 属性，指向内置的 Object(..) 函数

//你可以给 Foo.prototype 添加一个 .constructor 属性，不过这需要手动添加一个符合正常行为的不可枚举


//function Foo(){/* .. */}
//Foo.prototype = {/*.. */};
//Object.defineProperty(Foo.prototype,"constructor",{
//    enumerable:false,
//    writable:true,
//    configurable:true,
//    value:Foo
//});

/*
function Foo(name){
    this.name = name;
}

Foo.prototype.myName = function(){
    return this.name;
};

function Bar(name,label){
    Foo.call(this,name);
    this.label = label;
}
// 我们创建了一个新的 Bar.prototype 对象并关联到 Foo.prototype
Bar.prototype = Object.create(Foo.prototype);
// 注意!现在没有 Bar.prototype.constructor 了 
// 如果你需要这个属性的话可能需要手动修复一下它
Bar.prototype.myLabel = function(){
    return this.label;
};

var a = new Bar("a","obj a");

a.myName();//"a"
a.myLabel();//"obj a"
*/
//// ES6 之前需要抛弃默认的 Bar.prototype
//Bar.prototype = Object.create(Foo.prototype);
// ES6 开始可以直接修改现有的 Bar.prototype
//Object.setPrototypeOf(Bar.prototype,Foo.prototype);

//检查一个实例(JavaScript 中的对象)的继承祖先(JavaScript 中的委托关联)通常被称为 内省(或者反射)。

//function Foo(){
    //...
//}
//Foo.prototype.blah = ...;
//var a = new Foo();
//a instanceof Foo;//true
//instanceof 操作符的左操作数是一个普通的对象，右操作数是一个函数。instanceof 回答的问题是:在 a 的整条 [[Prototype]] 链中是否有指向 Foo.prototype 的对象?

//下面是第二种判断 [[Prototype]] 反射的方法
//Foo.prototype.isPrototypeOf(a);//true
//在 a 的整 条 [[Prototype]] 链中是否出现过Foo.prototype ?

//b 是否出现在 c 的 [[Prototype]] 链中?
//b.isPrototypeOf(c);

//我们也可以直接获取一个对象的 [[Prototype]] 链
//Object.getPrototypeOf(a);

//Object.getPrototypeOf(a) === Foo.prototype;//true

//绝大多数浏览器也支持一种非标准的方法来访问内部 [[Prototype]] 属性
//a._proto_ === Foo.prototype;//true
//这个奇怪的 .__proto__属性“神奇地”引用了内部的 [[Prototype]] 对象

//和我们之前说过的 .constructor 一样，.__proto__ 实际上并不存在于你正在使用的对象中 (本例中是 a)。实际上，它和其他的常用函数(.toString()、.isPrototypeOf(..)，等等)一样，存在于内置的 Object.prototype 中

//.__proto__ 的实现大致上是这样
/*
Object.defineProperty(Object.prototype,"_proto_",{
    get:function(){
        return Object.getPrototypeOf(this);
    },
    set:function(o){
        Object.setPrototypeOf(this,o);
        return o;
    }
});
*/

/*
var foo ={
    something:function(){
        console.log("Tell me something good...");
    }
};
var bar =Object.create(foo);
bar.something();
*/

//Object.create(..) 会创建一个新对象(bar)并把它关联到我们指定的对象(foo)，这样 我们就可以充分发挥 [[Prototype]] 机制的威力(委托)并且避免不必要的麻烦(比如使 用 new 的构造函数调用会生成 .prototype 和 .constructor 引用)。

//我们并不需要类来创建两个对象之间的关系，只需要通过委托来关联对象就足够了。而 Object.create(..) 不包含任何“类的诡计”，所以它可以完美地创建我们想要的关联关系。

//Object.create(..) 是在 ES5 中新增的函数，所以在 ES5 之前的环境中(比如旧 IE)如 果要支持这个功能的话就需要使用一段简单的 polyfill 代码，它部分实现了 Object. create(..) 的功能
/*
if(!Object.create){
    Object.create = function(o){
        function F(){}
        F.prototype = o;
        return new F();
    };
}
*/
var anotherObject = {
    a:2
};

var myObject = Object.create(anotherObject,{
    b:{
        enumerable:false,
        writable:true,
        configurable:false,
        value:3
    },
    c:{
        enumerable:true,
        writable:false,
        configurable:false,
        value:4
    }
});

myObject.hasOwnProperty("a");//false
myObject.hasOwnProperty("b");//true
myObject.hasOwnProperty("c");//true

myObject.a;//2
myObject.b;//3
myObject.c;//4