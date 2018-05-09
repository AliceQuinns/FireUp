cc.Class({
    extends: cc.Component,

    properties: {
        ONstart: false,// 子弹移动开关
    },

    init: function(BullerCreateSpeed,BullerMoveSpeed,BullerConcurrency,Lead){
        this.ONstart = true;//开启子弹运动
        this.BullerCreateSpeed = BullerCreateSpeed;//子弹生成速度
        this.BullerMoveSpeed = BullerMoveSpeed;//子弹移动速度
        this.BullerConcurrency = BullerConcurrency;//子弹连发数
        this.Lead = Lead;//Lead节点
    },

    // 销毁节点
    deleteObj: function(target){
        (target)?this.Lead.deleteBullet(target):this.Lead.deleteBullet(this.node);
    },

    // 碰撞回调
    onCollisionEnter: function(other,self){
       this.deleteObj(self.node);
    },

    onLoad () {
    },

    start () {

    },

    update (dt) {
        if(this.ONstart){
            // 判断是否移出场景
            if(this.node.y>this.Lead.parent.height){
                this.deleteObj();
            }else{
                this.node.y += this.BullerMoveSpeed*dt;
            }
        }
    },
});
