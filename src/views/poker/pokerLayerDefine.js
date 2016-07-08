PokerCard_enum = {
    kCCCardSizeSmall:0,
    kCCCardSizeNormal:1,
    kCCCardSizeLarge:2,

    kCCCardFaceJoker:0,     //大小鬼
    kCCCardFaceDiamond:1,   //方片
    kCCCardFaceHeart:2,     //红心
    kCCCardFaceSpade:3,     //黑桃
    kCCCardFaceClub:4       //黑梅花
};

var MDisplay = {
    CENTER:{x:0.5, y:0.5},
    LEFT_TOP:{x:0, y:1},
    RIGHT_TOP:{x:0, y:1},
    BOTTOM_RIGHT:{x:1, y:0},
    BOTTOM_LEFT:{x:0, y:0},

    align : function(node, anchor, x, y ){
        if(node == null) return;
        node.setAnchorPoint(anchor.x, anchor.y);
        node.x = x;
        node.y = y;
    }
};

var ZySize = {

    scale:function(){
        var winSize = cc.director.getWinSize();
        return (winSize.height / 640);
    },
    scalew:function(){
        var winSize = cc.director.getWinSize();
        return (winSize.width / 960);
    },

    SCALE:function(x){
        return Math.round(this.scale() * x);
    },
    SCALEW:function(x){
        return Math.round(this.scalew() * x);
    },

    width:function(){
        var winSize = cc.director.getWinSize();
        return winSize.width;
    },
    height:function(){
        var winSize = cc.director.getWinSize();
        return winSize.height;
    }
};


var SHOW_MODE = {
    LEFT:1,
    RIGHT:2,
    CENTER:3,
    BOTTOM: 4
};

var FanOutMenuBtn =  {
    kCCFanOutMenu_Pass : 1, //--不出
    kCCFanOutMenu_Reset : 2,//--重选
    kCCFanOutMenu_Hint : 3, //--提示
    kCCFanOutMenu_FanOut : 4 //--出牌
};

var BidMenuBtn =  {
    kCCBidMenu_Liang : 1, //--红三
    kCCBidMenu_Guzi : 2,//--股子
    kCCBidMenu_Bujiao : 3, //--不叫
    kCCBidMenu_GiveUp : 4 //--认输
};

//var CARD_WIDTH_LARGE = ZySize.SCALE(120);
//var CARD_HEIGHT_LARGE = ZySize.SCALE(168);
//var CARD_WIDTH_NORMAL = ZySize.SCALE(80);
//var CARD_HEIGHT_NORMAL = ZySize.SCALE(108);
//var CARD_WIDTH_SMALL = ZySize.SCALE(44);
//var CARD_HEIGHT_SMALL = ZySize.SCALE(56);
//
//var HOLDING_CARD_BOTTOM = ZySize.SCALE(40);  //--相对屏幕底部边缘的留边宽度
//var HOLDING_CARD_PADDING = ZySize.SCALE(20); //--相对屏幕左右边缘的留边宽度
//
//var LARGE_CARD_MIN_VISIBLE_WIDTH = ZySize.SCALE(52);//--卡片重叠时的最小可视宽度
//var LARGE_CARD_MAX_VISIBLE_WIDTH = ZySize.SCALE(80); //--卡片重叠时的最大可视宽度（非单张或最后一张时）
//
//var CARD_SELECTED_UP_OFFSET = ZySize.SCALE(30);
//var NORMAL_CARD_MIN_VISIBLE_WIDTH = ZySize.SCALE(20); //--卡片重叠时的最小可视宽度
//var NORMAL_CARD_MAX_VISIBLE_WIDTH = ZySize.SCALE(40); //--卡片重叠时的最大可视宽度（非单张或最后一张时）
//
//var SMALL_CARD_MIN_VISIBLE_WIDTH = ZySize.SCALE(20); //--卡片重叠时的最小可视宽度
//var SMALL_CARD_MAX_VISIBLE_WIDTH = ZySize.SCALE(40); //--卡片重叠时的最大可视宽度（非单张或最后一张时）

