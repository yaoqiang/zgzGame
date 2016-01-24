var pomelo = window.pomelo;

var UniversalController = function()
{

}

UniversalController.enterIndex = function () {
    pomelo.request(route.enterIndex, {}, function (lobbyData) {
        var indexScene = new IndexScene(lobbyData.onlineLobby);
        cc.director.runScene(new cc.TransitionFade(1.2, indexScene));
    });
}

UniversalController.updateProfile = function (nickName, gender, avatar) {

    if (nickName.length < 2 || nickName.length > 6) {
        prompt.fadeMiddle('修改失败, 昵称2-6位', 3);
        return;
    }

    pomelo.request(route.updateProfile, {nickName: nickName, gender: gender, avatar: avatar}, function (data) {
        if (data.code == 200) {
            gPlayer.nickName = nickName;
            gPlayer.gender = gender;
            gPlayer.avatar = avatar;

            prompt.fadeMiddle('修改成功');

            //var alert = new AlertBox("修改成功", null, null);
        } else if (data.code == 500) {

            prompt.fadeMiddle(ERR_MESSAGE.getMessage(data.err), 3);
            //var alert = new AlertBox(ERR_MESSAGE.getMessage(data.err), null, null);
        }

    });
}
