
var PersonTalk = cc.Node.extend({

    ctor: function(args){
        this._super();
//类变量
        this.m_note = args.note ? args.note:"";
        this.m_label = null;
        this.m_pBg = null;
        this.m_direction = args.direction==SHOW_MODE.RIGHT ? SHOW_MODE.RIGHT:SHOW_MODE.LEFT; //1:左方向，2：右方向
        this.m_time = args.time ? args.time:2;


        this.init();
    },

    init:function(){
        var winSize = cc.director.getWinSize();
        this._super();

        var offect = 6;
        //text
        this.m_label = new cc.LabelTTF(this.m_note, "Arial", 20);
        this.m_label.color = cc.color(255, 255, 255);

        if(this.m_direction == SHOW_MODE.LEFT ){
            this.m_label.setAnchorPoint(0, 0.5);
        }else{
            this.m_label.setAnchorPoint(1, 0.5);
        }
        this.addChild(this.m_label, 1);
        var labelSize = this.m_label.getContentSize();
        //bg
        var bgImage =  "game_qipao04.png";
        if(this.m_direction == SHOW_MODE.LEFT){
            bgImage = "game_qipao03_2.png";
        }
        console.log("-------->bgImage:", bgImage);
        this.m_pBg = new cc.Scale9Sprite(bgImage, cc.rect(10, 10, 4, 4));
        if(this.m_pBg){
            this.m_pBg.width = labelSize.width>48-offect*2? labelSize.width+offect*2 : 48;
            this.m_pBg.height = labelSize.height>48-offect*2? labelSize.height+offect*2 : 48;
            this.m_pBg.y = 0;
            if(this.m_direction == SHOW_MODE.LEFT ){
                this.m_pBg.x = -offect;
                this.m_pBg.setAnchorPoint(0, 0.5);
            }else{
                this.m_pBg.x = offect;
                this.m_pBg.setAnchorPoint(1, 0.5);
            }
            this.m_pBg.opacity = 100;
            this.addChild(this.m_pBg, 0);
            console.log("-------->m_pBg:");
        }

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