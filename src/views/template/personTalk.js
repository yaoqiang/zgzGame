
var PersonTalk = cc.Node.extend({

    ctor: function(args){
        this._super();
//类变量
        this.m_note = args.note ? args.note:"";
        this.m_label = null;
        this.m_direction = args.direction==SHOW_MODE.RIGHT ? SHOW_MODE.RIGHT:SHOW_MODE.LEFT; //1:左方向，2：右方向
        this.m_time = args.time ? args.time:2;


        this.init();
    },

    init:function(){
        var winSize = cc.director.getWinSize();
        this._super();

        this.m_label = new cc.LabelTTF(this.m_note, "Arial", 24);
        this.m_label.color = cc.color(255, 255, 255);

        if(this.m_direction == SHOW_MODE.LEFT ){
            this.m_label.setAnchorPoint(0, 0.5);
        }else{
            this.m_label.setAnchorPoint(1, 0.5);
        }
        this.addChild(this.m_label, 1);




        this.scheduleOnce(this.updateTime, this.m_time);

    },
    updateTime:function(dt){
        this.removeFromParent(true);
    },



    onEnter:function(){
        this._super();
    },

    onExit:function(){
        this._super();
    }

})