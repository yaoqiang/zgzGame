var audioEngine = cc.audioEngine;

var isPlayEffect = Storage.get(CommonConf.LOCAL_STORAGE.IS_PLAY_EFFECT);
var isPlayBackMusic = Storage.get(CommonConf.LOCAL_STORAGE.IS_PLAY_BACKGROUND_MUSIC);
var soundId = null;
var backMusic = audio_backMusic[0];

var stopAllEffects = function () {
    audioEngine.stopAllEffects();
};
var resumeAllEffects = function () {
    if (isPlayEffect) {
        audioEngine.resumeAllEffects();
    }
};
var playEffect = function (path) {
    if (isPlayEffect) {
        soundId = audioEngine.playEffect(path);
    }
};
var pauseAllEffects = function () {
    audioEngine.pauseAllEffects();
};
var resumeAllEffects = function () {
    if (isPlayEffect) {
        audioEngine.resumeAllEffects();
    }
};
var playMusic = function (path, loop) {
    if (isPlayBackMusic) {
        audioEngine.playMusic(path, loop);
    }
};
var stopMusic = function () {
    audioEngine.stopMusic();
};
var pauseMusic = function () {
    audioEngine.pauseMusic();
};

var resumeMusic = function () {
    if (isPlayBackMusic) {
        audioEngine.resumeMusic();
    }

};
var rewindMusic = function () {
    if (isPlayBackMusic) {
        audioEngine.rewindMusic();
    }
};

var isMusicPlaying = function () {
    if (audioEngine.isMusicPlaying()) {
        return true;
    }
    else {
        return false;
    }
};
var setBackMusic = function (path) {
    backMusic = path;
};
var playBackMusic = function () {
    if (isPlayBackMusic) {
        if (audioEngine.isMusicPlaying()) {
        } else {
            playMusic(backMusic, true);
        }
    }
};
var setPlayMusic = function (isplay) {
    if (isplay) {
        isPlayBackMusic = true;
        playMusic(backMusic, true);
    } else {
        isPlayBackMusic = false;
        stopMusic();
    }
    saveMusicSet();
};
var setPlayEffects = function (isplay) {
    if (isplay) {
        isPlayEffect = true;
    } else {
        isPlayEffect = false;
        stopAllEffects();
    }
    saveEffectsSet();
};
var loadSet = function () {

    return [isPlayBackMusic, isPlayEffect];
};
var saveSet = function () {
    var ls = cc.sys.localStorage;
    ls.setItem("isPlayBackMusic", isPlayBackMusic);
    ls.setItem("isPlayEffect", isPlayEffect);
};

var saveEffectsSet = function () {
    Storage.set(CommonConf.LOCAL_STORAGE.IS_PLAY_EFFECT, isPlayEffect);
};

var saveMusicSet = function () {
    Storage.set(CommonConf.LOCAL_STORAGE.IS_PLAY_BACKGROUND_MUSIC, isPlayBackMusic);
};



