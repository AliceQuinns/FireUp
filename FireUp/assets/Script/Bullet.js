cc.Class({
    extends: cc.Component,

    properties: {
        ONstart: false,// 子弹移动开关
        maxY: 960,// 最大回收距离
    },

    init: function(BullerCreateSpeed,BullerMoveSpeed,BullerConcurrency,Lead){
        this.ONstart = true;//开启子弹运动
        this.BullerCreateSpeed = BullerCreateSpeed;//子弹生成速度
        this.BullerMoveSpeed = BullerMoveSpeed;//子弹移动速度
        this.BullerConcurrency = BullerConcurrency;//子弹连发数
        this.Lead = Lead;//Lead节点
        console.log(BullerCreateSpeed,BullerMoveSpeed,BullerConcurrency);
    },

    onLoad () {},

    start () {

    },

    update (dt) {
        if(this.ONstart){
            // 判断是否移出场景
            if(this.node.y>this.maxY){
                this.Lead.deleteBullet(this.node);//回收节点
            }else{
                this.node.y += this.BullerMoveSpeed*dt;
            }
        }
    },
});
