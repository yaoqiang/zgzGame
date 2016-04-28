var IndexScene = cc.Scene.extend({
    onEnter: function () {

        this._super();
        //var pLayer = new lobbyTableLayer({});
        //this.addChild(pLayer);

        //移动到登录成功后, 因为重回游戏不再进入index, 会导致背景音乐无效
        //playBackMusic();

        //----------------------
        //进入大厅后逻辑处理
        //----------------------
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            var lastRequestAppReleaseTime = Storage.get(CommonConf.LOCAL_STORAGE.LAST_REQUEST_APP_RELEASE_TIME);

            if (!lastRequestAppReleaseTime) {
                gRequestAppReleaseFrom = 'auto';
                UniversalController.getTopOfAppReleaseRecord();
            }
            else {
                if (lastRequestAppReleaseTime != new Date().getDate()) {
                    UniversalController.getTopOfAppReleaseRecord();
                }
            }
            Storage.set(CommonConf.LOCAL_STORAGE.LAST_REQUEST_APP_RELEASE_TIME, new Date().getDate());

        }
    },

    ctor: function (lobbyData) {
        this._super();

        var self = this;
        console.log("---->IndexScene ctor");
        //cc.spriteFrameCache.addSpriteFrames(res.index_plist);
        //cc.spriteFrameCache.addSpriteFrames(res.avatar_plist);
        //cc.spriteFrameCache.addSpriteFrames(res.common_plist);
        FrameCache.addSpriteFrames(res.index_plist);
        FrameCache.addSpriteFrames(res.avatar_plist);
        FrameCache.addSpriteFrames(res.common_plist);

        //header
        var headerLayer = new HeaderLayer({lobbyId: undefined});
        this.addChild(headerLayer, 1);


        var indexLayer = new IndexLayer(lobbyData);
        this.addChild(indexLayer);

        //template
        var bottomBtnLayer = new BottomBtnLayer({});
        this.addChild(bottomBtnLayer);

        this.addChild(createScrollCaption({}),500);

        //add a keyboard event listener to statusLabel

        //首页, 如果按1次, 弹出是否退出
        this.keyboardListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
            },
            onKeyReleased: function (keyCode, event) {
                if (keyCode == cc.KEY.back) {
                    playEffect(audio_common.Button_Click);

                    if (self.exitBox) {
                        self.exitBox.removeFromParent(true);
                        self.exitBox = null;
                        return;
                    }

                    self.exitBox = new AlertBox('您确定要退出游戏吗?', function () {
                        cc.director.end();
                    }, this);
                    self.addChild(self.exitBox, 9);

                }

            }
        }, this);

    },

    onExit: function () {
        this._super();
        console.log("---->IndexScene onExit");
        cc.eventManager.removeListener(this.keyboardListener);

        FrameCache.removeSpriteFrames(res.avatar_plist);
        FrameCache.removeSpriteFrames(res.common_plist);
        FrameCache.removeSpriteFrames(res.index_plist);
    }

});


var IndexLayer = cc.Layer.extend({
    sprite: null,
    ctor: function (lobbyData) {
        this._super();

        var winSize = cc.director.getWinSize();

        //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width / 2, winSize.height / 2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        this.init(lobbyData);
        return;


        // return true;
    },
    init: function (lobbyData) {
        //console.log("---|---->init");
        var winSize = cc.director.getWinSize();
        //this.addChild(new HornSprite());    //zIndex: 0
        this.addChild(new notificationLayer({visible:true}), 9);

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
        
        this.addChild(createIndexScrollLayer({
            width: winSize.width,
            height: 350,
            x: 0,
            y: 0,
            lobbyData: lobbyData
        }), 10);
        //this.addChild(new createLobbyScrollLayer({width:winSize.width, height:300, x:0, y:0}), 100);
        //this.addChild(new createLobbyTableLayer({width:winSize.width, height:300, x:0, y:0, cwidth:winSize.width-20, cheight:40}), 100);
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
                playEffect(audio_common.Button_Click);

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
    },


    onMenuCallback: function () {
        this.lobbyMenu.enabled = false;
        //this.scheduleOnce(function () {
        //    this.lobbyMenu.enabled = true;
        //}, 2);
        this.onLobbyIconClicked(this.lobbyOf5Icon, 0);
        playEffect(audio_common.Button_Click);
    },
    onMenuCallback2: function () {
        this.lobbyMenu.enabled = false;
        this.scheduleOnce(function () {
            this.lobbyMenu.enabled = true;
        }, 2);
        this.onLobbyIconClicked(this.lobbyOf7Icon, 1);
        playEffect(audio_common.Button_Click);
    },

    onLobbyIconClicked: function (node, lobbyId) {
        GameController.enterLobby(lobbyId);
        playEffect(audio_common.Button_Click);
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

        //

        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.common_png);
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.index_png);
    }
});