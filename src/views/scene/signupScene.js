var SignupScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        console.log("---->SignupScene ctor");
        FrameCache.addSpriteFrames(res.common_plist);
        FrameCache.addSpriteFrames(res.login_plist);

        var layer = new SignupLayer();
        this.addChild(layer);
    },

    ctor: function() {
        this._super();

        //add a keyboard event listener to statusLabel
        this.keyboardListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
            },
            onKeyReleased: function(keyCode, event){
                var target = event.getCurrentTarget();
                if (keyCode == cc.KEY.back) {
                    var scene = new LoginScene();
                    //cc.director.runScene(new cc.TransitionFade(1.2, scene));
                    cc.director.runScene(scene);
                }

            }
        }, this);
    },

    onExit: function() {
        this._super();
        cc.eventManager.removeListener(this.keyboardListener);
        console.log("---->SignupScene onExit");
        FrameCache.removeSpriteFrames(res.common_plist);
        FrameCache.removeSpriteFrames(res.login_plist);
    }

});

var SignupLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();

        var bg = new cc.Sprite("#login_mianban.png");
        bg.scale = 1.2;
        bg.setPosition(size.width/2, size.height/2);
        this.addChild(bg);

        var logo = new cc.LabelTTF("豆面扎股子", "AmericanTypewriter", 42);
        logo.setColor(cc.color.YELLOW);
        logo.setPosition(bg.width/2, 350);
        bg.addChild(logo);

        var blockSize = cc.size(180, 30);
        this.name = new cc.EditBox(blockSize, new cc.Scale9Sprite("login_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.name.setPlaceHolder('账号，字母数字或下划线组成，6-16位');
        this.name.setMaxLength(16);
        this.name.setFontColor(cc.color.BLACK);
        this.name.setPosition(bg.width/2, 250);
        this.name.setDelegate(this);
        bg.addChild(this.name);

        this.pwd = new cc.EditBox(blockSize, new cc.Scale9Sprite("login_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.pwd.setPlaceHolder('密码，6-16位');
        this.pwd.setMaxLength(16);
        this.pwd.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
        this.pwd.setFontColor(cc.color.BLACK);
        this.pwd.setPosition(bg.width/2, 200);
        this.pwd.setDelegate(this);
        bg.addChild(this.pwd);

        this.pwdConfirm = new cc.EditBox(blockSize, new cc.Scale9Sprite("login_shurukuang.png", cc.rect(14, 14, 25, 29)));
        this.pwdConfirm.setPlaceHolder('确认密码，6-16位');
        this.pwdConfirm.setMaxLength(16);
        this.pwdConfirm.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
        this.pwdConfirm.setFontColor(cc.color.BLACK);
        this.pwdConfirm.setPosition(bg.width/2, 150);
        this.pwdConfirm.setDelegate(this);
        bg.addChild(this.pwdConfirm);

        this.register = new cc.MenuItemSprite(
            new cc.Sprite("#login_wanchengzhuce.png"),
            new cc.Sprite("#login_wanchengzhuce.png"),
            this.onSignUp,
            this
        );

        this.registerMenu = new cc.Menu(this.register);
        this.registerMenu.setPosition(bg.width/2-150, 25);
        this.registerMenu.setScale(0.65);

        bg.addChild(this.registerMenu);

        return true;
    },
    onSignUp: function () {
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

        var self = this;
        Network.post({
            type: 'post',
            action: 'register',
            args : {username: username, password: password},
            onSuccess : function(result) {

                if (result.code === RETURN_CODE.OK)
                {
                    //console.log('注册成功');

                    prompt.fade('您已成功注册，请使用您的账号登录');

                    self.scheduleOnce(self.registerCallback, 3);
                }
                else
                {
                    //console.log('用户名已存在');
                    prompt.fade('用户名已存在，请更换其他用户名');
                }

            },

            onError : function() {
                //console.log("error");
            }
        });

    },
    registerCallback: function () {
        playEffect(audio_common.Button_Click);
        var scene = new LoginScene();
        //cc.director.runScene(new cc.TransitionFade(1.2, scene));
        cc.director.runScene(scene);
    },
    onExit: function()
    {
        this._super();
    }
});