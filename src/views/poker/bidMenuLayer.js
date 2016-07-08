var BidMenuLayer = cc.Layer.extend({
    ctor: function () {
        //console.log('BidMenuLayer ctor');
        this._super();

        this.m_pTarge = null;
        this.m_pCallback = null;
        this.m_pMenu = null;


        this.init();

    },
    init: function () {
        var winSize = cc.director.getWinSize();
        var h = winSize.height * 0.5 - 50;
//亮3
        var liangNormal = new cc.Sprite("#common_btn_huang.png");
        var liangSelected = new cc.Sprite("#common_btn_huang.png");
        var liangDisabled = new cc.Sprite("#common_btn_huang.png");
        var liangButton = new cc.MenuItemSprite(liangNormal, liangSelected, liangDisabled, this.onLiangButton, this);
        liangButton.setPosition(winSize.width / 2 + 50, h);
        liangButton.setTag(BidMenuBtn.kCCBidMenu_Liang);
        liangButton.setVisible(false);
        //liangButton.setEnabled(false);
        liangButton.scale = 0.5

        var size = liangButton.getContentSize();
        var liangStr = new cc.LabelTTF("亮3", "Arial", 30);
        //liangStr.color = cc.color.YELLOW;
        liangStr.setPosition(size.width / 2, size.height / 2);
        liangButton.addChild(liangStr);

//股子
        var guziNormal = new cc.Sprite("#common_btn_huang.png");
        var guziSelected = new cc.Sprite("#common_btn_huang.png");
        var guziDisabled = new cc.Sprite("#common_btn_huang.png");
        var guziButton = new cc.MenuItemSprite(guziNormal, guziSelected, guziDisabled, this.onGuziButton, this);
        guziButton.setPosition(winSize.width / 2 + 50, h);
        guziButton.setTag(BidMenuBtn.kCCBidMenu_Guzi);
        guziButton.setVisible(false);
        //guziButton.setEnabled(false);
        guziButton.scale = 0.5

        size = guziButton.getContentSize();
        var guziStr = new cc.LabelTTF("股子", "Arial", 30);
        //guziStr.color = cc.color.YELLOW;
        guziStr.setPosition(size.width / 2, size.height / 2);
        guziButton.addChild(guziStr);

        //认输
        var giveUpNormal = new cc.Sprite("#common_btn_hong.png");
        var giveUpSelected = new cc.Sprite("#common_btn_hong.png");
        var giveUpDisabled = new cc.Sprite("#common_btn_hong.png");
        var giveUpButton = new cc.MenuItemSprite(giveUpNormal, giveUpSelected, giveUpDisabled, this.onGiveUpButton, this);
        giveUpButton.setPosition(winSize.width / 2, h + 40);
        giveUpButton.setTag(BidMenuBtn.kCCBidMenu_GiveUp);
        giveUpButton.setVisible(false);

        giveUpButton.scale = 0.5

        size = giveUpButton.getContentSize();
        var giveUpStr = new cc.LabelTTF("认输", "Arial", 30);
        //giveUpStr.color = cc.color.YELLOW;
        giveUpStr.setPosition(size.width / 2, size.height / 2);
        giveUpButton.addChild(giveUpStr);

//不叫

        var bujiaoNormal = new cc.Sprite("#common_btn_huang.png");
        var bujiaoSelected = new cc.Sprite("#common_btn_huang.png");
        var bujiaoDisabled = new cc.Sprite("#common_btn_huang.png");
        var bujiaoButton = new cc.MenuItemSprite(bujiaoNormal, bujiaoSelected, bujiaoDisabled, this.onBujiaoButton, this);
        bujiaoButton.setPosition(winSize.width / 2 - 50, h);
        bujiaoButton.setTag(BidMenuBtn.kCCBidMenu_Bujiao);

        bujiaoButton.scale = 0.5

        size = bujiaoButton.getContentSize();
        var bujiaoStr = new cc.LabelTTF("不叫", "Arial", 30);
        //bujiaoStr.color = cc.color.YELLOW;
        bujiaoStr.setPosition(size.width / 2, size.height / 2);
        bujiaoButton.addChild(bujiaoStr);


//menu


        this.m_pMenu = new cc.Menu(liangButton, guziButton, bujiaoButton, giveUpButton);
        this.m_pMenu.setPosition(0, 0);
        this.addChild(this.m_pMenu);

    },

    onLiangButton: function () {
        //console.log("亮3");
        //console.log(this.m_pTarge, this.m_pCallback)
        if (this.m_pTarge && cc.isFunction(this.m_pCallback)) {
            //console.log("亮3 callback");

            this.m_pCallback.call(this.m_pTarge, BidMenuBtn.kCCBidMenu_Liang);
        }
        //GameController.talk(gRoomId, gGameId, GAME.IDENTITY.HONG3);
    },

    onGuziButton: function () {
        //console.log("股子");
        //console.log(this.m_pTarge, this.m_pCallback)

        if (this.m_pTarge && cc.isFunction(this.m_pCallback)) {
            //console.log("股子 callback");

            this.m_pCallback.call(this.m_pTarge, BidMenuBtn.kCCBidMenu_Guzi);
        }
        //GameController.talk(gRoomId, gGameId, GAME.IDENTITY.GUZI, []);
    },

    onBujiaoButton: function () {
        //console.log("不叫");
        //console.log(this.m_pTarge, this.m_pCallback)

        if (this.m_pTarge && cc.isFunction(this.m_pCallback)) {
            //console.log("不叫 callback");

            this.m_pCallback.call(this.m_pTarge, BidMenuBtn.kCCBidMenu_Bujiao);
        }
        //GameController.talk(gRoomId, gGameId, GAME.IDENTITY.UNKNOW, []);
    },

    onGiveUpButton: function () {
        if (this.m_pTarge && cc.isFunction(this.m_pCallback)) {
            //console.log("不叫 callback");

            this.m_pCallback.call(this.m_pTarge, BidMenuBtn.kCCBidMenu_GiveUp);
        }
    },


    setCallback: function (targe, callback) {
        if (targe == null || callback == null) {
            return;
        }
        this.m_pTarge = targe;
        this.m_pCallback = callback;
    },

    setBtnEnabled: function (tag, isEnabled) {
        var item = this.m_pMenu.getChildByTag(tag);
        item.setEnabled(isEnabled);

    },

    setBtnVisible: function (tag, isVisible) {
        var item = this.m_pMenu.getChildByTag(tag);
        item.setVisible(isVisible);
    },

    onEnter: function () {
        this._super();
        //console.log("BidMenuLayer onEnter");
    },

    onExit: function () {
        this._super();
        //console.log("BidMenuLayer onExit");
    }

})