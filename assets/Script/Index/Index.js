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
    },

    onLoad () {
        this.fingeranimation();//启动手指动画
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
        let left = cc.moveBy(1,cc.p(this.finger.width-offset,0)).easing(cc.easeIn(1.0));
        let right =  cc.moveBy(1,cc.p(-(this.finger.width-offset),0)).easing(cc.easeIn(1.0));
        target.runAction(cc.repeatForever(cc.sequence(left, right)));
    },

    start () {
        cc.director.setDisplayStats(false);
    },

    update (dt) {

    },
});
