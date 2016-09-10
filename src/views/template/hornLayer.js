// 小喇叭layer
/////////////////////////
//: 已废弃!!!
/////////////////////////
var HornSprite = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.broadcastListener = null;
        //
        var self = this;
        this.broadcastListener = EventBus.subscribe(gameEvents.BROADCAST, function (data) {
            //cc.log("---->game  cancelTrusteeshipEvent: ", data);
            if (self && cc.sys.isObjectValid(self)) {
                self.trumpet(data);
            }

        });

        var winSize = cc.director.getWinSize();
        //horn background
        this.hornBg = new cc.Sprite("#common_bg_laba.png");
        this.hornBg.setScale(0.8);
        this.hornBg.setPosition(winSize.width / 2, winSize.height - 110);


        //horn icon
        var hornIcon = new cc.Sprite("#common_icon_laba_2.png");
        hornIcon.setAnchorPoint(0, 0);
        hornIcon.setPosition(10, 8);
        this.hornBg.addChild(hornIcon);
        this.addChild(this.hornBg);

    },

    trumpet: function (data) {
        //后续可调整为向上滚动动画(2-3行),再消失,有一个顶掉的效果.(引发喇叭大战)
        var self = this;
        this.unscheduleAllCallbacks();
        this.hornBg.removeChildByTag(2, true);

        //if (self.contentLabel && cc.sys.isObjectValid(self.contentLabel)) this.contentLabel.removeFromParent(true);
        this.contentLabel = new cc.LabelTTF(data.from + ": " + data.msg, "Arial", 22);
        this.contentLabel.setAnchorPoint(0, 0.5);
        this.contentLabel.x = 60;
        this.contentLabel.setTag(2);
        this.contentLabel.y = this.hornBg.height/2;
        this.hornBg.addChild(this.contentLabel);
        this.scheduleOnce(function () {
            self.hornBg.removeChildByTag(2, true);
        }, 6)
    },

    onEnter: function () {
        this._super();
    },
    onExit: function () {
        this._super();
        if(this.broadcastListener ){
            EventBus.removeSubscribe(this.broadcastListener);
            this.broadcastListener = null;
        }
        //cc.eventManager.removeCustomListeners(gameEvents.BROADCAST);
    }
});

