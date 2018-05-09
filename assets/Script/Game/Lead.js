cc.Class({
    extends: cc.Component,

    properties: {
        parent: cc.Node,// canvas节点
        Bullet: cc.Prefab,// 子弹节点
        BullerCreateSpeed: {default:0,tooltip:"子弹生成速度"},
        BullerMoveSpeed: {default:0,tooltip:"子弹移动速度"},
        BullerConcurrency: 1,//子弹连发数
        defaultNodeSize: 20,//初始化子弹对象池长度
        BulletTime: 0,//用以控制子弹生产时间
        switchBullet: true,//控制子弹生产开关
        Alert: cc.Node,//弹框
    },
    maxX: 0,//最大移动距离
    ObjPool:null, //子弹节点池

    // 初始化
    init: function(target){
        this.maxX = this.parent.width/2-(this.node.width/2);//设置最大移动距离
        this.touch(target);//初始化触摸事件
        this.initBulletPool();//初始化子弹对象池
    },

    // 拖动事件
    touch: function(target){
        if(!!target){
            target.on(cc.Node.EventType.TOUCH_MOVE,(e)=>{
                let delta = e.touch.getDelta();
                this.node.x += delta.x;
                if(Math.abs(this.node.x) >= Math.abs(this.maxX)){
                    this.node.x = this.maxX * this.node.x / Math.abs(this.node.x);
                }
            })
        }
    },

    // 创建子弹
    createBullet: function(){
        if(this.ObjPool){
            let target = null;
            if(this.ObjPool.size()>0){
                target = this.ObjPool.get();
            }else{
                target = cc.instantiate(this.Bullet);
            }
            target.parent = this.parent;
            target.zIndex=99;
            target.setPosition(cc.v2(this.node.x,this.node.y));
            target.getComponent('Bullet').init(this.BullerCreateSpeed,this.BullerMoveSpeed,this.BullerConcurrency,this);
        }
    },

    // 开启弹框
    alert: function(){
        // 获取相关节点
        let bg = this.Alert.children[0];//背景节点
        let content = this.Alert.children[1];//内容节点
        let share = content.children[2];// 分享按钮
        let start = content.children[1];// 开始游戏按钮
        let fraction = content.children[0];// 游戏分数

        // 初始化节点相关属性
        this.Alert.zIndex=200;
        bg.opacity = 100;
        content.y=0;

        // 执行动画
        let rotate_360 = cc.rotateBy(1,360).easing(cc.easeIn(2.0));
        let moveBottom =  cc.moveTo(1, cc.p(0, 0)).easing(cc.easeIn(2.0));

        // 点击操作
        start.on(cc.Node.EventType.TOUCH_START,(e)=>{
            cc.director.loadScene("Index");//重新开始
        })
    },

    // 子弹对象池创建
    initBulletPool: function () {
        this.ObjPool = new cc.NodePool();//新建节点池
        for(let i=this.defaultNodeSize;i--;){
            let elements = cc.instantiate(this.Bullet);//创建新节点
            this.ObjPool.put(elements);
        }
    },

    // 子弹回收
    deleteBullet: function(target){
        this.ObjPool.put(target);//回收子弹
    },

    // 碰撞回调
    onCollisionEnter: function(other,self){
        // 判断游戏是否结束
        if(this.switchBullet){
            // 发生碰撞
            if(other.tag===0){
                //game over
                this.switchBullet = false;//关闭子弹生产
                this.node.opacity = 0;//隐藏节点
                this.alert();//开启弹框
            }else if(other.tag===1){
                // // 限制移动
                // let maxMove = self.node.convertToWorldSpaceAR(cc.v2(other.node.getPosition()));
                // let targetPos = self.node.convertToWorldSpaceAR(cc.v2(this.node.getPosition()));
                // if(maxMove.x<targetPos.x){
                //     console.log('碰撞体在左边');
                // }else if(maxMove.x>targetPos.x){
                //     console.log('碰撞体在右边');
                // }
            }
        }
    },

    onLoad () {
        this.node.zIndex=100;
    },

    start () {

    },

    update (dt) {
        if(this.switchBullet){
            if(this.BulletTime>=this.BullerCreateSpeed){
                this.BulletTime = 0;
                this.createBullet();// 创建子弹
            }
            this.BulletTime++;
        }
    },
});


