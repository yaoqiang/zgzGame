var BalanceLayer = function (data, opt) {
    var winSize = cc.director.getWinSize();
    var sg = new MaskLayer(true);

    var resultTxt = "";
    if (data.game && data.game.result == GAME.RESULT.RED_WIN) {
        resultTxt = "红3胜"
    }
    else if (data.game && data.game.result == GAME.RESULT.BLACK_WIN) {
        resultTxt = "股子胜"
    }
    else {
        resultTxt = "白干"
    }

    //胜负结果
    var resultLabel = new cc.LabelTTF(resultTxt, "Arial", 34);
    resultLabel.color = cc.color.YELLOW;
    resultLabel.setPosition(winSize.width/2-30, winSize.height/2 + 170);
    sg.addChild(resultLabel);

    var shareLabel = new cc.LabelTTF(data.game.share + "股", "Arial", 24);
    shareLabel.color = cc.color.YELLOW;
    shareLabel.setPosition(winSize.width/2 + 100, winSize.height/2 + 170);
    sg.addChild(shareLabel);


    var y = winSize.height / 2 + 100;
    //明细
    for (var i in data.details) {
        var x = 200;
        //玩家头像
        var actorAvatar = new cc.Sprite(utils.getAvatar(data.details[i].actorAvatar));
        actorAvatar.setPosition(x, y);
        actorAvatar.scale = 0.5;
        sg.addChild(actorAvatar)

        x += 50;

        //玩家昵称
        var nameLabel = new cc.LabelTTF(data.details[i].actorName, "Arial", 18);
        nameLabel.setAnchorPoint(0, 0.5)
        nameLabel.setPosition(x, y);
        sg.addChild(nameLabel);

        x += 160;

        if (_.contains(data.details[i].actualIdentity, GAME.ACTUAL_IDENTITY.GUZI)) {
            var guziLabel = new cc.LabelTTF("股子", "Arial", 18);
            guziLabel.setPosition(x, y);
            guziLabel.setAnchorPoint(0, 0.5);
            sg.addChild(guziLabel);
        }
        else {
            var idX = 0;
            _.map(data.details[i].actualIdentity, function(v){
                var cardFace = ""
                if (v == GAME.ACTUAL_IDENTITY.Heart3) {
                    cardFace = "#Card_hearts_red_1.png"
                }
                else if (v == GAME.ACTUAL_IDENTITY.Diamond3) {
                    cardFace = "#Card_Square-piece_red_1.png"
                }
                else {
                    cardFace = "#Card_hearts_black_1.png"
                }
                var actorIdentity = new cc.Sprite(cardFace)
                actorIdentity.scale = 0.25
                actorIdentity.setPosition(x + idX, y)
                actorIdentity.setAnchorPoint(0, 0.5);
                sg.addChild(actorIdentity)
                idX += 22;

            });
        }


        x += 100;

        //胜负
        var actorResult = "", symbol = "";
        if (data.details[i].result == GAME.ACTOR_RESULT.WIN) {
            actorResult = "胜利";
            symbol = "+"
        }
        else if (data.details[i].result == GAME.ACTOR_RESULT.LOSE) {
            actorResult = "失败";
            symbol = "-"
        }
        else {
            actorResult = "白干";
        }
        var actorResultLabel = new cc.LabelTTF(actorResult, "Arial", 16);
        actorResultLabel.setPosition(x, y);
        sg.addChild(actorResultLabel);

        x += 70;

        var goldLabel = new cc.LabelTTF(symbol + data.details[i].gold, "Arial", 16);
        goldLabel.setPosition(x, y);
        sg.addChild(goldLabel);

        x += 70;

        var rankLabel = new cc.LabelTTF(data.details[i].rank, "Arial", 16);
        rankLabel.setPosition(x, y);
        sg.addChild(rankLabel);

        y -= 50;
    }

    y -= 110;

    var sReady = new cc.MenuItemSprite(
        new cc.Sprite("#common_btn_lv.png"),
        new cc.Sprite("#common_btn_lv.png"),
        opt.ready,
        this
    );

    var readyLabel = new cc.LabelTTF('准备', "Arial", 26);
    readyLabel.setPosition(sReady.getContentSize().width / 2, sReady.getContentSize().height / 2);
    sReady.addChild(readyLabel);

    var readyMenu = new cc.Menu(sReady);
    readyMenu.setPosition(winSize.width / 2 - 250, y);
    readyMenu.scale = 0.6
    sg.addChild(readyMenu);

    var sLeave = new cc.MenuItemSprite(
        new cc.Sprite("#common_btn_lv.png"),
        new cc.Sprite("#common_btn_lv.png"),
        opt.leave,
        this
    );

    var leaveLabel = new cc.LabelTTF('大厅', "Arial", 26);
    leaveLabel.setPosition(sLeave.getContentSize().width / 2, sLeave.getContentSize().height / 2);
    sLeave.addChild(leaveLabel);

    var leaveMenu = new cc.Menu(sLeave);
    leaveMenu.setPosition(winSize.width / 2 - 80, y);
    leaveMenu.scale = 0.6
    sg.addChild(leaveMenu);

    return sg;
}
