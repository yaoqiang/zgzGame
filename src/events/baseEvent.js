var pomelo = window.pomelo;

cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function(){
    cc.log("游戏进入后台");
});
cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function(){
    cc.log("重新返回游戏");
    //如果网络与服务器连接已断开, 则自动登录, 目前处理方式有问题,
    // gNetworkState会在连接GameServer前, 断开gate server时被设置为1;
    if (gNetworkState == 1) {
        //TODO 暂时这么处理
        //prompt.fadeMiddle("您已断开连接, 请重新登录");
    }
});

pomelo.on('disconnect', function(reason) {
    console.log('disconnected -> ', reason);
    gNetworkState = 1;
});

pomelo.on('close', function(reason) {
    console.log('close -> ', reason);
    gNetworkState = 1;
});

pomelo.on('onKick', function (data) {
    console.log('onKick -> ', data);
    gNetworkState = 1;
});

pomelo.on('heartbeat timeout', function (data) {
    console.log('heartbeat timeout -> ', data);
    gNetworkState = 1;
})

pomelo.on('io-error', function (e) {
    console.log('io-error');
    gNetworkState = 1;
})