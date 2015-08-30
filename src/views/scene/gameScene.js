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
        console.log("GameLayer ctor : ", args);
        this._super();
        this.m_pData = args;
        this.m_type = args.lobbyId;
        this.base = args.base;
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
        bg.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        //this.addChild(new HornSpriteForGame());

        //房间底注
        var baseLabel = new cc.LabelTTF("底注: "+this.base, "Arial", 32);
        baseLabel.color = cc.color.YELLOW;
        baseLabel.setPosition(winSize.width / 2 + 200, winSize.height / 2 + 180)
        this.addChild(baseLabel);
        //喊话股数

        //其他玩家
        switch (this.m_type) {
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
        this.addPokerLayer(this.m_pTableLayer);
        //刷新玩家信息
        this.updateActorHD();
        //gamen nenu
        this.addMenu();
        this.addReadyMenu();

        //var card = new PokerCard({cardPoint:10, cardFace:4, cardSize:PokerCard_enum.kCCCardSizeLarge});
        //card.x = winSize.width/2-70;
        //card.y = winSize.height/2;
        //this.addChild(card);

    },

    addMenu: function () {
        this.m_pGameNemu = new GameMenuLayer();
        this.addChild(this.m_pGameNemu);

    },
    addReadyMenu: function () {
        this.m_pReadyMenu = new ReadyMenuLayer();
        this.addChild(this.m_pReadyMenu);
    },

    addPokerLayer: function (tableLayer) {
        this.m_pPokerLayer = new PokerLayer();
        this.addChild(this.m_pPokerLayer, 0);
        this.m_pPokerLayer.m_pTable = tableLayer;
    },

    updateActorHD: function () {
        //刷新头像
        this.m_pTableLayer.updateActorHD(this.m_actorList);
    },

    sortActor: function () {
        //重新排列actor，从而改变他们现实的位置。
        if (this.m_actorList == null) {
            return;
        }


    },

    addActorToList: function (actor) {
        console.log("addActorToList  : ", actor);
        if (this.m_actorList) {
            var actor = new Actor(actor);
            this.m_actorList.push(actor);
        }
    },
    removeActorFromList: function (actor) {
        if (this.m_actorList) {
            var actor = new Actor(actor);
            //离开别人
            for (var i = 0; this.m_actorList.length; i++) {
                var one = this.m_actorList[i];
                if (actor.m_uid == one.m_uid) {
                    //this.m_actorList.delete(one);
                    this.m_actorList.splice(i, 1);
                    return;
                }
            }
        }
    },
//把join得到的actor数组重新整理，生成actor结构，push到
    initAcrorList: function (actorArray) {
        this.m_actorList = [];

        var len = actorArray.length;

        for (var i = 0; i < len; i++) {
            console.log(actorArray[i]);
            console.log(actorArray[i].properties);
            var actor = new Actor(actorArray[i]);
            this.m_actorList.push(actor);

        }
    },

    selfLeave: function (actor) {
        var actor = new Actor(actor);
        if (actor.m_uid == gPlayer.uid) {
            return true;
        }
        return false;
    },

    clockCallback: function () {
        //删除bid，fanout menu
        this.removeBidMenu();
        this.removeFanOutMenu();
    },

    removeBidMenu: function () {
        //删除bid
        if (this.m_pBidMenuLayer) {
            this.m_pBidMenuLayer.removeFromParent(true);
            this.m_pBidMenuLayer = null;
        }
    },
    removeFanOutMenu: function () {
        //删除fanout menu
        console.log("--->removeFanOutMenu  1");
        if (this.m_pFanOutMenuLayer) {
            this.m_pFanOutMenuLayer.removeFromParent(true);
            this.m_pFanOutMenuLayer = null;
            console.log("--->removeFanOutMenu");
            if (this.m_pPokerLayer) {
                this.m_pPokerLayer.m_pFanOutMenuLayer = this.m_pFanOutMenuLayer;
            }
        }
    },
    addBidMenu: function (tag) {
        if (this.m_pBidMenuLayer == null) {
            this.m_pBidMenuLayer = new BidMenuLayer();
            this.addChild(this.m_pBidMenuLayer, 10);
            this.m_pBidMenuLayer.setCallback(this, this.bidMenuCallback);
        }
        this.m_pBidMenuLayer.setBtnVisible(tag, true);
    },
    addFanOutMenu: function () {
        console.log("--->addFanOutMenu   1");
        if (this.m_pFanOutMenuLayer == null) {
            this.m_pFanOutMenuLayer = new FanOutMenuLayer();
            this.addChild(this.m_pFanOutMenuLayer, 10);
            this.m_pFanOutMenuLayer.setCallback(this, this.fanOutCallback);
            console.log("--->addFanOutMenu");
            if (this.m_pPokerLayer) {
                this.m_pPokerLayer.m_pFanOutMenuLayer = this.m_pFanOutMenuLayer;
            }
        }
    },

    bidMenuCallback: function (tag) {
        switch (tag) {
            case BidMenuBtn.kCCBidMenu_Liang:
                var identity = cardUtil.recognitionIdentity(this.m_pPokerLayer.m_pSelectedWillOutCards, gGameType);
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

    fanOutCallback: function (tag) {
        //GameController.fan = function (roomId, gameId, cards)
        switch (tag) {
            case FanOutMenuBtn.kCCFanOutMenu_Pass:
                GameController.fan(gRoomId, gGameId, []);
                break;
            case FanOutMenuBtn.kCCFanOutMenu_FanOut:
                GameController.fan(gRoomId, gGameId, this.m_pPokerLayer.m_pSelectedWillOutCards);
                break;
            case FanOutMenuBtn.kCCFanOutMenu_Hint:
                GameController.fan(gRoomId, gGameId, this.m_pPokerLayer.m_pSelectedWillOutCards);
                break;
        }
    },


    recognitionIdentityWithNr: function (goal, append, actorNr) {
        if (this.m_actorList == null) {
            return;
        }
        var isIdentity = false;
        var identity = cardUtil.recognitionIdentity(append, gGameType);
        //if (identity == GAME.IDENTITY.HONG3) {
        //    isIdentity = true;
        //}

        //var len = this.m_actorList.length;
        //for(var i=0; i<len; i++){
        //    var　actor = this.m_actorList[i];
        //    if(gActor.actorNr == actorNr){
        //        gActor.identity = isIdentity;
        //    }
        //    if(actor.m_actorNr == actorNr){
        //        actor.m_identity = isIdentity;
        //        break;
        //    }
        //}

        var actorHD = this.m_pTableLayer.getActorHDWithNr(actorNr)
        if (actorHD) {
            actorHD.m_identity = identity;
            actorHD.showIdentity(goal, append);
        }
    },

    sayForTalk: function (args) {
        if (this.m_actorList == null) {
            return;
        }

        var append = args.append;
        var text = args.text ? args.text : "";
        var actorNr = args.actorNr;
        var haveAppend = false;

        if (append) {
            haveAppend = true;
            //分析牌型
            //var identity = cardUtil.recognitionIdentity(append, gGameType);
            if (args.goal == GAME.IDENTITY.HONG3) {
                text = "亮3";
            }
            else if (args.goal == GAME.IDENTITY.GUZI) {
                text = "股子"
            }
            else {
                text = "没话";
            }
        }

        this.m_pTableLayer.showSay(text, actorNr);

    },

//event
    joinEvent: function (data) {
        this.addActorToList(data.actor);
        this.updateActorHD();
    },

    leaveEvent: function (data) {
        console.log("leaveEvent :");
        console.log(data);

        if (this.selfLeave(data.actor) == false) {
            this.removeActorFromList(data.actor);
            this.updateActorHD();
        } else {
            GameController.enterLobby(gLobbyId);//回大厅
        }
    },


    readyEvent: function (data) {
        console.log("readyEvent :");
        console.log(data);
        //var actor = new Actor(actor);
        // this.m_pTableLayer.readyEvent(actor);
        for (var i = 0; this.m_actorList.length; i++) {
            var actor = this.m_actorList[i];
            if (data.actorNr == actor.m_actorNr) {
                actor.m_isReady = true;
                this.m_pTableLayer.readyEvent(actor);
                return;
            }
        }
    },

    gameStartEvent: function (data) {
        console.log("gameStartEvent :");
        //console.log(data.actor);
        gGameState = ZGZ.GAME_STATE.TALK;
        if (this.m_pPokerLayer) {
            this.m_pPokerLayer.gameStart(data.actor);
        }
        console.log("gameStartEvent end");
    },

    talkCountdownEvent: function (data) {
        console.log("onTalkCountdown :");
        //如果说话倒计时是当前玩家
        if (this.m_pPokerLayer) {
            this.m_pPokerLayer.onTalkCountdown(data);
        }
        if (this.m_pTableLayer) {
            this.m_pTableLayer.stopClock();
        }

        if (data.actor.uid == gPlayer.uid) {

            //识别当前玩家身份
            var identity = cardUtil.recognitionIdentity(gActor.cards, gGameType);
            //如果是红3，显示亮3说话按钮
            if (identity == GAME.IDENTITY.HONG3) {
                cc.log('说话阶段-当前玩家是红3，显示“亮3”按钮')
                this.addBidMenu(BidMenuBtn.kCCBidMenu_Liang);
                //gActor.identity = true;
            }
            else {
                cc.log('说话阶段-当前玩家是股子，显示“股子”按钮')
                this.addBidMenu(BidMenuBtn.kCCBidMenu_Guzi);
                //gActor.identity = false;
            }


        } else {

        }
        if (this.m_pTableLayer) {
            this.m_pTableLayer.showClock(data.actor.actorNr, data.second);
        }

    },

    startEvent: function (data) {

    },

    talkEvent: function (data) {
        cc.log("----------------->talkEvent:", data);
        var uid = data.uid;
        var actorNr = data.actorNr;
        var goal = data.goal;
        var append = data.append;
        var share = data.share;

        this.recognitionIdentityWithNr(goal, append, actorNr);
        this.removeBidMenu();

        if (this.m_pTableLayer) {
            this.m_pTableLayer.stopClock();
        }
        this.updateShare(share);
        this.sayForTalk({goal: goal, append: append, actorNr: actorNr});
    },

    afterTalk: function (data) {
        cc.log("----------------->afterTalk:", data);
        if (this.m_pTableLayer) {
            this.m_pTableLayer.stopClock();
            this.m_pTableLayer.removeAllActorReady();
        }
        this.removeBidMenu();

    },

    talkTimeoutEvent: function (data) {
        cc.log("---->talkTimeoutEvent:", data);
        //var uid = data.uid;
        //var actorNr = data.actorNr;
        //var cards = data.cards;
        //var cardRecognization = data.cardRecognization;
        //this.m_pPokerLayer.setFanOutCards(cards, actorNr);
    },

    fanOutEvent: function (data) {
        cc.log("---->fanOutEvent:", data);
        var uid = data.uid;
        var actorNr = data.actorNr;
        var cards = data.cards;
        var cardRecognization = data.cardRecognization;
        this.m_pPokerLayer.setFanOutCards(cards, actorNr);


    },

    fanCountdownEvent: function (data) {
        cc.log("---->fanCountdownEvent:", data);
        gGameState = ZGZ.GAME_STATE.PLAY;
        if (this.m_pTableLayer) {
            this.m_pTableLayer.stopClock();
            this.removeFanOutMenu();
        }

        if (data.actor.uid == gPlayer.uid) {
            this.addFanOutMenu();
            if (data.isBoss) {
                if (this.m_pFanOutMenuLayer) {
                    this.m_pFanOutMenuLayer.setBtnEnabled(FanOutMenuBtn.kCCFanOutMenu_Pass, false);
                }
            }
            this.m_pFanOutMenuLayer.setBtnEnabled(FanOutMenuBtn.kCCFanOutMenu_FanOut, false);
        } else {

        }

        if (this.m_pTableLayer) {
            this.m_pTableLayer.showClock(data.actor.actorNr, data.second);
        }

        if (this.m_pPokerLayer) {
            if (data.isBoss) {
                this.m_pPokerLayer.hideAllActorFanOutCards();
            }else{
                this.m_pPokerLayer.hideFanOutCards(data.actor.actorNr);
            }
        }

    },

    /**
     *3家没有亮3,先出黑3,为防止骗人,通知他人. 调用sayForTalk: "我有3"
     * @param data {actor: {uid: xx, actorNr: xx}}
     */
    fanWhenIsRedEvent: function (data) {
        var actor = data.actor;
        this.sayForTalk({append: null, actorNr: actor.actorNr, text: "我有3"});
    },

    /**
     * 当玩家除完手牌，标识玩家名次和身份
     * @param data {actor: {uid: xx, actorNr: xx, rank: xx, identity: xx}}
     */
    fanFinishedEvent: function (data) {
        var actor = data.actor;
        this.m_pTableLayer.fanFinishedEvent(actor.actorNr, actor.rank, actor.identity);
    },

    /**
     * 游戏结束
     * @param data
     */
    overEvent: function (data) {
        var self = this;
        this.removeFanOutMenu();
        if (this.m_pPokerLayer)
        {
            this.m_pPokerLayer.clearCards();
        }

        if (this.m_pTableLayer)
        {
            this.m_pTableLayer.stopClock();
        }
        this.balanceLayer = new BalanceLayer(data,
            {
                ready: function () {
                    if (self.balanceLayer) self.balanceLayer.removeFromParent(true);
                    GameController.ready(gRoomId, gGameId);
                },
                leave: function () {
                    GameController.leave(gRoomId);
                }
        });
        this.addChild(this.balanceLayer);
    },

    /**
     * 准备响应
     */
    readyResponse: function () {
        cc.log("---->readyResponse");
        cc.log(this.m_actorList);
        this.m_pReadyMenu.removeFromParent(true);
        this.m_pReadyMenu = null;
        var actor;
        for (var i = 0; this.m_actorList.length; i++) {
            actor = this.m_actorList[i];
            cc.log("---->gPlayer.id:" + gPlayer.uid + "--actor.m_uid:" + actor.m_uid);
            if (gPlayer.uid == actor.m_uid) {
                actor.m_isReady = true;
                cc.log(actor);
                this.m_pTableLayer.readyResponse(actor);
                return;
            }
        }

    },

    /**
     * 说话响应
     * @param data
     * @constructor
     */
    talkResponse: function (data) {
        cc.log("----------------->TalkResponse:", data);
        var code = data.code;
        if (code == 500) {
            cc.log("----> talk fail");
            return;
        }

        var goal = data.goal;
        var append = data.append;
        var share = data.share;

        this.removeBidMenu();

        this.recognitionIdentityWithNr(goal, append, gActor.actorNr);
        this.sayForTalk({goal: goal, append: append, actorNr: gActor.actorNr});

        if (this.m_pTableLayer) {
            this.m_pTableLayer.stopClock();
        }
        this.updateShare(share);
    },

    /**
     * 出牌响应
     * @param data
     * @constructor
     */
    fanOutResponse: function (data) {
        cc.log("FanOutResponse :", data);
        var code = data.code;
        if (code == 500) {
            cc.log("----> FanOutResponse fail");
            return;
        }

        var cards = data.cards;
        var cardRecognization = data.cardRecognization;
        //this.m_pPokerLayer.setFanOutCards(cards, gActor.actorNr);

    },


    /**
     * 更新股数
     * @param share
     */
    updateShare: function (share) {
        //var roomInfoLabel = new cc.LabelTTF("底注:"+this.m_pData.base, "Arial", 34);
        //var gameShare = new cc.LabelTTF("股数:"+share, "Arial", 34);

    },


    onEnter: function () {
        this._super();
        selfPointer = this;
        //event
        cc.eventManager.addCustomListener("joinEvent", function (event) {
            cc.log("---->game joinEvent: ", event._userData);
            selfPointer.joinEvent(event._userData);
        });

        cc.eventManager.addCustomListener("leaveEvent", function (event) {
            cc.log("---->game  leaveEvent: ", event._userData);
            selfPointer.leaveEvent(event._userData);
        });

        cc.eventManager.addCustomListener("readyEvent", function (event) {
            cc.log("---->game  readyEvent: ", event._userData);
            selfPointer.readyEvent(event._userData);
        });

        cc.eventManager.addCustomListener("gameStartEvent", function (event) {
            cc.log("---->game  gameStartEvent: ", event._userData);
            selfPointer.gameStartEvent(event._userData);
        });

        cc.eventManager.addCustomListener("talkCountdownEvent", function (event) {
            cc.log("---->game  talkCountdownEvent: ", event._userData);
            selfPointer.talkCountdownEvent(event._userData);
        });

        cc.eventManager.addCustomListener("fanOutEvent", function (event) {
            cc.log("---->game  fanOutEvent: ", event._userData);
            selfPointer.fanOutEvent(event._userData);
        });

        cc.eventManager.addCustomListener("fanCountdownEvent", function (event) {
            cc.log("---->game  fanCountdownEvent: ", event._userData);
            selfPointer.fanCountdownEvent(event._userData);
        });

        cc.eventManager.addCustomListener("talkEvent", function (event) {
            cc.log("---->game  talkEvent: ", event._userData);
            selfPointer.talkEvent(event._userData);
        });

        cc.eventManager.addCustomListener("talkTimeoutEvent", function (event) {
            cc.log("---->game  talkTimeoutEvent: ", event._userData);
            selfPointer.talkTimeoutEvent(event._userData);
        });

        cc.eventManager.addCustomListener("afterTalk", function (event) {
            cc.log("---->game  afterTalk: ", event._userData);
            selfPointer.afterTalk(event._userData);
        });

        cc.eventManager.addCustomListener("gameOverEvent", function (event) {
            cc.log("---->game  gameOverEvent: ", event._userData);
            selfPointer.overEvent(event._userData);
        });

        cc.eventManager.addCustomListener("fanFinishedEvent", function (event) {
            cc.log("---->game  fanFinishedEvent: ", event._userData);
            selfPointer.fanFinishedEvent(event._userData);
        });

        cc.eventManager.addCustomListener("fanWhenIsRedEvent", function (event) {
            cc.log("---->game  fanWhenIsRedEvent: ", event._userData);
            selfPointer.fanWhenIsRedEvent(event._userData);
        });




        //response
        cc.eventManager.addCustomListener("readyResponse", function (event) {
            cc.log("---->game  readyResponse: ", event._userData);
            selfPointer.readyResponse();
        });

        cc.eventManager.addCustomListener("talkResponse", function (event) {
            cc.log("---->game  talkResponse: ", event._userData);
            selfPointer.talkResponse(event._userData);
        });

        cc.eventManager.addCustomListener("fanOutResponse", function (event) {
            cc.log("---->game  fanOutResponse: ", event._userData);
            selfPointer.fanOutResponse(event._userData);
        });


        //this.addBidMenu(BidMenuBtn.kCCBidMenu_Liang);
        //this.m_pBidMenuLayer.setBtnEnabled(BidMenuBtn.kCCBidMenu_Liang,true);
        //this.addFanOutMenu();
    },

    onExit: function () {
        this._super();
        //event
        cc.eventManager.removeCustomListeners("joinEvent");
        cc.eventManager.removeCustomListeners("leaveEvent");
        cc.eventManager.removeCustomListeners("readyEvent");
        cc.eventManager.removeCustomListeners("gameStartEvent");
        cc.eventManager.removeCustomListeners("talkCountdownEvent");
        cc.eventManager.removeCustomListeners("fanOutEvent");
        cc.eventManager.removeCustomListeners("fanCountdownEvent");
        cc.eventManager.removeCustomListeners("talkEvent");
        cc.eventManager.removeCustomListeners("gameOverEvent");

        //response
        cc.eventManager.removeCustomListeners("readyResponse");
        cc.eventManager.removeCustomListeners("talkResponse");
        cc.eventManager.removeCustomListeners("fanOutResponse");

        cc.spriteFrameCache.removeSpriteFramesFromFile(res.common_plist);
        cc.spriteFrameCache.removeSpriteFramesFromFile(res.game_plist);
        cc.spriteFrameCache.removeSpriteFramesFromFile(res.card_plist);
    }


});