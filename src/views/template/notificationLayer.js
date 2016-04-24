//牌局中头像框component
var notificationLayer = cc.Layer.extend({
    ctor: function (params) {
        this._super();

        this.broadcastListener = null;
        this.contentLabel = null;
        this.hornBg = null;
        this.clip = null;
        self = null;
        nextNotification = true;

        FrameCache.addSpriteFrames(res.common_plist);

        this.init(params);
        this.initListener();
    },

    init:function (params) {
        this._super();

        var size =  cc.director.getWinSize();
        var x = params.x?params.x:size.width / 2;
        var y = params.x?params.y:size.height - 110;

        this.clip = this.clipper();
        var clipSize = this.clip.getContentSize();
        this.setPosition(cc.p(x, y));
        this.addChild(this.clip, 0);

        this.hornBg = new cc.Sprite("#common_bg_laba.png");
        this.hornBg.setScale(0.8);
        this.clip.addChild(this.hornBg, 1);//先添加标题,会完全显示出来,因为跟模板一样大小

        //horn icon
        var hornIcon = new cc.Sprite("#common_icon_laba_2.png");
        hornIcon.setAnchorPoint(0, 0.5);
        hornIcon.setPosition(10, clipSize.height/2);
        this.hornBg.addChild(hornIcon);

    },
    clipper : function(){  //创建以标题作为大小的模板,超出标题部分都会被裁掉
        var bg = new cc.Sprite("#common_bg_laba.png");
        bg.setScale(0.8);
        var clipper = new cc.ClippingNode(bg);
        clipper.alphaThreshold = 0;
        //clipper.inverted = true;
        clipper.setContentSize(cc.size(bg.getContentSize().width, bg.getContentSize().height));
        return clipper;
    },

    moveDone:function (sender) {
        sender.removeFromParentAndCleanup();
    },
    moveMid:function (sender) {
        nextNotification = true;
    },
    trumpet: function (data) {
        if(data == null)return;
        var time = 0.6;
        var xx = 60;
        var size = this.hornBg.getContentSize();
        if(this.contentLabel && cc.sys.isObjectValid(this.contentLabel)){
            var moveAction = cc.moveTo(time, cc.p(xx, size.height/2*3));
            var action = cc.sequence(
                moveAction,
                cc.callFunc(this.moveDone));

            this.contentLabel.runAction(action);
            //----end22----
        }
        this.contentLabel = new cc.LabelTTF(data.from + ": " + data.msg, "Arial", 23);
        this.contentLabel.setAnchorPoint(0, 0.5);
        this.contentLabel.x = xx;
        this.contentLabel.y = -size.height/2;
        this.hornBg.addChild(this.contentLabel, 1);

        var mt = cc.moveTo(time, cc.p(xx, size.height/2));
        this.contentLabel.runAction( mt );
    },

    trumpetTwo: function (data) {
        if(data == null)return;
        nextNotification = false;
        var time = 0.5;
        var xx = 60;
        var size = this.hornBg.getContentSize();

        if(this.contentLabel && cc.sys.isObjectValid(this.contentLabel)){
            this.contentLabel.stopAllActions();
            var moveAction = cc.moveTo(time, cc.p(xx, size.height/2*3));
            var action = cc.sequence(
                moveAction,
                cc.callFunc(this.moveDone));

            this.contentLabel.runAction(action);
            //----end22----
        }

        this.contentLabel = new cc.LabelTTF(data.from + ": " + data.msg, "Arial", 25);
        this.contentLabel.color = cc.color.WHITE;
        this.contentLabel.setAnchorPoint(0, 0.5);
        this.contentLabel.x = xx;
        this.contentLabel.y = -size.height/2;
        this.hornBg.addChild(this.contentLabel, 1);

        var mt1 = cc.moveTo(time, cc.p(xx, size.height/2));
        var dt = cc.delayTime(3);
        var mt2 = cc.moveTo(time, cc.p(xx, size.height/2*3));
        var action1 = cc.sequence(
            mt1,
            cc.callFunc(this.moveMid),
            dt,
            mt2,
            cc.callFunc(this.moveDone));

        this.contentLabel.runAction(action1);


    },

    initListener: function (){
        self = this;
        this.broadcastListener = EventBus.subscribe(gameEvents.BROADCAST, function (data) {;
            console.log(data);
            MassageQueue.pushMassage(data);
            //cc.log("---->game  cancelTrusteeshipEvent: ", data);
            //if (self && cc.sys.isObjectValid(self)) {
            //    //self.trumpetTwo(data);
            //
            //}

        });
        //MassageQueue.pushMassage({from:"aaa", msg:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"});
        //MassageQueue.pushMassage({from:"bbb", msg:"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"});
        //MassageQueue.pushMassage({from:"ccc", msg:"cccccccccccccccccccccccccccccccccc"});
        //MassageQueue.pushMassage({from:"ddd", msg:"dddddddddddddddddddddddddddddddddd"});
        //MassageQueue.pushMassage({from:"eee", msg:"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"});
        //MassageQueue.pushMassage({from:"fff", msg:"fffffffffffffffffffffffffffffffffff"});
        //MassageQueue.pushMassage({from:"ggg", msg:"gggggggggggggggggggggggggggggggggg"});
    },
    onEnter: function () {
        this._super();

        this.schedule(function () {
            if(nextNotification == true){
                this.trumpetTwo(MassageQueue.shiftMassage());
            }

        }, 0.2)




    },

    onExit: function () {
        if(this.broadcastListener){
            EventBus.removeSubscribe(this.broadcastListener);
            this.broadcastListener = null;
        }

        FrameCache.removeSpriteFrames(res.common_plist);
        self = null;
        this._super();
    }

});