var PaymentLayer = function (productId) {
    return this.ctor(productId);
}

PaymentLayer.prototype = {
    ctor: function (productId) {

        var self = this;

        this.box = new DialogSmall("选择支付方式", 2, {
            ensureCallback: function (cb) {
                //关闭支付窗口
                cb(true);


                if (self.channel === CommonConf.PAYMENT.CHANNEL.wx) {
                    prompt.fadeMiddle("微信支付即将支持,请先选择其他支付");
                    return;
                }

                var loadingBar = new LoadingLayer({msg: '正在跳转支付..'});
                cc.director.getRunningScene().addChild(loadingBar, 100);
                UniversalController.requestPaymentByPingpp(self.channel, productId, gOS, function (data) {
                    if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
                    console.log('charge => ', data);
                    if (data.code === RETURN_CODE.FAIL) {
                        prompt.fadeMiddle("支付请求发送失败, 请重新支付");
                        return;
                    }
                    //调用pingpp支付组件
                    payment.pingpp.doPayment(JSON.stringify(data.charge));

                });
            }
        });

        this.init();

        return this.box;

    },

    init: function () {

        var winSize = cc.director.getWinSize();

        //default alipay
        this.channel = CommonConf.PAYMENT.CHANNEL.alipay;

        var alipayX = 300, wxX = 640, y = 430;

        //
        this.alipayBg = new cc.Sprite("#dialog_content_bg.png");
        this.alipayBg.scale = 5;
        this.alipayBg.setPosition(alipayX, y);
        //this.alipayBg.setVisible(false);
        this.box.bg.addChild(this.alipayBg);


        var alipayIcon = new ccui.Button();
        alipayIcon.scale = 3;
        alipayIcon.setTouchEnabled(true);
        alipayIcon.loadTextures("alipaynew.png", "alipaynew.png", "alipaynew.png", ccui.Widget.PLIST_TEXTURE);
        alipayIcon.addTouchEventListener(this.onAlipayClicked, this);
        alipayIcon.setPosition(alipayX, y);
        this.box.bg.addChild(alipayIcon);

        //
        this.wxBg = new cc.Sprite("#dialog_content_bg.png");
        this.wxBg.scale = 5;
        this.wxBg.setPosition(wxX, y);
        this.wxBg.setVisible(false);
        this.box.bg.addChild(this.wxBg);


        var wxIcon = new ccui.Button();
        wxIcon.scale = 3;
        wxIcon.setTouchEnabled(true);
        wxIcon.loadTextures("weixin.png", "weixin.png", "weixin.png", ccui.Widget.PLIST_TEXTURE);
        wxIcon.addTouchEventListener(this.onWxClicked, this);
        wxIcon.setPosition(wxX, y);
        this.box.bg.addChild(wxIcon);


        //tip
        var tipLabel = new cc.LabelTTF("可通过银行转账或支付宝转账充值\n详情请咨询客服: 0352-7963773", "AmericanTypewriter", 38);
        tipLabel.color = {r: 0, g: 255, b: 127};
        tipLabel.x = 480;
        tipLabel.y = 220;
        this.box.bg.addChild(tipLabel);
    },

    onAlipayClicked: function (ref, event) {
        if (event === ccui.Widget.TOUCH_ENDED) {

            if (this.alipayBg.visible) return;

            //选择支付宝支付, 设置选中状态
            this.selected = CommonConf.PAYMENT.CHANNEL.alipay;
            this.alipayBg.setVisible(true);

            //设置其他支付方式为未选择
            this.wxBg.setVisible(false);
        }
    },

    onWxClicked: function (ref, event) {
        if (event === ccui.Widget.TOUCH_ENDED) {

            if (this.wxBg.visible) return;

            //选择微信支付, 设置选中状态
            this.channel = CommonConf.PAYMENT.CHANNEL.wx;
            this.wxBg.setVisible(true);

            //设置其他支付方式为未选择
            this.alipayBg.setVisible(false);
        }
    }


}

