var FivePeopleTableLayer = cc.Layer.extend({

    ctor: function (args) {
        this._super();
//类变量
        this.m_actorList = [];
        this.m_HDList = [];
        this.m_pClock = null;
        this.m_pClockCallback = null;
        this.m_pClockTarge = null;

        this.onActorAvatarClickedCallback = args.onActorAvatarClickedCallback;


        this.init();

    },

    init: function () {
        var winSize = cc.director.getWinSize();
        var leftP = 50;
        var rightP = 50;

        //player按逆时针位置顺序创建,再按顺序扔到this.m_HDList, 为后续识别座位排序
        var player1 = new PlayerLayer({
            onActorAvatarClickedCallback: this.onActorAvatarClickedCallback,
            index: 1,
            position: {x: leftP, y: 65},
            anchor: {x: 0.5, y: 0.5}
        });
        var player2 = new PlayerLayer({
            onActorAvatarClickedCallback: this.onActorAvatarClickedCallback,
            index: 2,
            position: {x: winSize.width - rightP, y: 160 + 50},
            anchor: {x: 0.5, y: 0.5}
        });
        var player3 = new PlayerLayer({
            onActorAvatarClickedCallback: this.onActorAvatarClickedCallback,
            index: 3,
            position: {x: winSize.width - rightP, y: 280 + 50},
            anchor: {x: 0.5, y: 0.5}
        });
        var player4 = new PlayerLayer({
            onActorAvatarClickedCallback: this.onActorAvatarClickedCallback,
            index: 4,
            position: {x: leftP, y: 280 + 50},
            anchor: {x: 0.5, y: 0.5}
        });
        var player5 = new PlayerLayer({
            onActorAvatarClickedCallback: this.onActorAvatarClickedCallback,
            index: 5,
            position: {x: leftP, y: 160 + 50},
            anchor: {x: 0.5, y: 0.5}
        });


        this.addChild(player1);
        this.addChild(player2);
        this.addChild(player3);
        this.addChild(player4);
        this.addChild(player5);

        this.m_HDList.push(player1);
        this.m_HDList.push(player2);
        this.m_HDList.push(player3);
        this.m_HDList.push(player4);
        this.m_HDList.push(player5);

    },


    updateActorHD: function (args) {
        //cc.log("---->updateActorHD:",args);
        var len = args.length;
        var listlen = this.m_HDList.length;
        var i = 0;
        var j = 0;
        for (i = 0; i < listlen; i++) {
            this.m_HDList[i].clear();
        }
        //for(i=0; i<len; i++){
        //    this.m_HDList[i].updata(args[i]);
        //}
        //找到自己
        var selfIndex = 0;
        for (i = 0; i < len; i++) {
            if (args[i].m_uid == gPlayer.uid) {
                selfIndex = i;
            }
        }

        //计算Player的座位号
        //if (this.m_HDList[0].m_Nr == -1) {
        for (var k = 0; k < listlen; k++) {
            var v = args[selfIndex].m_actorNr - 1;
            this.m_HDList[k].m_Nr = (v + k) % listlen + 1;
        }
        //}


        //从自己向后排列
        //for(i=selfId; i<len; i++){
        //    this.m_HDList[j].updata(args[i]);
        //    j++;
        //}
        ////排列自己前面的
        //j=0;
        //for(i=selfId-1; i>=0; i--){
        //    this.m_HDList[listlen-1-j].updata(args[i]);
        //    j++;
        //}

        for (i = 0; i < len; i++) {
            for (var k = 0; k < listlen; k++) {
                if (args[i].m_actorNr == this.m_HDList[k].m_Nr) {
                    this.m_HDList[k].updata(args[i]);
                }
            }
        }
    },

    updateOneActorHD: function (actor, type) {

        var listlen = this.m_HDList.length;
        if (type == 1) {
            var actor = new Actor(actor);
            for (var k = 0; k < listlen; k++) {
                if (actor.m_actorNr == this.m_HDList[k].m_Nr) {
                    this.m_HDList[k].updata(actor);
                }
            }
        } else {
            for (var k = 0; k < listlen; k++) {
                if (actor.actorNr == this.m_HDList[k].m_Nr) {
                    this.m_HDList[k].clear();
                }
            }
        }

    },

    readyResponse: function (actor) {
        var listlen = this.m_HDList.length;
        var i = 0;

        for (i = 0; i < listlen; i++) {
            if (this.m_HDList[i].m_uid == actor.m_uid) {
                this.m_HDList[i].showReady(true);
                return;
            }
        }
    },

    readyEvent: function (actor) {
        var listlen = this.m_HDList.length;
        var i = 0;

        for (i = 0; i < listlen; i++) {
            if (this.m_HDList[i].m_uid == actor.m_uid) {
                this.m_HDList[i].showReady(true);
                return;
            }
        }
    },

    removeAllActorReady: function () {
        var listlen = this.m_HDList.length;
        var i = 0;

        for (i = 0; i < listlen; i++) {
            this.m_HDList[i].showReady(false);
        }
    },

    showCardPosition: function (actorNr) {
        var winSize = cc.director.getWinSize();
        var listlen = this.m_HDList.length;
        var i = 0;
        var selfNr;
        for (i = 0; i < listlen; i++) {
            if (this.m_HDList[i].m_uid == gPlayer.uid) {
                selfNr = this.m_HDList[i].m_Nr;
                break;
            }
        }

        if (selfNr == actorNr) {
            return {x: winSize.width / 2, y: winSize.height / 2, mode: SHOW_MODE.CENTER};
        }

        for (i = 0; i < listlen; i++) {
            if (this.m_HDList[i].m_Nr == actorNr) {
                if (this.m_HDList[i].m_position.x < winSize.width / 2) {

                    if (this.m_HDList[i].m_position.y > 350) {
                        return {
                            x: this.m_HDList[i].m_position.x,
                            y: this.m_HDList[i].m_position.y - 70,
                            mode: SHOW_MODE.BOTTOM
                        };
                    }
                    return {x: this.m_HDList[i].m_position.x, y: this.m_HDList[i].m_position.y, mode: SHOW_MODE.LEFT};
                } else {
                    if (this.m_HDList[i].m_position.y > 350) {
                        return {
                            x: this.m_HDList[i].m_position.x,
                            y: this.m_HDList[i].m_position.y - 70,
                            mode: SHOW_MODE.BOTTOM
                        };
                    }
                    return {x: this.m_HDList[i].m_position.x, y: this.m_HDList[i].m_position.y, mode: SHOW_MODE.RIGHT};
                }
            }
        }
    },
//闹钟
    showClockPosition: function (actorNr) {
        var winSize = cc.director.getWinSize();
        var listlen = this.m_HDList.length;
        var i = 0;
        var selfNr;
        for (i = 0; i < listlen; i++) {
            if (this.m_HDList[i].m_uid == gPlayer.uid) {
                selfNr = this.m_HDList[i].m_Nr;
                break;
            }
        }
        //console.log("selfNr:", selfNr);
        for (i = 0; i < listlen; i++) {
            if (this.m_HDList[i].m_Nr == actorNr) {
                if (this.m_HDList[i].m_position.x < winSize.width / 2) {
                    if (this.m_HDList[i].m_Nr == selfNr) {
                        return {
                            x: this.m_HDList[i].m_position.x,
                            y: this.m_HDList[i].m_position.y + 85,
                            mode: SHOW_MODE.LEFT
                        };
                    }
                    if (this.m_HDList[i].m_position.y > 350) {
                        return {
                            x: this.m_HDList[i].m_position.x,
                            y: this.m_HDList[i].m_position.y,
                            mode: SHOW_MODE.BOTTOM
                        };
                    }
                    return {x: this.m_HDList[i].m_position.x, y: this.m_HDList[i].m_position.y, mode: SHOW_MODE.LEFT};
                } else {
                    if (this.m_HDList[i].m_position.y > 350) {
                        return {
                            x: this.m_HDList[i].m_position.x,
                            y: this.m_HDList[i].m_position.y,
                            mode: SHOW_MODE.BOTTOM
                        };
                    }
                    return {x: this.m_HDList[i].m_position.x, y: this.m_HDList[i].m_position.y, mode: SHOW_MODE.RIGHT};
                }
            }
        }
    },

    showClock: function (actorNr, time) {
        var showP = this.showClockPosition(actorNr);
        //console.log("showClock: actorNr: ", actorNr , "     showP:",showP);
        var x = showP.x;
        var y = showP.y;
        var space = 80;

        switch (showP.mode) {
            case SHOW_MODE.LEFT:
            {
                x = showP.x + space;
            }
                break;
            case SHOW_MODE.RIGHT:
            {
                x = showP.x - space;
            }
                break;
        }

        //闹钟测试
        this.stopClock();
        if (!this.m_pClock) {
            this.m_pClock = new Clock({time: time, callback: this.clockCallback, targe: this});
            this.m_pClock.x = x;
            this.m_pClock.y = y;
            this.addChild(this.m_pClock);
        }

    },
    stopClock: function () {
        if (this.m_pClock && cc.sys.isObjectValid(this.m_pClock)) {
            this.m_pClock.removeFromParent(true);
            this.m_pClock = null;
        }
    },
    clockCallback: function () {
        this.stopClock();

        if (this.m_pClockTarge && cc.isFunction(this.m_pClockCallback)) {
            this.m_pClockCallback.call(this.m_pClockTarge);
        }
    },

    setClockCallback: function (targe, callback) {
        if (targe == null || callback == null) {
            return;
        }
        this.m_pClockTarge = targe;
        this.m_pClockCallback = callback;
    },

//闹钟 end

//say
    showSayPosition: function (actorNr) {
        var winSize = cc.director.getWinSize();
        var listlen = this.m_HDList.length;
        var i = 0;
        var selfNr;
        for (i = 0; i < listlen; i++) {
            if (this.m_HDList[i].m_uid == gPlayer.uid) {
                selfNr = this.m_HDList[i].m_Nr;
                break;
            }
        }
        //console.log("selfNr:", selfNr);
        for (i = 0; i < listlen; i++) {
            if (this.m_HDList[i].m_Nr == actorNr) {
                if (this.m_HDList[i].m_position.x < winSize.width / 2) {

                    if (this.m_HDList[i].m_position.y > 350) {
                        return {
                            x: this.m_HDList[i].m_position.x,
                            y: this.m_HDList[i].m_position.y - 60,
                            mode: SHOW_MODE.BOTTOM
                        };
                    }
                    return {x: this.m_HDList[i].m_position.x, y: this.m_HDList[i].m_position.y, mode: SHOW_MODE.LEFT};
                } else {
                    if (this.m_HDList[i].m_position.y > 350) {
                        return {
                            x: this.m_HDList[i].m_position.x,
                            y: this.m_HDList[i].m_position.y - 60,
                            mode: SHOW_MODE.BOTTOM
                        };
                    }
                    return {x: this.m_HDList[i].m_position.x, y: this.m_HDList[i].m_position.y, mode: SHOW_MODE.RIGHT};
                }
            }
        }
    },

    showSay: function (text, actorNr) {
        var winSize = cc.director.getWinSize();
        var showP = this.showSayPosition(actorNr);
        var x = showP.x;
        var y = showP.y;
        var space = 50;

        switch (showP.mode) {
            case SHOW_MODE.LEFT:
                x = showP.x + space;
                break;
            case SHOW_MODE.RIGHT:
                x = showP.x - space;
                break;
            case SHOW_MODE.CENTER:
                x = winSize.width / 2;
                y = winSize.height / 2;
            case SHOW_MODE.BOTTOM:
                y = y;
        }

        var say = new PersonTalk({note: text, direction: showP.mode, time: 2});
        say.setPosition(x, y);
        this.addChild(say);
        //console.log("-------------------->showSay:", text);
    },
//say end

    showExpression: function (exp, actorNr) {
        var winSize = cc.director.getWinSize();
        var showP = this.showSayPosition(actorNr);
        var x = showP.x;
        var y = showP.y;
        var space = 70;

        switch (showP.mode) {
            case SHOW_MODE.LEFT:
                x = showP.x + space;
                break;
            case SHOW_MODE.RIGHT:
                x = showP.x - space;
                break;
            case SHOW_MODE.CENTER:
                x = winSize.width / 2;
                y = winSize.height / 2;
            case SHOW_MODE.BOTTOM:
                y = y - 100;
        }


        ///////////////动画开始//////////////////////
        this.expSprite = new cc.Sprite("#" + ChatConf.express[exp] + "1.png");
        var animation = new cc.Animation();
        for (var i = 1; i <= 5; i++) {
            var frameName = ChatConf.express[exp] + i + ".png";
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
            animation.addSpriteFrame(spriteFrame);
        }

        animation.setDelayPerUnit(0.3);           //设置两个帧播放时间
        animation.setRestoreOriginalFrame(true);    //动画执行后还原初始状态

        var action = cc.animate(animation);

        var actF = cc.sequence(action, cc.callFunc(expCallback, this));

        this.expSprite.runAction(actF);

        function expCallback() {
            if (this.expSprite) this.expSprite.removeFromParent(true);
        }

        //////////////////动画结束///////////////////

        this.expSprite.setPosition(x, y);
        this.addChild(this.expSprite);
        //console.log("-------------------->showSay:", text);
    },

    getActorHDWithNr: function (actorNr) {
        var listlen = this.m_HDList.length;

        for (i = 0; i < listlen; i++) {
            if (this.m_HDList[i].m_Nr == actorNr) {
                return this.m_HDList[i];
            }
        }
        return null;
    },

    isSelfHD: function (actorNr) {
        var listlen = this.m_HDList.length;
        var i = 0;
        var selfNr;
        for (i = 0; i < listlen; i++) {
            if (this.m_HDList[i].m_uid == gPlayer.uid) {
                selfNr = this.m_HDList[i].m_Nr;
                break;
            }
        }

        if (selfNr == actorNr) {
            return true;
        }
        return false;
    },

    fanFinishedEvent: function (actorNr, rank, id) {
        var listlen = this.m_HDList.length;
        var i = 0;

        for (i = 0; i < listlen; i++) {
            if (this.m_HDList[i].m_Nr == actorNr) {
                this.m_HDList[i].setRank(rank, true);
                return;
            }
        }
    },

    clearAllRank: function () {
        var listlen = this.m_HDList.length;
        var i = 0;

        for (i = 0; i < listlen; i++) {
            this.m_HDList[i].setRank("", false);
        }
    },

    trusteeshipEvent: function (actorNr) {
        var player = _.findWhere(this.m_HDList, {m_Nr: actorNr});
        player.changeActorPhoto("#game_jiqiren_3.png");
    },

    cancelTrusteeshipEvent: function (actorNr) {
        var player = _.findWhere(this.m_HDList, {m_Nr: actorNr});
        player.changeActorPhoto(utils.getAvatar(player.m_avatar));
    },

    onEnter: function () {
        this._super();
        //console.log("FivePeopleTableLayer onEnter");
    },

    onExit: function () {
        this._super();
        //console.log("FivePeopleTableLayer onEnter");
    }


});