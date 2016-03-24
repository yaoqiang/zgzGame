var AuthController = function()
{

}

AuthController.login = function(username, password)
{

    Network.post({
        action : 'login',
        args : {username: username, password: password},
        onSuccess : function(result) {

            if (result.code == 1001)
            {
                //console.log('用户名不存在');
                prompt.fade('您输入的用户名不存在, 请重新输入');
                return;
            }
            if (result.code == 1002)
            {
                //console.log('密码错误');
                prompt.fade('您输入的密码错误, 请重新输入');
                return;
            }
            if (result.code == 1003)
            {
                //console.log('用户名密码不能为空');
                prompt.fade('用户名密码不能为空');
                return;
            }

            var uid = result.uid;
            var token = result.token;

            Storage.set(CommonConf.LOCAL_STORAGE.TOKEN, token);

            Network.enter(uid, token, function (data) {
                if (data.code !== RETURN_CODE.OK)
                {
                    //console.log('err.');
                    prompt.fade(data.message);
                    return;
                }

                //INIT
                Storage.set(CommonConf.LOCAL_STORAGE.LAST_HEARTBEAT_TIME, '');
                UniversalController.initIAP();

                //初始化全局变量gPlayer;
                gPlayer = data.player;
                //console.log("gPlayer => ", gPlayer);

                //如果是断线重回游戏, 则不需要自动进入大厅;
                if (data.isBackGame) return;

                //进入Index
                UniversalController.enterIndex();

            });

        },

        onError : function() {
            //console.log("error");
        }
    });

}


AuthController.loginWithToken = function(token, cb)
{
    Network.post({
        action : 'loginByToken',
        args : {token: token},
        onSuccess : function(result) {
            if (result.code == 1001)
            {
                if (cb) cb();
                var box = new AlertBox('用户名不存在,请重新登录', function () {
                    cc.director.runScene(new LoginScene());
                }, this);
                cc.director.getRunningScene().addChild(box, 9);

                return;
            }
            if (result.code == 1002)
            {
                if (cb) cb();
                var box = new AlertBox('密码错误,请重新登录', function () {
                    cc.director.runScene(new LoginScene());
                }, this);
                cc.director.getRunningScene().addChild(box, 9);
                return;
            }
            if (result.code == 1003)
            {
                if (cb) cb();
                var box = new AlertBox('账号密码错误,请重新登录', function () {
                    cc.director.runScene(new LoginScene());
                }, this);
                cc.director.getRunningScene().addChild(box, 9);
                return;
            }

            var uid = result.uid;
            var token = result.token;

            Storage.set(CommonConf.LOCAL_STORAGE.TOKEN, token);

            Network.enter(uid, token, function (data) {
                if (data.code !== RETURN_CODE.OK)
                {
                    //console.log('err.');
                    prompt.fade(data.message);
                    return;
                }

                //INIT
                Storage.set(CommonConf.LOCAL_STORAGE.LAST_HEARTBEAT_TIME, '');
                UniversalController.initIAP();

                //初始化全局变量gPlayer;
                gPlayer = data.player;
                //console.log("#gPlayer => ", gPlayer);
                if (cb) cb();

                //如果是断线重回游戏, 则不需要自动进入大厅;
                if (data.isBackGame) return;

                //进入Index
                UniversalController.enterIndex();

            });

        },

        onError : function() {
            //console.log("error");
        }
    });

}


AuthController.autoLogin = function()
{

    Network.post({
        action : 'autoLogin',
        args : {os: gOS},
        onSuccess : function(result) {

            if (result.code == 1001)
            {
                //console.log('用户名不存在');
                prompt.fade('您输入的用户名不存在, 请重新输入');
                return;
            }
            if (result.code == 1002)
            {
                //console.log('密码错误');
                prompt.fade('您输入的密码错误, 请重新输入');
                return;
            }
            if (result.code == 1003)
            {
                //console.log('用户名密码不能为空');
                prompt.fade('用户名密码不能为空');
                return;
            }


            var uid = result.uid;
            var token = result.token;

            Storage.set(CommonConf.LOCAL_STORAGE.TOKEN, token);

            Network.enter(uid, token, function (data) {
                if (data.code !== RETURN_CODE.OK)
                {
                    //console.log('err.');
                    prompt.fade(data.message);
                    return;
                }

                //INIT
                Storage.set(CommonConf.LOCAL_STORAGE.LAST_HEARTBEAT_TIME, '');
                UniversalController.initIAP();

                //初始化全局变量gPlayer;
                gPlayer = data.player;
                //console.log("gPlayer => ", gPlayer);

                //如果是断线重回游戏, 则不需要自动进入大厅;
                if (data.isBackGame) return;

                //进入Index
                UniversalController.enterIndex();

            });

        },

        onError : function() {
            //console.log("error");
        }
    });

}


