var HeaderLayer = cc.Layer.extend({
    ctor: function(args){
        this._super();


        var size = cc.director.getWinSize();

        //左侧
        var leftTopBg = cc.Scale9Sprite.createWithSpriteFrameName("mianban_01.png", cc.rect(17, 14, 27, 26));
        leftTopBg.setPosition(0, size.height);
        leftTopBg.setAnchorPoint(cc.p(0, 1));
        leftTopBg.setContentSize(cc.size(250, 80));
        this.addChild(leftTopBg);

        var avatarBg = cc.Sprite.create("#touxiangkuang_index.png");
        avatarBg.setScale(0.65);
        avatarBg.setAnchorPoint(cc.p(0, 1));
        avatarBg.setPosition(15, 70);
        leftTopBg.addChild(avatarBg);

        var avatar = cc.MenuItemSprite.create(
            cc.Sprite.create(utils.getAvatar(gPlayer.avatar)),
            cc.Sprite.create(utils.getAvatar(gPlayer.avatar)),
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

        var goldIcon = cc.Sprite.create("#additional_coins.png");
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

        var shoppingCar = cc.Sprite.create("#shangcheng_icon.png");
        shoppingCar.setAnchorPoint(cc.p(0, 0.5));
        shoppingCar.setPosition(30, rightTopBg.height/2);
        shoppingCar.setScale(0.9);
        rightTopBg.addChild(shoppingCar);

        var help = cc.Sprite.create("#wenhao.png");
        help.setAnchorPoint(cc.p(0, 0.5));
        help.setPosition(100, rightTopBg.height/2);
        help.setScale(0.9);
        rightTopBg.addChild(help);

        var setting = cc.Sprite.create("#shezhi_icon.png");
        setting.setAnchorPoint(cc.p(0, 0.5));
        setting.setPosition(170, rightTopBg.height/2);
        setting.setScale(0.9);
        rightTopBg.addChild(setting);


        //中间
        var middleBg = cc.Sprite.create("#mianban_04.png");
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
        console.log('profile clicked.');
    }
})