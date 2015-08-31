var HeaderLayer = cc.Layer.extend({
    ctor: function(args){
        this._super();

        var size = cc.director.getWinSize();

        //左侧
        var leftTopBg = new cc.Scale9Sprite();
        leftTopBg.initWithSpriteFrameName("mianban_01.png", cc.rect(17, 14, 27, 26))
        leftTopBg.setPosition(0, size.height);
        leftTopBg.setAnchorPoint(0, 1);
        leftTopBg.setContentSize(250, 80);
        this.addChild(leftTopBg);

        var avatarBg = new cc.Sprite("#touxiangkuang_index.png");
        avatarBg.setScale(0.65);
        avatarBg.setAnchorPoint(0, 1);
        avatarBg.setPosition(15, 70);
        leftTopBg.addChild(avatarBg);

        var avatar = new cc.MenuItemSprite(
            new cc.Sprite(utils.getAvatar(gPlayer.avatar)),
            new cc.Sprite(utils.getAvatar(gPlayer.avatar)),
            this.profile,
            this
        );

        var avatarMenu = new cc.Menu(avatar);
        avatarMenu.setPosition(-18, 8);
        avatarMenu.setScale(0.85);
        avatarBg.addChild(avatarMenu);

        var nickBg = new cc.Scale9Sprite();
        nickBg.initWithSpriteFrameName("shuzidikuang.png", cc.rect(6, 5, 11, 7));
        nickBg.setAnchorPoint(0, 1);
        nickBg.setContentSize(130, 25);
        nickBg.setPosition(86, 70);
        leftTopBg.addChild(nickBg);

        var nickName = new cc.LabelTTF(gPlayer.nickName || '扎股子用户', "Arial", 14);
        nickName.setPosition(110, 10);
        nickName.setAnchorPoint(1, 0.5);
        nickBg.addChild(nickName);

        var goldBg = new cc.Scale9Sprite();
        goldBg.initWithSpriteFrameName("shuzidikuang.png", cc.rect(6, 5, 11, 7));
        goldBg.setAnchorPoint(0, 1);
        goldBg.setContentSize(130, 25);
        goldBg.setPosition(86, 40);
        leftTopBg.addChild(goldBg);

        var gold = new cc.LabelTTF(gPlayer.gold || '0', "Arial", 14);
        gold.setColor(cc.color.YELLOW);
        gold.setAnchorPoint(1, 0.5);
        gold.setPosition(110, 10);
        goldBg.addChild(gold);

        var goldIcon = new cc.Sprite("#additional_coins.png");
        goldIcon.setScale(0.5);
        goldIcon.setAnchorPoint(cc.p(0, 1));
        goldIcon.setPosition(0-5, 28);
        goldBg.addChild(goldIcon);



        //右上侧
        var rightTopBg = new cc.Scale9Sprite();
        rightTopBg.initWithSpriteFrameName("mianban_01.png", cc.rect(17, 14, 27, 26));
        rightTopBg.setPosition(size.width, size.height);
        rightTopBg.setAnchorPoint(1, 1);
        rightTopBg.setContentSize(250, 80);
        this.addChild(rightTopBg);

        var shoppingCar = new cc.Sprite("#shangcheng_icon.png");
        shoppingCar.setAnchorPoint(0, 0.5);
        shoppingCar.setPosition(30, rightTopBg.height/2);
        shoppingCar.setScale(0.9);
        rightTopBg.addChild(shoppingCar);

        // create help button sprite
        var helpNormal = new cc.Sprite("#wenhao.png");
        helpNormal.attr({scale:0.9});
        var helpSelected = new cc.Sprite("#wenhao.png");
        helpSelected.attr({scale:1});
        var helpDisabled = new cc.Sprite("#wenhao.png");

        // create help button and added it to header
        var helpButton = new cc.MenuItemSprite(helpNormal, helpSelected, helpDisabled, this.onHelpButton, this);
        var menu = new cc.Menu(helpButton);
        menu.setPosition(125, rightTopBg.height/2);
        rightTopBg.addChild(menu);

        var setting = new cc.Sprite("#shezhi_icon.png");
        setting.setAnchorPoint(0, 0.5);
        setting.setPosition(170, rightTopBg.height/2);
        setting.setScale(0.9);
        rightTopBg.addChild(setting);

        //中间
        var middleBg = new cc.Sprite("#mianban_04.png");
        middleBg.setScaleX(1);
        middleBg.setScaleY(0.8);
        middleBg.setAnchorPoint(0.5, 1);
        middleBg.setPosition(size.width/2, size.height);
        this.addChild(middleBg);

        var title = new cc.LabelTTF(args && args.title || '大同扎股子', "Arial", 34);
        title.setColor(cc.color.YELLOW);
        title.setAnchorPoint(0.5, 0);
        title.setPosition(middleBg.width/2, 30);
        middleBg.addChild(title);

        var leftIcon = new cc.Sprite("#mianban_04_2.png");
        leftIcon.setAnchorPoint(0, 1);
        leftIcon.setPosition(-10, 100);
        middleBg.addChild(leftIcon);
        var rightIcon = new cc.Sprite("#mianban_04_3.png");
        rightIcon.setAnchorPoint(1, 1);
        rightIcon.setPosition(middleBg.getContentSize().width + 12, 100);
        middleBg.addChild(rightIcon);

    },
    
    profile: function () {
        console.log('profile clicked.');
    },

    /**
     * When click the help button(?) on right side of top screen.
     */
    onHelpButton:function(){
        console.log('help.')



        //var alert = new csAlert('this is alert!', function() {
        //    this.removeFromParent();
        //});
        //
        //this.addChild(alert);


        //scene.addChild(new HelpLayer());
        //cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },

    onEnter: function () {
        this._super();
        //cc.spriteFrameCache.addSpriteFrames(res.card_plist, res.card_png);
    },

    onExit: function () {
        this._super();
        //cc.spriteFrameCache.removeSpriteFramesFromFile(res.card_plist);
    }

})