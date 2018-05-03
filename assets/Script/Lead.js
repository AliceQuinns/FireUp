cc.Class({
    extends: cc.Component,

    properties: {
        parent: cc.Node,// canvas节点
        Bullet: cc.Prefab,// 子弹节点
        BullerCreateSpeed: 0,//子弹生成速度  帧数
        BullerMoveSpeed: 0,//子弹移动速度  帧数
        BullerConcurrency: 1,//子弹连发数
        defaultNodeSize: 20,//初始化子弹对象池长度
        BulletTime: 0,//用以控制子弹生产时间
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

    onLoad () {
        this.node.zIndex=100;
        // 修改包围盒
        let Box_collider = this.node.getComponent(cc.BoxCollider);
        Box_collider.size=cc.v2(this.node.width,this.node.height);
        Box_collider.offset=cc.v2(0,this.node.height>>1);
    },

    start () {

    },

    update (dt) {
        if(this.ObjPool.size()>=20){
            console.log('当前最大节点池数量',this.ObjPool);
        }
        if(this.BulletTime>=this.BullerCreateSpeed){
            this.BulletTime = 0;
            this.createBullet();// 创建子弹
        }
        this.BulletTime++;
    },
});


