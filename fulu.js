/*{
    let a= 2;
    console.log(a);
}
console.log(a);
*/
/*try{throw 2;}catch(a){
    console.log(a);
}
console.log(a);
*/
/*var foo = a => {
    console.log(a);
};
foo(2);
*/
/*
var obj = {
    id:"awesome",
    cool:function coolFn(){
        console.log(this.id);
    }
};
var id = "not awesome"
obj.cool();//awesome
setTimeout(obj.cool,1000);//not awesome, cool() 函数丢失了同 this 之间的绑定
*/
/*
var obj = {
    count:0,
    cool:function coolFn(){
        var self = this;

        if(self.count <1){
            setTimeout(function timer(){
                self.count++;
                console.log("awesome?");
            },100);
        }
    }
};
obj.cool();
*/
/*
var obj = {
    count:0,
    cool:function coolFn(){
        if(this.count<1){
            setTimeout(()=>{
                this.count++;
                console.log("awesome?");
            },100);
        }
    }
};
obj.cool();
*/
var obj ={
    count:0,
    cool:function coolFn(){
        if(this.count<1){
            setTimeout(function timer(){
                this.count++;//this 是安全的 
                             // 因为 bind(..)
                console.log("more awesome");
            }.bind(this),100);
        }
    }
};
obj.cool();