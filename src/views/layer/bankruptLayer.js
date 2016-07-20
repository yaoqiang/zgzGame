var BankruptLayer = function (data) {
    return this.ctor(data);
}

BankruptLayer.prototype = {
    ctor: function () {

        this.box = new DialogSmall("破产补助", 1, null, this, 1);

        var label = new cc.LabelTTF('哎呀,又输光了,领点破产补助', "Arial", 24);
        label.setPosition(400, 280);
        label.color = {r: 0, g: 255, b: 127};
        this.box.addChild(label);

        var label2 = new cc.LabelTTF('提示:赞助次数不多哦', "Arial", 20);
        label2.setPosition(400, 230);
        label2.color = {r: 0, g: 255, b: 127};
        this.box.addChild(label2);

        var getBtn = new ccui.Button();
        getBtn.setAnchorPoint(0.5, 0.5);
        getBtn.setTouchEnabled(true);
        getBtn.loadTextures('common_btn_lv.png', 'common_btn_lv.png', 'common_btn_lv.png', ccui.Widget.PLIST_TEXTURE);
        getBtn.addTouchEventListener(this.getBankruptGrant, this);
        getBtn.x = 400;
        getBtn.y = 130;
        getBtn.scale = 0.6;

        var butSize = getBtn.getContentSize();
        var okLabel = new cc.LabelTTF("领取", "Arial", 22);
        okLabel.setPosition(butSize.width / 2, butSize.height / 2);
        getBtn.addChild(okLabel);

        this.box.addChild(getBtn, 2);

        return this.box;

    },
    
    getBankruptGrant: function (ref, event) {
        if (event === ccui.Widget.TOUCH_ENDED) {
            playEffect(audio_common.Button_Click);

            var self = this;
            UniversalController.getBankruptcyGrant(function (data) {
                if (data.code === RETURN_CODE.FAIL) {
                    prompt.fadeMiddle(ERR_MESSAGE.getMessage(data.err));
                    return;
                }
                self.box.removeFromParent(true);
                prompt.fade("您成功领取破产补助" + data.gold + "金币");
            })

        }

    }
}
