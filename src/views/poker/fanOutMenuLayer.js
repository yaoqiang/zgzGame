var FanOutMenuLayer = cc.Layer.extend({
    ctor: function(){
        console.log('FanOutMenuLayer ctor');
        this._super();
        this.m_pTarge = null;
        this.m_pCallback = null;

        this.m_pMenu = null;


        this.init();

    },
    init:function(){
        var winSize = cc.director.getWinSize();
        var h = winSize.height*0.1;
//��ʾ
        var tishiNormal = new cc.Sprite(res.anniu_png);
        var tishiSelected = new cc.Sprite(res.anniu_png);
        var tishiDisabled = new cc.Sprite(res.anniu_png);
        var tishiButton = new cc.MenuItemSprite(tishiNormal, tishiSelected, tishiDisabled, this.onTishiButton, this);
        tishiButton.setPosition(winSize.width/2 - 50 , h);

        var size  = tishiButton.getContentSize();
        var tishiStr = new cc.LabelTTF("�� ʾ", "Arial", 24);
        tishiStr.color = cc.color.YELLOW;
        tishiStr.setPosition(size.width/2, size.height/2);
        tishiButton.addChild(tishiStr);

//����
        var chupaiNormal = new cc.Sprite(res.anniu_png);
        var chupaiSelected = new cc.Sprite(res.anniu_png);
        var chupaiDisabled = new cc.Sprite(res.anniu_png);
        var chupaiButton = new cc.MenuItemSprite(chupaiNormal, chupaiSelected, chupaiDisabled, this.onChupaiButton, this);
        chupaiButton.setPosition(winSize.width/2 , h);

        size  = chupaiButton.getContentSize();
        var chupaiStr = new cc.LabelTTF("�� ��", "Arial", 24);
        chupaiStr.color = cc.color.YELLOW;
        chupaiStr.setPosition(size.width/2, size.height/2);
        chupaiButton.addChild(chupaiStr);
//����

        var buchuNormal = new cc.Sprite(res.anniu_png);
        var buchuSelected = new cc.Sprite(res.anniu_png);
        var buchuDisabled = new cc.Sprite(res.anniu_png);
        var buchuButton = new cc.MenuItemSprite(buchuNormal, buchuSelected, buchuDisabled, this.onBuchuButton, this);
        buchuButton.setPosition(winSize.width/2 + 50 , h);

        size  = buchuButton.getContentSize();
        var buchuStr = new cc.LabelTTF("�� ��", "Arial", 24);
        buchuStr.color = cc.color.YELLOW;
        buchuStr.setPosition(size.width/2, size.height/2);
        buchuButton.addChild(buchuStr);
//menu


        this.m_pMenu = new cc.Menu(tishiButton, chupaiButton,buchuButton);
        this.m_pMenu.setPosition(0, 0);
        this.addChild(this.m_pMenu);

    },

    onTishiButton:function(){
        console.log("�� ʾ");
        //GameController.ready(gRoomId, gGameId);
    },

    onChupaiButton:function(){
        console.log("�� ��");
        //GameController.ready(gRoomId, gGameId);
    },

    onBuchuButton:function(){
        console.log("�� ��");
        //GameController.ready(gRoomId, gGameId);
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

    onEnter:function(){
        this._super();
        console.log("FanOutMenuLayer onEnter");
    },

    onExit:function(){
        this._super();
        console.log("FanOutMenuLayer onExit");
    }

})