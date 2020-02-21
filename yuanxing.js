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
myObject.foo = "bar";
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

function NothingSpecial(){
    console.log("Don't mind me!")
}
var a = new NothingSpecial();//// "Don't mind me!"
a;//{}