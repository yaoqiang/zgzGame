var LoginScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.login_plist, res.login_png);

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


        var bg = new cc.Sprite("#mianban.png");
//        bg.setAnchorPoint(cc.p(0, 0));
        bg.scale = 1.2;
        bg.setPosition(size.width/2, size.height/2);
        this.addChild(bg);

        var logo = new cc.LabelTTF("豆面扎股子", "AmericanTypewriter", 42);
        logo.setColor(cc.color.YELLOW);
        logo.setPosition(bg.width/2, 350);
        bg.addChild(logo);

        var blockSize = cc.size(180, 30);
        this.name = new cc.EditBox(blockSize, cc.Scale9Sprite.createWithSpriteFrameName("shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.name.setPlaceHolder('请输入账号');
        this.name.setFontColor(cc.color.BLACK);
        this.name.setPosition(cc.p(bg.width/2, 250));
        this.name.setDelegate(this);
        bg.addChild(this.name);

        this.pwd = new cc.EditBox(blockSize, cc.Scale9Sprite.createWithSpriteFrameName("shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.pwd.setPlaceHolder('请输入密码');
        this.pwd.setMaxLength(16);
        this.pwd.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.pwd.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
        this.pwd.setFontColor(cc.color.BLACK);
        this.pwd.setPosition(bg.width/2, 200);
        this.pwd.setDelegate(this);
        bg.addChild(this.pwd);

        //登录
        this.btnLogin = new cc.MenuItemImage(
            "#kaishiyouxi.png",
            "#kaishiyouxi.png",
            this.onLogin,
            this
        );

        this.menuLogin = new cc.Menu(this.btnLogin);
        this.menuLogin.setPosition(bg.width/2 + 40, 180);
        this.menuLogin.setScale(0.8);

        bg.addChild(this.menuLogin);

        //快速登录
        this.quickLogin = new cc.Sprite("#kuaisudenglu.png");
        this.quickLogin.setPosition(bg.width/2 - 70, 120);
        this.quickLogin.setScale(0.65);
        bg.addChild(this.quickLogin);

        //注册
        this.register = new cc.MenuItemImage(
            "#wanchengzhuce.png",
            "#wanchengzhuce.png",
            this.onSignup,
            this
        );

        this.registerMenu = new cc.Menu(this.register);
        this.registerMenu.setPosition(bg.width/2-80, 42);
        this.registerMenu.setScale(0.65);

        bg.addChild(this.registerMenu);


        //other.
        var left = new cc.Sprite("#puke1.png");
        left.setPosition(cc.p(bg.width/2 + 230, 220));
        left.setScale(0.45);
        bg.addChild(left);

        var right = new cc.Sprite("#puke2.png");
        right.setPosition(cc.p(bg.width/2 - 230, 220));
        right.setScale(0.45);
        bg.addChild(right);

        var right2 = new cc.Sprite("#juese01.png");
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
            prompt.fade('用户名密码不能为空');
            return;
        }

        AuthController.login(username, password);


    },

    onSignup: function () {
        var scene = new SignupScene();
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }


});

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var self = this;

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            "#game_logo.png",
            "#game_logo.png",
            function () {
                cc.log("Menu is clicked!");
                var logo = new cc.LabelTTF("豆面扎股子", "AmericanTypewriter", 42);
                logo.setColor(cc.color.YELLOW);
                logo.setPosition(cc.p(size.width/2, size.height/2));
                self.addChild(logo);

            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );
        return true;
    }
});
