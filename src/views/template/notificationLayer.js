//喇叭框
var notificationLayer = cc.Layer.extend({
    ctor: function (params) {
        this._super();
        this.cx = 0;
        this.cy = 0;
        this.cw = 0;
        this.ch = 0;

        this.broadcastListener = null;
        this.contentLabel = null;
        this.contentTouchListener = null;
        this.hornBg = null;
        this.clip = null;
        self = null;
        this.nextNotification = true;

        FrameCache.addSpriteFrames(res.common_plist);

        this.init(params);
        this.initListener();
    },

    init: function (params) {
        this._super();
        var winSize = cc.director.getWinSize();
        var visSize = cc.director.getVisibleSize();
        var origin = cc.director.getVisibleOrigin();

        this.cx = params.x ? params.x : winSize.width / 2;
        this.cy = params.x ? params.y : winSize.height - 110;
        this.cw = params.w ? params.w : visSize.width * 0.9;
        this.ch = params.h ? params.h : 34;
        this.cvisible = params.visible ? params.visible : false;
        this.copacity = params.opacity ? params.opacity : 255;

        this.clip = this.clipper();
        this.clip.visible = this.cvisible;
        var clipSize = this.clip.getContentSize();
        this.setPosition(cc.p(this.cx, this.cy));
        this.addChild(this.clip, 0);

        this.hornBg = new cc.Sprite("#common_bg_laba.png");
        var bgsize = this.hornBg.getContentSize();
        this.hornBg.setScaleX(this.cw / bgsize.width);
        this.hornBg.setScaleY(this.ch / bgsize.height);
        this.hornBg.setOpacity(this.copacity);
        this.clip.addChild(this.hornBg, 1);//先添加标题,会完全显示出来,因为跟模板一样大小

        //horn icon
        var hornIcon = new cc.Sprite("#common_icon_laba_2.png");
        hornIcon.setAnchorPoint(0, 0.5);
        hornIcon.setPosition(10, this.ch / 2 + 2);
        this.hornBg.addChild(hornIcon);

    },
    clipper: function () {  //创建以标题作为大小的模板,超出标题部分都会被裁掉
        var bg = new cc.Sprite("#common_bg_laba.png");
        var bgsize = bg.getContentSize();
        bg.setScaleX(this.cw / bgsize.width);
        bg.setScaleY(this.ch / bgsize.height);

        var clipper = new cc.ClippingNode(bg);
        clipper.alphaThreshold = 0;
        //clipper.inverted = true;
        clipper.setContentSize(cc.size(this.cw, this.ch));
        return clipper;
    },

    moveDoneAndVisible: function (sender) {
        sender.removeFromParent(true);
        if (this.clip && cc.sys.isObjectValid(this.clip)) {
            this.clip.visible = this.cvisible;
        }
    },
    moveDone: function (sender) {
        sender.removeFromParent(true);
    },
    moveMid: function (sender) {
        this.nextNotification = true;
    },
    trumpet: function (data) {
        if (data == null)return;
        var time = 0.6;
        var xx = 60;
        var size = this.hornBg.getContentSize();
        if (this.contentLabel && cc.sys.isObjectValid(this.contentLabel)) {
            var moveAction = cc.moveTo(time, cc.p(xx, this.ch / 2 * 3));
            var action = cc.sequence(
                moveAction,
                cc.callFunc(this.moveDone));

            this.contentLabel.runAction(action);
            //----end22----
        }
        this.contentLabel = new cc.LabelTTF(data.from + ": " + data.msg, "Arial", 23);
        this.contentLabel.setAnchorPoint(0, 0.5);
        this.contentLabel.x = xx;
        this.contentLabel.y = -this.ch / 2;
        this.hornBg.addChild(this.contentLabel, 1);

        var mt = cc.moveTo(time, cc.p(xx, this.ch / 2));
        this.contentLabel.runAction(mt);
    },

    trumpetTwo: function (data) {
        if (data == null)return;
        this.nextNotification = false;
        this.clip.visible = true;
        var time = 0.5;
        var xx = 60;
        var size = this.hornBg.getContentSize();

        if (this.contentLabel && cc.sys.isObjectValid(this.contentLabel)) {
            this.contentLabel.stopAllActions();
            var moveAction = cc.moveTo(time, cc.p(xx, size.height / 2 * 3));
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
        this.contentLabel.y = -size.height / 2;
        this.contentLabel.setName(data.uid);
        this.hornBg.addChild(this.contentLabel, 1);

        this.contentTouchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,
            onTouchCancelled: this.onTouchCancelled
        });
        cc.eventManager.addListener(this.contentTouchListener, this.contentLabel);

        var mt1 = cc.moveTo(time, cc.p(xx, size.height / 2));
        var dt = cc.delayTime(CommonConf.TRUMPET.STAY_SECOND);
        var mt2 = cc.moveTo(time, cc.p(xx, size.height / 2 * 3));
        var action1 = cc.sequence(
            mt1,
            cc.callFunc(this.moveMid, this),
            dt,
            mt2,
            cc.callFunc(this.moveDoneAndVisible, this));

        this.contentLabel.runAction(action1);


    },

    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();  // 获取事件所绑定的 target

        // 获取当前点击点所在相对按钮的位置坐标
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);

        if (cc.rectContainsPoint(rect, locationInNode)) {       // 点击范围判断检测
            return true;
        }
        return false;
    },
    onTouchMoved: function (touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        //cc.log("onTouchMoved at: " + pos.x + " " + pos.y + " Id:" + id);
    },
    onTouchEnded: function (touch, event) {
        playEffect(audio_common.Button_Click);

        var target = event.getCurrentTarget();
        var uid = target.getName();


        UniversalController.getProfileByUid(uid, function (data) {
            var node = cc.director.getRunningScene().getChildByTag( GAME_ZODER.PlayerProfile);
            if(node == null){
                cc.director.getRunningScene().addChild(new PlayerProfileLayer(data), GAME_ZODER.PlayerProfile, GAME_ZODER.PlayerProfile);
            }
        });

    },
    onTouchCancelled: function (touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        //cc.log("onTouchCancelled at: " + pos.x + " " + pos.y + " Id:" + id);
    },

    initListener: function () {
        self = this;
        this.broadcastListener = EventBus.subscribe(gameEvents.BROADCAST, function (data) {
            ;
            //console.log(data);
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
            if (this.nextNotification == true) {
                this.trumpetTwo(MassageQueue.shiftMassage());
            }

        }, 0.2)


    },

    onExit: function () {
        if (this.broadcastListener) {
            EventBus.removeSubscribe(this.broadcastListener);
            this.broadcastListener = null;
        }

        FrameCache.removeSpriteFrames(res.common_plist);
        self = null;
        this._super();
    }


});