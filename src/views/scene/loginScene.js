var LoginScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.login_plist);
        var layer = new LoginLayer();
        this.addChild(layer);


        //Storage.removeFile();
        //Storage.init();
        //console.log(Storage.get(CommonConf.LOCAL_STORAGE.IS_PLAY_BACKGROUND_MUSIC));
        //console.log(Storage.get(CommonConf.LOCAL_STORAGE.IS_PLAY_EFFECT));


        //console.log(Storage.get('init'));
        //
        //if (!Storage.get('init')) {
        //    Storage.init();
        //}
        //
        //console.log(Storage.get('init'));
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
        this.quickLogin = new cc.Sprite("#login_kuaisudenglu.png");
        this.quickLogin.setPosition(bg.width/2 - 70, 120);
        this.quickLogin.setScale(0.65);
        bg.addChild(this.quickLogin);

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

    onSignUp: function () {
        var scene = new SignupScene();
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
        playEffect(audio_common.Button_Click);
    }


});
