var route = {
    ping: 'connector.entryHandler.ping',    //ping

    queryEntry: 'gate.gateHandler.queryEntry',    //search gate server
    enter: 'connector.entryHandler.enter',    //进入游戏
    enterIndex: 'connector.entryHandler.enterIndex',    //进入index
    enterLobby: 'connector.entryHandler.enterLobby',    //进入lobby

    enterIndex_v_1_3: 'connector.entryHandler.enterIndex_v_1_3',    //进入index_v_1_3
    enterLobby_v_1_3: 'connector.entryHandler.enterLobby_v_1_3',    //进入lobby_v_1_3

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
    giveUp: 'game.gameHandler.giveUp',    //认输

    createPrivateGame: 'game.gameHandler.createPrivateGame',    //创建私人房
    listPrivateGame: 'game.gameHandler.listPrivateGame',    //私人房列表
    joinPrivateGame: 'game.gameHandler.joinPrivateGame',    //加入私人房

    chat: 'chat.chatHandler.send',  //房间内聊天&小喇叭

    getProfileByUid: 'connector.universalHandler.getProfileByUid',    //根据uid获取玩家信息

    //日常相关
    getDailyTodoInfo: 'connector.universalHandler.getDailyTodoInfo',  //获取每日必做信息
    getCheckInGrant: 'connector.universalHandler.getCheckInGrant',    //签到
    getBankruptcyGrant: 'connector.universalHandler.getBankruptcyGrant',  //领取破产补助
    getDailyTaskList: 'connector.universalHandler.getDailyTaskList',  //获取每日任务列表
    getForeverTaskList: 'connector.universalHandler.getForeverTaskList',  //获取成长任务列表
    getTaskGrant: 'connector.universalHandler.getTaskGrant',  //领取任务奖励

    getTopOfAppReleaseRecord: 'connector.universalHandler.getTopOfAppReleaseRecord',    //获取最新发布的版本及信息 - 用户手工在设置中请求
    getLastApp: 'connector.universalHandler.getLastApp',    //获取最新发布的版本及信息 - 每日首次登陆进入大厅自动请求;
    getSystemMessage: 'connector.universalHandler.getSystemMessage',    //获取最新系统消息
    getLastSystemMessageDate: 'connector.universalHandler.getLastSystemMessageDate',    //获取最新一条系统消息的时间
    getRankingList: 'connector.universalHandler.getRankingList',  //获取排行榜
    getShopList: 'connector.universalHandler.getShopList',    //获取商城列表


    //个人信息相关
    updateProfile: 'connector.universalHandler.updateProfile',    //更新个人信息
    getProfile: 'connector.universalHandler.getProfile',    //获取个人信息
    getMyItemList: 'connector.universalHandler.getMyItemList',    //获取我的背包物品

    //兑换相关
    getExchangeList: 'connector.universalHandler.getExchangeList',    //获取兑换列表
    getExchangeListNew: 'connector.universalHandler.getExchangeListNew',    //获取兑换列表-新版!
    getMyExchangeRecordList: 'connector.universalHandler.getMyExchangeRecordList',    //获取兑换列表
    exchange: 'connector.universalHandler.exchange',  //兑换

    //支付相关
    requestPaymentByPingpp: 'connector.universalHandler.requestPaymentByPingpp',   //请求创建ping++的支付charge
    sendPaymentResult: 'connector.universalHandler.sendPaymentResult', //发送支付结果, for IAP
    payment4PingppFromClient: 'connector.universalHandler.payment4PingppFromClient', //发送支付失败结果, for pingpp



    sendBindingSMS: 'connector.universalHandler.sendBindingSMS',    //
    bindingMobile: 'connector.universalHandler.bindingMobile',    //

    getInviteRecordListByUid: 'connector.universalHandler.getInviteRecordListByUid',

    isLatestActivityGodMonth: 'connector.universalHandler.isLatestActivityGodMonth',
    getLatestActivityGodMonth: 'connector.universalHandler.getLatestActivityGodMonth',


    //-----------------------
    //HTTP Routes...
    //-----------------------
    sendResetPasswordSMS: 'api/game/sendResetPasswordSMS',    //
    resetPassword: 'api/game/resetPassword',    //
    getQiniuToken: 'api/game/getQiniuToken',    //
    updateAvatar: 'api/game/updateAvatar',


}