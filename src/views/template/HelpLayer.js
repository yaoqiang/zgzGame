var HelpLayer = cc.Layer.extend({
    ctor: function(args) {
        this._super();
        var size = cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.game_plist, res.game_png);
        cc.spriteFrameCache.addSpriteFrames(res.login_plist, res.login_png);
        cc.spriteFrameCache.addSpriteFrames(res.common_plist, res.common_png);
        //background
        var bg = new cc.Sprite("#mianban.png");
        bg.setPosition(cc.p(size.width/2, size.height/2));
        bg.scale = 1.2;
        this.addChild(bg);

        // create back button sprite
        var backNormal = new cc.Sprite("#fanhuianniu.png");
        backNormal.attr({scale:0.9});
        var backSelected = new cc.Sprite("#fanhuianniu.png");
        backSelected.attr({scale:1});
        var backDisabled = new cc.Sprite("#fanhuianniu.png");

        // create back button
        var backButton = new cc.MenuItemSprite(backNormal, backSelected, backDisabled, this.onBackCallback, this);
        var HeaderMenu = new cc.Menu(backButton);
        HeaderMenu.attr({x:80, y:size.height - 50});
        this.addChild(HeaderMenu);

        var title = new cc.LabelTTF("设置", "Arial", 21, 10 );
        title.attr({x: size.width / 2,y: size.height / 2 + 150,anchorX: 0.5,anchorY: 0.5});
        this.addChild(title);

        // Music setting items.
        var musicItemsBg = new cc.Scale9Sprite("mianban_01.png", cc.rect(17, 14, 27, 26));
        musicItemsBg.setPosition(100, size.height / 2 + 100);
        musicItemsBg.setAnchorPoint(cc.p(0, 1));
        musicItemsBg.setContentSize(cc.size(250, 50));
        this.addChild(musicItemsBg);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(24);
        var musicLabel = new cc.MenuItemFont("音乐");
        musicLabel.setEnabled(false);
        musicLabel.setColor(cc.color.YELLOW);
        musicLabel.attr({x:40, y: 28});
        musicItemsBg.addChild(musicLabel);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);
        var musicButton = new cc.MenuItemToggle(
            new cc.MenuItemFont("On"),
            new cc.MenuItemFont("Off")
        );
        musicButton.setCallback(this.onSoundControl );
        var musicState = ZGZ.SOUND ? 0 : 1;
        musicButton.setSelectedIndex(musicState);
        var musicMenu = new cc.Menu(musicButton);
        musicMenu.attr({x:150, y: 28});
        musicItemsBg.addChild(musicMenu);

        // Sound effect setting items.
        var soundEffectBg = new cc.Scale9Sprite("mianban_01.png", cc.rect(17, 14, 27, 26));
        soundEffectBg.setPosition(440, size.height / 2 + 100);
        soundEffectBg.setAnchorPoint(cc.p(0, 1));
        soundEffectBg.setContentSize(cc.size(250, 50));
        this.addChild(soundEffectBg);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(24);
        var soundEffectLabel = new cc.MenuItemFont("音效");
        soundEffectLabel.setEnabled(false);
        soundEffectLabel.setColor(cc.color.YELLOW);
        soundEffectLabel.attr({x:40, y: 28});
        soundEffectBg.addChild(soundEffectLabel);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);
        var soundEffectButton = new cc.MenuItemToggle(
            new cc.MenuItemFont("On"),
            new cc.MenuItemFont("Off")
        );
        soundEffectButton.setCallback(this.onSoundControl );
        var soundEffectState = ZGZ.SOUND_EFFECT ? 0 : 1;
        soundEffectButton.setSelectedIndex(soundEffectState);
        var soundEffectMenu = new cc.Menu(soundEffectButton);
        soundEffectMenu.attr({x:150, y: 28});
        soundEffectBg.addChild(soundEffectMenu);

        // questions setting items
        var questionsEffectBg = new cc.Scale9Sprite("mianban_01.png", cc.rect(17, 14, 27, 26));
        questionsEffectBg.setPosition(100, size.height / 2 + 30 );
        questionsEffectBg.setAnchorPoint(cc.p(0, 1));
        questionsEffectBg.setContentSize(cc.size(250, 50));
        this.addChild(questionsEffectBg);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(24);
        var questionsLabel = new cc.MenuItemFont("常见问题");
        questionsLabel.setEnabled(false);
        questionsLabel.attr({x:65, y: 28});
        questionsLabel.setColor(cc.color.YELLOW);
        questionsEffectBg.addChild(questionsLabel);

        var questionsNormal = new cc.Sprite("#jianou.png");
        questionsNormal.attr({scale:0.9});
        var questionsSelected = new cc.Sprite("#jianou.png");
        questionsSelected.attr({scale:1});
        var questionsDisabled = new cc.Sprite("#jianou.png");
        var questionsButton = new cc.MenuItemSprite(questionsNormal, questionsSelected, questionsDisabled, this.onQuestionsCallback, this);
        var questionsMenu = new cc.Menu(questionsButton);
        questionsMenu.attr({x:150, y: 28});
        questionsEffectBg.addChild(questionsMenu);

        // game vibration setting items.
        var vibrationEffectBg = new cc.Scale9Sprite("mianban_01.png", cc.rect(17, 14, 27, 26));
        vibrationEffectBg.setPosition(440, size.height / 2 + 30);
        vibrationEffectBg.setAnchorPoint(cc.p(0, 1));
        vibrationEffectBg.setContentSize(cc.size(250, 50));
        this.addChild(vibrationEffectBg);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(24);
        var vibrationEffectLabel = new cc.MenuItemFont("游戏振动");
        vibrationEffectLabel.setEnabled(false);
        vibrationEffectLabel.setColor(cc.color.YELLOW);
        vibrationEffectLabel.attr({x:65, y: 28});
        vibrationEffectBg.addChild(vibrationEffectLabel);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);
        var vibrationEffectButton = new cc.MenuItemToggle(
            new cc.MenuItemFont("On"),
            new cc.MenuItemFont("Off")
        );
        vibrationEffectButton.setCallback(this.onSoundControl );
        var vibrationEffectState = ZGZ.VIBRATION_EFFECT ? 0 : 1;
        vibrationEffectButton.setSelectedIndex(vibrationEffectState);
        var vibrationEffectMenu = new cc.Menu(vibrationEffectButton);
        vibrationEffectMenu.attr({x:150, y: 28});
        vibrationEffectBg.addChild(vibrationEffectMenu);

        // feedback setting items
        var feedbackEffectBg = new cc.Scale9Sprite("mianban_01.png", cc.rect(17, 14, 27, 26));
        feedbackEffectBg.setPosition(100, size.height / 2 - 40 );
        feedbackEffectBg.setAnchorPoint(cc.p(0, 1));
        feedbackEffectBg.setContentSize(cc.size(250, 50));
        this.addChild(feedbackEffectBg);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(24);
        var feedbackLabel = new cc.MenuItemFont("反馈");
        feedbackLabel.setEnabled(false);
        feedbackLabel.attr({x:40, y: 28});
        feedbackLabel.setColor(cc.color.YELLOW);
        feedbackEffectBg.addChild(feedbackLabel);

        var feedbackNormal = new cc.Sprite("#jianou.png");
        feedbackNormal.attr({scale:0.9});
        var feedbackSelected = new cc.Sprite("#jianou.png");
        feedbackSelected.attr({scale:1});
        var feedbackDisabled = new cc.Sprite("#jianou.png");
        var feedbackButton = new cc.MenuItemSprite(feedbackNormal, feedbackSelected, feedbackDisabled, this.onQuestionsCallback, this);
        var feedbackMenu = new cc.Menu(feedbackButton);
        feedbackMenu.attr({x:150, y: 28});
        feedbackEffectBg.addChild(feedbackMenu);

        // about setting items
        var aboutEffectBg = new cc.Scale9Sprite("mianban_01.png", cc.rect(17, 14, 27, 26));
        aboutEffectBg.setPosition(440, size.height / 2 - 40 );
        aboutEffectBg.setAnchorPoint(cc.p(0, 1));
        aboutEffectBg.setContentSize(cc.size(250, 50));
        this.addChild(aboutEffectBg);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(24);
        var aboutLabel = new cc.MenuItemFont("关于");
        aboutLabel.setEnabled(false);
        aboutLabel.attr({x:40, y: 28});
        aboutLabel.setColor(cc.color.YELLOW);
        aboutEffectBg.addChild(aboutLabel);

        var aboutNormal = new cc.Sprite("#jianou.png");
        aboutNormal.attr({scale:0.9});
        var aboutSelected = new cc.Sprite("#jianou.png");
        aboutSelected.attr({scale:1});
        var aboutDisabled = new cc.Sprite("#jianou.png");
        var aboutButton = new cc.MenuItemSprite(aboutNormal, aboutSelected, aboutDisabled, this.onQuestionsCallback, this);
        var aboutMenu = new cc.Menu(aboutButton);
        aboutMenu.attr({x:150, y: 28});
        aboutEffectBg.addChild(aboutMenu);

        // switchUser setting items
        var switchUserEffectBg = new cc.Scale9Sprite("mianban_01.png", cc.rect(17, 14, 27, 26));
        switchUserEffectBg.setPosition(100, size.height / 2 - 110 );
        switchUserEffectBg.setAnchorPoint(cc.p(0, 1));
        switchUserEffectBg.setContentSize(cc.size(250, 50));
        this.addChild(switchUserEffectBg);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(24);
        var switchUserLabel = new cc.MenuItemFont("某某某");
        switchUserLabel.setEnabled(false);
        switchUserLabel.attr({x:50, y: 28});
        switchUserLabel.setColor(cc.color.YELLOW);
        switchUserEffectBg.addChild(switchUserLabel);

        var switchUserNormal = new cc.Sprite("#jianou.png");
        switchUserNormal.attr({scale:0.9});
        var switchUserSelected = new cc.Sprite("#jianou.png");
        switchUserSelected.attr({scale:1});
        var switchUserDisabled = new cc.Sprite("#jianou.png");
        var switchUserButton = new cc.MenuItemSprite(switchUserNormal, switchUserSelected, switchUserDisabled, this.onQuestionsCallback, this);
        var switchUserMenu = new cc.Menu(switchUserButton);
        switchUserMenu.attr({x:150, y: 28});
        switchUserEffectBg.addChild(switchUserMenu);

        // version info and upgrade items
        var versionInfoEffectBg = new cc.Scale9Sprite("mianban_01.png", cc.rect(17, 14, 27, 26));
        versionInfoEffectBg.setPosition(440, size.height / 2 - 110 );
        versionInfoEffectBg.setAnchorPoint(cc.p(0, 1));
        versionInfoEffectBg.setContentSize(cc.size(250, 50));
        this.addChild(versionInfoEffectBg);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(24);
        var versionInfoLabel = new cc.MenuItemFont("当前版本");
        versionInfoLabel.setEnabled(false);
        versionInfoLabel.attr({x:60, y: 28});
        versionInfoLabel.setColor(cc.color.YELLOW);
        versionInfoEffectBg.addChild(versionInfoLabel);

        var versionInfoNormal = new cc.Sprite("#jianou.png");
        versionInfoNormal.attr({scale:0.9});
        var versionInfoSelected = new cc.Sprite("#jianou.png");
        versionInfoSelected.attr({scale:1});
        var versionInfoDisabled = new cc.Sprite("#jianou.png");
        var versionInfoButton = new cc.MenuItemSprite(versionInfoNormal, versionInfoSelected, versionInfoDisabled, this.onQuestionsCallback, this);
        var versionInfoMenu = new cc.Menu(versionInfoButton);
        versionInfoMenu.attr({x:150, y: 28});
        versionInfoEffectBg.addChild(versionInfoMenu);

//        cc.MenuItemFont.setFontName("Arial");
//        cc.MenuItemFont.setFontSize(26);
//        var feedbackLabel = new cc.MenuItemFont("反馈");
//        feedbackLabel.setEnabled(false);
//        feedbackLabel.setColor(cc.color.YELLOW);
//
//        var feedbackNormal = new cc.Sprite("#jianou.png");
//        feedbackNormal.attr({scale:0.9});
//        var feedbackSelected = new cc.Sprite("#jianou.png");
//        feedbackSelected.attr({scale:1});
//        var feedbackDisabled = new cc.Sprite("#jianou.png");
//        var feedbackButton = new cc.MenuItemSprite(feedbackNormal, feedbackSelected, feedbackDisabled, this.onFeedbackCallback, this);


//        var SettingMenu = new cc.Menu(
//            musicLabel, musicButton, questions, questionsButton,
//            soundEffectLabel, soundEffectButton, feedbackLabel, feedbackButton);
//        SettingMenu.alignItemsInColumns(4,4,1,1);



        //this.addChild(SettingMenu);

//        var help = new cc.LabelTTF("大同扎投子游戏说明", "Arial", 21, 10 );
//        help.attr({
//            x: 200,
//            y: size.height / 2,
//            anchorX: 0.5,
//            anchorY: 0.5
//        });
//        help.setColor(cc.color.YELLOW);
//        this.addChild(help);



    },

    /**
     * Return to previous scene,
     * @param pSender
     */
    onBackCallback:function (pSender) {
        var scene = new IndexScene();
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },

    /**
     * Forward to QA scene
     * @param pSender
     */
    onQuestionsCallback:function (pSender) {

    },

    /**
     * Forward to feedback scene
     * @param pSender
     */
    onFeedbackCallback:function (pSender) {

    }

});