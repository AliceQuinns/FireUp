cc.Class({
    extends: cc.Component,

    properties: {
        Blockchildren: [],//当前方块组下的全部方块
        Box_Collider_botton: 10,//底部包围盒高度
    },

    MaxY: 0,// Y轴回收峰值

    onLoad () {},

    init: function(target,data){
        this.moveSpeen = target.BlockGroupMoveSpeen;// 移动速度
        this.target = target;// 父节点
        this.BlockPool = target.BlockPool;// 方块对象池
        this.configure = data;// 配置表
        this.BlockWidth = target.BlockGroupHeight;// 方块的宽高
        this.limitLeft = -(this.node.width/2);// 方块组最左边坐标
        this.MaxY=-(this.target.parents.height/2+this.node.height);//回收最大距离
        this.createBlock(); //生成方块
    },

    // 方块生成函数
    createBlock: function(){
        let self = this;
        for(let i=0;i<self.configure.length;i++){
            let content = self.configure[i];
            // 如果有配置且方块的生命值大于0
            if(content && Number(content.hp) > 0){
                let target = self.PullPool();//创建方块
                target.parent=self.node;
                target.width = self.BlockWidth;
                target.height = self.BlockWidth;
                target.setPosition(cc.v2((self.limitLeft+self.BlockWidth*i),0));
                try{
                    let Block = target.getComponent('Block');
                    Block.init(content,this.target);//初始化方块
                    //修改包围盒
                    let Box_collider = Block.getComponent(cc.BoxCollider);
                    Box_collider.size=cc.size(self.BlockWidth,self.BlockWidth);
                    Box_collider.offset=cc.v2(self.BlockWidth>>1,self.BlockWidth>>1);
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
            if(this.node.y<=this.MaxY){
                this.target.deletePool("BlockPool",this.node.children);//回收方块节点
                this.node.destroy();//删除方块容器
            }else{
                this.node.y-=this.moveSpeen*dt;
            }
        }
    },
});
