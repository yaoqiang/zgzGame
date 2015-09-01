
var Clock = cc.Node.extend({

    ctor: function(args){
        this._super();
//类变量
        this.m_pClockImage = null;
        this.m_pLable = null;
        this.m_nTime = 0;
        this.m_targe= null;
        this.m_pCallBack = null;

        this.init(args);
    },

    init:function(args){
        this._super();

        this.m_nTime = args.time;
        this.m_pCallBack = args.callback;
        this.m_targe= args.targe;

        this.m_pClockImage = new cc.Sprite.create("#naozhong.png");
        var size = this.m_pClockImage.getContentSize();
        this.m_pClockImage.setScale(0.8);
        this.m_pClockImage.setPosition(0, 0);
        this.addChild(this.m_pClockImage, 0);


        this.m_pLable = new cc.LabelTTF(this.m_nTime, "Arial", 32);
        this.m_pLable.color =cc.color.BLUE;
        this.m_pLable.anchorX = 0.5;
        this.m_pLable.anchorY = 0.5;
        this.m_pLable.x = 0;
        this.m_pLable.y = 0;
        this.addChild(this.m_pLable, 1);



        this.schedule(this.updateTime, 1.0);
    },

    updateTime:function(dt){
        this.m_nTime = this.m_nTime -1;
        if(this.m_nTime <=0 ){
            this.unschedule(this.updateTime);
            if(this.m_targe && cc.isFunction(this.m_pCallBack)){
                this.m_pCallBack.call(this.m_targe);
            }

            return;
        }

        if(this.m_pLable){
            this.m_pLable.setString(this.m_nTime);
        }

    },

    onEnter:function(){
        this._super();
        console.log("Clock onEnter");

    },

    onExit:function(){
        this._super();
        console.log("Clock onEnter");

    }

})