var pomelo = window.pomelo;
/**
 * http请求
 */
var Network = {
    url: gWebSvrAddr.host.concat(':').concat(gWebSvrAddr.port).concat('/'),
    get : function(params) {
    },
    post: function (params) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", this.url+params.action);
        //set Content-Type "application/x-www-form-urlencoded" to post form data
        //mulipart/form-data for upload
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                var httpStatus = xhr.statusText;
                var response = xhr.responseText;

                if (xhr.status == 200)
                {
                    params.onSuccess(JSON.parse(response));
                }
                else
                {
                    params.onError(response);
                }


            }
        };
//        var args = "username="+params.data.username+"&password="+params.data.password;
        xhr.send(params.args);
    },
    onError : function(status) {
    },

    //连接pomelo: connector server
    enter: function(uid, token, cb) {
        pomelo.init({
            host: gGameSvrAddr.host,
            port: gGameSvrAddr.port,
            log: true
        }, function() {
            var route = 'gate.gateHandler.queryEntry';
            pomelo.request(route, {uid: uid}, function(data) {
                pomelo.disconnect();
                pomelo.init({
                    host: data.host,
                    port: data.port,
                    log: true
                }, function() {
                    var route = 'connector.entryHandler.enter';
                    pomelo.request(route, {uid: uid, token: token}, function(data) {
                        cb(data);
                    });
                });
            });
        });
    }
};