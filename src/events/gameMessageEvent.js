var pomelo = window.pomelo;

pomelo.on('onJoin', function (data) {
    console.log('receive join event.');
    console.log(data);

    cc.eventManager.dispatchCustomEvent("onJoin", data);

});

pomelo.on('onLeave', function () {

});

pomelo.on('onReady', function () {

});

pomelo.on('onTalk', function () {

});

pomelo.on('onGameStart', function () {

});

pomelo.on('onDeal', function () {

});

pomelo.on('onFanOut', function () {

});

pomelo.on('onChat', function () {

});

pomelo.on('onBroadcast', function () {

});

pomelo.on('onGoldChange', function (data) {

});


pomelo.on('disconnect', function(reason) {
    console.log('disconnected..');
    console.log(reason);
});

pomelo.on('onKick', function (data) {
    console.log('onKick..');
    console.log(data);
});