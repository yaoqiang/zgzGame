var IndexScene = cc.Scene.extend({
    onEnter: function () {

        this._super();
        //var pLayer = new lobbyTableLayer({});
        //this.addChild(pLayer);

    },

    ctor: function (lobbyData) {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.index_plist);
        cc.spriteFrameCache.addSpriteFrames(res.avatar_plist);
        cc.spriteFrameCache.addSpriteFrames(res.common_plist);

        //header
        var headerLayer = new HeaderLayer({lobby: undefined});
        this.addChild(headerLayer, 1);


        var indexLayer = new IndexLayer(lobbyData);
        this.addChild(indexLayer);

        //template
        var bottomBtnLayer = new BottomBtnLayer({});
        this.addChild(bottomBtnLayer);



        //add a keyboard event listener to statusLabel

        //首页, 如果按1次,弹出是否退出, 再按一次, 退出应用
        this.keyboardListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
            },
            onKeyReleased: function(keyCode, event){
                var target = event.getCurrentTarget();
                if (keyCode == cc.KEY.back) {

                }

            }
        }, this);

    },

    onExit: function () {
        this._super();

    }

});


var IndexLayer = cc.Layer.extend({
    sprite:null,
    ctor: function (lobbyData) {
        this._super();

        var winSize = cc.director.getWinSize();

        //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width/2, winSize.height/2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        this.init(lobbyData);
        return ;


       // return true;
    },
    init:function (lobbyData) {
        //console.log("---|---->init");
        var winSize = cc.director.getWinSize();
        this.addChild(new HornSprite());
        this.addChild(createIndexScrollLayer({width: winSize.width, height: 350, x: 0, y: 0, lobbyData: lobbyData}), 100);
        //this.addChild(new createLobbyScrollLayer({width:winSize.width, height:300, x:0, y:0}), 100);
        //this.addChild(new createLobbyTableLayer({width:winSize.width, height:300, x:0, y:0, cwidth:winSize.width-20, cheight:40}), 100);
    },
    onMenuCallback: function () {
        this.lobbyMenu.enabled = false;
        //this.scheduleOnce(function () {
        //    this.lobbyMenu.enabled = true;
        //}, 2);
        this.onLobbyIconClicked(this.lobbyOf5Icon, 0);

    },
    onMenuCallback2: function () {
        this.lobbyMenu.enabled = false;
        this.scheduleOnce(function () {
            this.lobbyMenu.enabled = true;
        }, 2);
        this.onLobbyIconClicked(this.lobbyOf7Icon, 1);

    },

    onLobbyIconClicked: function(node, lobbyId)
    {
        GameController.enterLobby(lobbyId);
    },

    onEnter: function () {
        this._super();
        //
        cc.eventManager.removeListener(this.keyboardListener);
    },

    onExit: function () {
        this._super();
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.common_png);
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.index_png);
    }
});