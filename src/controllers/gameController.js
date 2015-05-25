var pomelo = window.pomelo;

var GameController = GameController || {};

/**
 * 加入游戏
 * @param roomId
 */
GameController.join = function (roomId, lobbyId)
{
    pomelo.request(route.join, {roomId: roomId, lobbyId: lobbyId}, function(data) {
        cc.log("new :", data);
    });
};

/**
 * 加入大厅
 * @param lobbyId
 */
GameController.enterLobby = function (lobbyId)
{
    pomelo.request(route.enterLobby, {lobbyId: lobbyId}, function(data) {
        cc.log("new :", data);
        var scene = new LobbyScene(data, lobbyId);
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    });

};



