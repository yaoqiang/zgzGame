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
    //赋值当前玩家actor全局变量
    gActor.actorNr = data.actor.actorNr;
    gActor.uid = data.actor.uid;
    gActor.cards = data.actor.gameStatus.currentHoldingCards;
    cc.eventManager.dispatchCustomEvent("GameStartEvent", data);
});

pomelo.on('onTalkCountdown', function (data) {
    console.log('receive onTalkCountdown event.', data);

    console.log('data.actor.uid + gPlayer.uid => ', data.actor.uid, gPlayer.uid);
    console.log('data.actor.uid == gPlayer.uid => ', data.actor.uid == gPlayer.uid);
    cc.eventManager.dispatchCustomEvent("onTalkCountdownEvent", data);


});

/**
 * 说话超时，代表没说话，UI逻辑倒计时结束，当前说话玩家面前Talk Menu消失;其他玩家UI显示当前玩家倒计时icon结束；
 * 服务器端会触发下一个talkCountdown事件，如果说话结束，会触发出牌onFanCountdown，如果没人说话，会重新开始onStart
 */
pomelo.on('onTalkTimeout', function (data) {
    console.log('onTalkTimeout.', data);

});

/**
 * 接收说话消息，处理说话成功UI逻辑；自己说话通过response响应
 */
pomelo.on('onTalk', function (data) {
    console.log('receive onTalk event.', data);
    //goal=说话结果（参考consts.GAME.IDENTITY)；append=说话时亮3情况，数组里放牌号；share=股子数

    cc.eventManager.dispatchCustomEvent("TalkEvent", data);
});

/**
 * 接收说话消息，说话阶段结束
 */
pomelo.on('onAfterTalk', function (data) {
    console.log('receive onAfterTalk event.', data);
    //goal=说话结果（参考consts.GAME.IDENTITY)；append=说话时亮3情况，数组里放牌号；share=股子数

    cc.eventManager.dispatchCustomEvent("AfterTalk", data);
});

/**
 * 出牌倒计时，
 */
pomelo.on('onFanCountdown', function (data) {
    console.log('receive onFanCountdown event.', data);
    console.log('lastFanCardRecognization:.', data.lastFanCardRecognization);
    gActor.isBoss = data.isBoss;

    //如果当前出牌玩家是上回合BOSS，则禁用或不显示“不出”按钮
    if (data.actor.uid == gPlayer.uid && data.isBoss) {

    }
    //actor: {uid: xx, actorNr: xx},isBoss: true/false（是否当前回合BOSS）,
    //lastFanCardRecognization: utils.cards.CardRecognization (上手牌型，如果是第一个出牌，则是null）, second: 倒计时时间
    cc.eventManager.dispatchCustomEvent("FanCountdownEvent", data);
});

//pomelo.on('onFanTimeout', function (data) {
//    console.log('onFanTimeout.');
//});

/**
 * 出牌消息，出牌者出牌时发送给其他玩家接受的消息；当前出牌者通过request/response得到出牌响应(gameController.fan)
 */
pomelo.on('onFan', function (data) {
    console.log('receive onFan event.', data);
    //如果有出牌，则设置全局变量上手牌型
    if (data.cardRecognization) {
        gLastFanCardRecognization = data.cardRecognization;
    }
    cc.eventManager.dispatchCustomEvent("FanOutEvent", data);
    //actor: {uid: xx, actorNr: xx},
    //cardRecognization: utils.cards.CardRecognization (当前出牌牌型）, cards: 出牌，数组[]，为空时为不出

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