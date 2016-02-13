var ShopTabLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();

        this.initSubscribeEvent();

        this.selected = args.selected || 0;

        this.args = args;
        this.lobbyId = args.lobbyId;

        var winSize = cc.director.getWinSize();

        var bg = new cc.Sprite("#deep_bg_big.png");
        bg.setPosition(winSize.width / 2, winSize.height);
        bg.scaleX = 2
        this.addChild(bg);

        var backNormal = new cc.Sprite("#back_btn.png");
        var backSelected = new cc.Sprite("#back_btn.png");
        var backDisabled = new cc.Sprite("#back_btn.png");
        var leaveButton = new cc.MenuItemSprite(backNormal, backSelected, backDisabled, this.onBackButton, this);
        leaveButton.scale = 0.7
        var menu = new cc.Menu(leaveButton);
        menu.setPosition(30, winSize.height - 30);
        this.addChild(menu);


        //gold
        var goldBg = new cc.Scale9Sprite("index_bg_gold.png", cc.rect(6, 5, 11, 7));
        goldBg.setAnchorPoint(0, 0.5);
        goldBg.setContentSize(130, 25);
        goldBg.setPosition(100, winSize.height - 30);
        this.addChild(goldBg);

        this.gold = new cc.LabelTTF(zgzNumeral(gPlayer.gold).format('0,0'), "Arial", 14);
        this.gold.setColor(cc.color.YELLOW);
        this.gold.setAnchorPoint(1, 0.5);
        this.gold.setPosition(110, 10);
        goldBg.addChild(this.gold);

        var goldIcon = new cc.Sprite("#common_icon_coins_1.png");
        goldIcon.setAnchorPoint(0, 1);
        goldIcon.scale = 0.5
        goldIcon.setPosition(0 - 5, 22);
        goldBg.addChild(goldIcon);

        //
    },


    onBackButton: function () {
        playEffect(audio_common.Button_Click);
        if (this.lobbyId != undefined) {
            GameController.enterLobby(this.lobbyId);
        }
        else {
            UniversalController.enterIndex();
        }
    },

    initSubscribeEvent: function () {
        var self = this;

        EventBus.subscribe(gameEvents.GOLD_CHANGE, function (data) {
            self.gold.setString(zgzNumeral(data.gold).format('0,0'))
        });
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

        //cc.eventManager.removeCustomListeners(gameEvents.INGOT_CHANGE);
    }

});