// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

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
        this.fingeranimation();//启动手指动画
        this.parentAdmin();//滑动动画
        this.Click();//事件
    },

    // 事件绑定

    // 开始游戏
    startGame:function(){

    },

    // 手指图标动画  偏移量为100
    fingeranimation: function(){
        let offset = 100;
        let target = this.finger.children[0];//手指节点
        let max = (this.finger.width-offset)/2;
        target.x = -max;//初始化位置
        let left = cc.moveBy(1,cc.p(this.finger.width-offset,0)).easing(cc.easeOut(2.0));
        let right =  cc.moveBy(1,cc.p(-(this.finger.width-offset),0)).easing(cc.easeOut(2.0));
        target.runAction(cc.repeatForever(cc.sequence(left, right)));
    },

    //左动画
    leftMoveAnimad:function(target,reverse){
        if(reverse){
            cc.moveBy(1,cc.p(-600,0));
        }else{
            target.x -= 600;
            cc.moveBy(1,cc.p(600,0));
        }
    },

    //右动画
    rightMoveAnimad:function(target,reverse){
        if(reverse){
            cc.moveBy(1,cc.p(600,0));
        }else{
            target.x += 600;
            cc.moveBy(1,cc.p(-600,0));
        }
    },

    // 上下动画
    MoveAnimad:function(){

    },

    // 点击事件
    Click(){
        this.Backgroup.on(cc.Node.EventType.TOUCH_START,(e)=>{
            this.startGame();
        });
        this.Lead.on(cc.Node.EventType.TOUCH_START,()=>{
            this.startGame();
        });
    },

    //开始游戏
    startGame(){
        cc.director.loadScene("game");//开始游戏
    },

    parentAdmin:function(){
        this.leftMoveAnimad(this.ShoppingMall);
        this.rightMoveAnimad(this.upgrade);
    },

    start () {
        cc.director.setDisplayStats(false);
    },

    update (dt) {

    },
});
