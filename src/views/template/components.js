// 小喇叭component
var HornSprite = cc.Sprite.extend({
    ctor: function () {
        this._super();
        var winSize = cc.director.getWinSize();
        //horn background
        var hornBg = cc.Sprite.create("#laba_tiao.png");
        hornBg.setScale(0.8);
        hornBg.setPosition(winSize.width / 2, winSize.height - 110);
        //horn icon
        var hornIcon = cc.Sprite.create("#laba_icon.png");
        hornIcon.setAnchorPoint(0, 0);
        hornIcon.setPosition(10, 8);
        hornBg.addChild(hornIcon);
        this.addChild(hornBg);
        return true;
    }
});

// 小喇叭component
var HornSpriteForGame = cc.Sprite.extend({
    ctor: function () {
        this._super();
        var winSize = cc.director.getWinSize();
        //horn background
        var hornBg = cc.Sprite.create("#laba_tiao.png");
        hornBg.setScale(0.7);
        hornBg.setPosition(winSize.width / 2, winSize.height - 35);
        //horn icon
        var hornIcon = cc.Sprite.create("#laba_icon.png");
        hornIcon.setAnchorPoint(0, 0);
        hornIcon.setPosition(10, 8);
        hornBg.addChild(hornIcon);
        this.addChild(hornBg);
        return true;
    }
});



/**
 * 遮罩层
 * 这里要把swallowTouches设置为true，这样onTouchBegan返回true才能够吞噬触摸，不继续往优先级更低的层传递，从而实现遮挡层。
 * 调用方法：
 * var maskLayer = new MaskLayer();
 * this.addChild(maskLayer, 11);
 * _opt 默认显示半透明背景
 */
var MaskLayer = cc.LayerColor.extend({
    _listener: null,
    _fixedPriority: 0,
    _opt: true,
    ctor: function (opt) {
        this._super();
        this._fixedPriority = -129;
        this._opt = opt;
    },

    init: function () {
        var bRet = false;
        if (this._super()) {
            bRet = true;
        }
        return bRet;
    },

    onEnter: function () {
        this._super();

        if(this._opt){
            var op = 160; //半透明
        }else{
            var op = 0; //全透明
        }
        this.setColor(cc.color.BLACK);
        this.setOpacity(op);

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(listener, this);
        this._listener = listener;
    },

    onExit: function () {
        cc.eventManager.removeListener(this._listener);
        this._super();
    }
});


var Alert = cc.Layer.extend({
    ctor:function(msg, callback) {
        var winSize = cc.director.getWinSize();
        var backgroundChild, labelChild, closeChild, closeMenuItem;
        var menu;

        this._super();

        backgroundChild = new cc.LayerColor(cc.color(50, 50, 50, 255));

        labelChild = new cc.LabelTTF(msg, "Arial", 15);

        backgroundChild.width = labelChild.getContentSize().width + (winSize.width / 15);
        backgroundChild.height = labelChild.getContentSize().height + (winSize.height / 15);
        backgroundChild.setPosition(cc.p(backgroundChild.width / -2, backgroundChild.height / -2));

        closeChild = new cc.LabelTTF("X", "Arial", 10);
        closeChild.setColor(cc.color(200, 200, 200, 255));
        closeMenuItem = new cc.MenuItemLabel(closeChild, callback, this);

        menu = new cc.Menu(closeMenuItem);
        menu.setPosition((backgroundChild.width / 2) - 10, (backgroundChild.height / 2) - 10);

        this.addChild(backgroundChild);
        this.addChild(labelChild);
        this.addChild(menu);

        this.setPosition(winSize.width / 2, winSize.height / 2);
    }
});