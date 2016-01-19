var ProfileScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.profile_plist);

        var inboxTabLayer = new InboxTabLayer({});
        this.addChild(inboxTabLayer, 9);

        var layer = new ProfileLayer();
        this.addChild(layer);
    },

    onExit: function () {
        this._super();
    }
});


var ProfileLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var winSize = cc.director.getWinSize();

        //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width/2, winSize.height/2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        var avatarBg = new cc.Sprite("#hallinfo_kuang.png");
        avatarBg.setPosition(250, winSize.height/2 + 50);
        avatarBg.scale = ZGZ.SCALE * 0.3;
        this.addChild(avatarBg);



    }
});

var BagLayer = cc.Layer.extend({
    ctor: function() {
        this._super();


        var size = cc.director.getWinSize();

    }
});