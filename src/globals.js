var gGameSvrAddr = {
     //host: '192.243.119.61',
     host: '127.0.0.1',
    port: 3014
};

var gWebSvrAddr = {
    host: 'http://127.0.0.1',
    //host: '192.243.119.61',
    port: '3001'
}

var gPlayer = {};


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
    T2: 7   //7人游戏
}

ZGZ.SCALE = 1;

//sound
ZGZ.SOUND = true;// 背景音乐
ZGZ.SOUND_EFFECT = true;//游戏，按钮声效
ZGZ.VIBRATION_EFFECT = true;//游戏振动