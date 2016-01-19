// 小喇叭layer
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

// 游戏内小喇叭
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

