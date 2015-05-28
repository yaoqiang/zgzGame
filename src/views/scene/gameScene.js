var GameScene = cc.Scene.extend({
    ctor: function (type) {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.common_plist, res.common_png);
        cc.spriteFrameCache.addSpriteFrames(res.game_plist, res.game_png);

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


        var winSize = cc.director.getWinSize();

        //牌桌
        var bg = cc.Sprite.create("#beijing.png");
        bg.setPosition(cc.p(winSize.width/2, winSize.height/2));
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        this.addChild(new HornSpriteForGame());

        //其他玩家
        switch (this.type)
        {
            case ZGZ.GAME_TYPE.T1:
                var player1 = new PlayerLayer({index: 0, position: {x: 20, y: 100}, anchor: {x: 0, y: 0}});
                var player2 = new PlayerLayer({index: 0, position: {x: 20, y: 300}, anchor: {x: 0, y: 0}});
                var player3 = new PlayerLayer({index: 0, position: {x: winSize.width-20, y: 300}, anchor: {x: 1, y: 0}});
                var player4 = new PlayerLayer({index: 0, position: {x: winSize.width-20, y: 100}, anchor: {x: 1, y: 0}});

                this.addChild(player1);
                this.addChild(player2);
                this.addChild(player3);
                this.addChild(player4);
                break;
            case ZGZ.GAME_TYPE.T2:
                break;
        }

    },

    join: function () {

    },

    leave: function () {

    },

    ready: function () {

    },
    
    start: function () {
        
    },

    fan: function () {

    },

    over: function () {

    }
    
    
});