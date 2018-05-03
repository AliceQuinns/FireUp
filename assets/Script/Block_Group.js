cc.Class({
    extends: cc.Component,

    properties: {
        parents: cc.Node,//canvas节点
        Block: cc.Prefab,//单个方块
        Block_Group: cc.Prefab,//方块容器
        BlockGroupCreate: 30,//方块组最大生成速度  帧数
        BlockGroupMoveSpeen: 30,//方块组移动速度 帧数
        BlockGroupSize: 1,//单次生成数量
        BlockPoolSize: 20,//初始化方块对象池的数量
        BlockGroupPoolSize: 5,//初始化方块组对象池的数量
    },
    BlockGroupPool: null,//方块组对象池
    BlockPool:null,//方块对象池

    onLoad () {},

    init: function(target){
        this.BlockGroupSwitch = true;//开启
        this.BlockGroupPoolTime=0;// 控制方块组创建速度
    },

    // 创建节点池
    createPool: function(type,target,size){
        this[target] = new cc.NodePool();
        for(let i=size;i--;){
            let Node = cc.instantiate(type);
            this[target].put(Node);
        }
    },

    // 方块组生成
    createBlockGroupObj: function(BlockGroupSize){
        for(let i=BlockGroupSize;i--;){
            let target = null;
            if(this.BlockGroupPool.size()>0){
                target = this.BlockGroupPool.get();
            }else{
                target = cc.instantiate(this.Block_Group);
            }
            target.parent = this.parents;
            target.setPosition(cc.v2(this.node.x,(this.node.y+i*target.height)));
            target.getComponent('Block_Group_Obj').init(this.BlockGroupMoveSpeen,this);//初始化方块组
        }
    },

    // 回收节点
    deletePool:function(type,target){
        this[target].put(target);
    },

    start () {
        this.createPool(this.Block,'BlockPool',this.BlockPoolSize);//创建方块对象池
        this.createPool(this.Block_Group,'BlockGroupPool',this.BlockGroupPoolSize);//创建方块组对象池
    },

    update (dt) {
        if(this.BlockGroupSwitch){
            if(this.BlockGroupPoolTime>=this.BlockGroupCreate){
                this.createBlockGroupObj(this.BlockGroupSize);// 生成方块组并控制同时生成的数量
                this.BlockGroupPoolTime = 0;
            }
            this.BlockGroupPoolTime++;
        }
    },
});
