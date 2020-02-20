//对象可以通过两种形式定义:声明(文字)形式和构造形式。
//声明形式

/*
var myObj = {
    key:value
    //...
};
//构造形式
var myObj = new Object();
myObj.key = value;
*/

//在 J a v a S c r i p t 中 一 共 有 六 种 主 要 类 型 
//string • number • boolean • null• undefined •object
//简单基本类型(string、boolean、number、null 和 undefined)本身并不是对象。

//JavaScript 中还有一些对象子类型，通常被称为内置对象.
//• String• Number• Boolean • Object• Function • Array• Date • RegExp • Error

//这些内置函数可以当作构造函数 (由 new 产生的函数调用)来使用，从而可以构造一个对应子类型的新对象。

/*
var strPrimitive = "I am a string";
typeof strPrimitive; //"string"
strPrimitive instanceof String; //false

var strObject = new String("I am a string");
typeof strObject;//"object"
strObject instanceof String;//"true"

Object.prototype.toString.call(strObject);//[object String]
//子类型在内部借用了 Object 中的 toString() 方法
*/

var strPrimitive = "I am a string";
console.log(strPrimitive.length);
console.log(strPrimitive.charAt(3));
//我们都可以直接在字符串字面量上访问属性或者方法，之所以可以这 样做，是因为引擎自动把字面量转换成 String 对象，所以可以访问属性和方法。

var myObject = {
    a:2
};
myObject.a;
myObject["a"];
//.a 语法通 常被称为“属性访问”，["a"] 语法通常被称为“键访问”
// 操作符要求属性名满足标识符的命名规范，而 [".."] 语法 可以接受任意 UTF-8/Unicode 字符串作为属性名
//如果要引用名称为 "Super- Fun!" 的属性，那就必须使用 ["Super-Fun!"] 语法访问，因为 Super-Fun! 并不是一个有效 的标识符属性名。
/*
var myObject = {
    a:2
};
var idx;
if (wantA){
    idx = "a";
}
console.log(myObject[idx]);
*/
//在对象中，属性名永远都是字符串。如果你使用 string(字面量)以外的其他值作为属性 名，那它首先会被转换为一个字符串。即使是数字也不例外，虽然在数组下标中使用的的 确是数字，但是在对象属性名中数字会被转换成字符串
/*
var myObject = {};
myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"];//"foo"
myObject["3"];//"bar"
myObject["[object Object]"];//"baz"
*/

/*
//可计算属性名
var prefix = "foo";
var myObject = {
    [prefix+"bar"]:"hello",
    [prefix+"baz"]:"world"
};
myObject["foobar"];
myObject["foobaz"];
*/

/*
//无论返回值是什么类型，每次访问对象的属性就是属性访问。如果属性访问返回的是一个 函数，那它也并不是一个“方法”。属性访问返回的函数和其他函数没有任何区别

function foo(){
    console.log("foo");
}

var someFoo = foo;

var myObject = {
    someFoo : foo
};

foo;// function foo(){..}
someFoo;// function foo(){..}
myObject.someFoo;// function foo(){..}
*/



//数组
/*
var myArray = ["foo",42,"bar"];
myArray.baz = "baz";
myArray.length;
myArray.baz;
*/


//复制对象
/*
function anotherFunction(){}
var anthorObject = {
    c:true
};
var anotherArray = [];
var myObject={
    a:2,
    b:anthorObject,
    c:anotherArray,
    d:anotherFunction
};
anotherArray.push(anthorObject,myObject)
var newObj = Object.assign( {}, myObject );
     newObj.a; // 2
     newObj.b === anotherObject; // true
     newObj.c === anotherArray; // true
     newObj.d === anotherFunction; // true

     */

//在 ES5 之前，JavaScript 语言本身并没有提供可以直接检测属性特性的方法，比如判断属性是否是只读。
//但是从 ES5 开始，所有的属性都具备了属性描述符。
/*
var myObject = {
    a:2
};

Object.getOwnPropertyDescriptor( myObject,"a");
*/
//{
//value:2,
//writeable:true,
// enumberable:true,
// configurable:true   
//}
//在创建普通属性时属性描述符会使用默认值，我们也可以使用 Object.defineProperty(..) 来添加一个新属性或者修改一个已有属性(如果它是 configurable)并对特性进行设置
/*
var myObject = {};
Object.defineProperty(myObject,"a",{
    value:2,
    writable:true,
    configurable:true,
    enumerable:true
});
myObject.a;//2
*/
//我们使用 defineProperty(..) 给 myObject 添加了一个普通的属性并显式指定了一些特性。 然而，一般来说你不会使用这种方式，除非你想修改属性描述符。
//1.writable
/*
var myObject = {};
Object.defineProperty(myObject,"a",{
    value:2,
    writable:false,
    configurable:true,
    enumerable:true
});
myObject.a = 3;
myObject.a;//2
//属性值的修改静默失败(silently failed)了。
"use strict"
var myObject = {};
Object.defineProperty(myObject,"a",{
    value:2,
    writable:false,
    configurable:true,
    enumerable:true
});
myObject.a = 3;//TypeError
//TypeError 错误表示我们无法修改一个不可写的属性。
*/

//2.Configurable
/*
var myObject={
    a:2
};
myObject.a=3;
myObject.a;//3

Object.defineProperty( myObject, "a",{
    value:4,
    writable:true,
    configurable:false,
    enumerable:true
});
myObject.a;//4
myObject.a = 5;
myObject.a;//5

Object.defineProperty(myObject,"a",{
    value:6,
    writable:true,
    configurable:true,
    enumerable:true
});//TypeError
*/
//尝试修改一个不可配置的属性描述符都会出错
//即便属性是 configurable:false，我们还是可以 把 writable 的状态由 true 改为 false，但是无法由 false 改为 true。
/*
var myObject = {
    a:2
};
myObject.a;//2

delete myObject.a;
myObject.a;//undefined

Object.defineProperty( myObject,"a",{
    value:2,
    writable:true,
    configurable:false,
    enumerable:true
});

myObject.a;//2
delete myObject.a;
myObject.a;//2
*/
//除了无法修改，configurable:false 还会禁止删除这个属性:
//delete 只用来直接删除对象的(可删除)属性。如果对象的某个属性是某个对象 / 函数的最后一个引用者，对这个属性执行 delete 操作之后，这个未引用的对象 / 函数就可以被垃圾回收。


//不变性
//希望属性或者对象是不可改变,所有的方法创建的都是浅不变形，也就是说，它们只会影响目标对象和 它的直接属性。如果目标对象引用了其他对象(数组、对象、函数，等)，其他对象的内 容不受影响，仍然是可变的:
/*
myImmutableObject.foo;//[1,2,3]
myImmutableObject.foo.push(4);
myImmutableObject.foo//[1,2,3,4]
*/
//假设代码中的 myImmutableObject 已经被创建而且是不可变的，但是为了保护它的内容 myImmutableObject.foo，你还需要使用下面的方法让 foo 也不可变

//1.对象常量
//结合 writable:false 和 configurable:false 就可以创建一个真正的常量属性

//1.对象常量
//结合 writable:false 和 configurable:false 就可以创建一个真正的常量属性(不可修改、 重定义或者删除):
/*
var myObject = {};
Object.defineProperty(myObject,"FAVORITE_NUMBER",{
    value:42,
    writable:false,
    configurable:false
});
*/

//2.禁止扩展
//如果你想禁止一个对象添加新属性并且保留已有属性，可以使用 Object.prevent Extensions(..):
/*
var  myObject = {
    a:2
};
Object.preventExtensions(myObject);

myObject.b = 3;
myObject.b;//undefined
*/

//Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用 Object.preventExtensions(..) 并把所有现有属性标记为 configurable:false。

//bject.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用 Object.seal(..) 并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们 的值。这个方法是你可以应用在对象上的级别最高的不可变性，它会禁止对于对象本身及其任意 直接属性的修改(不过就像我们之前说过的，这个对象引用的其他对象是不受影响的)


//[[Get]]
var myObject = {
    a:2
};
myObject.a;//2
//myObject.a 在 myObject 上实际上是实现了 [[Get]] 操作(有点像函数调 用:[[Get]]())。对象默认的内置 [[Get]] 操作首先在对象中查找是否有名称相同的属性， 如果找到就会返回这个属性的值。
//如果没有找到名称相同的属性，按照 [[Get]] 算法的定义会执行另外一种非常重要 的行为。我们会在第 5 章中介绍这个行为(其实就是遍历可能存在的 [[Prototype]] 链， 也就是原型链)。


//[[put]]
//[[Put]] 被触发时，实际的行为取决于许多因素，包括对象中是否已经存在这个属性(这是最重要的因素)。
//如果已经存在这个属性,
//1. 属性是否是访问描述符(如果是并且存在setter就调用setter。
//2. 属性的数据描述符中writable是否是false?如果是，在非严格模式下静默失败，在严格模式下抛出 TypeError 异常。
//3. 如果都不是，将该值设置为属性的值

//getter   setter
//在 ES5 中可以使用 getter 和 setter 部分改写默认操作，但是只能应用在单个属性上，无法应用在整个对象上。getter 是一个隐藏函数，会在获取属性值时调用。setter 也是一个隐藏函数，会在设置属性值时调用

//当你给一个属性定义 getter、setter 或者两者都有时，这个属性会被定义为“访问描述符”
//对于访问描述符来说，JavaScript 会忽略它们的 value 和 writable 特性，取而代之的是关心 set 和 get(还有 configurable 和 enumerable)特性

/*
 var myObject = {
     get a(){
         return 2;
     }
 };

 Object.defineProperty(
     myObject,
     "b",
     {  //描述符
        // 给 b 设置一个 getter
         get:function(){return this.a*2},
         // 确保 b 会出现在对象的属性列表中
         enumerable:true
     }
 );
 myObject.a//2
 myObject.b;//4
 */
 //get a()、defineProperty(..) 中的显式定义，二者都会在对象中创建一个不包含值的属性，对于这个属性的访问会自动调用一个隐藏函数，它的返回值会被当作属性访问的返回值：

/*
 var myObject = {
     //给a定义
     get a(){
         return 2;
     }
 };

 myObject.a = 3;
 myObject.a;//2
 */
 //由于我们只定义了 a 的 getter，所以对 a 的值进行设置时 set 操作会忽略赋值操作，不会抛 出错误。而且即便有合法的 setter，由于我们自定义的 getter 只会返回 2，所以 set 操作是 没有意义的

 //setter 会覆盖单个属性默认的 [[Put]](也被称为赋值)操作。通常来说 getter 和 setter 是成对出现的(只定义一个的话 通常会产生意料之外的行为):

 /*
var myObject = {
    //// 给 a 定义一个 getter
    get a(){
        return this._a_;
    },
    //// 给 a 定义一个 setter
    set a(val){
        this._a_ = val*2;
    }
};
myObject.a = 2;
myObject.a;//4
*/
/*
var myObject = {
    a:2
};
("a" in myObject);//true
("b" in myObject);//false

myObject.hasOwnProperty("a");//true
myObject.hasOwnProperty("b");//false
*/
//in 操作符会检查属性是否在对象及其 [[Prototype]] 原型链中(参见第 5 章)。相比之下， hasOwnProperty(..) 只会检查属性是否在 myObject 对象中

//所有的普通对象都可以通过对于 Object.prototype 的委托来访问 hasOwnProperty(..)， 但 是 有 的 对 象 可 能 没 有 连 接 到 Object.prototype(在这种情况下，形如 myObejct.hasOwnProperty(..) 就会失败。
//这时可以使用一种更加强硬的方法来进行判断:Object.prototype.hasOwnProperty. call(myObject,"a")，它借用基础的 hasOwnProperty(..) 方法并把它显式绑定到 myObject 上。

//看起来 in 操作符可以检查容器内是否有某个值，但是它实际上检查的是某 个属性名是否存在。对于数组来说这个区别非常重要，4 in [2, 4, 6]的结 果并不是你期待的 True，因为 [2, 4, 6] 这个数组中包含的属性名是 0、1、 2，没有 4。


//1. 枚举
/*
var myObject = {};
Object.defineProperty(
    myObject,
    "a",
    //让 a 像普通属性一样可以枚举
    {enumerable:true,value:2}
);
Object.defineProperty(
    myObject,
    "b",
    // 让b不可枚举
    {enumerable:false,value:3}
);
myObject.b;//3
("b" in myObject);// true
myObject.hasOwnProperty("b");//true
//...
for (var k in myObject){
    console.log(k,myObject[k]);
}
//"a" 2
*/
//myObject.b 确实存在并且有访问值，但是却不会出现在 for..in 循环
//在数组上应用 for..in 循环有时会产生出人意料的结果，因为这种枚举不 仅会包含所有数值索引，还会包含所有可枚举属性。最好只在对象上应用 for..in 循环，如果要遍历数组就使用传统的 for 循环来遍历数值索引。

var myObject = {};
Object.defineProperty(
    myObject,
    "a",
    //让 a 像普通属性一样可以枚举
    {enumerable:true,value:2}
);
Object.defineProperty(
    myObject,
    "b",
    // 让b不可枚举
    {enumerable:false,value:3}
);
myObject.propertyIsEnumerable("a");//true
myObject.propertyIsEnumerable('b');//false

Object.keys(myObject);//["a"]
Object.getOwnPropertyNames(myObject);//["a", "b"]
//propertyIsEnumerable(..) 会检查给定的属性名是否直接存在于对象中(而不是在原型链)
//Object.keys(..) 会返回一个数组，包含所有可枚举属性，Object.getOwnPropertyNames(..) 会返回一个数组，包含所有属性，无论它们是否可枚举。
//in 和 hasOwnProperty(..) 的区别在于是否查找 [[Prototype]] 链，然而，Object.keys(..) 和 Object.getOwnPropertyNames(..) 都只会查找对象直接包含的属性

//遍历
//forEach(..) 会遍历数组中的所有值并忽略回调函数的返回值。every(..) 会一直运行直到回调函数返回 false(或者“假”值)，some(..) 会一直运行直到回调函数返回 true(或者 “真”值)。

//使用 for..in 遍历对象是无法直接获取属性值的，因为它实际上遍历的是对象中的所有可枚举属性
//for..of 循环语法直接遍历值而不是数组下标
/*
var myArray = [1,2,3];
for (var v of myArray){
    console.log(v);
}
*/
//数组有内置的 @@iterator，因此 for..of 可以直接应用在数组上。我们使用内置的 @@ iterator 来手动遍历数组
/*
var myArray = [ 1, 2, 3 ];
var it = myArray[Symbol.iterator]();
it.next(); // { value:1, done:false } 
it.next(); // { value:2, done:false } 
it.next(); // { value:3, done:false } 
it.next(); // { done:true }
*/

//和数组不同，普通的对象没有内置的 @@iterator，所以无法自动完成 for..of 遍历
var myObject = { a: 2,
    b: 3 };
    Object.defineProperty( myObject, Symbol.iterator, { enumerable: false,
    writable: false,
    configurable: true,
    value: function() { var o = this;
    var idx = 0;
    var ks = Object.keys( o ); return {
    next: function() { 
        return {
                value: o[ks[idx++]],
                done: (idx > ks.length)
                  };
    } };
    } } );
    // 手动遍历 myObject
    var it = myObject[Symbol.iterator](); 
    it.next(); // { value:2, done:false } 
    it.next(); // { value:3, done:false } 
    it.next(); // { value:unde ned, done:true }
    // 用 for..of 遍历 myObject 
    for (var v of myObject) { 
        console.log( v );
    }
    // 2 
    // 3