var InboxTabLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();

        this.lobbyId = args.lobbyId;

        var winSize = cc.director.getWinSize();

        var backNormal = new cc.Sprite("#back_btn.png");
        var backSelected = new cc.Sprite("#back_btn.png");
        var backDisabled = new cc.Sprite("#back_btn.png");
        var leaveButton = new cc.MenuItemSprite(backNormal, backSelected, backDisabled, this.onBackButton, this);
        leaveButton.scale = 0.5
        var menu = new cc.Menu(leaveButton);
        menu.setPosition(30, winSize.height - 30);
        this.addChild(menu);
    },


    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    },

    onBackButton: function () {
        var scene = new IndexScene();
        cc.director.runScene(new cc.TransitionSlideInB(2, scene));
    },

});