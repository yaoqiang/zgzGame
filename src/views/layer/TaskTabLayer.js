var TaskTabLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();

        this.initSubscribeEvent();

        //this.lobbyId = args.lobbyId;
        //0: daily selected, 1: forever selected
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

        //gold and ingot;
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
        goldIcon.setScale(0.5);
        goldIcon.setAnchorPoint(0, 1);
        goldIcon.setPosition(0 - 5, 28);
        goldBg.addChild(goldIcon);

        //ingot
        var ingotBg = new cc.Scale9Sprite("index_bg_gold.png", cc.rect(6, 5, 11, 7));
        ingotBg.setAnchorPoint(0, 0.5);
        ingotBg.setContentSize(130, 25);
        ingotBg.setPosition(250, winSize.height - 30);
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
        var dailyNormal = new cc.Sprite("#daily_task_normal.png");
        var dailySelected = new cc.Sprite("#daily_task_normal.png");
        var dailyDisabled = new cc.Sprite("#daily_task_normal.png");
        var dailyButton = new cc.MenuItemSprite(dailyNormal, dailySelected, dailyDisabled, this.onDailyClick, this);
        dailyButton.scale = 0.5;
        var dailyMenu = new cc.Menu(dailyButton);
        dailyMenu.setPosition(winSize.width - 250, winSize.height - 30);
        this.addChild(dailyMenu, 2);

        if (this.selected == 0) {
            this.selectedSprite.setPosition(winSize.width - 250, winSize.height - 30);
            this.addChild(this.selectedSprite)
        }

        var separatorSprite = new cc.Sprite("#separator.png");
        separatorSprite.setPosition(winSize.width - 155, winSize.height - 30);
        this.addChild(separatorSprite);

        //
        var foreverNormal = new cc.Sprite("#sys_task_normal.png");
        var foreverSelected = new cc.Sprite("#sys_task_normal.png");
        var foreverDisabled = new cc.Sprite("#sys_task_normal.png");
        var foreverButton = new cc.MenuItemSprite(foreverNormal, foreverSelected, foreverDisabled, this.onForeverClick, this);
        foreverButton.scale = 0.5;
        var foreverMenu = new cc.Menu(foreverButton);
        foreverMenu.setPosition(winSize.width - 70, winSize.height - 30);
        this.addChild(foreverMenu, 2);

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

    onDailyClick: function () {
        this.onTabChange(0);
    },

    onForeverClick: function () {
        this.onTabChange(1);
    },


    onBackButton: function () {
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
        EventBus.subscribe(gameEvents.INGOT_CHANGE, function (data) {
            self.ingot.setString(zgzNumeral(data.ingot).format('0,0'))
        });
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
        //cc.eventManager.removeCustomListeners(gameEvents.GOLD_CHANGE);
        //cc.eventManager.removeCustomListeners(gameEvents.INGOT_CHANGE);
    }

});