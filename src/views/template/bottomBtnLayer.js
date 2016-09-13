var BottomBtnLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();

        this.lobbyId = args.lobbyId;

        var winSize = cc.director.getWinSize();


        var shopMenuItem = new cc.MenuItemImage("#bt_market.png", "#bt_market.png", this.onShopButton, this);
        shopMenuItem.setPosition(120, 35);
        shopMenuItem.scale = 0.6;
        var shopWords = new cc.Sprite('#words_market.png');
        shopWords.setAnchorPoint(0, 0.5);
        shopWords.setPosition(shopMenuItem.getContentSize().width, shopMenuItem.getContentSize().height / 2);
        shopMenuItem.addChild(shopWords);

        var rankMenuItem = new cc.MenuItemImage("#index_paihang_icon.png", "#index_paihang_icon.png", this.onRankingBtnClick, this);
        rankMenuItem.setPosition(240, 35);
        rankMenuItem.scale = 0.6;
        var rankingWords = new cc.Sprite('#words_ranking.png');
        rankingWords.setAnchorPoint(0, 0.5);
        rankingWords.setPosition(rankMenuItem.getContentSize().width, rankMenuItem.getContentSize().height / 2);
        rankMenuItem.addChild(rankingWords);


        var taskMenuItem = new cc.MenuItemImage("#bt_task.png", "#bt_task.png", this.onTaskBtnClick, this);
        taskMenuItem.setPosition(360, 35);

        taskMenuItem.scale = 0.6;
        var taskWords = new cc.Sprite('#words_task.png');
        taskWords.setAnchorPoint(0, 0.5);
        taskWords.setPosition(taskMenuItem.getContentSize().width - 20, taskMenuItem.getContentSize().height / 2);
        taskMenuItem.addChild(taskWords);


        var exchangeMenuItem = new cc.MenuItemImage("#three_exchange.png", "#three_exchange.png", this.onExchangeBtnClick, this);
        exchangeMenuItem.scale = 0.6;
        exchangeMenuItem.setPosition(500, 35);


        var lotteryMenuItem = new cc.MenuItemImage("res/images/ic_hall_choujiang.png", "res/images/ic_hall_choujiang.png", this.onLotteryBtnClick, this);
        lotteryMenuItem.scale = 0.75;
        lotteryMenuItem.setPosition(750, 35);

        var lotteryBg = new cc.Sprite('res/images/common/light2.png');
        lotteryBg.scale = 0.65;
        lotteryBg.setPosition(750, 35);
        this.addChild(lotteryBg);

        var action = cc.rotateTo(2, 720).repeatForever().speed(1);
        lotteryBg.runAction(action);

        var menu = new cc.Menu(shopMenuItem, rankMenuItem, taskMenuItem, exchangeMenuItem, lotteryMenuItem);
        menu.setPosition(0, 0);
        //
        this.addChild(menu, 1);

    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    },

    onTaskBtnClick: function () {
        // playEffect(audio_common.Button_Click);
        var scene = new TaskScene({selected: 0, lobbyId: this.lobbyId});
        //cc.director.runScene(new cc.TransitionFade(1.2, scene));
        cc.director.runScene(scene);
    },

    onRankingBtnClick: function () {
        // playEffect(audio_common.Button_Click);
        var scene = new RankingListScene({selected: 0, lobbyId: this.lobbyId});
        //cc.director.runScene(new cc.TransitionFade(1.2, scene));
        cc.director.runScene(scene);
    },

    onExchangeBtnClick: function () {
        //playEffect(audio_common.Button_Click);
        var scene = new ExchangeScene({selected: 0, lobbyId: this.lobbyId});
        //cc.director.runScene(new cc.TransitionFade(1.2, scene));
        cc.director.runScene(scene);
    },

    onShopButton: function () {
        var scene = new ShopScene({selected: 0, lobbyId: this.lobbyId});
        cc.director.runScene(scene);
    },

    onLotteryBtnClick: function () {
        playEffect(audio_common.Button_Click);

        try {

            UniversalController.getLotteryItemList(function (data) {
                var params = {};
                params.lotteryItemList = data.lotteryItemList;
                UniversalController.getLotteryCard(function (data) {
                    params.lotteryCard = data.item === undefined ? 0 : data.item.value;
                    params.capital = data.capital;
                    var lotteryLayer = new LotteryLayer(params);
                    cc.director.getRunningScene().addChild(lotteryLayer, 20);
                })
            })
        } catch (e) {
            prompt.fadeMiddle('抽奖暂时不可用, 请稍后重试!');
        }


    },

})