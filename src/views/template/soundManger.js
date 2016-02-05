
var audioEngine = cc.audioEngine;
var isPlayEffect  = true;
var isPlayBackMusic = true;
var soundId = null;
var backMusic = audio_backMusic[0];

var stopAllEffects = function () {
    cc.log("stop all effects");
    audioEngine.stopAllEffects();
};
var resumeAllEffects = function () {
    if(isPlayEffect){
        cc.log("resume all effects");
        audioEngine.resumeAllEffects();
    }
};
var playEffect = function (path) {
    if(isPlayEffect){
        cc.log("play effect");
        soundId = audioEngine.playEffect(path);
    }
};
var pauseAllEffects = function () {
    cc.log("pause all effects");
    audioEngine.pauseAllEffects();
};
var resumeAllEffects = function () {
    if(isPlayEffect){
        cc.log("resume all effects");
        audioEngine.resumeAllEffects();
    }
};
var playMusic = function (path, loop) {
    if(isPlayBackMusic){
        cc.log("play background music");
        audioEngine.playMusic(path, loop);
    }
};
var stopMusic = function () {
    cc.log("stop background music");
    audioEngine.stopMusic();
};
var pauseMusic = function () {
    cc.log("pause background music");
    audioEngine.pauseMusic();
};

var resumeMusic = function () {
    if(isPlayBackMusic){
        cc.log("resume background music");
        audioEngine.resumeMusic();
    }

};
var rewindMusic = function () {
    if(isPlayBackMusic){
        cc.log("rewind background music");
        audioEngine.rewindMusic();
    }
};

var isMusicPlaying = function () {
    if (audioEngine.isMusicPlaying()) {
        cc.log("background music is playing");
        return true;
    }
    else {
        cc.log("background music is not playing");
        return false;
    }
};
var setBackMusic = function (path) {
    backMusic = path;
};
var playBackMusic = function () {
    if(isPlayBackMusic){
        if(audioEngine.isMusicPlaying()){

        }else{
            playMusic(backMusic, true);
        }
    }
};
var setPlayMusic = function (isplay) {
    if(isplay){
        isPlayBackMusic = true;
        playMusic(backMusic, true);
    }else{
        isPlayBackMusic = false;
        stopMusic();
    }
    saveMusicSet();
};
var setPlayEffects = function (isplay) {
    if(isplay){
        isPlayEffect = true;
    }else{
        isPlayEffect = false;
        stopAllEffects();
    }
    saveEffectsSet();
};
var loadSet = function () {
    //var ls = cc.sys.localStorage;
    //isPlayBackMusic = ls.getItem("isPlayBackMusic");
    //isPlayEffect = ls.getItem("isPlayEffect");
    //if(isPlayBackMusic == null){
    //    isPlayBackMusic = true;
    //}
    //if(isPlayEffect == null){
    //    isPlayEffect = true;
    //}
    console.log("isPlayBackMusic:"+ isPlayBackMusic + "     isPlayEffect:" + isPlayEffect );
    return  [isPlayBackMusic , isPlayEffect];
};
var saveSet = function () {
    var ls = cc.sys.localStorage;
    ls.setItem("isPlayBackMusic", isPlayBackMusic);
    ls.setItem("isPlayEffect", isPlayEffect);
};

var saveEffectsSet = function () {
    var ls = cc.sys.localStorage;
    ls.setItem("isPlayEffect", isPlayEffect);
};

var saveMusicSet = function () {
    var ls = cc.sys.localStorage;
    ls.setItem("isPlayBackMusic", isPlayBackMusic);
};



