var route = {
    enterLobby: 'connector.entryHandler.enterLobby',
    join: 'game.gameHandler.join',
    leave: 'game.gameHandler.leave',
    ready: 'game.gameHandler.ready',
    talk: 'game.gameHandler.talk',
    fan: 'game.gameHandler.fan',
    trusteeship: 'game.gameHandler.trusteeship',
    chat: 'game.gameHandler.chat'
}


var ERR_CODE = {
    JOIN: {
        IN_GAME: 1,   //在其他牌桌
            TOO_POOR: 2,
            TOO_RICH: 3,
            ERR: 4    //参数错误等
    },
    READY: {
        NOT_INT_GAME: 1,
            ALREADY_READY: 2,
            ERR: 3
    },
    TALK: {
        LIANG3_WITHOUT3: 1, //没3 亮3（非法操作）
            GUZI_WITH3: 2,   //有3 扎股子,
            NOT_IN_GAME: 3,
            ERR: 4
    },
    LEAVE: {
        NOT_IN_GAME: 1,
            GAMING: 2,
            ERR: 3
    },
    FAN: {
        WITHOUT_CARDS: 1,
            NOT_BIGGER: 2,
            MUST_BE_FIVE: 3,
            ERR: 4
    },
    SETTLE: {
        ERR: 1
    }
}
var MESSAGE = {
    RES: 200,
        ERR: 500,
        PUSH: 600
}
var EVENT = {
    CHAT: 'onChat',
        BROADCAST: 'onBroadcast',
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
        OVER: 'onOver',
        GOLD_CHANGE: 'onGoldChange',
        FAN_WHEN_IS_RED: 'onFanWhenIsRed',
        FAN_FINISHED: 'onFanFinished'

}

var GAME = {
    TYPE: {
        FIVE: 5,
            SIX: 6,
            SEVEN: 7
    },
    IDENTITY: {
        UNKNOW: 0,
            GUZI: 1,
            HONG3: 2
    },
    ACTUAL_IDENTITY: {
        GUZI: 0,
            Heart3: 1,
            Diamond3: 2,
            Spade3: 3
    },
    TIMER: {
        NOT_READY: 60,
            TALK: 60,
            FAN: 45
    },
    PHASE: {
        STARTING: 0,
            TALKING: 1,
            FAN: 2,
            OVER: 3
    },
    TRUSTEESHIP: {
        TIMEOUT_TIMES: 2
    },
    RESULT: {
        RED_WIN: 'RED_WIN',
            BLACK_WIN: 'BLACK_WIN',
            TIE: 'TIE'
    },
    ACTOR_RESULT: {
        WIN: 'WIN',
            LOSE: 'LOSE',
            TIE: 'TIE'
    }


}