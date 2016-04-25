//牌局中头像框component
var notificationLayer = cc.Layer.extend({
    ctor: function (params) {
        this._super();
        this.cx = 0;
        this.cy = 0;
        this.cw = 0;
        this.ch = 0;

        this.broadcastListener = null;
        this.contentLabel = null;
        this.hornBg = null;
        this.clip = null;
        self = null;
        this.nextNotification = true;

        FrameCache.addSpriteFrames(res.common_plist);

        this.init(params);
        this.initListener();
    },

    init:function (params) {
        this._super();
        var winSize =  cc.director.getWinSize();
        var visSize =  cc.director.getVisibleSize();
        var origin = cc.director.getVisibleOrigin();

        this.cx  = params.x?params.x:winSize.width / 2;
        this.cy = params.x?params.y:winSize.height - 110;
        this.cw = params.w?params.w:visSize.width*0.9;
        this.ch = params.h?params.h:34;
        this.cvisible = params.visible?params.visible:false;

        this.clip = this.clipper();
        this.clip.visible = this.cvisible;
        var clipSize = this.clip.getContentSize();
        this.setPosition(cc.p(this.cx, this.cy));
        this.addChild(this.clip, 0);

        this.hornBg = new cc.Sprite("#common_bg_laba.png");
        var bgsize = this.hornBg.getContentSize();
        this.hornBg.setScaleX(this.cw/bgsize.width);
        this.hornBg.setScaleY(this.ch/bgsize.height);
        this.clip.addChild(this.hornBg, 1);//先添加标题,会完全显示出来,因为跟模板一样大小

        //horn icon
        var hornIcon = new cc.Sprite("#common_icon_laba_2.png");
        hornIcon.setAnchorPoint(0, 0.5);
        hornIcon.setPosition(10, this.ch/2+2);
        this.hornBg.addChild(hornIcon);

    },
    clipper : function(){  //创建以标题作为大小的模板,超出标题部分都会被裁掉
        var bg = new cc.Sprite("#common_bg_laba.png");
        var bgsize = bg.getContentSize();
        bg.setScaleX(this.cw/bgsize.width);
        bg.setScaleY(this.ch/bgsize.height);

        var clipper = new cc.ClippingNode(bg);
        clipper.alphaThreshold = 0;
        //clipper.inverted = true;
        clipper.setContentSize(cc.size(this.cw, this.ch));
        return clipper;
    },

    moveDoneAndVisible:function (sender) {
        sender.removeFromParent(true);
        if(this.clip && cc.sys.isObjectValid(this.clip)){
            this.clip.visible = this.cvisible;
        }
    },
    moveDone:function (sender) {
        sender.removeFromParent(true);
    },
    moveMid:function (sender) {
        this.nextNotification = true;
    },
    trumpet: function (data) {
        if(data == null)return;
        var time = 0.6;
        var xx = 60;
        var size = this.hornBg.getContentSize();
        if(this.contentLabel && cc.sys.isObjectValid(this.contentLabel)){
            var moveAction = cc.moveTo(time, cc.p(xx, this.ch/2*3));
            var action = cc.sequence(
                moveAction,
                cc.callFunc(this.moveDone));

            this.contentLabel.runAction(action);
            //----end22----
        }
        this.contentLabel = new cc.LabelTTF(data.from + ": " + data.msg, "Arial", 23);
        this.contentLabel.setAnchorPoint(0, 0.5);
        this.contentLabel.x = xx;
        this.contentLabel.y = -this.ch/2;
        this.hornBg.addChild(this.contentLabel, 1);

        var mt = cc.moveTo(time, cc.p(xx, this.ch/2));
        this.contentLabel.runAction( mt );
    },

    trumpetTwo: function (data) {
        if(data == null)return;
        this.nextNotification = false;
        this.clip.visible = true;
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
        var dt = cc.delayTime(4);
        var mt2 = cc.moveTo(time, cc.p(xx, size.height/2*3));
        var action1 = cc.sequence(
            mt1,
            cc.callFunc(this.moveMid, this),
            dt,
            mt2,
            cc.callFunc(this.moveDoneAndVisible, this));

        this.contentLabel.runAction(action1);


    },

    initListener: function (){
        self = this;
        this.broadcastListener = EventBus.subscribe(gameEvents.BROADCAST, function (data) {;
            console.log(data);
            MassageQueue.pushMassage(data);
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
            if(this.nextNotification == true){
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