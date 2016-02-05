/****************************************************************************

 ****************************************************************************/

var indexScrollLayer = cc.Layer.extend({

    ctor:function (data) {
        this._super();
        //if(data == null)return;
        //var data = {};
        var winSize = cc.director.getWinSize();
        this.m_pScrollView = null;
        this.m_nScrollWidth = data.width? data.width : winSize.width;
        this.m_nScrollHeight = data.height? data.height : winSize.height;
        this.m_nScrollX = data.x? data.x : 0;
        this.m_nScrollY = data.y? data.y : 0;


        this.lobbyData = data.lobbyData;
        //
        this.init();
    },

    init:function () {
        if (this._super()) {
            var winSize = cc.director.getWinSize();

            // Create the scrollview
            this.m_pScrollView = new ccui.ScrollView();
            this.m_pScrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
            this.m_pScrollView.setTouchEnabled(true);
            this.m_pScrollView.setBounceEnabled(true);
            this.m_pScrollView.setContentSize(cc.size(this.m_nScrollWidth, this.m_nScrollHeight));
            var scrollViewRect = this.m_pScrollView.getContentSize();
            this.m_pScrollView.setInnerContainerSize(cc.size(scrollViewRect.width, scrollViewRect.height));

            this.m_pScrollView.x = this.m_nScrollX;
            this.m_pScrollView.y = this.m_nScrollY;
            this.m_pScrollView.scrollToPercentBothDirection(cc.p(50, 50), 1, true);
            this.addChild(this.m_pScrollView);

            var line = new cc.LabelTTF("------------------------------", "Arial", 24);
            line.color = cc.color.YELLOW;
            line.setPosition(this.m_nScrollWidth/2, this.m_nScrollHeight-2);
            //this.m_pScrollView.addChild(line);

             line = new cc.LabelTTF("------------------------------", "Arial", 24);
            line.color = cc.color.YELLOW;
            line.setPosition(this.m_nScrollWidth/2, 0);
            //this.m_pScrollView.addChild(line);

            //this.m_pScrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));

            var cellWidth = this.m_pScrollView.getInnerContainerSize().width/3;
            var lobbyStr = "五人场";
            var onLineNumStr = "在线:"+this.lobbyData[0].online;
            var bunX = cellWidth / 2;
            var bunY = this.m_pScrollView.getInnerContainerSize().height / 2 + 40;
            this.m_pScrollView.addChild(this.createButton(lobbyStr, onLineNumStr, bunX, bunY, 5));

            lobbyStr = "六人场";
            onLineNumStr = "在线:"+this.lobbyData[1].online;
            bunX = cellWidth / 2 + cellWidth;
            //bunY = this.m_pScrollView.getInnerContainerSize().height / 2;
            this.m_pScrollView.addChild(this.createButton(lobbyStr, onLineNumStr, bunX, bunY, 6));

            lobbyStr = "七人场";
            onLineNumStr = "在线:"+this.lobbyData[2].online;
            bunX = cellWidth / 2 + 2*cellWidth;
            //bunY = this.m_pScrollView.getInnerContainerSize().height / 2;
            this.m_pScrollView.addChild(this.createButton(lobbyStr, onLineNumStr, bunX, bunY, 7));

            return true;
        }
        return false;
    },

    createButton:function (lobbyStr, numStr, x, y, tag) {
        var button = new ccui.Button();
        button.setAnchorPoint(0.5, 0.5);
        button.setTouchEnabled(true);
        button.loadTextures("index_mianban_05.png", "index_mianban_05.png", "index_mianban_05.png", ccui.Widget.PLIST_TEXTURE);
        button.addTouchEventListener(this.buttoTouchEvent, this);
        button.x = x;
        button.y = y;
        button.tag = tag;
        button.setScale(0.8);
        //label
        var labelBg = new cc.Sprite("#index_mianban_08.png");
        labelBg.setPosition(button.width/2, button.height/2 - 110);
        //labelBg.scale = 0.8;
        var label = new cc.LabelTTF(lobbyStr, "Arial", 30);
        label.color = cc.color.YELLOW;
        label.setPosition(labelBg.width/2, labelBg.height/2+25);
        labelBg.addChild(label);

        this.lobbyOnline = new cc.LabelTTF(numStr, "Arial", 24);
        this.lobbyOnline.color = cc.color.YELLOW;
        this.lobbyOnline.setPosition(labelBg.width/2, labelBg.height/2-15);
        labelBg.addChild(this.lobbyOnline);

        button.addChild(labelBg);

        return button;
    },

    buttoTouchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                playEffect(audio_common.Button_Click);
                if(sender.tag == 5){
                    //console.log("------->5");
                    GameController.enterLobby(0);
                }else if(sender.tag == 6){
                    //console.log("------->6");
                }else if(sender.tag == 7){
                    //console.log("------->7");
                }
                break;
        }
    }

});

var createIndexScrollLayer = function (data) {
    var pLayer = new indexScrollLayer(data);
    return pLayer;
};
