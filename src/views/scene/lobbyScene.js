var LobbyScene = cc.Scene.extend({
    lobbyTitle: ['扎股子-五人', '扎股子-六人', '扎股子-七人'],
    ctor: function (data, lobbyId) {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.room_plist);
        cc.spriteFrameCache.addSpriteFrames(res.avatar_plist);
        cc.spriteFrameCache.addSpriteFrames(res.common_plist);
        cc.spriteFrameCache.addSpriteFrames(res.index_plist);

        //header
        var headerLayer = new HeaderLayer({title: this.lobbyTitle[lobbyId], lobby: lobbyId});
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
        this.m_pScrollView = null;
        this.m_nScrollWidth =  winSize.width;
        this.m_nScrollHeight =  winSize.height;
        this.m_nScrollX =  0;
        this.m_nScrollY =  80;

        //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width/2, winSize.height/2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        // Create the scrollview
        //
        var cellH = 130;
        var btnH = 104;
        var sH = (cellH - btnH)/2;
        var sY = cellH/2;
        var dataLen = data.rooms.length;
        var containerH = ((dataLen-dataLen%2)/2 + dataLen%2)*cellH;
        this.m_nScrollHeight =  270;
        containerH = this.m_nScrollHeight > containerH ? this.m_nScrollHeight : containerH;
        //
        this.m_pScrollView = new ccui.ScrollView();
        this.m_pScrollView.setAnchorPoint(0,0);
        this.m_pScrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.m_pScrollView.setTouchEnabled(true);
        this.m_pScrollView.setBounceEnabled(true);
        this.m_pScrollView.setContentSize(cc.size(this.m_nScrollWidth, this.m_nScrollHeight));
        var scrollViewRect = this.m_pScrollView.getContentSize();
        this.m_pScrollView.setInnerContainerSize(cc.size(scrollViewRect.width, containerH));

        this.m_pScrollView.x = this.m_nScrollX;
        this.m_pScrollView.y = this.m_nScrollY;
        this.m_pScrollView.scrollToPercentBothDirection(cc.p(50, 50), 1, true);
        this.addChild(this.m_pScrollView);



        //var line = new cc.LabelTTF("..------------------------------", "Arial", 24);
        //line.color = cc.color.YELLOW;
        //line.setPosition(this.m_nScrollWidth/2, this.m_nScrollHeight-2);
        //this.m_pScrollView.addChild(line);

        //line = new cc.LabelTTF("------------------------------..", "Arial", 24);
        //line.color = cc.color.YELLOW;
        //line.setPosition(this.m_nScrollWidth/2, 0);
        //this.m_pScrollView.addChild(line);


        var width = -200, height = containerH - cellH/2;
        for (var i = 1; i <= data.rooms.length; i++)
        {
            var room = data.rooms[i-1];
            this.m_pScrollView.addChild(this.createButton(room, "", room.online.toString(), width, height, i));

            if (i%2 == 0){
                width = -200;
                height -= cellH;
            } else{
                width += 400;
            }
        }

        this.addMenu();

        return true;


    },

    addMenu:function () {
        var winSize = cc.director.getWinSize();
        //返回按钮
        var back = new cc.MenuItemImage(
            "#back_btn.png",
            "#back_btn.png",
            function () {
                UniversalController.enterIndex();
            },
            this
        );
        back.setAnchorPoint(0, 0);
        var backMenu = new cc.Menu(back);
        backMenu.setAnchorPoint(0, 0);
        backMenu.setPosition(5, 5);
        backMenu.scale = ZGZ.SCALE * 0.7;
        this.addChild(backMenu);

        //template
        var bottomBtnLayer = new BottomBtnLayer();
        this.addChild(bottomBtnLayer);




        var quickStart = new cc.Sprite("#index_kuaisuyouxi.png");
        quickStart.setAnchorPoint(1, 0);
        quickStart.setPosition(winSize.width, 0);
        quickStart.scale = ZGZ.SCALE * 0.6
        this.addChild(quickStart);
    },

    createButton:function (room, lobbyStr, numStr, x, y, tag) {
        var winSize = cc.director.getWinSize();
        var button = new ccui.Button();
        button.room = room;
        button.setTouchEnabled(true);
        button.loadTextures("room_diban.png", "room_diban2.png", "", ccui.Widget.PLIST_TEXTURE);
        button.x = winSize.width / 2.0 + x;
        button.y = y;
        button.scaleX = 0.85;
        button.addTouchEventListener(this.touchEvent, this);

        var title = new cc.LabelTTF(room.title, "AmericanTypewriter", 22);
        title.setColor(cc.color.YELLOW);
        title.setPosition(button.width / 2, button.height / 2 + 25);
        button.addChild(title);

        var onlineCounterLabel = new cc.LabelTTF("在线：", "AmericanTypewriter", 20);
        onlineCounterLabel.setColor(cc.color.WHITE);
        onlineCounterLabel.setAnchorPoint(0, 0);
        onlineCounterLabel.setPosition(20, button.height / 2 - 30);
        button.addChild(onlineCounterLabel);

        var onlineCounterValue = new cc.LabelTTF(numStr, "AmericanTypewriter", 22);
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

        return button;
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
                //console.log("Touch Up");
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
