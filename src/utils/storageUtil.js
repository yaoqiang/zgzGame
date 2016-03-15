var Storage = Storage || {};

Storage.set = function (k, v) {
    if (cc.sys.isNative) {
        var dataFile = Storage.getDataFilePath();

        var dataString = jsb.fileUtils.getStringFromFile(dataFile);
        var dataJson = JSON.parse(dataString);
        dataJson[k] = v;

        jsb.fileUtils.writeStringToFile(JSON.stringify(dataJson), dataFile);
    }
    else {
        cc.sys.localStorage.setItem(k, v);
    }
}

Storage.get = function (k) {
    if (cc.sys.isNative) {
        var dataFile = Storage.getDataFilePath();
        if (!jsb.fileUtils.isFileExist(dataFile)) return null;
        var dataString = jsb.fileUtils.getStringFromFile(dataFile);
        var dataJson = JSON.parse(dataString);
        return dataJson[k];
    }
    else {
       return cc.sys.localStorage.getItem(k);
    }
}

Storage.init = function () {
    if (cc.sys.isNative) {
        var dataFile = Storage.getDataFilePath();
        var initData = {
            INIT: true,
            isPlayEffect: true,
            isPlayBackMusic: true
        };
        jsb.fileUtils.writeStringToFile(JSON.stringify(initData), dataFile);
    } else {
        cc.sys.localStorage.setItem(CommonConf.LOCAL_STORAGE.INIT, true);
        cc.sys.localStorage.setItem(CommonConf.LOCAL_STORAGE.IS_PLAY_BACKGROUND_MUSIC, true);
        cc.sys.localStorage.setItem(CommonConf.LOCAL_STORAGE.IS_PLAY_EFFECT, true);
    }
}

Storage.getDataFilePath = function () {
    var storageRoot = jsb.fileUtils.getWritablePath();
    var fileName = "data";
    if (cc.sys.isNative) {
        if (!jsb.fileUtils.isDirectoryExist(storageRoot)) {
            jsb.fileUtils.createDirectory(storageRoot);
        }
    }

    return storageRoot + fileName;
}

Storage.removeFile = function () {
    if (cc.sys.isNative) {
        jsb.fileUtils.removeFile(Storage.getDataFilePath());
    }
}



