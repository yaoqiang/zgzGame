var LobbyScene = cc.Scene.extend({
    lobbyTitle: ['扎股子-五人', '扎股子-七人'],
    ctor: function (data, lobbyId) {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.room_plist, res.room_png);
        cc.spriteFrameCache.addSpriteFrames(res.other_plist, res.other_png);


        //header
        var headerLayer = new HeaderLayer({title: this.lobbyTitle[lobbyId]});
        this.addChild(headerLayer, 1);

        var lobbyLayer = new LobbyLayer(data);
        this.addChild(lobbyLayer);
    }
});


var LobbyLayer = cc.Layer.extend({
    ctor: function (data) {
        this._super();
        this.addChild(new HornSprite());

        var winSize = cc.director.getWinSize();

        //background
        var bg = cc.Sprite.create("#beijing.png");
        bg.setPosition(cc.p(winSize.width/2, winSize.height/2));
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);


        var width=-200, height=250;
        for (var i = 1; i <= data.rooms.length; i++)
        {
            var room = data.rooms[i-1];
            var button = new ccui.Button();
            button.room = room;
            button.setTouchEnabled(true);
            button.loadTextures("room_bg.png", "room_bg2.png", "", ccui.Widget.PLIST_TEXTURE);
            button.x = winSize.width / 2.0 + width;
            button.y = height;
            button.scaleX = 0.85;
            button.addTouchEventListener(this.touchEvent, this);
            this.addChild(button);

            var title = new cc.LabelTTF(room.title, "AmericanTypewriter", 22);
            title.setColor(cc.color.YELLOW);
            title.setPosition(cc.p(button.width / 2, button.height / 2 + 25));
            button.addChild(title);

            var onlineCounterLabel = new cc.LabelTTF("在线：", "AmericanTypewriter", 20);
            onlineCounterLabel.setColor(cc.color.WHITE);
            onlineCounterLabel.setAnchorPoint(0, 0);
            onlineCounterLabel.setPosition(cc.p(20, button.height / 2 - 30));
            button.addChild(onlineCounterLabel);

            var onlineCounterValue = new cc.LabelTTF("999", "AmericanTypewriter", 22);
            onlineCounterValue.setColor(cc.color.WHITE);
            onlineCounterValue.setAnchorPoint(0, 0);
            onlineCounterValue.setPosition(cc.p(onlineCounterLabel.width+10, button.height / 2 - 30));
            button.addChild(onlineCounterValue);

            var baseLabel = new cc.LabelTTF("底注：", "AmericanTypewriter", 20);
            baseLabel.setColor(cc.color.WHITE);
            baseLabel.setAnchorPoint(0, 0);
            baseLabel.setPosition(cc.p(button.width / 2, button.height / 2 - 30));
            button.addChild(baseLabel);

            var baseValue = new cc.LabelTTF(room.base, "AmericanTypewriter", 22);
            baseValue.setColor(cc.color.YELLOW);
            baseValue.setAnchorPoint(0, 0);
            baseValue.setPosition(cc.p(button.width / 2 + baseLabel.width+10, button.height / 2 - 30));
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

        var back = cc.Sprite.create("#btn_fanhui.png");
        back.setAnchorPoint(cc.p(0, 0));
        back.setPosition(cc.p(0, 0));
        back.scale = ZGZ.SCALE * 0.7
        this.addChild(back);

        //template
        var mission = cc.Sprite.create("#renwu.png");
        mission.setAnchorPoint(cc.p(0, 0));
        mission.setPosition(cc.p(120, 10));
        mission.scale = ZGZ.SCALE * 1
        this.addChild(mission);

        var rank = cc.Sprite.create("#paihang.png");
        rank.setAnchorPoint(cc.p(0, 0));
        rank.setPosition(cc.p(240, 10));
        rank.scale = ZGZ.SCALE * 1
        this.addChild(rank);

        var exchange = cc.Sprite.create("#duihuan.png");
        exchange.setAnchorPoint(cc.p(0, 0));
        exchange.setPosition(cc.p(360, 10));
        exchange.scale = ZGZ.SCALE * 1
        this.addChild(exchange);

        var message = cc.Sprite.create("#tongzhi.png");
        message.setAnchorPoint(cc.p(0, 0));
        message.setPosition(cc.p(480, 10));
        message.scale = ZGZ.SCALE * 1
        this.addChild(message);




        var quickStart = cc.Sprite.create("#kuaisuyouxi.png");
        quickStart.setAnchorPoint(cc.p(1, 0));
        quickStart.setPosition(cc.p(winSize.width, 0));
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
