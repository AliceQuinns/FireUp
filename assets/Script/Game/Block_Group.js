cc.Class({
    extends: cc.Component,

    properties: {
        parents: cc.Node,//canvas节点
        Block: cc.Prefab,//单个方块
        // Block_Group: cc.Prefab,//方块容器
        BlockGroupMoveSpeen: {default:100,tooltip:"方块移动速度 每帧移动距离 正比"},
        BlockPoolSize: {default:20,tooltip:"初始化方块对象池的数量"},
        score: cc.Node,//分数节点
        scoreSize: {default:1,tooltip:"分数单次增加数量"},
        Aggressivity:{default:5,tooltip:"子弹攻击力"},
        // particle: {default:cc.Prefab,tooltip:"爆炸预制"},
        // BlockBoomSize:{default:20,tooltip:"初始化爆炸粒子对象池的数量"},
        // Block_Group_poolSize:{default:10,tooltip:"方块装载容器"}
    },
    BlockPool4:null,//4级方块对象池
    BlockPool5:null,//5级方块对象池
    // BlockBoom:null,//爆炸粒子对象池
    // Block_Group_pool:null,//方块装载容器

    onLoad () {},

    init: function(target){
        this.target = target.node;//入口节点
        this.target_scene = target;// 入口环境
        this.Block_Group_Y=this.node.y;// 方块生成Y轴位置
        this.Block_4 = this.parents.width/4;// 4方块宽度
        this.Block_5 = this.parents.width/5;// 5方块宽度
        this.limitLeft = -(this.parents.width/2);// 方块最左边坐标
        //this.createTimeBlock();//开始生产方块
        this.BlockGroupPoolTime = 0;
    },

    // 创建节点池  可以使用组件节点池
    createPool: function(type,target,size,nodepool_Type,set,leng){
        // 是否使用组件创建对象池
        if(nodepool_Type){
            this[target] = new cc.NodePool(nodepool_Type);
        }else{
            this[target] = new cc.NodePool();
        }
        for(let i=size;i--;){
            let Node = cc.instantiate(type);
            if(set){
                let BlockWidth = this[`Block_${leng}`];
                Node.width = BlockWidth;
                Node.height = BlockWidth;
                //修改包围盒
                let Box_collider = Node.getComponent(cc.CircleCollider);
                Box_collider.radius=BlockWidth/2;
                Box_collider.offset=cc.v2(BlockWidth>>1,BlockWidth>>1);
            }
            this[target].put(Node);
        }
        window[target] = this[target];// 暴露对象池
    },

    // 方块生成入口
    createBlockGroupObj: function(data){
        //console.log(data);
        let Block_Group_overlap=this.Block_Group_Y;// 用以计算多排方块的Y轴坐标
        if(data.length>=5){
            console.log('连续方块容器数量超过5排 游戏难度不符合');
            return;
        }
        for(let i = 0;i<data.length;i++){
            this.createBlock(Block_Group_overlap,data[i]);// 生成单排方块
            Block_Group_overlap += this[`Block_${data[i].length}`]; // 多排方块高度排序
        }
    },

    // 单排方块生成函数 y 是当前方块的Y轴坐标
    createBlock: function(Y,configure){
        let self = this,Block_type = configure.length;
        for(let i=0;i<Block_type;i++){
            let content = configure[i];// 单个方块配置信息
            // 如果有配置信息且方块的生命值大于0则生成方块
            if(content && content.life > 0){
                let target = self.Pull_Block_Pool(Block_type);//根据配置信息创建相应的方块
                let target_x = self.limitLeft+self[`Block_${Block_type}`]*i;// 计算方块x轴坐标
                target.setPosition(cc.v2(target_x,Y));
                let Block = target.getComponent('Block');
                try{
                    Block.init(content,this,`BlockPool${Block_type}`);//初始化方块
                }catch(e){
                    console.log('Block对象无法调用init方法');
                }
                self.parents.addChild(target);//添加到canvas
                // 判断节点是否可移动
                if(content.move){
                    let left_position = self[`Block_${Block_type}`]*content.moveLeft;//左移的距离 负
                    let right_position = self[`Block_${Block_type}`]*(content.moveRight)+left_position;//右移的距离 正
                    Block.Block_move(-left_position,right_position);//控制方块移动
                }
            }
        }
    },

    // 请求方块对象
    Pull_Block_Pool: function(len){
        let target;
        let BlockPool = this[`BlockPool${len}`];//获取节点池
        if(BlockPool.size()>0){
            target = BlockPool.get();
        }else{
            target = cc.instantiate(this.Block);// new方块对象
            let BlockWidth = this[`Block_${len}`];//获取方块尺寸
            target.width = BlockWidth;
            target.height = BlockWidth;
            //修改包围盒
            let Box_collider = target.getComponent(cc.CircleCollider);
            Box_collider.radius=BlockWidth/2;
            Box_collider.offset=cc.v2(BlockWidth>>1,BlockWidth>>1);
        }
        return target;
    },


    // 回收节点
    deletePool:function(type,target){
        //判断是否为数组
        if(Object.prototype.toString.bind(target)()==="[object Array]"){
            for(let i =0;i<=target.length;i++){
                this[type].put(target[i]);
            }
        }else{
            if(this[type]){
                this[type].put(target);
            }else{
                console.log("对象找不到");
                console.log(this[type]);
            }
        }
    },

    // sw为true修改分数 false获取分数
    setScore (sw){
        if(sw){
            this.score.getComponent('Score').setScore(this.scoreSize);
        }else{
            return Number(this.score.getComponent(cc.Label).string);
        }
    },

    // //请求爆炸粒子
    // ctrParticle: function(pos,parent){
    //     let target = null;
    //     if(this.BlockBoom.size()>0){
    //         target = this.BlockBoom.get();
    //     }else{
    //         target = cc.instantiate(this.particle);
    //     }
    //     target.parent = parent;
    //     target.setPosition(pos);
    // },

    //随机算法
    getRandomInt: function(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    },

    start () {
        this.createPool(this.Block,'BlockPool4',this.BlockPoolSize,"Block",true,4);//创建4级方块对象池
        this.createPool(this.Block,'BlockPool5',this.BlockPoolSize,"Block",true,5);//创建5级方块对象池
        //this.createPool(this.particle,'BlockBoom',this.BlockBoomSize);//创建爆炸粒子对象池
        // this.createPool(this.Block_Group,'Block_Group_pool',this.Block_Group_poolSize);//创建方块装载容器
    },

    // // 生产方块
    // createTimeBlock(){
    //     this.schedule(function () {
    //     }.bind(this), window.FireUp.BloceCreateSpeed);
    // },

    update:function(dt){
        if(this.BlockGroupPoolTime >= window.FireUp.BloceCreateSpeed){
            this.createBlockGroupObj(this.target_scene.getRouter());// 读取配置表并生成方块组
            this.BlockGroupPoolTime = 0;
        }
        this.BlockGroupPoolTime++;
    }
});
