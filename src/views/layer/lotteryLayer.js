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

        var x = 300, y = 350;
        for (var i = 0; i < avatars.length; i++) {
            if (i % 5 == 0) {
                x = 250;
                y -= 75;
            }

            var avatarBtn = new ccui.Button();
            avatarBtn.setAnchorPoint(0.5, 0.5);
            avatarBtn.setTouchEnabled(true);
            avatarBtn.loadTextures(utils.getAvatarForButton(i), utils.getAvatarForButton(i), utils.getAvatarForButton(i), ccui.Widget.PLIST_TEXTURE);
            avatarBtn.addTouchEventListener(this.onAvatarSelected, this);
            avatarBtn.setTag(i);
            avatarBtn.x = x;
            avatarBtn.y = y;
            avatarBtn.scale = 0.6;

            this.box.addChild(avatarBtn, 2);

            x += 75;
        }
        var current = this.box.getChildByTag(gPlayer.avatar);
        var avatarBg = new cc.Sprite("#profile_touxiang_xuanzekuang.png");
        avatarBg.setPosition(current.x, current.y);
        avatarBg.scale = 0.8
        avatarBg.setName('avatarBg');
        this.box.addChild(avatarBg);


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