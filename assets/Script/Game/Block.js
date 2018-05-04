cc.Class({
    extends: cc.Component,

    properties: {
        labelNode: cc.Node,//文字节点
        Blockcolor:{default:[],type:cc.Color,tooltip:"方块颜色数组"},
        life: 0,//方块生命值
        Box_Collider_botton: 10,//底部包围盒高度
    },

    init: function(configure,index,target){
        this.life = configure.life;
        this.target=target;
        this.setLife();//设置生命值
        this.setColoe();//修改颜色
        //修改包围盒
        let Box_collider = this.node.getComponent(cc.BoxCollider);
        let PolyGonCollider = this.node.getComponent(cc.PolygonCollider);
        Box_collider.size=cc.size(this.node.width,this.Box_Collider_botton);
        Box_collider.offset=cc.v2(this.node.width>>1,this.Box_Collider_botton>>1);
        PolyGonCollider.points = [
            cc.v2(0,this.Box_Collider_botton),
            cc.v2(0,this.node.height),
            cc.v2(this.node.width,this.Box_Collider_botton),
            cc.v2(this.node.width,this.node.height)
        ];
    },

    // 修改方块生命值
    setLife: function(target){
        if(this.life<=0){
            // 执行销毁动作
            if(target){
                this.target.deletePool("BlockPool",target);//回收方块节点
            }
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
        // 与子弹发生碰撞时才剑减少生命值
        if( other.tag === 2 ){
            this.life -= 1;
            this.setLife(self.node);//设置生命值
            this.setColoe();//修改颜色
        }
    },

    onLoad () {
    },

    start () {

    },

    // update (dt) {},
});
