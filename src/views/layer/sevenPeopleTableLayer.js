var SevenPeopleTableLayer = cc.Layer.extend({
    ctor: function(args){
        this._super();
        var size = cc.director.getWinSize();
        //左侧
        var leftTopBg = cc.Scale9Sprite.createWithSpriteFrameName("mianban_01.png", cc.rect(17, 14, 27, 26));
        leftTopBg.setPosition(0, size.height);
        leftTopBg.setAnchorPoint(cc.p(0, 1));
        leftTopBg.setContentSize(cc.size(250, 80));
        this.addChild(leftTopBg);

        var avatarBg = new cc.Sprite("#touxiangkuang_index.png");
        avatarBg.setScale(0.65);
        avatarBg.setAnchorPoint(cc.p(0, 1));
        avatarBg.setPosition(15, 70);
        leftTopBg.addChild(avatarBg);

        var avatar = new cc.MenuItemSprite(
            new cc.Sprite(utils.getAvatar(gPlayer.avatar)),
            new cc.Sprite(utils.getAvatar(gPlayer.avatar)),
            this.profile,
            this
        );

        var avatarMenu = cc.Menu.create(avatar);
        avatarMenu.setPosition(-18, 8);
        avatarMenu.setScale(0.85);
        avatarBg.addChild(avatarMenu);

        var nickBg = cc.Scale9Sprite.createWithSpriteFrameName("shuzidikuang.png", cc.rect(6, 5, 11, 7));
        nickBg.setAnchorPoint(cc.p(0, 1));
        nickBg.setContentSize(cc.size(130, 25));
        nickBg.setPosition(86, 70);
        leftTopBg.addChild(nickBg);

        var nickName = cc.LabelTTF.create(gPlayer.nickName || '扎股子用户', "Arial", 14);
        nickName.setPosition(110, 10);
        nickName.setAnchorPoint(cc.p(1, 0.5));
        nickBg.addChild(nickName);

        var goldBg = cc.Scale9Sprite.createWithSpriteFrameName("shuzidikuang.png", cc.rect(6, 5, 11, 7));
        goldBg.setAnchorPoint(cc.p(0, 1));
        goldBg.setContentSize(cc.size(130, 25));
        goldBg.setPosition(86, 40);
        leftTopBg.addChild(goldBg);

        var gold = cc.LabelTTF.create(gPlayer.gold || '1234657', "Arial", 14);
        gold.setColor(cc.color.YELLOW);
        gold.setAnchorPoint(cc.p(1, 0.5));
        gold.setPosition(110, 10);
        goldBg.addChild(gold);

        var goldIcon = new cc.Sprite("#additional_coins.png");
        goldIcon.setScale(0.5);
        goldIcon.setAnchorPoint(cc.p(0, 1));
        goldIcon.setPosition(0-5, 28);
        goldBg.addChild(goldIcon);



        //右上侧
        var rightTopBg = cc.Scale9Sprite.createWithSpriteFrameName("mianban_01.png", cc.rect(17, 14, 27, 26));
        rightTopBg.setPosition(size.width, size.height);
        rightTopBg.setAnchorPoint(cc.p(1, 1));
        rightTopBg.setContentSize(cc.size(250, 80));
        this.addChild(rightTopBg);

        var shoppingCar = new cc.Sprite("#shangcheng_icon.png");
        shoppingCar.setAnchorPoint(cc.p(0, 0.5));
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
        setting.setAnchorPoint(cc.p(0, 0.5));
        setting.setPosition(170, rightTopBg.height/2);
        setting.setScale(0.9);
        rightTopBg.addChild(setting);

        //中间
        var middleBg = new cc.Sprite("#mianban_04.png");
        middleBg.setScaleX(1);
        middleBg.setScaleY(0.8);
        middleBg.setAnchorPoint(cc.p(0.5, 1));
        middleBg.setPosition(size.width/2, size.height);
        this.addChild(middleBg);

        var title = new cc.LabelTTF(args && args.title || '大同扎股子', "Arial", 34);
        title.setColor(cc.color.YELLOW);
        title.setAnchorPoint(cc.p(0.5, 0));
        title.setPosition(cc.p(middleBg.width/2, 30));
        middleBg.addChild(title);
    },
    
    profile: function () {
        //console.log('profile clicked.');
    },

    /**
     * When click the help button(?) on right side of top screen.
     */
    onHelpButton:function(){
        var scene = new cc.Scene();
        scene.addChild(new HelpLayer());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }

})