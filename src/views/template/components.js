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
 * var maskLayer = MaskLayer.create();
 * this.addChild(maskLayer, 11);
 * _opt 默认显示半透明背景
 * Created by Young on 2015/6/5.
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

MaskLayer.create = function (opt) {
    var sg = new MaskLayer(opt);
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};