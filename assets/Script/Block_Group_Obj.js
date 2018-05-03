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
        maxY: -960,//最大移动距离
    },

    onLoad () {},

    init: function(moveSpeen,target){
        this.moveSpeen = moveSpeen;//移动速度
        this.target = target;//父节点
    },

    start () {

    },

    update (dt) {
        if(this.target){
            if(this.node.y<=this.maxY){
                this.target.deletePool(this.node);//回收节点
            }else{
                this.node.y-=this.moveSpeen*dt;
            }
        }
    },
});
