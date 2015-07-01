
var ZySize = {

    scale : height() / 640,
    scalew : width() / 960,

    SCALE:function(x){
        return Math.round(scale * x);
    },
    SCALEW:function(x){
        return Math.round(scalew * x);
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


//var SHOW_MODE = {
//    LEFT:1,
//    RIGHT:2,
//    CENTER:3
//};

//var FanOutMenuBtn =  {
//    kCCFanOutMenu_Pass : 1, //--不出
//    kCCFanOutMenu_Reset : 2,//--重选
//    kCCFanOutMenu_Hint : 3, //--提示
//    kCCFanOutMenu_FanOut : 4 //--出牌
//};

CARD_WIDTH_LARGE = ZySize.SCALE(120);
CARD_HEIGHT_LARGE = ZySize.SCALE(168);
CARD_WIDTH_NORMAL = ZySize.SCALE(80);
CARD_HEIGHT_NORMAL = ZySize.SCALE(108);
CARD_WIDTH_SMALL = ZySize.SCALE(44);
CARD_HEIGHT_SMALL = ZySize.SCALE(56);

HOLDING_CARD_BOTTOM = ZySize.SCALE(40);  //--相对屏幕底部边缘的留边宽度
HOLDING_CARD_PADDING = ZySize.SCALE(20); //--相对屏幕左右边缘的留边宽度

LARGE_CARD_MIN_VISIBLE_WIDTH = ZySize.SCALE(52);//--卡片重叠时的最小可视宽度
LARGE_CARD_MAX_VISIBLE_WIDTH = ZySize.SCALE(80); //--卡片重叠时的最大可视宽度（非单张或最后一张时）

CARD_SELECTED_UP_OFFSET = ZySize.SCALE(30)
NORMAL_CARD_MIN_VISIBLE_WIDTH = ZySize.SCALE(20); //--卡片重叠时的最小可视宽度
NORMAL_CARD_MAX_VISIBLE_WIDTH = ZySize.SCALE(40); //--卡片重叠时的最大可视宽度（非单张或最后一张时）

SMALL_CARD_MIN_VISIBLE_WIDTH = ZySize.SCALE(20); //--卡片重叠时的最小可视宽度
SMALL_CARD_MAX_VISIBLE_WIDTH = ZySize.SCALE(40); //--卡片重叠时的最大可视宽度（非单张或最后一张时）





var PokerLayer = cc.Layer.extend({

    ctor: function(args){
        this._super();
//类变量
        this.m_pActorHDList = null;
        this.m_pTable = null;

        this.m_pFanOutMenuLayer = null;

        this.m_pSelfCardArray = [];    //--当前持有的纸牌
        this.m_pSelectedWillOutCards = [];   //--自己选中要出的牌

        this.m_pFanOutCard = [];   //--打出的牌，所有玩家打出、显示再牌桌中心。
        this.m_pFanOutHDCard = [];   //--打出的牌，所有玩家打出、显示再牌桌中心。

        this.hintCards = [];//提示

        this.m_tCardTouchableRect = cc.rect(0, 0, 0, 0);// --可相应触摸的范围（卡牌区）
        this.m_tTouchDownPoint = null;
        this.m_tTouchUpPoint = null;
        this.m_tTouchCurPoint = null;
        this.m_bIsOperation  = true;
       // --   J   Q   K    A    2   LJoker  BJoker
       // --  11  12  13   14   15    16      17




        this.init();
    },

    init:function(){
        var winSize = cc.director.getWinSize();



    },

//cardsArray--card对象数组，actorNr--编号
     showFanOutCards:function( cardsArray, actorNr ){
         if(this.m_pActorHDList == null || this.m_pActorHDList.length == 0) return;
         var len = cardsArray.length;
         if (len == 0) return;

         var showP = this.m_pTable.showCardPosition(actorNr);//获取显示起始位置、显示方式（靠左、靠右、居中）
         var x = showP.x;
         var y = showP.y;
         var space = 20;

         switch (showP.mode){
             case SHOW_MODE.LEFT:
             {
                 for(var i=0; i<len; i++){
                     var card = cardsArray[i];
                     card.x = x + i*space;
                     card.y = y;
                 }
             }
                 break;
             case SHOW_MODE.RIGHT:
             {
                 var j=len-1;
                 for(var i=0; i<len; i++){
                     var card = cardsArray[i];
                     card.x = x - (j-i)*space;
                     card.y = y;
                 }
             }
                 break;
             case SHOW_MODE.CENTER:
             {
                 var j=len/2;
                 for(var i=0; i<len; i++){
                     var card = cardsArray[i];
                     card.x = x + (i-j)*space;
                     card.y = y;
                 }
             }
                 break;
         }

     },



     hideFanOutCards:function(actorNr){
         var actorHD = this.m_pTable.getActorHDWithNr(actorNr);//根据玩家编号获取HD

         var cardsArray = actorHD.fanOutCards();

         if(cardsArray == null ||cardsArray.length == 0) return;

         for(var i = 0; i< cardsArray.length; i++){
             var card = cardsArray[i];
             card.setVisible(false);
             card.removeFromParent();
         }

         actorHD.clearfanOutCards();// =null即可
    },


    showFanOutMenuLayerForCard:function(){
        //--显示可以操作的按钮
        self.m_pFanOutMenuLayer.setBtnEnabled(FanOutMenuBtn.kCCFanOutMenu_FanOut,this.checkForFanOut());
    },

//--向当前持有纸牌中增加一张底牌
    insertSelfCard:function(cardValue){
        var pCard = this.addSelfCard(cardValue);
        this.m_pSelfCardArray.push(pCard);

        var cardPoint = cardValue % 100;
        var insertIndex = 0;
        var len = this.m_pSelfCardArray.length;

        for(var i=0; i<len; i++){
            var pObj = this.m_pSelfCardArray[i];
            if (pObj.cardPoint < cardPoint)
                break;
            insertIndex = insertIndex + 1;
        }
        this.m_pSelfCardArray.splice(insertIndex, pCard);//插入元素

        this.updataSelfCardZoder();
        this.updateSelfCardDisplay();
    },

    addSelfCard:function(cardValue){
        var cardFace = parseInt(cardValue / 100);
        var cardPoint = cardValue % 100;
        return this.addSelfCardDetail(cardFace, cardPoint);
    },


    addSelfCardDetail:function( cardFace, cardPoint ){
        var card = new PokerCard({cardPoint:cardPoint, cardFace:cardFace, cardSize:PokerCard_enum.kCCCardSizeLarge});
        card.isSelected = false;
        card.scale = ZySize.scale;
        MDisplay.align(card, MDisplay.BOTTOM_LEFT, 0, HOLDING_CARD_BOTTOM);
        this.addChild(card);
        return card;
    },


    updataSelfCardZoder:function(){
        var zOrder = 1;
        var len = this.m_pSelfCardArray.length;
        for (var i = 0; i< len; i++){
            var pObj = self.m_pSelfCardArray[i];
            this.reorderChild(pObj, zOrder);
            zOrder = zOrder + 1;
        }

    },

    updateSelfCardDisplay:function(){
        var winSize = cc.director.getWinSize();
        var len = this.m_pSelfCardArray.length;

        if(len ==1){
            var pObj = this.m_pSelfCardArray[0];
            pObj.setVisible(true);

            var pp = 0;
            if (pc.isSelected){
                pp = HOLDING_CARD_BOTTOM + CARD_SELECTED_UP_OFFSET;
            }else{
                pp = HOLDING_CARD_BOTTOM;
            }

            var pos = cc.p(winSize.width/2 - pObj.getContentSize().width/2, pp);
            pObj.setPosition(pos);
            this.m_tCardTouchableRect = cc.rect(pos.x, pos.y, CARD_WIDTH_LARGE, CARD_HEIGHT_LARGE + CARD_SELECTED_UP_OFFSET);

            return;
        }

        var displayWidth = winSize.width - HOLDING_CARD_PADDING * 2;

        this.m_nCardVisibleWidth = (displayWidth - CARD_WIDTH_LARGE)/(len -1);

        if (this.m_nCardVisibleWidth > LARGE_CARD_MAX_VISIBLE_WIDTH){
            this.m_nCardVisibleWidth =LARGE_CARD_MAX_VISIBLE_WIDTH;
        }else{
            this.m_nCardVisibleWidth =this.m_nCardVisibleWidth;
        }

        var occupyWidth = (this.m_nCardVisibleWidth *(len -1)) + CARD_WIDTH_LARGE;
        var screenMidX = winSize.width /2;
        var leftStartPos = screenMidX - occupyWidth/2;

        this.m_tCardTouchableRect = cc.rect(leftStartPos, HOLDING_CARD_BOTTOM, occupyWidth, CARD_HEIGHT_LARGE + CARD_SELECTED_UP_OFFSET);


        var idx = 0;
        for (var i = 0; i<len; i++){
            var pc = this.m_pSelfCardArray[i];

            var pp =0;
            if  (pc.isSelected){
                pp = HOLDING_CARD_BOTTOM+CARD_SELECTED_UP_OFFSET;
            }else{
                pp = HOLDING_CARD_BOTTOM;
            }

            var pos = cc.p(leftStartPos+idx*this.m_nCardVisibleWidth, pp);
            pc.oldPos = pos;
            pc.setPosition(pos);
            pc.setVisible(true);
            idx = idx + 1;
        }

    },

//--开始玩牌或重新发牌时动画
cardRunAction:function(){
    var winSize = cc.director.getWinSize();
    var len = this.m_pSelfCardArray.length;
    var displayWidth = winSize.width - HOLDING_CARD_PADDING*2;// --40
    var cardVisibleWidth = (displayWidth - CARD_WIDTH_LARGE)/(len -1);
    for (var i = 0; i<len;i++){
        var pc = this.m_pSelfCardArray[i];
        var pp = HOLDING_CARD_BOTTOM;
        var pos = pc.oldPos;
        var pcSize = pc.getContentSize();
        var tempP = cc.p(winSize.width-pcSize.width, pp);
        pc.setPosition(tempP);
        var time = Math.abs((tempP.x-pos.x)/50);

        pc.runAction(cc.moveTo(0.02*time, ccp(pos.x, pos.y)));
    }

},


    hitCards:function( tTouchDownPoint, tTouchUpPoint ){
        var minX = Math.min(tTouchDownPoint.x, tTouchUpPoint.x);
        var maxX = Math.max(tTouchDownPoint.x, tTouchUpPoint.x);
        var minY = Math.min(tTouchDownPoint.y, tTouchUpPoint.y);
        var maxY = Math.max(tTouchDownPoint.y, tTouchUpPoint.y);

        var width = maxX-minX;
        var height = maxY - minY;
        var selectedRect;
        var len = this.m_pSelfCardArray.length;
        var endIdx = len - 1;

        var w = 0;
        var h = 0;
        if (width <= 0 ){
            w = 1;
        }else{
            w = width;
        }

        if (height <= 0 ){
            h = 1;
        }else{
            h = height;
        }
        selectedRect = cc.rect(minX, minY, w, h);

        var touchIn = false;
        for (var idx = endIdx; idx >=0; idx--){
            var pc = this.m_pSelfCardArray[idx];
            var vMinX = pc.getPositionX();
            var xx = 0;
            if (endIdx == idx){
                xx = CARD_WIDTH_LARGE;
            }else{
                xx = self.m_nCardVisibleWidth;
            }

            var vMaxX = pc.getPositionX() + xx;
            var vMinY = HOLDING_CARD_BOTTOM;
            var vv = 0;
            if (pc.isSelected ){
                vv = CARD_SELECTED_UP_OFFSET;
            }else{
                vv = 0;
            }

            var vMaxY = HOLDING_CARD_BOTTOM+CARD_HEIGHT_LARGE + vv;
            var vWidth = vMaxX - vMinX;
            var vHeight = vMaxY - vMinY;

            var cardVisibleRect = cc.rect(vMinX, vMinY, vWidth, vHeight);
            var hitted = cc.rectIntersectsRect(selectedRect, cardVisibleRect);//selectedRect.intersectsRect(cardVisibleRect);

            if ((!hitted) && pc.isSelected && (idx < endIdx)){
                //--选定升起的牌面可视范围，判定其局部遮挡关系
                vMinX = pc.getPositionX() + this.m_nCardVisibleWidth;
                vMinY = HOLDING_CARD_BOTTOM+CARD_HEIGHT_LARGE;
                vWidth = CARD_WIDTH_LARGE - this.m_nCardVisibleWidth;
                vHeight = CARD_SELECTED_UP_OFFSET;

                for (var j = idx + 1; j<= endIdx;j++){
                    var pNextCard = this.m_pSelfCardArray[j];
                    if (pNextCard.getPositionX() > (pc.getPositionX() + CARD_WIDTH_LARGE)){
                        break;
                    }
                    if (pNextCard.isSelected){
                        vWidth = pNextCard.getPositionX() - vMinX;
                        break;
                    }

                }
                var topVisibleRect = cc.rect(vMinX, vMinY, vWidth, vHeight);
                hitted = cc.rectIntersectsRect(selectedRect, topVisibleRect);//selectedRect:intersectsRect(topVisibleRect)

            }
            pc.setHitted(hitted);
            if (hitted) touchIn = true;
        }
        return touchIn;

    },

    selectCards:function(){
        var pc;
        var hasSelectedCards = false;
        var len = this.m_pSelfCardArray.length;

        for  (var i = 0; i<len;i++){
            pc = this.m_pSelfCardArray[i];

            if (pc.isHitted && pc.isSelected){
                pc.setHitted(false);
                pc.isSelected = false;
                pc.setPositionY(HOLDING_CARD_BOTTOM);
            }else{
                if (pc.isHitted){
                    hasSelectedCards = true;
                    pc.isSelected = true;
                    pc.setPositionY(HOLDING_CARD_BOTTOM + CARD_SELECTED_UP_OFFSET);
                    pc.setHitted(false);
                }
            }

        }
    },

    resetSelectedCards:function(){
        var len = this.m_pSelfCardArray.length;
        for(var  i = 0; i< len; i++ ){
            var pc = this.m_pSelfCardArray[i];
            pc.setHitted(false);
            pc.isSelected = false;
            pc.setPositionY(HOLDING_CARD_BOTTOM);
        }
        self.m_pFanOutMenuLayer.setBtnEnabled(FanOutMenuBtn.kCCFanOutMenu_FanOut, false);
        self.m_pFanOutMenuLayer.setBtnEnabled(FanOutMenuBtn.kCCFanOutMenu_Reset, false);
    },



    setFanOutCards:function(cardsVector, actorNr){
        this.hideFanOutCards(actorNr);
        var actorHD = this.m_pTable.getActorHDWithNr(actorNr);//根据玩家编号获取HD
        var cardsArray = [];

        var len = cardsVector.length;
        if (len > 0){
            for (var idx = 0; idx<len; idx++){
                var cardValue = cardsVector[idx];

                var cardFace = Math.floor(cardValue/100);
                var cardPoint = cardValue % 100;
                var pc = new PokerCard(cardFace, cardPoint, PokerCard.kCCCardSizeNormal);
                pc.setCardPointImageScale(1.1);
                pc.scale(ZySize.scale * 0.6);
                this.addChild(pc);
                cardsArray.push(pc);
            }
            this.showFanOutCards(cardsArray, actorNr);
        }

        if (this.m_pTable.isSelfHD(actorNr)){
            for (var i = 0; i<len; i++){
                var cardValue = cardsVector[i];

                for  (var idx = this.m_pSelfCardArray.length - 1; idx == 0; idx--){
                    var pc = this.m_pSelfCardArray[i];
                    if (pc.cardValue == cardValue ){
                        pc.removeFromParent();
                        this.m_pSelfCardArray.splice(idx,1);
                    }
                }
            }
            this.updateSelfCardDisplay();
        }


    },

    clearCards:function(){
        var len = this.m_pSelfCardArray.length;
        for (var i = 0; i<len; i++){
            var pc = this.m_pSelfCardArray[i];
            pc.removeFromParent();
        }
        this.m_pSelfCardArray = [];
    },


    checkSelfCard:function(){
        var len = this.m_pSelfCardArray.length;
        for (var idx = len - 1; idx == 0; idx--){
            var pc = this.m_pSelfCardArray[i];
            if (pc.isSelected)
                return true;
        }
        return false;
    },

    isOperationHoldingCard:function(operation){
        this.m_bIsOperation = operation;
        var len = this.m_pSelfCardArray.length;
        for (var idx = len - 1; idx == 0; idx--){
            var pc = this.m_pSelfCardArray[i];
            pc.setOperation(operation);
        }
    },

    checkForFanOut:function(){

    },

    hideFanOutMenu:function(){
        this.m_pFanOutMenuLayer.setVisible(false);
        this.isFanOut = false;
    },

    clearAll:function(){
        this.m_bIsOperation = true;
        //self:clearSatyCards()
        //self:clearPendingCards()
        //self:clearCards()
        //self:clearFanOutCards(self.m_pCurrentFanOutCard)
        //self:clearFanOutCards(self.m_pNextFanOutCard)
        //self:clearFanOutCards(self.m_pPreFanOutCard)
        //self.m_pLastValidFanOutCard:removeAllObjects()
    },
























    touchBegan:function(x, y){
        this.iaFanOut = this.isHaveSelectCars();
        this.m_tTouchDownPoint = cc.p(x, y);
        if(cc.rectIntersectsRect(this.m_tCardTouchableRect, this.m_tTouchDownPoint)){
            var touchSound = this.hitCards(this.m_tTouchDownPoint, this.m_tTouchDownPoint);
            if (touchSound){
                //ZySounds.playSound({type = ZySounds.EnumType.SoundsType,  index = ZySounds.SoundsType.card})
            }
            return true;
        }
        this.hintCards = {};
        this.resetSelectedCards();
        return false;
    },

    touchMoved:function(x, y){
        this.m_tTouchCurPoint = cc.p(x, y);
        this.hitCards(this.m_tTouchDownPoint, this.m_tTouchCurPoint);
    },
    touchEnded:function(x, y){
        this.m_tTouchUpPoint = cc.p(x, y);
        this.hitCards(this.m_tTouchDownPoint, this.m_tTouchUpPoint);
        this.selectCards();
        if (this.iaFanOut){
            this.hintFromHintCards();
        }

        //--显示可以操作的按钮
        self.m_pFanOutMenuLayer.setBtnEnabled(FanOutMenuBtn.kCCFanOutMenu_FanOut, this.checkForFanOut());
        self.m_pFanOutMenuLayer.setBtnEnabled(FanOutMenuBtn.kCCFanOutMenu_Reset, this.checkSelfCard());
    },
    touchCancelled:function(x, y){
        var len = this.m_pSelfCardArray.length;

        for (var i = 0; i<len; i++){
            var pc = this.m_pSelfCardArray[i];
            pc.setHitted(false);
        }
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
        if (!this.m_bIsOperation) return false;

        this.touchBegan(pos.x, pos.y);

        return true;
    },
    onTouchMoved:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();

        this.touchMoved(pos.x, pos.y);
    },
    onTouchEnded:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        //cc.log("NoteLayer onTouchEnded at: " + pos.x + " " + pos.y);
        //event.getCurrentTarget().release_id(id,pos);
        this.touchEnded(pos.x, pos.y);
    },
    onTouchCancelled:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        //cc.log("NoteLayer onTouchCancelled ");
        //event.getCurrentTarget().update_id(id,pos);
        this.touchCancelled(pos.x, pos.y);
    }


})