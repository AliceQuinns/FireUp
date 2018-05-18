cc.Class({
    extends: cc.Component,

    properties: {
        labelNode: cc.Node,//文字节点
        Blockcolor:{default:[],type:cc.Color,tooltip:"方块颜色数组"},
        life: 1,//方块生命值
    },

    init: function(configure,target,parent,pooltype){
        this.life = configure.life;//生命值
        this.target=target;// Block_group节点
        this.labelNode.getComponent(cc.Label).string = configure.life;//设置生命值
        this.Aggressivity = target.Aggressivity;//攻击力
        this.parent_obj = parent;//上级父节点
        this.pooltype = pooltype;//节点池类型
        this.setColoe();//修改颜色
    },

    // 修改方块生命值
    setLife: function(target){
        if(this.life<=0){
            // 执行销毁动作
            if(target){
                this.target.ctrParticle(cc.v2(this.node.x+this.node.width/2,this.node.y),this.parent_obj);//创建爆炸粒子
                this.target.deletePool(this.pooltype,target);//回收方块节点
            }
        }else{
            // 递减生命值
            this.labelNode.getComponent(cc.Label).string = this.life;
        }
    },

    // 修改方块颜色
    setColoe:function(){
        this.node.color = this.Blockcolor[this.getRandomInt(0,5)] || new cc.Color("#00FFEB");//取随机颜色
    },

    // 随机数
    getRandomInt: function(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    },

    // 控制方块移动
    Block_move:function(left,right){
        let sction = cc.repeatForever(
            cc.sequence(
                cc.moveTo(2,left),
                cc.moveTo(2,right)
            )
        );
        sction.setTag(1);//动作tag
        this.node.runAction(sction);
    },

    // 对象池回收反注册
    unuse:function(){
        this.node.stopActionByTag(1);//清除动作
    },

    // 碰撞回调
    onCollisionEnter: function(other,self){
        // 与子弹发生碰撞时减少生命值
        if( other.tag === 2 ){
            this.life -= Math.floor(this.Aggressivity);
            this.setLife(self.node);//设置生命值
            this.setColoe();//修改颜色
            this.Score();//修改分数
        }
    },

    // 修改得分
    Score:function(){
        this.target.setScore(true);//修改分数
    },

    onLoad () {
    },

    start () {
    },

    // update (dt) {},
});
