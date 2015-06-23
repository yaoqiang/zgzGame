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

