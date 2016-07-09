var PlayerProfileLayer = function (data) {
    return this.ctor(data);
}

PlayerProfileLayer.prototype = {
    ctor: function (data) {

        var winSize = cc.director.getWinSize();
        this.data = data;

        this.box = new DialogSmall('玩家信息', 1, null, null, 0.8);

        var boxSize = this.box.bg.getBoundingBox();

        //init
        this.init();

        return this.box;
    },

    init: function () {
        var winSize = cc.director.getWinSize();

        var headerX = 365, contentX = 395, contentY = 280, lineHeight = 25, avatarX = 295;

        //avatar
        var avatarBg = new cc.Sprite("#hallinfo_kuang.png");
        avatarBg.setPosition(avatarX, contentY+20);
        avatarBg.setAnchorPoint(0.5, 1);
        avatarBg.scale = ZGZ.SCALE * 0.25;


        //
        var avatar = new cc.Sprite(utils.getAvatar(this.data.avatar));
        avatar.setAnchorPoint(0.5, 1);
        avatar.scale = 2.5;
        avatar.setPosition(avatarBg.getContentSize().width/2, avatarBg.getContentSize().height-120);
        avatarBg.addChild(avatar);

        this.box.addChild(avatarBg);

        //昵称
        var nickNameLabel = new cc.LabelTTF("昵  称:", "AmericanTypewriter", 16);
        nickNameLabel.setPosition(headerX, contentY);
        nickNameLabel.color = cc.color.WHITE

        this.box.addChild(nickNameLabel);

        var nickNameValue = new cc.LabelTTF(this.data.nickName, "AmericanTypewriter", 16);
        nickNameValue.setPosition(contentX, contentY);
        nickNameValue.setAnchorPoint(0, 0.5);
        nickNameValue.color = cc.color.WHITE;

        this.box.addChild(nickNameValue);

        contentY = contentY - lineHeight;

        //性别
        var genderLabel = new cc.LabelTTF("性  别:", "AmericanTypewriter", 16);
        genderLabel.setPosition(headerX, contentY);
        genderLabel.color = cc.color.WHITE;
        this.box.addChild(genderLabel);

        var genderValue = new cc.LabelTTF(this.data.gender == 'MALE' ? '男' : '女', "AmericanTypewriter", 16);
        genderValue.setPosition(contentX, contentY);
        genderValue.color = cc.color.WHITE;
        genderValue.setAnchorPoint(0, 0.5);
        this.box.addChild(genderValue);


        contentY = contentY - lineHeight;
        //金币
        var profileGoldLabel = new cc.LabelTTF("金  币:", "AmericanTypewriter", 16);
        profileGoldLabel.setPosition(headerX, contentY);
        profileGoldLabel.color = cc.color.WHITE;

        this.box.addChild(profileGoldLabel);

        var goldIcon = new cc.Sprite("#common_icon_coins_1.png");
        goldIcon.setPosition(contentX, contentY);
        goldIcon.scale = 0.4;
        goldIcon.setAnchorPoint(0, 0.5);
        this.box.addChild(goldIcon);

        var profileGoldValue = new cc.LabelTTF(zgzNumeral(this.data.gold).format('0,0'), "AmericanTypewriter", 16);
        profileGoldValue.setPosition(contentX + 30, contentY);
        profileGoldValue.color = cc.color.YELLOW;
        profileGoldValue.setAnchorPoint(0, 0.5);
        this.box.addChild(profileGoldValue);


        contentY = contentY - lineHeight;
        //胜率
        var percentLabel = new cc.LabelTTF("胜  率:", "AmericanTypewriter", 16);
        percentLabel.setPosition(headerX, contentY);
        percentLabel.color = cc.color.WHITE;

        this.box.addChild(percentLabel);

        var totalBattle = this.data.loseNr + this.data.winNr;

        var percentStr = utils.getPercent(this.data.winNr, totalBattle);

        var percentValue = new cc.LabelTTF(percentStr, "AmericanTypewriter", 16);
        percentValue.setPosition(contentX, contentY);
        percentValue.setAnchorPoint(0, 0.5);
        this.box.addChild(percentValue);

        contentY = contentY - lineHeight;

        //级别
        var rankLabel = new cc.LabelTTF("级  别:", "AmericanTypewriter", 16);
        rankLabel.setPosition(headerX, contentY);
        rankLabel.color = cc.color.WHITE;

        this.box.addChild(rankLabel);

        var rankString = RankConf[0].title;
        if (this.data.rank) {
            if (this.data.rank > 0) {
                rankString = RankConf[this.data.rank-1].title;
            }
        }
        var rankValue = new cc.LabelTTF(rankString, "AmericanTypewriter", 16);
        rankValue.setPosition(contentX, contentY);
        rankValue.setAnchorPoint(0, 0.5);
        this.box.addChild(rankValue);

        //rank avatar
        var rankAvatar = new cc.Sprite("#"+utils.getRankAvatar(this.data.rank || 1));
        rankAvatar.setPosition(contentX + 60, contentY);
        rankAvatar.setAnchorPoint(0, 0.5);
        rankAvatar.scale = 0.3;
        this.box.addChild(rankAvatar);
        //
        contentY = contentY - lineHeight;

        //简介
        var summaryLabel = new cc.LabelTTF("签  名:", "AmericanTypewriter", 16);
        summaryLabel.setPosition(headerX, contentY);
        summaryLabel.color = cc.color.WHITE;

        this.box.addChild(summaryLabel);

        var summaryValue = new cc.LabelTTF(this.data.summary, "AmericanTypewriter", 16);
        summaryValue.setPosition(contentX, contentY);
        summaryValue.setAnchorPoint(0, 0.5);
        this.box.addChild(summaryValue);

    }
}