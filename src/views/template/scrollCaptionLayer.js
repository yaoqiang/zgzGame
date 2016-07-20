//牌局中头像框component
var scrollCaptionLayer = cc.Layer.extend({
    ctor: function (params) {
        //console.log("---->scrollCaptionLayer");
        this._super();
        this.cx = 0;
        this.cy = 0;
        this.cw = 0;
        this.ch = 0;

        this.systemMessageListener = null;
        this.contentLabel = null;
        this.hornBg = null;
        this.clip = null;

        this.nextNotification = true;
        this.moveSpeed = 1.5;
        FrameCache.addSpriteFrames(res.common_plist);

        this.init(params);
        this.initListener();
    },

    init:function (params) {
        this._super();
        var winSize =  cc.director.getWinSize();
        var visSize =  cc.director.getVisibleSize();
        var origin = cc.director.getVisibleOrigin();

        this.cx  = params.x?params.x:origin.x;
        this.cy = params.x?params.y:origin.y+60;
        this.cw = params.w?params.w:visSize.width;
        this.ch = params.h?params.h:25;
        this.cvisible = false;

        this.clip = this.clipper();
        this.clip.visible = this.cvisible;
        var clipSize = this.clip.getContentSize();
        this.addChild(this.clip, 10);

    },

    clipper : function(){  //创建以标题作为大小的模板,超出标题部分都会被裁掉
        var clipper = new cc.ClippingNode();
        clipper.width = this.cw;
        clipper.height = this.ch;
        clipper.anchorX = 0;
        clipper.anchorY = 0;
        clipper.x = this.cx;
        clipper.y = this.cy;

        var stencil = new cc.DrawNode();
        var rectangle = [cc.p(0, 0),cc.p(clipper.width, 0),
            cc.p(clipper.width, clipper.height),
            cc.p(0, clipper.height)];

        var white = cc.color(255, 255, 255, 255);
        stencil.drawPoly(rectangle, white, 1, white);
        clipper.stencil = stencil;

        var layer1 = new cc.LayerColor(cc.color(255,255,255,0.8), clipper.width, clipper.height);
        layer1.anchorX = 0;
        layer1.anchorY = 0;
        layer1.x = 0;
        layer1.y = 0;
        clipper.addChild(layer1);


        return clipper;
    },

    trumpetTwo: function (data) {
        if(data == null){
            this.clip.visible = this.cvisible;
            return;
        }
        this.nextNotification = false;
        this.clip.visible = true;


        this.contentLabel = new cc.LabelTTF(data, "Arial", 22);
        this.contentLabel.color = cc.color.RED;
        this.contentLabel.setAnchorPoint(0, 0.5);
        this.contentLabel.x = this.cw;
        this.contentLabel.y = this.ch/2;
        this.clip.addChild(this.contentLabel, 1);

    },

    initListener: function (){
        this.systemMessageListener = EventBus.subscribe(gameEvents.BBS, function (data) {;
            //console.log(data);
            SystemMassageQueue.pushMassage(data);
        });
       // SystemMassageQueue.pushMassage("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    },
    onEnter: function () {
        this._super();
        //console.log("createScrollCaption  onEnter");
        this.schedule(function () {
            if(this.nextNotification == true){
                this.trumpetTwo(SystemMassageQueue.shiftMassage());
            }else{
                if(this.contentLabel && cc.sys.isObjectValid(this.contentLabel)){
                    var visSize =  cc.director.getVisibleSize();
                    var origin = cc.director.getVisibleOrigin();
                    var x =  this.contentLabel.x - this.moveSpeed;
                    var size = this.contentLabel.getContentSize();
                    this.contentLabel.x = x;
                    if(x < origin.x-size.width){
                        this.contentLabel.removeFromParent(true);
                        this.contentLabel = null;
                        this.nextNotification = true;
                    }
                }
            }

        })




    },

    onExit: function () {
        if(this.systemMessageListener){
            EventBus.removeSubscribe(this.systemMessageListener);
            this.systemMessageListener = null;
        }
        //console.log("createScrollCaption  onExit");
        FrameCache.removeSpriteFrames(res.common_plist);
        this._super();
    }

});

var createScrollCaption = function (data) {
    var pLayer = new scrollCaptionLayer(data);
    return pLayer;
};