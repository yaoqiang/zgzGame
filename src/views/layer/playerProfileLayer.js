var PlayerProfileLayer = function () {
    return this.ctor();
}

PlayerProfileLayer.prototype = {
    ctor: function (args) {

        var winSize = cc.director.getWinSize();

        //this.data = args.data;

        this.box = new DialogSmall('玩家信息', 1, null);

        var boxSize = this.box.bg.getBoundingBox();

        //init
        this.init();

        return this.box;
    },

    init: function () {
        var infoX = 200;


    }
}