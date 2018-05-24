cc.Class({
    extends: cc.Component,

    properties: {
        labelNode: cc.Node,//文字节点
        BlockSkin_sprite: {
            default: [],
            type: cc.SpriteFrame,
            tooltip:"方块皮肤"
        },
        life: 1,//方块生命值
    },

    init: function(configure,target,pooltype){
        this.life = configure.life;//生命值
        this.moveSpeen = target.BlockGroupMoveSpeen;//方块移动速度
        this.target=target;// Block_group节点
        this.MaxY=-(target.parents.height/2+this.node.height);//回收最大距离
        this.labelNode.getComponent(cc.Label).string = configure.life;//设置生命值
        this.Aggressivity = target.Aggressivity;//攻击力
        this.pooltype = pooltype;// 当前节点所属节点池
        this.open = true;// 开启运动
        this.setColoe();//修改颜色
    },

    // 修改方块生命值
    setLife: function(target){
        if(this.life<=0){
            // 执行销毁动作
            if(target){
                if(this.open){
                    this.open =false;
                    this.node.runAction(cc.fadeOut(0.2));
                    this.node.group = 'default';// 动画播放期间不碰撞
                    this.target.target_scene.AudioCtr(true,'Bullet_Hit_audio',false);
                    this.Animation();
                }
            }
        }else{
            // 递减生命值
            this.labelNode.getComponent(cc.Label).string = this.life;
        }
    },

    // 爆炸动画
    Animation:function(){
        let anim = this.node.getChildByName("Boom").getComponent(cc.Animation);
        anim.play('Boom');
        anim.on('finished',this.OnComplete, this);
    },

    // 动画回调
    OnComplete:function(){
        this.target.deletePool(this.pooltype,this.node);//回收方块节点
    },

    // 修改方块皮肤
    setColoe:function(){
        this.node.getComponent(cc.Sprite).spriteFrame = this.BlockSkin_sprite[this.getRandomInt(0,5)] || this.BlockSkin_sprite[0];
    },

    // 随机数
    getRandomInt: function(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    },

    // 控制方块移动
    Block_move:function(left,right){
        let sction = cc.repeatForever(
            cc.sequence(
                cc.moveBy(1.5,cc.p(left,0)),
                cc.moveBy(1.5,cc.p(right,0))
            )
        );
        sction.setTag(1);//动作tag
        this.node.runAction(sction);
    },

    // 节点start
    reuse:function(){

    },

    // 节点end
    unuse:function(){
        this.open = false;// 关闭运动
        this.node.stopActionByTag(1);//清除动作
        this.node.group = 'Block';// 动画结束开启碰撞检查
        this.node.opacity = 255;
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

    update (dt) {
        if(this.open){
            if(this.node.y<=this.MaxY){
                this.target.deletePool(this.pooltype,this.node);//回收方块装载容器
            }else{
                this.node.y-=this.moveSpeen*dt;
            }
        }
    },
});
