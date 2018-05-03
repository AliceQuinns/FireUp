cc.Class({
    extends: cc.Component,

    properties: {
        parents: cc.Node,//canvas节点
        Block: cc.Prefab,//单个方块
        Block_Group: cc.Prefab,//方块容器
        BlockGroupCreate: {default:30,tooltip:"方块组生成速度 帧数"},
        BlockGroupMoveSpeen: {default:30,tooltip:"方块组移动速度 帧数"},
        BlockGroupSize: {default:1,tooltip:"单次生成方块组数量"},
        BlockPoolSize: {default:20,tooltip:"初始化方块对象池的数量"},
        BlockGroupPoolSize: {default:5,tooltip:"初始化方块组对象池的数量"},
        BlockCreateSize:{default:5,tooltip:"单个方块组对象的方块数量"},
        lifeRange: {default:[],type:[cc.Integer],tooltip:"生命值取值范围"},
        BlockGroupHeight:{default: 100,tooltip:"方块组的高度"},
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
            target.zIndex=98;
            target.setContentSize(this.parents.width,this.BlockGroupHeight);
            target.setPosition(cc.v2(this.node.x,(this.node.y+i*target.height)));
            target.getComponent('Block_Group_Obj').init(this.BlockGroupMoveSpeen,this,this.BlockPool,this.addBlockMethod());//初始化方块组
        }
    },

    // 回收节点
    deletePool:function(type,target){
        //判断是否为数组
        if(Object.prototype.toString.bind(target)()=="[object Array]"){
            for(let i =0;i<=target.length;i++){
                this[type].put(target[i]);
            }
        }else{
            this[type].put(target);
        }
    },

    //随机算法
    getRandomInt: function(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    },


    // 单组方块组配置算法 [{生命值,特殊功能,是否移动,移动距离},false]
    addBlockMethod:function(){
        let configure = [];//配置表
        for(let i=0;i<this.BlockCreateSize;i++){
            let target={};// 配置表
            //判断该方块是否生成 10%概率
            if(this.getRandomInt(0,50)){
                if(this.lifeRange[0]<=0)this.lifeRange[0]=1;//防止出现生命值为0的方块
                target.life = this.getRandomInt(this.lifeRange[0],this.lifeRange[1]);//生命值
                // 特殊功能
                if(this.getRandomInt(0,50)==0){
                    target.special=true;
                }
                // 是否可移动
                if(this.getRandomInt(0,10)==0){
                    target.move=true;
                    //移动距离
                    target.moveDistance=this.getRandomInt(0,this.BlockCreateSize/2);
                }
            }else{
                target = false;
            }
            configure.push(target);
        }
        return configure;
    },

    start () {
        this.createPool(this.Block,'BlockPool',this.BlockPoolSize);//创建方块对象池
        this.createPool(this.Block_Group,'BlockGroupPool',this.BlockGroupPoolSize);//创建方块组对象池
        this.createBlockGroupObj(this.BlockGroupSize);// 防止开始游戏时延时过长不创建方块体
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
