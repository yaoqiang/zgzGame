var AuthController = function()
{

}

AuthController.login = function(username, password)
{

    Network.post({
        action : 'login',
        args : "username="+username+"&password="+password,
        onSuccess : function(result) {

            if (result.code == 1001)
            {
                console.log('用户名不存在');
                prompt.fade('您输入的用户名不存在, 请重新输入');
                return;
            }
            if (result.code == 1002)
            {
                console.log('密码错误');
                prompt.fade('您输入的密码错误, 请重新输入');
                return;
            }
            if (result.code == 1003)
            {
                console.log('用户名密码不能为空');
                prompt.fade('用户名密码不能为空');
                return;
            }

            var uid = result.uid;
            var token = result.token;

            Network.enter(uid, token, function (data) {
                if (data.code !== 200)
                {
                    console.log('err.');
                    prompt.fade(data.message);
                    return;
                }
                AuthController.init(data);
            });

        },

        onError : function() {
            console.log("error");
        }
    });

}


AuthController.init = function (data) {
    gPlayer = data.player;
    console.log("gPlayer:", gPlayer);
    var indexScene = new IndexScene();
    cc.director.runScene(new cc.TransitionFade(1.2, indexScene));

}


