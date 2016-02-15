var pomelo = window.pomelo;

cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function(){
    cc.log("游戏进入后台");
});
cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function(){
    cc.log("重新返回游戏");
    //如果网络与服务器连接已断开, 则自动登录
    try {
        UniversalController.getTopOfAppReleaseRecord();
    } catch (err) {
        console.log('err = ', err);
    }


});

pomelo.on('disconnect', function(reason) {
    console.log('disconnected -> ', reason);
});

pomelo.on('close', function(reason) {
    console.log('close -> ', reason);
});

pomelo.on('onKick', function (data) {
    this.addChild(new AlertBox('哎呀,您的账号在其他设备登录...', function () {

    }, this));
});

pomelo.on('heartbeat timeout', function (data) {
    console.log('heartbeat timeout -> ', data);

    this.addChild(new AlertBox('哎呀,您的网络太差...', function () {

    }, this));

})

pomelo.on('io-error', function (e) {
    console.log('io-error');
})