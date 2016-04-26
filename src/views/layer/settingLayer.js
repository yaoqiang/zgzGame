var SettingLayer = function () {
    return this.ctor();
}

SettingLayer.prototype = {
    ctor: function () {

        cc.spriteFrameCache.addSpriteFrames(res.settings_plist);

        this.box = new DialogSmall("设置", 1, null);

        this.init();

        return this.box;

    },

    init: function () {

        var self = this;
        var winSize = cc.director.getWinSize();

        //加载当前音乐音效设置
        var code = loadSet();
        var music = code[0];
        var effect = code[1];

        cc.loader.loadJson("res/game_config.json", function (err, config) {

            //version title
            var version = config.version ? config.version : '1.0';
            var versionLabel = new cc.LabelTTF('游戏版本: '+version, 'AmericanTypewriter', 38);
            versionLabel.setAnchorPoint(0, 0.5);
            versionLabel.color = {r: 0, g: 255, b: 127};
            versionLabel.x = 100;
            versionLabel.y = winSize.height / 2 + 300;
            self.box.bg.addChild(versionLabel);
        });


        var idLabel = new cc.LabelTTF('玩家ID: '+gPlayer.uid, 'AmericanTypewriter', 38);
        idLabel.setAnchorPoint(0, 0.5);
        idLabel.x = 100;
        idLabel.y = winSize.height / 2 + 240;
        idLabel.color = {r: 0, g: 255, b: 127};
        this.box.bg.addChild(idLabel);

        var x = 160, y = winSize.height / 2 + 110, cellX = 220;
        //
        this.checkBoxMusic = new ccui.CheckBox();
        this.checkBoxMusic.setTouchEnabled(true);
        this.checkBoxMusic.scale = 2;
        this.checkBoxMusic.setSelected(!music);
        this.checkBoxMusic.loadTextures("ic_setup_music.png",
            "ic_setup_close.png",
            "ic_setup_close.png",
            "ic_setup_music.png",
            "ic_setup_music.png",
            ccui.Widget.PLIST_TEXTURE);

        this.checkBoxMusic.addEventListener(this.musicValueChanged, this);
        this.checkBoxMusic.setPosition(x, y);

        var musicLabel = new cc.LabelTTF('音乐', 'Arial', 34);
        musicLabel.setPosition(x, y - 100);

        this.box.bg.addChild(this.checkBoxMusic);
        this.box.bg.addChild(musicLabel);

        x += cellX;
        //
        this.checkBoxEffect = new ccui.CheckBox();
        this.checkBoxEffect.setTouchEnabled(true);
        this.checkBoxEffect.scale = 2;
        this.checkBoxEffect.setSelected(!effect);
        this.checkBoxEffect.loadTextures("ic_setup_volume.png",
            "ic_setup_close.png",
            "ic_setup_close.png",
            "ic_setup_volume.png",
            "ic_setup_volume.png",
            ccui.Widget.PLIST_TEXTURE);

        this.checkBoxEffect.addEventListener(this.effectValueChanged, this);
        this.checkBoxEffect.setPosition(x, y);

        var effectLabel = new cc.LabelTTF('音效', 'Arial', 34);
        effectLabel.setPosition(x, y - 100);

        this.box.bg.addChild(this.checkBoxEffect);
        this.box.bg.addChild(effectLabel);

        x += cellX;
        //
        var helpBtn = new ccui.Button();
        helpBtn.setPressedActionEnabled(true);
        helpBtn.setAnchorPoint(0.5, 0.5);
        helpBtn.setTouchEnabled(true);
        helpBtn.loadTextures("ic_setup_help.png", "ic_setup_help.png", "ic_setup_help.png", ccui.Widget.PLIST_TEXTURE);
        helpBtn.addTouchEventListener(this.helpBtnClicked, this);
        helpBtn.x = x;
        helpBtn.y = y;
        helpBtn.scale = 2;
        this.box.bg.addChild(helpBtn);

        var helpLabel = new cc.LabelTTF('帮助', 'Arial', 34);
        helpLabel.setPosition(x, y - 100);

        this.box.bg.addChild(helpLabel);


        x += cellX;
        //
        var customerBtn = new ccui.Button();
        customerBtn.setPressedActionEnabled(true);
        customerBtn.setAnchorPoint(0.5, 0.5);
        customerBtn.setTouchEnabled(true);
        customerBtn.loadTextures("ic_setup_service.png", "ic_setup_service.png", "ic_setup_service.png", ccui.Widget.PLIST_TEXTURE);
        customerBtn.addTouchEventListener(this.customerBtnClicked, this);
        customerBtn.x = x;
        customerBtn.y = y;
        customerBtn.scale = 2;
        this.box.bg.addChild(customerBtn);

        var customerLabel = new cc.LabelTTF('客服', 'Arial', 34);
        customerLabel.setPosition(x, y - 100);

        this.box.bg.addChild(customerLabel);

        y = y-220;

        //button
        //如果是iOS版本 按钮功能为:游戏声明
        if (cc.sys.os == cc.sys.OS_IOS) {
            var gameDeclareBtn = new ccui.Button();
            gameDeclareBtn.setTitleText('游戏声明');
            gameDeclareBtn.setTitleFontSize(28);
            gameDeclareBtn.setAnchorPoint(0.5, 0.5);
            gameDeclareBtn.setTouchEnabled(true);
            gameDeclareBtn.loadTextures("common_btn_lv.png", "common_btn_lv.png", "common_btn_lv.png", ccui.Widget.PLIST_TEXTURE);
            gameDeclareBtn.addTouchEventListener(this.gameDeclareBtnClicked, this);
            gameDeclareBtn.x = winSize.width/2 - 100;
            gameDeclareBtn.y = y;
            gameDeclareBtn.scale = 1.3;
            this.box.bg.addChild(gameDeclareBtn);
        }
        else {
            var versionDetectBtn = new ccui.Button();
            versionDetectBtn.setTitleText('版本检测');
            versionDetectBtn.setTitleFontSize(28);
            versionDetectBtn.setAnchorPoint(0.5, 0.5);
            versionDetectBtn.setTouchEnabled(true);
            versionDetectBtn.loadTextures("common_btn_lv.png", "common_btn_lv.png", "common_btn_lv.png", ccui.Widget.PLIST_TEXTURE);
            versionDetectBtn.addTouchEventListener(this.versionDetectBtnClicked, this);
            versionDetectBtn.x = winSize.width/2 - 100;
            versionDetectBtn.y = y;
            versionDetectBtn.scale = 1.3;
            this.box.bg.addChild(versionDetectBtn);
        }


        var switchAccountBtn = new ccui.Button();
        switchAccountBtn.setTitleText('切换账号');
        switchAccountBtn.setTitleFontSize(28);
        switchAccountBtn.setAnchorPoint(0.5, 0.5);
        switchAccountBtn.setTouchEnabled(true);
        switchAccountBtn.loadTextures("common_btn_lv.png", "common_btn_lv.png", "common_btn_lv.png", ccui.Widget.PLIST_TEXTURE);
        switchAccountBtn.addTouchEventListener(this.switchAccountBtnClicked, this);
        switchAccountBtn.x = winSize.width/2 + 250;
        switchAccountBtn.y = y;
        switchAccountBtn.scale = 1.3;
        this.box.bg.addChild(switchAccountBtn);

    },

    musicValueChanged: function (sender, type) {
        switch (type) {
            case  ccui.CheckBox.EVENT_UNSELECTED:
                setPlayMusic(true);
                break;
            case ccui.CheckBox.EVENT_SELECTED:
                setPlayMusic(false);
                break;

            default:
                break;
        }
    },

    effectValueChanged: function (sender, type) {
        switch (type) {
            case  ccui.CheckBox.EVENT_UNSELECTED:
                setPlayEffects(true);
                break;
            case ccui.CheckBox.EVENT_SELECTED:
                setPlayEffects(false);
                break;

            default:
                break;
        }
    },

    gameDeclareBtnClicked: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;

            case ccui.Widget.TOUCH_MOVED:
                break;

            case ccui.Widget.TOUCH_ENDED:
                playEffect(audio_common.Button_Click);

                var gameDeclareBox = new DialogMiddle("游戏声明", 1, null);
                cc.director.getRunningScene().addChild(gameDeclareBox, 50);


                var webView = new ccui.WebView("http://www.zaguzi.com/privacy.html");
                var x = 400, y = 210, w = 500, h = 290;
                if (cc.sys.isNative) {
                    x = 485;
                    y = 300;
                    w = 900;
                    h = 500;
                }
                webView.setContentSize(w, h);
                webView.setPosition(x, y);
                gameDeclareBox.bg.addChild(webView);

                break;

            case ccui.Widget.TOUCH_CANCELED:
                break;

            default:
                break;
        }
    },
    
    versionDetectBtnClicked: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;

            case ccui.Widget.TOUCH_MOVED:
                break;

            case ccui.Widget.TOUCH_ENDED:
                playEffect(audio_common.Button_Click);

                //
                gRequestAppReleaseFrom = 'setting';
                UniversalController.getTopOfAppReleaseRecord();

                break;

            case ccui.Widget.TOUCH_CANCELED:
                break;

            default:
                break;
        }
    },

    switchAccountBtnClicked: function (sender, type) {
        playEffect(audio_common.Button_Click);
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;

            case ccui.Widget.TOUCH_MOVED:
                break;

            case ccui.Widget.TOUCH_ENDED:
                playEffect(audio_common.Button_Click);
                //切换账号, 先设置全局变量, 以防自动连接, 断开pomelo, 跳转到登录scene
                gHasConnector = false;
                pomelo.disconnect();
                cc.director.runScene(new LoginScene());

                break;

            case ccui.Widget.TOUCH_CANCELED:
                break;

            default:
                break;
        }
    },

    helpBtnClicked: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;

            case ccui.Widget.TOUCH_MOVED:
                break;

            case ccui.Widget.TOUCH_ENDED:
                playEffect(audio_common.Button_Click);

                var helpBox = new DialogMiddle("游戏帮助", 1, null);
                cc.director.getRunningScene().addChild(helpBox, 50);


                var webView = new ccui.WebView("res/help.html");
                var x = 400, y = 210, w = 500, h = 290;
                if (cc.sys.isNative) {
                    x = 485;
                    y = 300;
                    w = 900;
                    h = 500;
                }
                webView.setContentSize(w, h);
                webView.setPosition(x, y);
                helpBox.bg.addChild(webView);


                break;

            case ccui.Widget.TOUCH_CANCELED:
                break;

            default:
                break;
        }
    },

    customerBtnClicked: function (sender, type) {

        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;

            case ccui.Widget.TOUCH_MOVED:
                break;

            case ccui.Widget.TOUCH_ENDED:
                playEffect(audio_common.Button_Click);

                prompt.fadeMiddle('请拨打客服热线: 0352-7963773', 3)

                break;

            case ccui.Widget.TOUCH_CANCELED:
                break;

            default:
                break;
        }
    }


}

