var pomelo = window.pomelo;

pomelo.on(gameEvents.JOIN, function (data) {
    //console.log('receive join event -> ', data);
    EventBus.publish(gameEvents.JOIN, data);

});

pomelo.on(gameEvents.LEAVE, function (data) {
    //console.log('receive onLeave event -> ', data);

    EventBus.publish(gameEvents.LEAVE, data);
});

pomelo.on(gameEvents.READY, function (data) {
    //console.log('receive onReady event ->', data);
    EventBus.publish(gameEvents.READY, data);
});



pomelo.on(gameEvents.START, function (data) {
    //console.log('receive onStart event -> ', data);
    //赋值当前玩家actor全局变量
    gActor.actorNr = data.actor.actorNr;
    gActor.uid = data.actor.uid;
    gActor.cards = data.actor.gameStatus.currentHoldingCards;
    gRemainingCards = data.actor.remainingCards;

    EventBus.publish(gameEvents.START, data);
});

pomelo.on(gameEvents.TALK_COUNTDOWN, function (data) {
    //console.log('receive onTalkCountdown event -> ', data);

    EventBus.publish(gameEvents.TALK_COUNTDOWN, data);
});

/**
 * 说话超时，代表没说话，UI逻辑倒计时结束，当前说话玩家面前Talk Menu消失;其他玩家UI显示当前玩家倒计时icon结束；
 * 服务器端会触发下一个talkCountdown事件，如果说话结束，会触发出牌onFanCountdown，如果没人说话，会重新开始onStart
 *
 * 注:现在不在接受此消息, 由服务器直接处理说话消息, 即发送超时说话玩家为没话
 */
pomelo.on(gameEvents.TALK_COUNTDOWN_TIMEOUT, function (data) {

});

/**
 * 接收说话消息，处理说话成功UI逻辑；自己说话通过response响应
 */
pomelo.on(gameEvents.TALK, function (data) {
    //console.log('receive onTalk event -> ', data);
    //goal=说话结果（参考consts.GAME.IDENTITY)；append=说话时亮3情况，数组里放牌号；share=股子数

    EventBus.publish(gameEvents.TALK, data);
});

/**
 * 接收说话消息，说话阶段结束
 */
pomelo.on(gameEvents.AFTER_TALK, function (data) {
    //console.log('receive onAfterTalk event -> ', data);
    //goal=说话结果（参考consts.GAME.IDENTITY)；append=说话时亮3情况，数组里放牌号；share=股子数

    EventBus.publish(gameEvents.AFTER_TALK, data);
});

/**
 * 出牌倒计时，
 */
pomelo.on(gameEvents.FAN_COUNTDOWN, function (data) {
    //console.log('receive onFanCountdown event -> ', data);
    gActor.isBoss = data.isBoss;


    //actor: {uid: xx, actorNr: xx},isBoss: true/false（是否当前回合BOSS）,
    //lastFanCardRecognization: utils.cards.CardRecognization (上手牌型，如果是第一个出牌，则是null）, second: 倒计时时间
    EventBus.publish(gameEvents.FAN_COUNTDOWN, data);
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
    if (data.cards.length > 0 && data.uid !== gPlayer.uid) {
        cardUtil.updateRemainingCards(data.cards);
        EventBus.publish(gameEvents.UPDATE_REMAINING_CARD, data);
    }
    EventBus.publish(gameEvents.FAN, data);
    //actor: {uid: xx, actorNr: xx},
    //cardRecognization: utils.cards.CardRecognization (当前出牌牌型）, cards: 出牌，数组[]，为空时为不出

});

/**
 * 托管
 * {actor: {uid: xx, actorNr: xx}}
 */
pomelo.on(gameEvents.TRUSTEESHIP, function (data) {
    //console.log('receive onTrusteeship event -> ', data);
    EventBus.publish(gameEvents.TRUSTEESHIP, data);
});

/**
 * 取消托管
 * {actor: {uid: xx, actorNr: xx}}
 */
pomelo.on(gameEvents.CANCEL_TRUSTEESHIP, function (data) {
    //console.log('receive onCancelTrusteeship event -> ', data);
    EventBus.publish(gameEvents.CANCEL_TRUSTEESHIP, data);
});

/**
 * 结束
 * {
     game: {result: consts.GAME.RESULT.x, share: x},
     details: [{uid:x, actorNr:x, actualIdentity:[], result: consts.GAME.ACTOR_RESULT.x, gold: x, roomId: game.roomId, rank: actor.gameStatus.rank}]
   }
 */
pomelo.on(gameEvents.OVER, function (data) {
    //console.log('receive onOver event -> ', data);
    EventBus.publish(gameEvents.OVER, data);
});

/**
 * 当红3在没亮3情况下，出黑3，规则定义不能骗人，通知其他玩家自己有红3
 * {actor: {uid: xx, actorNr: xx}}
 */
pomelo.on(gameEvents.FAN_WHEN_IS_RED, function (data) {
    //console.log('receive onFanWhenIsRed event.');
    EventBus.publish(gameEvents.FAN_WHEN_IS_RED, data);
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
    //console.log('receive onFanFinished event.', data);
    EventBus.publish(gameEvents.FAN_FINISHED, data);
});

pomelo.on(gameEvents.BACK_TO_GAME, function (data) {
    console.log('receive onBackToGame event.', data);
    for (var i = 0; i < data.actors.length; i++) {
        if (data.actors[i].uid === gPlayer.uid) {
            gRemainingCards = data.actors[i].remainingCards
        }
    }
    var scene = new GameScene(data, true);
    cc.director.runScene(scene);
});

pomelo.on(gameEvents.CHAT, function (data) {
    //console.log('receive onChat event.', data);
    EventBus.publish(gameEvents.CHAT, data);
});

//喇叭
pomelo.on(gameEvents.BROADCAST, function (data) {
    //console.log('receive onBroadcast event.', data);
    EventBus.publish(gameEvents.BROADCAST, data);
});

//公告
pomelo.on(gameEvents.BBS, function (data) {
    //console.log('receive BBS event.', data);
    EventBus.publish(gameEvents.BBS, data);
});

/**
 * 自己金币变化
 */
pomelo.on(gameEvents.GOLD_CHANGE, function (data) {
    //console.log('receive onGoldChange event.', data);
    gPlayer.gold = data.gold;
    EventBus.publish(gameEvents.GOLD_CHANGE, data);
    playEffect(audio_common.Get_Glod);
});

pomelo.on(gameEvents.INGOT_CHANGE, function (data) {
    //console.log('receive onIngotChange event.', data);
    gPlayer.fragment = data.ingot;
    EventBus.publish(gameEvents.INGOT_CHANGE, data);

});

pomelo.on(gameEvents.PAYMENT_RESULT, function (data) {
    var msg = '您购买的商品已到账';
    if (data.code === RETURN_CODE.FAIL) {
        msg = '充值失败,请联系客服';
    }
    var box = new AlertBox(msg, function () {
    }, this);
    cc.director.getRunningScene().addChild(box, 9);
})

pomelo.on(gameEvents.VERSION_UPGRADE, function (data) {
    if (data.isNew) {
        prompt.fadeMiddle('当前已是最新版本');
        return;
    }
    var upgradeBox = new UpgradeLayer(data);
    cc.director.getRunningScene().addChild(upgradeBox, 9);
    EventBus.publish(gameEvents.VERSION_UPGRADE, data);
})

pomelo.on(gameEvents.RESTART_GAME, function (data) {
    prompt.fadeMiddle('没有人说话,重新开始!');
});

pomelo.on(gameEvents.DISSOLVE_GAME, function (data) {
    prompt.fadeMiddle('连续没有人说话,即将解散牌局!');
});