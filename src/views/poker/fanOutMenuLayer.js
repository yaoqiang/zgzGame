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
        tishiButton.setTag(FanOutMenuBtn.kCCFanOutMenu_Hint);

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
        chupaiButton.setTag(FanOutMenuBtn.kCCFanOutMenu_FanOut);

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
        buchuButton.setTag(FanOutMenuBtn.kCCFanOutMenu_Pass);

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
        if(this.m_pTarge && cc.isFunction(this.m_pCallback)){
            console.log("fanout tishi");
            this.m_pCallback.call(this.m_pTarge, FanOutMenuBtn.kCCFanOutMenu_Hint);
        }
    },

    onChupaiButton:function(){
        console.log("�� ��");
        if(this.m_pTarge && cc.isFunction(this.m_pCallback)){
            console.log("fanout chupai");
            this.m_pCallback.call(this.m_pTarge, FanOutMenuBtn.kCCFanOutMenu_FanOut);
        }
    },

    onBuchuButton:function(){
        console.log("�� ��");
        if(this.m_pTarge && cc.isFunction(this.m_pCallback)){
            console.log("fanout buchu");
            this.m_pCallback.call(this.m_pTarge, FanOutMenuBtn.kCCFanOutMenu_Pass);
        }
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
        console.log("FanOutMenuLayer onEnter");
    },

    onExit:function(){
        this._super();
        console.log("FanOutMenuLayer onExit");
    }

})