cc.Class({
    extends: cc.Component,

    properties: {
        Blockchildren: [],//当前方块组下的全部方块
    },

    onLoad () {},

    init: function(moveSpeen,target,BlockPool,configure){
        this.moveSpeen = moveSpeen;//移动速度
        this.target = target;//父节点
        this.BlockPool = BlockPool;//方块对象池
        this.configure = configure;//配置表
        this.BlockWidth = this.node.width/this.configure.length;//单个方块的宽度
        this.limitLeft = -(this.node.width/2);// 方块组最左边坐标
        this.createBlock();
    },

    // 方块生成函数
    createBlock: function(){
        let self = this;
        for(let i=0;i<self.configure.length;i++){
            let content = self.configure[i];
            // 如果有则创建
            if(content){
                let target = self.PullPool();//创建方块
                this.Blockchildren.push(target);
                target.parent=self.node;
                target.setContentSize(self.BlockWidth,100);
                target.setPosition(cc.v2((self.limitLeft+self.BlockWidth*i),0));
                try{
                    target.getComponent('Block').init(content,i,this.target);//初始化方块
                }catch(e){
                    console.log(target.getComponent('Block'));
                    console.log('Block对象无法调用init方法');
                }
            }
        }
    },

    // 请求对象
    PullPool: function(){
        let target;
        if(this.BlockPool.size()>0){
            target = this.BlockPool.get();
        }else{
            target = cc.instantiate(this.target.Block);// new方块对象
        }
        return target;
    },

    start () {

    },

    update (dt) {
        if(this.target){
            if(this.node.y<=-(this.target.parents/2)){
                this.target.deletePool("BlockPool",this.node.children);//回收方块节点
                this.target.deletePool("BlockGroupPool",this.node);//回收方块组节点
            }else{
                this.node.y-=this.moveSpeen*dt;
            }
        }
    },
});
