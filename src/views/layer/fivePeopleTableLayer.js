var FivePeopleTableLayer = cc.Layer.extend({

    ctor: function(args){
        this._super();
//类变量
        this.m_actorList = [];
        this.m_HDList = [];
        this.init();
    },

    init:function(){
        var winSize = cc.director.getWinSize();
        var leftP = 50;
        var rightP = 50;
        var player1 = new PlayerLayer({index: 1, position: {x: leftP, y: 120}, anchor: {x: 0.5, y: 0.5}});
        var player5 = new PlayerLayer({index: 5, position: {x: leftP, y: 220}, anchor: {x: 0.5, y: 0.5}});
        var player4 = new PlayerLayer({index: 4, position: {x: leftP, y: 320}, anchor: {x: 0.5, y: 0.5}});
        var player3 = new PlayerLayer({index: 3, position: {x: winSize.width-rightP, y: 220}, anchor: {x: 0.5, y: 0.5}});
        var player2 = new PlayerLayer({index: 2, position: {x: winSize.width-rightP, y: 120}, anchor: {x: 0.5, y: 0.5}});


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

    updataActorHD:function(args){
        cc.log("---->updataActorHD:",args);
        var len = args.length;
        var listlen =  this.m_HDList.length;
        var i=0;
        var j=0;
        for(i=0; i<listlen; i++){
             this.m_HDList[i].clear();
        }
        //for(i=0; i<len; i++){
        //    this.m_HDList[i].updata(args[i]);
        //}
        //找到自己
        var selfId = 0;
        for(i=0; i<len; i++){
            if(args[i].m_uid == gPlayer.uid){
                selfId = i;
            }
        }

        if(this.m_HDList[0].m_Nr == -1){
            for(var k =0 ; k<listlen; k++){
                var v = args[selfId].m_actorNr-1;
                this.m_HDList[k].m_Nr = (v+k)%listlen + 1;
                console.log("------------->v:",this.m_HDList[k].m_Nr);
                console.log("-");
            }
        }
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

        for(i=0; i<len; i++){
            for(var k =0 ; k<listlen; k++){
                if(args[i].m_actorNr == this.m_HDList[k].m_Nr){
                    this.m_HDList[k].updata(args[i]);
                }
            }
        }
    },

    readyResponse: function (actor) {
        var listlen =  this.m_HDList.length;
        var i=0;

        for(i=0; i<listlen; i++){
            if(this.m_HDList[i].m_uid == actor.m_uid){
                this.m_HDList[i].showReady(true);
                return;
            }
        }
    },

    readyEvent: function (actor) {
        var listlen =  this.m_HDList.length;
        var i=0;

        for(i=0; i<listlen; i++){
            if(this.m_HDList[i].m_uid ==actor.m_uid){
                this.m_HDList[i].showReady(true);
                return;
            }
        }
    },

    showCardPosition:function(actorNr){
        var winSize = cc.director.getWinSize();
        var listlen =  this.m_HDList.length;
        var i=0;
        var selfNr;
        for(i=0; i<listlen; i++){
            if(this.m_HDList[i].m_uid == gPlayer.uid){
                selfNr = this.m_HDList[i].m_actorNr;
                break;
            }
        }

        if(selfNr == actorNr){
            return {x:winSize.width/2, y:100, mode:SHOW_MODE.CENTER};
        }
        for(i=0; i<listlen; i++){
            if(this.m_HDList[i].m_actorNr ==actorNr){
                if(this.m_HDList[i].x < winSize.width/2 ){
                    return {x:this.m_HDList[i].x, y:this.m_HDList[i].y, mode:SHOW_MODE.LEFT};
                }else{
                    return {x:this.m_HDList[i].x, y:this.m_HDList[i].y, mode:SHOW_MODE.RIGHT};
                }
            }
        }
    },

    getActorHDWithNr:function(actorNr){
        var listlen =  this.m_HDList.length;

        for(i=0; i<listlen; i++){
            if(this.m_HDList[i].m_actorNr ==actorNr){
                return this.m_HDList[i];
            }
        }
    },

    onEnter:function(){
        this._super();
        console.log("FivePeopleTableLayer onEnter");
    },

    onExit:function(){
        this._super();
        console.log("FivePeopleTableLayer onEnter");
    }


})