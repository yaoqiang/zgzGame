var ProfileScene = cc.Scene.extend({
    ctor: function (args) {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.profile_plist);

        this.profileTabLayer = new ProfileTabLayer({lobbyId: args.lobbyId, callback: this.onTabChange});
        this.addChild(this.profileTabLayer, 9);

        this.selected = 0;
        this.layer = new ProfileLayer({player: args.player});
        this.addChild(this.layer);

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

    onTabChange: function (index) {
        var scene = cc.director.getRunningScene();
        if (scene.selected == index) return;
        if (scene.layer) {
            scene.layer.removeFromParent(true);
            scene.layer = null;
        }

        scene.selected = index;

        if (scene.selected == 0) {
            scene.layer = new ProfileLayer();
        }

        if (scene.selected == 1) {
            scene.layer = new BagLayer();
        }

        scene.addChild(scene.layer);


    },


    onExit: function () {
        this._super();
        //
        cc.eventManager.removeListener(this.keyboardListener);
    }

});


var ProfileLayer = cc.Layer.extend({
    ctor: function(args) {
        this._super();

        this.player = {};

        this.player.nickName = args.player.nickName;
        this.player.gender = args.player.gender || 'MALE';
        this.player.avatar = args.player.avatar;
        this.player.summary = args.player.summary;
        this.player.winNr = args.player.winNr;
        this.player.tieNr = args.player.tieNr;
        this.player.loseNr = args.player.loseNr;
        this.player.gold = args.player.gold;
        this.player.fragment = args.player.fragment;
        this.player.meetingTimes = args.player.meetingTimes;

        var winSize = cc.director.getWinSize();

        //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width/2, winSize.height/2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        //
        var avatarBg = new cc.Sprite("#hallinfo_kuang.png");
        avatarBg.setPosition(200, winSize.height/2 + 50);
        avatarBg.scale = ZGZ.SCALE * 0.3;
        this.addChild(avatarBg);

        //
        var avatar = new cc.MenuItemSprite(
            new cc.Sprite(utils.getAvatar(this.player.avatar)),
            new cc.Sprite(utils.getAvatar(this.player.avatar)),
            this.profile,
            this
        );

        var avatarMenu = new cc.Menu(avatar);
        avatarMenu.setPosition(winSize.width/2 - 200, winSize.height/2 + 50)
        this.addChild(avatarMenu, 1);


        var avatarEditNormal = new cc.Sprite("#common_btn_4.png");
        var avatarEditSelected = new cc.Sprite("#common_btn_4.png");
        var avatarEditDisabled = new cc.Sprite("#common_btn_4.png");
        var avatarEditButton = new cc.MenuItemSprite(avatarEditNormal, avatarEditSelected, avatarEditDisabled, this.onSelectAvatar, this);
        //
        //avatarEditButton.scale = 0.7
        //
        //var avatarEditButtonMenu = new cc.Menu(avatarEditButton);
        //avatarEditButtonMenu.setPosition(winSize.width/2 - 150, winSize.height/2 - 8);
        //this.addChild(avatarEditButtonMenu);

        //var butSize  = avatarEditButton.getContentSize();
        var avatarEditStr = new cc.LabelTTF("点击换头像", "Arial", 14);
        avatarEditStr.color = cc.color.WHITE;
        avatarEditStr.setPosition(winSize.width/2 - 200, winSize.height/2 - 5);
        this.addChild(avatarEditStr);



        //
        var modifyBg = new cc.Sprite("#deep_bg_big.png");

        modifyBg.setPosition(winSize.width/2 + 150, winSize.height/2 + 63);
        modifyBg.scaleY = 1.3
        this.addChild(modifyBg);

        //
        var nickNameLabel = new cc.LabelTTF("昵  称:", "AmericanTypewriter", 18);
        nickNameLabel.setPosition(winSize.width/2 - 60, winSize.height/2 + 80);
        nickNameLabel.color =  cc.color.WHITE;


        var blockSize = cc.size(180, 30);
        this.nickNameValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("login_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.nickNameValue.setString(this.player.nickName);
        this.nickNameValue.setFontColor(cc.color.BLACK);
        this.nickNameValue.setPosition(winSize.width/2 + 100, winSize.height/2 + 80);
        this.nickNameValue.color =  cc.color.WHITE;
        this.nickNameValue.setMaxLength(6);
        this.addChild(this.nickNameValue);


        this.addChild(nickNameLabel);

        //
        var genderLabel = new cc.LabelTTF("性  别:", "AmericanTypewriter", 18);
        genderLabel.setPosition(winSize.width/2 - 60, winSize.height/2 + 40);
        genderLabel.color =  cc.color.WHITE;
        this.addChild(genderLabel);


        var maleLabel = new cc.LabelTTF("男", "AmericanTypewriter", 16);
        maleLabel.setPosition(winSize.width/2 + 20, winSize.height/2 + 40);
        maleLabel.color =  cc.color.WHITE;
        this.addChild(maleLabel);


        var femaleLabel = new cc.LabelTTF("女", "AmericanTypewriter", 16);
        femaleLabel.setPosition(winSize.width/2 + 100, winSize.height/2 + 40);
        femaleLabel.color =  cc.color.WHITE;
        this.addChild(femaleLabel);

        //
        this.initGenderCheckbox();

        //summary
        var summaryLabel = new cc.LabelTTF("简  介:", "AmericanTypewriter", 18);
        summaryLabel.setPosition(winSize.width/2 - 60, winSize.height/2);
        summaryLabel.color =  cc.color.WHITE;


        var blockSize = cc.size(180, 30);
        this.summaryValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("login_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.summaryValue.setString(this.player.summary);
        this.summaryValue.setFontColor(cc.color.BLACK);
        this.summaryValue.setPosition(winSize.width/2 + 100, winSize.height/2);
        this.summaryValue.color =  cc.color.WHITE;
        this.summaryValue.setMaxLength(10);
        this.addChild(this.summaryValue);


        this.addChild(summaryLabel);

        //update button;
        //
        this.updateNormal = new cc.Sprite("#common_btn_5.png");
        this.updateSelected = new cc.Sprite("#common_btn_5.png");
        this.updateDisabled = new cc.Sprite("#common_btn_5.png");
        this.updateButton = new cc.MenuItemSprite(this.updateNormal, this.updateSelected, this.updateDisabled, this.updateProfile, this);
        this.updateButton.scale = 0.8;
        var menuItem = new cc.Menu(this.updateButton);
        menuItem.setPosition(winSize.width/2 + 300, winSize.height/2 + 40);
        this.addChild(menuItem, 2);

        var butSize  = this.updateButton.getContentSize();
        var updateLabel = new cc.LabelTTF("修改", "Arial", 22);
        updateLabel.setPosition(butSize.width/2, butSize.height/2);
        this.updateButton.addChild(updateLabel);


        //
        var goldLabel = new cc.LabelTTF("金  币:", "AmericanTypewriter", 18);
        goldLabel.setPosition(winSize.width/2 - 60, winSize.height/2 - 40);
        goldLabel.color =  cc.color.WHITE;

        this.addChild(goldLabel);

        var goldIcon = new cc.Sprite("#common_icon_coins_1.png");
        goldIcon.setPosition(winSize.width/2 + 10, winSize.height/2 - 40);
        goldIcon.scale = 0.4;
        goldIcon.setAnchorPoint(0, 0.5);
        this.addChild(goldIcon);

        var goldValue = new cc.LabelTTF(zgzNumeral(this.player.gold).format('0,0'), "AmericanTypewriter", 20);
        goldValue.setPosition(winSize.width/2 + 40, winSize.height/2 - 40);
        goldValue.color =  cc.color.YELLOW;
        goldValue.setAnchorPoint(0, 0.5);

        this.addChild(goldValue);


        //胜率
        var percentLabel = new cc.LabelTTF("胜  率:", "AmericanTypewriter", 18);
        percentLabel.setPosition(winSize.width/2 - 60, winSize.height/2 - 80);
        percentLabel.color =  cc.color.WHITE;

        this.addChild(percentLabel);

        var totalBattle = this.player.loseNr + this.player.winNr;

        var percentStr = utils.getPercent(this.player.winNr, totalBattle);

        var percentValue = new cc.LabelTTF(percentStr, "AmericanTypewriter", 18);
        percentValue.setPosition(winSize.width/2 + 10, winSize.height/2 - 80);
        percentValue.setAnchorPoint(0, 0.5);
        this.addChild(percentValue);

        //win
        var winNrLabel = new cc.LabelTTF("胜:", "AmericanTypewriter", 18);
        winNrLabel.setPosition(winSize.width/2 + 90, winSize.height/2 - 80);
        winNrLabel.color =  cc.color.WHITE;
        winNrLabel.setAnchorPoint(0, 0.5);
        this.addChild(winNrLabel);

        var winNrValueLabel = new cc.LabelTTF(this.player.winNr.toString(), "AmericanTypewriter", 18);
        winNrValueLabel.setPosition(winSize.width/2 + 120, winSize.height/2 - 80);
        winNrValueLabel.color =  cc.color.WHITE;
        winNrValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(winNrValueLabel);

        //tie
        var tieNrLabel = new cc.LabelTTF("平:", "AmericanTypewriter", 18);
        tieNrLabel.setPosition(winSize.width/2 + 170, winSize.height/2 - 80);
        tieNrLabel.color =  cc.color.WHITE;
        tieNrLabel.setAnchorPoint(0, 0.5);
        this.addChild(tieNrLabel);

        var tieNrValueLabel = new cc.LabelTTF(this.player.tieNr.toString(), "AmericanTypewriter", 18);
        tieNrValueLabel.setPosition(winSize.width/2 + 200, winSize.height/2 - 80);
        tieNrValueLabel.color =  cc.color.WHITE
        tieNrValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(tieNrValueLabel);

        //lose
        var loseNrLabel = new cc.LabelTTF("负:", "AmericanTypewriter", 18);
        loseNrLabel.setPosition(winSize.width/2 + 250, winSize.height/2 - 80);
        loseNrLabel.color =  cc.color.WHITE;
        loseNrLabel.setAnchorPoint(0, 0.5);
        this.addChild(loseNrLabel);

        var loseNrValueLabel = new cc.LabelTTF(this.player.loseNr.toString(), "AmericanTypewriter", 18);
        loseNrValueLabel.setPosition(winSize.width/2 + 280, winSize.height/2 - 80);
        loseNrValueLabel.color =  cc.color.WHITE;
        loseNrValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(loseNrValueLabel);



        //
        var meetingTimeLabel = new cc.LabelTTF("开  会:", "AmericanTypewriter", 18);
        meetingTimeLabel.setPosition(winSize.width/2 - 60, winSize.height/2 - 120);
        meetingTimeLabel.color =  cc.color.WHITE;

        this.addChild(meetingTimeLabel);

        var meetingTimeValueLabel = new cc.LabelTTF(this.player.meetingTimes.toString(), "AmericanTypewriter", 18);
        meetingTimeValueLabel.setPosition(winSize.width/2 + 10, winSize.height/2 - 120);
        meetingTimeValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(meetingTimeValueLabel);

        //
        var ingotLabel = new cc.LabelTTF("元  宝:", "AmericanTypewriter", 18);
        ingotLabel.setPosition(winSize.width/2 - 60, winSize.height/2 - 160);
        ingotLabel.color =  cc.color.WHITE;

        this.addChild(ingotLabel);

        var ingotIcon = new cc.Sprite("#common_icon_yuanbao.png");
        ingotIcon.setPosition(winSize.width/2 + 10, winSize.height/2 - 160);
        ingotIcon.scale = 0.8;
        ingotIcon.setAnchorPoint(0, 0.5);
        this.addChild(ingotIcon);

        var ingotValue = new cc.LabelTTF(this.player.fragment.toString(), "AmericanTypewriter", 20);
        ingotValue.setPosition(winSize.width/2 + 40, winSize.height/2 - 160);
        ingotValue.color =  cc.color.YELLOW;
        ingotValue.setAnchorPoint(0, 0.5);

        this.addChild(ingotValue);
    },

    updateProfile: function () {

        var nickName = this.nickNameValue.getString();
        var summary = this.summaryValue.getString();

        UniversalController.updateProfile(nickName, this.player.gender, this.player.avatar, summary);
    },

    updateAvatar: function () {

    },

    validator: function () {
        
    },

    onGenderChecked: function (gender) {
        this.player.gender = gender;
        if (gender == 'MALE') {
            this.checkBoxMale.selected = true;
            this.checkBoxFemale.selected = false;
        }
        else {
            this.checkBoxMale.selected = false;
            this.checkBoxFemale.selected = true;
        }

    },
    
    onMaleChecked: function () {
        this.onGenderChecked('MALE');
    },
    
    onFemaleChecked: function () {
        this.onGenderChecked('FEMALE');
    },

    /**
     *
     */
    initGenderCheckbox: function () {
        var winSize = cc.director.getWinSize();

        this.checkBoxMale = new ccui.CheckBox();
        this.checkBoxMale.setTouchEnabled(true);
        this.checkBoxMale.loadTextures("common_checkbox_1.png",
            "common_checkbox_2.png",
            "common_checkbox_2.png",
            "common_checkbox_1.png",
            "common_checkbox_1.png",
            ccui.Widget.PLIST_TEXTURE);

        this.checkBoxMale.addEventListener(this.onMaleChecked, this);
        this.checkBoxMale.scale = 0.7;
        this.checkBoxMale.selected = this.player.gender == 'MALE' ? true : false;
        this.checkBoxMale.setPosition(winSize.width/2 + 50, winSize.height/2 + 40);
        this.addChild(this.checkBoxMale);

        this.checkBoxFemale = new ccui.CheckBox();
        this.checkBoxFemale.setTouchEnabled(true);
        this.checkBoxFemale.loadTextures("common_checkbox_1.png",
            "common_checkbox_2.png",
            "common_checkbox_2.png",
            "common_checkbox_1.png",
            "common_checkbox_1.png",
            ccui.Widget.PLIST_TEXTURE);

        this.checkBoxFemale.addEventListener(this.onFemaleChecked, this);
        this.checkBoxFemale.scale = 0.7;
        this.checkBoxFemale.selected = this.player.gender == 'FEMALE' ? true : false;
        this.checkBoxFemale.setPosition(winSize.width/2 + 130, winSize.height/2 + 40);
        this.addChild(this.checkBoxFemale);


    }


});

var BagLayer = cc.Layer.extend({
    ctor: function() {
        this._super();


        var winSize = cc.director.getWinSize();

        //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width/2, winSize.height/2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        var itemLabel = new cc.LabelTTF("即将开放, 敬请期待!", "Arial", 34);
        itemLabel.setPosition(winSize.width/2, winSize.height/2);
        itemLabel.color =  cc.color.YELLOW;
        this.addChild(itemLabel);

    }
});