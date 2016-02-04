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
            onKeyPressed: function (keyCode, event) {
            },
            onKeyReleased: function (keyCode, event) {
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
    ctor: function (args) {
        this._super();

        //init state;
        this.isSending = false;
        this.m_nTime = 120;


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
        this.player.mobile = args.player.mobile;

        var winSize = cc.director.getWinSize();

        //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width / 2, winSize.height / 2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        //
        var avatarBg = new cc.Sprite("#hallinfo_kuang.png");
        avatarBg.setPosition(160, winSize.height / 2 + 50);
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
        avatarMenu.setPosition(winSize.width / 2 - 240, winSize.height / 2 + 50)
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
        avatarEditStr.setPosition(winSize.width / 2 - 240, winSize.height / 2 - 5);
        this.addChild(avatarEditStr);

        //绑定手机
        console.log('this.player.mobile = ', this.player.mobile);

        console.log(this.player.mobile == '' || this.player.mobile == undefined);
        if (this.player.mobile == '' || this.player.mobile == undefined) {
            this.bindingMobileNormal = new cc.Sprite("#common_btn_5.png");
            this.bindingMobileSelected = new cc.Sprite("#common_btn_5.png");
            this.bindingMobileDisabled = new cc.Sprite("#common_btn_5.png");
            this.bindingMobileButton = new cc.MenuItemSprite(this.bindingMobileNormal, this.bindingMobileSelected, this.bindingMobileDisabled, this.bindingMobileProfile, this);
            this.bindingMobileButton.scale = 0.65;
            var menuItem = new cc.Menu(this.bindingMobileButton);
            menuItem.setPosition(winSize.width / 2 - 240, winSize.height / 2 - 50);
            this.addChild(menuItem, 2);

            var butSize = this.bindingMobileButton.getContentSize();
            var bindingMobileLabel = new cc.LabelTTF("绑定手机", "Arial", 24);
            bindingMobileLabel.setPosition(butSize.width / 2, butSize.height / 2);
            this.bindingMobileButton.addChild(bindingMobileLabel);

            var bindingMobileTipLabel = new cc.LabelTTF("绑定手机可用手机号登录", "Arial", 12);
            bindingMobileTipLabel.color = cc.color.RED;
            bindingMobileTipLabel.setPosition(winSize.width / 2 - 240, winSize.height / 2 - 100);
            this.addChild(bindingMobileTipLabel, 10);

        }
        else {
            var mobileStr = new cc.LabelTTF("账号:" + this.player.mobile, "Arial", 16);
            mobileStr.color = cc.color.WHITE;
            mobileStr.setPosition(winSize.width / 2 - 240, winSize.height / 2 - 40);
            this.addChild(mobileStr);
        }


        //
        var modifyBg = new cc.Sprite("#deep_bg_big.png");

        modifyBg.setPosition(winSize.width / 2 + 100, winSize.height / 2 + 63);
        modifyBg.scaleY = 1.3
        this.addChild(modifyBg);

        //
        var nickNameLabel = new cc.LabelTTF("昵  称:", "AmericanTypewriter", 18);
        nickNameLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2 + 80);
        nickNameLabel.color = cc.color.WHITE;


        var blockSize = cc.size(180, 30);
        this.nickNameValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("login_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.nickNameValue.setString(this.player.nickName);
        this.nickNameValue.setFontColor(cc.color.BLACK);
        this.nickNameValue.setPosition(winSize.width / 2 + 50, winSize.height / 2 + 80);
        this.nickNameValue.color = cc.color.WHITE;
        this.nickNameValue.setMaxLength(6);
        this.addChild(this.nickNameValue);


        this.addChild(nickNameLabel);

        //
        var genderLabel = new cc.LabelTTF("性  别:", "AmericanTypewriter", 18);
        genderLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2 + 40);
        genderLabel.color = cc.color.WHITE;
        this.addChild(genderLabel);


        var maleLabel = new cc.LabelTTF("男", "AmericanTypewriter", 16);
        maleLabel.setPosition(winSize.width / 2 - 30, winSize.height / 2 + 40);
        maleLabel.color = cc.color.WHITE;
        this.addChild(maleLabel);


        var femaleLabel = new cc.LabelTTF("女", "AmericanTypewriter", 16);
        femaleLabel.setPosition(winSize.width / 2 + 50, winSize.height / 2 + 40);
        femaleLabel.color = cc.color.WHITE;
        this.addChild(femaleLabel);

        //
        this.initGenderCheckbox();

        //summary
        var summaryLabel = new cc.LabelTTF("简  介:", "AmericanTypewriter", 18);
        summaryLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2);
        summaryLabel.color = cc.color.WHITE;


        var blockSize = cc.size(180, 30);
        this.summaryValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("login_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.summaryValue.setString(this.player.summary);
        this.summaryValue.setFontColor(cc.color.BLACK);
        this.summaryValue.setPosition(winSize.width / 2 + 50, winSize.height / 2);
        this.summaryValue.color = cc.color.WHITE;
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
        menuItem.setPosition(winSize.width / 2 + 250, winSize.height / 2 + 40);
        this.addChild(menuItem, 2);

        var butSize = this.updateButton.getContentSize();
        var updateLabel = new cc.LabelTTF("修改", "Arial", 22);
        updateLabel.setPosition(butSize.width / 2, butSize.height / 2);
        this.updateButton.addChild(updateLabel);


        //
        var goldLabel = new cc.LabelTTF("金  币:", "AmericanTypewriter", 18);
        goldLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2 - 40);
        goldLabel.color = cc.color.WHITE;

        this.addChild(goldLabel);

        var goldIcon = new cc.Sprite("#common_icon_coins_1.png");
        goldIcon.setPosition(winSize.width / 2 - 40, winSize.height / 2 - 40);
        goldIcon.scale = 0.4;
        goldIcon.setAnchorPoint(0, 0.5);
        this.addChild(goldIcon);

        var goldValue = new cc.LabelTTF(zgzNumeral(this.player.gold).format('0,0'), "AmericanTypewriter", 20);
        goldValue.setPosition(winSize.width / 2 - 10, winSize.height / 2 - 40);
        goldValue.color = cc.color.YELLOW;
        goldValue.setAnchorPoint(0, 0.5);

        this.addChild(goldValue);


        //胜率
        var percentLabel = new cc.LabelTTF("胜  率:", "AmericanTypewriter", 18);
        percentLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2 - 80);
        percentLabel.color = cc.color.WHITE;

        this.addChild(percentLabel);

        var totalBattle = this.player.loseNr + this.player.winNr;

        var percentStr = utils.getPercent(this.player.winNr, totalBattle);

        var percentValue = new cc.LabelTTF(percentStr, "AmericanTypewriter", 18);
        percentValue.setPosition(winSize.width / 2 - 40, winSize.height / 2 - 80);
        percentValue.setAnchorPoint(0, 0.5);
        this.addChild(percentValue);

        //win
        var winNrLabel = new cc.LabelTTF("胜:", "AmericanTypewriter", 18);
        winNrLabel.setPosition(winSize.width / 2 + 40, winSize.height / 2 - 80);
        winNrLabel.color = cc.color.WHITE;
        winNrLabel.setAnchorPoint(0, 0.5);
        this.addChild(winNrLabel);

        var winNrValueLabel = new cc.LabelTTF(this.player.winNr.toString(), "AmericanTypewriter", 18);
        winNrValueLabel.setPosition(winSize.width / 2 + 70, winSize.height / 2 - 80);
        winNrValueLabel.color = cc.color.WHITE;
        winNrValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(winNrValueLabel);

        //tie
        var tieNrLabel = new cc.LabelTTF("平:", "AmericanTypewriter", 18);
        tieNrLabel.setPosition(winSize.width / 2 + 120, winSize.height / 2 - 80);
        tieNrLabel.color = cc.color.WHITE;
        tieNrLabel.setAnchorPoint(0, 0.5);
        this.addChild(tieNrLabel);

        var tieNrValueLabel = new cc.LabelTTF(this.player.tieNr.toString(), "AmericanTypewriter", 18);
        tieNrValueLabel.setPosition(winSize.width / 2 + 150, winSize.height / 2 - 80);
        tieNrValueLabel.color = cc.color.WHITE
        tieNrValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(tieNrValueLabel);

        //lose
        var loseNrLabel = new cc.LabelTTF("负:", "AmericanTypewriter", 18);
        loseNrLabel.setPosition(winSize.width / 2 + 200, winSize.height / 2 - 80);
        loseNrLabel.color = cc.color.WHITE;
        loseNrLabel.setAnchorPoint(0, 0.5);
        this.addChild(loseNrLabel);

        var loseNrValueLabel = new cc.LabelTTF(this.player.loseNr.toString(), "AmericanTypewriter", 18);
        loseNrValueLabel.setPosition(winSize.width / 2 + 230, winSize.height / 2 - 80);
        loseNrValueLabel.color = cc.color.WHITE;
        loseNrValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(loseNrValueLabel);


        //
        var meetingTimeLabel = new cc.LabelTTF("开  会:", "AmericanTypewriter", 18);
        meetingTimeLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2 - 120);
        meetingTimeLabel.color = cc.color.WHITE;

        this.addChild(meetingTimeLabel);

        var meetingTimeValueLabel = new cc.LabelTTF(this.player.meetingTimes.toString(), "AmericanTypewriter", 18);
        meetingTimeValueLabel.setPosition(winSize.width / 2 - 40, winSize.height / 2 - 120);
        meetingTimeValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(meetingTimeValueLabel);

        //
        var ingotLabel = new cc.LabelTTF("元  宝:", "AmericanTypewriter", 18);
        ingotLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2 - 160);
        ingotLabel.color = cc.color.WHITE;

        this.addChild(ingotLabel);

        var ingotIcon = new cc.Sprite("#common_icon_yuanbao.png");
        ingotIcon.setPosition(winSize.width / 2 - 40, winSize.height / 2 - 160);
        ingotIcon.scale = 0.8;
        ingotIcon.setAnchorPoint(0, 0.5);
        this.addChild(ingotIcon);

        var ingotValue = new cc.LabelTTF(this.player.fragment.toString(), "AmericanTypewriter", 20);
        ingotValue.setPosition(winSize.width / 2 - 10, winSize.height / 2 - 160);
        ingotValue.color = cc.color.YELLOW;
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

    bindingMobileProfile: function () {
        this.bindingBox = new DialogSmall('绑定手机');

        var boxSize = this.bindingBox.bg.getBoundingBox();

        var mobileLabel = new cc.LabelTTF("手机号:", "AmericanTypewriter", 26);
        mobileLabel.setPosition(boxSize.width / 2 - 20, boxSize.height / 2 + 350);
        mobileLabel.color = cc.color.WHITE;
        mobileLabel.scale = 2;
        this.bindingBox.bg.addChild(mobileLabel);


        var blockSize = cc.size(370, 70);
        this.mobileValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.mobileValue.setPlaceHolder('请输入手机号');
        this.mobileValue.setFontColor(cc.color.BLACK);
        this.mobileValue.setPosition(boxSize.width / 2 + 300, boxSize.height / 2 + 350);
        this.mobileValue.color = cc.color.WHITE;
        this.mobileValue.setMaxLength(11);
        this.bindingBox.bg.addChild(this.mobileValue);

        //captcha
        this.sendCaptchaNormal = new cc.Sprite("#common_btn_4.png");
        this.sendCaptchaSelected = new cc.Sprite("#common_btn_4.png");
        this.sendCaptchaDisabled = new cc.Sprite("#common_btn_4.png");
        this.sendCaptchaButton = new cc.MenuItemSprite(this.sendCaptchaNormal, this.sendCaptchaSelected, this.sendCaptchaDisabled, this.sendCaptcha, this);
        this.sendCaptchaButton.scale = 2.2;
        var menuItem = new cc.Menu(this.sendCaptchaButton);
        menuItem.setPosition(boxSize.width / 2 + 600, boxSize.height / 2 + 350);
        this.bindingBox.bg.addChild(menuItem, 2);

        var butSize = this.sendCaptchaButton.getContentSize();
        this.sendCaptchaLabel = new cc.LabelTTF("发送验证码", "Arial", 18);
        this.sendCaptchaLabel.setPosition(butSize.width / 2, butSize.height / 2);
        this.sendCaptchaButton.addChild(this.sendCaptchaLabel);

        //验证码
        var captchaLabel = new cc.LabelTTF("验证码:", "AmericanTypewriter", 26);
        captchaLabel.setPosition(boxSize.width / 2 - 20, boxSize.height / 2 + 220);
        captchaLabel.color = cc.color.WHITE;
        captchaLabel.scale = 2;
        this.bindingBox.bg.addChild(captchaLabel);


        this.captchaValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.captchaValue.setPlaceHolder('请输入验证码');
        this.captchaValue.setFontColor(cc.color.BLACK);
        this.captchaValue.setPosition(boxSize.width / 2 + 300, boxSize.height / 2 + 220);
        this.captchaValue.color = cc.color.WHITE;
        this.captchaValue.setMaxLength(6);
        this.bindingBox.bg.addChild(this.captchaValue);

        //密码
        var passwordLabel = new cc.LabelTTF("密  码:", "AmericanTypewriter", 26);
        passwordLabel.setPosition(boxSize.width / 2 - 20, boxSize.height / 2 + 90);
        passwordLabel.color = cc.color.WHITE;
        passwordLabel.scale = 2;
        this.bindingBox.bg.addChild(passwordLabel);


        this.passwordValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.passwordValue.setPlaceHolder('请输入密码');
        this.passwordValue.setFontColor(cc.color.BLACK);
        this.passwordValue.setPosition(boxSize.width / 2 + 300, boxSize.height / 2 + 90);
        this.passwordValue.color = cc.color.WHITE;
        this.passwordValue.setMaxLength(11);
        this.bindingBox.bg.addChild(this.passwordValue);


        //确定
        this.okNormal = new cc.Sprite("#common_btn_hong.png");
        this.okSelected = new cc.Sprite("#common_btn_hong.png");
        this.okDisabled = new cc.Sprite("#common_btn_hong.png");
        this.okButton = new cc.MenuItemSprite(this.okNormal, this.okSelected, this.okDisabled, this.sendBinding, this);
        //this.okButton.scale = 2.3;
        var menuItem = new cc.Menu(this.okButton);
        menuItem.setPosition(boxSize.width / 2 + 300, boxSize.height / 2);
        this.bindingBox.bg.addChild(menuItem, 2);

        var butSize = this.okButton.getContentSize();
        this.okLabel = new cc.LabelTTF("确定", "Arial", 22);
        this.okLabel.setPosition(butSize.width / 2, butSize.height / 2);
        this.okButton.addChild(this.okLabel);

        this.addChild(this.bindingBox, 20);


    },

    validateMobile: function () {
        var mobile = this.mobileValue.getString();

        if (mobile == '') {
            prompt.fadeMiddle('请输入手机号');
            return false;
        }
        if (!utils.mobileValidate(mobile)) {
            prompt.fadeMiddle('您输入的手机号有误, 请检查');
            return false;
        }
        return true;
    },

    validateCaptcha: function () {
        var captcha = this.captchaValue.getString();

        if (captcha == '') {
            prompt.fadeMiddle('请输入验证码');
            return false;
        }

        return true;
    },

    validatePassword: function () {
        var password = this.passwordValue.getString();

        if (password == '') {
            prompt.fadeMiddle('请输入密码');
            return false;
        }

        return true;
    },

    sendCaptcha: function () {
        if (this.isSending) return;

        //
        if (!this.validateMobile()) return;

        this.isSending = true;

        this.schedule(this.updateTime, 1.0);

        UniversalController.sendBindingSMS(this.mobileValue.getString(), function (data) {
            if (data.code == RETURN_CODE.OK) {
                prompt.fadeMiddle('验证码已发送');
            } else {
                prompt.fadeMiddle(ERR_MESSAGE.getMessage(data.err));
            }
        });

    },


    sendBinding: function () {
        if (!this.validateMobile()) return;
        if (!this.validateCaptcha()) return;
        if (!this.validatePassword()) return;

        var self = this;

        var data = {mobile: this.mobileValue.getString(), password: this.passwordValue.getString(), captcha: this.captchaValue.getString()};
        UniversalController.bindingMobile(data, function (data) {
            if (data.code == RETURN_CODE.OK) {
                prompt.fadeMiddle('绑定成功, 您可以使用手机号登录');
                self.bindingBox.removeFromParent(true);
            }
            else {
                prompt.fadeMiddle(ERR_MESSAGE.getMessage(data.err));
            }
        })

    },

    updateTime: function (dt) {
        this.m_nTime = this.m_nTime - 1;
        if (this.m_nTime <= 0) {
            this.unschedule(this.updateTime);

            this.isSending = false;
            this.sendCaptchaLabel.setString('发送验证码');

            return;
        }

        if (this.sendCaptchaLabel) {
            this.sendCaptchaLabel.setString(this.m_nTime.toString());
        }


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
        this.checkBoxMale.setPosition(winSize.width / 2, winSize.height / 2 + 40);
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
        this.checkBoxFemale.setPosition(winSize.width / 2 + 80, winSize.height / 2 + 40);
        this.addChild(this.checkBoxFemale);


    }


});

var BagLayer = cc.Layer.extend({
    ctor: function () {
        this._super();


        var winSize = cc.director.getWinSize();

        //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width / 2, winSize.height / 2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        var itemLabel = new cc.LabelTTF("即将开放, 敬请期待!", "Arial", 34);
        itemLabel.setPosition(winSize.width / 2, winSize.height / 2);
        itemLabel.color = cc.color.YELLOW;
        this.addChild(itemLabel);

    }
});