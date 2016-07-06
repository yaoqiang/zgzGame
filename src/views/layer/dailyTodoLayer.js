var DailyTodoLayer = cc.Layer.extend({
    ctor: function (args) {
        this._super();

        this.canGetCheckInGrant = args.canGetCheckInGrant;
        this.canGetBankruptcyGrant = args.canGetBankruptcyGrant;
        this.threshold = args.threshold;

        var winSize = cc.director.getWinSize();

        this.box = new DialogMiddle('每日必做');

        var boxSize = this.box.bg.getBoundingBox();

        var startY = 300;
        //var itemCount = 2;
        //var cellHeight = 100;

        //签到
        var checkInIcon = new cc.Sprite('#common_icon_gold_5.png');
        checkInIcon.setPosition(80, startY + 200);
        checkInIcon.scale = 1.4
        this.box.bg.addChild(checkInIcon);

        //标题
        var checkInTitle = new cc.LabelTTF("签到有礼", "AmericanTypewriter", 32);
        checkInTitle.setColor(cc.color.GREEN);
        checkInTitle.setAnchorPoint(0, 0);
        checkInTitle.enableStroke(cc.color.GREEN, 1);
        checkInTitle.setPosition(200, startY + 220);
        this.box.bg.addChild(checkInTitle);

        //描述
        var checkInSummary = new cc.LabelTTF("天天签到, 天天惊喜, 玩牌有大礼!", "AmericanTypewriter", 28);
        checkInSummary.setColor(cc.color.WHITE);
        checkInSummary.setAnchorPoint(0, 0);
        checkInSummary.setPosition(200, startY + 170);
        this.box.bg.addChild(checkInSummary);

        var checkInSummaryExtra = new cc.LabelTTF("7天一周期,第7天送喇叭记牌器!", "AmericanTypewriter", 20);
        checkInSummaryExtra.setColor(cc.color.RED);
        checkInSummaryExtra.setAnchorPoint(0, 0);
        checkInSummaryExtra.setPosition(200, startY + 140);
        this.box.bg.addChild(checkInSummaryExtra);


        //按钮
        var checkInBtn = new ccui.Button();
        checkInBtn.setAnchorPoint(0.5, 0.5);
        checkInBtn.setTouchEnabled(true);
        checkInBtn.loadTextures("common_btn_lv.png", "common_btn_lv.png", "common_btn_lv.png", ccui.Widget.PLIST_TEXTURE);
        checkInBtn.addTouchEventListener(this.onCheckInClick, this);
        checkInBtn.x = 820;
        checkInBtn.y = startY + 200;
        checkInBtn.scale = 1.2;

        //按钮文字
        this.checkInBtnLabel = new cc.LabelTTF(this.canGetCheckInGrant ? "签到" : "已签到", "AmericanTypewriter", 30);
        this.checkInBtnLabel.setColor(cc.color.WHITE);
        this.checkInBtnLabel.setPosition(checkInBtn.getContentSize().width/2, checkInBtn.getContentSize().height/2);
        checkInBtn.addChild(this.checkInBtnLabel);

        this.box.bg.addChild(checkInBtn);

        var line = new cc.Sprite('#split_line.png');
        line.setPosition(boxSize.width/2 + 220, startY + 130);
        line.scaleX = 3.5
        line.scaleY = 1.3
        this.box.bg.addChild(line);


        //破产补助
        var bankruptGrantIcon = new cc.Sprite('#common_icon_gold.png');
        bankruptGrantIcon.setPosition(80, startY + 60);
        bankruptGrantIcon.scale = 1.5
        this.box.bg.addChild(bankruptGrantIcon);

        var bankruptGrantTitle = new cc.LabelTTF("破产补助", "AmericanTypewriter", 32);
        bankruptGrantTitle.setColor(cc.color.GREEN);
        bankruptGrantTitle.enableStroke(cc.color.GREEN, 1);
        bankruptGrantTitle.setAnchorPoint(0, 0);
        bankruptGrantTitle.setPosition(200, startY + 80);
        this.box.bg.addChild(bankruptGrantTitle);

        var bankruptGrantSummary = new cc.LabelTTF("在您破产的时候才会解囊相助!", "AmericanTypewriter", 28);
        bankruptGrantSummary.setColor(cc.color.WHITE);
        bankruptGrantSummary.setAnchorPoint(0, 0);
        bankruptGrantSummary.setPosition(200, startY + 30);
        this.box.bg.addChild(bankruptGrantSummary);


        var bankruptGrantBtn = new ccui.Button();
        bankruptGrantBtn.setAnchorPoint(0.5, 0.5);
        bankruptGrantBtn.setTouchEnabled(true);
        bankruptGrantBtn.loadTextures("common_btn_lv.png", "common_btn_lv.png", "common_btn_lv.png", ccui.Widget.PLIST_TEXTURE);
        bankruptGrantBtn.addTouchEventListener(this.onBankruptGrantClick, this);
        bankruptGrantBtn.x = 820;
        bankruptGrantBtn.y = startY + 60;
        bankruptGrantBtn.scale = 1.2;

        var bankruptGrantBtnLabelStr = "";
        if (!this.canGetBankruptcyGrant) {
            bankruptGrantBtnLabelStr = "已领取";
        } else {
            if (this.threshold) {
                bankruptGrantBtnLabelStr = "领取";
            } else {
                bankruptGrantBtnLabelStr = "前往游戏";
            }
        }
        this.bankruptGrantBtnLabel = new cc.LabelTTF(bankruptGrantBtnLabelStr, "AmericanTypewriter", 30);
        this.bankruptGrantBtnLabel.setColor(cc.color.WHITE);
        this.bankruptGrantBtnLabel.setPosition(checkInBtn.getContentSize().width/2, checkInBtn.getContentSize().height/2);
        bankruptGrantBtn.addChild(this.bankruptGrantBtnLabel);

        this.box.bg.addChild(bankruptGrantBtn);

        line = new cc.Sprite('#split_line.png');
        line.setPosition(boxSize.width/2 + 220, startY - 10);
        line.scaleX = 3.5
        line.scaleY = 1.3
        this.box.bg.addChild(line);


        //
        //邀请奖励
        var inviteGrantIcon = new cc.Sprite('#yuanbaoIcon.png');
        inviteGrantIcon.setPosition(80, startY - 80);
        inviteGrantIcon.scale = 1.5
        this.box.bg.addChild(inviteGrantIcon);

        var inviteGrantTitle = new cc.LabelTTF("邀请奖励", "AmericanTypewriter", 32);
        inviteGrantTitle.setColor(cc.color.GREEN);
        inviteGrantTitle.enableStroke(cc.color.GREEN, 1);
        inviteGrantTitle.setAnchorPoint(0, 0);
        inviteGrantTitle.setPosition(200, startY - 60);
        this.box.bg.addChild(inviteGrantTitle);

        var inviteGrantSummary = new cc.LabelTTF("邀请朋友下载, 您可获得丰厚奖励!", "AmericanTypewriter", 28);
        inviteGrantSummary.setColor(cc.color.WHITE);
        inviteGrantSummary.setAnchorPoint(0, 0);
        inviteGrantSummary.setPosition(200, startY - 110);
        this.box.bg.addChild(inviteGrantSummary);


        var inviteGrantBtn = new ccui.Button();
        inviteGrantBtn.setAnchorPoint(0.5, 0.5);
        inviteGrantBtn.setTouchEnabled(true);
        inviteGrantBtn.loadTextures("common_btn_lv.png", "common_btn_lv.png", "common_btn_lv.png", ccui.Widget.PLIST_TEXTURE);
        inviteGrantBtn.addTouchEventListener(this.onInviteGrantClick, this);
        inviteGrantBtn.x = 820;
        inviteGrantBtn.y = startY - 80;
        inviteGrantBtn.scale = 1.2;

        var inviteGrantBtnLabelStr = "去邀请!";

        this.inviteGrantBtnLabel = new cc.LabelTTF(inviteGrantBtnLabelStr, "AmericanTypewriter", 30);
        this.inviteGrantBtnLabel.setColor(cc.color.WHITE);
        this.inviteGrantBtnLabel.setPosition(checkInBtn.getContentSize().width/2, checkInBtn.getContentSize().height/2);
        inviteGrantBtn.addChild(this.inviteGrantBtnLabel);

        this.box.bg.addChild(inviteGrantBtn);


        this.addChild(this.box);

    },

    onCheckInClick: function (ref, event) {
        if (event === ccui.Widget.TOUCH_ENDED) {
            playEffect(audio_common.Button_Click);
            if (!this.canGetCheckInGrant) {
                prompt.fade("您今天已经签到了");
                return;
            }
            var self = this;
            UniversalController.getCheckInGrant(function (data) {
                self.checkInBtnLabel.setString("已签到");
                self.canGetCheckInGrant = false;
                prompt.fade("您连续签到"+data.day+"天, 领取"+data.gold+"奖励");
            })
        }

    },

    onBankruptGrantClick: function (ref, event) {
        if (event === ccui.Widget.TOUCH_ENDED) {
            playEffect(audio_common.Button_Click);
            if (!this.threshold) {
                //如果是前往游戏, 自动根据金币加入牌局
                if (this.box) {
                    this.box.removeFromParent(true);
                }
                return;
            }

            if (!this.canGetBankruptcyGrant) {
                prompt.fadeMiddle("您已领取完今日破产补助");
                return;
            }

            if (!this.threshold) {
                prompt.fadeMiddle("您的金币太多了, 扎光了再来吧");
                return;
            }

            var self = this;
            UniversalController.getBankruptcyGrant(function (data) {
                if (data.code === RETURN_CODE.FAIL) {
                    prompt.fadeMiddle(ERR_MESSAGE.getMessage(data.err));
                    return;
                }
                self.bankruptGrantBtnLabel.setString(data.canGetBankruptcyGrant ? "已领取" : "前往游戏");
                self.canGetCheckInGrant = data.canGetBankruptcyGrant;
                prompt.fade("您成功领取破产补助" + data.gold + "金币");
            })
        }
    },

    onInviteGrantClick: function (ref, event) {
        if (event === ccui.Widget.TOUCH_ENDED) {
            playEffect(audio_common.Button_Click);

            UniversalController.getProfile(gPlayer.uid, function (data) {
                var args = {};
                args.player = data;
                var scene = new ProfileScene(args);
                cc.director.runScene(scene);
            });

        }
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    }


})