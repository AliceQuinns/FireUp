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
        MAX_BullerCreateSpeed:{default:600,tooltip:"子弹最大生产速度"},
        MAX_BullerMoveSpeed:{default:600,tooltip:"子弹最大移动速度"},
        MAX_lifeRange: {default:400,tooltip:"方块最大生命值"},
    },

    // 修改方块组移动速度和生产速度
    setSpeen:function(dt){
        let life = this.Block_Group_script.lifeRange;//生命值数组
        if(this.Block_Group_script.BlockGroupMoveSpeen>=this.MAX_BlockGroupMoveSpeen){

        }

        this.Block_Group_script.BlockGroupMoveSpeen += this.accect*dt;//移动速度
        this.Block_Group_script.BlockGroupCreate -= accecthalf*dt;//生产速度
        this.Block_Group_script.lifeRange = [life[0]+=accecthalf*dt,life[1]+=accecthalf*dt];//生命值
        this.LeadScript.BullerCreateSpeed -= accecthalf*dt;//子弹生产速度
        this.LeadScript.BullerMoveSpeed += this.accect*dt;//子弹移动速度
    },

    onLoad () {
        // 开启碰撞检测系统
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;// 开启debug模式
        manager.enabledDrawBoundingBox=true;
        this.Fraction.zIndex=99;
        // cc.director.setDisplayStats(false);//关闭调试

        this.Block_Group_script = this.Block_Group.getComponent(Block_Group);//方块脚本对象
        this.LeadScript = this.Lead.getComponent(Lead);//主角脚本对象
    },

    start () {
        this.LeadScript.init(this.node);//初始化主角节点
        this.Block_Group_script.init(this.node);//初始化方块组
    },

    update (dt) {
        //this.setSpeen(dt);//游戏速度
    },
});
