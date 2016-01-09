var route = {
    enterLobby: 'connector.entryHandler.enterLobby',    //进入大厅
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



    requestCharges: 'game.gameHandle.requestCharges',   //请求创建ping++的支付charge
    sendPaymentResult: 'game.gameHandle.sendPaymentResult', //发送支付结果, for IAP
}