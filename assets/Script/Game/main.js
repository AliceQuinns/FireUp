const Lead = require('Lead');
const Block_Group = require('Block_Group');

cc.Class({
    extends: cc.Component,

    properties: {
        Lead: cc.Node,
        Block_Group: cc.Node,
        Fraction: cc.Node,//分数节点
        accect: {default:1,tooltip:"游戏加速度"},
        MAX_BlockGroupMoveSpeen:{default:500,tooltip:"方块最大移动速度"},
        MAX_BlockGroupCreate:{default:100,tooltip:"方块最大生产速度"},
        MAX_BullerCreateSpeed:{default:2,tooltip:"子弹最大生产速度"},
        MAX_BullerMoveSpeed:{default:2000,tooltip:"子弹最大移动速度"},
        MAX_lifeRange: {default:400,tooltip:"方块最大生命值"},
    },

    // 修改方块组移动速度和生产速度
    setSpeen:function(dt){
        let accecthalf = this.accect/2;
        let life = (this.Block_Group_script.lifeRange = [this.Block_Group_script.lifeRange[0]+=accecthalf*dt,this.Block_Group_script.lifeRange[1]+=accecthalf*dt]),//生命值
            BlockGroupMoveSpeen = (this.Block_Group_script.BlockGroupMoveSpeen += this.accect*dt),//方块移动速度
            BlockGroupCreate = (this.Block_Group_script.BlockGroupCreate -= accecthalf*dt),//方块生产速度
            BullerCreateSpeed = (this.LeadScript.BullerCreateSpeed -= (this.accect/10)*dt),//子弹生产速度
            BullerMoveSpeed = (this.LeadScript.BullerMoveSpeed += this.accect*dt);//子弹移动速度

        // this.Block_Group_script.BlockGroupMoveSpeen += this.accect*dt;//移动速度
        // this.Block_Group_script.BlockGroupCreate -= accecthalf*dt;//生产速度
        // this.Block_Group_script.lifeRange = [life[0]+=accecthalf*dt,life[1]+=accecthalf*dt];//生命值
        // this.LeadScript.BullerCreateSpeed -= accecthalf*dt;//子弹生产速度
        // this.LeadScript.BullerMoveSpeed += this.accect*dt;//子弹移动速度

        if(BlockGroupMoveSpeen>=this.MAX_BlockGroupMoveSpeen){
            // 方块最大移动速度
            this.Block_Group_script.BlockGroupMoveSpeen = this.MAX_BlockGroupMoveSpeen;
        }
        if(BlockGroupCreate<=this.MAX_BlockGroupCreate){
            // 方块最大生产速度
            this.Block_Group_script.BlockGroupCreate = this.MAX_BlockGroupCreate;
        }
        if(BullerCreateSpeed<=this.MAX_BullerCreateSpeed){
            // 子弹最大生产速度
            this.LeadScript.BullerCreateSpeed = this.MAX_BullerCreateSpeed;
        }
        if(BullerMoveSpeed>=this.MAX_BullerMoveSpeed){
            // 子弹最大移动速度
            this.LeadScript.BullerMoveSpeed = this.MAX_BullerMoveSpeed*2;
        }
        if(life[1]>=this.MAX_lifeRange){
            this.Block_Group_script.lifeRange = [this.Block_Group_script.lifeRange[0],this.Block_Group_script.lifeRange[1]];
        }
    },

    onLoad () {
        // 开启碰撞检测系统
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;// 开启debug模式
        manager.enabledDrawBoundingBox=true;
        this.Fraction.zIndex=99;
        // cc.director.setDisplayStats(false);//关闭调试

        // 游戏难度曲线
        this.Block_Group_script = this.Block_Group.getComponent(Block_Group);//方块脚本对象
        this.LeadScript = this.Lead.getComponent(Lead);//主角脚本对象
        // this.BlockGroupMoveSpeen = this.Block_Group_script.BlockGroupMoveSpeen;//移动速度
        // this.BlockGroupCreate = this.Block_Group_script.BlockGroupCreate;//生产速度
        // this.lifeRange = this.Block_Group_script.lifeRange;//生命值
        // this.BullerCreateSpeed = this.LeadScript.BullerCreateSpeed;//子弹生产速度
        // this.BullerMoveSpeed = this.LeadScript.BullerMoveSpeed;//子弹移动速度
    },

    start () {
        this.LeadScript.init(this.node);//初始化主角节点
        this.Block_Group_script.init(this.node);//初始化方块组
    },

    update (dt) {
        this.setSpeen(dt);//游戏速度
    },
});
