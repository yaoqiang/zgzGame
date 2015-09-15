//牌局中头像框component
var PlayerLayer = cc.Layer.extend({
    ctor: function (params) {
        this._super();
        this.m_pAvatarBg = null;// new cc.Sprite("#touxiangkuang.png");
        this.m_pPhoto = null;
        this.m_pName = null;
        this.m_pReady = null;
        this.rankS = null;

        this.m_index = params.index;
        this.m_position = params.position;
        this.m_anchorX = params.anchor.x;
        this.m_anchorY = params.anchor.y;

        this.m_Nr = -1;
        this.m_uid = -1;
        this.m_nickNname = "";
        this.m_avatar = -1;
        this.m_gold = 0;
        this.m_rank = 0;
        this.m_isready = false;

        this.bgScale = ZGZ.SCALE * 0.4;

        this.m_identity = false;
        this.m_pIdentityArray = [];
        this.m_pRedImage = null;
        this.m_pBlackImage = null;
        this.m_pGuziImage = null;

        this.m_pFanOutCardVector = null;
        this.init();
    },
    init: function () {
        this.addActorPhotoBg();
        this.showNickName();

        //if(true){
        //    var label = new cc.LabelTTF(""+this.m_index, "Arial", 32);
        //    var size = this.m_pAvatarBg.getContentSize();
        //    label.setPosition(size.width/2, size.height/2);
        //    this.m_pAvatarBg.addChild(label, 1);
        //}
    },

    clear:function(){
        this.m_uid = -1;
        this.m_nickNname = "";
        this.m_avatar = -1;

        if(this.m_pPhoto != null && cc.sys.isObjectValid(this.m_pPhoto)){
            this.removeChild(this.m_pPhoto);
        }
        this.showNickName();
        this.showReady(false);
        this.removeIdentity();
        this.clearFanoutCards();

        this.setRank("", false);
       // this.visible = false;
    },

    clearFanoutCards:function(){
        if(this.m_pFanOutCardVector == null){
            return;
        }
        var len = this.m_pFanOutCardVector.length;

        for(var i=0; i<len; i++){
            var card = this.m_pFanOutCardVector[i];
            card.removeFromParent();
        }
        this.m_pFanOutCardVector = null;
    },

    setFanoutCards:function(array){
        this.clearFanoutCards();
        var len = array.length;
        if(len <= 0){
            return;
        }
        this.m_pFanOutCardVector = array;
    },
    fanOutCards: function () {
        return this.m_pFanOutCardVector;
    },

    /**
     *
     * @param goal
     * @param array
     */
    showIdentity: function (goal, array) {
        if(!cc.isArray(array)){
            return;
        }
        var size = this.m_pAvatarBg.getContentSize();

        if(goal == GAME.IDENTITY.GUZI){
            var winSize = cc.director.getWinSize();
            var label = new cc.LabelTTF("股", "Arial", 28);

            this.m_pAvatarBg.addChild(label, 1);
            this.m_pIdentityArray.push(label);

            if(this.m_position.x < winSize.width/2){
                label.setAnchorPoint(0, 1);
                label.setPosition(size.width, size.height-1);
            }else{
                label.setAnchorPoint(1, 1);
                label.setPosition(0, size.height-1);
            }
           // return;
        }
        else if (goal == GAME.IDENTITY.UNKNOW) {
            var winSize = cc.director.getWinSize();
            var label = new cc.LabelTTF("", "Arial", 28);

            this.m_pAvatarBg.addChild(label, 1);
            this.m_pIdentityArray.push(label);

            if(this.m_position.x < winSize.width/2){
                label.setAnchorPoint(0, 1);
                label.setPosition(size.width, size.height-1);
            }else{
                label.setAnchorPoint(1, 1);
                label.setPosition(0, size.height-1);
            }
        }

        var x = 16;
        var y = 0;
        var len = array.length;
        console.log("----->showIdentity array.length:", len);
        for(var i=0; i< len; i++){
            var cardFace = parseInt(array[i] / 100);
            var cardPoint = array[i] % 100;
            console.log("----->showIdentity cardFace:", cardFace, "      cardPoint:", cardPoint);
            var bigFaceBuf = null;
            if (cardFace == PokerCard_enum.kCCCardFaceClub && cardPoint == 16){
                    bigFaceBuf = "#Card_Flower_black_1.png" ; //4
            }else if (cardFace == PokerCard_enum.kCCCardFaceDiamond && cardPoint == 16){
                    bigFaceBuf = "#Card_Square-piece_red_1.png" ; // 1
            }else if (cardFace == PokerCard_enum.kCCCardFaceHeart && cardPoint == 16){
                    bigFaceBuf = "#Card_hearts_red_1.png" ;  //  2
            }else if (cardFace == PokerCard_enum.kCCCardFaceSpade && cardPoint == 16){
                    bigFaceBuf = "#Card_hearts_black_1.png" ;  //  3
            }
            console.log("----->showIdentity bigFaceBuf:", bigFaceBuf);
            if(bigFaceBuf){
                var identityImage = new cc.Sprite(bigFaceBuf);
                if(identityImage) {
                    var xx = (1-this.m_anchorX)*size.width;//*this.bgScale;
                    var yy = (1-this.m_anchorY)*size.height;//*this.bgScale;
                    identityImage.setPosition(cc.p(size.width - 0, size.height-i*40));
                    identityImage.setAnchorPoint(0, 1);
                    identityImage.setScale(0.4);
                    this.m_pAvatarBg.addChild(identityImage, 1);
                    this.m_pIdentityArray.push(identityImage);
                }else{
                    console.log("----->没创建成功", bigFaceBuf);
                }

            }

        }

    },

    removeIdentity: function () {
        var len = this.m_pIdentityArray.length;
        for(var i =0; i<len; i++){
            var identity = this.m_pIdentityArray[i];
            identity.removeFromParent(true);
        }
        this.m_pIdentityArray = [];
    },


    fill: function () {
        
    },
    jion: function (params) {

    },
    leave: function () {
        this.clear();
    },
    fan: function () {

    },
    action: function () {

    },
    chat: function () {

    },
    expression: function () {
        
    },
    identity3: function () {

    },
    zha: function () {

    },

    details: function () {
        
    },

    updata: function (args) {
        console.log("PlayerLayer updata");
        console.log(args);
        var properties = args.m_properties;

        this.m_uid = args.m_uid;
        this.m_nickNname = properties.nickName;
        this.m_avatar = properties.avatar;
        this.m_gold = properties.gold;
        this.m_rank = properties.rank;
        this.m_isready = args.m_isReady;

        this.showActorPhoto();
        this.showNickName();
        this.showReady(this.m_isready);
    },

    showActorPhoto:function(){
        if(this.m_avatar != -1){
            var image = utils.getAvatar(this.m_avatar);
            console.log(image);
            if(this.m_pPhoto && cc.sys.isObjectValid(this.m_pPhoto)) {
                this.removeChild(this.m_pPhoto);
            }

            this.m_pPhoto = new cc.Sprite(image);
            if(this.m_pPhoto){
                this.m_pPhoto.setPosition(this.m_position.x, this.m_position.y);
                this.m_pPhoto.anchorX = this.m_anchorX;
                this.m_pPhoto.anchorY = this.m_anchorY;
                this.m_pPhoto.scale = ZGZ.SCALE * 0.5;
                this.addChild(this.m_pPhoto);
            }
        }
    },

    changeActorPhoto: function (image) {
        if (this.m_pPhoto && cc.sys.isObjectValid(this.m_pPhoto)) {
            this.m_pPhoto.removeFromParent(true);
        }
        this.m_pPhoto = new cc.Sprite(image);
        if(this.m_pPhoto){
            this.m_pPhoto.setPosition(this.m_position.x, this.m_position.y);
            this.m_pPhoto.anchorX = this.m_anchorX;
            this.m_pPhoto.anchorY = this.m_anchorY;
            this.m_pPhoto.scale = ZGZ.SCALE * 0.5;
            this.addChild(this.m_pPhoto);
        }
    },

    showNickName:function(){
        //if(this.m_pName == null){
        //    this.m_pName = new cc.LabelTTF(this.m_nickNname, "Arial", 28);
        //    var size = this.m_pAvatarBg.getContentSize();
        //    this.m_pName.anchorX = 0.5;
        //    this.m_pName.anchorY = 0;
        //    this.m_pName.setPosition(cc.p(size.width/2, size.height + 1));
        //    this.m_pAvatarBg.addChild(this.m_pName, 1);
        //}else{
        //    this.m_pName.setString(this.m_nickNname);
        //}

        if(this.m_pName == null){
            this.m_pName = new cc.LabelTTF(this.m_nickNname, "Arial", 13);
            var size = this.m_pAvatarBg.getContentSize();
            this.m_pName.color = cc.color(255,255,255,255);
            this.m_pName.anchorX = 0.5;
            this.m_pName.anchorY = 0;
            var xx = (1-this.m_anchorX - 0.5)*size.width*this.bgScale;
            var yy = (1-this.m_anchorY)*size.height*this.bgScale*1.2;
            this.m_pName.setPosition(this.m_position.x + xx, this.m_position.y + yy);
            this.addChild(this.m_pName, 1);
        }else{
            this.m_pName.setString(this.m_nickNname);
        }
    },

    addActorPhotoBg:function(){
        if(this.m_photoId == null){
            this.m_pAvatarBg = new cc.Sprite("#game_bg_avatar.png");
            this.m_pAvatarBg.setPosition(this.m_position.x, this.m_position.y);
            this.m_pAvatarBg.anchorX = this.m_anchorX;
            this.m_pAvatarBg.anchorY = this.m_anchorY;
            this.m_pAvatarBg.scale = this.bgScale * 1.2;
            this.addChild(this.m_pAvatarBg);
        }
    },

    showReady:function(visible) {
        this.m_isready = visible;
        if (this.m_pReady == null) {
            this.m_pReady = new cc.Sprite("#game_zhunbei_2.png");
            var size = this.m_pAvatarBg.getContentSize();
            this.m_pReady.anchorX = 0.5;
            this.m_pReady.anchorY = 1;
            this.m_pReady.setPosition(size.width / 2, 0);
            this.m_pAvatarBg.addChild(this.m_pReady, 1);
        }
        if (this.m_pReady) {
            this.m_pReady.setVisible(visible);
        }
    },

    /**
     * 当初完牌后，设置名次
     * @param rank
     * @param visible
     */
    setRank: function (rank, visible) {
        var size = this.m_pAvatarBg.getContentSize();
        var winSize = cc.director.getWinSize();
        if (visible)
        {
            var rankPng = "";
            switch (parseInt(rank)) {
                case 1:
                    rankPng = "#game_shuzi2_01.png";
                    break;
                case 2:
                    rankPng = "#game_shuzi2_02.png";
                    break;
                case 3:
                    rankPng = "#game_shuzi2_03.png";
                    break;
                case 4:
                    rankPng = "#game_shuzi2_04.png";
                    break;
                case 5:
                    rankPng = "#game_shuzi2_05.png";
                    break;
                case 6:
                    rankPng = "#game_shuzi2_06.png";
                    break;

            }

            this.rankS = new cc.Sprite(rankPng);
            this.rankS.scale = 5;
            if(this.m_position.x < winSize.width/2){
                this.rankS.setAnchorPoint(0, 1);
                this.rankS.setPosition(size.width + 60, size.height-1);
            }else{
                this.rankS.setAnchorPoint(1, 1);
                this.rankS.setPosition(0 - 60, size.height-1);
            }

            this.m_pAvatarBg.addChild(this.rankS, 10);
        }
        else {
            if (this.rankS && cc.sys.isObjectValid(this.rankS)) this.rankS.removeFromParent(true);
        }


    },

    onEnter:function(){
        this._super();
    },

    onExit:function(){
        this._super();
    }

});