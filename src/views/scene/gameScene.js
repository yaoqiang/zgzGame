var GameScene = cc.Scene.extend({
    ctor: function (args) {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.common_plist, res.common_png);
        cc.spriteFrameCache.addSpriteFrames(res.game_plist, res.game_png);
        cc.spriteFrameCache.addSpriteFrames(res.card_plist, res.card_png);

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
        this.m_pClock = null;
        this.m_pFanOutMenuLayer = null;
        this.m_pBidMenuLayer = null;

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
                this.m_pTableLayer.setClockCallback(this, this.clockCallback);
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
        this.addReadyMenu();

        //var card = new PokerCard({cardPoint:10, cardFace:4, cardSize:PokerCard_enum.kCCCardSizeLarge});
        //card.x = winSize.width/2-70;
        //card.y = winSize.height/2;
        //this.addChild(card);

    },

    addMenu:function(){
        this.m_pGameNemu = new GameMenuLayer();
        this.addChild(this.m_pGameNemu);

    },
    addReadyMenu:function(){
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
                if(actor.m_uid == one.m_uid){
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
            console.log(actorArray[i].properties);
            var actor = new Actor(actorArray[i]);
            this.m_actorList.push(actor);

        }
    },

    selfLeave: function (actor) {
        var actor = new Actor(actor);
        if(actor.m_uid == gPlayer.uid){
            return true;
        }
        return false;
    },

    clockCallback:function(){
        //删除bid，fanout menu
        this.removeBidMenu();
        this.removeFanOutMenu();
    },

    removeBidMenu:function(){
        //删除bid
        if(this.m_pBidMenuLayer){
            this.m_pBidMenuLayer.removeFromParent(true);
            this.m_pBidMenuLayer = null;
        }
    },
    removeFanOutMenu:function(){
        //删除fanout menu
        if(this.m_pFanOutMenuLayer){
            this.m_pFanOutMenuLayer.removeFromParent(true);
            this.m_pFanOutMenuLayer = null;

            if(this.m_pTableLayer){
                this.m_pTableLayer.m_pFanOutMenuLayer = this.m_pFanOutMenuLayer;
            }
        }
    },
    addBidMenu:function(tag){
        if(this.m_pBidMenuLayer == null){
            this.m_pBidMenuLayer = new BidMenuLayer();
            this.addChild(this.m_pBidMenuLayer, 99);
            this.m_pBidMenuLayer.setCallback(this, this.bidMenuCallback);
        }
        this.m_pBidMenuLayer.setBtnVisible(tag, true);
    },
    addFanOutMenu:function(){
        if(this.m_pFanOutMenuLayer == null){
            this.m_pFanOutMenuLayer = new FanOutMenuLayer();
            this.addChild(this.m_pFanOutMenuLayer);
            this.m_pFanOutMenuLayer.setCallback(this, this.fanOutCallback);

            if(this.m_pTableLayer){
                this.m_pTableLayer.m_pFanOutMenuLayer = this.m_pFanOutMenuLayer;
            }
        }
    },

    bidMenuCallback:function(tag){
        switch (tag){
            case BidMenuBtn.kCCBidMenu_Liang:
                GameController.talk(gRoomId, gGameId, GAME.IDENTITY.HONG3, this.m_pPokerLayer.m_pSelectedWillOutCards);
                break;
            case BidMenuBtn.kCCBidMenu_Guzi:
                GameController.talk(gRoomId, gGameId, GAME.IDENTITY.GUZI, this.m_pPokerLayer.m_pSelectedWillOutCards);
                break;
            case BidMenuBtn.kCCBidMenu_Bujiao:
                GameController.talk(gRoomId, gGameId, GAME.IDENTITY.UNKNOW, []);
                break;
        }

    },

    fanOutCallback:function(tag){

    },


//event
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
            var actor = this.m_actorList[i];
            if(data.actorNr == actor.m_actorNr){
                actor.m_isReady = true;
                this.m_pTableLayer.readyEvent(actor);
                return;
            }
        }
    },

    gameStartEvent:function(data){
        console.log("gameStartEvent :");
        //console.log(data.actor);
        gGameState = ZGZ.GAME_STATE.TALK;
        if(this.m_pPokerLayer){
            this.m_pPokerLayer.gameStart(data.actor);
        }
        console.log("gameStartEvent end");
    },

    onTalkCountdownEvent:function(data){
        console.log("onTalkCountdown :");
        //如果说话倒计时是当前玩家
        if(this.m_pPokerLayer){
            this.m_pPokerLayer.onTalkCountdown(data);
        }
        if(this.m_pTableLayer){
            this.m_pTableLayer.stopClock();
        }

        if (data.actor.uid == gPlayer.uid) {

            //识别当前玩家身份
            var identity = cardUtil.recognitionIdentity(gActor.cards, gGameType);
            //如果是红3，显示亮3说话按钮
            if (identity == GAME.IDENTITY.HONG3) {
                cc.log('说话阶段-当前玩家是红3，显示“亮3”按钮')
                this.addBidMenu(BidMenuBtn.kCCBidMenu_Liang);
            }
            else
            {
                cc.log('说话阶段-当前玩家是股子，显示“股子”按钮')
                this.addBidMenu(BidMenuBtn.kCCBidMenu_Guzi);
            }


        }else {

        }
        if(this.m_pTableLayer){
            this.m_pTableLayer.showClock(data.actor.actorNr, data.second);
        }

    },

    startEvent:function(data){
        
    },

    fanEvent:function(data){

    },

    overEvent:function(data){

    },
////response
    readyResponse:function(){
        cc.log("---->readyResponse");
        cc.log(this.m_actorList);
        this.m_pReadyMenu.removeFromParent(true);
        this.m_pReadyMenu = null;
        var actor;
        for(var i=0; this.m_actorList.length; i++){
            actor = this.m_actorList[i];
            cc.log("---->gPlayer.id:"+ gPlayer.uid + "--actor.m_uid:"+actor.m_uid);
            if(gPlayer.uid == actor.m_uid){
                actor.m_isReady = true;
                cc.log(actor);
                this.m_pTableLayer.readyResponse(actor);
                return;
            }
        }

    },

    TalkResponse:function(data){
        cc.log("---->TalkResponse");
        var code = data.code;
        if(code == 500){
            cc.log("----> talk fail");
            return;
        }

        this.removeBidMenu();

        if(this.m_pTableLayer){
            this.m_pTableLayer.stopClock();
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

        cc.eventManager.addCustomListener("onTalkCountdownEvent", function(event){
            cc.log("---->game  onTalkCountdownEvent: ", event._userData);
            selfPointer.onTalkCountdownEvent(event._userData);
        });

    //response
        cc.eventManager.addCustomListener("ReadyResponse", function(event){
            cc.log("---->game  ReadyResponse: ", event._userData);
            selfPointer.readyResponse();
        });

        cc.eventManager.addCustomListener("TalkResponse", function(event){
            cc.log("---->game  TalkResponse: ", event._userData);
            selfPointer.TalkResponse(event._userData);
        });

    },

    onExit:function(){
        this._super();
        //event
        cc.eventManager.removeCustomListeners("JoinEvent");
        cc.eventManager.removeCustomListeners("LeaveEvent");
        cc.eventManager.removeCustomListeners("ReadyEvent");
        cc.eventManager.removeCustomListeners("GameStartEvent");
        cc.eventManager.removeCustomListeners("onTalkCountdownEvent");


        //response
        cc.eventManager.removeCustomListeners("ReadyResponse");
        cc.eventManager.removeCustomListeners("TalkResponse");


        cc.spriteFrameCache.removeSpriteFramesFromFile(res.common_plist);
        cc.spriteFrameCache.removeSpriteFramesFromFile(res.game_plist);
        cc.spriteFrameCache.removeSpriteFramesFromFile(res.card_plist);
    }
    
    
});