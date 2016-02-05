var RankingListTabLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();

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
        //var goldBg = new cc.Scale9Sprite("index_bg_gold.png", cc.rect(6, 5, 11, 7));
        //goldBg.setAnchorPoint(0, 0.5);
        //goldBg.setContentSize(130, 25);
        //goldBg.setPosition(100, winSize.height - 30);
        //this.addChild(goldBg);
        //
        //this.gold = new cc.LabelTTF(zgzNumeral(gPlayer.gold).format('0,0'), "Arial", 14);
        //this.gold.setColor(cc.color.YELLOW);
        //this.gold.setAnchorPoint(1, 0.5);
        //this.gold.setPosition(110, 10);
        //goldBg.addChild(this.gold);
        //
        //var goldIcon = new cc.Sprite("#common_icon_coins_1.png");
        //goldIcon.setScale(0.5);
        //goldIcon.setAnchorPoint(0, 1);
        //goldIcon.setPosition(0 - 5, 28);
        //goldBg.addChild(goldIcon);


        //
        this.selectedSprite = new cc.Sprite("#tab_selected_bg.png");
        this.selectedSprite.scale = 0.7;

        //
        //var richNormal = new cc.Sprite("#daily_task_normal.png");
        //var richSelected = new cc.Sprite("#daily_task_normal.png");
        //var richDisabled = new cc.Sprite("#daily_task_normal.png");

        var richNormal = new cc.LabelTTF("土豪榜", "AmericanTypewriter", 40);
        richNormal.enableStroke(cc.color.WHITE, 1);
        var richSelected = new cc.LabelTTF("土豪榜", "AmericanTypewriter", 42);
        richSelected.enableStroke(cc.color.WHITE, 1);
        var richDisabled = new cc.LabelTTF("土豪榜", "AmericanTypewriter", 40);
        richDisabled.enableStroke(cc.color.WHITE, 1);

        var richButton = new cc.MenuItemSprite(richNormal, richSelected, richDisabled, this.onRichClick, this);
        richButton.scale = 0.5;
        var richMenu = new cc.Menu(richButton);
        richMenu.setPosition(winSize.width - 430, winSize.height - 30);
        this.addChild(richMenu, 2);

        if (this.selected == 0) {
            this.selectedSprite.setPosition(winSize.width - 430, winSize.height - 30);
            this.addChild(this.selectedSprite)
        }

        var separatorSprite = new cc.Sprite("#separator.png");
        separatorSprite.setPosition(winSize.width - 340, winSize.height - 30);
        this.addChild(separatorSprite);

        //
        //var godNormal = new cc.Sprite("#daily_task_normal.png");
        //var godSelected = new cc.Sprite("#daily_task_normal.png");
        //var godDisabled = new cc.Sprite("#daily_task_normal.png");

        var godNormal = new cc.LabelTTF("股神榜", "AmericanTypewriter", 40);
        godNormal.enableStroke(cc.color.WHITE, 1);
        var godSelected = new cc.LabelTTF("股神榜", "AmericanTypewriter", 42);
        godSelected.enableStroke(cc.color.WHITE, 1);
        var godDisabled = new cc.LabelTTF("股神榜", "AmericanTypewriter", 40);
        godDisabled.enableStroke(cc.color.WHITE, 1);
        var godButton = new cc.MenuItemSprite(godNormal, godSelected, godDisabled, this.onGodClick, this);
        godButton.scale = 0.5;
        var godMenu = new cc.Menu(godButton);
        godMenu.setPosition(winSize.width - 250, winSize.height - 30);
        this.addChild(godMenu, 2);

        if (this.selected == 1) {
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

        var rechargeNormal = new cc.LabelTTF("昨日充值榜", "AmericanTypewriter", 40);
        rechargeNormal.enableStroke(cc.color.WHITE, 1);
        var rechargeSelected = new cc.LabelTTF("昨日充值榜", "AmericanTypewriter", 42);
        rechargeSelected.enableStroke(cc.color.WHITE, 1);
        var rechargeDisabled = new cc.LabelTTF("昨日充值榜", "AmericanTypewriter", 40);
        rechargeDisabled.enableStroke(cc.color.WHITE, 1);
        var rechargeButton = new cc.MenuItemSprite(rechargeNormal, rechargeSelected, rechargeDisabled, this.onRechargeClick, this);
        rechargeButton.scale = 0.5;
        var rechargeMenu = new cc.Menu(rechargeButton);
        rechargeMenu.setPosition(winSize.width - 70, winSize.height - 30);
        this.addChild(rechargeMenu, 2);

        if (this.selected == 2) {
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
            this.selectedSprite.setPosition(winSize.width - 430, winSize.height - 30);
        }

        if (this.selected == 1) {
            this.selectedSprite.setPosition(winSize.width - 250, winSize.height - 30);
        }

        if (this.selected == 2) {
            this.selectedSprite.setPosition(winSize.width - 70, winSize.height - 30);
        }

        this.addChild(this.selectedSprite);

        this.args.callback.call(this.args.target, index);

    },

    onRichClick: function () {
        this.onTabChange(0);
    },

    onGodClick: function () {
        this.onTabChange(1);
    },

    onRechargeClick: function () {
        this.onTabChange(2);
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

    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }

});