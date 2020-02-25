//类理论
/*
class Task{
    id;
    Task(ID){id = ID;}
    outputTask(){ output(id);}   
}
class XYZ inherits Task{
    label;
    //// 构造函数 XYZ()
    XYZ(ID,label){super(ID);label=label;}
    outputTask(){super();output(label);}
}
class ABC inherits Task{
    //...
}
*/
//实例化子类 XYZ 的一些副本然后使用这些实例来执行任务“XYZ”。这些实例 会复制 Task 定义的通用行为以及 XYZ 定义的特殊行为

/*
Task ={
    setID:function(ID){this.id = ID},
    outputID:function(){console.log(this.id);}
};

XYZ=Object.create(Task);

XYZ.prepareTask = function(ID,Label){
    this.setID(ID);
    this.label = Label;
};

XYZ.outputTaskDetails = function(){
    this.outputID();
    console.log(this.label);
};
*/
//XYZ 通过 Object. create(..) 创建，它的 [[Prototype]] 委托了 Task 对象
//1.id 和 label 数据成员都是直接存储在 XYZ 上(而不是 Task)。通常 来说，在 [[Prototype]] 委托中最好把状态保存在委托者(XYZ、ABC)而不是委托目标(Task)上
//2.我们会尽量避免在 [[Prototype]] 链的不同级别中使用相同的命名
//3.this.setID(ID);XYZ中的方法首先会寻找XYZ自身是否有setID(..)，但是XYZ中并没 有这个方法名，因此会通过 [[Prototype]] 委托关联到 Task 继续寻找，这时就可以找到 setID(..) 方法。此外，由于调用位置触发了 this 的隐式绑定规则，因 此虽然 setID(..) 方法在 Task 中，运行时 this 仍然会绑定到 XYZ

//比较思维模型
//面向对象
/*
function Foo(who){
    this.me = who;
}

Foo.prototype.identify = function(){
    return "I am"+this.me;
};
function Bar(who){
    Foo.call(this,who);
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.speak = function(){
    alert("Hello"+this.identify());
};

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak();
b2.speak();
*/
//子类 Bar 继承了父类 Foo，然后生成了 b1 和 b2 两个实例。b1 委托了 Bar.prototype，后者委托了 Foo.prototype
/*
Foo = {
    init:function(who){
        this.me = who;
    },
    identify:function(){
        return "I am"+this.me;
    }
};

Bar = Object.create(Foo);

Bar.speak = function(){
    alert("hello,"+this.identify()+".");
};

var b1 =Object.create(Bar);
b1.init("b1");
var b2 =Object.create(Bar);
b2.init("b2");
b1.speak();
b2.speak();
*/

//控件“类”
//// 父类
/*
function Widget(width,height){
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
}

Widget.prototype.render = function($where){
    if(this.$elem){
        this.$elem.css({
            width: this.width+"px",
            height: this.height +"px"
        }).appendTo($where);
    }
};
//// 子类
function Button(width,height,label){
    Widget.call(this,width,height);
    this.label = label || "Default";

    this.$elem = $("<button>").text(this.label);
}
//// 让 Button“继承”Widget
Button.prototype = Object.create(Widget.prototype);
// 重写 render(..)
Button.prototype.render = function($where){
    Widget.prototype.render.call(this,$where);
    this.$elem.click(this.onClick.bind(this));
};

Button.prototype.onClick = function(evt){
    console.log("Button'"+this.label+"'clicked!");
};

$(document).ready(function(){
    var $body = $(document.body);
    var btn1 = new Button(125,30,"Hello");
    var btn2 = new Button(150,40,"world");

    btn1.render($body);
    btn2.render($body);
});
*/

//ES6的class语法糖
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
                width:this.width + "px",
                height:this.height + "px"
            }).appendTo($where);
        }
    }
}

class Button extends Widget{
    constructor(width,height,label){
        super(width,height);
        this.label = label || "Default";
        this.$elem = $("<button>").text(this.label);
    }
    render($where){
        super($where);
        this.$elem.click(this.onClick.bind(this));
    }
    onClick(evt){
        console.log("Button'"+this.label+"'clicked!");
    }
}

$(document).ready(function(){
    var $body = $(document.body);
    var btn1 = new Button(125,30,"Heelo");
    var btn2 = new Button(150,40,"World");

    btn1.render($body);
    btn2.render($body);
});
*/

//委托控件对象
var Widget = {
    init:function(width,height){
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    },
    insert:function($where){
        if(this.$elem){
            this.$elem.css({
                width:this.width +"px",
                height:this.height+"px"
            }).appendTo($where);
        }
    }
};
var Button = Object.create(Widget);
Button.setup = function(width,height,label){
    // 委托调用
    this.init(width,height);
    this.label = label || "Default";
    this.$elem = $("<button>").text(this.label);
};
Button.build = function($where){
    this.insert($where);
    this.$elem.click(this.onClick.bind(this));
};
Button.onClick = function(evt){
    console.log("Button'"+this.label+"'clicked!");
};

$(document).ready(function(){
    var $body = $(document.body);

    var btn1 = Object.create(Button);
    btn1.setup(125,30,"Hello");
    var btn2 = Object.create(Button);
    btn1.setup(150,40,"World");

    btn1.build($body);
    btn2.build($body);

})