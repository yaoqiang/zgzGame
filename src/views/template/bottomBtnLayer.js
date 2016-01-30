var BottomBtnLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();

        this.lobbyId = args.lobbyId;

        var taskMenuItem = new cc.MenuItemImage("#index_renwu.png", "#index_renwu.png", this.onTaskBtnClick, this);
        taskMenuItem.setPosition(120, 25);
        var rankMenuItem = new cc.MenuItemImage("#index_paihang.png", "#index_paihang.png", this.onRankingBtnClick, this);
        rankMenuItem.setPosition(240, 25);
        var exchangeMenuItem = new cc.MenuItemImage("#index_duihuan.png", "#index_duihuan.png", this.onExchangeBtnClick, this);
        exchangeMenuItem.setPosition(360, 25);
        var messageMenuItem = new cc.MenuItemImage("#index_tongzhi.png", "#index_tongzhi.png", this.onMessageBtnClick, this);
        messageMenuItem.setPosition(480, 25);

        var menu = new cc.Menu(taskMenuItem, rankMenuItem, exchangeMenuItem, messageMenuItem);
        menu.setPosition(0, 0);
        //
        this.addChild(menu);

    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    },

    onTaskBtnClick: function () {
        var scene = new TaskScene({selected: 0, lobbyId: this.lobbyId});
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },

    onRankingBtnClick: function () {
        var scene = new RankingListScene({selected: 0, lobbyId: this.lobbyId});
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },

    onExchangeBtnClick: function () {

    },

    onMessageBtnClick: function () {

    }
})