var TaskScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
    },

    ctor: function (args) {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.task_plist);

        this.selected = 0;

        this.tabLayer = new TaskTabLayer({lobby: args.lobby, callback: this.onTabChange});
        this.addChild(this.tabLayer, 9);

        this.layer = new DailyTaskLayer();
        this.addChild(this.layer);

    },

    onExit: function () {
        this._super();

    },

    onTabChange: function (index) {
        var scene = cc.director.getRunningScene();
        if (scene.selected == index) return;
        if (scene.layer) {
            scene.layer.removeFromParent(true);
            scene.layer = null;
        }

        scene.selected = index;

        if (scene.selected == 0) {
            scene.layer = new DailyTaskLayer();
        }

        if (scene.selected == 1) {
            scene.layer = new ForeverTaskLayer();
        }

        scene.addChild(scene.layer);


    }

});


var DailyTaskLayer = cc.Layer.extend({
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
        var winSize = cc.director.getWinSize();

    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }
});

var ForeverTaskLayer = cc.Layer.extend({
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
        var winSize = cc.director.getWinSize();

    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }
});