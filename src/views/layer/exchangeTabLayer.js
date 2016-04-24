var ExchangeTabLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();
        this.ingotChangeListener = null;

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


        //ingot
        var ingotBg = new cc.Scale9Sprite("index_bg_gold.png", cc.rect(6, 5, 11, 7));
        ingotBg.setAnchorPoint(0, 0.5);
        ingotBg.setContentSize(130, 25);
        ingotBg.setPosition(100, winSize.height - 30);
        this.addChild(ingotBg);

        this.ingot = new cc.LabelTTF(zgzNumeral(gPlayer.fragment).format('0,0'), "Arial", 14);
        this.ingot.setColor(cc.color.YELLOW);
        this.ingot.setAnchorPoint(1, 0.5);
        this.ingot.setPosition(110, 10);
        ingotBg.addChild(this.ingot);

        var ingotIcon = new cc.Sprite("#common_icon_yuanbao.png");
        ingotIcon.setAnchorPoint(0, 1);
        ingotIcon.setPosition(0 - 5, 22);
        ingotBg.addChild(ingotIcon);


        //
        this.selectedSprite = new cc.Sprite("#tab_selected_bg.png");
        this.selectedSprite.scale = 0.7;

        //
        //var godNormal = new cc.Sprite("#daily_task_normal.png");
        //var godSelected = new cc.Sprite("#daily_task_normal.png");
        //var godDisabled = new cc.Sprite("#daily_task_normal.png");

        var exchangeListNormal = new cc.LabelTTF("兑换列表", "AmericanTypewriter", 40);
        exchangeListNormal.enableStroke(cc.color.WHITE, 1);
        var exchangeListSelected = new cc.LabelTTF("兑换列表", "AmericanTypewriter", 42);
        exchangeListSelected.enableStroke(cc.color.WHITE, 1);
        var exchangeListDisabled = new cc.LabelTTF("兑换列表", "AmericanTypewriter", 40);
        exchangeListDisabled.enableStroke(cc.color.WHITE, 1);
        var exchangeListButton = new cc.MenuItemSprite(exchangeListNormal, exchangeListSelected, exchangeListDisabled, this.onExchangeListClick, this);
        exchangeListButton.scale = 0.5;
        var exchangeListMenu = new cc.Menu(exchangeListButton);
        exchangeListMenu.setPosition(winSize.width - 250, winSize.height - 30);
        this.addChild(exchangeListMenu, 2);

        if (this.selected == 0) {
            this.selectedSprite.setPosition(winSize.width - 250, winSize.height - 30);
            this.addChild(this.selectedSprite)
        }

        var separatorSprite2 = new cc.Sprite("#separator.png");
        separatorSprite2.setPosition(winSize.width - 160, winSize.height - 30);
        this.addChild(separatorSprite2);

         //
        //var rechargeNormal = new cc.Sprite("#sys_task_normal.png");
        //var rechargeSelected = new cc.Sprite("#sys_task_normal.png");
        //var rechargeDisabled = new cc.Sprite("#sys_task_normal.png");

        var exchangeRecordNormal = new cc.LabelTTF("兑换记录", "AmericanTypewriter", 40);
        exchangeRecordNormal.enableStroke(cc.color.WHITE, 1);
        var exchangeRecordSelected = new cc.LabelTTF("兑换记录", "AmericanTypewriter", 42);
        exchangeRecordSelected.enableStroke(cc.color.WHITE, 1);
        var exchangeRecordDisabled = new cc.LabelTTF("兑换记录", "AmericanTypewriter", 40);
        exchangeRecordDisabled.enableStroke(cc.color.WHITE, 1);
        var exchangeRecordButton = new cc.MenuItemSprite(exchangeRecordNormal, exchangeRecordSelected, exchangeRecordDisabled, this.onExchangeRecordClick, this);
        exchangeRecordButton.scale = 0.5;
        var exchangeRecordMenu = new cc.Menu(exchangeRecordButton);
        exchangeRecordMenu.setPosition(winSize.width - 70, winSize.height - 30);
        this.addChild(exchangeRecordMenu, 2);

        if (this.selected == 1) {
            this.selectedSprite.setPosition(winSize.width - 70, winSize.height - 30);
            this.addChild(this.selectedSprite)
        }


        //
    },

    onTabChange: function (index) {
        if (this.selected == index) return;
        if (this.selectedSprite) {
            this.selectedSprite.removeFromParent(true);
            this.selectedSprite = null;
        }
        playEffect(audio_common.Button_Click);
        this.selected = index;

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

    onExchangeListClick: function () {
        this.onTabChange(0);
    },

    onExchangeRecordClick: function () {
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

        this.ingotChangeListener = EventBus.subscribe(gameEvents.INGOT_CHANGE, function (data) {
            if (self && cc.sys.isObjectValid(self)) {
                self.ingot.setString(zgzNumeral(data.ingot).format('0,0'))
            }
        });
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
        if(this.ingotChangeListener){
            EventBus.removeSubscribe(this.ingotChangeListener);
            this.ingotChangeListener = null;
        }
        //cc.eventManager.removeCustomListeners(gameEvents.INGOT_CHANGE);
    }

});