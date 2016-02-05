var pomelo = window.pomelo;

pomelo.on(gameEvents.JOIN, function (data) {
    console.log('receive join event -> ', data);

    EventBus.publish(gameEvents.JOIN, data);
    //EventQueue.dispatchCustomEvent("joinEvent", data);
});

pomelo.on(gameEvents.LEAVE, function (data) {
    console.log('receive onLeave event -> ', data);

    EventBus.publish(gameEvents.LEAVE, data);
    //EventQueue.dispatchCustomEvent("leaveEvent", data);
});

pomelo.on(gameEvents.READY, function (data) {
    console.log('receive onReady event ->', data);
    EventBus.publish(gameEvents.READY, data);
    //EventQueue.dispatchCustomEvent("readyEvent", data);
});



pomelo.on(gameEvents.START, function (data) {
    console.log('receive onStart event -> ', data);
    //赋值当前玩家actor全局变量
    gActor.actorNr = data.actor.actorNr;
    gActor.uid = data.actor.uid;
    gActor.cards = data.actor.gameStatus.currentHoldingCards;
    EventBus.publish(gameEvents.START, data);
    //EventQueue.dispatchCustomEvent("gameStartEvent", data);
});

pomelo.on(gameEvents.TALK_COUNTDOWN, function (data) {
    console.log('receive onTalkCountdown event -> ', data);

    EventBus.publish(gameEvents.TALK_COUNTDOWN, data);
    //EventQueue.dispatchCustomEvent("talkCountdownEvent", data);
});

/**
 * 说话超时，代表没说话，UI逻辑倒计时结束，当前说话玩家面前Talk Menu消失;其他玩家UI显示当前玩家倒计时icon结束；
 * 服务器端会触发下一个talkCountdown事件，如果说话结束，会触发出牌onFanCountdown，如果没人说话，会重新开始onStart
 *
 * 注:现在不在接受此消息, 由服务器直接处理说话消息, 即发送超时说话玩家为没话
 */
pomelo.on(gameEvents.TALK_COUNTDOWN_TIMEOUT, function (data) {
    //console.log('onTalkTimeout -> ', data);

});

/**
 * 接收说话消息，处理说话成功UI逻辑；自己说话通过response响应
 */
pomelo.on(gameEvents.TALK, function (data) {
    console.log('receive onTalk event -> ', data);
    //goal=说话结果（参考consts.GAME.IDENTITY)；append=说话时亮3情况，数组里放牌号；share=股子数

    EventBus.publish(gameEvents.TALK, data);
    //EventQueue.dispatchCustomEvent("talkEvent", data);
});

/**
 * 接收说话消息，说话阶段结束
 */
pomelo.on(gameEvents.AFTER_TALK, function (data) {
    console.log('receive onAfterTalk event -> ', data);
    //goal=说话结果（参考consts.GAME.IDENTITY)；append=说话时亮3情况，数组里放牌号；share=股子数

    EventBus.publish(gameEvents.AFTER_TALK, data);
    //EventQueue.dispatchCustomEvent("afterTalk", data);
});

/**
 * 出牌倒计时，
 */
pomelo.on(gameEvents.FAN_COUNTDOWN, function (data) {
    //console.log('receive onFanCountdown event -> ', data);
    gActor.isBoss = data.isBoss;

    //如果当前出牌玩家是上回合BOSS，则禁用或不显示“不出”按钮
    if (data.actor.uid == gPlayer.uid && data.isBoss) {

    }
    //actor: {uid: xx, actorNr: xx},isBoss: true/false（是否当前回合BOSS）,
    //lastFanCardRecognization: utils.cards.CardRecognization (上手牌型，如果是第一个出牌，则是null）, second: 倒计时时间
    EventBus.publish(gameEvents.FAN_COUNTDOWN, data);
    //EventQueue.dispatchCustomEvent("fanCountdownEvent", data);
});

//pomelo.on('onFanTimeout', function (data) {
//    console.log('onFanTimeout.');
//});

/**
 * 出牌消息，出牌者出牌时发送给其他玩家接受的消息；当前出牌者通过request/response得到出牌响应(gameController.fan)
 */
pomelo.on(gameEvents.FAN, function (data) {
    //console.log('receive onFan event -> ', data);
    //如果有出牌，则设置全局变量上手牌型
    if (data.cardRecognization) {
        gLastFanCardRecognization = data.cardRecognization;
    }
    EventBus.publish(gameEvents.FAN, data);
    //EventQueue.dispatchCustomEvent("fanOutEvent", data);
    //actor: {uid: xx, actorNr: xx},
    //cardRecognization: utils.cards.CardRecognization (当前出牌牌型）, cards: 出牌，数组[]，为空时为不出

});

/**
 * 托管
 * {actor: {uid: xx, actorNr: xx}}
 */
pomelo.on(gameEvents.TRUSTEESHIP, function (data) {
    console.log('receive onTrusteeship event -> ', data);
    EventBus.publish(gameEvents.TRUSTEESHIP, data);
    //EventQueue.dispatchCustomEvent("trusteeshipEvent", data);
});

/**
 * 取消托管
 * {actor: {uid: xx, actorNr: xx}}
 */
pomelo.on(gameEvents.CANCEL_TRUSTEESHIP, function (data) {
    console.log('receive onCancelTrusteeship event -> ', data);
    EventBus.publish(gameEvents.CANCEL_TRUSTEESHIP, data);
    //EventQueue.dispatchCustomEvent("cancelTrusteeshipEvent", data);
});

/**
 * 结束
 * {
     game: {result: consts.GAME.RESULT.x, share: x},
     details: [{uid:x, actorNr:x, actualIdentity:[], result: consts.GAME.ACTOR_RESULT.x, gold: x, roomId: game.roomId, rank: actor.gameStatus.rank}]
   }
 */
pomelo.on(gameEvents.OVER, function (data) {
    console.log('receive onOver event -> ', data);
    EventBus.publish(gameEvents.OVER, data);
    //EventQueue.dispatchCustomEvent("gameOverEvent", data);
});

/**
 * 当红3在没亮3情况下，出黑3，规则定义不能骗人，通知其他玩家自己有红3
 * {actor: {uid: xx, actorNr: xx}}
 */
pomelo.on(gameEvents.FAN_WHEN_IS_RED, function (data) {
    console.log('receive onFanWhenIsRed event.');
    EventBus.publish(gameEvents.FAN_WHEN_IS_RED, data);
    //EventQueue.dispatchCustomEvent("fanWhenIsRedEvent", data);
});

/**
 * 当玩家出牌结束，通知所有人
 * {
        actor: {
            uid: actor.uid,
            actorNr: actor.actorNr,
            rank: Int,
            identity: consts.GAME.IDENTITY.x
        }
    }
 */
pomelo.on(gameEvents.FAN_FINISHED, function (data) {
    console.log('receive onFanFinished event.', data);
    EventBus.publish(gameEvents.FAN_FINISHED, data);
    //EventQueue.dispatchCustomEvent("fanFinishedEvent", data);
});

pomelo.on(gameEvents.BACK_TO_GAME, function (data) {
    console.log('receive onBackToGame event.', data);
    var scene = new GameScene(data, true);
    cc.director.runScene(scene);
});

pomelo.on(gameEvents.CHAT, function (data) {
    console.log('receive onChat event.');
});

pomelo.on(gameEvents.BROADCAST, function (data) {
    console.log('receive onBroadcast event.');
});

/**
 * 自己金币变化
 */
pomelo.on(gameEvents.GOLD_CHANGE, function (data) {
    console.log('receive onGoldChange event.', data);
    gPlayer.gold = data.gold;
    EventBus.publish(gameEvents.GOLD_CHANGE, data);
    //EventQueue.dispatchCustomEvent("onGoldChange", data);
    playEffect(audio_common.Get_Glod);
});

pomelo.on(gameEvents.INGOT_CHANGE, function (data) {
    console.log('receive onIngotChange event.', data);
    gPlayer.fragment = data.ingot;
    EventBus.publish(gameEvents.INGOT_CHANGE, data);
    //EventQueue.dispatchCustomEvent("onGoldChange", data);

});

pomelo.on(gameEvents.VERSION_UPGRADE, function (data) {
    console.log('receive onVersionUpgrade event.', data);
    prompt.fadeMiddle('有新的版本发布, 请您去官网更新!');
    EventBus.publish(gameEvents.VERSION_UPGRADE, data);
})

