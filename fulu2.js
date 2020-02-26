/*
class Widget{
    constructor(width,height){
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    }
    render($where){
        if(this.$elem){
            this.$elem.css({
                width:this.width+"px",
                height:this.height+"px"
             } ).appendTo($where);
        }
    }
}

class Button extends Widget {
    constructor(width,height,label) {
super( width, height );
this.label = label || "Default";
this.$elem = $( "<button>" ).text( this.label );
    }
    render($where) {
super( $where );
this.$elem.click( this.onClick.bind( this ) ); }
onClick(evt) {
console.log( "Button '" + this.label + "' clicked!" );
} }
*/

//1.不再引用杂乱的 .prototype 
//2.Button声明时直接“继承”了Widget，不再需要通过Object.create(..)来替换 .prototype 对象，也不需要设置 .__proto__ 或者 Object.setPrototypeOf(..)
//3.通过super(..)来实现相对多态，这样任何方法都可以引用原型链上层的同名方 法。
//4.class 字面语法不能声明属性(只能声明方法)。看起来这是一种限制，但是它会排除掉许多不好的情况，如果没有这种限制的话，原型链末端的“实例”可能会意外地获取 其他地方的属性
/*
class C{
    constructor(){
        this.num = Math.random();
    }
    rand(){
        console.log("Random:" + this.num);;
    }
}

var c1 = new C();
c1.rand();//Random:0.5908425103743269
C.prototype.rand = function(){
    console.log("Random:"+Math.round(this.num*1000));
};
var c2 = new C();
c2.rand();//Random:297
c1.rand();//Random:694
*/

/*
class C{
    constructor(){
        // 确保修改的是共享状态而不是在实例上创建一个屏蔽属性!
        C.prototype.count++;
        //// this.count 可以通过委托实现我们想要的功能
        console.log("Hello:"+this.count);
    }
}
// 直接向 prototype 对象上添加一个共享状态
C.prototype.count = 0;

var c1 = new C();// Hello: 1
var c2 = new C();// Hello: 2

c1.count === 2;//true
c1.count === c2.count;//true
*/

//它违背了 class 语法的本意，在实现中暴露(泄露!) 了 .prototype。
//我们会很惊讶地发现在对象 c1 和 c2 上都创建了 .count 属 性，而不是更新共享状态

//class 语法仍然面临意外屏蔽的问题:
/*
class C{
    constructor(id){
        this.id = id;
    }
    id(){
        console.log("ID:"+id);
    }
}

var c1 = new C("c1");
c1.id();//TypeError -- c1.id 现在是字符串 "c1"
*/

//super 并不是动态绑定的，它会在 声明时“静态”绑定,根据应用方式的不同，super 可能不会绑定到合适的对象.需要用 toMethod(..) 来手动绑定 super(类似用 bind(..) 来绑定 this

class P{
    foo(){console.log("P.foo");}
}
class C extends P{
    foo(){
        super();
    }
}
var c1 = new C();
c1.foo();//// "P.foo"

var D ={
    foo:function(){console.log("D.foo");}
};

var E ={
    foo:C.prototype.foo
};
// 把E委托到D
Object.setPrototypeOf(E,D);

E.foo();//"P.foo"
//super 并不像 this 一样是晚绑定(late bound，或者说 动态绑定)的，它在 [[HomeObject]].[[Prototype]] 上，[[HomeObject]] 会在创建时静态 绑定。
//super() 会调用 P.foo()，因为方法的 [[HomeObject]] 仍然是 C，C.[[Prototype]] 是 P。

var D ={
    foo:function(){
        console.log("D.foo");
    }
};
// 把E委托到 D
var E = Object.create(D);
// 手动把 foo 的 [[HomeObject]] 绑定到 E，E.[[Prototype]] 是 D，所以 super() 是 D.foo()
E.foo = C.prototype.foo.toMethod(E,"foo");
E.foo();// "D.foo"
//toMethod(..) 会复制方法并把 homeObject 当作第一个参数(也就是我们传入 的 E)，第二个参数(可选)是新方法的名称(默认是原方法名)。
