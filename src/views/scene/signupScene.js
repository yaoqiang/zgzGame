var SignupScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new SignupLayer();
        this.addChild(layer);
    }

});

var SignupLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();

        cc.spriteFrameCache.addSpriteFrames(res.login_plist, res.login_png);

        var bg = cc.Sprite.create("#mianban.png");
        bg.scale = 1.2;
        bg.setPosition(size.width/2, size.height/2);
        this.addChild(bg);

        var logo = cc.Sprite.create("#game_logo.png");
        logo.setPosition(cc.p(bg.width/2, 350));
        logo.setScale(0.7);
        bg.addChild(logo);

        var blockSize = cc.size(180, 30);
        this.name = cc.EditBox.create(blockSize, cc.Scale9Sprite.createWithSpriteFrameName("shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.name.setPlaceHolder('账号，字母数字或下划线组成，6-16位');
        this.name.setMaxLength(16);
        this.name.setFontColor(cc.color.BLACK);
        this.name.setPosition(cc.p(bg.width/2, 250));
        this.name.setDelegate(this);
        bg.addChild(this.name);

        this.pwd = cc.EditBox.create(blockSize, cc.Scale9Sprite.createWithSpriteFrameName("shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.pwd.setPlaceHolder('密码，6-16位');
        this.pwd.setMaxLength(16);
        this.pwd.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
        this.pwd.setFontColor(cc.color.BLACK);
        this.pwd.setPosition(cc.p(bg.width/2, 200));
        this.pwd.setDelegate(this);
        bg.addChild(this.pwd);

        this.pwdConfirm = cc.EditBox.create(blockSize, cc.Scale9Sprite.createWithSpriteFrameName("shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.pwdConfirm.setPlaceHolder('确认密码，6-16位');
        this.pwdConfirm.setMaxLength(16);
        this.pwdConfirm.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
        this.pwdConfirm.setFontColor(cc.color.BLACK);
        this.pwdConfirm.setPosition(cc.p(bg.width/2, 150));
        this.pwdConfirm.setDelegate(this);
        bg.addChild(this.pwdConfirm);

        this.register = cc.MenuItemSprite.create(
            cc.Sprite.create("#wanchengzhuce.png"),
            cc.Sprite.create("#wanchengzhuce.png"),
            this.onSignup,
            this
        );

        this.registerMenu = cc.Menu.create(this.register);
        this.registerMenu.setPosition(cc.p(bg.width/2-150, 25));
        this.registerMenu.setScale(0.65);

        bg.addChild(this.registerMenu);

        return true;
    },
    onSignup: function () {
        var username = this.name.getString();
        var password = this.pwd.getString();
        var pwdConfirm = this.pwdConfirm.getString();

        //username reg
        var reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){3,15}$/;
        if (!reg.test(username))
        {
            prompt.fade('用户名错误，请输入字母、数字或下划线，4-16位');
            return;
        }

        if (password.length < 6 || password.length > 16)
        {
            prompt.fade('密码长度必须在6-16位之间');
            return;
        }
        if (pwdConfirm.length < 6 || pwdConfirm.length > 16)
        {
            prompt.fade('密码长度必须在6-16位之间');
            return;
        }
        if (password !== pwdConfirm)
        {
            prompt.fade('两次输入密码不同, 请重新输入');
            return;
        }
        console.log('send http..');

        var self = this;
        Network.post({
            type: 'post',
            action: 'register',
            args : "username="+username+"&password="+password,
            onSuccess : function(result) {

                if (result.code === 200)
                {
                    console.log('注册成功');

                    prompt.fade('您已成功注册，请使用您的账号登录');

                    self.scheduleOnce(self.registerCallback, 3);
                }
                else
                {
                    console.log('用户名已存在');
                    prompt.fade('用户名已存在，请更换其他用户名');
                }

            },

            onError : function() {
                console.log("error");
            }
        });

    },
    registerCallback: function () {
        var scene = new LoginScene();
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    onExit: function()
    {
        this._super();
    }
});