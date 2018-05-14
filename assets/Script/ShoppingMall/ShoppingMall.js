

cc.Class({
    extends: cc.Component,

    properties: {
        return:cc.Node,
        Tab_a: cc.Node,
        Tab_b: cc.Node,
        Tab_A_btn: cc.Node,
        Tab_B_btn: cc.Node,
    },

    // 全部事件绑定
    event:function(){
        this.click(this.Tab_A_btn,()=>{this.tab(true)});
        this.click(this.Tab_B_btn,()=>{this.tab(false)});
        this.click(this.return,()=>{
            cc.director.loadScene('Index');
        });
    },

    // 点击事件
    click:(target,callback)=>{
        target.on(cc.Node.EventType.TOUCH_START,(e)=>{
            callback(e);
        })
    },

    // 生成动画
    CreateAnimation:function(target,coordinate,time){
        target.runAction(cc.moveTo(time,coordinate).easing(cc.easeBackInOut()));
    },

    // tab
    tab: function(swit){
        if(swit){
            this.CreateAnimation(this.Tab_a,cc.v2(0,-100),0.5);
            this.CreateAnimation(this.Tab_b,cc.v2(800,-100),0.5);
            this.Tab_A_btn.color = new cc.Color(255, 0, 0);
            this.Tab_B_btn.color = new cc.Color(255, 255, 255);
        }else{
            this.CreateAnimation(this.Tab_b,cc.v2(0,-100),0.5);
            this.CreateAnimation(this.Tab_a,cc.v2(800,-100),0.5);
            this.Tab_A_btn.color = new cc.Color(255, 255, 255);
            this.Tab_B_btn.color = new cc.Color(255, 0, 0);
        }
    },


    onLoad () {
        this.event();
    },

    start () {

    },

    // update (dt) {},
});
