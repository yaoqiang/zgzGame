var QuestionsScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.game_plist, res.game_png);
        cc.spriteFrameCache.addSpriteFrames(res.login_plist, res.login_png);
        cc.spriteFrameCache.addSpriteFrames(res.common_plist, res.common_png);

        var layer = new QuestionsLayer();
        this.addChild(layer);
    }

});

var QuestionsLayer = cc.Layer.extend({

    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        //background
        var bg = new cc.Sprite("#mianban.png");
        bg.setPosition(cc.p(size.width/2, size.height/2));
        bg.scale = 1.2;
        this.addChild(bg);

        // create back button sprite
        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(18);
        var view = new cc.MenuItemFont("返回");
        view.attr({x:-5,y:-1});

        var backNormal = new cc.Sprite(res.anniu_png);
        backNormal.attr({scale:0.9});
        var backSelected = new cc.Sprite(res.anniu_png);
        backSelected.attr({scale:0.9});
        var backDisabled = new cc.Sprite(res.anniu_png);

        // create back button
        var backButton = new cc.MenuItemSprite(backNormal, backSelected, backDisabled, this.onBackCallback, this);
        var HeaderMenu = new cc.Menu(backButton);
        HeaderMenu.attr({x:80, y:size.height - 50});
        HeaderMenu.addChild(view);
        this.addChild(HeaderMenu);

        var title = new cc.LabelTTF("常见问题", "Arial", 21, 10 );
        title.attr({x: size.width / 2,y: size.height / 2 + 150,anchorX: 0.5,anchorY: 0.5});
        this.addChild(title);

        // Create the scrollview
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setTouchEnabled(true);
        scrollView.setContentSize(cc.size(800, 320));
        scrollView.setBackGroundColor(cc.color.YELLOW);
        scrollView.x = 0;
        scrollView.y = 30;


        var imageView = new ccui.ImageView();
        imageView.loadTexture("res/anniu.png");

        var innerWidth = scrollView.width;
        var innerHeight = scrollView.height + imageView.height;

        scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));

        this.addChild(scrollView);

        var text = new ccui.Text("1. 如何领取神秘金币","AmericanTypewriter",24);
        text.ignoreContentAdaptWithSize(false);
        text.setColor(cc.color.YELLOW);
        text.setContentSize(cc.size(700, 100));
        text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        text.x =400;
        text.y =300;
        scrollView.addChild(text);

        var text1 = new ccui.Text("当您进入游戏房间内进行游戏，神秘宝箱便开始倒计时。如果已经达到开启神秘宝箱的时间，则点击宝箱即可领取奖励。游戏玩得越久，每天点开宝箱的次数越多，奖励越丰厚。","AmericanTypewriter",22);
        text1.ignoreContentAdaptWithSize(false);
        text1.setContentSize(cc.size(700, 100));
        text1.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        text1.x = 400;
        text1.y = text.y -30;
        scrollView.addChild(text1);

        var text2 = new ccui.Text("2. 任务奖励怎么领?","AmericanTypewriter",24);
        text2.ignoreContentAdaptWithSize(false);
        text2.setColor(cc.color.YELLOW);
        text2.setContentSize(cc.size(700, 100));
        text2.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        text2.x =400;
        text2.y =text1.y -120;
        scrollView.addChild(text2);

        var text3 = new ccui.Text("当您完成个人任务后，返回游戏大厅点击任务按钮，选择已完成任务标签，点击领取即可获得游戏金币奖励。","AmericanTypewriter",22);
        text3.ignoreContentAdaptWithSize(false);
        text3.setContentSize(cc.size(700, 100));
        text3.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        text3.x = 400;
        text3.y = text2.y -30;
        scrollView.addChild(text3);

    },

    /**
     * Return to previous scene,
     * @param pSender
     */
    onBackCallback:function (pSender) {
        var scene = new cc.Scene();
        scene.addChild(new HelpLayer());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }

 });