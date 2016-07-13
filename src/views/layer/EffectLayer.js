

var EffectLayer = cc.Layer.extend({

    ctor: function(args){
        this._super();
//类变量
        this.m_eEffect = args.effect?args.effect:0;
        this.m_targe= args.targe?args.targe:null;
        this.m_pCallBack = args.callback?args.callback:null;

        this.init(args);
    },
//    CardLogic.CardSeriesCode = {
//    cardSeries_1: 1, //单牌
//    cardSeries_2: 2, //对子
//    cardSeries_3: 3, //炸弹
//    cardSeries_4: 4, //四轮车
//    cardSeries_5: 5, //对王
//    cardSeries_6: 6, //双三满天飞
//    cardSeries_99: 7 //无法识别，错误牌型
//}

    //var __effectFiles = [
    //    res.effects_missile_json,
    //    res.effects_line2_json,
    //    res.effects_plane_json,
    //    res.effects_bomb_json,
    //    res.effects_doubleline2_json,
    //    res.effects_spring_json
    //]

    init:function(effect){
        this._super();

        if (this.m_eEffect == CardLogic.CardSeriesCode.cardSeries_5) {//火箭
            this.playRocketAni();
        }else if (this.m_eEffect == CardLogic.CardSeriesCode.cardSeries_3) {//-炸弹
            this.playBoomAni();
        }else if (this.m_eEffect == CardLogic.CardSeriesCode.cardSeries_6) {//飞机
            this.playSpringAni();
        }else if (this.m_eEffect == CardLogic.CardSeriesCode.cardSeries_4) {//春天
            this.playLianduiAni();
        }
        else {
            return false;
        }
        return true;
    },

    aniFinished:function (sender) {
        cc.log("----------------->aniFinished:");
        if (__effectFiles[this.m_eEffect]){
            ccs.armatureDataManager.removeArmatureFileInfo(__effectFiles[this.m_eEffect]);
        }
        if(this.m_targe && cc.isFunction(this.m_pCallBack)){
            this.m_pCallBack.call(this.m_targe);
        }

        this.removeFromParent(true);
    },
    animationEvent:function (armature, movementType, movementID) {
        if (movementType == ccs.MovementEventType.loopComplete) {
            if (movementID == "Fire") {

            }
        }
        armature.removeFromParent(true);
        this.aniFinished();
    },

    playRocketAni:function(){
        cc.log("----------------->playRocketAni:");
        var winSize = cc.director.getWinSize();
        ccs.armatureDataManager.addArmatureFileInfo(__effectFiles[this.m_eEffect]);
        var armature = new ccs.Armature("Missile");
        armature.getAnimation().playWithIndex(0, 0,false);
        //armature.getAnimation().setSpeedScale(0.4);
        armature.setAnchorPoint(0.5, 0.5);
        armature.x = winSize.width / 2;
        armature.y = winSize.height / 2;
        //armature.runAction(cc.sequence(cc.tintTo(5, 200,100,0), cc.tintTo(5, 255,255,255)));
        this.addChild(armature);

        var self = this;
        armature.getAnimation().setMovementEventCallFunc(function(armature, movementType, movementID) {
            self.animationEvent(armature, movementType, movementID);
        });


    },

    playBoomAni:function(){
        cc.log("----------------->playBoomAni:");
        var winSize = cc.director.getWinSize();
        ccs.armatureDataManager.addArmatureFileInfo(__effectFiles[this.m_eEffect]);
        var armature = new ccs.Armature("bomb");
        armature.getAnimation().playWithIndex(0, 0,false);
        //armature.getAnimation().playWithNames("bomb",0,false);
        //armature.getAnimation().setSpeedScale(0.4);
        armature.setAnchorPoint(0.5, 0.5);
        armature.x = winSize.width / 2;
        armature.y = winSize.height / 2;
        this.addChild(armature);

        var self = this;
        armature.getAnimation().setMovementEventCallFunc(function(armature, movementType, movementID) {
            self.animationEvent(armature, movementType, movementID);
        });

    },

    playPlaneAni:function(){
        cc.log("----------------->playPlaneAni:");
        var winSize = cc.director.getWinSize();
        ccs.armatureDataManager.addArmatureFileInfo(__effectFiles[this.m_eEffect]);
        var armature = new ccs.Armature("plane");
        armature.getAnimation().playWithIndex(0, 0,false);
        //armature.getAnimation().setSpeedScale(0.4);
        armature.setAnchorPoint(0.5, 0.5);
        armature.x = winSize.width / 2;
        armature.y = winSize.height / 2;
        this.addChild(armature);

        var self = this;
        armature.getAnimation().setMovementEventCallFunc(function(armature, movementType, movementID) {
            self.animationEvent(armature, movementType, movementID);
        });

    },

    playShunziAni:function(){
        cc.log("----------------->playShunziAni:");
        var winSize = cc.director.getWinSize();
        ccs.armatureDataManager.addArmatureFileInfo(__effectFiles[this.m_eEffect]);
        var armature = new ccs.Armature("line2");
        armature.getAnimation().playWithIndex(0, 0,false);
        //armature.getAnimation().setSpeedScale(0.4);
        armature.setAnchorPoint(0.5, 0.5);
        armature.x = winSize.width / 2;
        armature.y = winSize.height / 2;
        this.addChild(armature);

        var self = this;
        armature.getAnimation().setMovementEventCallFunc(function(armature, movementType, movementID) {
            self.animationEvent(armature, movementType, movementID);
        });

    },

    playLianduiAni:function(){
        cc.log("----------------->playLianduiAni:");
        var winSize = cc.director.getWinSize();
        ccs.armatureDataManager.addArmatureFileInfo(__effectFiles[this.m_eEffect]);
        var armature = new ccs.Armature("doubleline2");
        armature.getAnimation().playWithIndex(0, 0,false);
        //armature.getAnimation().setSpeedScale(0.4);
        armature.setAnchorPoint(0.5, 0.5);
        armature.x = winSize.width / 2;
        armature.y = winSize.height / 2;
        this.addChild(armature);

        var self = this;
        armature.getAnimation().setMovementEventCallFunc(function(armature, movementType, movementID) {
            self.animationEvent(armature, movementType, movementID);
        });

    },

    playSpringAni:function(){
        cc.log("----------------->playSpringAni:");
        var winSize = cc.director.getWinSize();
        ccs.armatureDataManager.addArmatureFileInfo(__effectFiles[this.m_eEffect]);
        var armature = new ccs.Armature("spring");
        armature.getAnimation().playWithIndex(0, 0,false);
        //armature.getAnimation().setSpeedScale(0.4);
        armature.setAnchorPoint(0.5, 0.5);
        armature.x = winSize.width / 2;
        armature.y = winSize.height / 2;
        this.addChild(armature);

        var self = this;
        armature.getAnimation().setMovementEventCallFunc(function(armature, movementType, movementID) {
            self.animationEvent(armature, movementType, movementID);
        });


        var sp = new cc.Sprite("#Card_hearts_red_1.png");
        sp.setOpacity(200);
        sp.scale = 0;
        sp.x = winSize.width / 2;
        sp.y = winSize.height / 2;
        this.addChild(sp);

        var dt = cc.scaleTo(1.0, 2.0);
        sp.runAction(dt);


    },

    onEnter:function(){
        this._super();
        //console.log("Clock onEnter");

    },

    onExit:function(){
        this._super();
        //console.log("Clock onEnter");

    }

})

