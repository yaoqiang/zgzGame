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
            //处理安卓版本更新提示
            var lastRequestAppReleaseTime = Storage.get(CommonConf.LOCAL_STORAGE.LAST_REQUEST_APP_RELEASE_TIME);

            if (!lastRequestAppReleaseTime) {
                UniversalController.getLastApp();
            }
            else {
                if (lastRequestAppReleaseTime != new Date().getDate()) {
                    UniversalController.getLastApp();
                }
            }
            Storage.set(CommonConf.LOCAL_STORAGE.LAST_REQUEST_APP_RELEASE_TIME, new Date().getDate());
        }

        //处理每日首次登陆后逻辑
        var lastLoginDay = Storage.get(CommonConf.LOCAL_STORAGE.LAST_LOGIN_DAY);

        if (!lastLoginDay) {
            this.enterOptionFirstTimeInDay();
        } else {
            if (lastLoginDay != new Date().getDate()) {
                this.enterOptionFirstTimeInDay();
            }
        }

        Storage.set(CommonConf.LOCAL_STORAGE.LAST_LOGIN_DAY, new Date().getDate());

    },

    enterOptionFirstTimeInDay: function () {
        var self = this;
        //弹出每日必做窗口
        UniversalController.getDailyTodoInfo(function (data) {
            var box = new DailyTodoLayer(data);
            self.addChild(box, 998);
        });

        //请求最新邮件
        UniversalController.getLastSystemMessageDate(function (data) {
            var lastSystemMessageDate = Storage.get(CommonConf.LOCAL_STORAGE.LAST_SYSTEM_MESSAGE_DATE);
            if (!lastSystemMessageDate) {
                Storage.set(CommonConf.LOCAL_STORAGE.UI_HIGHLIGHT_SYSTEM_MESSAGE, true);
            }
            else {
                if (lastSystemMessageDate < data.lastSystemMessageDate) {
                    Storage.set(CommonConf.LOCAL_STORAGE.UI_HIGHLIGHT_SYSTEM_MESSAGE, true);
                }
            }
            //设置最新一条系统消息的时间
            Storage.set(CommonConf.LOCAL_STORAGE.LAST_SYSTEM_MESSAGE_DATE, data.lastSystemMessageDate);
        })
    },

    ctor: function (lobbyData) {
        this._super();

        var self = this;
        //console.log("---->IndexScene ctor");
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

        var trumpetLayer = new TrumpetBoxLayer();
        this.addChild(trumpetLayer, 2);
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
        //console.log("---->IndexScene onExit");
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
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.common_png);
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.index_png);
    }
});

