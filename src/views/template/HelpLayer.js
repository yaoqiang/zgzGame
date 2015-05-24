var HelpLayer = cc.Layer.extend({
    ctor: function(args) {
        this._super();
        var size = cc.director.getWinSize();

        //background
        var bg = cc.Sprite.create("#beijing.png");
        bg.setPosition(cc.p(size.width/2, size.height/2));
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        var help = new cc.LabelTTF("大同扎投子游戏说明", "Arial", 21, 10 );
        help.attr({
            x: 200,
            y: size.height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        help.setColor(cc.color.YELLOW);
        this.addChild(help);

        var label = new cc.LabelTTF("返回", "Arial", 21);
        label.setColor(cc.color.YELLOW);
        var back = new cc.MenuItemLabel(label, this.onBackCallback);
        var menu = new cc.Menu(back);
        menu.x = size.width / 2;
        menu.y = 60;
        this.addChild(menu);

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