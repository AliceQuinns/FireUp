cc.Class({
    extends: cc.Component,

    properties: {
        finger: cc.Node,//手指节点
        ShoppingMall: cc.Node,//商城
        upgrade: cc.Node,//升级
        title: cc.Node,//标题
        Finger: cc.Node,//手
        Backgroup: cc.Node,//背景节点
        Lead: cc.Node,//主角节点
    },

    onLoad () {
        this.Animationmain();//启动动画
    },

    // 总动画入口
    Animationmain:function(){
        this.fingeranimation();//启动手指动画
    },

    // 生成动画
    CreateAnimation:function(target,coordinate,time){
        target.runAction(cc.moveBy(time,coordinate).easing(cc.easeExponentialInOut()));
    },

    // 上移动画
    TopAnimation:function(){
        // 游戏标题
        this.CreateAnimation(this.title,cc.p(),0.5);
    },

    // 点击事件
    click:(target,callback)=>{
        target.on(cc.Node.EventType.TOUCH_START,(e)=>{
            callback(e);
        })
    },

    // 手指图标动画  偏移量为100
    fingeranimation: function(){
        let offset = 100;
        let target = this.finger.children[0];//手指节点
        let max = (this.finger.width-offset)/2;
        target.x = -max;//初始化位置
        let left = cc.moveBy(1,cc.p(this.finger.width-offset,0)).easing(cc.easeExponentialInOut());
        let right =  cc.moveBy(1,cc.p(-(this.finger.width-offset),0)).easing(cc.easeExponentialInOut());
        target.runAction(cc.repeatForever(cc.sequence(left, right)));
    },


    start () {
        cc.director.setDisplayStats(false);// 关闭调试面板
    },

    update (dt) {

    },
});
