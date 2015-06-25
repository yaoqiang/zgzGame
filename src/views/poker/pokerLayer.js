

var PokerLayer = cc.Layer.extend({

    ctor: function(args){
        this._super();
//类变量
        this.m_actorList = [];
        this.m_HDList = [];
        this.init();
    },

    init:function(){
        var winSize = cc.director.getWinSize();



    },

    updataActorHD:function(args){

    },



    onEnter:function(){
        this._super();
        console.log("PokerLayer onEnter");

        this._touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,
            onTouchCancelled: this.onTouchCancelled
        });
        cc.eventManager.addListener(this._touchListener, this);
    },

    onExit:function(){
        this._super();
        console.log("PokerLayer onEnter");
        cc.eventManager.removeListener(this._touchListener);
    },

    onTouchBegan:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        //cc.log("NoteLayer onTouchBegan at: " + pos.x + " " + pos.y);
        return true;
    },
    onTouchMoved:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        //cc.log("NoteLayer onTouchMoved");
        //event.getCurrentTarget().update_id(id,pos);
    },
    onTouchEnded:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        //cc.log("NoteLayer onTouchEnded at: " + pos.x + " " + pos.y);
        //event.getCurrentTarget().release_id(id,pos);
    },
    onTouchCancelled:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        //cc.log("NoteLayer onTouchCancelled ");
        //event.getCurrentTarget().update_id(id,pos);
    }


})