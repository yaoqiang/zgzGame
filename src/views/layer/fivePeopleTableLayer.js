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

        var player5 = new PlayerLayer({index: 5, position: {x: 50, y: 120}, anchor: {x: 0.5, y: 0.5}});
        var player4 = new PlayerLayer({index: 4, position: {x: 50, y: 300}, anchor: {x: 0.5, y: 0.5}});
        var player3 = new PlayerLayer({index: 3, position: {x: winSize.width/2, y: winSize.height-50}, anchor: {x: 0.5, y: 0.5}});
        var player2 = new PlayerLayer({index: 2, position: {x: winSize.width-50, y: 300}, anchor: {x: 0.5, y: 0.5}});
        var player1 = new PlayerLayer({index: 1, position: {x: winSize.width-50, y: 120}, anchor: {x: 0.5, y: 0.5}});


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

        for(i=0; i<listlen; i++){
             this.m_HDList[i].clear();
        }

        for(i=0; i<len; i++){
            this.m_HDList[i].updata(args[i]);
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


    onEnter:function(){
        this._super();
        console.log("FivePeopleTableLayer onEnter");
    },

    onExit:function(){
        this._super();
        console.log("FivePeopleTableLayer onEnter");
    }


})