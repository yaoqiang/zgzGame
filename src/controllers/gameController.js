var pomelo = window.pomelo;

var GameController = GameController || {};

/**
 * 加入游戏
 * @param roomId
 */
GameController.join = function (roomId, lobbyId)
{
    cc.log("GameController.join roomId:", roomId);
    gRoomId = roomId;
    pomelo.request(route.join, {roomId: roomId}, function(data) {
        cc.log("join :", data);
        if(data.code == 200){
            var scene = new GameScene(data);
            cc.director.runScene(new cc.TransitionFade(1.2, scene));

        }else if(data.code == 500){
            cc.log("----> join game fail");
        }

    });
};

/**
 * 离开游戏
 * @param roomId
 */
GameController.leave = function (roomId, lobbyId)
{
    cc.log("GameController.leave roomId:", roomId);
    pomelo.request(route.leave, {roomId: roomId}, function(data) {
        cc.log("leave :", data);
        if(data.code == 200){
            GameController.enterLobby(gLobbyId);

        }else if(data.code == 500){
            cc.log("----> join game fail");
        }

    });
};
/**
 * 加入大厅
 * @param lobbyId
 */
GameController.enterLobby = function (lobbyId)
{
    pomelo.request(route.enterLobby, {lobbyId: lobbyId}, function(data) {
        cc.log("enterLobby :", data);
        var scene = new LobbyScene(data, lobbyId);
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    });

};

/**
 * ready
 * @param roomId
 */
GameController.ready = function (roomId, gameId)
{
    cc.log("GameController.ready roomId:" +  roomId + "  gameId: "+gameId);
    pomelo.request(route.ready, {roomId: roomId, gameId:gameId}, function(data) {
        cc.log("ready :", data);
        if(data.code == 200){
            cc.eventManager.dispatchCustomEvent("ReadyResponse", data);

        }else if(data.code == 500){
            cc.log("----> ready game fail");
        }

    });
};

