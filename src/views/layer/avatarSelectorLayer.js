var AvatarSelectorLayer = function (data) {
    return this.ctor(data);
}

AvatarSelectorLayer.prototype = {
    ctor: function () {

        this.box = new DialogSmall("选择头像", 2, {ensureCallback: this.ensureCallback, ensureLabel: '确定'}, this, 1);

        this.init();

        return this.box;

    },

    init: function () {
        var x = 250, y = 350;
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

        this.targetAvatar = gPlayer.avatar;

    },

    onAvatarSelected: function (ref, event) {
        if (event === ccui.Widget.TOUCH_ENDED) {
            playEffect(audio_common.Button_Click);

            var avatarBg = this.box.getChildByName('avatarBg');
            avatarBg.setPosition(ref.x, ref.y);

            this.targetAvatar = ref.getTag();
        }
    },

    ensureCallback: function (cb) {
        cb(true);
        if (this.targetAvatar == gPlayer.avatar) return;

        UniversalController.updateAvatar({avatar: this.targetAvatar});

    },

}