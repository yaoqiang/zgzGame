var ProfileScene = cc.Scene.extend({
    ctor: function (args) {
        this._super();
        console.log("---->ProfileScene ctor");
        FrameCache.addSpriteFrames(res.common_plist);
        FrameCache.addSpriteFrames(res.profile_plist);
        FrameCache.addSpriteFrames(res.avatar_plist);
        //cc.spriteFrameCache.addSpriteFrames(res.profile_plist);

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
            UniversalController.getProfile(gPlayer.uid, function (data) {
                scene.layer = new ProfileLayer({player: data});
                scene.addChild(scene.layer);
            });
        }
        else {
            UniversalController.getMyItemList(function (data) {
                scene.layer = new BagLayer({itemList: data.itemList});
                scene.addChild(scene.layer);
            });


        }

    },


    onExit: function () {
        this._super();
        //
        console.log("---->ProfileScene onExit");
        cc.eventManager.removeListener(this.keyboardListener);
        FrameCache.removeSpriteFrames(res.common_plist);
        FrameCache.removeSpriteFrames(res.profile_plist);
        FrameCache.removeSpriteFrames(res.avatar_plist);
    }

});


var ProfileLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();
        this.goldChangeListener = null;
        this.updateAvatarListener = null;
        //init event
        this.initSubscribeEvent();

        //init state;
        this.isSending = false;
        this.m_nTime = 120;


        this.player = {};

        var self = this;

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
        this.player.shortid = args.player.shortid;

        var winSize = cc.director.getWinSize();

        //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width / 2, winSize.height / 2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        //
        var avatarBg = new cc.Sprite("#hallinfo_kuang.png");
        avatarBg.setPosition(160, winSize.height / 2 + 80);
        avatarBg.scale = ZGZ.SCALE * 0.3;
        this.addChild(avatarBg);

        //
        var avatar = new cc.MenuItemSprite(
            new cc.Sprite(utils.getAvatar(this.player.avatar)),
            new cc.Sprite(utils.getAvatar(this.player.avatar)),
            this.onSelectAvatar,
            this
        );
        avatar.setName("avatar");

        var avatarMenu = new cc.Menu(avatar);
        avatarMenu.setName('avatarMenu');
        avatarMenu.setPosition(winSize.width / 2 - 240, winSize.height / 2 + 80)
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
        avatarEditStr.setPosition(winSize.width / 2 - 240, winSize.height / 2 + 25);
        this.addChild(avatarEditStr);

        //绑定手机

        if (this.player.mobile == '' || this.player.mobile == undefined) {
            this.bindingMobileNormal = new cc.Sprite("#common_btn_5.png");
            this.bindingMobileSelected = new cc.Sprite("#common_btn_5.png");
            this.bindingMobileDisabled = new cc.Sprite("#common_btn_5.png");
            this.bindingMobileButton = new cc.MenuItemSprite(this.bindingMobileNormal, this.bindingMobileSelected, this.bindingMobileDisabled, this.bindingMobileProfile, this);
            this.bindingMobileButton.scale = 0.65;
            this.bindingMenuItem = new cc.Menu(this.bindingMobileButton);
            this.bindingMenuItem.setPosition(winSize.width / 2 - 240, winSize.height / 2 - 20);
            this.addChild(this.bindingMenuItem, 2);

            var butSize = this.bindingMobileButton.getContentSize();
            var bindingMobileLabel = new cc.LabelTTF("绑定手机", "Arial", 24);
            bindingMobileLabel.setPosition(butSize.width / 2, butSize.height / 2);
            this.bindingMobileButton.addChild(bindingMobileLabel);

            this.bindingMobileTipLabel = new cc.LabelTTF("绑定后可用手机号登录\n(+金币奖励)", "Arial", 14);
            this.bindingMobileTipLabel.color = cc.color.RED;
            this.bindingMobileTipLabel.setPosition(winSize.width / 2 - 240, winSize.height / 2 - 70);
            this.addChild(this.bindingMobileTipLabel, 10);

        }
        else {
            this.mobileLabel = new cc.LabelTTF("账号:" + this.player.mobile, "Arial", 16);
            this.mobileLabel.color = cc.color.WHITE;
            this.mobileLabel.setPosition(winSize.width / 2 - 240, winSize.height / 2 - 10);
            this.addChild(this.mobileLabel);

            this.inviteRecordNormal = new cc.Sprite("#common_btn_3.png");
            this.inviteRecordSelected = new cc.Sprite("#common_btn_3.png");
            this.inviteRecordDisabled = new cc.Sprite("#common_btn_3.png");
            this.inviteRecordButton = new cc.MenuItemSprite(this.inviteRecordNormal, this.inviteRecordSelected, this.inviteRecordDisabled, this.inviteRecordClicked, this);
            this.inviteRecordButton.scale = 0.5;
            this.inviteRecordMenuItem = new cc.Menu(this.inviteRecordButton);
            this.inviteRecordMenuItem.setPosition(winSize.width / 2 - 240, winSize.height / 2 - 55);
            this.addChild(this.inviteRecordMenuItem, 2);

            var butSize = this.inviteRecordButton.getContentSize();
            var inviteCopyLabel = new cc.LabelTTF("邀请奖励", "Arial", 28);
            inviteCopyLabel.setPosition(butSize.width / 2, butSize.height / 2);
            this.inviteRecordButton.addChild(inviteCopyLabel);

        }


        //
        var modifyBg = new cc.Sprite("#deep_bg_big.png");

        modifyBg.setPosition(winSize.width / 2 + 100, winSize.height / 2 + 83);
        modifyBg.scaleY = 1.2
        this.addChild(modifyBg);

        //
        var nickNameLabel = new cc.LabelTTF("昵  称:", "AmericanTypewriter", 18);
        nickNameLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2 + 110);
        nickNameLabel.color = cc.color.WHITE;


        var blockSize = cc.size(200, 30);
        this.nickNameValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.nickNameValue.setString(this.player.nickName);
        this.nickNameValue.setFontColor(cc.color.BLACK);
        this.nickNameValue.setPosition(winSize.width / 2 + 50, winSize.height / 2 + 110);
        this.nickNameValue.color = cc.color.WHITE;
        //this.nickNameValue.setMaxLength(6);
        this.addChild(this.nickNameValue);


        this.addChild(nickNameLabel);

        //
        var genderLabel = new cc.LabelTTF("性  别:", "AmericanTypewriter", 18);
        genderLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2 + 70);
        genderLabel.color = cc.color.WHITE;
        this.addChild(genderLabel);


        var maleLabel = new cc.LabelTTF("男", "AmericanTypewriter", 16);
        maleLabel.setPosition(winSize.width / 2 - 30, winSize.height / 2 + 70);
        maleLabel.color = cc.color.WHITE;
        this.addChild(maleLabel);


        var femaleLabel = new cc.LabelTTF("女", "AmericanTypewriter", 16);
        femaleLabel.setPosition(winSize.width / 2 + 50, winSize.height / 2 + 70);
        femaleLabel.color = cc.color.WHITE;
        this.addChild(femaleLabel);

        //
        this.initGenderCheckbox();

        //summary
        var summaryLabel = new cc.LabelTTF("简  介:", "AmericanTypewriter", 18);
        summaryLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2 + 30);
        summaryLabel.color = cc.color.WHITE;


        var blockSize = cc.size(200, 30);
        this.summaryValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.summaryValue.setString(this.player.summary);
        this.summaryValue.setFontColor(cc.color.BLACK);
        this.summaryValue.setPosition(winSize.width / 2 + 50, winSize.height / 2 + 30);
        this.summaryValue.color = cc.color.WHITE;
        //this.summaryValue.setMaxLength(10);
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
        menuItem.setPosition(winSize.width / 2 + 250, winSize.height / 2 + 70);
        this.addChild(menuItem, 2);

        var butSize = this.updateButton.getContentSize();
        var updateLabel = new cc.LabelTTF("修改", "Arial", 22);
        updateLabel.setPosition(butSize.width / 2, butSize.height / 2);
        this.updateButton.addChild(updateLabel);


        //
        var goldLabel = new cc.LabelTTF("金  币:", "AmericanTypewriter", 18);
        goldLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2 - 10);
        goldLabel.color = cc.color.WHITE;

        this.addChild(goldLabel);

        var goldIcon = new cc.Sprite("#common_icon_coins_1.png");
        goldIcon.setPosition(winSize.width / 2 - 40, winSize.height / 2 - 10);
        goldIcon.scale = 0.4;
        goldIcon.setAnchorPoint(0, 0.5);
        this.addChild(goldIcon);

        this.goldValue = new cc.LabelTTF(zgzNumeral(this.player.gold).format('0,0'), "AmericanTypewriter", 20);
        this.goldValue.setPosition(winSize.width / 2 - 10, winSize.height / 2 - 10);
        this.goldValue.color = cc.color.YELLOW;
        this.goldValue.setAnchorPoint(0, 0.5);

        this.addChild(this.goldValue);


        //胜率
        var percentLabel = new cc.LabelTTF("胜  率:", "AmericanTypewriter", 18);
        percentLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2 - 50);
        percentLabel.color = cc.color.WHITE;

        this.addChild(percentLabel);

        var totalBattle = this.player.loseNr + this.player.winNr;

        var percentStr = utils.getPercent(this.player.winNr, totalBattle);

        var percentValue = new cc.LabelTTF(percentStr, "AmericanTypewriter", 18);
        percentValue.setPosition(winSize.width / 2 - 40, winSize.height / 2 - 50);
        percentValue.setAnchorPoint(0, 0.5);
        this.addChild(percentValue);

        //win
        var winNrLabel = new cc.LabelTTF("胜:", "AmericanTypewriter", 18);
        winNrLabel.setPosition(winSize.width / 2 + 40, winSize.height / 2 - 50);
        winNrLabel.color = cc.color.WHITE;
        winNrLabel.setAnchorPoint(0, 0.5);
        this.addChild(winNrLabel);

        var winNrValueLabel = new cc.LabelTTF(this.player.winNr.toString(), "AmericanTypewriter", 18);
        winNrValueLabel.setPosition(winSize.width / 2 + 70, winSize.height / 2 - 50);
        winNrValueLabel.color = cc.color.WHITE;
        winNrValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(winNrValueLabel);

        //tie
        var tieNrLabel = new cc.LabelTTF("平:", "AmericanTypewriter", 18);
        tieNrLabel.setPosition(winSize.width / 2 + 120, winSize.height / 2 - 50);
        tieNrLabel.color = cc.color.WHITE;
        tieNrLabel.setAnchorPoint(0, 0.5);
        this.addChild(tieNrLabel);

        var tieNrValueLabel = new cc.LabelTTF(this.player.tieNr.toString(), "AmericanTypewriter", 18);
        tieNrValueLabel.setPosition(winSize.width / 2 + 150, winSize.height / 2 - 50);
        tieNrValueLabel.color = cc.color.WHITE
        tieNrValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(tieNrValueLabel);

        //lose
        var loseNrLabel = new cc.LabelTTF("负:", "AmericanTypewriter", 18);
        loseNrLabel.setPosition(winSize.width / 2 + 200, winSize.height / 2 - 50);
        loseNrLabel.color = cc.color.WHITE;
        loseNrLabel.setAnchorPoint(0, 0.5);
        this.addChild(loseNrLabel);

        var loseNrValueLabel = new cc.LabelTTF(this.player.loseNr.toString(), "AmericanTypewriter", 18);
        loseNrValueLabel.setPosition(winSize.width / 2 + 230, winSize.height / 2 - 50);
        loseNrValueLabel.color = cc.color.WHITE;
        loseNrValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(loseNrValueLabel);


        //
        var meetingTimeLabel = new cc.LabelTTF("开  会:", "AmericanTypewriter", 18);
        meetingTimeLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2 - 90);
        meetingTimeLabel.color = cc.color.WHITE;

        this.addChild(meetingTimeLabel);

        var meetingTimeValueLabel = new cc.LabelTTF(this.player.meetingTimes.toString(), "AmericanTypewriter", 18);
        meetingTimeValueLabel.setPosition(winSize.width / 2 - 40, winSize.height / 2 - 90);
        meetingTimeValueLabel.setAnchorPoint(0, 0.5);
        this.addChild(meetingTimeValueLabel);

        //
        var ingotLabel = new cc.LabelTTF("元  宝:", "AmericanTypewriter", 18);
        ingotLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2 - 130);
        ingotLabel.color = cc.color.WHITE;

        this.addChild(ingotLabel);

        var ingotIcon = new cc.Sprite("#common_icon_yuanbao.png");
        ingotIcon.setPosition(winSize.width / 2 - 40, winSize.height / 2 - 130);
        ingotIcon.scale = 0.8;
        ingotIcon.setAnchorPoint(0, 0.5);
        this.addChild(ingotIcon);

        var ingotValue = new cc.LabelTTF(this.player.fragment.toString(), "AmericanTypewriter", 20);
        ingotValue.setPosition(winSize.width / 2 - 10, winSize.height / 2 - 130);
        ingotValue.color = cc.color.YELLOW;
        ingotValue.setAnchorPoint(0, 0.5);

        this.addChild(ingotValue);



        ///
        /// 去掉邀请码,改为根据绑定手机来奖励
        ///
        //邀请码
        //this.inviteLabel = new cc.LabelTTF("邀请码:", "AmericanTypewriter", 18);
        //this.inviteLabel.color = {r: 0, g: 255, b: 127};
        //this.inviteLabel.setPosition(winSize.width / 2 - 110, winSize.height / 2 - 170);
        //this.addChild(this.inviteLabel);
        //
        //this.inviteCodeLabel = new cc.LabelTTF(this.player.shortid, "Arial", 18);
        //this.inviteCodeLabel.setAnchorPoint(0, 0.5);
        //this.inviteCodeLabel.color = {r: 0, g: 255, b: 127};
        //this.inviteCodeLabel.setPosition(winSize.width / 2 - 40, winSize.height / 2 - 170);
        //this.addChild(this.inviteCodeLabel);
        //
        //this.inviteCopyNormal = new cc.Sprite("#common_btn_5.png");
        //this.inviteCopySelected = new cc.Sprite("#common_btn_5.png");
        //this.inviteCopyDisabled = new cc.Sprite("#common_btn_5.png");
        //this.inviteCopyButton = new cc.MenuItemSprite(this.inviteCopyNormal, this.inviteCopySelected, this.inviteCopyDisabled, this.inviteCopyClick, this);
        //this.inviteCopyButton.scale = 0.4;
        //this.inviteCopyMenuItem = new cc.Menu(this.inviteCopyButton);
        //this.inviteCopyMenuItem.setPosition(winSize.width / 2 + 180, winSize.height / 2 - 170);
        //this.inviteCopyMenuItem.setAnchorPoint(0, 0.5);
        //this.addChild(this.inviteCopyMenuItem, 2);
        //
        //var butSize = this.inviteCopyButton.getContentSize();
        //var inviteCopyLabel = new cc.LabelTTF("复制", "Arial", 30);
        //inviteCopyLabel.setPosition(butSize.width / 2, butSize.height / 2);
        //this.inviteCopyButton.addChild(inviteCopyLabel);


        this.inviteTipLabel = new cc.LabelTTF("邀请朋友并绑定手机(填您的手机号),您可获得3元礼包(可累积)", "Arial", 16);
        this.inviteTipLabel.color = cc.color.YELLOW;
        this.inviteTipLabel.setAnchorPoint(0, 0.5);
        this.inviteTipLabel.setPosition(winSize.width / 2 - 140, winSize.height / 2 - 190);
        this.addChild(this.inviteTipLabel, 10);
    },

    updateProfile: function () {

        var nickName = this.nickNameValue.getString();
        var summary = this.summaryValue.getString();

        UniversalController.updateProfile(nickName, this.player.gender, this.player.avatar, summary);
    },


    bindingMobileProfile: function () {
        this.bindingBox = new DialogSmall('绑定手机', 2, {ensureCallback: this.sendBinding}, this);

        var boxSize = this.bindingBox.bg.getBoundingBox();

        var mobileLabel = new cc.LabelTTF("手机号:", "AmericanTypewriter", 26);
        mobileLabel.setPosition(boxSize.width / 2 - 20, boxSize.height / 2 + 390);
        mobileLabel.color = cc.color.WHITE;
        mobileLabel.scale = 2;
        this.bindingBox.bg.addChild(mobileLabel);


        var blockSize = cc.size(370, 70);
        this.mobileValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.mobileValue.setPlaceHolder('请输入手机号');
        this.mobileValue.setFontColor(cc.color.BLACK);
        this.mobileValue.setPosition(boxSize.width / 2 + 300, boxSize.height / 2 + 390);
        this.mobileValue.color = cc.color.WHITE;
        this.mobileValue.setMaxLength(11);
        this.bindingBox.bg.addChild(this.mobileValue);

        //captcha
        this.sendCaptchaNormal = new cc.Sprite("#common_btn_4.png");
        this.sendCaptchaSelected = new cc.Sprite("#common_btn_4.png");
        this.sendCaptchaDisabled = new cc.Sprite("#common_btn_4.png");
        this.sendCaptchaButton = new cc.MenuItemSprite(this.sendCaptchaNormal, this.sendCaptchaSelected, this.sendCaptchaDisabled, this.sendCaptcha, this);
        this.sendCaptchaButton.scale = 2.3;
        var menuItem = new cc.Menu(this.sendCaptchaButton);
        menuItem.setPosition(boxSize.width / 2 + 610, boxSize.height / 2 + 390);
        this.bindingBox.bg.addChild(menuItem, 2);

        var butSize = this.sendCaptchaButton.getContentSize();
        this.sendCaptchaLabel = new cc.LabelTTF("发送验证码", "Arial", 18);
        this.sendCaptchaLabel.setPosition(butSize.width / 2, butSize.height / 2);
        this.sendCaptchaButton.addChild(this.sendCaptchaLabel);

        //验证码
        var captchaLabel = new cc.LabelTTF("验证码:", "AmericanTypewriter", 26);
        captchaLabel.setPosition(boxSize.width / 2 - 20, boxSize.height / 2 + 280);
        captchaLabel.color = cc.color.WHITE;
        captchaLabel.scale = 2;
        this.bindingBox.bg.addChild(captchaLabel);


        this.captchaValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.captchaValue.setPlaceHolder('请输入验证码');
        this.captchaValue.setFontColor(cc.color.BLACK);
        this.captchaValue.setPosition(boxSize.width / 2 + 300, boxSize.height / 2 + 280);
        this.captchaValue.color = cc.color.WHITE;
        //this.captchaValue.setMaxLength(6);
        this.bindingBox.bg.addChild(this.captchaValue);

        //密码
        var passwordLabel = new cc.LabelTTF("密  码:", "AmericanTypewriter", 26);
        passwordLabel.setPosition(boxSize.width / 2 - 20, boxSize.height / 2 + 170);
        passwordLabel.color = cc.color.WHITE;
        passwordLabel.scale = 2;
        this.bindingBox.bg.addChild(passwordLabel);


        this.passwordValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.passwordValue.setPlaceHolder('请输入密码');
        this.passwordValue.setFontColor(cc.color.BLACK);
        this.passwordValue.setPosition(boxSize.width / 2 + 300, boxSize.height / 2 + 170);
        this.passwordValue.color = cc.color.WHITE;
        this.passwordValue.setMaxLength(16);
        this.bindingBox.bg.addChild(this.passwordValue);

        //邀请人手机号
        var fromInviteLabel = new cc.LabelTTF("邀请人手机:", "AmericanTypewriter", 26);
        fromInviteLabel.setPosition(boxSize.width / 2 - 20, boxSize.height / 2 + 60);
        fromInviteLabel.color = cc.color.WHITE;
        fromInviteLabel.scale = 2;
        this.bindingBox.bg.addChild(fromInviteLabel);


        this.fromInviteLabel = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.fromInviteLabel.setPlaceHolder('请输入邀请人手机号');
        this.fromInviteLabel.setFontColor(cc.color.BLACK);
        this.fromInviteLabel.setPosition(boxSize.width / 2 + 300, boxSize.height / 2 + 60);
        this.fromInviteLabel.color = cc.color.WHITE;
        this.bindingBox.bg.addChild(this.fromInviteLabel);


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


    /**
     * 发送绑定请求
     */
    sendBinding: function () {
        if (!this.validateMobile()) return;
        if (!this.validateCaptcha()) return;
        if (!this.validatePassword()) return;

        var self = this;
        var winSize = cc.director.getWinSize();

        var mobile = this.mobileValue.getString();
        var password = this.passwordValue.getString();
        var captcha = this.captchaValue.getString();
        var fromInvite = this.fromInviteLabel.getString();  //邀请人手机号

        var data = {mobile: mobile, password: password, captcha: captcha, inviteMobile: fromInvite};
        UniversalController.bindingMobile(data, function (data) {
            if (data.code == RETURN_CODE.OK) {
                prompt.fadeMiddle('绑定成功, 您可以使用手机号登录');
                if (self.bindingBox) self.bindingBox.removeFromParent(true);

                //移除绑定按钮
                if (self.bindingMenuItem) self.bindingMenuItem.removeFromParent(true);
                if (self.bindingMobileTipLabel) self.bindingMobileTipLabel.removeFromParent(true);

                //添加账号信息
                if (self.mobileLabel) self.mobileLabel.removeFromParent(true);
                self.mobileLabel = new cc.LabelTTF("账号:" + mobile, "Arial", 16);
                self.mobileLabel.color = cc.color.WHITE;
                self.mobileLabel.setPosition(winSize.width / 2 - 240, winSize.height / 2 - 10);
                self.addChild(self.mobileLabel);


                self.inviteRecordNormal = new cc.Sprite("#common_btn_3.png");
                self.inviteRecordSelected = new cc.Sprite("#common_btn_3.png");
                self.inviteRecordDisabled = new cc.Sprite("#common_btn_3.png");
                self.inviteRecordButton = new cc.MenuItemSprite(self.inviteRecordNormal, self.inviteRecordSelected, self.inviteRecordDisabled, self.inviteRecordClicked, self);
                self.inviteRecordButton.scale = 0.5;
                self.inviteRecordMenuItem = new cc.Menu(self.inviteRecordButton);
                self.inviteRecordMenuItem.setPosition(winSize.width / 2 - 240, winSize.height / 2 - 55);
                self.addChild(self.inviteRecordMenuItem, 2);

                var butSize = self.inviteRecordButton.getContentSize();
                var inviteCopyLabel = new cc.LabelTTF("邀请奖励", "Arial", 28);
                inviteCopyLabel.setPosition(butSize.width / 2, butSize.height / 2);
                self.inviteRecordButton.addChild(inviteCopyLabel);

            }
            else {
                prompt.fadeMiddle(ERR_MESSAGE.getMessage(data.err));
            }
        })

    },

    onSelectAvatar: function () {
        var avatarSelectorLayer = new AvatarSelectorLayer();
        this.addChild(avatarSelectorLayer, 10);

    },

    //复制邀请码按钮事件
    inviteCopyClick: function () {
        if (cc.sys.os === cc.sys.OS_IOS) {
            var ret = jsb.reflection.callStaticMethod("NativeOcClass",
                "callNativePasteboard:",
                this.player.shortid);

            if (ret) {
                prompt.fadeMiddle('复制成功,快发送给朋友吧');
            }
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            erun.copyStringToClipboard(this.player.shortid);
            prompt.fadeMiddle('复制成功,快发送给朋友吧');
        }

    },

    inviteRecordClicked: function () {
        var inviteRecordBox = new DialogSmall("我的邀请奖励", 2, {ensureCallback: function (cb) {
            cb(true);
        }, ensureLabel: '确定'}, this, 1);

        this.addChild(inviteRecordBox);
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
        this.checkBoxMale.setPosition(winSize.width / 2, winSize.height / 2 + 70);
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
        this.checkBoxFemale.setPosition(winSize.width / 2 + 80, winSize.height / 2 + 70);
        this.addChild(this.checkBoxFemale);

    },

    initSubscribeEvent: function () {
        var winSize = cc.director.getWinSize();
        var self = this;
        this.goldChangeListener = EventBus.subscribe(gameEvents.GOLD_CHANGE, function (data) {
            if (self && cc.sys.isObjectValid(self)) {
                self.goldValue.setString(zgzNumeral(data.gold).format('0,0'))
            }

        });

        this.updateAvatarListener = EventBus.subscribe(gameEvents.CLIENT_UPDATE_AVATAR, function (data) {
            if (self && cc.sys.isObjectValid(self)) {
                var avatarMenu = self.getChildByName('avatarMenu');
                var avatar = avatarMenu.getChildByName('avatar');
                avatar.setNormalImage(new cc.Sprite(utils.getAvatar(data.avatar)));
                avatar.setSelectedImage(new cc.Sprite(utils.getAvatar(data.avatar)));
                avatar.setDisabledImage(new cc.Sprite(utils.getAvatar(data.avatar)));
                prompt.fadeMiddle('修改头像成功');
            }

        });

    },


    //--------------
    //修改密码废弃
    //--------------
//    changePasswords: function () {
//        this.bindingBox = new DialogSmall('修改密码', 2, {ensureCallback: this.sendNewPasswords}, this);
//
//        var boxSize = this.bindingBox.bg.getBoundingBox();
//
//        var oldPasswords = new cc.LabelTTF("原密码:", "AmericanTypewriter", 26);
//        oldPasswords.setPosition(boxSize.width / 2 - 20, boxSize.height / 2 + 350);
//        oldPasswords.color = cc.color.WHITE;
//        oldPasswords.scale = 2;
//        this.bindingBox.bg.addChild(oldPasswords);
//
//
//        var blockSize = cc.size(370, 70);
//        this.oldValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
//        this.oldValue.setPlaceHolder('请输入原密码');
//        this.oldValue.setFontColor(cc.color.BLACK);
//        this.oldValue.setPosition(boxSize.width / 2 + 300, boxSize.height / 2 + 350);
//        this.oldValue.color = cc.color.WHITE;
//        //this.oldValue.setMaxLength(11);
//        this.bindingBox.bg.addChild(this.oldValue);
//
//
//        //验证码
//        var mewPasswords = new cc.LabelTTF("新密码:", "AmericanTypewriter", 26);
//        mewPasswords.setPosition(boxSize.width / 2 - 20, boxSize.height / 2 + 220);
//        mewPasswords.color = cc.color.WHITE;
//        mewPasswords.scale = 2;
//        this.bindingBox.bg.addChild(mewPasswords);
//
//
//        this.newValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
//        this.newValue.setPlaceHolder('请输入新密码');
//        this.newValue.setFontColor(cc.color.BLACK);
//        this.newValue.setPosition(boxSize.width / 2 + 300, boxSize.height / 2 + 220);
//        this.newValue.color = cc.color.WHITE;
//        //this.newValue.setMaxLength(6);
//        this.bindingBox.bg.addChild(this.newValue);
//
//        //密码
//        var againNewPasswords = new cc.LabelTTF("新密码:", "AmericanTypewriter", 26);
//        againNewPasswords.setPosition(boxSize.width / 2 - 20, boxSize.height / 2 + 90);
//        againNewPasswords.color = cc.color.WHITE;
//        againNewPasswords.scale = 2;
//        this.bindingBox.bg.addChild(againNewPasswords);
//
//
//        this.againValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
//        this.againValue.setPlaceHolder('请再次输入新密码');
//        this.againValue.setFontColor(cc.color.BLACK);
//        this.againValue.setPosition(boxSize.width / 2 + 300, boxSize.height / 2 + 90);
//        this.againValue.color = cc.color.WHITE;
//        this.againValue.setMaxLength(16);
//        this.bindingBox.bg.addChild(this.againValue);
//
//
//        //确定
//        this.addChild(this.bindingBox, 20);
//    },
//    validateoOldPassword: function () {
//        var password = this.oldValue.getString();
//
//        if (password == '') {
//            prompt.fadeMiddle('请输入原密码');
//            return false;
//        }
//
//        return true;
//    },
//    validateoNewPassword: function () {
//        var password = this.newValue.getString();
//
//        if (password == '') {
//            prompt.fadeMiddle('请输入新密码');
//            return false;
//        }
//
//        return true;
//    },
//    validateoAgainPassword: function () {
//        var newpassword = this.newValue.getString();
//        var againpassword = this.againValue.getString();
//
//        if (againpassword == newpassword) {
//            return true;
//        } else {
//            prompt.fadeMiddle('密码不一致');
//            return false;
//        }
//
//        return true;
//    },
    /**
     * 发送绑定请求
     */
    sendNewPasswords: function () {
        if (!this.validateoOldPassword()) return;
        if (!this.validateoNewPassword()) return;
        if (!this.validateoAgainPassword()) return;

        var self = this;
        var winSize = cc.director.getWinSize();

        var oldpassword = this.oldValue.getString();
        var newpassword = this.newValue.getString();
        var againpassword = this.againValue.getString();

        var data = {oldpassword: oldpassword, newpassword: newpassword, againpassword: againpassword};

        UniversalController.changePasswords(data, function (data) {
            if (data.code == RETURN_CODE.OK) {
                prompt.fadeMiddle('密码修改成功，请重新登录。');
                if (self.bindingBox) self.bindingBox.removeFromParent(true);
            }
            else {
                prompt.fadeMiddle(ERR_MESSAGE.getMessage(data.err));
            }
        })

    },
    onEnter: function () {
        this._super();

    },

    onExit: function () {
        if (this.goldChangeListener) {
            EventBus.removeSubscribe(this.goldChangeListener);
            this.goldChangeListener = null;
        }
        if (this.updateAvatarListener) {
            EventBus.removeSubscribe(this.updateAvatarListener);
            this.updateAvatarListener = null;
        }
        this._super();
    }


});


/**
 * 背包Layer
 */
var BagLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();

        var winSize = cc.director.getWinSize();

        //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width / 2, winSize.height / 2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        if (args.itemList.length == 0) {
            var itemLabel = new cc.LabelTTF("这家伙很穷,什么都没有", "Arial", 34);
            itemLabel.setPosition(winSize.width / 2, winSize.height / 2);
            itemLabel.color = cc.color.YELLOW;
            this.addChild(itemLabel);
            return;
        }

        var x = 20, y = winSize.height / 2 + 150;

        var self = this;
        args.itemList.forEach(function (item, index) {
            var itemView = self.generateItemView(item);
            itemView.setPosition(x, y);
            self.addChild(itemView);
            x += 150;

            if (index == 5) {
                x = 20;
                y = winSize.height / 2 - 100;
            }
        });


        //var itemLabel = new cc.LabelTTF("即将开放, 敬请期待!", "Arial", 34);
        //itemLabel.setPosition(winSize.width / 2, winSize.height / 2);
        //itemLabel.color = cc.color.YELLOW;
        //this.addChild(itemLabel);
    },

    generateItemView: function (item) {

        var valueLabel = item.mode === 'count' ? item.value : new Date(item.value).format('yyyy-MM-dd');
        var unitLabel = item.mode === 'count' ? '个' : '\n      到期';

        var x = 110;
        var bg = new cc.Sprite("#item_bg.png");
        bg.setAnchorPoint(0, 1);
        bg.scale = 0.5;
        switch (item.id) {
            //表情包
            case 1:
                break;
            //小喇叭
            case 2:
                var itemIcon = new cc.Sprite("#common_icon_laba.png");
                itemIcon.setAnchorPoint(0.5, 1);
                itemIcon.setPosition(x, 260);
                itemIcon.scale = 0.85;

                var itemLabel = new cc.LabelTTF(item.title, "Arial", 30);
                itemLabel.setAnchorPoint(0.5, 1);
                itemLabel.setPosition(x, 170);

                var itemValueLabel = new cc.LabelTTF(valueLabel + unitLabel, "Arial", 26);
                itemValueLabel.setAnchorPoint(0.5, 1);
                itemValueLabel.setPosition(x, 110);
                bg.addChild(itemIcon);
                bg.addChild(itemLabel);
                bg.addChild(itemValueLabel);
                break;
            //记牌器
            case 3:
                var itemIcon = new cc.Sprite("#jipaiqi.png");
                itemIcon.setAnchorPoint(0.5, 1);
                itemIcon.setPosition(x, 260);
                itemIcon.scale = 0.85;

                var itemLabel = new cc.LabelTTF(item.title, "Arial", 30);
                itemLabel.setAnchorPoint(0.5, 1);
                itemLabel.setPosition(x, 170);

                var itemValueLabel = new cc.LabelTTF(valueLabel + unitLabel, "Arial", 26);
                itemValueLabel.setAnchorPoint(0.5, 1);
                itemValueLabel.setPosition(x, 110);
                bg.addChild(itemIcon);
                bg.addChild(itemLabel);
                bg.addChild(itemValueLabel);
                break;
            //VIP
            case 4:
                break;
        }
        return bg;
    }
});

