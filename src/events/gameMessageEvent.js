var pomelo = window.pomelo;

pomelo.on('onJoin', function (data) {
    console.log('receive join event.');
    console.log(data);

    cc.eventManager.dispatchCustomEvent("JoinEvent", data);

});

pomelo.on('onLeave', function (data) {
    console.log('---->receive onLeave event.');
    console.log(data);

    cc.eventManager.dispatchCustomEvent("LeaveEvent", data);
});

pomelo.on('onReady', function (data) {
    console.log('receive onReady event.');
    cc.eventManager.dispatchCustomEvent("ReadyEvent", data);
});

pomelo.on('onTalk', function (data) {
    console.log('receive onTalk event.');
});

pomelo.on('onGameStart', function (data) {
    console.log('receive onGameStart event.');
    console.log(data);
    cc.eventManager.dispatchCustomEvent("GameStartEvent", data);
});

pomelo.on('onDeal', function (data) {
    console.log('receive onDeal event.');
});

pomelo.on('onFanOut', function (data) {
    console.log('receive onFanOut event.');
});

pomelo.on('onChat', function (data) {
    console.log('receive onChat event.');
});

pomelo.on('onBroadcast', function (data) {
    console.log('receive onBroadcast event.');
});

pomelo.on('onGoldChange', function (data) {
    console.log('receive onGoldChange event.');
});


pomelo.on('disconnect', function(reason) {
    console.log('disconnected..');
    console.log(reason);
});

pomelo.on('onKick', function (data) {
    console.log('onKick..');
    console.log(data);
});