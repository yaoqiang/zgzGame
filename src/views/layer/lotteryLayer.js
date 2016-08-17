var LotteryLayer = function (data) {
    return this.ctor(data);
}

LotteryLayer.prototype = {
    ctor: function (data) {

        var winSize = cc.director.getWinSize();
        this.data = data;

        this.box = new DialogMiddle('', 1, null);


        //init
        this.init();

        return this.box;
    },

    init: function () {


    },

    lotteryBtnClicked: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;

            case ccui.Widget.TOUCH_MOVED:
                break;

            case ccui.Widget.TOUCH_ENDED:



                playEffect(audio_common.Button_Click);


                break;

            case ccui.Widget.TOUCH_CANCELED:
                break;

            default:
                break;
        }
    }
}