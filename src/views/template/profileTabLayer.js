var InboxTabLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();

        this.lobbyId = args.lobbyId;
        this.selected = args.selected || 0;

        var winSize = cc.director.getWinSize();

        var backNormal = new cc.Sprite("#back_btn.png");
        var backSelected = new cc.Sprite("#back_btn.png");
        var backDisabled = new cc.Sprite("#back_btn.png");
        var leaveButton = new cc.MenuItemSprite(backNormal, backSelected, backDisabled, this.onBackButton, this);
        leaveButton.scale = 0.5
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
        separatorSprite.setPosition(winSize.width - 150, winSize.height - 30);
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
        this.selectedSprite.removeFromParent(true);

    },

    onProfileClick: function () {
        this.onTabChange(0);
    },

    onItemClick: function () {
        this.onTabChange(1);
    },


    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    },

    onBackButton: function () {
        if (this.lobbyId) {
            GameController.enterLobby(this.lobbyId);
        }
        else {
            var scene = new IndexScene();
            cc.director.runScene(new cc.TransitionSlideInB(2, scene));
        }
    },

});