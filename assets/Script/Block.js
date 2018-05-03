cc.Class({
    extends: cc.Component,

    properties: {
        labelNode: cc.Node,//文字节点
        Blockcolor:{default:[],type:cc.Color,tooltip:"方块颜色数组"},
        life: 0,//方块生命值
    },

    init: function(configure,index,target){
        this.life = configure.life;
        this.target=target;
        this.setLife();//设置生命值
        this.setColoe();//修改颜色
    },

    // 修改方块生命值
    setLife: function(){
        if(this.life<=0){
            // 执行销毁动作
            this.target.deletePool("BlockPool",this.Blockchildren);//回收方块节点
        }else{
            // 递减生命值
            this.labelNode.getComponent(cc.Label).string = this.life;
        }
    },

    // 修改方块颜色
    setColoe:function(){
        this.node.color = this.Blockcolor[this.getRandomInt(0,5)] || "#00FFEB";//取随机颜色
    },

    // 随机数
    getRandomInt: function(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    },

    // 碰撞回调
    onCollisionEnter: function(other,self){
        console.log(other,self);
        this.life -= 1;
        this.setLife();//设置生命值
    },

    onLoad () {
        // 修改包围盒
        let Box_collider = this.node.getComponent(cc.BoxCollider);
        Box_collider.size=cc.v2(this.node.width,this.node.height);
        Box_collider.offset=cc.v2(this.node.width>>1,this.node.height>>1);
    },

    start () {

    },

    // update (dt) {},
});
