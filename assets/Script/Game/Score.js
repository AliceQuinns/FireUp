
cc.Class({
    extends: cc.Component,

    properties: {
        score: 0,//默认分数
        BulletColor:{default:[],type:cc.Color,tooltip:"子弹颜色"},
    },

    setScore: function(text){
        let callback = cc.callFunc((score)=>{
            if(this.score>=500){
                window.FireUp.BloceCreateSpeed = 40;
                window.FireUp.BlockGroupMoveSpeen = 800;
                window.FireUp.BulletColor = this.BulletColor[7];
                window.FireUp.Aggressivity = 18;
            }else if(this.score >= 400){
                window.FireUp.BloceCreateSpeed = 80;
                window.FireUp.BlockGroupMoveSpeen = 600;
                window.FireUp.BulletColor = this.BulletColor[6];
            }else if(this.score >= 350){
                window.FireUp.BloceCreateSpeed = 100;
                window.FireUp.BlockGroupMoveSpeen = 500;
                window.FireUp.BulletColor = this.BulletColor[5];
                window.FireUp.Aggressivity = 16;
            }else if(this.score>=300){
                window.FireUp.BloceCreateSpeed = 60;
                window.FireUp.BlockGroupMoveSpeen = 1200;
                window.FireUp.BulletColor = this.BulletColor[4];
                window.FireUp.Aggressivity = 14;
            }else if(this.score>=200){
                window.FireUp.BloceCreateSpeed = 80;
                window.FireUp.BlockGroupMoveSpeen = 900;
                window.FireUp.BulletColor = this.BulletColor[3];
                window.FireUp.Aggressivity = 12;
            }else if(this.score>=150){
                window.FireUp.BloceCreateSpeed = 90;
                window.FireUp.BlockGroupMoveSpeen = 800;
                window.FireUp.BulletColor = this.BulletColor[2];
                window.FireUp.Aggressivity = 10;
            }else if(this.score>=100){
                window.FireUp.BloceCreateSpeed = 120;
                window.FireUp.BlockGroupMoveSpeen = 600;
                window.FireUp.BulletColor = this.BulletColor[1];
                window.FireUp.Aggressivity = 8;
            }else if(this.score>50){
                window.FireUp.BloceCreateSpeed = 150;
                window.FireUp.BlockGroupMoveSpeen = 400;
                window.FireUp.BulletColor = this.BulletColor[0];
                window.FireUp.Aggressivity = 6;
            }
            this.node.getComponent(cc.Label).string = (this.score += text);//修改生命值
        }, this.score);
        let jumpAction = cc.sequence(
            callback,
            cc.scaleTo(0.1, 0.8, 1.2),
            cc.scaleTo(0.2, 1.2, 1.2),
            cc.delayTime(0.5),
            cc.scaleTo(0.1, 1.2, 0.8),
            cc.scaleTo(0.2, 1.2, 1.2),
        ).speed(2);
        this.node.runAction(jumpAction);
    },

    onLoad () {
        window.FireUp.BulletColor = this.BulletColor[7];
    },

    start () {

    },

    update (dt) {},
});
