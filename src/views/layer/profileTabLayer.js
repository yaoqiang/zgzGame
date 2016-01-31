var ProfileTabLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();

        console.log(args);
        this.lobbyId = args.lobbyId;
        //0: profile selected, 1: bag selected
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
        var profileNormal = new cc.Sprite("#user_info_text.png");
        var profileSelected = new cc.Sprite("#user_info_text.png");
        var profileDisabled = new cc.Sprite("#user_info_text.png");
        var profileButton = new cc.MenuItemSprite(profileNormal, profileSelected, profileDisabled, this.onProfileClick, this);
        profileButton.scale = 0.5;
        var menuProfile = new cc.Menu(profileButton);
        menuProfile.setPosition(winSize.width - 250, winSize.height - 30);
        this.addChild(menuProfile, 2);

        if (this.selected == 0) {
            this.selectedSprite.setPosition(winSize.width - 250, winSize.height - 30);
            this.addChild(this.selectedSprite)
        }

        var separatorSprite = new cc.Sprite("#separator.png");
        separatorSprite.setPosition(winSize.width - 155, winSize.height - 30);
        this.addChild(separatorSprite);

        //
        var itemNormal = new cc.Sprite("#user_prop_text.png");
        var itemSelected = new cc.Sprite("#user_prop_text.png");
        var itemDisabled = new cc.Sprite("#user_prop_text.png");
        var itemButton = new cc.MenuItemSprite(itemNormal, itemSelected, itemDisabled, this.onItemClick, this);
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

    onProfileClick: function () {
        this.onTabChange(0);
    },

    onItemClick: function () {
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


    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    }

});