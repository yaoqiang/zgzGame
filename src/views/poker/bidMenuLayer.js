var BidMenuLayer = cc.Layer.extend({
    ctor: function(){
        console.log('BidMenuLayer ctor');
        this._super();
        this.init();

    },
    init:function(){
        var winSize = cc.director.getWinSize();
        var h = winSize.height*0.1;
//亮3
        var liangNormal = new cc.Sprite(res.anniu_png);
        var liangSelected = new cc.Sprite(res.anniu_png);
        var liangDisabled = new cc.Sprite(res.anniu_png);
        var liangButton = new cc.MenuItemSprite(liangNormal, liangSelected, liangDisabled, this.onLiangButton, this);
        liangButton.setPosition(winSize.width/2 - 50 , h);

        var size  = liangButton.getContentSize();
        var liangStr = new cc.LabelTTF("亮 3", "Arial", 24);
        liangStr.color = cc.color.YELLOW;
        liangStr.setPosition(size.width/2, size.height/2);
        liangButton.addChild(liangStr);

//谷子
        var guziNormal = new cc.Sprite(res.anniu_png);
        var guziSelected = new cc.Sprite(res.anniu_png);
        var guziDisabled = new cc.Sprite(res.anniu_png);
        var guziButton = new cc.MenuItemSprite(guziNormal, guziSelected, guziDisabled, this.onGuziButton, this);
        guziButton.setPosition(winSize.width/2 , h);

        size  = guziButton.getContentSize();
        var guziStr = new cc.LabelTTF("谷 子", "Arial", 24);
        guziStr.color = cc.color.YELLOW;
        guziStr.setPosition(size.width/2, size.height/2);
        guziButton.addChild(guziStr);
//不叫

        var bujiaoNormal = new cc.Sprite(res.anniu_png);
        var bujiaoSelected = new cc.Sprite(res.anniu_png);
        var bujiaoDisabled = new cc.Sprite(res.anniu_png);
        var bujiaoButton = new cc.MenuItemSprite(bujiaoNormal, bujiaoSelected, bujiaoDisabled, this.onBujiaoButton, this);
        bujiaoButton.setPosition(winSize.width/2 + 50 , h);

        size  = bujiaoButton.getContentSize();
        var bujiaoStr = new cc.LabelTTF("不 叫", "Arial", 24);
        bujiaoStr.color = cc.color.YELLOW;
        bujiaoStr.setPosition(size.width/2, size.height/2);
        bujiaoButton.addChild(bujiaoStr);
//menu


        var menu = new cc.Menu(liangButton, guziButton,bujiaoButton);
        menu.setPosition(0, 0);
        this.addChild(menu);

    },

    onLiangButton:function(){
        console.log("亮三");
        //GameController.ready(gRoomId, gGameId);
    },

    onGuziButton:function(){
        console.log("谷子");
        //GameController.ready(gRoomId, gGameId);
    },

    onBujiaoButton:function(){
        console.log("不叫");
        //GameController.ready(gRoomId, gGameId);
    },



    onEnter:function(){
        this._super();
        console.log("BidMenuLayer onEnter");
    },

    onExit:function(){
        this._super();
        console.log("BidMenuLayer onExit");
    }

})