var GameMenuLayer = cc.Layer.extend({
    ctor: function(){
        console.log('GameMenuLayer ctor');
        this._super();
        this.init();

    },
    init:function(){
        var winSize = cc.director.getWinSize();

        var backNormal = new cc.Sprite("#likai_icon.png");
        var backSelected = new cc.Sprite("#likai_icon.png");
        var backDisabled = new cc.Sprite("#likai_icon.png");
        var helpButton = new cc.MenuItemSprite(backNormal, backSelected, backDisabled, this.onBackButton, this);
        var menu = new cc.Menu(helpButton);
        menu.setPosition(20, winSize.height-30);
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