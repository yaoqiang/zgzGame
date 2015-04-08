var LoginScene = cc.Scene.extend({
    onEnter: function () {

        this._super();

        var layer = new LoginLayer();
        this.addChild(layer);
    }

});


var LoginLayer = cc.Layer.extend({

    sprite:null,

    ctor: function()
    {
        this._super();

        var size = cc.director.getWinSize();

        cc.spriteFrameCache.addSpriteFrames(res.login_plist, res.login_png);


        var bg = cc.Sprite.create("#mianban.png");
//        bg.setAnchorPoint(cc.p(0, 0));
        bg.scale = 1.2;
        bg.setPosition(size.width/2, size.height/2);
        this.addChild(bg);

        var logo = cc.Sprite.create("#game_logo.png");
        logo.setPosition(cc.p(bg.width/2, 350));
        logo.setScale(0.7);
        bg.addChild(logo);

        var blockSize = cc.size(180, 30);
        this.name = cc.EditBox.create(blockSize, cc.Scale9Sprite.createWithSpriteFrameName("shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.name.setPlaceHolder('请输入账号');
        this.name.setFontColor(cc.color.BLACK);
        this.name.setPosition(cc.p(bg.width/2, 250));
        this.name.setDelegate(this);
        bg.addChild(this.name);

        this.pwd = cc.EditBox.create(blockSize, cc.Scale9Sprite.createWithSpriteFrameName("shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.pwd.setPlaceHolder('请输入密码');
        this.pwd.setMaxLength(16);
        this.pwd.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.pwd.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
        this.pwd.setFontColor(cc.color.BLACK);
        this.pwd.setPosition(cc.p(bg.width/2, 200));
        this.pwd.setDelegate(this);
        bg.addChild(this.pwd);

        //登录
        this.btnLogin = cc.MenuItemSprite.create(
            cc.Sprite.create("#kaishiyouxi.png"),
            cc.Sprite.create("#kaishiyouxi.png"),
            this.onLogin,
            this
        );

        this.menuLogin = cc.Menu.create(this.btnLogin);
        this.menuLogin.setPosition(cc.p(bg.width/2 + 40, 180));
        this.menuLogin.setScale(0.8);

        bg.addChild(this.menuLogin);

        //快速登录
        this.quickLogin = cc.Sprite.create("#kuaisudenglu.png");
        this.quickLogin.setPosition(cc.p(bg.width/2 - 70, 120));
        this.quickLogin.setScale(0.65);
        bg.addChild(this.quickLogin);

        //注册
        this.register = cc.MenuItemSprite.create(
            cc.Sprite.create("#wanchengzhuce.png"),
            cc.Sprite.create("#wanchengzhuce.png"),
            this.onSignup,
            this
        );

        this.registerMenu = cc.Menu.create(this.register);
        this.registerMenu.setPosition(cc.p(bg.width/2-80, 42));
        this.registerMenu.setScale(0.65);

        bg.addChild(this.registerMenu);


        //other.
        var left = cc.Sprite.create("#puke1.png");
        left.setPosition(cc.p(bg.width/2 + 230, 220));
        left.setScale(0.45);
        bg.addChild(left);

        var right = cc.Sprite.create("#puke2.png");
        right.setPosition(cc.p(bg.width/2 - 230, 220));
        right.setScale(0.45);
        bg.addChild(right);

        var right2 = cc.Sprite.create("#juese01.png");
        right2.setPosition(cc.p(bg.width/2 - 170, 220));
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
            console.log('invalid input');
            prompt.fade('用户名密码不能为空');
            return;
        }

        AuthController.login(username, password);


    },

    onSignup: function () {
        var scene = new SignupScene();
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },

    onExit: function()
    {
        //this._super();
    }


});

