var BidMenuLayer = cc.Layer.extend({
    ctor: function(){
        console.log('BidMenuLayer ctor');
        this._super();

        this.m_pTarge = null;
        this.m_pCallback = null;



        this.init();

    },
    init:function(){
        var winSize = cc.director.getWinSize();
        var h = winSize.height*0.1;
//��3
        var liangNormal = new cc.Sprite(res.anniu_png);
        var liangSelected = new cc.Sprite(res.anniu_png);
        var liangDisabled = new cc.Sprite(res.anniu_png);
        var liangButton = new cc.MenuItemSprite(liangNormal, liangSelected, liangDisabled, this.onLiangButton, this);
        liangButton.setPosition(winSize.width/2 + 50 , h);
        liangButton.setTag(BidMenuBtn.kCCBidMenu_Liang);
        liangButton.setVisible(false);

        var size  = liangButton.getContentSize();
        var liangStr = new cc.LabelTTF("�� 3", "Arial", 24);
        liangStr.color = cc.color.YELLOW;
        liangStr.setPosition(size.width/2, size.height/2);
        liangButton.addChild(liangStr);

//����
        var guziNormal = new cc.Sprite(res.anniu_png);
        var guziSelected = new cc.Sprite(res.anniu_png);
        var guziDisabled = new cc.Sprite(res.anniu_png);
        var guziButton = new cc.MenuItemSprite(guziNormal, guziSelected, guziDisabled, this.onGuziButton, this);
        guziButton.setPosition(winSize.width/2 + 50, h);
        guziButton.setTag(BidMenuBtn.kCCBidMenu_Guzi);
        guziButton.setVisible(false);

        size  = guziButton.getContentSize();
        var guziStr = new cc.LabelTTF("�� ��", "Arial", 24);
        guziStr.color = cc.color.YELLOW;
        guziStr.setPosition(size.width/2, size.height/2);
        guziButton.addChild(guziStr);
//����

        var bujiaoNormal = new cc.Sprite(res.anniu_png);
        var bujiaoSelected = new cc.Sprite(res.anniu_png);
        var bujiaoDisabled = new cc.Sprite(res.anniu_png);
        var bujiaoButton = new cc.MenuItemSprite(bujiaoNormal, bujiaoSelected, bujiaoDisabled, this.onBujiaoButton, this);
        bujiaoButton.setPosition(winSize.width/2 - 50 , h);
        bujiaoButton.setTag(BidMenuBtn.kCCBidMenu_Bujiao);

        size  = bujiaoButton.getContentSize();
        var bujiaoStr = new cc.LabelTTF("�� ��", "Arial", 24);
        bujiaoStr.color = cc.color.YELLOW;
        bujiaoStr.setPosition(size.width/2, size.height/2);
        bujiaoButton.addChild(bujiaoStr);
//menu


        var menu = new cc.Menu(liangButton, guziButton,bujiaoButton);
        menu.setPosition(0, 0);
        this.addChild(menu);

    },

    onLiangButton:function(){
        console.log("����");
        if(this.m_targe && cc.isFunction(this.m_pCallBack)){
            this.m_pCallBack.call(this.m_targe, BidMenuBtn.kCCBidMenu_Liang);
        }
        //GameController.talk(gRoomId, gGameId, GAME.IDENTITY.HONG3);
    },

    onGuziButton:function(){
        console.log("����");
        if(this.m_targe && cc.isFunction(this.m_pCallBack)){
            this.m_pCallBack.call(this.m_targe, BidMenuBtn.kCCBidMenu_Guzi);
        }
        //GameController.talk(gRoomId, gGameId, GAME.IDENTITY.GUZI, []);
    },

    onBujiaoButton:function(){
        console.log("����");
        if(this.m_targe && cc.isFunction(this.m_pCallBack)){
            this.m_pCallBack.call(this.m_targe, BidMenuBtn.kCCBidMenu_Bujiao);
        }
        //GameController.talk(gRoomId, gGameId, GAME.IDENTITY.UNKNOW, []);
    },


    setCallback:function(targe, callback){
        if(targe == null || callback == null){
            return;
        }
        this.m_pTarge = targe;
        this.m_pCallback = callback;
    },

    setBtnEnabled:function(tag, isEnabled){
        var item = this.m_pMenu.getChildByTag(tag);
        item.setEnable(isEnabled);
    },

    setBtnVisible:function(tag, isVisible){
        var item = this.m_pMenu.getChildByTag(tag);
        item.setVisible(isVisible);
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