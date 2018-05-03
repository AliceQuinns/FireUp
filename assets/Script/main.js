const Lead = require('Lead');
const Block_Group = require('Block_Group');

cc.Class({
    extends: cc.Component,

    properties: {
        Lead: cc.Node,
        Block_Group: cc.Node,
    },
    onLoad () {
        // 开启碰撞检测系统
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;// 开启debug模式
    },

    start () {
        this.Lead.getComponent(Lead).init(this.node);//初始化主角节点
        this.Block_Group.getComponent(Block_Group).init(this.node);//初始化方块组
    },

    update (dt) {},
});
