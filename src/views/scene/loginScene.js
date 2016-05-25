var LoginScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        console.log("---->LoginScene ctor");
        FrameCache.addSpriteFrames(res.login_plist);
        FrameCache.addSpriteFrames(res.common_plist);
        //cc.spriteFrameCache.addSpriteFrames(res.login_plist);
        var layer = new LoginLayer();
        this.addChild(layer);


    },
    onEnter: function () {
        this._super();

        // UpdataDataApp(1, null, null);

    },
    onExit: function () {
        this._super();
        console.log("---->LoginScene onExit");
        FrameCache.removeSpriteFrames(res.login_plist);
        FrameCache.removeSpriteFrames(res.common_plist);
    }

});


var LoginLayer = cc.Layer.extend({

    sprite:null,

    ctor: function()
    {
        this._super();
        this.m_nTime = 120;


        var size = cc.director.getWinSize();


        var bg = new cc.Sprite("#login_mianban.png");
//        bg.setAnchorPoint(cc.p(0, 0));
        bg.scale = 1.2;
        bg.setPosition(size.width/2, size.height/2);
        this.addChild(bg);

        var logo = new cc.Sprite("res/logo.png");
        logo.setPosition(bg.width/2, 350);
        logo.scale = 0.35;
        bg.addChild(logo);

        var blockSize = cc.size(180, 30);
        this.name = new cc.EditBox(blockSize, new cc.Scale9Sprite("login_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.name.setPlaceHolder('请输入账号');
        this.name.setFontColor(cc.color.BLACK);
        this.name.setPosition(bg.width/2, 250);
        this.name.setDelegate(this);
        bg.addChild(this.name,0);

        this.pwd = new cc.EditBox(blockSize, new cc.Scale9Sprite("login_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.pwd.setPlaceHolder('请输入密码');
        this.pwd.setMaxLength(16);
        this.pwd.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.pwd.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
        this.pwd.setFontColor(cc.color.BLACK);
        this.pwd.setPosition(bg.width/2, 200);
        this.pwd.setDelegate(this);
        bg.addChild(this.pwd,0);

        //登录
        this.btnLogin = new cc.MenuItemImage(
            "#login_kaishiyouxi.png",
            "#login_kaishiyouxi.png",
            this.onLogin,
            this
        );

        this.menuLogin = new cc.Menu(this.btnLogin);
        this.menuLogin.setPosition(bg.width/2 + 40, 180);
        this.menuLogin.setScale(0.8);

        bg.addChild(this.menuLogin);

        //快速登录
        this.quickLogin = new cc.MenuItemImage("#login_kuaisudenglu.png", "#login_kuaisudenglu.png", this.doQuickLogin, this);
        this.menuQuickLogin = new cc.Menu(this.quickLogin);
        this.menuQuickLogin.setPosition(bg.width/2 - 220, 40);
        this.menuQuickLogin.setScale(0.6);

        bg.addChild(this.menuQuickLogin);

        //注册
        //this.register = new cc.MenuItemImage(
        //    "#login_wanchengzhuce.png",
        //    "#login_wanchengzhuce.png",
        //    this.onSignUp,
        //    this
        //);
        //
        //this.registerMenu = new cc.Menu(this.register);
        //this.registerMenu.setPosition(bg.width/2-80, 42);
        //this.registerMenu.setScale(0.65);

        //bg.addChild(this.registerMenu);

        //忘记密码
        this.forgetPasswordNormal = new cc.Sprite("#common_btn_lan.png");
        this.forgetPasswordSelected = new cc.Sprite("#common_btn_lan.png");
        this.forgetPasswordDisabled = new cc.Sprite("#common_btn_lan.png");
        this.forgetPasswordButton = new cc.MenuItemSprite(this.forgetPasswordNormal, this.forgetPasswordSelected, this.forgetPasswordDisabled, this.onForgetPasswordClick, this);
        //this.okButton.scale = 2.3;
        var menuItem = new cc.Menu(this.forgetPasswordButton);
        menuItem.setPosition(bg.width/2 - 60, 40);
        menuItem.scale = 0.6;
        bg.addChild(menuItem);

        var butSize = this.forgetPasswordButton.getContentSize();
        this.forgetPasswordLabel = new cc.LabelTTF("忘记密码", "Arial", 28);
        this.forgetPasswordLabel.setPosition(butSize.width / 2, butSize.height / 2);
        this.forgetPasswordButton.addChild(this.forgetPasswordLabel);


        //other.
        var left = new cc.Sprite("#login_puke1.png");
        left.setPosition(bg.width/2 + 230, 220);
        left.setScale(0.45);
        bg.addChild(left);

        var right = new cc.Sprite("#login_puke2.png");
        right.setPosition(bg.width/2 - 230, 220);
        right.setScale(0.45);
        bg.addChild(right);

        var right2 = new cc.Sprite("#login_juese01.png");
        right2.setPosition(bg.width/2 - 170, 220);
        right2.setScale(0.65);
        bg.addChild(right2);

        return true;

    },
    onLogin: function()
    {
        var username = this.name.getString();
        var password = this.pwd.getString();
        if (username === '请输入账号' || password === '请输入密码')
        {
            prompt.fade('用户名密码不能为空');
            return;
        }

        AuthController.login(username, password);
        playEffect(audio_common.Button_Click);

    },

    doQuickLogin: function () {

        if (!Storage.get(CommonConf.LOCAL_STORAGE.INIT)) {
            Storage.init();
        }

        if (Storage.get(CommonConf.LOCAL_STORAGE.TOKEN)) {
            var token = Storage.get(CommonConf.LOCAL_STORAGE.TOKEN);
            AuthController.loginWithToken(token);
        } else {
            AuthController.autoLogin();
        }
    },


    onForgetPasswordClick: function () {
        playEffect(audio_common.Button_Click);

        this.resetBox = new DialogSmall('找回密码', 2, {ensureCallback: this.resetPassword}, this);

        var boxSize = this.resetBox.bg.getBoundingBox();

        var mobileLabel = new cc.LabelTTF("手机号:", "AmericanTypewriter", 26);
        mobileLabel.setPosition(boxSize.width / 2 - 20, boxSize.height / 2 + 350);
        mobileLabel.color = cc.color.WHITE;
        mobileLabel.scale = 2;
        this.resetBox.bg.addChild(mobileLabel);


        var blockSize = cc.size(370, 70);
        this.mobileValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.mobileValue.setPlaceHolder('请输入手机号');
        this.mobileValue.setFontColor(cc.color.BLACK);
        this.mobileValue.setPosition(boxSize.width / 2 + 300, boxSize.height / 2 + 350);
        this.mobileValue.color = cc.color.WHITE;
        this.mobileValue.setMaxLength(11);
        this.resetBox.bg.addChild(this.mobileValue);

        //captcha
        this.sendCaptchaNormal = new cc.Sprite("#common_btn_4.png");
        this.sendCaptchaSelected = new cc.Sprite("#common_btn_4.png");
        this.sendCaptchaDisabled = new cc.Sprite("#common_btn_4.png");
        this.sendCaptchaButton = new cc.MenuItemSprite(this.sendCaptchaNormal, this.sendCaptchaSelected, this.sendCaptchaDisabled, this.sendCaptcha, this);
        this.sendCaptchaButton.scale = 2.3;
        var menuItem = new cc.Menu(this.sendCaptchaButton);
        menuItem.setPosition(boxSize.width / 2 + 610, boxSize.height / 2 + 350);
        this.resetBox.bg.addChild(menuItem, 2);

        var butSize = this.sendCaptchaButton.getContentSize();
        this.sendCaptchaLabel = new cc.LabelTTF("发送验证码", "Arial", 18);
        this.sendCaptchaLabel.setPosition(butSize.width / 2, butSize.height / 2);
        this.sendCaptchaButton.addChild(this.sendCaptchaLabel);

        //验证码
        var captchaLabel = new cc.LabelTTF("验证码:", "AmericanTypewriter", 26);
        captchaLabel.setPosition(boxSize.width / 2 - 20, boxSize.height / 2 + 220);
        captchaLabel.color = cc.color.WHITE;
        captchaLabel.scale = 2;
        this.resetBox.bg.addChild(captchaLabel);


        this.captchaValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.captchaValue.setPlaceHolder('请输入验证码');
        this.captchaValue.setFontColor(cc.color.BLACK);
        this.captchaValue.setPosition(boxSize.width / 2 + 300, boxSize.height / 2 + 220);
        this.captchaValue.color = cc.color.WHITE;
        this.captchaValue.setMaxLength(6);
        this.resetBox.bg.addChild(this.captchaValue);

        //密码
        var passwordLabel = new cc.LabelTTF("密  码:", "AmericanTypewriter", 26);
        passwordLabel.setPosition(boxSize.width / 2 - 20, boxSize.height / 2 + 90);
        passwordLabel.color = cc.color.WHITE;
        passwordLabel.scale = 2;
        this.resetBox.bg.addChild(passwordLabel);


        this.passwordValue = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.passwordValue.setPlaceHolder('请输入密码');
        this.passwordValue.setFontColor(cc.color.BLACK);
        this.passwordValue.setPosition(boxSize.width / 2 + 300, boxSize.height / 2 + 90);
        this.passwordValue.color = cc.color.WHITE;
        this.passwordValue.setMaxLength(16);
        this.resetBox.bg.addChild(this.passwordValue);


        //确定


        this.addChild(this.resetBox, 20);


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

        var self = this;

        UniversalController.sendResetPasswordSMS(this.mobileValue.getString(), function (data) {
            if (data.code == RETURN_CODE.OK) {
                prompt.fadeMiddle('验证码已发送');
            } else {
                prompt.fadeMiddle(ERR_MESSAGE.getMessage(data.err));
                self.unschedule(self.updateTime);
                self.isSending = false;
                self.sendCaptchaLabel.setString('发送验证码');
            }
        });

    },


    /**
     * 发送修改密码请求
     */
    resetPassword: function () {
        if (!this.validateMobile()) return;
        if (!this.validateCaptcha()) return;
        if (!this.validatePassword()) return;

        var self = this;
        var winSize = cc.director.getWinSize();

        var mobile = this.mobileValue.getString();
        var password = this.passwordValue.getString();
        var captcha = this.captchaValue.getString();

        var data = {mobile: mobile, password: password, captcha: captcha};
        UniversalController.resetPassword(data, function (data) {
            if (data.code == RETURN_CODE.OK) {
                prompt.fadeMiddle('密码修改成功, 请使用新密码登录');
                if (self.resetBox) self.resetBox.removeFromParent(true);


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


    }


});
