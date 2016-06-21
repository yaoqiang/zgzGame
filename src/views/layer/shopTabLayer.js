var ShopTabLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();
        this.goldChangeListener = null;

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
        //
        this.selectedSprite = new cc.Sprite("#tab_selected_bg.png");
        this.selectedSprite.scale = 0.7;

        //
        var goldNormal = new cc.Sprite("#golds_normal.png");
        var goldSelected = new cc.Sprite("#golds_selected.png");
        var goldDisabled = new cc.Sprite("#golds_normal.png");
        var goldButton = new cc.MenuItemSprite(goldNormal, goldSelected, goldDisabled, this.onGoldClick, this);
        goldButton.scale = 0.5;
        var goldMenu = new cc.Menu(goldButton);
        goldMenu.setPosition(winSize.width - 250, winSize.height - 30);
        this.addChild(goldMenu, 2);

        if (this.selected == 0) {
            this.selectedSprite.setPosition(winSize.width - 250, winSize.height - 30);
            this.addChild(this.selectedSprite)
        }

        var separatorSprite = new cc.Sprite("#separator.png");
        separatorSprite.setPosition(winSize.width - 155, winSize.height - 30);
        this.addChild(separatorSprite);

        //
        var propNormal = new cc.Sprite("#daoju_normal.png");
        var propSelected = new cc.Sprite("#daoju_selected.png");
        var propDisabled = new cc.Sprite("#daoju_normal.png");
        var propButton = new cc.MenuItemSprite(propNormal, propSelected, propDisabled, this.onPropClick, this);
        propButton.scale = 0.5;
        var propMenu = new cc.Menu(propButton);
        propMenu.setPosition(winSize.width - 70, winSize.height - 30);
        this.addChild(propMenu, 2);

        if (this.selected == 1) {
            this.selectedSprite.setPosition(winSize.width - 70, winSize.height - 30);
            this.addChild(this.selectedSprite)
        }
    },

    onTabChange: function (index) {
        if (this.selected == index) return;
        if (this.selectedSprite) {
            this.selectedSprite.removeFromParent(true);
            this.selectedSprite = null;
        }

        this.selected = index;
        playEffect(audio_common.Button_Click);
        //
        this.selectedSprite = new cc.Sprite("#tab_selected_bg.png");
        this.selectedSprite.scale = 0.7;
        var winSize = cc.director.getWinSize();
        //
        if (this.selected == 0) {
            this.selectedSprite.setPosition(winSize.width - 250, winSize.height - 30);
        }

        if (this.selected == 1) {
            this.selectedSprite.setPosition(winSize.width - 70, winSize.height - 30);
        }
        this.addChild(this.selectedSprite);

        this.args.callback.call(this.args.target, index);

    },

    onGoldClick: function () {
        this.onTabChange(0);
    },

    onPropClick: function () {
        this.onTabChange(1);
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

        this.goldChangeListener = EventBus.subscribe(gameEvents.GOLD_CHANGE, function (data) {
            if (self && cc.sys.isObjectValid(self)) {
                self.gold.setString(zgzNumeral(data.gold).format('0,0'))
            }
        });
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
        if(this.goldChangeListener){
            EventBus.removeSubscribe(this.goldChangeListener);
            this.goldChangeListener = null;
        }
        //cc.eventManager.removeCustomListeners(gameEvents.INGOT_CHANGE);
    }

});