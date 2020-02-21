//类实例是由一个特殊的类方法构造的，这个方法名通常和类名相同，被称为构造函数
/*
class CoolGuy{
    specialTrick = nothing
    CoolGuy(tick){
        specialTrick = trick
    }
    showoff(){
        output("Here's my trick:",specialTrick)
    }
}

Joe = new CoolGuy("jumping rope")
Joe.showoff()
*/
//CoolGuy 类有一个 CoolGuy() 构造函数,执行new CoolGuy()时实际上调用的就是它。构造函数会返回一个对象(也就是类的一个实例)，之后我们可以在这个对象上调用 showOff() 方法，来输出指定 CoolGuy 的特长。
//类构造函数属于类，而且通常和类同名。此外，构造函数大多需要用 new 来调，这样语言引擎才知道你想要构造一个新的类实例。
/*
class Vehicle {
    engines = 1
             ignition() {
                 output( "Turning on my engine." );
    }
             drive() {
                 ignition();
                 output( "Steering and moving forward!" )
             }
    }
    class Car inherits Vehicle { wheels = 4
             drive() {
                 inherited:drive()
                 output( "Rolling on all ", wheels, " wheels!" )
    } }
    class SpeedBoat inherits Vehicle { engines = 2
             ignition() {
                 output( "Turning on my ", engines, " engines." )
    }
             pilot() {
                 inherited:drive()
                 output( "Speeding through the water with ease!" )
    } }
    */
//Car 重写了继承自父类的 drive() 方法，但是之后 Car 调用了 inherited:drive() 方法， 这表明 Car 可以引用继承来的原始 drive() 方法。快艇的 pilot() 方法同样引用了原始 drive() 方法 
//这个技术被称为多态或者虚拟多态。在本例中，更恰当的说法是相对多态
//多态是一个非常广泛的话题，我们现在所说的“相对”只是多态的一个方面:任何方法都可以引用继承层次中高层的方法(无论高层的方法名和当前方法名是否相同)。之所以说 “相对”是因为我们并不会定义想要访问的绝对继承层次(或者说类)，而是使用相对引用 “查找上一层”
//在许多语言中可以使用 super 来代替本例中的 inherited:，它的含义是“超类” (superclass)，表示当前类的父类 / 祖先类。

//多态的另一个方面是，在继承链的不同层次中一个方法名可以被多次定义，当调用方法时 会自动选择合适的定义。


//混入
//显式混入
/*
function mixin( sourceObj, targetObj ) {
    for (var key in sourceObj) {
    // 只会在不存在的情况下复制 
    if (!(key in targetObj)) {
                     targetObj[key] = sourceObj[key];
                 }
    }
    return targetObj; 
}
    var Vehicle = { engines: 1,
             ignition: function() {
                 console.log( "Turning on my engine." );
    },
    drive: function() { this.ignition();
                 console.log( "Steering and moving forward!" );
             }
    };
    var Car = mixin( Vehicle, { wheels: 4,
    drive: function() { Vehicle.drive.call( this ); console.log(
                    "Rolling on all " + this.wheels + " wheels!"
                 );
    } } );
    */

   //混合复制
   /*
   function mixin(sourceObj,targetObj){
       for(var key in sourceObj){
          targetObj[key] = sourceObj[key];
       }
       return targetObj;
   }
   var Vehicle = {
       //...
   };
   //// 首先创建一个空对象并把 Vehicle 的内容复制进去
   var Car = mixin(Vehicle,{});
   //// 然后把新内容复制到 Car 中
   mixin({
       wheels:4,
       drive:function(){}
   },Car);
*/

//寄生继承
//“传统的 JavaScript 类”Vehicle 
/*
function Vehicle() {
    this.engines = 1; }
    Vehicle.prototype.ignition = function() { console.log( "Turning on my engine." );
         };
         Vehicle.prototype.drive = function() {
    this.ignition();
             console.log( "Steering and moving forward!" );
         };

//“寄生类”Car 
function Car() {
// 首先，car 是一个 Vehicle 
var car = new Vehicle();
// 接着我们对 car 进行定制 
car.wheels = 4;
// 保存到 Vehicle::drive() 的特殊引用 
var vehDrive = car.drive;
// 重写 Vehicle::drive() 
car.drive = function() {
    vehDrive.call( this );
    console.log(
        "Rolling on all " + this.wheels + " wheels!"
    );
return car; }}
var myCar = new Car();
myCar.drive();
*/

//隐式混入

var Something = {
    cool: function(){
        this.greeting = "Hello World";
        this.count = this.count?this.count +1:1;
    }
};

Something.cool();
Something.greeting;//// "Hello World"
Something.count;//1

var Another= {
    cool:function(){
        Something.cool.call(this);
    }
};
Another.cool();
console.log(Another.greeting);// "Hello World"
Another.count;//1(count 不是共享状态)s
