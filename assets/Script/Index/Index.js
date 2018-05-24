cc.Class({
    extends: cc.Component,

    properties: {
        finger: cc.Node,//手指节点
        ShoppingMall: cc.Node,//商城
        upgrade: cc.Node,//排行榜
        title: cc.Node,//标题
        Finger: cc.Node,//手
        Backgroup: cc.Node,//背景节点
        Lead: cc.Node,//主角节点
        Lead_content:cc.Node,//信息面板
        audio_on:cc.Node,//音频按钮
        Setup:cc.Node,//设置按钮
        upgrade_content:cc.Node,//排行榜节点
        wxdisplay: cc.Sprite,//微信排行榜
        audio:{
            default: null,
            url: cc.AudioClip
        },
        audio_sprite: {
            default: [],
            type: cc.SpriteFrame
        },
        audio_switch: true,//是否默认开启音乐
        setup_status: true,//是否开启设置面板
    },

    onLoad () {
        this.Animationmain();//启动动画
        this.Event_target();//初始化全部事件
        //this.Audio_status();//背景音乐控制
    },

    // 初始位置
    startPOS:function(){
        this.ShoppingMall.x = 0;// 商城
        this.upgrade.x = 0;//排行榜
    },

    // 总动画入口
    Animationmain:function(){
        this.fingeranimation();//启动手指动画
        this.BottomAnimation();//下移动画
        this.TopAnimation();//上移动画
        this.RightAnimation();//右移动画
        this.LeftAnimation();//左移动画
        this.ElasticAnimation(this.Lead,1);//主角弹性动画
    },

    // 生成动画
    CreateAnimation:function(target,coordinate,time){
        target.runAction(cc.moveBy(time,coordinate).easing(cc.easeBackInOut()));
    },

    // 上移动画
    TopAnimation:function(){
        this.CreateAnimation(this.Finger,cc.p(0,150),0.5);// 手
    },

    // 右移动画
    RightAnimation:function(){
        //this.CreateAnimation(this.ShoppingMall,cc.p(270,0),0.5);// 商城
        this.setup();//设置面板
    },

    // 左移动画
    LeftAnimation:function(){
        //this.CreateAnimation(this.upgrade,cc.p(-238,0),0.5);//排行榜
        this.CreateAnimation(this.Lead_content,cc.p(-300,0),0.8);//信息面板
    },

    // 下移动画
    BottomAnimation:function(){
        this.CreateAnimation(this.title,cc.p(0,-285),0.2);// 游戏标题
    },

    // 反向动画
    reverseAnimation:function(){
        this.CreateAnimation(this.Finger,cc.p(0,-150),0.5);// 手
        this.CreateAnimation(this.ShoppingMall,cc.p(-270,0),0.5);// 商城
        this.CreateAnimation(this.title,cc.p(0,285),0.2);// 游戏标题
        this.CreateAnimation(this.Lead_content,cc.p(300,0),0.8);// 信息面板
        this.CreateAnimation(this.upgrade,cc.p(250,0),0.5);// 升级
        this.CreateAnimation(this.Lead,cc.p(0,1080),1);// 主角移动
        this.CreateAnimation(this.audio_on,cc.p(-220,0),0.5);// 音频
        // this.CreateAnimation(this.shock,cc.p(-410,0),0.8);// 震动
    },

    // 弹性动画
    ElasticAnimation:function(target,frequency){
        let jumpAction = cc.sequence(
            cc.scaleTo(0.1, 0.5, 1.1),
            cc.scaleTo(0.1, 1, 1),
            cc.scaleTo(0.1, 1.1, 0.5),
            cc.scaleTo(0.1, 1, 1),
        ).repeat(frequency);
        target.runAction(jumpAction);
    },

    // 点击事件
    click:(target,callback)=>{
        target.on(cc.Node.EventType.TOUCH_START,(e)=>{
            callback(e);
        })
    },

    // 事件反注册
    offClick:(target)=>{
        target.off(cc.Node.EventType.TOUCH_START);
    },

    // 开始游戏
    start_game:function(){
        this.node.runAction(cc.fadeOut(1.0));
        this.AudioCtr(false,'audio');// 关闭背景音乐
        setTimeout(()=>{cc.director.loadScene("game")},1000);
    },

    // 商城界面
    shopping_Mall:function(){
        cc.director.loadScene('ShoppingMall');
    },

    // 手指图标动画  偏移量为100
    fingeranimation: function(){
        let offset = 200;
        let target = this.finger.children[0];//手指节点
        let max = (this.finger.width-offset)/2;
        target.x = -max;//初始化位置
        let left = cc.moveBy(1,cc.p(this.finger.width-offset,0)).easing(cc.easeQuadraticActionIn());
        let right =  cc.moveBy(1,cc.p(-(this.finger.width-offset),0)).easing(cc.easeQuadraticActionIn());
        target.runAction(cc.repeatForever(cc.sequence(left, right)));
    },

    // 静音按钮
    Mute:function(){
        this.audio_switch = !this.audio_switch;
        this.Audio_status();
    },

    // 音乐状态控制
    Audio_status:function(){
         if(this.audio_switch){
             this.audio_on.getComponent(cc.Sprite).spriteFrame=this.audio_sprite[0];
             this.AudioCtr(true,'audio');// 开启背景音乐
         }else{
             this.audio_on.getComponent(cc.Sprite).spriteFrame = this.audio_sprite[1];
             this.AudioCtr(false,'audio');// 关闭背景音乐
         }
    },

    // 设置面板
    setup: function(){
        if(this.setup_status){
            this.CreateAnimation(this.audio_on,cc.p(220,0),0.5);// 音频
            //this.CreateAnimation(this.shock,cc.p(410,0),0.8);// 震动
        }else{
            this.CreateAnimation(this.audio_on,cc.p(-220,0),0.5);// 音频
            //this.CreateAnimation(this.shock,cc.p(-410,0),0.8);// 震动
        }
    },

    // 设置按钮
    setup_btn:function(){
        this.click(this.Setup,()=>{
            this.setup_status = !this.setup_status;
            this.setup();
        });
    },

    // 全部事件入口
    Event_target:function(){
        // 音乐切换按钮
        this.click(this.audio_on,()=>{
            this.Mute();
        });
        // 设置按钮
        this.setup_btn();
        // 排行榜
        this.click(this.upgrade,()=>{this.RankingList()});
        //主角点击弹动
        this.click(this.Lead,()=>{this.ElasticAnimation(this.Lead,1)});
        //点击背景图开始游戏
        this.click(this.Backgroup,(e)=>{
            e.stopPropagation();// 停止事件冒泡
            this.reverseAnimation();// 开启反向动画
            this.offClick(this.Backgroup);//关闭点击事件
            this.AudioCtr(false,'audio');// 关闭背景音乐
            window.setTimeout(()=>{
                this.start_game();
            },1000);
        });
        // 商城
        this.click(this.ShoppingMall,(e)=>{
            e.stopPropagation();// 停止事件冒泡
            this.reverseAnimation();// 开启反向动画
            this.offClick(this.Backgroup);//关闭点击事件
            this.AudioCtr(false,'audio');// 关闭背景音乐
            window.setTimeout(()=>{
                this.shopping_Mall();
            },1000);
        })
    },

    // 音频开关
    AudioCtr: function(sw,target){
        if(sw){
            this[`${target}_ctr`] = cc.audioEngine.play(this[`${target}`], true, 1);
        }else{
            cc.audioEngine.stop(this[`${target}_ctr`]);
        }
    },

    // 开启排行榜
    RankingList:function(){
        if(this.upgrade_content.y>=1000){
            this.CreateAnimation(this.upgrade_content,cc.p(0,-1280),0.4);
        }
        if(wx){
            window.pushScore(3,null);
        }
    },

    // 关闭排行榜
    closeRankingList:function(){
        this.CreateAnimation(this.upgrade_content,cc.p(0,1280),0.3);
    },

    // 微信开放域
    WeChat:function(){
        let self = this;
        if(window.wx){
            // 创建canvas
            this.wxtexture = new cc.Texture2D();
        }
    },

    wxMain:function(){
        if(this.wxtexture){
            this.wxtexture.initWithElement(sharedCanvas);
            this.wxtexture.handleLoadedTexture();
            this.wxdisplay.spriteFrame = new cc.SpriteFrame(this.wxtexture);
        }
    },

    start () {
        this.WeChat();
        cc.director.preloadScene("game", function () {
            cc.log("预加载");
        });
    },

    update (dt) {
        this.wxMain();
    },
});
