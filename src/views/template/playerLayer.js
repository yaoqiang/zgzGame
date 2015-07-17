//牌局中头像框component
var PlayerLayer = cc.Layer.extend({
    ctor: function (params) {
        this._super();
        this.m_pAvatarBg = null;// new cc.Sprite("#touxiangkuang.png");
        this.m_pPhoto = null;
        this.m_pName = null;
        this.m_pReady = null;

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


        this.m_pRedImage = null;
        this.m_pBlackImage = null;
        this.m_pGuziImage = null;

        this.init();
    },
    init: function () {
        this.addActorPhotoBg();
        this.showNickName();

        if(true){
            var lable = new cc.LabelTTF(""+this.m_index, "Arial", 32);
            var size = this.m_pAvatarBg.getContentSize();
            lable.setPosition(cc.p(size.width/2, size.height/2));
            this.m_pAvatarBg.addChild(lable, 1);
;        }
    },

    clear:function(){
        this.m_uid = -1;
        this.m_nickNname = "";
        this.m_avatar = -1;

        if(this.m_pPhoto != null){
            this.removeChild(this.m_pPhoto);
        }
        this.showNickName();
        this.showReady(false);
        this.removeIdentity();
       // this.visible = false;
    },
    redIdentity: function () {
        if(this.m_pRedImage == null){
            this.m_pRedImage = new cc.Sprite("#Card_hearts_red_1.png");
            this.m_pRedImage.setPosition(cc.p(0, 0));
            this.m_pRedImage.anchorX = 0;
            this.m_pRedImage.anchorY = 0;
            this.m_pRedImage.scale = 0.5;
            this.m_pAvatarBg.addChild(this.m_pRedImage, 1);
        }
    },
    blackIdentity: function () {
        if(this.m_pBlackImage == null){
            this.m_pBlackImage = new cc.Sprite("#Card_hearts_black_1.png");
            this.m_pBlackImage.setPosition(cc.p(20, 0));
            this.m_pBlackImage.anchorX = 0;
            this.m_pBlackImage.anchorY = 0;
            this.m_pBlackImage.scale = 0.5;
            this.m_pAvatarBg.addChild(this.m_pBlackImage, 1);
        }
    },
    guziIdentity: function () {
        if(this.m_pGuziImage == null){
            this.m_pGuziImage = new cc.LabelTTF("谷子", "Arial", 28);
            var size = this.m_pAvatarBg.getContentSize();
            this.m_pGuziImage.anchorX = 0.5;
            this.m_pGuziImage.anchorY = 1;
            this.m_pGuziImage.setPosition(cc.p(size.width/2, size.height));
            this.m_pAvatarBg.addChild(this.m_pGuziImage, 1);
        }
    },
    removeGuziIdentity: function () {
        if(this.m_pGuziImage){
            this.m_pGuziImage.removeFromParent(true);
            this.m_pGuziImage = null;
        }
    },

    removeRedIdentity: function () {
        if(this.m_pRedImage){
            this.m_pRedImage.removeFromParent(true);
            this.m_pRedImage = null;
        }
    },
    removeBlackIdentity: function () {
        if(this.m_pBlackImage){
            this.m_pBlackImage.removeFromParent(true);
            this.m_pBlackImage = null;
        }
    },
    removeIdentity: function () {
        this.removeRedIdentity();
        this.removeBlackIdentity();
        this.removeGuziIdentity();
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
            var image = "#touxiang_0" + this.m_avatar + ".png";
            console.log(image);
            if(this.m_pPhoto) {
                this.removeChild(this.m_pPhoto);
            }

            this.m_pPhoto = new cc.Sprite(image);
            if(this.m_pPhoto){
                this.m_pPhoto.setPosition(cc.p(this.m_position.x, this.m_position.y));
                this.m_pPhoto.anchorX = this.m_anchorX;
                this.m_pPhoto.anchorY = this.m_anchorY;
                this.m_pPhoto.scale = ZGZ.SCALE * 0.5;
                this.addChild(this.m_pPhoto);
            }
        }
    },

    showNickName:function(){
        if(this.m_pName == null){
            this.m_pName = new cc.LabelTTF(this.m_nickNname, "Arial", 28);
            var size = this.m_pAvatarBg.getContentSize();
            this.m_pName.anchorX = 0.5;
            this.m_pName.anchorY = 0;
            this.m_pName.setPosition(cc.p(size.width/2, size.height + 1));
            this.m_pAvatarBg.addChild(this.m_pName, 1);
        }else{
            this.m_pName.setString(this.m_nickNname);
        }
    },

    addActorPhotoBg:function(){
        if(this.m_photoId == null){
            this.m_pAvatarBg = new cc.Sprite("#touxiangkuang.png");
            this.m_pAvatarBg.setPosition(cc.p(this.m_position.x, this.m_position.y));
            this.m_pAvatarBg.anchorX = this.m_anchorX;
            this.m_pAvatarBg.anchorY = this.m_anchorY;
            this.m_pAvatarBg.scale = ZGZ.SCALE * 0.4;
            this.addChild(this.m_pAvatarBg);
        }
    },

    showReady:function(visible) {
        this.m_isready = visible;
        if (this.m_pReady == null) {
            this.m_pReady = new cc.LabelTTF("ready", "Arial", 30);
            var size = this.m_pAvatarBg.getContentSize();
            this.m_pReady.anchorX = 0.5;
            this.m_pReady.anchorY = 1;
            this.m_pReady.setPosition(cc.p(size.width / 2, 0));
            this.m_pAvatarBg.addChild(this.m_pReady, 1);
        }
        if (this.m_pReady) {
            this.m_pReady.setVisible(visible);
        }
    }

});