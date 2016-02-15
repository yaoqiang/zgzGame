var pomelo = window.pomelo;

var UniversalController = function()
{

}

UniversalController.enterIndex = function () {
    pomelo.request(route.enterIndex, {}, function (lobbyData) {
        var indexScene = new IndexScene(lobbyData.onlineLobby);
        cc.director.runScene(new cc.TransitionFade(1.2, indexScene));
    });
}

UniversalController.getProfile = function (uid, cb) {
    pomelo.request(route.getProfile, {uid: uid}, function (data) {
        console.log(data);
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

    pomelo.request(route.updateProfile, {nickName: nickName, gender: gender, avatar: avatar, summary: summary}, function (data) {
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
    pomelo.request(route.getDailyTodoInfo, {}, function (data) {
        cb(data);
    });
}

/**
 * 签到
 * @param cb
 */
UniversalController.getCheckInGrant = function (cb) {
    pomelo.request(route.getCheckInGrant, {}, function (data) {
        cb(data);
    });
}

/**
 * 领取破产补助
 * @param cb
 */
UniversalController.getBankruptcyGrant = function (cb) {
    pomelo.request(route.getBankruptcyGrant, {}, function (data) {
        cb(data);
    });
}

/**
 * 获取每日任务列表
 * @param cb
 */
UniversalController.getDailyTaskList = function (cb) {
    pomelo.request(route.getDailyTaskList, {}, function (data) {
        cb(data);
    });
}

/**
 * 获取成长任务列表
 * @param cb
 */
UniversalController.getForeverTaskList = function (cb) {
    pomelo.request(route.getForeverTaskList, {}, function (data) {
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
    pomelo.request(route.getTaskGrant, {taskId: taskId}, function (data) {
        cb(data);
    });
}

/**
 * 获取兑换列表
 * @param cb
 */
UniversalController.getExchangeList = function (cb) {
    pomelo.request(route.getExchangeList, {}, function (data) {
        cb(data);
    });
}

/**
 * 获取我的兑换记录
 * @param cb
 */
UniversalController.getMyExchangeRecordList = function (cb) {
    pomelo.request(route.getMyExchangeRecordList, {}, function (data) {
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
    pomelo.request(route.exchange, {exchangeId: exchangeId, mobile: mobile, count: count, contact: contact, address: address}, function (data) {
        cb(data);
    });
}

/**
 * 获取商城列表
 * @param cb
 */
UniversalController.getShopList = function (cb) {
    var device = cc.sys.os == cc.sys.OS_IOS ? 'ios' : 'android';
    pomelo.request(route.getShopList, {device: device}, function (data) {
        cb(data);
    });
}

/**
 * 获取排行榜列表
 * @param type
 * @param cb
 */
UniversalController.getRankingList = function (data, cb) {
    pomelo.request(route.getRankingList, {type: data.type}, function (data) {
        cb(data);
    });
}

/**
 * 支付
 */
UniversalController.payment = function () {
    
}

/**
 * 获取最新版本信息
 */
UniversalController.getTopOfAppReleaseRecord = function () {
    pomelo.notify(route.getTopOfAppReleaseRecord, {});
}

UniversalController.sendBindingSMS = function (mobile, cb) {
    pomelo.request(route.sendBindingSMS, {mobile: mobile}, function (data) {
        cb(data);
    });
}

UniversalController.bindingMobile = function (data, cb) {
    pomelo.request(route.bindingMobile, {mobile: data.mobile, password: data.password, captcha: data.captcha}, function (data) {
        cb(data);
    });
}