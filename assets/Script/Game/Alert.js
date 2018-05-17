cc.Class({
    extends: cc.Component,

    properties: {
        top:cc.Node,//分数
        bottom:cc.Node,
        top_length:{default:0,tooltip:"top组件移动距离"},
        bottom_length:{default:0,tooltip:"bottom组件移动距离"},
        scorce: cc.Node, // 游戏场景分数节点
        top_canvas: cc.Sprite,// 分数渲染节点
        shopping: cc.Node,//商城按钮
        shareBtn: cc.Node,//排行榜按钮
    },

    init(){
        // 提高页面层级
        this.node.zIndex = 200;

        // 开启动画
        this.Action_move(true);

        // 修改分数
        if(window.wx){
            window.pushScore(2,String(this.scorce.getComponent(cc.Label).string));
        }

        // 开始游戏按钮
        this.click(cc.find("/bottom/start", this.node),()=>{
            this.Action_move();//开启反向动画
            window.setTimeout(()=>{
                cc.director.loadScene("Index");
            },1000);
        });

        // 商城按钮
        this.click(this.shopping,()=>{
            this.Action_move();//开启反向动画
            window.setTimeout(()=>{
                cc.director.loadScene("ShoppingMall");
            },1000);
        });

        // 排行榜按钮
        this.click(this.shareBtn,()=>{
           window.pushScore(3,null);
        });
    },

    // 绑定事件
    click:(target,callback)=>{
        target.on(cc.Node.EventType.TOUCH_START,(e)=>{
            callback(e);
        })
    },

    // 移动动画
    Action_move(Reversal){
        if(Reversal){
            this.top.runAction(cc.moveBy(0.5,0,-(this.top.y-this.top_length)).easing(cc.easeExponentialInOut()));
            this.bottom.runAction(cc.moveBy(0.8,0,Number(this.bottom_length)).easing(cc.easeExponentialInOut()));
        }else{
            this.top.runAction(cc.moveBy(0.5,0,880).easing(cc.easeExponentialInOut()));
            this.bottom.runAction(cc.moveBy(0.5,0,Number(-this.bottom_length)).easing(cc.easeExponentialInOut()));
        }
    },

    // 初始化开放域canvas
    WXopenDataContext:function(){
        if(window.wx){
            // 创建canvas
            this.wxtexture = new cc.Texture2D();
            sharedCanvas.width = this.top.width;
            sharedCanvas.height = this.top.height;
        }
    },

    wxMain:function(){
        if(this.wxtexture){
            this.wxtexture.initWithElement(sharedCanvas);
            this.wxtexture.handleLoadedTexture();
            this.top_canvas.spriteFrame = new cc.SpriteFrame(this.wxtexture);
        }
    },


    onLoad () {},

    start () {
        this.WXopenDataContext();
    },

    update (dt) {
        this.wxMain();
    },
});
