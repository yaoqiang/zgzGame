var LoadingNode = cc.Node.extend({
    ctor: function (args) {
        this._super();
//类变量
        this.m_pLable = null;
        this.m_nIdx = 0;
        this.m_bRun = false;
        this.args = args || {};
        this.args.msg = this.args.msg || '加载中';
        this.init(args);
    },
    onEnter: function () {
        this._super();
        //console.log("loadingNode onEnter");

    },
    onExit: function () {
        this._super();
        //console.log("loadingNode onEnter");

    },

    init: function (args) {
        if (this.m_bRun) return;
        this.m_bRun = true;

        var winSize = cc.director.getWinSize();
        var sg = new MaskLayer(false);


        this.bg = new cc.Sprite(res.loadingBg);
        this.bg.scaleY = 1.2;
        this.bg.setPosition(winSize.width / 2, winSize.height / 2);

        sg.addChild(this.bg);

        this.icon = new cc.Sprite(res.loading);
        this.icon.setPosition(winSize.width / 2, winSize.height / 2 + 15);
        this.icon.scale = 1.2;
        sg.addChild(this.icon);
        var ccRotateBy = new cc.RotateBy(0.7, 360);
        var ccRepeatForever = new cc.RepeatForever(ccRotateBy);
        this.icon.runAction(ccRepeatForever);


        //var closeItem = new cc.MenuItemImage("#close.png", "#close.png", this.onExitCallback, this);
        //closeItem.setScale(0.65);
        //closeItem.x = winSize.width / 2 + this.bg.width / 2 - 8;
        //closeItem.y = winSize.height / 2 + this.bg.height / 2 - 8;
        //this.m_menu = new cc.Menu(closeItem);
        //this.m_menu.tag = TAG_MENU;
        //this.m_menu.x = 0;
        //this.m_menu.y = 0;
        //this.addChild(this.m_menu, 1);


        var resultTxt = this.args.msg+"...";
        this.m_pLable = new cc.LabelTTF(resultTxt, "Arial", 16);
        this.m_pLable.color = cc.color.WHITE;
        this.m_pLable.setPosition(winSize.width / 2, winSize.height / 2-35);
        sg.addChild(this.m_pLable);

        this.addChild(sg);

        this.schedule(this.onTick, 0.5);
    },
    onTick: function (dt) {
        var resultTxt = this.args.msg;
        this.m_nIdx = this.m_nIdx + 1;
        this.m_nIdx = this.m_nIdx % 4;
        var i = 0;
        for (i = 0; i < this.m_nIdx; i++) {
            resultTxt = resultTxt + ".";
        }
        this.m_pLable.setString(resultTxt);
    },
    onExitCallback: function () {
        playEffect(audio_common.Button_Click);
        //console.log("noteLayer onExitCallback");
        this.removeFromParent(true);
    }
})

var LoadingLayer = function (data) {
    var load = new LoadingNode({msg: data.msg});
    return load;
};


//////////////
var AlertBoxNode = cc.Node.extend({
    ctor: function (msg, callback, targe) {
        this._super();
//类变量
        this.m_msg = msg;
        this.m_targe = targe;
        this.m_callback = callback;

        this.m_pLable = null;
        this.m_nIdx = 0;
        this.m_bRun = false;
        this.m_bgWidth = 300;
        this.m_bgHeight = 180;
        //cc.spriteFrameCache.addSpriteFrames(res.common_plist);

        this.init({});
    },
    onEnter: function () {
        this._super();
        //console.log("AlertBoxNode onEnter");
        //cc.spriteFrameCache.addSpriteFrames(res.common_plist);
    },
    onExit: function () {
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.common_plist);
        this._super();
        //console.log("AlertBoxNode onEnter");
    },

    init: function (args) {
        if (this.m_bRun) return;
        this.m_bRun = true;

        this._super();
        var sg = new MaskLayer(false);
        this.addChild(sg);

        var winSize = cc.director.getWinSize();

        //var bg = new cc.Sprite(res.common_box_1);
        var bg = new cc.Scale9Sprite(res.common_box_1);
        bg.width = this.m_bgWidth;
        bg.height = this.m_bgHeight;

        bg.x = winSize.width / 2.0;
        bg.y = winSize.height / 2.0;
        this.addChild(bg);

        this.m_pLable = new cc.LabelTTF(this.m_msg, "Arial", 22);
        this.m_pLable.color = cc.color.WHITE;
        //this.m_pLable.setDimensions(this.m_bgWidth - 40, this.m_bgHeight - 60);
        //this.m_pLable.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.m_pLable.setPosition(winSize.width / 2, winSize.height / 2 + 30);
        this.addChild(this.m_pLable);

        //ok
        var okItem = new cc.MenuItemImage(res.common_btn_lan, res.common_btn_lv, this.onOkCallback, this);
        okItem.setScale(0.65);
        okItem.x = winSize.width / 2;
        okItem.y = winSize.height / 2 - this.m_bgHeight / 2 + 30;
        var okSize = okItem.getContentSize();

        var okLable = new cc.LabelTTF("确定", "Arial", 30);
        okLable.color = cc.color.YELLOW;
        okLable.x = okSize.width / 2;
        okLable.y = okSize.height / 2;
        okItem.addChild(okLable);
        //close
        var closeItem = new cc.MenuItemImage(res.common_btn_shanchu, res.common_btn_shanchu, this.onExitCallback, this);
        closeItem.setScale(0.65);
        closeItem.x = winSize.width / 2 + this.m_bgWidth / 2 - 5;
        closeItem.y = winSize.height / 2 + this.m_bgHeight / 2 - 5;

        this.m_menu = new cc.Menu(okItem, closeItem);
        this.m_menu.tag = TAG_MENU;
        this.m_menu.x = 0;
        this.m_menu.y = 0;
        this.addChild(this.m_menu, 1);
        // menu end

    },
    onOkCallback: function () {
        //console.log("noteLayer onOkCallback");
        if (this.m_targe && cc.isFunction(this.m_callback)) {
            this.m_callback.call(this.m_targe, this)
        }
        this.removeFromParent(true);
        playEffect(audio_common.Button_Click);
    },
    onExitCallback: function () {
        playEffect(audio_common.Button_Click);
        //console.log("noteLayer onExitCallback");
        this.removeFromParent(true);
    }
});
var AlertBox = function (msg, callback, targe) {
    var box = new AlertBoxNode(msg, callback, targe);
    return box;
};


///////////////
///
///////////////
var DialogMiddleNode = cc.Node.extend({
    ctor: function (title, mode, callback) {
        this._super();
//类变量
        this.m_callback = callback;

        this.mode = mode;
        this.m_msg = title;

        this.m_bRun = false;

        this.init({});
    },
    onEnter: function () {
        this._super();
        //console.log("AlertBoxNode onEnter");
        //cc.spriteFrameCache.addSpriteFrames(res.common_plist);
    },
    onExit: function () {
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.common_plist);
        this._super();
        //console.log("AlertBoxNode onEnter");
    },

    init: function (args) {
        if (this.m_bRun) return;
        this.m_bRun = true;

        this._super();
        var sg = new MaskLayer(false);
        this.addChild(sg);

        var winSize = cc.director.getWinSize();

        var bgString = "#dialog_bg_middle.png";

        this.bg = new cc.Sprite(bgString);
        this.bg.x = winSize.width / 2.0;
        this.bg.y = winSize.height / 2.0;
        this.bg.scale = 0.55;
        this.addChild(this.bg);

        var bgActualSize = this.bg.getBoundingBox();


        this.m_pLable = new cc.LabelTTF(this.m_msg, "AmericanTypewriter", 26);
        this.m_pLable.enableStroke(cc.color.WHITE, 1);
        this.m_pLable.color = cc.color.WHITE;
        //this.m_pLable.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.m_pLable.setPosition(winSize.width / 2, winSize.height / 2 + bgActualSize.height / 2 - 22);
        this.addChild(this.m_pLable);

        //close
        var closeItem = new cc.MenuItemImage("#common_btn_shanchu.png", "#common_btn_shanchu.png", this.onExitCallback, this);
        closeItem.setScale(0.65);
        closeItem.x = winSize.width / 2 + bgActualSize.width / 2 - 8;
        closeItem.y = winSize.height / 2 + bgActualSize.height / 2 - 8;
        this.m_menu = new cc.Menu(closeItem);
        this.m_menu.tag = TAG_MENU;
        this.m_menu.x = 0;
        this.m_menu.y = 0;
        this.addChild(this.m_menu, 1);
        // menu end

    },

    onExitCallback: function () {
        playEffect(audio_common.Button_Click);
        //console.log("noteLayer onExitCallback");
        this.removeFromParent(true);
    }
});
var DialogMiddle = function (title, mode, callback) {
    var box = new DialogMiddleNode(title, mode, callback);
    return box;
};

/////////////////////////////////////////////////////////
//
////////
///
var DialogSmallNode = cc.Node.extend({
    ctor: function (title, mode, callback, target, bgScale) {
        this._super();
//类变量
        this.callback = callback;

        this.target = target;

        this.bgScale = bgScale ? bgScale : 1;


        this.mode = mode;
        this.m_msg = title;

        this.m_bRun = false;

        this.init({});
    },
    onEnter: function () {
        this._super();
        //console.log("AlertBoxNode onEnter");
        //cc.spriteFrameCache.addSpriteFrames(res.common_plist);
    },
    onExit: function () {
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.common_plist);
        this._super();
        //console.log("AlertBoxNode onEnter");
    },

    init: function (args) {
        if (this.m_bRun) return;
        this.m_bRun = true;

        this._super();

        var self = this;
        var sg = new MaskLayer(false);
        this.addChild(sg);

        var winSize = cc.director.getWinSize();

        var bgString = "#dialog_bg_middle.png";

        this.bg = new cc.Sprite(bgString);
        this.bg.x = winSize.width / 2;
        this.bg.y = winSize.height / 2;
        this.bg.scale = 0.4 * this.bgScale;
        this.addChild(this.bg);

        var bgActualSize = this.bg.getBoundingBox();


        this.m_pLable = new cc.LabelTTF(this.m_msg, "AmericanTypewriter", 20);
        this.m_pLable.enableStroke(cc.color.WHITE, 1);
        this.m_pLable.color = cc.color.WHITE;
        //this.m_pLable.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.m_pLable.setPosition(winSize.width / 2, winSize.height / 2 + bgActualSize.height / 2 - 18);
        this.addChild(this.m_pLable);

        //close
        var closeItem = new cc.MenuItemImage("#common_btn_shanchu.png", "#common_btn_shanchu.png", this.onExitCallback, this);
        closeItem.setScale(0.65);
        closeItem.x = winSize.width / 2 + bgActualSize.width / 2 - 8;
        closeItem.y = winSize.height / 2 + bgActualSize.height / 2 - 8;
        this.m_menu = new cc.Menu(closeItem);
        this.m_menu.tag = TAG_MENU;
        this.m_menu.x = 0;
        this.m_menu.y = 0;
        this.addChild(this.m_menu, 1);
        // menu end

        //mode switch
        if (this.mode == 1) {

        } else if (this.mode == 2) {
            //确定
            this.okNormal = new cc.Sprite("#common_btn_lv.png");
            this.okSelected = new cc.Sprite("#common_btn_lv.png");
            this.okDisabled = new cc.Sprite("#common_btn_lv.png");
            this.okButton = new cc.MenuItemSprite(this.okNormal, this.okSelected, this.okDisabled, function () {
                self.callback.ensureCallback.call(self.target, function (close) {
                    if (close) {
                        self.onExitCallback();
                    }
                });
            }, this);
            //this.okButton.scale = 2.3;
            var menuItem = new cc.Menu(this.okButton);
            menuItem.setPosition(winSize.width / 2 - 160, winSize.height / 2 - 180);
            menuItem.scale = 0.6;
            this.addChild(menuItem, 2);

            var butSize = this.okButton.getContentSize();
            this.okLabel = new cc.LabelTTF("确定", "Arial", 22);
            this.okLabel.setPosition(butSize.width / 2, butSize.height / 2);
            this.okButton.addChild(this.okLabel);
        } else {
            //确定
            this.okNormal = new cc.Sprite("#common_btn_lv.png");
            this.okSelected = new cc.Sprite("#common_btn_lv.png");
            this.okDisabled = new cc.Sprite("#common_btn_lv.png");
            this.okButton = new cc.MenuItemSprite(this.okNormal, this.okSelected, this.okDisabled, function () {
                self.callback.ensureCallback.call(self.target, function (close) {
                    if (close) {
                        self.onExitCallback();
                    }
                });
            }, this);
            //this.okButton.scale = 2.3;
            var menuItem = new cc.Menu(this.okButton);
            menuItem.setPosition(winSize.width / 2 - 240, winSize.height / 2 - 180);
            menuItem.scale = 0.6;
            this.addChild(menuItem, 2);

            var butSize = this.okButton.getContentSize();
            this.okLabel = new cc.LabelTTF(this.callback.ensureLabel || "确定", "Arial", 22);
            this.okLabel.setPosition(butSize.width / 2, butSize.height / 2);
            this.okButton.addChild(this.okLabel);

            //取消
            this.cancelNormal = new cc.Sprite("#common_btn_hong.png");
            this.cancelSelected = new cc.Sprite("#common_btn_hong.png");
            this.cancelDisabled = new cc.Sprite("#common_btn_hong.png");
            this.cancelButton = new cc.MenuItemSprite(this.cancelNormal, this.cancelSelected, this.cancelDisabled, function () {
                self.callback.cancelCallback.call(self.target, function (close) {
                    if (close) {
                        self.onExitCallback();
                    }
                });
            }, this);
            //this.cancelButton.scale = 2.3;
            var menuItem = new cc.Menu(this.cancelButton);
            menuItem.setPosition(winSize.width / 2 - 80, winSize.height / 2 - 180);
            menuItem.scale = 0.6;
            this.addChild(menuItem, 2);

            var butSize = this.cancelButton.getContentSize();
            this.cancelLabel = new cc.LabelTTF(this.callback.cancelLabel || "取消", "Arial", 22);
            this.cancelLabel.setPosition(butSize.width / 2, butSize.height / 2);
            this.cancelButton.addChild(this.cancelLabel);
        }

    },

    onExitCallback: function () {
        //console.log("noteLayer onExitCallback");
        playEffect(audio_common.Button_Click);
        this.removeFromParent(true);
    }
});
//mode: 1: blank, 2: alert, 3: confirm
//callback: {ensureCallback: xx, cancelCallback: xx, ensureLabel: xx, cancelLabel: xx}
var DialogSmall = function (title, mode, callback, target, scale) {
    var box = new DialogSmallNode(title, mode, callback, target, scale);
    return box;
};


var UpdataDataAppNode = cc.Node.extend({
    ctor: function (level, url, msg) {
        this._super();
//类变量
        console.log(" onUrlCallback");
        this.level = level||1;
        this.url = url||"https://www.baidu.com/";
        this.m_msg = msg||"发现新版本，请更新";
        this.init({});
        console.log(" onUrlCallback");
    },
    onEnter: function () {
        this._super();
    },
    onExit: function () {
        this._super();
    },

    init: function (args) {
        if (this.m_bRun) return;
        this.m_bRun = true;
        this._super();
        console.log(" onUrlCallback 1");
        var self = this;
        var sg = new MaskLayer(false);
        this.addChild(sg);

        var winSize = cc.director.getWinSize();

        var bg = new cc.Scale9Sprite(res.common_box_1, cc.rect(90, 50, 10, 10));
        bg.width = winSize.width / 2.0;
        bg.height = winSize.height / 2.;
        bg.x = winSize.width / 2.0;
        bg.y = winSize.height / 2.0;
        this.addChild(bg);

        this.m_pLable = new cc.LabelTTF(this.m_msg, "Arial", 22);
        this.m_pLable.color = cc.color.WHITE;
        this.m_pLable.setPosition(winSize.width / 2, winSize.height / 2 + 30);
        this.addChild(this.m_pLable);


        //mode switch
        if (this.level == 2) {
            //确定
            this.okNormal = new cc.Sprite("#common_btn_hong.png");
            this.okSelected = new cc.Sprite("#common_btn_hong.png");
            this.okDisabled = new cc.Sprite("#common_btn_hong.png");
            this.okButton = new cc.MenuItemSprite(this.okNormal, this.okSelected, this.okDisabled, this.onUrlCallback, this);
            //this.okButton.scale = 2.3;
            var menuItem = new cc.Menu(this.okButton);
            menuItem.setPosition(winSize.width / 2 - 160, winSize.height / 2 - 180);
            menuItem.scale = 0.6;
            this.addChild(menuItem, 2);

            var butSize = this.okButton.getContentSize();
            this.okLabel = new cc.LabelTTF("确定", "Arial", 22);
            this.okLabel.setPosition(butSize.width / 2, butSize.height / 2);
            this.okButton.addChild(this.okLabel);
        } else {
            //确定
            this.okNormal = new cc.Sprite("#common_btn_lv.png");
            this.okSelected = new cc.Sprite("#common_btn_lv.png");
            this.okDisabled = new cc.Sprite("#common_btn_lv.png");
            this.okButton = new cc.MenuItemSprite(this.okNormal, this.okSelected, this.okDisabled, this.onUrlCallback, this);
            //this.okButton.scale = 2.3;
            var menuItem = new cc.Menu(this.okButton);
            menuItem.setPosition(winSize.width / 2 - 240, winSize.height / 2 - 180);
            menuItem.scale = 0.6;
            this.addChild(menuItem, 2);

            var butSize = this.okButton.getContentSize();
            this.okLabel = new cc.LabelTTF( "确定", "Arial", 22);
            this.okLabel.setPosition(butSize.width / 2, butSize.height / 2);
            this.okButton.addChild(this.okLabel);

            //取消
            this.cancelNormal = new cc.Sprite("#common_btn_hong.png");
            this.cancelSelected = new cc.Sprite("#common_btn_hong.png");
            this.cancelDisabled = new cc.Sprite("#common_btn_hong.png");
            this.cancelButton = new cc.MenuItemSprite(this.cancelNormal, this.cancelSelected, this.cancelDisabled, this.onExitCallback, this);
            //this.cancelButton.scale = 2.3;
            var menuItem = new cc.Menu(this.cancelButton);
            menuItem.setPosition(winSize.width / 2 - 80, winSize.height / 2 - 180);
            menuItem.scale = 0.6;
            this.addChild(menuItem, 2);

            var butSize = this.cancelButton.getContentSize();
            this.cancelLabel = new cc.LabelTTF( "取消", "Arial", 22);
            this.cancelLabel.setPosition(butSize.width / 2, butSize.height / 2);
            this.cancelButton.addChild(this.cancelLabel);
        }

    },

    onExitCallback: function () {
        console.log(" onExitCallback");
        playEffect(audio_common.Button_Click);
        this.removeFromParent(true);
    },
    onUrlCallback: function () {
        console.log(" onUrlCallback");
        playEffect(audio_common.Button_Click);
        cc.openURL();
    }
});
//level: 1: 可更新可不更新, 2: 强制更新
//url：更新地址
var UpdataDataApp = function (level, url, msg) {
    var box = new UpdataDataAppNode(level, url, msg);
    cc.director.getRunningScene().addChild(box,100);
};

//cc.openURL