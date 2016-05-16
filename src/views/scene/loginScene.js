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
        this.menuQuickLogin.setPosition(bg.width/2 - 200, 50);
        this.menuQuickLogin.setScale(0.6);

        bg.addChild(this.menuQuickLogin);

        //注册
        this.register = new cc.MenuItemImage(
            "#login_wanchengzhuce.png",
            "#login_wanchengzhuce.png",
            this.onSignUp,
            this
        );

        this.registerMenu = new cc.Menu(this.register);
        this.registerMenu.setPosition(bg.width/2-80, 42);
        this.registerMenu.setScale(0.65);

        //bg.addChild(this.registerMenu);
        //忘记密码
        this.forgetPassword = new cc.MenuItemImage(
            "#login_wanchengzhuce.png",
            "#login_wanchengzhuce.png",
            this.onForgetPassword,
            this
        );
        this.forgetPasswordMenu = new cc.Menu(this.forgetPassword);
        this.forgetPasswordMenu.setPosition(bg.width/2-70, 50);
        this.forgetPasswordMenu.setScale(0.6);
        //bg.addChild(this.forgetPasswordMenu);

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

    onSignUp: function () {
        var scene = new SignupScene();
        //cc.director.runScene(new cc.TransitionFade(1.2, scene));
        cc.director.runScene( scene);
        playEffect(audio_common.Button_Click);
    },

    onForgetPassword: function () {

        playEffect(audio_common.Button_Click);
    }


});
