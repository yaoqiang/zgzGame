var pomelo = window.pomelo;

pomelo.on('onJoin', function (data) {
    console.log('receive join event.');
    console.log(data);

    cc.eventManager.dispatchCustomEvent("join", data);

});

pomelo.on('disconnect', function(reason) {
    console.log('disconnected..');
    console.log(reason);
});

pomelo.on('onKick', function (data) {
    console.log('onKick..');
    console.log(data);
});