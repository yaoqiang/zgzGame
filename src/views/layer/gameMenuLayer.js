var GameMenuLayer = cc.Layer.extend({
    ctor: function(){
        console.log('GameMenuLayer ctor');
        this._super();
        this.init();

    },
    init:function(){
        var winSize = cc.director.getWinSize();

        var backNormal = new cc.Sprite("#index_tanchu.png");
        var backSelected = new cc.Sprite("#index_tanchu.png");
        var backDisabled = new cc.Sprite("#index_tanchu.png");
        var leaveButton = new cc.MenuItemSprite(backNormal, backSelected, backDisabled, this.onBackButton, this);
        leaveButton.scale = 0.4
        var menu = new cc.Menu(leaveButton);
        menu.setPosition(30, winSize.height-30);
        this.addChild(menu);

    },

    onBackButton:function(){
        console.log("GameMenuLayer onBackButton:" + gRoomId);
        GameController.leave(gRoomId);
    },
    onEnter:function(){
        this._super();
        console.log("GameMenuLayer onEnter");
    },

    onExit:function(){
        this._super();
        console.log("GameMenuLayer onExit");
    }

})