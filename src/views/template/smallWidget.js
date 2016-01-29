var loadingNode = cc.Node.extend({
    ctor: function (args) {
        this._super();
//类变量
        this.m_pLable = null;
        this.m_nIdx = 0;
        this.init(args);
    },
    onEnter:function(){
        this._super();
        //console.log("loadingNode onEnter");

    },
    onExit:function(){
        this._super();
        //console.log("loadingNode onEnter");

    },

    init:function(args){
        var winSize = cc.director.getWinSize();
        var sg = new MaskLayer(true);

        var resultTxt = "加载中...";
        this.m_pLable = new cc.LabelTTF(resultTxt, "Arial", 34);
        this.m_pLable.color = cc.color.YELLOW;
        this.m_pLable.setPosition(winSize.width/2, winSize.height/2);
        sg.addChild(this.m_pLable);
        this.addChild(sg);

        this.schedule(this.onTick, 0.5);
    },
    onTick:function (dt) {
        var resultTxt = "加载中";
        this.m_nIdx = this.m_nIdx + 1;
        this.m_nIdx = this.m_nIdx%4;
        var i=0;
        for(i=0; i<this.m_nIdx; i++){
            resultTxt = resultTxt + ".";
        }
        this.m_pLable.setString(resultTxt);
    }
})

var loadingLayer = function (data) {
    var load = new loadingNode({});
    return load;
};


//////////////
var AlertBoxNode = cc.Node.extend({
    ctor: function (msg, callback,targe) {
        this._super();
//类变量
        this.m_msg = msg;
        this.m_targe = targe;
        this.m_callback = callback;

        this.m_pLable = null;
        this.m_nIdx = 0;
        this.m_bRun = false;
        this.m_bgWidth = 400;
        this.m_bgHeight = 250;
        cc.spriteFrameCache.addSpriteFrames(res.common_plist);

        this.init({});
    },
    onEnter:function(){
        this._super();
        //console.log("AlertBoxNode onEnter");
        //cc.spriteFrameCache.addSpriteFrames(res.common_plist);
    },
    onExit:function(){
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.common_plist);
        this._super();
        //console.log("AlertBoxNode onEnter");
    },

    init:function(args){
        if(this.m_bRun) return;
        this.m_bRun = true;

        this._super();
        var sg = new MaskLayer(false);
        this.addChild(sg);

        var winSize = cc.director.getWinSize();

       // var bg = new cc.Sprite("#common_box_1.png");
        var bg = new cc.Scale9Sprite("common_box_1.png", cc.rect(90, 50, 10, 10));
        bg.width = this.m_bgWidth;
        bg.height = this.m_bgHeight;
        bg.x = winSize.width / 2.0;
        bg.y = winSize.height / 2.0;
        this.addChild(bg);

        this.m_pLable = new cc.LabelTTF(this.m_msg, "Arial", 25);
        this.m_pLable.color = cc.color.YELLOW;
        this.m_pLable.setDimensions(this.m_bgWidth - 40, this.m_bgHeight - 60);
        //this.m_pLable.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.m_pLable.setPosition(winSize.width/2, winSize.height/2);
        this.addChild(this.m_pLable);

        //ok
        var okItem = new cc.MenuItemImage("#common_btn_lan.png", "#common_btn_lv.png", this.onOkCallback, this);
        okItem.setScale(0.65);
        okItem.x = winSize.width/2;
        okItem.y = winSize.height/2 - this.m_bgHeight/2 + 30;
        var okSize = okItem.getContentSize();

        var okLable = new cc.LabelTTF("确定", "Arial", 30);
        okLable.color = cc.color.YELLOW;
        okLable.x = okSize.width/2;
        okLable.y = okSize.height/2;
        okItem.addChild(okLable);
        //close
        var closeItem = new cc.MenuItemImage("#common_btn_shanchu.png", "#common_btn_shanchu.png", this.onExitCallback, this);
        closeItem.setScale(0.65);
        closeItem.x = winSize.width/2 + this.m_bgWidth/2 - 5;
        closeItem.y = winSize.height/2 + this.m_bgHeight/2 - 5;

        this.m_menu = new cc.Menu(okItem, closeItem);
        this.m_menu.tag = TAG_MENU;
        this.m_menu.x = 0;
        this.m_menu.y = 0;
        this.addChild(this.m_menu, 1);
        // menu end

    },
    onOkCallback:function () {
        //console.log("noteLayer onOkCallback");
        if (this.m_targe && cc.isFunction(this.m_callback)) {
            this.m_callback.call(this.m_targe, this)
        }
        this.removeFromParent(true);
    },
    onExitCallback:function () {
        //console.log("noteLayer onExitCallback");
        this.removeFromParent(true);
    }
});
var AlertBox = function (msg, callback,targe) {
    var box = new AlertBoxNode(msg, callback,targe);
    cc.director.getRunningScene().addChild(box);
};

var DialogWithModeNode = cc.Node.extend({
    ctor: function (title, mode, callback) {
        this._super();
//类变量
        this.m_callback = callback;

        this.mode = mode;
        this.m_msg = title;

        this.m_bRun = false;
        cc.spriteFrameCache.addSpriteFrames(res.common_plist);

        this.init({});
    },
    onEnter:function(){
        this._super();
        //console.log("AlertBoxNode onEnter");
        //cc.spriteFrameCache.addSpriteFrames(res.common_plist);
    },
    onExit:function(){
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.common_plist);
        this._super();
        //console.log("AlertBoxNode onEnter");
    },

    init:function(args){
        if(this.m_bRun) return;
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
        this.m_pLable.setPosition(winSize.width/2, winSize.height/2 + bgActualSize.height/2 - 22);
        this.addChild(this.m_pLable);

        //close
        var closeItem = new cc.MenuItemImage("#common_btn_shanchu.png", "#common_btn_shanchu.png", this.onExitCallback, this);
        closeItem.setScale(0.65);
        closeItem.x = winSize.width/2 + bgActualSize.width/2 - 8;
        closeItem.y = winSize.height/2 + bgActualSize.height/2 - 8;
        this.m_menu = new cc.Menu(closeItem);
        this.m_menu.tag = TAG_MENU;
        this.m_menu.x = 0;
        this.m_menu.y = 0;
        this.addChild(this.m_menu, 1);
        // menu end

    },

    onExitCallback:function () {
        //console.log("noteLayer onExitCallback");
        this.removeFromParent(true);
    }
});
var DialogWithMode = function (title, mode, callback) {
    var box = new DialogWithModeNode(title, mode, callback);
    return box;
};