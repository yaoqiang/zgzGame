var PokerCard = cc.Node.extend({

    ctor: function(args){
        this._super();
//类变量
        this.showFanOutMenuLayerForCard = null;
        this.cardPoint = args.cardPoint;
        this.cardFace = args.cardFace;
        this.cardValue = args.cardPoint + args.cardFace * 100;
        this.cardPointImage = null;
        this.cardPointImageScale = 1;
        this.cardSize = args.cardSize;
        this.oldPos = cc.p(0, 0);

        -- 当前状态
        this.state = 0;

        this.isSelected = false;
        this.isHitted = false;
        this.moving = null;
        this.isOperation = true;


        this.init();
    },

    init:function(){
        var winSize = cc.director.getWinSize();
        this._super();


    },

    updatePokerImage:function(){

        if(0 == this.state){
            self.state = 1;
            var pading = 5;
            var frameName = "#Card_front.png";

            this.cardFrame = new cc.Sprite.create(frameName);

            var size = this.cardFrame.getContentSize();
            this.setContentSize(size);
            this.cardFrame.setPosition(size.width / 2, size.height / 2);
            this.addChild(this.cardFrame, 0);

            this.frameName = frameName;
            this.setHitted(this.isHitted);

            var colorStr = "black";
            var colorFaceStr =  "blue";
            if (self.cardFace < 3)
            {
                colorStr = "red";
                colorFaceStr = "red";
            }

            var pointbuf = null;
            var bigFaceBuf = null;
            var smallFaceBuf = null;

            if (this.cardPoint == 11) {
                pointbuf = string.format("Card_J_%s.png", colorStr);
                bigFaceBuf = string.format("Card_Duke_%s.png", colorFaceStr);
            }else if (this.cardPoint == 12){
                pointbuf = string.format("Card_Q_%s.png", colorStr);
                bigFaceBuf = string.format("Card_queen_%s.png", colorFaceStr);
            }else if (this.cardPoint == 13){
                pointbuf = string.format("Card_K_%s.png", colorStr);
                bigFaceBuf = string.format("Card_King_%s.png", colorFaceStr);
            }else if (this.cardPoint == 14){
                pointbuf = string.format("Card_A_%s.png", colorStr);
            }else if (this.cardPoint == 15){
                pointbuf = string.format("Card_2_%s.png", colorStr);
            }else if (this.cardPoint == 16){
                pointbuf = string.format("Card_clown_gray.png");
            }else if (this.cardPoint == 17){
                pointbuf = string.format("Card_clown_red.png");
            }else{
                pointbuf = string.format("Card_%d_%s.png", this.cardPoint, colorStr);
            }

            this.cardPointImage = new cc.Sprite.create("#"+pointbuf);//display.newSprite("#"..pointbuf)

            if (this.cardPoint == 16 || this.cardPoint == 17){
                display.align(self.cardPointImage, display.LEFT_TOP, pading, size.height - pading);
            }else{
                if (this.cardSize == PokerCard.kCCCardSizeSmall){
                    this.cardPointImage.setScale(1.2);
                    display.align(self.cardPointImage, display.CENTER, 30, size.height - 45);
                }else{
                    this.cardPointImage.setScale(self.cardPointImageScale);
                    display.align(self.cardPointImage, display.CENTER, 27, size.height - 35);
                }

            }

            this.cardFrame.addChild(this.cardPointImage);

            //--小牌，去除JQK的图案
            if (self.cardSize == PokerCard.kCCCardSizeSmall){
                var isGCard = (self.cardPoint == 11) || (self.cardPoint == 12) || (self.cardPoint == 13);

                if (self.cardFace == PokerCard.kCCCardFaceClub){
                    if (isGCard)
                        bigFaceBuf = "Card_Flower_black_1.png" ;
                }else if (self.cardFace == PokerCard.kCCCardFaceDiamond){
                    if (isGCard)
                        bigFaceBuf = "Card_Square-piece_red_1.png" ;
                }else if (self.cardFace == PokerCard.kCCCardFaceHeart){
                    if (isGCard)
                        bigFaceBuf = "Card_hearts_red_1.png" ;
                }else if (self.cardFace == PokerCard.kCCCardFaceSpade){
                    if (isGCard)
                        bigFaceBuf = "Card_hearts_black_1.png" ;
                }
            }

            if (self.cardPoint < 16){

                var isGCard = (self.cardPoint < 11) || (self.cardPoint == 14) || (self.cardPoint == 15);

                if (self.cardFace == PokerCard.kCCCardFaceClub ){
                    if (isGCard)
                        bigFaceBuf = "Card_Flower_black_1.png" ;
                    smallFaceBuf = "Card_Flower_black_1.png";
                }else if (self.cardFace == PokerCard.kCCCardFaceDiamond){
                    if (isGCard)
                        bigFaceBuf = "Card_Square-piece_red_1.png" ;
                    smallFaceBuf = "Card_Square-piece_red_1.png";
                }else if (self.cardFace == PokerCard.kCCCardFaceHeart){
                    if (isGCard)
                        bigFaceBuf = "Card_hearts_red_1.png" ;
                    smallFaceBuf = "Card_hearts_red_1.png";
                }else if (self.cardFace == PokerCard.kCCCardFaceSpade){
                    if (isGCard)
                        bigFaceBuf = "Card_hearts_black_1.png" ;
                    smallFaceBuf = "Card_hearts_black_1.png";
                }

                if (this.cardSize != PokerCard.kCCCardSizeSmall ){
                    var sp = new cc.Sprite.create("#"+smallFaceBuf);
                    sp.scale = 0.5;
                    sp.align();
                    display.align(sp, display.CENTER, 27, size.height - 35 - self.cardPointImage.getContentSize().height);
                    self.cardFrame.addChild(sp);
                }

                if (bigFaceBuf) {
                    sp = new cc.Sprite.create("#"+bigFaceBuf);//display.newSprite("#"+bigFaceBuf);
                    display.align(sp, display.BOTTOM_RIGHT, size.width - pading, pading);
                    this.cardFrame.addChild(sp);

                }

            }else{
                if (self.cardPoint == 16) {
                    smallFaceBuf = "Card_JOKER_black.png";
                }else if (self.cardPoint == 17){
                    smallFaceBuf = "Card_JOKER_red.png";
                }
                if (smallFaceBuf) {
                    var sp = new cc.Sprite.create("#"+smallFaceBuf);//display.newSprite("#"+smallFaceBuf);
                    display.align(sp, display.LEFT_TOP, pading + 5, size.height - pading);
                    self.cardFrame.addChild(sp);
                }
            }

            if (self.cardFace == 6) {
                var sp = new cc.Sprite.create("#Card_back.png");
                sp:setPosition(size.width / 2, size.height / 2);
                self.cardFrame.addChild(sp);
            }

        }
    },

    setCardPointImageScale:function(scale){
        this.cardPointImageScale = scale;
    },

    setCardPosition:function(x, y){
        this.cardFrame.setPosition(x, y);
    },
//选中
    setHitted:function(isHitted){
        this.isHitted = isHitted;

        if (self.isHitted){

        }
    },


    selectCards:function(){
        if (this.cardSize != PokerCard_enum.kCCCardSizeLarge)
            return;

        if (this.isHitted && this.isSelected ){
            this.isSelected = false;
            this.setPositionY(HOLDING_CARD_BOTTOM);
        }else{
            if(this.isHitted){
                this.isSelected = true;
                this.setPositionY(HOLDING_CARD_BOTTOM + CARD_SELECTED_UP_OFFSET);
            }
        }

    },

    checkTouchInSprite:function(x, y){
        return this.cardFrame && this.cardFrame.getCascadeBoundingBox().containsPoint(cc.p(x, y));
    },

    creatAction:function(){
        this.moving = cc.moveTo(0.2, cc.p(0, 0));
    },

    cardRunAction:function(p){
        if (p != null)
            this.moving.setPosition(p);
    },


    onEnter:function(){
        this._super();
        console.log("PokerLayer onEnter");

        this.updatePokerImage();
    },

    onExit:function(){
        this._super();
        console.log("PokerLayer onEnter");
    }

})