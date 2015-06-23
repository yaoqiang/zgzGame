var GameScene = cc.Scene.extend({
    ctor: function (args) {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.common_plist, res.common_png);
        cc.spriteFrameCache.addSpriteFrames(res.game_plist, res.game_png);

        var layer = new GameLayer(args);
        this.addChild(layer);

    }

});

var GameLayer = cc.Layer.extend({
    sprite: null,
    ctor: function (args) {
        console.log("GameLayer ctor : ",args);
        this._super();
        this.m_pData = args;
        this.m_type = args.lobbyId;
        gLobbyId = args.lobbyId;
        gGameId = args.gameId;
        this.m_pTableLayer = null;
        this.m_pPokerLayer = null;
        this.m_pGameNemu = null;
        this.m_pReadyMenu = null;

        this.initAcrorList(args.actors);

        this.init();
    },

    init: function () {
        var winSize = cc.director.getWinSize();
        //牌桌
        var bg = cc.Sprite.create("#beijing.png");
        bg.setPosition(cc.p(winSize.width/2, winSize.height/2));
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        this.addChild(new HornSpriteForGame());

        //其他玩家
        switch (this.m_type)
        {
            case ZGZ.GAME_TYPE.T1:
                this.m_pTableLayer = new FivePeopleTableLayer();
                this.addChild(this.m_pTableLayer);

                break;
            case ZGZ.GAME_TYPE.T2:
                this.m_pTableLayer = new SevenPeopleTableLayer();
                this.addChild(this.m_pTableLayer);
                break;
        }
        this.addPokerLayer();
        //刷新玩家信息
        this.updataActorHD();
        //gamen nenu
        this.addMenu();
    },

    addMenu:function(){
        this.m_pGameNemu = new GameMenuLayer();
        this.addChild(this.m_pGameNemu);

        this.m_pReadyMenu = new ReadyMenuLayer();
        this.addChild(this.m_pReadyMenu);
    },

    addPokerLayer:function(){
        this.m_pPokerLayer = new PokerLayer();
        this.addChild(this.m_pPokerLayer);
    },

     updataActorHD:function(){
         //刷新头像
         this.m_pTableLayer.updataActorHD(this.m_actorList);
     },

    sortActor:function(){
        //重新排列actor，从而改变他们现实的位置。
        if(this.m_actorList == null){
            return;
        }



    },

    addActorToList:function(actor){
        console.log("addActorToList  : ", actor);
        if(this.m_actorList){
            var actor = new Actor(actor);
            this.m_actorList.push(actor);
        }
    },
    removeActorFromList:function(actor){
        if(this.m_actorList){
            var actor = new Actor(actor);
            //离开别人
            for(var i=0; this.m_actorList.length; i++){
                var one = this.m_actorList[i];
                if(actor.m_properties.id == one.m_properties.id){
                    //this.m_actorList.delete(one);
                    this.m_actorList.splice(i,1);
                    return;
                }
            }
        }
    },
//把join得到的actor数组重新整理，生成actor结构，push到
    initAcrorList:function(actorArray){
        this.m_actorList = [];

        var len = actorArray.length;

        for(var i=0; i < len; i++){
            console.log(actorArray[i]);
            console.log(actorArray[i].gameStatus);
            console.log(actorArray[i].properties);
            var actor = new Actor(actorArray[i]);
            this.m_actorList.push(actor);

        }
    },

    selfLeave: function (actor) {
        var actor = new Actor(actor);
        if(actor.m_properties.id == gPlayer.id){
            return true;
        }
        return false;
    },

    joinEvent: function (data) {
        this.addActorToList(data.actor);
        this.updataActorHD();
    },

    leaveEvent: function (data) {
        console.log("leaveEvent :");
        console.log(data);

        if(this.selfLeave(data.actor) == false){
            this.removeActorFromList(data.actor);
            this.updataActorHD();
        }else{
            GameController.enterLobby(gLobbyId);//回大厅
        }
    },


    readyEvent:function (data) {
        console.log("readyEvent :");
        console.log(data);
        //var actor = new Actor(actor);
       // this.m_pTableLayer.readyEvent(actor);
        for(var i=0; this.m_actorList.length; i++){
            var one = this.m_actorList[i];
            if(data.actorNr == one.m_actorNr){
                one.m_isReady = true;
                this.m_pTableLayer.readyEvent(one);
                return;
            }
        }
    },

    gameStartEvent:function (data) {
        console.log("gameStartEvent :");
        console.log(data);


    },

    startEvent: function (data) {
        
    },

    fanEvent: function (data) {

    },

    overEvent: function (data) {

    },
////response
    readyResponse: function () {
        this.m_pReadyMenu.removeFromParent(true);
        this.m_pReadyMenu = null;

        for(var i=0; this.m_actorList.length; i++){
            var one = this.m_actorList[i];
            if(gPlayer.id == one.m_properties.id){
                one.m_isReady = true;
                this.m_pTableLayer.readyResponse(one);
                return;
            }
        }

    },



    onEnter:function(){
        this._super();
        selfPointer = this;
        //event
        cc.eventManager.addCustomListener("JoinEvent", function(event){
            cc.log("---->game JoinEvent: ", event._userData);
            selfPointer.joinEvent(event._userData);
        });

        cc.eventManager.addCustomListener("LeaveEvent", function(event){
            cc.log("---->game  LeaveEvent: ", event._userData);
            selfPointer.leaveEvent(event._userData);
        });

        cc.eventManager.addCustomListener("ReadyEvent", function(event){
            cc.log("---->game  ReadyEvent: ", event._userData);
            selfPointer.readyEvent(event._userData);
        });

        cc.eventManager.addCustomListener("GameStartEvent", function(event){
            cc.log("---->game  GameStartEvent: ", event._userData);
            selfPointer.gameStartEvent(event._userData);
        });

    //response
        cc.eventManager.addCustomListener("ReadyResponse", function(event){
            cc.log("---->game  ReadyResponse: ", event._userData);
            selfPointer.readyResponse();
        });

    },

    onExit:function(){
        this._super();
        //event
        cc.eventManager.removeCustomListeners("JoinEvent");
        cc.eventManager.removeCustomListeners("LeaveEvent");
        cc.eventManager.removeCustomListeners("ReadyEvent");


        //response
        cc.eventManager.removeCustomListeners("ReadyResponse");
    }
    
    
});