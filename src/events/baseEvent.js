var pomelo = window.pomelo;

cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function(){
    cc.log("游戏进入后台");
});
cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function(){
    cc.log("重新返回游戏");
    //如果网络与服务器连接已断开, 则自动登录
    try {
        pomelo.request(route.ping, function (data) {

        })
    } catch (err) {
        var loadingBar = new LoadingLayer({msg: '连接中'});
        var token = Storage.get(CommonConf.LOCAL_STORAGE.TOKEN);
        AuthController.loginWithToken(token, function () {
            loadingBar.removeFromParent(true);
        });
    }

});

pomelo.on('disconnect', function(reason) {
    console.log('disconnected -> ', reason);
});

pomelo.on('close', function(reason) {
    console.log('close -> ', reason);
    if (reason.code > 1000) {
        var loadingBar = new LoadingLayer({msg: '连接中'});
        cc.director.getRunningScene().addChild(loadingBar, 9);

        //
        var token = Storage.get(CommonConf.LOCAL_STORAGE.TOKEN);
        AuthController.loginWithToken(token, function () {
            loadingBar.removeFromParent(true);
        });
    }
});

pomelo.on('onKick', function (data) {
    var msg = '哎呀,您的账号在其他设备登录...';
    if (data.reason == CommonConf.KICK_REASON.SERVICE_MAINTENANCE) {
        msg = '服务器正在维护...';
    }
    var box = new AlertBox(msg, function () {
        cc.director.end();
    }, this);
    cc.director.getRunningScene().addChild(box);
});

pomelo.on('heartbeat timeout', function (data) {
    console.log('heartbeat timeout -> ', data);

    var box = new AlertBox('哎呀, 您的网络太差...', function () {
        //
        var loadingBar = new LoadingLayer({msg: '连接中'});
        var token = Storage.get(CommonConf.LOCAL_STORAGE.TOKEN);
        AuthController.loginWithToken(token, function () {
            loadingBar.removeFromParent(true);
        });
    }, this);
    cc.director.getRunningScene().addChild(box, 9);

})

pomelo.on('io-error', function (e) {
    console.log('io-error');
})