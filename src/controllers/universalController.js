var pomelo = window.pomelo;

var UniversalController = function () {

}

UniversalController.enterIndex = function () {

    pomelo.request(route.enterIndex_v_1_3, {}, function (lobbyData) {

        var indexScene = new IndexScene(lobbyData.onlineLobby);
        //cc.director.runScene(new cc.TransitionFade(1.2, indexScene));
        cc.director.runScene(indexScene);
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

UniversalController.updateProfile = function (nickName, gender, summary) {

    if (nickName.length < 2 || nickName.length > 6) {
        prompt.fadeMiddle('修改失败, 昵称2-6位', 3);
        return;
    }

    if (summary.length > 10) {
        prompt.fadeMiddle('修改失败, 简介不能超10位', 3);
        return;
    }

    pomelo.request(route.updateProfile, {
        nickName: nickName,
        gender: gender,
        summary: summary
    }, function (data) {
        if (data.code == RETURN_CODE.OK) {
            gPlayer.nickName = data.nickName;
            gPlayer.gender = gender;
            gPlayer.summary = data.summary;

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
    pomelo.request(route.getExchangeListNew, {os: cc.sys.os == cc.sys.OS_IOS ? 'ios' : 'android'}, function (data) {
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
 * @param type 商城类型: 金币,道具,VIP
 * @param cb
 */
UniversalController.getShopList = function (type, cb) {
    var loadingBar = new LoadingLayer({msg: '加载中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);

    var device = gOS;
    pomelo.request(route.getShopList, {device: device, type: type}, function (data) {
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

////////////////////////////////
// 支付相关
////////////////////////////////

/**
 * 发送IAP支付结果
 */
UniversalController.payment = function (product) {
    //以HTTP方式发送IAP支付结果
    GameHttp.post({
        action: 'api/game/payment4AppleIAP',
        args: {productId: product.name, product: product, uid: gPlayer.uid},
        onSuccess: function (result) {
            //如果成功则不处理(客户端交互由服务端发送event)
            if (result.code == 200) {
                return;
            }
            //如果是500
            //如果是其他异常, 如HTTP或者..., 则存储在客户端, 再下次进入app时候再次发送.以免漏单
            //Note: 客户端不存了,直接提示联系客服!
            //var receipt = {
            //    product: product,
            //    retry: 0
            //}
            //Storage.set(CommonConf.LOCAL_STORAGE.RECEIPT, receipt)
            var box = new AlertBox("充值失败,请联系客服", function () {
            }, this);

            cc.director.getRunningScene().addChild(box, 999);
        },
        onError: function (result) {
            //如果是400, 缺参数, 则不处理
            //if (result.code == 400) {
            //    return;
            //}
            //如果是500, 如果是其他异常, 如HTTP或者..., 则存储在客户端, 再下次进入app时候再次发送.以免漏单
            if (result.code == 500) {
                //Note: 不存了,直接提示联系客服!
                //var receipt = {
                //    product: product,
                //    retry: 0
                //}
                //Storage.set(CommonConf.LOCAL_STORAGE.RECEIPT, receipt)
                var box = new AlertBox("充值失败,请联系客服", function () {
                }, this);

                cc.director.getRunningScene().addChild(box, 999);
            }
        }
    });

    // 废弃, 改用HTTP方式
    //pomelo.notify(route.sendPaymentResult, {productId: product.name, product: product});
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

                //for (var i = 0; i < products.length; i++) {
                //    cc.log("================");
                //    cc.log("name: " + products[i].name);
                //    cc.log("price: " + products[i].price);
                //    cc.log("================");
                //}
            },
            onProductRequestFailure: function (msg) {
                //When product refresh request fails.
                cc.log("Failed to get products");
            }
        });
    }
}

/**
 * 请求创建pingpp支付charge
 * @param channel
 * @param productId
 * @param device
 * @param cb
 */
UniversalController.requestPaymentByPingpp = function (channel, productId, device, cb) {
    pomelo.request(route.requestPaymentByPingpp, {channel: channel, productId: productId, device: gOS}, cb);
}

/**
 * 当客户端支付失败或取消支付时, 向服务器上报
 * @param state: success, fail, cancel, invalid
 * @param cb
 */
UniversalController.payment4PingppFromClient = function (state, cb) {
    //console.log('universal.ppp - ', state);
    pomelo.request(route.payment4PingppFromClient, {state: state}, cb);
}



/**
 * 获取最新版本信息 - 用户手工在设置中请求
 */
UniversalController.getTopOfAppReleaseRecord = function () {
    cc.loader.loadJson("res/game_config.json", function (err, config) {
        pomelo.notify(route.getTopOfAppReleaseRecord, {version: config.version});
    });

}

/**
 * 获取最新版本信息 - 每日首次登陆进入大厅自动请求;(与上一个区别是: 如果是最新版本, 后端就不会向客户端发送消息)
 */
UniversalController.getLastApp = function () {
    cc.loader.loadJson("res/game_config.json", function (err, config) {
        pomelo.notify(route.getLastApp, {version: config.version});
    });

}

UniversalController.getSystemMessage = function (cb) {
    var loadingBar = new LoadingLayer({msg: '加载中'});
    cc.director.getRunningScene().addChild(loadingBar, 100);
    pomelo.request(route.getSystemMessage, {}, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
        cb(data);
    });
}


UniversalController.getLastSystemMessageDate = function (cb) {
    pomelo.request(route.getLastSystemMessageDate, {}, function (data) {
        cb(data);
    });
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
    pomelo.request(route.bindingMobile, data, function (data) {
        if (cc.sys.isObjectValid(loadingBar)) loadingBar.removeFromParent(true);
        if (data.code == RETURN_CODE.OK) {
            Storage.set(CommonConf.LOCAL_STORAGE.TOKEN, data.token);
        }
        cb(data);
    });
}

UniversalController.sendResetPasswordSMS = function (mobile, cb) {
    GameHttp.post({action: route.sendResetPasswordSMS, args: {mobile: mobile}, onSuccess: function (data) {
        cb(data);
    }});
}

UniversalController.resetPassword = function (data, cb) {
    GameHttp.post({action: route.resetPassword, args: {
        mobile: data.mobile,
        password: data.password,
        captcha: data.captcha
    }, onSuccess: function (data) {
        cb(data);
    }});
}



UniversalController.updateAvatar = function (data) {

    GameHttp.post({action: route.updateAvatar, args: {
        uid: gPlayer.uid,
        avatar: data.avatar
    }, onSuccess: function (uploadAvatarResult) {
        if (uploadAvatarResult.code != 200) {
            prompt.fadeMiddle('头像修改失败, 请重试');
            return;
        }
        gPlayer.avatar = data.avatar;
        EventBus.publish(gameEvents.CLIENT_UPDATE_AVATAR, data);
    }, onError: function (uploadAvatarResult) {
            prompt.fadeMiddle('头像修改失败, 请重试');
            return;
    }});

}


UniversalController.getInviteRecordListByUid = function (cb) {
    pomelo.request(route.getInviteRecordListByUid, {}, function (data) {
        cb(data);
    });
}

UniversalController.isLatestActivityGodMonth = function (cb) {
    var lastActivityGodMonth = Storage.set(CommonConf.LOCAL_STORAGE.ACTIVITY_GOD_MONTH);
    if (!lastActivityGodMonth) return cb({isLatest: false});

    lastActivityGodMonth = JSON.parse(lastActivityGodMonth);

    pomelo.request(route.isLatestActivityGodMonth, {updatedAt: lastActivityGodMonth.updatedAt}, function (data) {
        cb(data);
    });
}

UniversalController.getLatestActivityGodMonth = function (cb) {
    pomelo.request(route.getLatestActivityGodMonth, {}, function (data) {
        if (!data) {
            cb(null);
            return;
        }
        Storage.set(CommonConf.LOCAL_STORAGE.ACTIVITY_GOD_MONTH, JSON.stringify(data));
        cb(data);
    });
}

UniversalController.getLotteryItemList = function (cb) {
    pomelo.request(route.getLotteryItemList, {}, function (data) {
        cb(data);
    });
}

UniversalController.getLotteryCard = function (cb) {
    pomelo.request(route.getLotteryCard, {}, function (data) {
        cb(data);
    });
}

UniversalController.lottery = function (cb) {
    pomelo.request(route.lottery, {}, function (data) {
        cb(data);
    });
}

UniversalController.getAppleStoreApproveState = function (cb) {
    pomelo.request(route.getAppleStoreApproveState, {}, function (data) {
        cb(data);
    });
}

UniversalController.getUserBattleRecordAnalysis = function (cb) {
    pomelo.request(route.getUserBattleRecordAnalysis, {}, function (data) {
        cb(data);
    });
}
