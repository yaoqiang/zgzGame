var LobbyScene = cc.Scene.extend({
    lobbyTitle: ['普通场', '元宝场', '比赛场', '私人场'],
    ctor: function (data, lobbyId) {
        this._super();

        //console.log("---->LobbyScene ctor");
        //cc.spriteFrameCache.addSpriteFrames(res.room_plist);
        //cc.spriteFrameCache.addSpriteFrames(res.avatar_plist);
        //cc.spriteFrameCache.addSpriteFrames(res.common_plist);
        //cc.spriteFrameCache.addSpriteFrames(res.index_plist);
        FrameCache.addSpriteFrames(res.room_plist);
        FrameCache.addSpriteFrames(res.avatar_plist);
        FrameCache.addSpriteFrames(res.common_plist);
        FrameCache.addSpriteFrames(res.index_plist);

       // this.init();
        //header
        var headerLayer = new HeaderLayer({title: this.lobbyTitle[lobbyId], lobbyId: lobbyId});
        this.addChild(headerLayer, 1);

        var lobbyLayer = new LobbyLayer(data, lobbyId);
        this.addChild(lobbyLayer);

        this.addChild(createScrollCaption({}),150);

        var trumpetLayer = new TrumpetBoxLayer();
        this.addChild(trumpetLayer, 151);
    },

    onExit: function() {
        this._super();
        //console.log("---->LobbyScene onExit");
        FrameCache.removeSpriteFrames(res.room_plist);
        FrameCache.removeSpriteFrames(res.avatar_plist);
        FrameCache.removeSpriteFrames(res.common_plist);
        FrameCache.removeSpriteFrames(res.index_plist);

    }


});


var LobbyLayer = cc.Layer.extend({
    onEnter: function () {
        //cc.log("LobbyLayer#onEnter");
        this._super();

        //add a keyboard event listener to statusLabel
        this.keyboardListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
            },
            onKeyReleased: function(keyCode, event){
                var target = event.getCurrentTarget();
                if (keyCode == cc.KEY.back) {
                    UniversalController.enterIndex();
                }

            }
        }, this);

    },

    onExit: function () {
        //cc.log("LobbyLayer#onExit");
        this._super();

        cc.eventManager.removeListener(this.keyboardListener);
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.room_plist);
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.other_plist);
    },

    onEnterTransitionDidFinish:function () {
        //cc.log("LobbyLayer#onEnterTransitionDidFinish");
        this._super();
    },

    ctor: function (data, lobbyId) {
        this._super();
        this.init();

        this.lobbyId = lobbyId;

        //this.addChild(new HornSprite(), 9);
        this.addChild(new notificationLayer({visible:true}), 9);

        var winSize = cc.director.getWinSize();
        this.m_pScrollView = null;
        this.m_nScrollWidth =  winSize.width;
        this.m_nScrollHeight =  winSize.height;
        this.m_nScrollX =  0;
        this.m_nScrollY =  50;

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


        var width = -160, height = containerH - cellH/2;
        for (var i = 1; i <= data.rooms.length; i++)
        {
            var room = data.rooms[i-1];
            this.m_pScrollView.addChild(this.createButton(room, "", room.online.toString(), width, height, i));

            if (i%2 == 0){
                width = -160;
                height -= cellH;
            } else{
                width += 340;
            }
        }

        this.addMenu();

        //
        //add trumpet btn
        //var talkIcon = new ccui.Button();
        //talkIcon.setAnchorPoint(0, 0.5);
        //talkIcon.setTouchEnabled(true);
        //talkIcon.loadTextures("btn_hall_chat_nor.png", "btn_hall_chat_nor.png", "btn_hall_chat_nor.png", ccui.Widget.PLIST_TEXTURE);
        //talkIcon.addTouchEventListener(this.onTrumpetBtnClick, this);
        //talkIcon.x = 0;
        //talkIcon.y = winSize.height/2;
        //talkIcon.scale = 0.55;

       // this.addChild(talkIcon, 11);

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
                playEffect(audio_common.Button_Click);
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
        var bottomBtnLayer = new BottomBtnLayer({lobbyId: this.lobbyId});
        this.addChild(bottomBtnLayer);




        var quickStart = new cc.Sprite("#index_kuaisuyouxi.png");
        quickStart.setAnchorPoint(1, 0);
        quickStart.setPosition(winSize.width, 0);
        quickStart.scale = ZGZ.SCALE * 0.6
        //this.addChild(quickStart);
    },

    createButton:function (room, lobbyStr, numStr, x, y, tag) {
        var winSize = cc.director.getWinSize();
        var button = new ccui.Button();
        button.room = room;
        button.setTouchEnabled(true);
        button.loadTextures("item_room.png", "item_room.png", "", ccui.Widget.PLIST_TEXTURE);
        button.x = winSize.width / 2.0 + x;
        button.y = y;
        button.scale = 0.55;
        button.addTouchEventListener(this.touchEvent, this);

        var specialString = "";
        switch (room.maxActor) {
            case 5:
                specialString = "五 人 局"
                break;
            case 6:
                specialString = "六 人 局"
                break;
            case 7:
                specialString = "七 人 局"
                break;
        }

        var special = new cc.LabelTTF(specialString, "AmericanTypewriter", 44);
        special.enableStroke(cc.color.WHITE, 1.6);
        special.setPosition(button.width / 2, button.height / 2 + 65);
        button.addChild(special);

        var title = new cc.LabelTTF(room.title, "AmericanTypewriter", 30);
        title.setColor(cc.color.YELLOW);
        title.setPosition(button.width / 2, button.height / 2 - 5);
        button.addChild(title);

        var onlineCounterLabel = new cc.LabelTTF("在线：", "AmericanTypewriter", 24);
        onlineCounterLabel.setColor(cc.color.WHITE);
        onlineCounterLabel.setAnchorPoint(0, 0);
        onlineCounterLabel.setPosition(50, button.height / 2 - 75);
        button.addChild(onlineCounterLabel);

        var onlineCounterValue = new cc.LabelTTF(numStr, "AmericanTypewriter", 24);
        onlineCounterValue.setColor(cc.color.WHITE);
        onlineCounterValue.setAnchorPoint(0, 0);
        onlineCounterValue.setPosition(onlineCounterLabel.width+40, button.height / 2 - 75);
        button.addChild(onlineCounterValue);

        var baseLabel = new cc.LabelTTF("底注："+room.base, "AmericanTypewriter", 24);
        baseLabel.setColor(cc.color.WHITE);
        baseLabel.setAnchorPoint(0, 0);
        baseLabel.setPosition(button.width / 2 - 80, button.height / 2 - 75);
        button.addChild(baseLabel);

        if (room.useNoteCard) {
            var useNoteCard = new cc.Sprite("#jipaiqi.png");
            useNoteCard.setAnchorPoint(0, 0);
            useNoteCard.scale = 0.3;
            useNoteCard.setPosition(button.width / 2 + 55, button.height / 2 - 75);
            button.addChild(useNoteCard);
        }

        var baseValue = new cc.LabelTTF(""+room.min+'≤金', "Arial", 20);
        baseValue.setColor(cc.color.GREEN);
        baseValue.setAnchorPoint(0, 0);
        baseValue.setPosition(button.width / 2 + 100, button.height / 2 - 75);
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
                playEffect(audio_common.Button_Click);
                break;

            case ccui.Widget.TOUCH_CANCELED:
//                console.log("Touch Cancelled");
                break;

            default:
                break;
        }
    },

    onTrumpetBtnClick: function(ref, event) {

    }

});
