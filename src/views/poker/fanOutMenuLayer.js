var FanOutMenuLayer = cc.Layer.extend({
    ctor: function(){
        //console.log('FanOutMenuLayer ctor');
        this._super();
        this.m_pTarge = null;
        this.m_pCallback = null;

        this.m_pMenu = null;

        this.m_pButtonFanOut = null;
        this.m_pButtonPass = null;



        this.init();

    },
    init:function(){
        var winSize = cc.director.getWinSize();
        var h = winSize.height*0.5;

//出牌
        var chupaiNormal = new cc.Sprite(res.anniu_png);
        var chupaiSelected = new cc.Sprite(res.anniu2_png);
        var chupaiDisabled = new cc.Sprite(res.anniu2_png);
        //chupaiDisabled.setColor(cc.color(100,100,100,255));
        var chupaiButton = new cc.MenuItemSprite(chupaiNormal, chupaiSelected, chupaiDisabled, this.onChupaiButton, this);
        chupaiButton.setPosition(winSize.width/2-60 , h);
        chupaiButton.setTag(FanOutMenuBtn.kCCFanOutMenu_FanOut);

        size  = chupaiButton.getContentSize();
        var chupaiStr = new cc.LabelTTF("出 牌", "Arial", 24);
        chupaiStr.color = cc.color.YELLOW;
        chupaiStr.setPosition(size.width/2, size.height/2);
        chupaiButton.addChild(chupaiStr);
//不出

        var buchuNormal = new cc.Sprite(res.anniu_png);
        var buchuSelected = new cc.Sprite(res.anniu2_png);
        var buchuDisabled = new cc.Sprite(res.anniu2_png);
        buchuDisabled.setColor(cc.color(100,100,100,255));
        var buchuButton = new cc.MenuItemSprite(buchuNormal, buchuSelected, buchuDisabled, this.onBuchuButton, this);
        buchuButton.setPosition(winSize.width/2 + 60 , h);
        buchuButton.setTag(FanOutMenuBtn.kCCFanOutMenu_Pass);

        size  = buchuButton.getContentSize();
        var buchuStr = new cc.LabelTTF("不 出", "Arial", 24);
        buchuStr.color = cc.color.YELLOW;
        buchuStr.setPosition(size.width/2, size.height/2);
        buchuButton.addChild(buchuStr);
//menu


        //this.m_pMenu = new cc.Menu(chupaiButton,buchuButton);
        //this.m_pMenu.setPosition(0, 0);
        //this.addChild(this.m_pMenu);

//UIButton
        this.m_pButtonFanOut = new ccui.Button();
        this.m_pButtonFanOut.setTouchEnabled(true);
        this.m_pButtonFanOut.loadTextures(res.anniu_png, res.anniu2_png, res.anniu2_png);
        this.m_pButtonFanOut.setTitleFontSize(20);
        this.m_pButtonFanOut.setTitleText("出 牌");
        this.m_pButtonFanOut.x = winSize.width/2 - 60;
        this.m_pButtonFanOut.y =  h;
        this.m_pButtonFanOut.addTouchEventListener(this.fanoutTouchEvent, this);
        this.addChild(this.m_pButtonFanOut);

        this.m_pButtonPass = new ccui.Button();
        this.m_pButtonPass.setTouchEnabled(true);
        this.m_pButtonPass.loadTextures(res.anniu_png, res.anniu2_png, res.anniu2_png);
        this.m_pButtonPass.setTitleFontSize(20);
        this.m_pButtonPass.setTitleText("不 出");
        this.m_pButtonPass.x = winSize.width/2 + 60;
        this.m_pButtonPass.y =  h;
        this.m_pButtonPass.addTouchEventListener(this.buchuTouchEvent, this);
        this.addChild(this.m_pButtonPass);
    },

    fanoutTouchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:

                break;

            case ccui.Widget.TOUCH_MOVED:

                break;

            case ccui.Widget.TOUCH_ENDED:
                this.onChupaiButton();
                break;

            case ccui.Widget.TOUCH_CANCELED:

                break;

            default:
                break;
        }
    },
    buchuTouchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:

                break;

            case ccui.Widget.TOUCH_MOVED:

                break;

            case ccui.Widget.TOUCH_ENDED:
                this.onBuchuButton();
                break;

            case ccui.Widget.TOUCH_CANCELED:

                break;

            default:
                break;
        }
    },

    onTishiButton:function(){
        console.log("提示");
        if(this.m_pTarge && cc.isFunction(this.m_pCallback)){
            console.log("fanout tishi");
            this.m_pCallback.call(this.m_pTarge, FanOutMenuBtn.kCCFanOutMenu_Hint);
        }
    },

    onChupaiButton:function(){
        console.log("出牌");
        if(this.m_pTarge && cc.isFunction(this.m_pCallback)){
            console.log("fanout chupai");
            this.m_pCallback.call(this.m_pTarge, FanOutMenuBtn.kCCFanOutMenu_FanOut);
        }
    },

    onBuchuButton:function(){
        console.log("不出");
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

        switch(tag){
            case FanOutMenuBtn.kCCFanOutMenu_FanOut:
                this.m_pButtonFanOut.setTouchEnabled(isEnabled);
                break;

            case FanOutMenuBtn.kCCFanOutMenu_Pass:
                this.m_pButtonPass.setTouchEnabled(isEnabled);
                break;
        }

        return;
        var item = this.m_pMenu.getChildByTag(tag);
        item.setEnabled(isEnabled);
    },
    setBtnVisible:function(tag, isVisible){
        switch(tag){
            case FanOutMenuBtn.kCCFanOutMenu_FanOut:
                this.m_pButtonFanOut.setVisible(isVisible);
                break;

            case FanOutMenuBtn.kCCFanOutMenu_Pass:
                this.m_pButtonPass.setVisible(isVisible);
                break;
        }

        return;
        var item = this.m_pMenu.getChildByTag(tag);
        item.setVisible(isVisible);
    },
    onEnter:function(){
        this._super();
        //this._touchListener = cc.EventListener.create({
        //    event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //    swallowTouches: true,
        //    onTouchBegan: this.onTouchBegan,
        //    onTouchMoved: this.onTouchMoved,
        //    onTouchEnded: this.onTouchEnded,
        //    onTouchCancelled: this.onTouchCancelled
        //});
        //cc.eventManager.addListener(this._touchListener, this);
    },

    onExit:function(){
        this._super();
        //cc.eventManager.removeListener(this._touchListener);
    },

    onTouchBegan:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        var target = event.getCurrentTarget();

        return false;
    },
    onTouchMoved:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        var target = event.getCurrentTarget();

    },
    onTouchEnded:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        var target = event.getCurrentTarget();

    },
    onTouchCancelled:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        var target = event.getCurrentTarget();

    }


})