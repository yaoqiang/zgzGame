var LotteryLayer = function (data) {
    return this.ctor(data);
}

LotteryLayer.prototype = {
    ctor: function (data) {

        var winSize = cc.director.getWinSize();
        this.data = data;

        this.box = new DialogMiddle('', 1, null, null, null, {
            w: 0,
            h: -30
        });


        //init
        this.init();

        return this.box;
    },

    init: function () {

        var winSize = cc.director.getWinSize();

        var top = new cc.Sprite('#red_ribbon.png');
        top.x = 400;
        top.y = 350;
        top.scale = 0.55;
        this.box.addChild(top);

        var topLabel = new cc.Sprite('res/images/xingyunyouxi.png');
        topLabel.x = 310;
        topLabel.y = 90;
        topLabel.scale = 2;
        top.addChild(topLabel);


        var x = 210, y = 380;
        for (var i = 0; i < this.data.lotteryItemList.length; i++) {
            if (i % 4 == 0) {
                x = 210;
                y -= 100;
            }

            var itemBg = new ccui.Button();
            itemBg.setAnchorPoint(0.5, 0.5);
            itemBg.setTouchEnabled(true);
            itemBg.loadTextures('res/images/common/bg_item_lottery.png', 'res/images/common/bg_item_lottery.png', 'res/images/common/bg_item_lottery.png', ccui.Widget.LOCAL_TEXTURE);
            itemBg.setTag(i);
            itemBg.x = x;
            itemBg.y = y;
            itemBg.scale = 0.4;

            this.box.addChild(itemBg, 2);

            if (this.data.lotteryItemList[i].icon.indexOf('http') != -1) {

            }
            else {
                var itemIcon = new cc.Sprite(this.data.lotteryItemList[i].icon);
                itemIcon.setPosition(110, 170);
                itemIcon.scale = 1.6
                itemBg.addChild(itemIcon);
            }

            var itemLabel = new cc.LabelTTF(this.data.lotteryItemList[i].summary);
            itemLabel.setPosition(110, 40);
            itemLabel.color = cc.color.YELLOW;
            itemLabel.setFontSize(36);
            itemBg.addChild(itemLabel);


            x += 130;
        }
        var current = this.box.getChildByTag(0);
        var selectBg = new cc.Sprite("res/images/common/ui_daquan.png");
        selectBg.setPosition(current.x, current.y);
        selectBg.scale = 0.7;
        selectBg.setName('selectBg');
        this.box.addChild(selectBg);


        //label
        var summaryString = "抽奖须知: 每次抽奖需消耗抽奖卡一张或" + this.data.capital + "金币."
        var summaryLabel = new cc.LabelTTF(summaryString);
        summaryLabel.color = {r: 0, g: 255, b: 127};
        summaryLabel.setFontSize(20);
        summaryLabel.setPosition(winSize.width / 2, winSize.height / 2 - 120);

        this.box.addChild(summaryLabel);

        var cardString = "您当前拥有" + this.data.lotteryCard + "张抽奖卡."
        this.cardLabel = new cc.LabelTTF(cardString);
        this.cardLabel.color = {r: 0, g: 255, b: 127};
        this.cardLabel.setFontSize(20);
        this.cardLabel.setPosition(winSize.width / 2, winSize.height / 2 - 150);

        this.box.addChild(this.cardLabel);



        var getBtn = new ccui.Button();
        getBtn.setAnchorPoint(0.5, 0.5);
        getBtn.setTitleText('抽奖');
        getBtn.setTitleFontSize(28);
        getBtn.setTouchEnabled(true);
        getBtn.loadTextures('common_btn_lv.png', 'common_btn_lv.png', 'common_btn_lv.png', ccui.Widget.PLIST_TEXTURE);
        getBtn.addTouchEventListener(this.lotteryBtnClicked, this);
        getBtn.x = winSize.width/2;
        getBtn.y = winSize.height/2 - 185;
        getBtn.scale = 0.6;

        this.box.addChild(getBtn);

        this.getBtnState = true;
    },

    lotteryBtnClicked: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;

            case ccui.Widget.TOUCH_MOVED:
                break;

            case ccui.Widget.TOUCH_ENDED:

                if (!this.getBtnState) return;

                playEffect(audio_common.Button_Click);
                this.getBtnState = false;

                //
                this.delayList = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];

                this.selectedTag = 0;

                var self = this;

                UniversalController.lottery(function(data) {
                    console.log(data);

                    if (data.code !== RETURN_CODE.OK) {
                        prompt.fadeMiddle(ERR_MESSAGE.getMessage(data.err))
                        self.getBtnState = true;
                        return;
                    }

                    //使用抽奖卡, 更新客户端状态
                    if (data.consumeType === 1) {
                        self.data.lotteryCard = self.data.lotteryCard-1;
                        self.cardLabel.setString("您当前拥有" + self.data.lotteryCard + "张抽奖卡.");
                    }

                    for (var i = 1; i < data.giftId; i++) {
                        self.delayList.push(100);
                    }

                    self.selectItem({target: self, msg: data.msg});


                });


                break;

            case ccui.Widget.TOUCH_CANCELED:
                break;

            default:
                break;
        }
    },

    selectItem: function(params) {
        var target = params.target;

        if (target.delayList.length === 0) {
            target.getBtnState = true;
            prompt.fade(params.msg);
            return;
        }

        target.selectedTag++;
        target.selectedTag = target.selectedTag%8 == 0 ? 0 : target.selectedTag;

        var item = target.box.getChildByTag(target.selectedTag);

        var selectBg = target.box.getChildByName('selectBg');
        selectBg.x = item.x;
        selectBg.y = item.y;




        var first = _.first(target.delayList);
        target.delayList = _.rest(target.delayList);


        _.delay(target.selectItem, first, {target: target, msg: params.msg})

    }

}