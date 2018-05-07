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
        this.labelNode.getComponent(cc.Label).string = configure.life;//设置生命值
        this.setColoe();//修改颜色
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
            this.Score();//修改分数
        }
    },

    // 修改得分
    Score:function(){
        this.target.score.getComponent('Score').setScore(1);
    },

    onLoad () {
    },

    start () {

    },

    // update (dt) {},
});
