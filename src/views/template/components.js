// 小喇叭component
var HornSprite = cc.Sprite.extend({
    ctor: function () {
        this._super();
        var winSize = cc.director.getWinSize();
        //horn background
        var hornBg = new cc.Sprite("#common_bg_laba.png");
        hornBg.setScale(0.8);
        hornBg.setPosition(winSize.width / 2, winSize.height - 110);
        //horn icon
        var hornIcon = new cc.Sprite("#common_icon_laba_2.png");
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
        var hornBg = new cc.Sprite("#common_bg_laba.png");
        hornBg.setScale(0.7);
        hornBg.setPosition(winSize.width / 2, winSize.height - 35);
        //horn icon
        var hornIcon = new cc.Sprite("#common_icon_laba_2.png");
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
        this._fixedPriority = 0;
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
                console.log("---------");
                return true;
            }
        });
        cc.eventManager.addListener(listener, this);
        this._listener = listener;
        console.log("---------onEnter");
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
        backgroundChild.setPosition(backgroundChild.width / -2, backgroundChild.height / -2);

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



//////////////////////////////////////
//
var prompt = function(){
}

/**
 * 上方弹出提示
 * @param txt
 * @param opts
 */
prompt.fade = function (txt, opts) {
    var winSize = cc.director.getWinSize();
    var label1 = new cc.LabelTTF(txt, "Arial", 28);

    label1.color = opts && opts.color || cc.color.YELLOW;

    var topBox = new cc.Sprite('#common_bg_shangfangtishi.png');
    topBox.setScale(0.8);
    topBox.setAnchorPoint(0.5, 0);
    topBox.setPosition(winSize.width/2, winSize.height);
    cc.director.getRunningScene().addChild(topBox);

    label1.setPosition(topBox.width/2, topBox.height/2 - 12);
    topBox.addChild(label1);
    var moveDown = cc.moveBy(opts && opts.duration || 2, cc.p(0, -50));
    var moveBack = moveDown.reverse();

    topBox.runAction(cc.sequence(moveDown, moveBack));

}

/**
 * 在屏幕中间提示语
 * @param txt
 * @param duration
 */
prompt.fadeMiddle = function (txt, duration) {
    var winSize = cc.director.getWinSize();
    var toast = new Toast();
    toast.set({text : txt,
        backgroundColor : cc.color(50, 50, 50, 255),
        fontFillColor : cc.color(255, 255, 255, 255),
        fontSize : 15,
        fontName : "Arial",
        duration : duration || 2,
        position : cc.p(winSize.width / 2, winSize.height / 2)});
    toast.run(cc.director.getRunningScene());
}

/**
 * 提示语
 */
var Toast = cc.Layer.extend({
    _duration:2,
    _labelChild:null,
    _backgroundChild:null,
    _backgroundImage:null,
    _backgroundImageCheck:false,
    ctor:function() {
        var winSize = cc.director.getWinSize();

        this._super();

        _backgroundChild = new cc.LayerColor(cc.color(50, 50, 50, 255));
        _backgroundChild.setLocalZOrder(1);
        _labelChild = new cc.LabelTTF("", "Arial", 15);
        _labelChild.setLocalZOrder(3);
        _backgroundImageCheck = false;

        this.adjustBackgroundChild();

        this.addChild(_backgroundChild);
        this.addChild(_labelChild);

        this.setPosition(winSize.width / 2, winSize.height / 2);
    },
    set:function(params) {
        if(params.backgroundColor) {
            this.setBackgroundColor(params.backgroundColor);
        }

        if(params.fontFillColor) {
            this.setFontFillColor(params.fontFillColor);
        }

        if(params.fontSize) {
            this.setFontSize(params.fontSize);
        }

        if(params.fontName) {
            this.setFontName(params.fontName);
        }

        if(params.text) {
            this.setText(params.text);
        }

        if(params.duration) {
            this.setDuration(params.duration);
        }

        if(params.position) {
            this.setPosition(params.position);
        }

        if(params.backgroundImage) {
            this.setBackgroundImage(params.backgroundImage);
        }
    },
    adjustBackgroundChild:function() {
        var winSize = cc.director.getWinSize();

        _backgroundChild.width = _labelChild.getContentSize().width + (winSize.width / 20);
        _backgroundChild.height = _labelChild.getContentSize().height + (winSize.height / 20);
        _backgroundChild.setPosition(cc.p(_backgroundChild.width / -2, _backgroundChild.height / -2));

        if(_backgroundImageCheck) {
            _backgroundImage.setScaleX((_labelChild.getContentSize().width + (winSize.width / 20)) / _backgroundImage.getContentSize().width);
            _backgroundImage.setScaleY((_labelChild.getContentSize().height + + (winSize.height / 20)) / _backgroundImage.getContentSize().height);
        }
    },
    setBackgroundImage:function(backgroundImage) {
        var winSize = cc.director.getWinSize();

        if(_backgroundImageCheck) {
            var sprite = new cc.Sprite(backgroundImage);

            _backgroundImage.setTexture(sprite.texture);
            _backgroundImage.setScaleX((_labelChild.getContentSize().width + (winSize.width / 20)) / _backgroundImage.getContentSize().width);
            _backgroundImage.setScaleY((_labelChild.getContentSize().height + + (winSize.height / 20)) / _backgroundImage.getContentSize().height);
        }
        else {
            _backgroundImage = new cc.Sprite(backgroundImage);
            _backgroundImage.setScaleX((_labelChild.getContentSize().width + (winSize.width / 20)) / _backgroundImage.getContentSize().width);
            _backgroundImage.setScaleY((_labelChild.getContentSize().height + + (winSize.height / 20)) / _backgroundImage.getContentSize().height);
            _backgroundImage.setLocalZOrder(2);
            this.addChild(_backgroundImage);
            _backgroundImageCheck = true;
        }
    },
    getBackgroundImage:function() {
        return _backgroundImage;
    },
    setBackgroundColor:function(backgroundColor) {
        _backgroundChild.setColor(backgroundColor);
    },
    getBackgroundColor:function() {
        return _backgroundChild.getColor();
    },
    setFontFillColor:function(fontFillColor) {
        _labelChild.setFontFillColor(fontFillColor);
    },
    getFontFillColor:function() {
        return _labelChild.getColor();
    },
    setFontName:function(fontName) {
        _labelChild.setFontName(fontName);
    },
    getFontName:function() {
        return _labelChild.getFontName();
    },
    setFontSize:function(fontSize) {
        _labelChild.setFontSize(fontSize);
        this.adjustBackgroundChild();
    },
    getFontSize:function() {
        return _labelChild.getFontSize();
    },
    setText:function(text) {
        _labelChild.setString(text);
        this.adjustBackgroundChild();
    },
    getText:function() {
        return _labelChild.getString();
    },
    setDuration:function(duration) {
        _duration = duration;
    },
    getDuration:function() {
        return _duration;
    },
    run:function(parent) {
        var childFadeInAction = new cc.FadeIn(0.5);
        var childFadeOutAction = new cc.FadeOut(0.5);
        var childDelayAction = new cc.DelayTime(this._duration);
        var toastDelayAction = new cc.DelayTime(this._duration + 1);
        var toastFinishAction = new cc.CallFunc(function() {
            this.removeFromParent(true);
        }, this);
        var childSequenceAction = new cc.Sequence(childFadeInAction, childDelayAction, childFadeOutAction);
        var toastSequenceAction = new cc.Sequence(toastDelayAction, toastFinishAction);

        _labelChild.setOpacity(0);
        _labelChild.runAction(childSequenceAction.clone());
        _backgroundChild.setOpacity(0);
        _backgroundChild.runAction(childSequenceAction.clone());
        if(_backgroundImageCheck) {
            _backgroundImage.setOpacity(0);
            _backgroundImage.runAction(childSequenceAction.clone());
        }

        parent.addChild(this);
        this.runAction(toastSequenceAction);
    }
});
