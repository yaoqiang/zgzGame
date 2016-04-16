var RETURN_CODE = {
    OK: 200,
    FAIL: 500
}


var ERR_CODE = {
    SYS: {
        PARAMETER_ERR: 1,
        SYS_ERR: 2
    },
    JOIN: {
        IN_GAME: 1001,   //在其他牌桌
        TOO_POOR: 1002,
        TOO_RICH: 1003,
        ERR: 1004    //参数错误等
    },
    READY: {
        NOT_INT_GAME: 2001,
        ALREADY_READY: 2002,
        ERR: 2003
    },
    TALK: {
        LIANG3_WITHOUT3: 3001, //没3 亮3（非法操作）
        GUZI_WITH3: 3002,   //有3 扎股子,
        NOT_IN_GAME: 3003,
        PARAMETER_ERR: 3004,    //参数错误
        GUZI_APPEND_NOT_3: 3005,    //股子附加牌不是3
        GUZI_APPEND_NOT_HOLDING_CARD: 3006, //股子附加3，但是手牌里没有
        LIANG3_APPEND_NOT_3: 3007,  //亮3附加牌不是3
        LIANG3_APPEND_NOT_HOLDING_CARD: 3008,   //亮3附加3，但是手牌里没有
        ERR: 3009,   //未知错误
        ALREADY_TALK: 3010, //已说话
        NOT_YOU: 3011   //不轮他说
    },
    LEAVE: {
        NOT_IN_GAME: 4001,
        GAMING: 4002,
        ERR: 4003
    },
    FAN: {
        WITHOUT_CARDS: 5001,
        NOT_BIGGER: 5002,
        MUST_BE_FIVE: 5003,
        MUST_FAN: 5004,
        FAN_REPEAT: 5005,
        ERR: 5006,
        MUST_CONTAINS_HEART5: 5007
    },
    SETTLE: {
        ERR: 6001
    },
    TRUSTEESHIP: {
        NOT_IN_GAME: 7001,
        ALREADY_TRUSTEESHIP: 7002,
        ALREADY_CANCELED_TRUSTEESHIP: 7003,
        NOT_GAMING: 7004,
        ERR: 7005
    },
    CHECK_IN: {
        ALREADY_CHECK_IN: 8001,
        ERR: 8002
    },
    BANKRUPTCY_GRANT: {
        ALREADY_GRANT: 9001,
        MORE_MONEY: 9002,
        ERR: 9003
    },
    TASK_GRANT: {
        ALREADY_GRANT: 9101,
        ERR: 9102
    },
    EXCHANGE: {
        YUANBAO_NOT_ENOUGH: 9201,
        INVENTORY_NOT_ENOUGH: 9202,
        ITEM_OFFLINE: 9203,
        NOT_BLANK_MOBILE: 9204,
        NOT_BLANK_CONTACT: 9205,
        NOT_BLANK_ADDRESS: 9206,
        INVALID_MOBILE: 9207,
        ERR: 9208,
        NEED_CUSTOMER: 9209,
        APIX_INVALID: 9210
    },
    SMS: {
        MOBILE_NOT_BLANK: 9301,
        MOBILE_NOT_VALIDATE: 9302,
        MOBILE_ALREADY_BINDING: 9303,
        CAPTCHA_ERR: 9304,
        ERR: 9305
    },
    MOBILE_RECHARGE: {
        MOBILE_NOT_BLANK: 9401,
        MOBILE_NOT_VALIDATE: 9402,
        DENOMINATION_NOT_ERR: 9303,
        ERR: 9305
    }
};

var ERR_MESSAGE = {
    getMessage: function (code) {
        return ERR_MESSAGE[code] == undefined ? '操作失败' : ERR_MESSAGE[code];
    },
    1001: "您已在游戏中, 无法加入",   //在其他牌桌
    1002: "您的金币不足, 无法加入",
    1003: "您的金币太多了, 请前往高倍区",
    1004: "系统错误, 请联系管理员",    //参数错误等

    2001: "您没有在牌桌中, 请重新加入",
    2002: "您已准备",
    2003: "系统错误, 请联系管理员",

    3001: "您没有红3, 不能进行亮3操作", //没3 亮3（非法操作）
    3002: "您有红3, 不能叫股子",   //有3 扎股子,
    3003: "您不在游戏中, 不能说话",
    3004: "参数错误",
    3005: "叫股子时, 附加牌不是黑3",
    3006: "叫股子时, 附加黑3不在手牌里",
    3007: "亮3时, 附加牌不是3",
    3008: "亮3时, 附加3不在手牌里",    //参数错误等
    3009: "说话失败",    //参数错误等
    3010: "您已说过话了",    //参数错误等
    3011: "当前不轮您说话",    //参数错误等

    4001: "您已成功离开牌桌",
    4002: "游戏中, 无法离开",
    4003: "离开失败",    //参数错误等

    5001: "没有该手牌, 请检查",
    5002: "不能大过上手牌, 请检查",
    5003: "必须出所有5",
    5004: "您是当前回合老大,不能不出",
    5005: "当前回合您已出牌,不要连击出牌",
    5006: "出牌失败",    //参数错误等
    5007: "首轮必须包含红桃5",

    6001: "系统错误, 请联系管理员",    //参数错误等

    7001: "您没有在牌桌中, 无法托管",
    7002: "您已托管成功",
    7003: "您不在托管状态",
    7004: "游戏还未开始, 无法托管",
    7005: "托管失败",    //参数错误等

    8001: "玩家已签到",
    8002: "签到失败",

    9001: "已领取今日补助",
    9002: "金币超出领取最低限制",
    9003: "领取补助失败",

    9101: "已领取任务奖励",
    9102: "领取任务奖励失败",

    9201: "元宝不足",
    9202: "库存不足",
    9203: "兑换物品已下线",
    9204: "请填写手机号码",
    9205: "请填写联系人",
    9206: "请填写收件地址",
    9207: "手机号码无效",
    9208: "兑换失败, 请稍后重试",
    9209: "兑换失败, 请联系客服",
    9210: "运营商接口当前不可用, 请稍后重试",

    9301: "请输入手机号",
    9302: "手机号格式有误",
    9303: "该手机已绑定",
    9304: "验证码错误",
    9305: "操作失败, 请稍后重试",
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
    CANCEL_TRUSTEESHIP: 'onCancelTrusteeship',
    OVER: 'onOver',
    GOLD_CHANGE: 'onGoldChange',
    FAN_WHEN_IS_RED: 'onFanWhenIsRed',
    FAN_FINISHED: 'onFanFinished',
    BACK_TO_GAME: 'onBackToGame'

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
    },
    CHAT: {
        SCOPE_GAME: 'GAME',
        SCOPE_ALL: 'ALL',
        SCOPE_PRIVATE: 'PRIVATE',
        TYPE_QUICK: 'TYPE_QUICK',
        TYPE_EXP: 'TYPE_EXP'
    }


}

var CommonConf = {
    CONNECT_STATE: {
        DISCONNECTED: 'DISCONNECTED',
        CONNECTING: 'CONNECTING',
        CONNECTED: 'CONNECTED'
    },
    KICK_REASON: {
        ANOTHER_LOGIN: 'ANOTHER_LOGIN',
        SERVICE_MAINTENANCE: 'SERVICE_MAINTENANCE',
        UNKNOWN: 'UNKNOWN'
    },

    LOCAL_STORAGE: {
        INIT: 'INIT',
        IS_PLAY_EFFECT: 'isPlayEffect',
        IS_PLAY_BACKGROUND_MUSIC: 'isPlayBackgroundMusic',
        VERSION: 'VERSION',
        TOKEN: 'TOKEN',
        ENTER_BACKGROUND: 'ENTER_BACKGROUND',
        HANDSHAKE_TIME: 'HANDSHAKE_TIME',
        HANDSHAKE_HEARTBEAT: 'HANDSHAKE_HEARTBEAT',
        LAST_HEARTBEAT_TIME: 'LAST_HEARTBEAT_TIME'
    },

    RANKING_LIST: {
        RICH: 'RICH',
        GOD: 'GOD',
        RECHARGE: 'RECHARGE'
    },

    EXCHANGE: {
        TYPE: {
            VIRTUAL: "VIRTUAL",
            INBOX_CALL: "INBOX_CALL",
            OUTBOX: "OUTBOX"
        }
    },

    ORDER: {
        STATE: {
            SUBMIT: "SUBMIT",
            PENDING: "PENDING",
            PAYMENT: "PAYMENT",
            CANCELED: "CANCELED",
            FINISHED: "FINISHED"
        }
    },

    PAYMENT: {
        CHANNEL: {
            alipay: 'alipay',
            alipay_wap: 'alipay_wap',
            alipay_qr: 'alipay_qr',
            alipay_pc_direct: "alipay_pc_direct",
            apple_pay: "apple_pay",
            upacp: "upacp",
            upacp_wap: "upacp_wap",
            upacp_pc: "upacp_pc",
            cp_b2b: "cp_b2b",
            wx: "wx"
        }
    }
}


var RankConf = [
    {"rank":1, "title": "临时工", "exp": "100", "icon": ""},
    {"rank":2, "title": "矿工", "exp": "500", "icon": ""},
    {"rank":3, "title": "副队长", "exp": "1000", "icon": ""},
    {"rank":4, "title": "队长", "exp": "1800", "icon": ""},
    {"rank":5, "title": "副科长", "exp": "3000", "icon": ""},
    {"rank":6, "title": "科长", "exp": "4000", "icon": ""},
    {"rank":7, "title": "副矿长", "exp": "6000", "icon": ""},
    {"rank":8, "title": "矿长", "exp": "10000", "icon": ""},
    {"rank":9, "title": "副局", "exp": "20000", "icon": ""},
    {"rank":10, "title": "局长", "exp": "50000", "icon": ""},
    {"rank":11, "title": "董事长", "exp": "100000", "icon": ""}
]