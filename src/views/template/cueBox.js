var CueBox = cc.Layer.extend({

    ctor: function(args){
        this._super();
        this.init(args);
    },

    init:function(args){
        //console.log(args);
        var winSize = cc.director.getWinSize();

        this.m_note = args.note;
        this.m_okCallBack = args.okCall;
        this.m_cancelCallBack = args.cancelCall;
        this.m_targe = args.targe;

        var isOk = true;
        var isCancel = true;

        if(this.m_note == null){
            this.m_note = "";
        }
        if(this.m_okCallBack == null){
            //this.m_okCallBack = this.onOkCallback;
            isOk = false;
        }
        if(this.m_cancelCallBack == null){
            //this.m_cancel = this.onCancelCallback;
            isCancel = false;
        }

        var layer1 = new cc.LayerColor(cc.color(255, 255, 255, 80));
        this.addChild(layer1);

        var bg = new cc.Sprite(res.noteBg);//cc.Scale9Sprite(res.noteBg, cc.rect(95, 70, 4, 4));
        //bg.width = 600;
        //bg.height = 400;
        bg.x = winSize.width/2;
        bg.y = winSize.height/2;
        this.addChild(bg);
        if(bg){
            //console.log("----->bg  " + winSize.width + "   " +  winSize.height);
        }

        this.m_label = new cc.LabelTTF(this.m_note, "Arial", 24);
        this.m_label.color = cc.color(255, 255, 255);
        this.m_label.anchorX = 0.5;
        this.m_label.anchorY = 0.5;
        this.m_label.x = winSize.width/2;
        this.m_label.y = winSize.height/2;
        this.addChild(this.m_label, 1);

        //Exit
        var item = new cc.MenuItemImage(res.exit, res.exit, this.onExitCallback, this);
        item.x = winSize.width/2 + 100;
        item.y = winSize.height/2 + 73;
        this.m_menu = new cc.Menu(item);
        this.m_menu.tag = TAG_MENU;
        this.m_menu.x = 0;
        this.m_menu.y = 0;
        this.addChild(this.m_menu, 1);
        // menu end

        var itemOk = null;
        var itemCancel = null;
        if(isOk){
            //console.log("noteLayer isOk");
            itemOk = new cc.MenuItemImage(res.buttonN, res.buttonS, this.onOkCallback, this);
            this.m_menu.addChild(itemOk);
        }
        if(isCancel){
            //console.log("noteLayer isCancel");
            itemCancel = new cc.MenuItemImage(res.buttonN, res.buttonS, this.onCancelCallback, this);
            this.m_menu.addChild(itemCancel);
        }
        if(isOk && isCancel){
            itemOk.x = winSize.width/2 - 200;
            itemOk.y = winSize.height/2 - 200;

            itemCancel.x = winSize.width/2 + 200;
            itemCancel.y = winSize.height/2 - 200;
        }else{
            if(isOk){
                itemOk.x = winSize.width/2;
                itemOk.y = winSize.height/2 - 200;
            }
            if(itemCancel){
                itemCancel.x = winSize.width/2;
                itemCancel.y = winSize.height/2 - 200;
            }
        }

    },

    onOkCallback:function () {
        //console.log("noteLayer onOkCallback");
        if (this.m_targe && cc.isFunction(this.m_okCallBack)) {
            this.m_okCallBack.call(this.m_targe, this)
        }
        this.removeFromParent(true);
    },
    onCancelCallback:function () {
        //console.log("noteLayer onCancelCallback");
        if (this.m_targe && cc.isFunction(this.m_cancelCallBack)) {
            this.m_cancelCallBack.call(this.m_targe, this)
        }
        this.removeFromParent(true);
    },

    onExitCallback:function () {
        //console.log("noteLayer onExitCallback");
        this.removeFromParent(true);
    },

    updateActorHD:function(args){

    },

    onEnter: function() {
        //console.log("NoteLayer onEnter");
        this._super();
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

    onExit: function() {
        //console.log("NoteLayer onExit");
        this._super();
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






});