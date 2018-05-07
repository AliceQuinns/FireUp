cc.Class({
    extends: cc.Component,

    properties: {
        Blockchildren: [],//当前方块组下的全部方块
        Box_Collider_botton: 10,//底部包围盒高度
    },

    MaxY: 0,// Y轴回收峰值

    onLoad () {},

    init: function(moveSpeen,target,BlockPool,configure,BlockWidth){
        this.moveSpeen = moveSpeen;//移动速度
        this.target = target;//父节点
        this.BlockPool = BlockPool;//方块对象池
        this.configure = configure;//配置表
        this.BlockWidth = BlockWidth;//单个方块的宽度
        this.limitLeft = -(this.node.width/2);// 方块组最左边坐标
        this.MaxY=-(this.target.parents.height/2+this.node.height);//回收最大距离
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
                //this.Blockchildren.push(target);
                target.parent=self.node;
                target.setContentSize(self.BlockWidth,self.BlockWidth);
                target.setPosition(cc.v2((self.limitLeft+self.BlockWidth*i),0));
                try{
                    let Block = target.getComponent('Block')
                    Block.init(content,i,this.target);//初始化方块
                    //修改包围盒
                    let Box_collider = Block.getComponent(cc.BoxCollider);
                    let PolyGonCollider = Block.getComponent(cc.PolygonCollider);
                    Box_collider.size=cc.size(self.BlockWidth,self.Box_Collider_botton);
                    Box_collider.offset=cc.v2(self.BlockWidth>>1,self.Box_Collider_botton>>1);
                    PolyGonCollider.points = [
                        cc.v2(0,self.Box_Collider_botton),
                        cc.v2(0,self.BlockWidth),
                        cc.v2(self.BlockWidth,self.Box_Collider_botton),
                        cc.v2(self.BlockWidth,self.BlockWidth)
                    ];
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
                this.target.deletePool("BlockGroupPool",this.node);//回收方块组节点
            }else{
                this.node.y-=this.moveSpeen*dt;
            }
        }
    },
});
