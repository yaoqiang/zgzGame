var GameScene = cc.Scene.extend({
    onEnter: function () {

        this._super();

    },

    ctor: function (type) {
        this._super();
        var layer = new GameLayer(type);
        this.addChild(layer);

    }

});

var GameLayer = cc.Layer.extend({
    sprite: null,
    ctor: function (type) {
        this._super();
        this.type = type;

        this.init();


    },

    init: function () {
        cc.spriteFrameCache.addSpriteFrames(res.common_plist, res.common_png);
        var winSize = cc.director.getWinSize();

        var bg = cc.Scale9Sprite.createWithSpriteFrameName("beijing.png", cc.rect(1, 1, 15, 15));
        bg.setContentSize(winSize.width, winSize.height);
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);

    },

    join: function () {

    },

    leave: function () {

    },

    ready: function () {

    },
    
    start: function () {
        
    },

    fanOut: function () {

    },
    
    
    over: function () {

    }
    
    
});