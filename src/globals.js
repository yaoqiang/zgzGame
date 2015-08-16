var gGameSvrAddr = {
    //host: '192.243.119.61',
    host: '101.200.173.252',
     //host: '127.0.0.1',
    port: 3014
};

var gWebSvrAddr = {
    //host: 'http://192.243.119.61',
    host: 'http://101.200.173.252',
    //host: 'http://127.0.0.1',
    port: '3001'
}

var gPlayer = {};
var gLobbyId = 0;
var gRoomId = 0;
var gGameId = 0;
var gGameType = 0;
var gActor = {};
var gLastFanCardRecognization = null;   //上手牌型

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
    T1: 0,  //5人游戏
    T2: 1,   //6人游戏
    T3: 2   //7人游戏
}

ZGZ.SCALE = 1;


var lobbyName = [
    "五人场",
    "六人场",
    "七人场"
];



