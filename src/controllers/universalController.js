var pomelo = window.pomelo;

var UniversalController = function () {

}

UniversalController.enterIndex = function () {

    pomelo.request(route.enterIndex, {}, function (lobbyData) {

        var indexScene = new IndexScene(lobbyData.onlineLobby);
        cc.director.runScene(new cc.TransitionFade(1.2, indexScene));
    });
}

//获取个人
UniversalController.getProfile = function (uid, cb) {
    var loadingBar = new LoadingLayer({msg: '加载中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);
    pomelo.request(route.getProfile, {uid: uid}, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
        cb(data);
    });
}

//获取他人信息
UniversalController.getProfileByUid = function (uid, cb) {
    pomelo.request(route.getProfileByUid, {uid: uid}, function (data) {
        cb(data);
    });
}

UniversalController.getMyItemList = function (cb) {
    pomelo.request(route.getMyItemList, {}, function (data) {
        cb(data);
    });
}

UniversalController.updateProfile = function (nickName, gender, avatar, summary) {

    if (nickName.length < 2 || nickName.length > 6) {
        prompt.fadeMiddle('修改失败, 昵称2-6位', 3);
        return;
    }

    if (summary.length > 10) {
        prompt.fadeMiddle('修改失败, 简介<10位', 3);
        return;
    }

    pomelo.request(route.updateProfile, {
        nickName: nickName,
        gender: gender,
        avatar: avatar,
        summary: summary
    }, function (data) {
        if (data.code == RETURN_CODE.OK) {
            gPlayer.nickName = nickName;
            gPlayer.gender = gender;
            gPlayer.avatar = avatar;
            gPlayer.summary = summary;

            prompt.fadeMiddle('修改成功');

            //var alert = new AlertBox("修改成功", null, null);
        } else if (data.code == RETURN_CODE.FAIL) {

            prompt.fadeMiddle(ERR_MESSAGE.getMessage(data.err), 3);
            //var alert = new AlertBox(ERR_MESSAGE.getMessage(data.err), null, null);
        }

    });
}

/**
 * 获取每日必做的状态
 * @param cb
 */
UniversalController.getDailyTodoInfo = function (cb) {
    var loadingBar = new LoadingLayer({msg: '加载中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);
    pomelo.request(route.getDailyTodoInfo, {}, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
        cb(data);
    });
}

/**
 * 签到
 * @param cb
 */
UniversalController.getCheckInGrant = function (cb) {
    var loadingBar = new LoadingLayer({msg: '加载中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);
    pomelo.request(route.getCheckInGrant, {}, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
        cb(data);
    });
}

/**
 * 领取破产补助
 * @param cb
 */
UniversalController.getBankruptcyGrant = function (cb) {
    var loadingBar = new LoadingLayer({msg: '加载中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);
    pomelo.request(route.getBankruptcyGrant, {}, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
        cb(data);
    });
}

/**
 * 获取每日任务列表
 * @param cb
 */
UniversalController.getDailyTaskList = function (cb) {
    var loadingBar = new LoadingLayer({msg: '加载中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);
    pomelo.request(route.getDailyTaskList, {}, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
        cb(data);
    });
}

/**
 * 获取成长任务列表
 * @param cb
 */
UniversalController.getForeverTaskList = function (cb) {
    var loadingBar = new LoadingLayer({msg: '加载中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);
    pomelo.request(route.getForeverTaskList, {}, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
        data.taskList = _.sortBy(data.taskList, 'id').reverse();
        cb(data);
    });
}

/**
 * 领取任务奖励
 * @param taskId
 * @param cb
 */
UniversalController.getTaskGrant = function (taskId, cb) {
    var loadingBar = new LoadingLayer({msg: '加载中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);
    pomelo.request(route.getTaskGrant, {taskId: taskId}, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
        cb(data);
    });
}

/**
 * 获取兑换列表
 * @param cb
 */
UniversalController.getExchangeList = function (cb) {
    var loadingBar = new LoadingLayer({msg: '加载中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);
    pomelo.request(route.getExchangeList, {}, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
        cb(data);
    });
}

/**
 * 获取我的兑换记录
 * @param cb
 */
UniversalController.getMyExchangeRecordList = function (cb) {
    var loadingBar = new LoadingLayer({msg: '加载中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);
    pomelo.request(route.getMyExchangeRecordList, {}, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
        cb(data);
    });
}

/**
 * 兑换
 * @param exchangeId
 * @param mobile
 * @param count
 * @param contact
 * @param address
 * @param cb
 */
UniversalController.exchange = function (exchangeId, mobile, count, contact, address, cb) {
    var loadingBar = new LoadingLayer({msg: '兑换中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);
    pomelo.request(route.exchange, {
        exchangeId: exchangeId,
        mobile: mobile,
        count: count,
        contact: contact,
        address: address
    }, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
        cb(data);
    });
}

/**
 * 获取商城列表
 * @param cb
 */
UniversalController.getShopList = function (cb) {
    var loadingBar = new LoadingLayer({msg: '加载中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);

    var device = cc.sys.os == cc.sys.OS_IOS ? 'ios' : 'android';
    pomelo.request(route.getShopList, {device: device}, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);

        cb(data);
    });
}

/**
 * 获取排行榜列表
 * @param type
 * @param cb
 */
UniversalController.getRankingList = function (data, cb) {

    var loadingBar = new LoadingLayer({msg: '加载中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);
    pomelo.request(route.getRankingList, {type: data.type}, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);

        cb(data);
    });
}

/**
 * 支付
 */
UniversalController.payment = function (product) {
    pomelo.notify(route.sendPaymentResult, {productId: product.name, product: product});
}

/**
 * 苹果IAP支付
 */
UniversalController.initIAP = function () {
    if (cc.sys.os == cc.sys.OS_IOS) {
        sdkbox.IAP.init();
        sdkbox.IAP.enableUserSideVerification(true);
        //TODO: 上线时候设为false
        sdkbox.IAP.setDebug(true);
        sdkbox.IAP.setListener({
            onSuccess: function (product) {
                //Purchase success
                cc.log("Purchase successful: " + product.name)
                UniversalController.payment(product);

            },
            onFailure: function (product, msg) {
                //Purchase failed
                //msg is the error message
                cc.log("Purchase failed: " + product.name + " error: " + msg);
            },
            onCanceled: function (product) {
                //Purchase was canceled by user
                cc.log("Purchase canceled: " + product.name);
            },
            onRestored: function (product) {
                //Purchase restored
                cc.log("Restored: " + product.name);
            },
            onProductRequestSuccess: function (products) {
                //self.menuIAP.removeAllChildren();
                //Returns you the data for all the iap products
                //You can get each item using following method
                for (var i = 0; i < products.length; i++) {
                    cc.log("================");
                    cc.log("name: " + products[i].name);
                    cc.log("price: " + products[i].price);
                    cc.log("================");
                }
            },
            onProductRequestFailure: function (msg) {
                //When product refresh request fails.
                cc.log("Failed to get products");
            }
        });
    }
}

/**
 * 获取最新版本信息
 */
UniversalController.getTopOfAppReleaseRecord = function () {
    pomelo.notify(route.getTopOfAppReleaseRecord, {});
}

UniversalController.sendBindingSMS = function (mobile, cb) {
    var loadingBar = new LoadingLayer({msg: '发送中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);
    pomelo.request(route.sendBindingSMS, {mobile: mobile}, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
        cb(data);
    });
}

UniversalController.bindingMobile = function (data, cb) {
    var loadingBar = new LoadingLayer({msg: '加载中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);
    pomelo.request(route.bindingMobile, {
        mobile: data.mobile,
        password: data.password,
        captcha: data.captcha
    }, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
        if (data.code == RETURN_CODE.OK) {
            Storage.set(CommonConf.LOCAL_STORAGE.TOKEN, data.token);
        }
        cb(data);
    });
}