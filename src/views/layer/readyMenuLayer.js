var ReadyMenuLayer = cc.Layer.extend({
    ctor: function(){
        console.log('ReadyMenuLayer ctor');
        this._super();
        this.init();

    },
    init:function(){
        var winSize = cc.director.getWinSize();

        var readyNormal = new cc.Sprite(res.anniu_png);
        var readySelected = new cc.Sprite(res.anniu_png);
        var readyDisabled = new cc.Sprite(res.anniu_png);
        var readyButton = new cc.MenuItemSprite(readyNormal, readySelected, readyDisabled, this.onReadyButton, this);
        readyButton.setPosition(winSize.width/2, winSize.height/2);

        var butsize  = readyButton.getContentSize();
        var readyStr = new cc.LabelTTF("ready", "Arial", 24);
        readyStr.color = cc.color.YELLOW;
        readyStr.setPosition(butsize.width/2, butsize.height/2);
        readyButton.addChild(readyStr);

        var menu = new cc.Menu(readyButton);
        menu.setPosition(0,0);
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