var SpeedRechargeLayer = function (data) {
    return this.ctor(data);
}

SpeedRechargeLayer.prototype = {
    ctor: function (data) {

        var winSize = cc.director.getWinSize();
        this.data = data;

        this.box = new DialogSmall('', 1, null);


        //init
        this.init();

        return this.box;
    },

    init: function () {


    },

    rechargeBtnClicked: function (sender, type) {
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