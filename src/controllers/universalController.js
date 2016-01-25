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

UniversalController.updateProfile = function (nickName, gender, avatar) {

    if (nickName.length < 2 || nickName.length > 6) {
        prompt.fadeMiddle('修改失败, 昵称2-6位', 3);
        return;
    }

    pomelo.request(route.updateProfile, {nickName: nickName, gender: gender, avatar: avatar}, function (data) {
        if (data.code == 200) {
            gPlayer.nickName = nickName;
            gPlayer.gender = gender;
            gPlayer.avatar = avatar;

            prompt.fadeMiddle('修改成功');

            //var alert = new AlertBox("修改成功", null, null);
        } else if (data.code == 500) {

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
    pomelo.request(route.getShopList, {device: 'ios'}, function (data) {
        cb(data);
    });
}

/**
 * 获取排行榜列表
 * @param type
 * @param cb
 */
UniversalController.getRankingList = function (type, cb) {
    pomelo.request(route.getRankingList, {type: 1}, function (data) {
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
    pomelo.request(route.getTopOfAppReleaseRecord, {}, function (data) {
        cb(data);
    });
}