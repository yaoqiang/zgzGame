var gameEvents = {

    ///////////////
    //牌局相关
    ///////////////
    JOIN: 'onJoin',
    READY: 'onReady',
    LEAVE: 'onLeave',
    START: 'onStart',
    TALK_COUNTDOWN: 'onTalkCountdown',
    TALK_COUNTDOWN_TIMEOUT: 'onTalkCountdownTimeout',
    TALK: 'onTalk',
    AFTER_TALK: 'onAfterTalk',
    FAN_COUNTDOWN: 'onFanCountdown',
    FAN_COUNTDOWN_TIMEOUT: 'onFanCountdownTimeout',
    FAN: 'onFan',
    TRUSTEESHIP: 'onTrusteeship',
    CANCEL_TRUSTEESHIP: 'onCancelTrusteeship',
    OVER: 'onOver',
    FAN_WHEN_IS_RED: 'onFanWhenIsRed',
    FAN_FINISHED: 'onFanFinished',
    BACK_TO_GAME: 'onBackToGame',


    ////////////
    GOLD_CHANGE: 'onGoldChange',
    CHAT: 'onChat',
    BROADCAST: 'onBroadcast',
    BBS: 'onBBS',   //公告
    UI_COMMAND: 'onUICommand',
    VERSION_UPGRADE: 'onVersionUpgrade',
    INGOT_CHANGE: 'onIngotChange',
    RESTART_GAME: 'onRestartGame',
    DISSOLVE_GAME: 'onDissolveGame',
    PAYMENT_RESULT: 'onPaymentResult',

    //
    UPDATE_REMAINING_CARD: 'UPDATE_REMAINING_CARD',  //更新剩余牌(记牌器)

    UI_ALERT_BANKRUPTCY_IN_GAME: 'UI_ALERT_BANKRUPTCY_IN_GAME', //弹出牌局中领取破产补助框


    //-------------
    //客户端事件
    //-------------
    CLIENT_UPDATE_AVATAR: 'CLIENT_UPDATE_AVATAR',    //上传头像成功后, 更新客户端头像.
}
