var LobbyScene = cc.Scene.extend({
    lobbyTitle: ['扎股子-五人', '扎股子-七人'],
    ctor: function (data, lobbyId) {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.room_plist);

        //header
        var headerLayer = new HeaderLayer({title: this.lobbyTitle[lobbyId]});
        this.addChild(headerLayer, 1);

        var lobbyLayer = new LobbyLayer(data);
        this.addChild(lobbyLayer);
    }


});


var LobbyLayer = cc.Layer.extend({
    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.room_plist);
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.other_plist);
    },

    ctor: function (data) {
        this._super();
        this.addChild(new HornSprite());

        var winSize = cc.director.getWinSize();

        //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width/2, winSize.height/2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);


        var width=-200, height=250;
        for (var i = 1; i <= data.rooms.length; i++)
        {
            var room = data.rooms[i-1];
            var button = new ccui.Button();
            button.room = room;
            button.setTouchEnabled(true);
            button.loadTextures("room_diban.png", "room_diban2.png", "", ccui.Widget.PLIST_TEXTURE);
            button.x = winSize.width / 2.0 + width;
            button.y = height;
            button.scaleX = 0.85;
            button.addTouchEventListener(this.touchEvent, this);
            this.addChild(button);

            var title = new cc.LabelTTF(room.title, "AmericanTypewriter", 22);
            title.setColor(cc.color.YELLOW);
            title.setPosition(button.width / 2, button.height / 2 + 25);
            button.addChild(title);

            var onlineCounterLabel = new cc.LabelTTF("在线：", "AmericanTypewriter", 20);
            onlineCounterLabel.setColor(cc.color.WHITE);
            onlineCounterLabel.setAnchorPoint(0, 0);
            onlineCounterLabel.setPosition(20, button.height / 2 - 30);
            button.addChild(onlineCounterLabel);

            var onlineCounterValue = new cc.LabelTTF("999", "AmericanTypewriter", 22);
            onlineCounterValue.setColor(cc.color.WHITE);
            onlineCounterValue.setAnchorPoint(0, 0);
            onlineCounterValue.setPosition(onlineCounterLabel.width+10, button.height / 2 - 30);
            button.addChild(onlineCounterValue);

            var baseLabel = new cc.LabelTTF("底注：", "AmericanTypewriter", 20);
            baseLabel.setColor(cc.color.WHITE);
            baseLabel.setAnchorPoint(0, 0);
            baseLabel.setPosition(button.width / 2, button.height / 2 - 30);
            button.addChild(baseLabel);

            var baseValue = new cc.LabelTTF(room.base, "AmericanTypewriter", 22);
            baseValue.setColor(cc.color.YELLOW);
            baseValue.setAnchorPoint(0, 0);
            baseValue.setPosition(button.width / 2 + baseLabel.width+10, button.height / 2 - 30);
            button.addChild(baseValue);

            if (i%2 == 0)
            {
                width = -200;
                height -= 120;
            }
            else
            {
                width += 400;
            }


        }

        var back = new cc.MenuItemImage(
            "#index_tanchu.png",
            "#index_tanchu.png",
            function () {
                var scene = new IndexScene();
                cc.director.runScene(new cc.TransitionFade(1.2, scene));
            },
            this
        );
        back.setAnchorPoint(0, 0);
        var backMenu = new cc.Menu(back);
        backMenu.setAnchorPoint(0, 0);
        backMenu.setPosition(0, 0);
        backMenu.scale = ZGZ.SCALE * 0.7;
        this.addChild(backMenu);

        //template
        var mission = new cc.Sprite("#index_renwu.png");
        mission.setAnchorPoint(0, 0);
        mission.setPosition(120, 10);
        mission.scale = ZGZ.SCALE * 1
        this.addChild(mission);

        var rank = new cc.Sprite("#index_paihang.png");
        rank.setAnchorPoint(0, 0);
        rank.setPosition(240, 10);
        rank.scale = ZGZ.SCALE * 1
        this.addChild(rank);

        var exchange = new cc.Sprite("#index_duihuan.png");
        exchange.setAnchorPoint(0, 0);
        exchange.setPosition(360, 10);
        exchange.scale = ZGZ.SCALE * 1
        this.addChild(exchange);

        var message = new cc.Sprite("#index_tongzhi.png");
        message.setAnchorPoint(0, 0);
        message.setPosition(480, 10);
        message.scale = ZGZ.SCALE * 1
        this.addChild(message);




        var quickStart = new cc.Sprite("#index_kuaisuyouxi.png");
        quickStart.setAnchorPoint(1, 0);
        quickStart.setPosition(winSize.width, 0);
        quickStart.scale = ZGZ.SCALE * 0.6
        this.addChild(quickStart);

        return true;


    },
    touchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
//                console.log("Touch Down");
                break;

            case ccui.Widget.TOUCH_MOVED:
//                console.log("Touch Move");
                break;

            case ccui.Widget.TOUCH_ENDED:
                console.log("Touch Up");
                GameController.join(sender.room.id);
                break;

            case ccui.Widget.TOUCH_CANCELED:
//                console.log("Touch Cancelled");
                break;

            default:
                break;
        }
    }
});
