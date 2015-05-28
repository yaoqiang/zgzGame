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



//牌局中头像框component
var PlayerLayer = cc.Layer.extend({
    ctor: function (params) {
        this._super();
        this.avatarBg = new cc.Sprite("#touxiangkuang.png");

        this.index = params.index;
        this.position = params.position;
        this.anchorX = params.anchor.x;
        this.anchorY = params.anchor.y;

        this.init();
    },
    init: function () {
        this.avatarBg.setPosition(cc.p(this.position.x, this.position.y));
        this.avatarBg.anchorX = this.anchorX;
        this.avatarBg.anchorY = this.anchorY;
        this.avatarBg.scale = ZGZ.SCALE * 0.5;
        this.addChild(this.avatarBg);


    },
    fill: function () {
        
    },
    leave: function () {
        
    },
    fan: function () {

    },
    action: function () {

    },
    chat: function () {

    },
    expression: function () {
        
    },
    identity3: function () {

    },
    zha: function () {

    },
    details: function () {
        
    }
});