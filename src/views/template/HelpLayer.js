var HelpLayer = cc.Layer.extend({
    ctor: function(args) {
        this._super();
        var size = cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.game_plist, res.game_png);

        //background
        var bg = new cc.Sprite("#beijing.png");
        bg.setPosition(cc.p(size.width/2, size.height/2));
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        // left top header
        var leftTopBg = cc.Scale9Sprite.createWithSpriteFrameName("mianban_01.png", cc.rect(17, 14, 27, 26));
        leftTopBg.setPosition(0, size.height);
        leftTopBg.setAnchorPoint(cc.p(0, 1));
        leftTopBg.setContentSize(cc.size(250, 80));
        this.addChild(leftTopBg);

        // create back button sprite
        var backNormal = new cc.Sprite("#jianou.png");
        backNormal.attr({scale:0.9});
        var backSelected = new cc.Sprite("#jianou.png");
        backSelected.attr({scale:1});
        var backDisabled = new cc.Sprite("#jianou.png");

        // create back button
        var backButton = new cc.MenuItemSprite(backNormal, backSelected, backDisabled, this.onBackCallback, this);

        var menu = new cc.Menu(backButton);
        menu.attr({x:35, y:45});
        leftTopBg.addChild(menu);

        var help = new cc.LabelTTF("大同扎投子游戏说明", "Arial", 21, 10 );
        help.attr({
            x: 200,
            y: size.height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        help.setColor(cc.color.YELLOW);
        this.addChild(help);



    },

    /**
     * Return to previous scene,
     * @param pSender
     */
    onBackCallback:function (pSender) {
        var scene = new IndexScene();
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }
});