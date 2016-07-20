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
    ctor: function (msg, callback, targe, notClose) {
        this._super();
//类变量
        this.m_msg = msg;
        this.m_targe = targe;
        this.m_callback = callback;
        this.notClose = notClose;

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

        if (this.notClose === undefined) {
            //close
            var closeItem = new cc.MenuItemImage(res.common_btn_shanchu, res.common_btn_shanchu, this.onExitCallback, this);
            closeItem.setScale(0.65);
            closeItem.x = winSize.width / 2 + this.m_bgWidth / 2 - 5;
            closeItem.y = winSize.height / 2 + this.m_bgHeight / 2 - 5;

            this.m_menu = new cc.Menu(okItem, closeItem);

        }
        else {
            this.m_menu = new cc.Menu(okItem);
        }
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
var AlertBox = function (msg, callback, targe, notClose) {
    var box = new AlertBoxNode(msg, callback, targe, notClose);
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
    ctor: function (title, mode, callback, target, bgScale, offset) {
        this._super();
//类变量
        this.callback = callback;

        this.target = target;

        this.bgScale = bgScale ? bgScale : 1;

        this.offset = {h: 0, w: 0};

        this.offset.w = offset !== undefined && offset.w !== undefined ? offset.w : 0;
        this.offset.h = offset !== undefined && offset.h !== undefined ? offset.h : 0;

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
        this.bg.x = winSize.width / 2 + this.offset.w;
        this.bg.y = winSize.height / 2 + this.offset.h;
        this.bg.scale = 0.4 * this.bgScale;
        this.addChild(this.bg);

        var bgActualSize = this.bg.getBoundingBox();


        this.m_pLable = new cc.LabelTTF(this.m_msg, "AmericanTypewriter", 20);
        this.m_pLable.enableStroke(cc.color.WHITE, 1);
        this.m_pLable.color = cc.color.WHITE;
        //this.m_pLable.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.m_pLable.setPosition(winSize.width / 2 + this.offset.w, winSize.height / 2 + bgActualSize.height / 2 - 18 + this.offset.h);
        this.addChild(this.m_pLable);

        //close
        var closeItem = new cc.MenuItemImage("#common_btn_shanchu.png", "#common_btn_shanchu.png", this.onExitCallback, this);
        closeItem.setScale(0.65);
        closeItem.x = winSize.width / 2 + bgActualSize.width / 2 - 8 + this.offset.w;
        closeItem.y = winSize.height / 2 + bgActualSize.height / 2 - 8 + this.offset.h;
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
            menuItem.setPosition(winSize.width / 2 - 160, winSize.height / 2 - 190);
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
            menuItem.setPosition(winSize.width / 2 - 240, winSize.height / 2 - 190);
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
            menuItem.setPosition(winSize.width / 2 - 80, winSize.height / 2 - 190);
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
//scale: 背景框缩放比例
//offset: 背景框位置偏移量
var DialogSmall = function (title, mode, callback, target, scale, offset) {
    var box = new DialogSmallNode(title, mode, callback, target, scale, offset);
    return box;
};

var DialogSmallNode_T = cc.Node.extend({
    ctor: function (title, mode, callback, target, bgScale, offset) {
        this._super();
//类变量
        this.callback = callback;

        this.target = target;

        this.bgScale = bgScale ? bgScale : 1;

        this.offset = {h: 0, w: 0};

        this.offset.w = offset !== undefined && offset.w !== undefined ? offset.w : 0;
        this.offset.h = offset !== undefined && offset.h !== undefined ? offset.h : 0;


        this.mode = mode;
        this.m_msg = title;

        this.m_bRun = false;

        this.init({});
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

        var self = this;
        var sg = new MaskLayer(false);
        this.addChild(sg);

        var winSize = cc.director.getWinSize();

        var bgString = "#dialog_bg_middle.png";

        this.bg = new cc.Sprite(bgString);
        this.bg.x = winSize.width / 2 + this.offset.w;
        this.bg.y = winSize.height / 2 + this.offset.h;
        this.bg.scale = this.bgScale;
        this.addChild(this.bg);

        var bgActualSize = this.bg.getBoundingBox();


        this.m_pLable = new cc.LabelTTF(this.m_msg, "AmericanTypewriter", 20);
        this.m_pLable.enableStroke(cc.color.WHITE, 1);
        this.m_pLable.color = cc.color.WHITE;
        //this.m_pLable.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.m_pLable.setPosition(winSize.width / 2 + this.offset.w, winSize.height / 2 + bgActualSize.height / 2 - 18 + this.offset.h);
        this.addChild(this.m_pLable);

        //close
        var closeItem = new cc.MenuItemImage("#common_btn_shanchu.png", "#common_btn_shanchu.png", this.onExitCallback, this);
        closeItem.setScale(0.65);
        closeItem.x = winSize.width / 2 + bgActualSize.width / 2 - 8 + this.offset.w;
        closeItem.y = winSize.height / 2 + bgActualSize.height / 2 - 8 + this.offset.h;
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
        playEffect(audio_common.Button_Click);
        this.removeFromParent(true);
    }
});
//mode: 1: blank, 2: alert, 3: confirm
//callback: {ensureCallback: xx, cancelCallback: xx, ensureLabel: xx, cancelLabel: xx}
//scale: 背景框缩放比例
//offset: 背景框位置偏移量
var DialogSmall_T = function (title, mode, callback, target, scale, offset) {
    var box = new DialogSmallNode_T(title, mode, callback, target, scale, offset);
    return box;
};

var DialogHistoryNode = cc.Node.extend({
    ctor: function (msg) {
        this._super();
//类变量
        this.m_msg = msg ? msg : "";
        this.m_pLable = null;
        this.m_bRun = false;
        var winSize = cc.director.getWinSize();
        this.m_w  = winSize.width*0.7;
        this.m_h = 40;
        this.m_bgw  = this.m_w + 10;
        this.m_bgh = winSize.height*0.9 ;

        this.init(msg);
    },
    onEnter: function () {
        this._super();
    },
    onExit: function () {
        this._super();
    },

    init: function (msg) {
        if (this.m_bRun) return;
        this.m_bRun = true;

        this._super();

        var self = this;
        var sg = new MaskLayer(false);
        this.addChild(sg);

        var winSize = cc.director.getWinSize();
        var xx =   winSize.width/2;
        var yy = winSize.height - 30;
        var bgString = "game_dikuang_4.png";

        this.bg = new cc.Scale9Sprite(bgString, cc.rect(10, 10, 10, 10));
        this.bg.setAnchorPoint(0.5, 1);
        this.bg.width = this.m_bgw;
        this.bg.height =this.m_bgh;
        this.bg.x = winSize.width/2;
        this.bg.y = winSize.height-20;
        this.addChild(this.bg);

        var bgActualSize = this.bg.getBoundingBox();

        var num = gHistoryMassage.length;
        var i=0;
        for(i=0; i<num;i++){
            var data = gHistoryMassage[num-1-i];
            var lable = new cc.LabelTTF(data.from + ": " + data.msg, "AmericanTypewriter", 20);
            lable.setAnchorPoint(0, 0.5);
            lable.color = cc.color.BLACK;
            lable.setPosition(this.bg.x - this.bg.width/2 + 20, yy - this.m_h/2-30 -(i+1)*26);
            this.addChild(lable);
        }




        this.setString(msg);

    },

    setString: function (msg) {
        if(this.m_pLable == null){
            var winSize = cc.director.getWinSize();
            var xx =   winSize.width/2;
            var yy = winSize.height - 30;

            var bg = new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29));
            bg.setAnchorPoint(0.5, 0.5);
            bg.width = this.m_w;
            bg.height = this.m_h;
            bg.x = xx;
            bg.y = yy-30;
            this.addChild(bg);


            this.m_pLable = new cc.LabelTTF(msg, "AmericanTypewriter", 25);
            //this.m_pLable.enableStroke(cc.color.WHITE, 1);
            this.m_pLable.setAnchorPoint(0.5, 0.5);
            this.m_pLable.color = cc.color.BLACK;
            //this.m_pLable.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.m_pLable.setPosition(xx, yy - this.m_h/2-10 );
            this.addChild(this.m_pLable);
        }else{
            this.m_pLable.setString(msg);
        }

        this.m_msg = msg;
    }
});

var DialogHistory = function (msg) {
    var box = new DialogHistoryNode(msg);
    return box;
};


var UpdataDataAppNode = cc.Node.extend({
    ctor: function (level, url, msg) {
        this._super();
//类变量
//        console.log(" onUrlCallback");
        this.level = level||1;
        this.url = url||"https://www.baidu.com/";
        this.m_msg = msg||"发现新版本，请更新";
        this.init({});
        //console.log(" onUrlCallback");
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
        //console.log(" onUrlCallback 1");
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
        //console.log(" onExitCallback");
        playEffect(audio_common.Button_Click);
        this.removeFromParent(true);
    },
    onUrlCallback: function () {
        //console.log(" onUrlCallback");
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

var TrumpetBoxLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        this._super();
        this.init();
        return;

    },
    init: function () {
        //console.log("---|---->init");
        var winSize = cc.director.getWinSize();

        //add trumpet btn
        var talkIcon = new ccui.Button();
        talkIcon.setAnchorPoint(0, 0.5);
        talkIcon.setTouchEnabled(true);
        talkIcon.loadTextures("btn_hall_chat_nor.png", "btn_hall_chat_nor.png", "btn_hall_chat_nor.png", ccui.Widget.PLIST_TEXTURE);
        talkIcon.addTouchEventListener(this.onTrumpetBtnClick, this);
        talkIcon.x = 0;
        talkIcon.y = winSize.height/2;
        talkIcon.scale = 0.55;

        this.addChild(talkIcon, 11);
    },

    onTrumpetBtnClick: function (ref, event) {
        if (event === ccui.Widget.TOUCH_ENDED) {
            playEffect(audio_common.Button_Click);

            this.trumpetBox = new DialogSmall_T('聊 天', 1, null, null, 0.4, {w: 0, h: -30});
            var bgScale = this.trumpetBox.bgScale
            var bgRect = this.trumpetBox.bg.getBoundingBox();

            var trumpetHeaderIcon = new cc.Sprite("#common_icon_laba_2.png");
            trumpetHeaderIcon.scale = 1.5*bgScale;
            trumpetHeaderIcon.setPosition(bgRect.x + 150*bgScale, bgRect.y + 530*bgScale);
            this.trumpetBox.addChild(trumpetHeaderIcon);

            var blockSize = cc.size(620*bgScale, 84*bgScale);
            this.trumpetContent = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
            this.trumpetContent.x = bgRect.x + 395*bgScale;
            this.trumpetContent.y = bgRect.y + 460*bgScale;
            this.trumpetContent.setFontColor(cc.color.BLACK);
            this.trumpetContent.setFont("Arial", 40*bgScale);
            // this.trumpetContent.color = cc.color.WHITE;
            this.trumpetContent.setPlaceHolder('小喇叭内容');
            //this.trumpetContent.setMaxLength(20);
            this.trumpetContent.setPlaceholderFontColor(cc.color.WHITE);
            this.trumpetContent.setDelegate(this);
            this.trumpetBox.addChild(this.trumpetContent);
            //btn
            var btnTrumpet = new ccui.Button("common_btn_lv.png", "common_btn_lv.png", "common_btn_lv.png", ccui.Widget.PLIST_TEXTURE);
            btnTrumpet.setPosition(bgRect.x+ 820*bgScale, bgRect.y + 460*bgScale);
            btnTrumpet.setTitleText("发送");
            btnTrumpet.setTitleFontSize(30);
            btnTrumpet.scale = bgScale;
            btnTrumpet.addTouchEventListener(this.doTrumpetChat, this);
            this.trumpetBox.addChild(btnTrumpet);

            var self = this;
            var xx = bgRect.x + 200*bgScale;
            //当前玩家喇叭情况, 如果没有则显示快捷购买喇叭
            UniversalController.getMyItemList(function (data) {

                if (data.code != RETURN_CODE.OK) {
                    return;
                }

                if (data.itemList.length == 0) {
                    self.trumpetVal = 0;
                }

                _.each(data.itemList, function (item) {
                    if (item.id == 2) {
                        self.trumpetVal = item.value;
                    }
                });

                if (self.trumpetVal > 0) {
                    self.trumpetCountString = new cc.LabelTTF('您还有' + self.trumpetVal + "个小喇叭", "AmericanTypewriter", 30*bgScale);
                    self.trumpetCountString.setPosition(xx, bgRect.y + 530*bgScale);
                    self.trumpetCountString.setAnchorPoint(0, 0.5);
                    self.trumpetCountString.color = {r: 0, g: 255, b: 127};
                    self.trumpetBox.addChild(self.trumpetCountString);

                    //
                    //var trumpetCountIcon = new cc.Sprite("#common_icon_laba.png");
                    //trumpetCountIcon.scale = 0.8*bgScale;
                    //trumpetCountIcon.setPosition(bgRect.x + 350*bgScale, bgRect.y + 170*bgScale);
                    //self.rightBox.addChild(trumpetCountIcon);
                }
                else {
                    var trumpetCountString = new cc.LabelTTF("您当前没有小喇叭,可前往商城购买", "AmericanTypewriter", 30*bgScale);
                    trumpetCountString.setPosition(xx, bgRect.y + 530*bgScale);
                    trumpetCountString.setAnchorPoint(0, 0.5);
                    trumpetCountString.color = cc.color.RED;
                    self.trumpetBox.addChild(trumpetCountString);
                }


            });

//历史
            var x = xx - 90*bgScale, y = bgRect.y + 415*bgScale - (0+1)*50*bgScale;

            var num = gHistoryMassage.length;
            var i=0;
            for(i=0; i<num;i++){

                var data = gHistoryMassage[num-1-i];
                var msg = "";
                if (data.msg.length > 10) {
                    msg = data.msg.substring(0, 10) + '\n' + data.msg.substring(10, data.msg.length);
                }
                else {
                    msg = data.msg;
                }
                var lable = new cc.LabelTTF(data.from + ": " + msg, "AmericanTypewriter", 40*bgScale);
                lable.setAnchorPoint(0, 1);
                lable.color = cc.color.WHITE;

                lable.setPosition(x, y);

                y = y - 50*bgScale - 22;

                self.trumpetBox.addChild(lable);
            }

            this.addChild(this.trumpetBox, 1);

        }
    },

    doTrumpetChat: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;

            case ccui.Widget.TOUCH_MOVED:
                break;

            case ccui.Widget.TOUCH_ENDED:
                playEffect(audio_common.Button_Click);

                if (this.trumpetVal == 0) {
                    prompt.fadeMiddle('您没有小喇叭,可在商城购买后使用');
                    return;
                }

                var content = this.trumpetContent.getString();
                if (content == '') {
                    prompt.fadeMiddle('请输入喇叭内容');
                    return;
                }

                this.trumpetVal -= 1;
                this.trumpetCountString.setString('您还有'+this.trumpetVal+'个');
                GameController.chat(GAME.CHAT.SCOPE_ALL, '', '', content);
                this.trumpetBox.removeFromParent(true);

                break;

            case ccui.Widget.TOUCH_CANCELED:
                break;

            default:
                break;
        }
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }
});