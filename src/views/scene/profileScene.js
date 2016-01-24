var ProfileScene = cc.Scene.extend({
    ctor: function (args) {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.profile_plist);

        this.profileTabLayer = new ProfileTabLayer({lobby: args.lobby, callback: this.onTabChange});
        this.addChild(this.profileTabLayer, 9);

        this.selected = 0;
        this.layer = new ProfileLayer();
        this.addChild(this.layer);
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

    }

});


var ProfileLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        this.nickName = gPlayer.nickName;
        this.gender = gPlayer.gender || 'MALE';
        this.avatar = gPlayer.avatar;

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
            new cc.Sprite(utils.getAvatar(gPlayer.avatar)),
            new cc.Sprite(utils.getAvatar(gPlayer.avatar)),
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
        modifyBg.scaleY = 0.75
        this.addChild(modifyBg);

        //
        var nickNameLabel = new cc.LabelTTF("昵  称:", "AmericanTypewriter", 18);
        nickNameLabel.setPosition(winSize.width/2 - 60, winSize.height/2 + 80);
        nickNameLabel.color =  cc.color.WHITE;


        var blockSize = cc.size(180, 30);
        this.nickNameValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("login_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.nickNameValue.setString(gPlayer.nickName);
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

        //update button;
        //
        this.updateNormal = new cc.Sprite("#common_btn_5.png");
        this.updateSelected = new cc.Sprite("#common_btn_5.png");
        this.updateDisabled = new cc.Sprite("#common_btn_5.png");
        this.updateButton = new cc.MenuItemSprite(this.updateNormal, this.updateSelected, this.updateDisabled, this.updateProfile, this);
        this.updateButton.scale = 0.8;
        var menuItem = new cc.Menu(this.updateButton);
        menuItem.setPosition(winSize.width/2 + 300, winSize.height/2 + 60);
        this.addChild(menuItem, 2);

        var butSize  = this.updateButton.getContentSize();
        var updateLabel = new cc.LabelTTF("修改", "Arial", 22);
        updateLabel.setPosition(butSize.width/2, butSize.height/2);
        this.updateButton.addChild(updateLabel);


        //
        var goldLabel = new cc.LabelTTF("金  币:", "AmericanTypewriter", 18);
        goldLabel.setPosition(winSize.width/2 - 60, winSize.height/2);
        goldLabel.color =  cc.color.WHITE;

        this.addChild(goldLabel);

        var goldIcon = new cc.Sprite("#common_icon_coins_1.png");
        goldIcon.setPosition(winSize.width/2 + 10, winSize.height/2);
        goldIcon.scale = 0.4;
        goldIcon.setAnchorPoint(0, 0.5);
        this.addChild(goldIcon);

        var goldValue = new cc.LabelTTF(zgzNumeral(gPlayer.gold).format('0,0'), "AmericanTypewriter", 20);
        goldValue.setPosition(winSize.width/2 + 40, winSize.height/2);
        goldValue.color =  cc.color.YELLOW;
        goldValue.setAnchorPoint(0, 0.5);

        this.addChild(goldValue);


        //胜率
        var percentLabel = new cc.LabelTTF("胜  率:", "AmericanTypewriter", 18);
        percentLabel.setPosition(winSize.width/2 - 60, winSize.height/2 - 40);
        percentLabel.color =  cc.color.WHITE;

        this.addChild(percentLabel);


        var totalBattle = gPlayer.loseNr + gPlayer.winNr;

        var percentStr = (gPlayer.winNr / totalBattle).toFixed(2) * 100;

        if (totalBattle == 0) percentStr = "0"

        var percentValue = new cc.LabelTTF(percentStr + "%", "AmericanTypewriter", 18);
        percentValue.setPosition(winSize.width/2 + 10, winSize.height/2 - 40);
        percentValue.setAnchorPoint(0, 0.5);
        this.addChild(percentValue);

        //win
        var winNrLabel = new cc.LabelTTF("胜:", "AmericanTypewriter", 18);
        winNrLabel.setPosition(winSize.width/2 + 90, winSize.height/2 - 40);
        winNrLabel.color =  cc.color.WHITE;
        winNrLabel.setAnchorPoint(0, 0.5);
        this.addChild(winNrLabel);

        var winNrValueLabel = new cc.LabelTTF(gPlayer.winNr.toString(), "AmericanTypewriter", 18);
        winNrValueLabel.setPosition(winSize.width/2 + 120, winSize.height/2 - 40);
        winNrValueLabel.color =  cc.color.WHITE;
        winNrValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(winNrValueLabel);

        //tie
        var tieNrLabel = new cc.LabelTTF("平:", "AmericanTypewriter", 18);
        tieNrLabel.setPosition(winSize.width/2 + 170, winSize.height/2 - 40);
        tieNrLabel.color =  cc.color.WHITE;
        tieNrLabel.setAnchorPoint(0, 0.5);
        this.addChild(tieNrLabel);

        var tieNrValueLabel = new cc.LabelTTF(gPlayer.tieNr.toString(), "AmericanTypewriter", 18);
        tieNrValueLabel.setPosition(winSize.width/2 + 200, winSize.height/2 - 40);
        tieNrValueLabel.color =  cc.color.WHITE
        tieNrValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(tieNrValueLabel);

        //lose
        var loseNrLabel = new cc.LabelTTF("负:", "AmericanTypewriter", 18);
        loseNrLabel.setPosition(winSize.width/2 + 250, winSize.height/2 - 40);
        loseNrLabel.color =  cc.color.WHITE;
        loseNrLabel.setAnchorPoint(0, 0.5);
        this.addChild(loseNrLabel);

        var loseNrValueLabel = new cc.LabelTTF(gPlayer.loseNr.toString(), "AmericanTypewriter", 18);
        loseNrValueLabel.setPosition(winSize.width/2 + 280, winSize.height/2 - 40);
        loseNrValueLabel.color =  cc.color.WHITE;
        loseNrValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(loseNrValueLabel);



        //
        var meetingTimeLabel = new cc.LabelTTF("开  会:", "AmericanTypewriter", 18);
        meetingTimeLabel.setPosition(winSize.width/2 - 60, winSize.height/2 - 80);
        meetingTimeLabel.color =  cc.color.WHITE;

        this.addChild(meetingTimeLabel);

        var meetingTimeValueLabel = new cc.LabelTTF(gPlayer.meetingTimes.toString(), "AmericanTypewriter", 18);
        meetingTimeValueLabel.setPosition(winSize.width/2 + 10, winSize.height/2 - 80);
        meetingTimeValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(meetingTimeValueLabel);

        //
        var ingotLabel = new cc.LabelTTF("元  宝:", "AmericanTypewriter", 18);
        ingotLabel.setPosition(winSize.width/2 - 60, winSize.height/2 - 120);
        ingotLabel.color =  cc.color.WHITE;

        this.addChild(ingotLabel);

        var ingotIcon = new cc.Sprite("#common_icon_yuanbao.png");
        ingotIcon.setPosition(winSize.width/2 + 10, winSize.height/2 - 120);
        ingotIcon.scale = 0.8;
        ingotIcon.setAnchorPoint(0, 0.5);
        this.addChild(ingotIcon);

        var ingotValue = new cc.LabelTTF(gPlayer.fragment.toString(), "AmericanTypewriter", 20);
        ingotValue.setPosition(winSize.width/2 + 40, winSize.height/2 - 120);
        ingotValue.color =  cc.color.YELLOW;
        ingotValue.setAnchorPoint(0, 0.5);

        this.addChild(ingotValue);
    },

    updateProfile: function () {

        var nickName = this.nickNameValue.getString();

        UniversalController.updateProfile(nickName, this.gender, this.avatar);
    },

    updateAvatar: function () {

    },

    validator: function () {
        
    },

    onGenderChecked: function (gender) {
        if (this.gender == gender) return;

        this.gender = gender;

        this.initGenderCheckbox();
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

        if (this.maleButton) {
            this.maleButton.removeFromParent(true);
            this.maleButton = null;
        }
        if (this.maleMenu) {
            this.maleMenu.removeFromParent(true);
            this.maleMenu = null;
        }
        if (this.femaleButton) {
            this.femaleButton.removeFromParent(true);
            this.femaleButton = null;
        }
        if (this.femaleMenu) {
            this.femaleMenu.removeFromParent(true);
            this.femaleMenu = null;
        }

        if (this.uncheckedNormal) {
            this.uncheckedNormal.removeFromParent(true);
            this.uncheckedNormal = null;
        }

        if (this.uncheckedSelected) {
            this.uncheckedSelected.removeFromParent(true);
            this.uncheckedSelected = null;
        }

        if (this.uncheckedDisabled) {
            this.uncheckedDisabled.removeFromParent(true);
            this.uncheckedDisabled = null;
        }

        if (this.checkedNormal) {
            this.checkedNormal.removeFromParent(true);
            this.checkedNormal = null;
        }

        if (this.checkedSelected) {
            this.checkedSelected.removeFromParent(true);
            this.checkedSelected = null;
        }

        if (this.checkedDisabled) {
            this.checkedDisabled.removeFromParent(true);
            this.checkedDisabled = null;
        }

        this.uncheckedNormal = new cc.Sprite("#common_checkbox_1.png");
        this.uncheckedSelected = new cc.Sprite("#common_checkbox_1.png");
        this.uncheckedDisabled = new cc.Sprite("#common_checkbox_1.png");
        this.checkedNormal = new cc.Sprite("#common_checkbox_2.png");
        this.checkedSelected = new cc.Sprite("#common_checkbox_2.png");
        this.checkedDisabled = new cc.Sprite("#common_checkbox_2.png");


        this.maleButton = new cc.MenuItemSprite(this.gender == 'MALE' ? this.checkedNormal : this.uncheckedNormal, this.gender == 'MALE' ? this.checkedSelected : this.uncheckedSelected, this.gender == 'MALE' ? this.checkedDisabled : this.uncheckedDisabled, this.onMaleChecked, this);
        this.maleButton.scale = 0.7;


        this.maleMenu = new cc.Menu(this.maleButton);
        this.maleMenu.setPosition(winSize.width/2 + 50, winSize.height/2 + 40)
        this.addChild(this.maleMenu);
        //
        this.femaleButton = new cc.MenuItemSprite(this.gender == 'FEMALE' ? this.checkedNormal : this.uncheckedNormal, this.gender == 'FEMALE' ? this.checkedSelected : this.uncheckedSelected, this.gender == 'FEMALE' ? this.checkedDisabled : this.uncheckedDisabled, this.onFemaleChecked, this);
        this.femaleButton.scale = 0.7;

        this.femaleMenu = new cc.Menu(this.femaleButton);
        this.femaleMenu.setPosition(winSize.width/2 + 130, winSize.height/2 + 40);

        this.addChild(this.femaleMenu);
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