var TaskScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
    },

    ctor: function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.index_plist);
        cc.spriteFrameCache.addSpriteFrames(res.avatar_plist);

        var indexLayer = new TaskLayer();
        this.addChild(indexLayer);

    },

    onExit: function () {
        this._super();

    }

});


var TaskLayer = cc.Layer.extend({
    sprite:null,
    ctor: function () {
        this._super();

        var winSize = cc.director.getWinSize();

        //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width/2, winSize.height/2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);


        this.init();

    },
    init:function () {
        console.log("------->TaskLayer init");
        var winSize = cc.director.getWinSize();
        this.addChild(new HornSprite());
        this.addChild(createIndexScrollLayer({width:winSize.width, height:300, x:0, y:0}), 100);

    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }
});