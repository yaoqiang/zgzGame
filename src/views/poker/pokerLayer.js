var PokerLayer = cc.Layer.extend({
    ctor: function(args){
        this._super();
        cc.log("---->PokerLayer:ctor");
//类变量
        this.m_pActorHDList = null;
        this.m_pTable = null;

        this.m_pFanOutMenuLayer = null;
        this.m_pBidMenuLayer = null;

        this.m_pSelfCardArray = [];    //--当前持有的纸牌
        this.m_pSelectedWillOutCards = [];   //--自己选中要出的牌

        this.m_pFanOutCard = [];   //--打出的牌，所有玩家打出、显示再牌桌中心。
        this.m_pFanOutHDCard = [];   //--打出的牌，所有玩家打出、显示再牌桌中心。

        this.hintCards = [];//提示
        this.iaFanOut = false;

        this.m_tCardTouchableRect = cc.rect(0, 0, 0, 0);// --可相应触摸的范围（卡牌区）
        this.m_tTouchDownPoint = null;
        this.m_tTouchUpPoint = null;
        this.m_tTouchCurPoint = null;
        this.m_bIsOperation  = true;
       // --   J   Q   K    A    2   LJoker  BJoker
       // --  11  12  13   14   15    16      17

//card define

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

        CARD_SELECTED_UP_OFFSET = ZySize.SCALE(30);
        NORMAL_CARD_MIN_VISIBLE_WIDTH = ZySize.SCALE(20); //--卡片重叠时的最小可视宽度
        NORMAL_CARD_MAX_VISIBLE_WIDTH = ZySize.SCALE(40); //--卡片重叠时的最大可视宽度（非单张或最后一张时）

        SMALL_CARD_MIN_VISIBLE_WIDTH = ZySize.SCALE(20); //--卡片重叠时的最小可视宽度
        SMALL_CARD_MAX_VISIBLE_WIDTH = ZySize.SCALE(40); //--卡片重叠时的最大可视宽度（非单张或最后一张时）
//card define  end


        this.init();
    },

    init:function(){
        this._super();
        cc.log("---->PokerLayer:init");
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
        if(this.m_pFanOutMenuLayer) {
            this.m_pFanOutMenuLayer.setBtnEnabled(FanOutMenuBtn.kCCFanOutMenu_FanOut, this.checkForFanOut({}));
        }
    },

//--向当前持有纸牌中增加一张底牌
    insertSelfCard:function(cardValue){
        var pCard = this.addSelfCard(cardValue);
        //this.m_pSelfCardArray.push(pCard);

        var cardPoint = cardValue % 100;
        var insertIndex = 0;
        var len = this.m_pSelfCardArray.length;

        for(var i=0; i<len; i++){
            var pObj = this.m_pSelfCardArray[i];
            if (pObj.cardPoint < cardPoint)
                break;
            insertIndex = insertIndex + 1;
        }
        //console.log("--->insertIndex:"+ insertIndex);
        this.m_pSelfCardArray.splice(insertIndex, 0, pCard);//插入元素


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
        //card.scale = ZySize.scale();
        MDisplay.align(card, MDisplay.BOTTOM_LEFT, 0, HOLDING_CARD_BOTTOM);
        this.addChild(card);
        //card.retain();
        return card;
    },


    updataSelfCardZoder:function(){
        var zOrder = 1;
        var len = this.m_pSelfCardArray.length;
        console.log("updataSelfCardZoder:  "+len);
        for (var i = 0; i< len; i++){
            var card = this.m_pSelfCardArray[i];
            this.reorderChild(card, zOrder);
            zOrder++;
        }

    },

    updateSelfCardDisplay:function(){
        var winSize = cc.director.getWinSize();
        var len = this.m_pSelfCardArray.length;

        if(len ==1){
            var pc = this.m_pSelfCardArray[0];
            pc.setVisible(true);

            var pp = 0;
            if (pc.isSelected){
                pp = HOLDING_CARD_BOTTOM + CARD_SELECTED_UP_OFFSET;
            }else{
                pp = HOLDING_CARD_BOTTOM;
            }

            var pos = cc.p(winSize.width/2 - pc.getContentSize().width/2, pp);
            pc.setPosition(pos);
            this.m_tCardTouchableRect = cc.rect(pos.x, pos.y, CARD_WIDTH_LARGE, CARD_HEIGHT_LARGE + CARD_SELECTED_UP_OFFSET);

            return;
        }

        var displayWidth = winSize.width - HOLDING_CARD_PADDING * 2;

        this.m_nCardVisibleWidth = (displayWidth - CARD_WIDTH_LARGE)/(len -1);

        if (this.m_nCardVisibleWidth > LARGE_CARD_MAX_VISIBLE_WIDTH){
            this.m_nCardVisibleWidth =LARGE_CARD_MAX_VISIBLE_WIDTH;
        }else{
            //this.m_nCardVisibleWidth =this.m_nCardVisibleWidth;
        }

        var occupyWidth = (this.m_nCardVisibleWidth *(len -1)) + CARD_WIDTH_LARGE;
        var screenMidX = winSize.width /2;
        var leftStartPos = screenMidX - occupyWidth/2;

        this.m_tCardTouchableRect = cc.rect(leftStartPos, HOLDING_CARD_BOTTOM, occupyWidth, CARD_HEIGHT_LARGE + CARD_SELECTED_UP_OFFSET);

        //console.log("-----leftStartPos:", leftStartPos);
        //console.log("-----this.m_nCardVisibleWidth:", this.m_nCardVisibleWidth);
        var idx = 0;
        for (var i = 0; i<len; i++){
            var pc = this.m_pSelfCardArray[i];

            var pp =0;
            if  (pc.isSelected){
                pp = HOLDING_CARD_BOTTOM+CARD_SELECTED_UP_OFFSET;
            }else{
                pp = HOLDING_CARD_BOTTOM;
            }
            //console.log("-----pos:", leftStartPos+idx*this.m_nCardVisibleWidth);
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
                xx = this.m_nCardVisibleWidth;
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
        if(this.m_pFanOutMenuLayer) {
            this.m_pFanOutMenuLayer.setBtnEnabled(FanOutMenuBtn.kCCFanOutMenu_FanOut, false);
            this.m_pFanOutMenuLayer.setBtnEnabled(FanOutMenuBtn.kCCFanOutMenu_Reset, false);
        }
    },



    setFanOutCards:function(cardsVector, actorNr){
        this.m_pFanOutCard = cardsVector;
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
                //pc.setScale(ZySize.scale() * 0.6);
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
        console.log("-------->clearCards:",this.m_pSelfCardArray);
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

    isHong3:function(vector){
        var len = vector.length;

        for(var i=0; i<len; i++){
            if(vector[i]%100 != 16){
                return false;
            }
        }
        for(var i=0; i<len; i++){
            if(vector[i] == 216 || vector[i] == 116){
                return true;
            }
        }
        return false;
    },

    isBlack3:function(vector){
        var len = vector.length;
        if(len == 0){
            return true;
        }

        for(var i=0; i<len; i++){
            if(vector[i]%100 != 16){
                return false;
            }
        }
        for(var i=0; i<len; i++){
            if(vector[i] == 316 || vector[i] == 416){
                return true;
            }
        }
        return false;
    },
    isCanFanOut:function(vector){
        var len = vector.length;
        if(len == 0){
            return false;
        }

        var cr1 = cardUtil.recognitionCards(vector, gGameType, gActor.append);//牌型分析
        if(cr1.cardSeries == CardLogic.CardSeriesCode.cardSeries_99){
            return false;
        }

        var cr2 = cardUtil.recognitionCards(this.m_pFanOutCard, gGameType, gActor.append);//牌型分析
        //if(cr2.cardSeries == CardLogic.CardSeriesCode.cardSeries_99 ){
        //    return true;
        //}
        //
        ////本次出牌大于上家出牌
        //if(cardUtil.isCurrentBiggerThanLast (cr1, cr2, gGameType, gActor.append))
        //{
        //    return true;
        //}
        //return false;



        if (!gActor.isBoss) {
            if (cardUtil.isCurrentBiggerThanLast(cr1, cr2, gGameType, gActor.append)) {
                return true;
            }
        }else {
            if (_.size(cards) == 0) {
                // '当前玩家是上回合Boss, 不能不出
                return false;
            }
        }
        return false;
    },

    checkForFanOut:function(call){
        this.m_pSelectedWillOutCards = [];
        var selectCardVector = [];
        var count = this.m_pSelfCardArray.length;
        var idx = 0;
        var i = 1;

        for(idx = count-1; idx>=0; idx--){
            var pc = this.m_pSelfCardArray[idx];
            if (pc.isSelected){
                selectCardVector.push(pc.cardValue);//(pc.cardPoint);
                this.m_pSelectedWillOutCards.push(pc.cardValue);
             }
        }

        if(cc.isFunction(call)){
            console.log("---->checkForFanOut call is function");
            return call(selectCardVector);
        }

        return false;

    },

    hideFanOutMenu:function(){
        if(this.m_pFanOutMenuLayer) {
            this.m_pFanOutMenuLayer.setVisible(false);
        }
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


    gameStart:function(data){
        console.log("actor:",data);
        console.log("properties:",data.properties);
        console.log("gameStatus:",data.gameStatus);
        var HoldingCards = data.gameStatus.currentHoldingCards;
        //HoldingCards = [18,113,212,112,111,410,310,109,408,105];
        console.log("HoldingCards:",HoldingCards);


        var len ;

        this.clearCards();
        len = HoldingCards.length;
        for (var i = 0; i<len; i++){
            var card  = HoldingCards[i];
            if (card > 0 ){
                this.insertSelfCard(card);
            }
        }

    },

    isHaveSelectCars:function(){
        var len = this.m_pSelfCardArray.length;
        for (var i = len-1; i >= 0; i--){
            var card  = this.m_pSelfCardArray[i];
            if (card.isSelected){
                return true;
            }
        }
        return false;
    },


    onTalkCountdown:function(data){
        return;
        if (data.actor.uid == gPlayer.uid) {
            //识别当前玩家身份
            var identity = cardUtil.recognitionIdentity(gActor.cards, gGameType);
            //如果是红3，显示亮3说话按钮
            if (identity == GAME.IDENTITY.HONG3) {
                cc.log('说话阶段-当前玩家是红3，显示“亮3”按钮')
            }
            else
            {
                cc.log('说话阶段-当前玩家是股子，显示“股子”按钮')
            }
        }else {

        }



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
            //this.hintFromHintCards();
        }

        //--显示可以操作的按钮
        switch (gGameState){
            case ZGZ.GAME_STATE.TALK:
            {
                if(this.getParent().m_pBidMenuLayer){
                    var able;// = this.checkForFanOut();
                    console.log("------>able:", able);
                    var identity = cardUtil.recognitionIdentity(gActor.cards, gGameType);
                    if (identity == GAME.IDENTITY.HONG3) {
                        able = this.checkForFanOut(this.isHong3);
                        this.getParent().m_pBidMenuLayer.setBtnEnabled(BidMenuBtn.kCCBidMenu_Liang,able);
                    }else{
                        able = this.checkForFanOut(this.isBlack3);
                        this.getParent().m_pBidMenuLayer.setBtnEnabled(BidMenuBtn.kCCBidMenu_Guzi,able);
                    }

                }
            }
                break;
            case ZGZ.GAME_STATE.PLAY:
            {
                if(this.m_pFanOutMenuLayer){
                    this.m_pFanOutMenuLayer.setBtnEnabled(FanOutMenuBtn.kCCFanOutMenu_FanOut, this.checkForFanOut(this.isCanFanOut));
                    this.m_pFanOutMenuLayer.setBtnEnabled(FanOutMenuBtn.kCCFanOutMenu_Reset, this.checkSelfCard(this.isCanFanOut));
                }
            }
                break;
        }

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


        //this.gameStart({properties:"测试", gameStatus:"牌型", currentHoldingCards:10});
        var card = new PokerCard({cardPoint:10, cardFace:4, cardSize:PokerCard_enum.kCCCardSizeSmall});
        card.isSelected = false;
        card.setPosition(200, 100);
        MDisplay.align(card, MDisplay.BOTTOM_LEFT, 0, HOLDING_CARD_BOTTOM);
        this.addChild(card);
        console.log("PokerCard size:",card.getContentSize());
    },

    onExit:function(){
        this._super();
        console.log("PokerLayer onExit");
        cc.eventManager.removeListener(this._touchListener);
    },

    onTouchBegan:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        var target = event.getCurrentTarget();

        cc.log("PokerLayer this.m_bIsOperation: " + target.m_bIsOperation);
        //if (!this.m_bIsOperation) return false;
        cc.log("PokerLayer onTouchBegan at: " + pos.x + " " + pos.y);
        target.touchBegan(pos.x, pos.y);


        var pc = target.m_pSelfCardArray[0];
        var size = pc.getContentSize();
        console.log(size);
        console.log(target.m_tCardTouchableRect);


        return true;
    },
    onTouchMoved:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        var target = event.getCurrentTarget();

        target.touchMoved(pos.x, pos.y);
    },
    onTouchEnded:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        var target = event.getCurrentTarget();

        cc.log("PokerLayer onTouchEnded at: " + pos.x + " " + pos.y);
        //event.getCurrentTarget().release_id(id,pos);
        target.touchEnded(pos.x, pos.y);
    },
    onTouchCancelled:function(touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        var target = event.getCurrentTarget();

        //cc.log("PokerLayer onTouchCancelled ");
        //event.getCurrentTarget().update_id(id,pos);
        target.touchCancelled(pos.x, pos.y);
    }


});