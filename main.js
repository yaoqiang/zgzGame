cc.game.onStart = function(){
    if (cc.sys.isNative === true) {
        require('pomelo-cocos2d-js/index.js');
    }
    cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new GameScene(ZGZ.GAME_TYPE.T1));
    }, this);
};
cc.game.run();