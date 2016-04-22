//牌局中头像框component
var notificationLayer = cc.Layer.extend({
    ctor: function (params) {
        this._super();
        this.contentLabel = null;
        this.hornBg = null;
        this.clip = null;
        this.massage = [];
        FrameCache.addSpriteFrames(res.common_plist);

        this.init(params);
    },

    init:function (params) {
        this._super();

        var size =  cc.director.getWinSize();

        this.clip = this.clipper();
        var clipSize = this.clip.getContentSize();
        this.setPosition(cc.p(size.width / 2, size.height - 110));
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

    onEnter: function () {
        this._super();
        this.schedule(function () {
            this.trumpet(MassageQueue.shiftMassage());
        }, 3)
    },

    onExit: function () {
        FrameCache.removeSpriteFrames(res.common_plist);
        this._super();
    }

});