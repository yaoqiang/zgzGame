var pomelo = window.pomelo;

cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function () {
    //Storage.set(CommonConf.LOCAL_STORAGE.ENTER_BACKGROUND, (new Date()).format('yyyy-MM-dd hh:mm:ss'));
});
cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function () {

    try {
        //如果唤醒时间超过心跳超时时间, 则自动登录
        var lastHeartbeatTime = Storage.get(CommonConf.LOCAL_STORAGE.LAST_HEARTBEAT_TIME);
        var handshake = Storage.get(CommonConf.LOCAL_STORAGE.HANDSHAKE_TIME);
        var heartbeat = Storage.get(CommonConf.LOCAL_STORAGE.HANDSHAKE_HEARTBEAT);
        var now = (new Date()).format('yyyy-MM-dd hh:mm:ss');

        //每进入游戏会初始化lastHeartbeatTime为空字符串, 如果是刚进入游戏, 还没有收到过心跳,
        // 从连接时间计算,
        if (lastHeartbeatTime == '' || lastHeartbeatTime == null) {
            if (handshake == '' || handshake == null) return;
            var fromHandshake = getDateDiff(handshake, now, 'second');
            if (fromHandshake > heartbeat * 2) {
                //
                doConnectingWithBar();
            }
            return;
        }

        //唤醒时间和上次心跳时间差
        var diff = getDateDiff(lastHeartbeatTime, now, 'second');
        if (diff > heartbeat * 2) {
            //
            doConnectingWithBar();
        }
    } catch (e) {
        console.error(e);
    }


});

pomelo.on('disconnect', function (reason) {
    console.log('disconnected -> ', reason);

    if (gHasConnector) {

        //reset gHasConnector
        gHasConnector = false;
        //
        doConnectingWithBar();

    }

});

pomelo.on('close', function (reason) {
    console.log('close -> ', reason);

});

pomelo.on('onKick', function (data) {
    var msg = '您的账号在其他设备登录';
    if (data.reason == CommonConf.KICK_REASON.SERVICE_MAINTENANCE) {
        msg = '服务器正在维护...';
    }
    gHasConnector = false;
    var box = new AlertBox(msg, function () {
        if (cc.sys.os == cc.sys.ANDROID) cc.director.end();
    }, this);
    cc.director.getRunningScene().addChild(box);
});

pomelo.on('heartbeat timeout', function (data) {
    console.log('heartbeat timeout -> ', data);

    var box = new AlertBox('您的网络太差...', function () {
        doConnectingWithBar();
    }, this);
    cc.director.getRunningScene().addChild(box, 9);

})

pomelo.on('io-error', function (e) {
    console.log('io-error');
})

pomelo.on('heartbeat', function () {
    Storage.set(CommonConf.LOCAL_STORAGE.LAST_HEARTBEAT_TIME, (new Date()).format('yyyy-MM-dd hh:mm:ss'));
});

function doConnectingWithBar() {
    if (gHasConnector) return;

    var box = new AlertBox("您的网络已断开", function () {

        //
        gConnectingBar = new LoadingLayer({msg: '连接中'});
        cc.director.getRunningScene().addChild(gConnectingBar, 9);
        //
        var token = Storage.get(CommonConf.LOCAL_STORAGE.TOKEN);
        AuthController.loginWithToken(token, function () {
            if (cc.sys.isObjectValid(gConnectingBar)) {
                gConnectingBar.removeFromParent(true);
                gConnectingBar = null;
            }

        });

    }, this);

    cc.director.getRunningScene().addChild(box);

}