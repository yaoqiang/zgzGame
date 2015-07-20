
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

        this.cardScale = 1;

        this.setAnchorPoint(0.5,0.5);
        //-- 当前状态
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

        if(this.cardSize == PokerCard_enum.kCCCardSizeSmall){
            this.cardScale = 0.4;
        }else if(this.cardSize == PokerCard_enum.kCCCardSizeNormal){
            this.cardScale = 0.6;
        }else if(this.cardSize == PokerCard_enum.kCCCardSizeLarge){
            this.cardScale = 0.8;
        }

    },

    setFanOutMenuLayerForCard:function(callBack){
        this.showFanOutMenuLayerForCard = callBack;
    },

    updatePokerImage:function(){
        console.log("PokerCard updatePokerImage begin");
        if(0 == this.state){
            this.state = 1;
            var pading = 5;
            var frameName = "#Card_front.png";

            this.cardFrame = new cc.Sprite.create(frameName);
            var size = this.cardFrame.getContentSize();
            this.cardFrame.setScale(this.cardScale);
            this.setContentSize(cc.size(size.width*this.cardScale, size.height*this.cardScale));

            var nodeSize = this.getContentSize();
            this.cardFrame.setPosition(nodeSize.width / 2, nodeSize.height / 2);
            this.addChild(this.cardFrame, 0);
            this.frameName = frameName;
            this.setHitted(this.isHitted);

            var colorStr = "black";
            var colorFaceStr =  "blue";
            if (this.cardFace < 3)
            {
                colorStr = "red";
                colorFaceStr = "red";
            }

            var pointbuf = null;
            var bigFaceBuf = null;
            var smallFaceBuf = null;

            if (this.cardPoint == 11) {
                pointbuf = "Card_J_" + colorStr + ".png";
                bigFaceBuf = "Card_Duke_" + colorFaceStr + ".png";
            }else if (this.cardPoint == 12){
                pointbuf = "Card_Q_"+ colorStr + ".png";
                bigFaceBuf = "Card_queen_" + colorFaceStr + ".png";
            }else if (this.cardPoint == 13){
                pointbuf = "Card_K_" + colorStr +".png";
                bigFaceBuf = "Card_King_" + colorFaceStr + ".png";
            }else if (this.cardPoint == 14){
                pointbuf = "Card_A_" + colorStr + ".png";
            }else if (this.cardPoint == 15){
                pointbuf = "Card_2_" + colorStr +".png";
            }else if (this.cardPoint == 16){
                pointbuf = "Card_3_" + colorStr +".png";
            }else if (this.cardPoint == 17){
                pointbuf = "Card_4_" + colorStr +".png";
            }else if (this.cardPoint == 18){
                pointbuf = "Card_clown_gray.png";
            }else if (this.cardPoint == 19){
                pointbuf = "Card_clown_red.png";
            }else{
                pointbuf = "Card_" + this.cardPoint + "_" + colorStr + ".png";
            }

            this.cardPointImage = new cc.Sprite.create("#"+pointbuf);//display.newSprite("#"..pointbuf)

            if (this.cardPoint == 18 || this.cardPoint == 19){
                this.cardPointImage.setAnchorPoint(0,1);
                this.cardPointImage.x = pading;
                this.cardPointImage.y = size.height - pading;
            }else{
                if (this.cardSize == PokerCard_enum.kCCCardSizeSmall){
                    this.cardPointImage.setScale(1.2);
                    this.cardPointImage.setAnchorPoint(0.5,0.5);
                    this.cardPointImage.x = 30;
                    this.cardPointImage.y = size.height - 45;
                }else{
                    this.cardPointImage.setScale(this.cardPointImageScale);
                    this.cardPointImage.setAnchorPoint(0.5,0.5);
                    this.cardPointImage.x = 27;
                    this.cardPointImage.y = size.height - 35;
                }

            }

            this.cardFrame.addChild(this.cardPointImage);
            //--小牌，去除JQK的图案
            if (this.cardSize == PokerCard_enum.kCCCardSizeSmall){
                var isGCard = (this.cardPoint == 11) || (this.cardPoint == 12) || (this.cardPoint == 13);

                if (this.cardFace == PokerCard_enum.kCCCardFaceClub){
                    if (isGCard)
                        bigFaceBuf = "Card_Flower_black_1.png" ;
                }else if (this.cardFace == PokerCard_enum.kCCCardFaceDiamond){
                    if (isGCard)
                        bigFaceBuf = "Card_Square-piece_red_1.png" ;
                }else if (this.cardFace == PokerCard_enum.kCCCardFaceHeart){
                    if (isGCard)
                        bigFaceBuf = "Card_hearts_red_1.png" ;
                }else if (this.cardFace == PokerCard_enum.kCCCardFaceSpade){
                    if (isGCard)
                        bigFaceBuf = "Card_hearts_black_1.png" ;
                }
            }

            if (this.cardPoint < 18){

                var isGCard = (this.cardPoint < 11) || (this.cardPoint == 14) || (this.cardPoint == 15)|| (this.cardPoint == 16) || (this.cardPoint == 17);

                if (this.cardFace == PokerCard_enum.kCCCardFaceClub ){
                    if (isGCard)
                        bigFaceBuf = "Card_Flower_black_1.png" ;
                    smallFaceBuf = "Card_Flower_black_1.png";
                }else if (this.cardFace == PokerCard_enum.kCCCardFaceDiamond){
                    if (isGCard)
                        bigFaceBuf = "Card_Square-piece_red_1.png" ;
                    smallFaceBuf = "Card_Square-piece_red_1.png";
                }else if (this.cardFace == PokerCard_enum.kCCCardFaceHeart){
                    if (isGCard)
                        bigFaceBuf = "Card_hearts_red_1.png" ;
                    smallFaceBuf = "Card_hearts_red_1.png";
                }else if (this.cardFace == PokerCard_enum.kCCCardFaceSpade){
                    if (isGCard)
                        bigFaceBuf = "Card_hearts_black_1.png" ;
                    smallFaceBuf = "Card_hearts_black_1.png";
                }

                if (this.cardSize != PokerCard_enum.kCCCardSizeSmall ){
                    var sp = new cc.Sprite.create("#"+smallFaceBuf);
                    sp.scale = 0.5;
                    MDisplay.align(sp, MDisplay.CENTER, 27, size.height - 35 - this.cardPointImage.getContentSize().height);
                    this.cardFrame.addChild(sp);
                }
                if (bigFaceBuf) {
                    sp = new cc.Sprite.create("#"+bigFaceBuf);//display.newSprite("#"+bigFaceBuf);
                    MDisplay.align(sp, MDisplay.BOTTOM_RIGHT, size.width - pading, pading);
                    this.cardFrame.addChild(sp);

                }

            }else{
                if (this.cardPoint == 18) {
                    smallFaceBuf = "Card_JOKER_black.png";
                }else if (this.cardPoint == 19){
                    smallFaceBuf = "Card_JOKER_red.png";
                }
                if (smallFaceBuf) {
                    var sp = new cc.Sprite.create("#"+smallFaceBuf);//display.newSprite("#"+smallFaceBuf);
                    MDisplay.align(sp, MDisplay.LEFT_TOP, pading + 5, size.height - pading);
                    this.cardFrame.addChild(sp);
                }
            }
            if (this.cardFace == 6) {
                var sp = new cc.Sprite.create("#Card_back.png");
                sp.setPosition(size.width / 2, size.height / 2);
                this.cardFrame.addChild(sp);
            }

        }
        console.log("PokerCard updatePokerImage end");
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

        if (this.isHitted){
            if (this.state != 0){
                if (null == this.cardMask){
                    this.cardMask = new cc.Sprite.create(this.frameName);//display.newSprite(self.frameName)
                    this.cardMask.setScale(this.cardScale);
                    this.cardMask.setPosition(this.cardFrame.getPosition());
                    this.cardMask.setColor(cc.color.BLACK);
                    this.cardMask.setOpacity(128);
                    this.addChild(this.cardMask, 9);
                }
            }

        }

        if (null != this.cardMask){
            this.cardMask.setVisible(this.isHitted);
        }


    },

    setOperation:function(operation){
        this.isOperation = operation;
        if (!this.isOperation){
            if(null == this.cardMask){
                this.cardMask = new cc.Sprite.create(this.frameName);//display.newSprite(self.frameName)
                this.cardMask.setPosition(this.cardFrame.getPosition());
                this.cardMask.setColor(cc.color.BLACK);
                this.cardMask.setOpacity(128);
                this.addChild(this.cardMask, 9);
            }
        }

        if (this.cardMask != null){
            this.cardMask.setVisible(!this.isOperation);
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
        console.log("PokerCard onEnter");

        this.updatePokerImage();
    },

    onExit:function(){
        this._super();
        console.log("PokerCard onExit");
    }

})