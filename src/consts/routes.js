var route = {
    queryEntry: 'gate.gateHandler.queryEntry',    //search gate server
    enter: 'connector.entryHandler.enter',    //进入游戏
    enterIndex: 'connector.entryHandler.enterIndex',    //进入index
    enterLobby: 'connector.entryHandler.enterLobby',    //进入lobby


    join: 'game.gameHandler.join',  //加入游戏
    leave: 'game.gameHandler.leave',    //离开游戏
    ready: 'game.gameHandler.ready',    //准备
    talk: 'game.gameHandler.talk',  //说话
    fan: 'game.gameHandler.fan',    //出牌
    trusteeship: 'game.gameHandler.trusteeship',    //托管
    cancelTrusteeship: 'game.gameHandler.cancelTrusteeship',    //取消托管

    chat: 'game.gameHandler.chat',  //房间内聊天
    getCheckInGrant: 'game.gameHandler.getCheckInGrant',    //签到
    getBankruptcyGrant: 'game.gameHandler.getBankruptcyGrant',  //领取破产补助
    getDailyTaskList: 'game.gameHandler.getDailyTaskList',  //获取每日任务列表
    getForeverTaskList: 'game.gameHandler.getForeverTaskList',  //获取成长任务列表
    getTaskGrant: 'game.gameHandler.getTaskGrant',  //领取任务奖励
    getShopList: 'game.gameHandler.getShopList',    //获取商城列表

    updateProfile: 'game.gameHandler.updateProfile',    //更新个人信息
    getMyItemList: 'game.gameHandler.getMyItemList',    //获取我的背包物品

    getExchangeList: 'game.gameHandler.getExchangeList',    //获取兑换列表
    exchange: 'game.gameHandler.exchange',  //兑换

    getRankingList: 'game.gameHandler.getRankingList',  //获取排行榜

    requestCharges: 'game.gameHandle.requestCharges',   //请求创建ping++的支付charge
    sendPaymentResult: 'game.gameHandle.sendPaymentResult', //发送支付结果, for IAP

    getTopOfAppReleaseRecord: 'game.gameHandle.getTopOfAppReleaseRecord'    //获取最新发布的版本及信息
}