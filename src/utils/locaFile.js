var LocalFile = {
    root: function () {
        if(cc.sys.isNative) {
            cc.log(jsb.fileUtils.getWritablePath());
            return jsb.fileUtils.getWritablePath();
        }
        else {

        }

    },
    setUserLoginInfo: function (data) {
        jsb.fileUtils
    },
    getUserLoginInfo: function () {

    }
}