var setingNode = cc.Node.extend({
    ctor: function () {
        this._super();

        this.init();
    },
    onEnter:function(){
        this._super();
        console.log("setingNode onEnter");
    },
    onExit:function(){
        this._super();
        console.log("setingNode onExit");
    },

    init:function(){
        if(this.m_bRun) return;
        this.m_bRun = true;

        this._super();
        var sg = new MaskLayer(false);
        this.addChild(sg);

        var winSize = cc.director.getWinSize();

        var bgString = "#dialog_bg_middle.png";

        this.bg = new cc.Sprite(bgString);
        this.bg.x = winSize.width / 2.0;
        this.bg.y = winSize.height / 2.0;
        this.bg.scale = 0.55;
        this.addChild(this.bg);

        var bgActualSize = this.bg.getBoundingBox();


        this.m_pLable = new cc.LabelTTF("设 置", "AmericanTypewriter", 26);
        this.m_pLable.enableStroke(cc.color.WHITE, 1);
        this.m_pLable.color = cc.color.WHITE;
        //this.m_pLable.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.m_pLable.setPosition(winSize.width/2, winSize.height/2 + bgActualSize.height/2 - 22);
        this.addChild(this.m_pLable, 1);

        //close
        var closeItem = new cc.MenuItemImage("#common_btn_shanchu.png", "#common_btn_shanchu.png", this.onExitCallback, this);
        closeItem.setScale(0.65);
        closeItem.x = winSize.width/2 + bgActualSize.width/2 - 8;
        closeItem.y = winSize.height/2 + bgActualSize.height/2 - 8;
        this.m_menu = new cc.Menu(closeItem);
        this.m_menu.tag = TAG_MENU;
        this.m_menu.x = 0;
        this.m_menu.y = 0;
        this.addChild(this.m_menu, 1);
        // menu end

        var lable = new cc.LabelTTF("背景音乐：", "AmericanTypewriter", 26);
        lable.setAnchorPoint(1, 0.5);
        lable.color = cc.color.RED;
        lable.setPosition(winSize.width/2 - 30, winSize.height/2 + 40);
        this.addChild(lable, 1);

        var lable = new cc.LabelTTF("音效：", "AmericanTypewriter", 26);
        lable.setAnchorPoint(1, 0.5);
        lable.color = cc.color.RED;
        lable.setPosition(winSize.width/2-30, winSize.height/2 - 40);
        this.addChild(lable, 1);
        var code = loadSet();
        var music = code[0];
        var effect = code[1];
        console.log("music:"+ music + "effect:" + effect );
        var musicSwitchControl = new cc.ControlSwitch
        (
            new cc.Sprite("res/switch-mask.png"),
            new cc.Sprite("res/switch-on.png"),
            new cc.Sprite("res/switch-off.png"),
            new cc.Sprite("res/switch-thumb.png"),
            new cc.LabelTTF("On", "Arial-BoldMT", 16),
            new cc.LabelTTF("Off", "Arial-BoldMT", 16)
        );
        musicSwitchControl.x = winSize.width/2 + 30;
        musicSwitchControl.y = winSize.height/2 + 40;
        musicSwitchControl.setOn(music);
        this.addChild(musicSwitchControl, 1);

        musicSwitchControl.addTargetWithActionForControlEvents(this, this.musicValueChanged, cc.CONTROL_EVENT_VALUECHANGED);
        //this.musicValueChanged(musicSwitchControl, cc.CONTROL_EVENT_VALUECHANGED);


        var effectSwitchControl = new cc.ControlSwitch
        (
            new cc.Sprite("res/switch-mask.png"),
            new cc.Sprite("res/switch-on.png"),
            new cc.Sprite("res/switch-off.png"),
            new cc.Sprite("res/switch-thumb.png"),
            new cc.LabelTTF("On", "Arial-BoldMT", 16),
            new cc.LabelTTF("Off", "Arial-BoldMT", 16)
        );
        effectSwitchControl.x = winSize.width/2 + 30;
        effectSwitchControl.y = winSize.height/2 - 40;
        effectSwitchControl.setOn(effect);
        this.addChild(effectSwitchControl, 1);

        effectSwitchControl.addTargetWithActionForControlEvents(this, this.effectValueChanged, cc.CONTROL_EVENT_VALUECHANGED);
        //this.effectValueChanged(effectSwitchControl, cc.CONTROL_EVENT_VALUECHANGED);
    },

    musicValueChanged:function (sender, controlEvent) {
        if (sender.isOn()) {
            console.log("On");
            setPlayMusic(true);
        }
        else {
            console.log("Off");
            setPlayMusic(false);
        }
    },

    effectValueChanged:function (sender, controlEvent) {
        if (sender.isOn()) {
            console.log("On");
            setPlayEffects(true);
        }
        else {
            console.log("Off");
            setPlayEffects(false);
        }
    },

    onExitCallback:function () {
        playEffect(audio_common.Button_Click);
        this.removeFromParent(true);
    }
});
var setingLayer = function () {
    var box = new setingNode();
    return box;
};