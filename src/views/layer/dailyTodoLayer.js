var DailyTodoLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();


        var box = new DialogWithMode('每日必做');



        this.addChild(box);

    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    }


})