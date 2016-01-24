var BottomBtnLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var taskMenuItem = new cc.MenuItemImage("#index_renwu.png", "#index_renwu.png", this.onTaskBtnClick, this);
        taskMenuItem.setPosition(120, 25);
        var rankMenuItem = new cc.MenuItemImage("#index_paihang.png", "#index_paihang.png", this.onRankBtnClick, this);
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

    },

    onRankBtnClick: function () {

    },

    onExchangeBtnClick: function () {

    },

    onMessageBtnClick: function () {

    }
})