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
                    prompt.fadeMiddle(self.tipWeixinString);
                    return;
                }

                var loadingBar = new LoadingLayer({msg: '正在跳转支付..'});
                cc.director.getRunningScene().addChild(loadingBar, 100);
                UniversalController.requestPaymentByPingpp(self.channel, productId, gOS, function (data) {
                    if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
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

        //default payment by alipay
        this.channel = CommonConf.PAYMENT.CHANNEL.alipay;

        var alipayX = 300, wxX = 640, y = 430;

        //
        this.alipayBg = new cc.Sprite("res/images/common/ui_daquan.png");
        this.alipayBg.scale = 1.3;
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

        var recommendtip = new cc.Sprite("res/images/recommendtip.png");
        recommendtip.x = 75;
        recommendtip.y = 65;
        recommendtip.scale = 0.5
        alipayIcon.addChild(recommendtip);

        //
        this.wxBg = new cc.Sprite("res/images/common/ui_daquan.png");
        this.wxBg.scale = 1.3;
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
        this.tipDefaultString = '如充值遇到问题, 请联系客服QQ: 7405510 \n或发消息到微信公众号: 大同扎股子';
        this.tipWeixinString = '微信充值请加微信: 7405510';
        this.tipLabel = new cc.LabelTTF(this.tipDefaultString, "AmericanTypewriter", 38);
        this.tipLabel.color = {r: 0, g: 255, b: 127};
        this.tipLabel.x = 480;
        this.tipLabel.y = 220;
        this.box.bg.addChild(this.tipLabel);
    },

    onAlipayClicked: function (ref, event) {
        if (event === ccui.Widget.TOUCH_ENDED) {

            if (this.alipayBg.visible) return;

            //选择支付宝支付, 设置选中状态
            this.selected = CommonConf.PAYMENT.CHANNEL.alipay;
            this.alipayBg.setVisible(true);
            this.tipLabel.setString(this.tipDefaultString);
            this.channel = CommonConf.PAYMENT.CHANNEL.alipay;

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
            this.tipLabel.setString(this.tipWeixinString);

            //设置其他支付方式为未选择
            this.alipayBg.setVisible(false);
        }
    }


}



