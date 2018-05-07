
cc.Class({
    extends: cc.Component,

    properties: {
        score: 0//默认分数
    },

    setScore: function(text){
        let callback = cc.callFunc((score)=>{
            this.node.getComponent(cc.Label).string = (this.score += text);//修改生命值
        }, this.score);
        let jumpAction = cc.sequence(
            callback,
            cc.scaleTo(0.1, 0.8, 1.2),
            cc.scaleTo(0.2, 1.2, 1.2),
            cc.delayTime(0.5),
            cc.scaleTo(0.1, 1.2, 0.8),
            cc.scaleTo(0.2, 1.2, 1.2),
        ).speed(2);
        this.node.runAction(jumpAction);
    },

    onLoad () {},

    start () {

    },

    update (dt) {},
});
