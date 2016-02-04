var route = {
    queryEntry: 'gate.gateHandler.queryEntry',    //search gate server
    enter: 'connector.entryHandler.enter',    //进入游戏
    enterIndex: 'connector.entryHandler.enterIndex',    //进入index
    enterLobby: 'connector.entryHandler.enterLobby',    //进入lobby

    //////////
    //牌局相关
    //////////
    join: 'game.gameHandler.join',  //加入游戏
    leave: 'game.gameHandler.leave',    //离开游戏
    ready: 'game.gameHandler.ready',    //准备
    talk: 'game.gameHandler.talk',  //说话
    fan: 'game.gameHandler.fan',    //出牌
    trusteeship: 'game.gameHandler.trusteeship',    //托管
    cancelTrusteeship: 'game.gameHandler.cancelTrusteeship',    //取消托管

    chat: 'game.gameHandler.chat',  //房间内聊天


    //
    getDailyTodoInfo: 'connector.universalHandler.getDailyTodoInfo',  //获取每日必做信息
    getCheckInGrant: 'connector.universalHandler.getCheckInGrant',    //签到
    getBankruptcyGrant: 'connector.universalHandler.getBankruptcyGrant',  //领取破产补助
    getDailyTaskList: 'connector.universalHandler.getDailyTaskList',  //获取每日任务列表
    getForeverTaskList: 'connector.universalHandler.getForeverTaskList',  //获取成长任务列表
    getTaskGrant: 'connector.universalHandler.getTaskGrant',  //领取任务奖励
    getShopList: 'connector.universalHandler.getShopList',    //获取商城列表

    updateProfile: 'connector.universalHandler.updateProfile',    //更新个人信息
    getProfile: 'connector.universalHandler.getProfile',    //更新个人信息
    getMyItemList: 'connector.universalHandler.getMyItemList',    //获取我的背包物品

    getExchangeList: 'connector.universalHandler.getExchangeList',    //获取兑换列表
    getMyExchangeRecordList: 'connector.universalHandler.getMyExchangeRecordList',    //获取兑换列表
    exchange: 'connector.universalHandler.exchange',  //兑换

    getRankingList: 'connector.universalHandler.getRankingList',  //获取排行榜

    requestCharges: 'connector.universalHandler.requestCharges',   //请求创建ping++的支付charge
    sendPaymentResult: 'connector.universalHandler.sendPaymentResult', //发送支付结果, for IAP

    getTopOfAppReleaseRecord: 'connector.universalHandler.getTopOfAppReleaseRecord',    //获取最新发布的版本及信息

    sendBindingSMS: 'connector.universalHandler.sendBindingSMS',    //
    bindingMobile: 'connector.universalHandler.bindingMobile'    //
}