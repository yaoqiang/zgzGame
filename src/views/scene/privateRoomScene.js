var PrivateRoomScene = cc.Scene.extend({
    ctor: function (data, lobbyId) {
        this._super();

        //cc.spriteFrameCache.addSpriteFrames(res.room_plist);
        //cc.spriteFrameCache.addSpriteFrames(res.avatar_plist);
        //cc.spriteFrameCache.addSpriteFrames(res.common_plist);
        //cc.spriteFrameCache.addSpriteFrames(res.index_plist);
        FrameCache.addSpriteFrames(res.room_plist);
        FrameCache.addSpriteFrames(res.avatar_plist);
        FrameCache.addSpriteFrames(res.common_plist);
        FrameCache.addSpriteFrames(res.index_plist);

        //header
        var headerLayer = new HeaderLayer({title: '', lobbyId: lobbyId});
        this.addChild(headerLayer, 1);

        var privateRoomLayer = new PrivateRoomLayer(data, lobbyId);
        this.addChild(privateRoomLayer);

        this.addChild(createScrollCaption({}), 150);

        var trumpetLayer = new TrumpetBoxLayer();
        this.addChild(trumpetLayer, 151);
    },



    onExit: function () {
        this._super();
        //console.log("---->LobbyScene onExit");
        FrameCache.removeSpriteFrames(res.room_plist);
        FrameCache.removeSpriteFrames(res.avatar_plist);
        FrameCache.removeSpriteFrames(res.common_plist);
        FrameCache.removeSpriteFrames(res.index_plist);

    }


});


var PrivateRoomLayer = cc.Layer.extend({
    onEnter: function () {
        //cc.log("LobbyLayer#onEnter");
        this._super();

        //add a keyboard event listener to statusLabel
        this.keyboardListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
            },
            onKeyReleased: function (keyCode, event) {
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

    onEnterTransitionDidFinish: function () {
        //cc.log("LobbyLayer#onEnterTransitionDidFinish");
        this._super();
    },

    ctor: function (data, lobbyId) {
        this._super();
        this.init();

        this.lobbyId = lobbyId;

        //this.addChild(new HornSprite(), 9);
        this.addChild(new notificationLayer({visible: true}), 9);

        var winSize = cc.director.getWinSize();

        //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width / 2, winSize.height / 2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);


        this.addMenu();

        //主题内容部分(中心部分)
        this.layer1 = new PrivateGameLayer(data, this.search, this, '');
        this.addChild(this.layer1);


    },

    search: function (data) {
        var self = this;
        GameController.listPrivateGame(data, function (gameResult) {
            if (self.layer1) self.layer1.removeFromParent(true);
            self.layer1 = new PrivateGameLayer(gameResult, self.search, self, data.gameId);
            self.addChild(self.layer1);
        })
    },


    addMenu: function () {
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

    },



});


var PrivateGameLayer = cc.Layer.extend({
    sprite: null,
    ctor: function (args, searchCallback, target, q) {
        this._super();
        this.data = args;

        this.searchCallback = searchCallback;
        this.target = target;

        var winSize = cc.director.getWinSize();
        var visibleOrigin = cc.director.getVisibleOrigin();
        var visibleSize = cc.director.getVisibleSize();

        //
        var gameList = args.gameList;
        var cellH = 130;
        var btnH = 104;
        this.m_pScrollView = null;
        this.m_nScrollWidth =  winSize.width;
        this.m_nScrollHeight =  winSize.height;
        this.m_nScrollX = 0;
        this.m_nScrollY = 65;


        //操作区域:查询,刷新,创建房间
        var blockSize = cc.size(330, 30);

        this.roomIdLabel = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.roomIdLabel.x = 300;
        this.roomIdLabel.y = visibleOrigin.y + visibleSize.height - btnH + 28 - 80;
        this.roomIdLabel.setFontColor(cc.color.BLACK);
        this.roomIdLabel.setFont("Arial", 24);
        this.roomIdLabel.setString(q || '');
        this.roomIdLabel.setPlaceHolder('请输入房间ID,精确查找');
        this.roomIdLabel.setPlaceholderFontColor(cc.color.BLACK);
        this.addChild(this.roomIdLabel);

        //btn
        var btnSearch = new ccui.Button("search.png", "search.png", "search.png", ccui.Widget.PLIST_TEXTURE);
        btnSearch.setPosition(490, visibleOrigin.y + visibleSize.height - btnH + 28 - 80);
        btnSearch.scale = 0.9
        btnSearch.addTouchEventListener(this.search, this);
        this.addChild(btnSearch);

        //btn
        var btnRefresh = new ccui.Button("refresh.png", "refresh.png", "refresh.png", ccui.Widget.PLIST_TEXTURE);
        btnRefresh.setPosition(530, visibleOrigin.y + visibleSize.height - btnH + 28 - 80);
        btnRefresh.scale = 0.9
        btnRefresh.addTouchEventListener(this.refresh, this);
        this.addChild(btnRefresh);

        //btn
        var btnCreate = new ccui.Button("common_btn_lv.png", "common_btn_lv.png", "common_btn_lv.png", ccui.Widget.PLIST_TEXTURE);
        btnCreate.setPosition(600, visibleOrigin.y + visibleSize.height - btnH + 28 - 80);
        btnCreate.setTitleText("创建房间");
        btnCreate.setTitleFontSize(30);
        btnCreate.scale = 0.5;
        btnCreate.addTouchEventListener(this.createRoom, this);
        this.addChild(btnCreate);

        if (gameList.length == 0) {

            //nothing
            var label = new cc.LabelTTF('当前没有私人房间', 'AmericanTypewriter', 28);
            label.color = cc.color.YELLOW;
            label.setPosition(winSize.width/2, winSize.height / 2);
            this.addChild(label);

            return;
        }

//init data
        // Create the scrollview
        //
        var sH = (cellH - btnH)/2;
        var sY = cellH/2;
        var dataLen = gameList.length;
        var containerH = ((dataLen-dataLen%2)/2 + dataLen%2)*cellH;
        this.m_nScrollHeight =  210;
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




        var width = -160, height = containerH - cellH/2;
        for (var i = 1; i <= gameList.length; i++)
        {
            var game = gameList[i-1];

            this.m_pScrollView.addChild(this.createButton(game, width, height, i));

            if (i%2 == 0){
                width = -160;
                height -= cellH;
            } else{
                width += 340;
            }
        }

        this.init();

    },
    init: function () {
    },


    createButton:function (game, x, y, tag) {
        var winSize = cc.director.getWinSize();
        var button = new ccui.Button();
        button.game = game;
        button.setTouchEnabled(true);
        button.loadTextures("item_room.png", "item_room.png", "", ccui.Widget.PLIST_TEXTURE);
        button.x = winSize.width / 2.0 + x;
        button.y = y;
        button.scale = 0.55;
        button.addTouchEventListener(this.touchEvent, this);


        var roomId = new cc.LabelTTF("房间ID:"+game.gameId, "Arial", 40);
        roomId.enableStroke(cc.color.WHITE, 1.6);
        roomId.setPosition(button.width / 2, button.height / 2 + 65);
        button.addChild(roomId);

        var name = new cc.LabelTTF(game.name == '' ? '豆面扎股子-私人房' : game.name, "AmericanTypewriter", 30);
        name.setColor(cc.color.YELLOW);
        name.setPosition(button.width / 2, button.height / 2 - 5);
        button.addChild(name);

        var base = new cc.LabelTTF("底:"+game.base, "AmericanTypewriter", 24);
        base.setColor(cc.color.WHITE);
        base.setAnchorPoint(0, 0);
        base.setPosition(50, button.height / 2 - 75);
        button.addChild(base);

        var current = new cc.LabelTTF("队员:" + game.currentActorNum + '/' + game.maxActor, "AmericanTypewriter", 24);
        current.setColor(cc.color.WHITE);
        current.setAnchorPoint(0, 0);
        current.setPosition(base.width+90, button.height / 2 - 75);
        button.addChild(current);

        if (game.useNoteCard) {
            var useNoteCard = new cc.Sprite("#jipaiqi.png");
            useNoteCard.setAnchorPoint(0, 0);
            useNoteCard.scale = 0.3;
            useNoteCard.setPosition(button.width / 2 + 45, button.height / 2 - 75);
            button.addChild(useNoteCard);
        }


        if (game.password) {
            var locked = new cc.Sprite("#lock.png");
            locked.setAnchorPoint(0, 0);
            locked.setPosition(button.width / 2 - 50, button.height / 2 - 90);
            button.addChild(locked, 1);
        }


        var baseValue = new cc.LabelTTF(game.min + '≤金', "Arial", 20);
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
                playEffect(audio_common.Button_Click);

                //如果房间没密码, 直接加入
                if (!sender.game.password) {
                    GameController.joinPrivateGame({roomId: 45, gameId: sender.game.gameId});
                    return;
                }

                //如果有密码, 弹出密码框
                var joinPrivateRoomWithPasswordBox = new JoinPrivateRoomWithPasswordBox(function (password) {
                    GameController.joinPrivateGame({roomId: 45, gameId: sender.game.gameId, password: password});
                });

                this.addChild(joinPrivateRoomWithPasswordBox);

                break;

            case ccui.Widget.TOUCH_CANCELED:
//                console.log("Touch Cancelled");
                break;

            default:
                break;
        }
    },


    createRoom: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                playEffect(audio_common.Button_Click);
                if (gPlayer.gold < 1000) {
                    prompt.fadeMiddle('您的金币不够1000, 无法创建');
                    return;
                }
                var createPrivateRoomBox = new CreatePrivateRoomBox();
                cc.director.getRunningScene().addChild(createPrivateRoomBox, 20);
                break;

            default:
                break;
        }

    },

    search: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                playEffect(audio_common.Button_Click);
                var data = {};
                var gameId = this.roomIdLabel.getString().trim();
                if (gameId == '') return;
                data.gameId = gameId;
                if (this.target && cc.isFunction(this.searchCallback)) {
                    this.searchCallback.call(this.target, data);
                }
                break;

            default:
                break;
        }
    },

    refresh: function (sender, type) {

        switch (type) {
            case ccui.Widget.TOUCH_ENDED:

                playEffect(audio_common.Button_Click);
                if (this.target && cc.isFunction(this.searchCallback)) {
                    this.searchCallback.call(this.target, {}, '');
                }
                break;

            default:
                break;
        }
    },


    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }
});



//创建房间form
var CreatePrivateRoomBox = function () {
    return this.ctor();
}

CreatePrivateRoomBox.prototype = {
    ctor: function () {


        var winSize = cc.director.getWinSize();

        this.box = new DialogSmall_T('创建房间', 1, null, null, 0.5, {w: 0, h: 0});

        var columnX = 180, y = 320, contentX = 280, spaceY = 40;

        //
        var label = new cc.LabelTTF('房间名称', "Arial", 16);
        label.setPosition(columnX, y);
        label.setAnchorPoint(0, 0.5);
        this.box.addChild(label);

        var blockSize = cc.size(330, 30);

        this.roomNameLabel = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.roomNameLabel.x = contentX;
        this.roomNameLabel.y = y
        this.roomNameLabel.setFontColor(cc.color.BLACK);
        this.roomNameLabel.setFont("Arial", 36);
        this.roomNameLabel.setAnchorPoint(0, 0.5);
        this.roomNameLabel.setPlaceHolder('请输入房间名,10字内,可选填');
        this.roomNameLabel.setPlaceholderFontColor(cc.color.BLACK);
        this.box.addChild(this.roomNameLabel);

        y-= spaceY;
        //房间密码
        var label = new cc.LabelTTF('房间密码', "Arial", 16);
        label.setPosition(columnX, y);
        label.setAnchorPoint(0, 0.5);
        this.box.addChild(label);


        this.roomPasswordLabel = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.roomPasswordLabel.x = contentX;
        this.roomPasswordLabel.y = y
        this.roomPasswordLabel.setFontColor(cc.color.BLACK);
        this.roomPasswordLabel.setFont("Arial", 36);
        this.roomPasswordLabel.setAnchorPoint(0, 0.5);
        this.roomPasswordLabel.setPlaceHolder('请输入房间密码,默认无密码');
        this.roomPasswordLabel.setPlaceholderFontColor(cc.color.BLACK);
        this.box.addChild(this.roomPasswordLabel);

        y-= spaceY;
        //房间人数
        var label = new cc.LabelTTF('房间人数', "Arial", 16);
        label.setPosition(columnX, y);
        label.setAnchorPoint(0, 0.5);
        this.box.addChild(label);


        var label = new cc.LabelTTF("5人", "AmericanTypewriter", 16);
        label.setPosition(contentX, y);
        label.setAnchorPoint(0, 0.5);
        label.color = cc.color.WHITE;
        this.box.addChild(label);


        var label = new cc.LabelTTF("6人", "AmericanTypewriter", 16);
        label.setPosition(contentX + 110, y);
        label.color = cc.color.WHITE;
        label.setAnchorPoint(0, 0.5);
        this.box.addChild(label);

        var label = new cc.LabelTTF("7人", "AmericanTypewriter", 16);
        label.setPosition(contentX + 220, y);
        label.setAnchorPoint(0, 0.5);
        label.color = cc.color.WHITE;
        this.box.addChild(label);


        this.checkBoxGame5 = new ccui.CheckBox();
        this.checkBoxGame5.setTouchEnabled(true);
        this.checkBoxGame5.setAnchorPoint(0, 0.5);
        this.checkBoxGame5.setSelected(true);
        this.checkBoxGame5.loadTextures("common_checkbox_1.png",
            "common_checkbox_2.png",
            "common_checkbox_2.png",
            "common_checkbox_1.png",
            "common_checkbox_1.png",
            ccui.Widget.PLIST_TEXTURE);

        this.checkBoxGame5.addEventListener(this.onGame5, this);
        this.checkBoxGame5.scale = 0.7;
        this.checkBoxGame5.setPosition(contentX + 40, y);
        this.box.addChild(this.checkBoxGame5);

        this.checkBoxGame6 = new ccui.CheckBox();
        this.checkBoxGame6.setTouchEnabled(true);
        this.checkBoxGame6.setAnchorPoint(0, 0.5);
        this.checkBoxGame6.loadTextures("common_checkbox_1.png",
            "common_checkbox_2.png",
            "common_checkbox_2.png",
            "common_checkbox_1.png",
            "common_checkbox_1.png",
            ccui.Widget.PLIST_TEXTURE);

        this.checkBoxGame6.addEventListener(this.onGame6, this);
        this.checkBoxGame6.scale = 0.7;
        this.checkBoxGame6.setPosition(contentX + 160, y);
        this.box.addChild(this.checkBoxGame6);

        this.checkBoxGame7 = new ccui.CheckBox();
        this.checkBoxGame7.setTouchEnabled(true);
        this.checkBoxGame7.setAnchorPoint(0, 0.5);
        this.checkBoxGame7.loadTextures("common_checkbox_1.png",
            "common_checkbox_2.png",
            "common_checkbox_2.png",
            "common_checkbox_1.png",
            "common_checkbox_1.png",
            ccui.Widget.PLIST_TEXTURE);

        this.checkBoxGame7.addEventListener(this.onGame7, this);
        this.checkBoxGame7.scale = 0.7;
        this.checkBoxGame7.setPosition(contentX + 270, y);
        this.box.addChild(this.checkBoxGame7);


        y -= spaceY;
        //房间底注
        var label = new cc.LabelTTF('房间底注', "Arial", 16);
        label.setPosition(columnX, y);
        label.setAnchorPoint(0, 0.5);
        this.box.addChild(label);


        var label = new cc.LabelTTF("100", "AmericanTypewriter", 16);
        label.setPosition(contentX, y);
        label.setAnchorPoint(0, 0.5);
        label.color = cc.color.WHITE;
        this.box.addChild(label);


        var label = new cc.LabelTTF("1000", "AmericanTypewriter", 16);
        label.setPosition(contentX + 110, y);
        label.color = cc.color.WHITE;
        label.setAnchorPoint(0, 0.5);
        this.box.addChild(label);

        var label = new cc.LabelTTF("5000", "AmericanTypewriter", 16);
        label.setPosition(contentX + 220, y);
        label.setAnchorPoint(0, 0.5);
        label.color = cc.color.WHITE;
        this.box.addChild(label);


        this.checkBoxBase100 = new ccui.CheckBox();
        this.checkBoxBase100.setTouchEnabled(true);
        this.checkBoxBase100.setAnchorPoint(0, 0.5);
        this.checkBoxBase100.setSelected(true);
        this.checkBoxBase100.loadTextures("common_checkbox_1.png",
            "common_checkbox_2.png",
            "common_checkbox_2.png",
            "common_checkbox_1.png",
            "common_checkbox_1.png",
            ccui.Widget.PLIST_TEXTURE);

        this.checkBoxBase100.addEventListener(this.onBase100, this);
        this.checkBoxBase100.scale = 0.7;
        this.checkBoxBase100.setPosition(contentX + 40, y);
        this.box.addChild(this.checkBoxBase100);

        this.checkBoxBase1000 = new ccui.CheckBox();
        this.checkBoxBase1000.setTouchEnabled(true);
        this.checkBoxBase1000.setAnchorPoint(0, 0.5);
        this.checkBoxBase1000.loadTextures("common_checkbox_1.png",
            "common_checkbox_2.png",
            "common_checkbox_2.png",
            "common_checkbox_1.png",
            "common_checkbox_1.png",
            ccui.Widget.PLIST_TEXTURE);

        this.checkBoxBase1000.addEventListener(this.onBase1000, this);
        this.checkBoxBase1000.scale = 0.7;
        this.checkBoxBase1000.setPosition(contentX + 160, y);
        this.box.addChild(this.checkBoxBase1000);

        this.checkBoxBase5000 = new ccui.CheckBox();
        this.checkBoxBase5000.setTouchEnabled(true);
        this.checkBoxBase5000.setAnchorPoint(0, 0.5);
        this.checkBoxBase5000.loadTextures("common_checkbox_1.png",
            "common_checkbox_2.png",
            "common_checkbox_2.png",
            "common_checkbox_1.png",
            "common_checkbox_1.png",
            ccui.Widget.PLIST_TEXTURE);

        this.checkBoxBase5000.addEventListener(this.onBase5000, this);
        this.checkBoxBase5000.scale = 0.7;
        this.checkBoxBase5000.setPosition(contentX + 270, y);
        this.box.addChild(this.checkBoxBase5000);



        y -= spaceY;

        //是否可用记牌器
        var label = new cc.LabelTTF('使用记牌器', "Arial", 16);
        label.setPosition(columnX, y);
        label.setAnchorPoint(0, 0.5);
        this.box.addChild(label);


        var label = new cc.LabelTTF("允许", "AmericanTypewriter", 16);
        label.setPosition(contentX, y);
        label.setAnchorPoint(0, 0.5);
        label.color = cc.color.WHITE;
        this.box.addChild(label);

        this.checkBoxUseNoteCard = new ccui.CheckBox();
        this.checkBoxUseNoteCard.setTouchEnabled(true);
        this.checkBoxUseNoteCard.setAnchorPoint(0, 0.5);
        this.checkBoxUseNoteCard.setSelected(true);
        this.checkBoxUseNoteCard.loadTextures("common_checkbox_1.png",
            "common_checkbox_2.png",
            "common_checkbox_2.png",
            "common_checkbox_1.png",
            "common_checkbox_1.png",
            ccui.Widget.PLIST_TEXTURE);

        this.checkBoxUseNoteCard.scale = 0.7;
        this.checkBoxUseNoteCard.setPosition(contentX + 40, y);
        this.box.addChild(this.checkBoxUseNoteCard);


        y -= spaceY;
        //btn
        var btnCreate = new ccui.Button("common_btn_lv.png", "common_btn_lv.png", "common_btn_lv.png", ccui.Widget.PLIST_TEXTURE);
        btnCreate.setPosition(contentX + 120, y - 30);
        btnCreate.setTitleText("创建");
        btnCreate.setTitleFontSize(30);
        btnCreate.scale = 0.5;
        btnCreate.addTouchEventListener(this.doCreateRoom, this);
        this.box.addChild(btnCreate);


        return this.box;
    },

    doCreateRoom: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                playEffect(audio_common.Button_Click);

                if (gPlayer.gold < 1000) {
                    prompt.fadeMiddle('您的金币不够1000, 无法创建');
                    return;
                }

                var data = {};
                data.roomId = 45;   //私人场固定ROOMID
                data.name = this.roomNameLabel.getString().substring(0, 10);
                data.password = this.roomPasswordLabel.getString();
                //max actor
                if (this.checkBoxGame5.isSelected()) {
                    data.maxActor = 5;
                }
                else if (this.checkBoxGame6.isSelected()) {
                    data.maxActor = 6;
                }
                else {
                    data.maxActor = 7;
                }
                //base
                if (this.checkBoxBase100.isSelected()) {
                    data.base = 100;
                }
                else if (this.checkBoxBase1000.isSelected()) {
                    data.base = 1000;
                }
                else {
                    data.base = 5000;
                }

                data.useNoteCard = this.checkBoxUseNoteCard.isSelected();

                GameController.createPrivateRoom(data);
                break;

            default:
                break;
        }

    },

    onGameTypeSelected: function (maxActor) {
        playEffect(audio_common.Button_Click);
        if (maxActor == 5) {
            this.checkBoxGame5.setSelected(true);
            this.checkBoxGame6.setSelected(false);
            this.checkBoxGame7.setSelected(false);
        }
        else if (maxActor == 6) {
            this.checkBoxGame5.setSelected(false);
            this.checkBoxGame6.setSelected(true);
            this.checkBoxGame7.setSelected(false);
        }
        else {
            this.checkBoxGame5.setSelected(false);
            this.checkBoxGame6.setSelected(false);
            this.checkBoxGame7.setSelected(true);
        }
    },

    onGame5: function() {
        this.onGameTypeSelected(5)
    },
    onGame6: function() {
        this.onGameTypeSelected(6)
    },
    onGame7: function() {
        this.onGameTypeSelected(7)
    },


    onGameBaseSelected: function (base) {
        playEffect(audio_common.Button_Click);
        if (base == 100) {
            this.checkBoxBase100.setSelected(true);
            this.checkBoxBase1000.setSelected(false);
            this.checkBoxBase5000.setSelected(false);
        }
        else if (base == 1000) {
            this.checkBoxBase100.setSelected(false);
            this.checkBoxBase1000.setSelected(true);
            this.checkBoxBase5000.setSelected(false);
        }
        else {
            this.checkBoxBase100.setSelected(false);
            this.checkBoxBase1000.setSelected(false);
            this.checkBoxBase5000.setSelected(true);
        }
    },

    onBase100: function() {
        this.onGameBaseSelected(100)
    },
    onBase1000: function() {
        this.onGameBaseSelected(1000)
    },
    onBase5000: function() {
        this.onGameBaseSelected(5000)
    },





}



var JoinPrivateRoomWithPasswordBox = function (callback) {
    return this.ctor(callback);
}

JoinPrivateRoomWithPasswordBox.prototype = {
    ctor: function (callback) {

        this.callback = callback;

        var self = this;

        this.box = new DialogSmall_T('输入密码', 1, null, null, 0.3, {w: 0, h: -20});

        var blockSize = cc.size(200, 30);

        this.roomPasswordLabel = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.roomPasswordLabel.x = 400;
        this.roomPasswordLabel.y = 250;
        this.roomPasswordLabel.setFontColor(cc.color.BLACK);
        this.roomPasswordLabel.setFont("Arial", 24);
        this.roomPasswordLabel.setPlaceHolder('请输入房间密码');
        this.roomPasswordLabel.setPlaceholderFontColor(cc.color.BLACK);
        this.box.addChild(this.roomPasswordLabel);

        //btn
        var btnJoin = new ccui.Button("common_btn_lv.png", "common_btn_lv.png", "common_btn_lv.png", ccui.Widget.PLIST_TEXTURE);
        btnJoin.setPosition(400, 150);
        btnJoin.setTitleText("确定");
        btnJoin.setTitleFontSize(30);
        btnJoin.scale = 0.5;
        btnJoin.addTouchEventListener(this.ensure, this);
        this.box.addChild(btnJoin);


        return this.box;
    },

    ensure: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                playEffect(audio_common.Button_Click);
                var password = this.roomPasswordLabel.getString();
                if (password == '') {
                    prompt.fadeMiddle('密码不能为空');
                    return;
                }
                this.callback(password);
                break;
        }

    }
}