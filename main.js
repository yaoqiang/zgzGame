

cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.GameLoaderScene.preload(g_resources, function () {

        cc.spriteFrameCache.addSpriteFrames(res.common_plist);

        //init data conf
        if (!Storage.get(CommonConf.LOCAL_STORAGE.INIT)) {
            Storage.init();
        }

        if (!cc.sys.isNative) {
            cc.director.runScene(new LoginScene());
            return;
        }
        if (Storage.get(CommonConf.LOCAL_STORAGE.TOKEN)) {
            var token = Storage.get(CommonConf.LOCAL_STORAGE.TOKEN);
            AuthController.loginWithToken(token);
        } else {
            AuthController.autoLogin();
        }

        //

        //

        //debug();

    }, this);
};

cc.game.run();


