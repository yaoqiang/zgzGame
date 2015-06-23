var FanOutMenuLayer = cc.Layer.extend({
    ctor: function(){
        console.log('FanOutMenuLayer ctor');
        this._super();
        this.init();

    },
    init:function(){
        var winSize = cc.director.getWinSize();
        var h = winSize.height*0.1;
//提示
        var tishiNormal = new cc.Sprite(res.anniu_png);
        var tishiSelected = new cc.Sprite(res.anniu_png);
        var tishiDisabled = new cc.Sprite(res.anniu_png);
        var tishiButton = new cc.MenuItemSprite(tishiNormal, tishiSelected, tishiDisabled, this.onTishiButton, this);
        tishiButton.setPosition(winSize.width/2 - 50 , h);

        var size  = tishiButton.getContentSize();
        var tishiStr = new cc.LabelTTF("提 示", "Arial", 24);
        tishiStr.color = cc.color.YELLOW;
        tishiStr.setPosition(size.width/2, size.height/2);
        tishiButton.addChild(tishiStr);

//出牌
        var chupaiNormal = new cc.Sprite(res.anniu_png);
        var chupaiSelected = new cc.Sprite(res.anniu_png);
        var chupaiDisabled = new cc.Sprite(res.anniu_png);
        var chupaiButton = new cc.MenuItemSprite(chupaiNormal, chupaiSelected, chupaiDisabled, this.onChupaiButton, this);
        chupaiButton.setPosition(winSize.width/2 , h);

        size  = chupaiButton.getContentSize();
        var chupaiStr = new cc.LabelTTF("出 牌", "Arial", 24);
        chupaiStr.color = cc.color.YELLOW;
        chupaiStr.setPosition(size.width/2, size.height/2);
        chupaiButton.addChild(chupaiStr);
//不出

        var buchuNormal = new cc.Sprite(res.anniu_png);
        var buchuSelected = new cc.Sprite(res.anniu_png);
        var buchuDisabled = new cc.Sprite(res.anniu_png);
        var buchuButton = new cc.MenuItemSprite(buchuNormal, buchuSelected, buchuDisabled, this.onBuchuButton, this);
        buchuButton.setPosition(winSize.width/2 + 50 , h);

        size  = buchuButton.getContentSize();
        var buchuStr = new cc.LabelTTF("不 出", "Arial", 24);
        buchuStr.color = cc.color.YELLOW;
        buchuStr.setPosition(size.width/2, size.height/2);
        buchuButton.addChild(buchuStr);
//menu


        var menu = new cc.Menu(tishiButton, chupaiButton,buchuButton);
        menu.setPosition(0, 0);
        this.addChild(menu);

    },

    onTishiButton:function(){
        console.log("提 示");
        //GameController.ready(gRoomId, gGameId);
    },

    onChupaiButton:function(){
        console.log("出 牌");
        //GameController.ready(gRoomId, gGameId);
    },

    onBuchuButton:function(){
        console.log("不 出");
        //GameController.ready(gRoomId, gGameId);
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