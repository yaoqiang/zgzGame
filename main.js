

cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.GameLoaderScene.preload(g_resources, function () {
        //cc.director.runScene(new GameScene(ZGZ.GAME_TYPE.T1));

        cc.director.runScene(new LoginScene());

        //debug();

    }, this);
};

cc.game.run();


