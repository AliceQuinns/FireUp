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
        MAX_BullerCreateSpeed:{default:8,tooltip:"子弹最大生产速度"},
        MAX_BullerMoveSpeed:{default:2000,tooltip:"子弹最大移动速度"},
        MAX_lifeRange: {default:400,tooltip:"方块最大生命值"},
    },
    getRouter: null,//获取配置列表
    onLoad () {
        // 开启碰撞检测系统
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;// 开启debug模式
        manager.enabledDrawBoundingBox=true;
        this.Fraction.zIndex=99;// 分数节点
        cc.director.setDisplayStats(false);//关闭调试
    },

    // 配置表
    configure:function(){
        let current=0;//数据与当前读取的元素下标
        // 读取配置文件
        cc.loader.loadRes("fireUP",(err,contents)=>{
            let data = contents.data;
            console.log(data);
            // 读取每行方块
            function getdata(){
                if(current>=data.length){
                    console.log('当前配置已读取完毕');
                    current = 0;//清空重新读取该配置表
                }
                let target = [],Record=0;//记录当前方块处于不存在状态的数量,如果5个都不存在则判定为空行
                for(let i=5;i--;){
                    let content = data[current];//单个数据
                    if(!content.c_type||content.c_type==='0'){
                        Record += 1;
                    }else{
                        target.push(content);
                    }
                    current += 1;
                }
                if(Record>=5){
                    return {status:false,target:target};//空行
                }else{
                    return {status:true,target:target};
                }
            }
            // 获取每阶段配置表
            function getRouter(){
                let target = [];
                let data = getdata();
                target.push(data.target);
                // 如果当前行不为空行则继续查找
                while (!!data.status){
                    data = getdata();
                    // 过滤空行
                    if(data.status){
                        target.push(data.target);
                    }
                }
                return target;
            }
            this.getRouter = getRouter;
        });
    },

    start () {
        this.configure();// 初始化配置表
        this.Block_Group_script = this.Block_Group.getComponent(Block_Group);//方块脚本对象
        this.LeadScript = this.Lead.getComponent(Lead);//主角脚本对象
        this.LeadScript.init(this.node);//初始化主角节点
        this.Block_Group_script.init(this);//初始化方块组
    },

    update (dt) {

    },
});
