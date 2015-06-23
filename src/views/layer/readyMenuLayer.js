var ReadyMenuLayer = cc.Layer.extend({
    ctor: function(){
        console.log('ReadyMenuLayer ctor');
        this._super();
        this.init();

    },
    init:function(){
        var winSize = cc.director.getWinSize();

        var backNormal = new cc.Sprite("#likai_icon.png");
        var backSelected = new cc.Sprite("#likai_icon.png");
        var backDisabled = new cc.Sprite("#likai_icon.png");
        var helpButton = new cc.MenuItemSprite(backNormal, backSelected, backDisabled, this.onReadyButton, this);
        var menu = new cc.Menu(helpButton);
        menu.setPosition(winSize.width/2, winSize.height/2);
        this.addChild(menu);

    },

    onReadyButton:function(){
        console.log("ReadyMenuLayer onReadyButton:" + gRoomId);
        GameController.ready(gRoomId, gGameId);
    },
    onEnter:function(){
        this._super();
        console.log("ReadyMenuLayer onEnter");
    },

    onExit:function(){
        this._super();
        console.log("ReadyMenuLayer onExit");
    }

})