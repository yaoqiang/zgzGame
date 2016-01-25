var TaskTabLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();

        //this.lobbyId = args.lobbyId;
        //0: daily selected, 1: forever selected
        this.selected = args.selected || 0;

        this.args = args;

        var winSize = cc.director.getWinSize();

        var bg = new cc.Sprite("#deep_bg_big.png");
        bg.setPosition(winSize.width/2, winSize.height);
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
        var itemNormal = new cc.Sprite("#sys_task_normal.png");
        var itemSelected = new cc.Sprite("#sys_task_normal.png");
        var itemDisabled = new cc.Sprite("#sys_task_normal.png");
        var itemButton = new cc.MenuItemSprite(itemNormal, itemSelected, itemDisabled, this.onForeverClick, this);
        itemButton.scale = 0.5;
        var menuItem = new cc.Menu(itemButton);
        menuItem.setPosition(winSize.width - 70, winSize.height - 30);
        this.addChild(menuItem, 2);

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

        this.args.callback.call(null, index);

    },

    onDailyClick: function () {
        this.onTabChange(0);
    },

    onForeverClick: function () {
        this.onTabChange(1);
    },


    onBackButton: function () {
        if (this.lobbyId) {
            GameController.enterLobby(this.lobbyId);
        }
        else {
            UniversalController.enterIndex();
        }
    },


    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    }

});