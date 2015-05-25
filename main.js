cc.game.onStart = function(){
    if (cc.sys.isNative === true) {
        require('pomelo-cocos2d-js/index.js');
    }
    cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        //cc.director.runScene(new GameScene(ZGZ.GAME_TYPE.T1));

        //cc.director.runScene(new LoginScene());

        debug();


    }, this);
};
cc.game.run();


function debug() {
    var uid = 1;
    var token = 'f63b5f48c154286bfe1472cc9f241e6b';
    Network.enter(uid, token, function (data) {
        if (data.code !== 200)
        {
            console.log('err.');
            return;
        }
        AuthController.init(data);
    });
}