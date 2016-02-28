var pomelo = window.pomelo;
/**
 * http请求
 */
var Network = {
    url: "http://" + gWebSvrAddr.host.concat(':').concat(gWebSvrAddr.port).concat('/'),
    get: function (params) {
    },
    post: function (params) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", this.url + params.action);

        //set Content-Type "application/x-www-form-urlencoded" to post form data
        //mulipart/form-data for upload
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                var httpStatus = xhr.statusText;
                var response = xhr.responseText;

                if (xhr.status == RETURN_CODE.OK) {
                    params.onSuccess(JSON.parse(response));
                }
                else {
                    params.onError(response);
                }
            }
        };
//        var args = "username="+params.data.username+"&password="+params.data.password;
        xhr.send(JSON.stringify(params.args));
    },
    onError: function (status) {
    },

    //连接pomelo: connector server
    enter: function (uid, token, cb) {
        pomelo.init({
            host: gGameSvrAddr.host,
            port: gGameSvrAddr.port,
            log: true
        }, function () {
            var route = 'gate.gateHandler.queryEntry';
            pomelo.request(route, {uid: uid, token: token}, function (data) {
                pomelo.disconnect();
                pomelo.init({
                    host: data.host,
                    port: data.port,
                    log: true,
                    handshakeCallback: function (handshakeData) {
                        Storage.set(CommonConf.LOCAL_STORAGE.HANDSHAKE_HEARTBEAT, handshakeData.heartbeat);
                        Storage.set(CommonConf.LOCAL_STORAGE.HANDSHAKE_TIME, (new Date(handshakeData.handshakeTime)).format('yyyy-MM-dd hh:mm:ss'));
                    }
                }, function () {
                    //标识已连接到connector
                    gHasConnector = true;
                    var route = 'connector.entryHandler.enter';
                    pomelo.request(route, {uid: uid, token: token}, function (data) {
                        cb(data);
                    });
                });
            });
        });
    }
};