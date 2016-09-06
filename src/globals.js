var gGameSvrAddr = {
    host: '101.200.128.237',
    //host: '127.0.0.1',
    //host: '101.201.154.38',
    port: 3014
};

var gWebSvrAddr = {
    host: '101.200.128.237',
    //host: '127.0.0.1',
    //host: '101.201.154.38',
    port: 3001
}

var gGameHttpAddr = {
    host: '101.200.128.237',
    //host: '127.0.0.1',
    //host: '101.201.154.38',
    port: 1337
}

var gGameServerUrl = function () {
    if (gGameSvrAddr.host.indexOf('101.200.128.237') > -1) {
        return {host: "test.apigame1.zaguzi.com", port: 3014};
    }
    else if (gGameSvrAddr.host.indexOf('101.201.154.38') > -1) {
        return {host: "apigame1.zaguzi.com", port: 3014};
    }
    else {
        return {host: "127.0.0.1", port: 3014}
    }
}

var gWebServerUrl = function () {
    if (gWebSvrAddr.host.indexOf('101.200.128.237') > -1) {
        return "http://test.apigame2.zaguzi.com:3001/"
    }
    else if (gWebSvrAddr.host.indexOf('101.201.154.38') > -1) {
        return "http://apigame2.zaguzi.com:3001/"
    }
    else {
        return "http://127.0.0.1:3001/";
    }
}

var gGameHttpServerUrl = function () {
    if (gGameHttpAddr.host.indexOf('101.200.128.237') > -1) {
        return "http://test.apigame3.zaguzi.com:1337/"
    }
    else if (gGameHttpAddr.host.indexOf('101.201.154.38') > -1) {
        return "http://apigame3.zaguzi.com:1337/"
    }
    else {
        return "http://127.0.0.1:1337/";
    }
}


//网络状态,是否与connector服务连接
var gHasConnector = false;
//
var gCONNECT_STATE = CommonConf.CONNECT_STATE.DISCONNECTED;

var gBeingJoin = false;

//全局"连接中.." bar(loading bar)
var gConnectingBar = null;
//后端处理app更新事件为统一发送, 客户端目前有2处, 1是每日自动登陆请求1次, 2是设置-更新,
//如果是每日自动登陆请求, 如果是最新版,就不显示"当前为最新...", 所以加一个来源
var gRequestAppReleaseFrom = null;  //'auto'/'setting'

//
var gOS = 'android'

var gPlayer = {};
var gLobbyId = 0;
var gRoomId = 0;
var gGameId = 0;
var gGameType = 0;
var gActor = {};    //gActor.append: 用来客户端识别牌型了..
var gLastFanCardRecognization = null;   //上手牌型
var gRemainingCards = null; //记牌器

var gGameState = 0;
var avatars = [
    ["#touxiang_09.png","#touxiang_09_2.png"],
    ["#touxiang_10.png","#touxiang_10_2.png"],
    ["#touxiang_11.png","#touxiang_11_2.png"],
    ["#touxiang_12.png","#touxiang_12_2.png"],
    ["#touxiang_13.png","#touxiang_13_2.png"],
    ["#touxiang_14.png","#touxiang_14_2.png"],
    ["#touxiang_15.png","#touxiang_15_2.png"],
    ["#touxiang_16.png","#touxiang_16_2.png"],
    ["#touxiang_nan.png","#touxiang_nan_2.png"],
    ["#touxiang_nv.png","#touxiang_nv_2.png"]
];


var ZGZ = ZGZ || {};

ZGZ.GAME_STATE = {
    HOLD: 0,
    READY: 1,
    TALK: 2,
    PLAY: 3,
    OVER: 4
}

//游戏类型
ZGZ.GAME_TYPE = {
    T1: 5,  //5人游戏
    T2: 6,   //6人游戏
    T3: 7   //7人游戏
}

ZGZ.SCALE = 1;

var gGameSceneCompleted = false;

var lobbyName = [
    "五人场",
    "六人场",
    "七人场"
];

TAG_MENU = 100;

//游戏类型
GAME_ZODER = {
    PlayerProfile: 21  //个人信息

}