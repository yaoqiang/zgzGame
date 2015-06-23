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



pomelo.on('onStart', function (data) {
    console.log('receive onStart event.');
    console.log(data);
    cc.eventManager.dispatchCustomEvent("GameStartEvent", data);
});

pomelo.on('onTalkCountdown', function (data) {
    console.log('receive onTalkCountdown event.');
});

pomelo.on('onTalkTimeout', function (data) {
    console.log('onTalkTimeout.');
});

pomelo.on('onTalk', function (data) {
    console.log('receive onTalk event.');
});

pomelo.on('onFanCountdown', function (data) {
    console.log('receive onFanCountdown event.');
});

pomelo.on('onFanTimeout', function (data) {
    console.log('onFanTimeout.');
});

pomelo.on('onFan', function (data) {
    console.log('receive onTalk event.');
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