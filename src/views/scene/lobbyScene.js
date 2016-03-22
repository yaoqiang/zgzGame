var LobbyScene = cc.Scene.extend({
    lobbyTitle: ['扎股子-五人', '扎股子-六人', '扎股子-七人'],
    ctor: function (data, lobbyId) {
        this._super();
        this.addSpriteRes();

        //header
        var headerLayer = new HeaderLayer({title: this.lobbyTitle[lobbyId], lobbyId: lobbyId});
        this.addChild(headerLayer, 1);

        var lobbyLayer = new LobbyLayer(data, lobbyId);
        this.addChild(lobbyLayer);

        //add a keyboard event listener to statusLabel
        this.keyboardListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
            },
            onKeyReleased: function(keyCode, event){
                var target = event.getCurrentTarget();
                if (keyCode == cc.KEY.back) {
                    if (target.lobbyId != undefined) {
                        GameController.enterLobby(target.lobbyId);
                    }
                    else {
                        UniversalController.enterIndex();
                    }
                }

            }
        }, this);
    },

    addSpriteRes: function () {
        cc.spriteFrameCache.addSpriteFrames(res.room_plist);
        cc.spriteFrameCache.addSpriteFrames(res.avatar_plist);
        cc.spriteFrameCache.addSpriteFrames(res.common_plist);
        cc.spriteFrameCache.addSpriteFrames(res.index_plist);

        cc.spriteFrameCache.addSpriteFrames(res.login_plist);
    },
    removeSpriteRes: function () {
        cc.spriteFrameCache.removeSpriteFramesFromFile(res.room_plist);
        cc.spriteFrameCache.removeSpriteFramesFromFile(res.avatar_plist);
        cc.spriteFrameCache.removeSpriteFramesFromFile(res.common_plist);
        cc.spriteFrameCache.removeSpriteFramesFromFile(res.index_plist);

        cc.spriteFrameCache.removeSpriteFramesFromFile(res.login_plist);
    },

    onExit: function() {
        this._super();
        //
        //this.removeSpriteRes();
        cc.eventManager.removeListener(this.keyboardListener);
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

    ctor: function (data, lobbyId) {
        this._super();

        this.lobbyId = lobbyId;

        this.addChild(new HornSprite(), 9);

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

        //
        //add trumpet btn
        var talkIcon = new ccui.Button();
        talkIcon.setAnchorPoint(0, 0.5);
        talkIcon.setTouchEnabled(true);
        talkIcon.loadTextures("btn_hall_chat_nor.png", "btn_hall_chat_nor.png", "btn_hall_chat_nor.png", ccui.Widget.PLIST_TEXTURE);
        talkIcon.addTouchEventListener(this.onTrumpetBtnClick, this);
        talkIcon.x = 0;
        talkIcon.y = winSize.height/2;
        talkIcon.scale = 0.55;

        this.addChild(talkIcon, 11);

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

        var baseLabel = new cc.LabelTTF("底注："+room.base, "AmericanTypewriter", 20);
        baseLabel.setColor(cc.color.WHITE);
        baseLabel.setAnchorPoint(0, 0);
        baseLabel.setPosition(button.width / 2 - 45, button.height / 2 - 30);
        button.addChild(baseLabel);

        var baseValue = new cc.LabelTTF(""+room.min+'≤金', "Arial", 16);
        baseValue.setColor(cc.color.GREEN);
        baseValue.setAnchorPoint(0, 0);
        baseValue.setPosition(button.width / 2 + 100, button.height / 2 - 30);
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

    onTrumpetBtnClick: function (ref, event) {
        if (event === ccui.Widget.TOUCH_ENDED) {
            playEffect(audio_common.Button_Click);

            this.trumpetBox = new DialogSmall("刷喇叭", 1, null);

            var trumpetHeaderIcon = new cc.Sprite("#common_icon_laba_2.png");
            trumpetHeaderIcon.scale = 1;
            trumpetHeaderIcon.setAnchorPoint(0, 0.5);
            trumpetHeaderIcon.setPosition(230, 300);
            this.trumpetBox.addChild(trumpetHeaderIcon);

            var blockSize = cc.size(260, 30);
            this.trumpetContent = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
            this.trumpetContent.setPlaceHolder('小喇叭内容');
            this.trumpetContent.setAnchorPoint(0, 0.5);
            this.trumpetContent.setFontColor(cc.color.BLACK);
            this.trumpetContent.setFont("Arial", 30);
            this.trumpetContent.setPosition(230, 260);
            this.trumpetContent.color = cc.color.WHITE;
            this.trumpetContent.setMaxLength(20);
            this.trumpetBox.addChild(this.trumpetContent);

            //btn
            var btnTrumpet = new ccui.Button("common_btn_lv.png", "common_btn_lv.png", "common_btn_lv.png", ccui.Widget.PLIST_TEXTURE);
            btnTrumpet.setPosition(500, 260);
            btnTrumpet.setAnchorPoint(0, 0.5);
            btnTrumpet.setTitleText("发送");
            btnTrumpet.setTitleFontSize(28);
            btnTrumpet.scale = 0.5;
            btnTrumpet.addTouchEventListener(this.doTrumpetChat, this);
            this.trumpetBox.addChild(btnTrumpet);


            var self = this;

            //当前玩家喇叭情况, 如果没有则显示快捷购买喇叭
            UniversalController.getMyItemList(function (data) {

                if (data.code != RETURN_CODE.OK) {
                    return;
                }

                if (data.itemList.length == 0) {
                    self.trumpetVal = 0;
                }

                _.each(data.itemList, function (item) {
                    if (item.id == 2) {
                        self.trumpetVal = item.value;
                    }
                });

                if (self.trumpetVal > 0) {
                    self.trumpetCountString = new cc.LabelTTF('您还有' + self.trumpetVal + "个", "AmericanTypewriter", 20);
                    self.trumpetCountString.setAnchorPoint(0, 0.5);
                    self.trumpetCountString.setPosition(280, 170);
                    self.trumpetCountString.color = {r: 0, g: 255, b: 127};
                    self.trumpetBox.addChild(self.trumpetCountString);

                    //
                    var trumpetCountIcon = new cc.Sprite("#common_icon_laba.png");
                    trumpetCountIcon.scale = 0.4;
                    trumpetCountIcon.setPosition(230, 170);
                    trumpetCountIcon.setAnchorPoint(0, 0.5);
                    self.trumpetBox.addChild(trumpetCountIcon);
                }
                else {
                    var trumpetCountString = new cc.LabelTTF("您当前没有小喇叭, 可前往商城购买", "AmericanTypewriter", 20);
                    trumpetCountString.setPosition(230, 170);
                    trumpetCountString.setAnchorPoint(0, 0.5);
                    trumpetCountString.color = cc.color.RED;
                    self.trumpetBox.addChild(trumpetCountString);
                }


            });


            this.addChild(this.trumpetBox, 77);

        }
    },

    doTrumpetChat: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;

            case ccui.Widget.TOUCH_MOVED:
                break;

            case ccui.Widget.TOUCH_ENDED:

                if (this.trumpetVal == 0) {
                    prompt.fadeMiddle('您没有小喇叭,可在商城购买后使用');
                    return;
                }

                var content = this.trumpetContent.getString();
                if (content == '') {
                    prompt.fadeMiddle('请输入喇叭内容');
                    return;
                }

                this.trumpetVal -= 1;
                this.trumpetCountString.setString('您还有'+this.trumpetVal+'个');
                GameController.chat(GAME.CHAT.SCOPE_ALL, '', '', content);
                this.trumpetBox.removeFromParent(true);

                break;

            case ccui.Widget.TOUCH_CANCELED:
                break;

            default:
                break;
        }
    }
});
