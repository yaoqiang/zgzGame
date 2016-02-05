var RankingListScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.scheduleOnce(this.updateTime, 0.5);
    },

    ctor: function (args) {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.rank_plist);

        this.selected = 100;

        //background
        var winSize = cc.director.getWinSize();
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width / 2, winSize.height / 2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        this.tabLayer = new RankingListTabLayer({lobbyId: args.lobbyId, callback: this.onTabChange, target: this});
        this.addChild(this.tabLayer, 9);
        this.layer = null;

        this.lobbyId = args.lobbyId;

        //add a keyboard event listener to statusLabel
        this.keyboardListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
            },
            onKeyReleased: function(keyCode, event){
                var target = event.getCurrentTarget();
                if (keyCode == cc.KEY.back) {
                    playEffect(audio_common.Button_Click);
                    if (target.lobbyId != undefined) {
                        GameController.enterLobby(target.lobbyId);
                    }
                    else {
                        UniversalController.enterIndex();
                    }
                }

            }
        }, this);

    },

    onExit: function () {
        this._super();
        cc.eventManager.removeListener(this.keyboardListener);
    },

    updateTime: function () {
        this.onTabChange(0);

    },

    onTabChange: function (index) {

        var self = this;
        if (this.selected == index) return;

        if (this.layer) {
            this.layer.removeFromParent(true);
            this.layer = null;
        }
        playEffect(audio_common.Button_Click);
        if (index == 0) {

            UniversalController.getRankingList({type: CommonConf.RANKING_LIST.RICH}, function (data) {
                console.log('RICH = ', data);
                var layer = new RichRankingListLayer(data);
                self.addChild(layer);
                self.layer = layer;
            })
        }

        if (index == 1) {
            UniversalController.getRankingList({type: CommonConf.RANKING_LIST.GOD}, function (data) {
                console.log('GOD - ', data);
                var layer = new GodRankingListLayer(data);
                self.addChild(layer);
                self.layer = layer;
            })
        }

        if (index == 2) {
            UniversalController.getRankingList({type: CommonConf.RANKING_LIST.RECHARGE}, function (data) {
                console.log('RECHARGE - ', data);
                var layer = new RechargeRankingListLayer(data);
                self.addChild(layer);
                self.layer = layer;
            })
        }

        this.selected = index;
    }

});

var CustomTableViewCell = cc.TableViewCell.extend({
    draw: function (ctx) {
        this._super(ctx);
    }
});

var RichRankingListLayer = cc.Layer.extend({
    sprite: null,
    ctor: function (args) {
        this._super();
        this.data = args;

        var winSize = cc.director.getWinSize();
        var visibleOrigin = cc.director.getVisibleOrigin();
        var visibleSize = cc.director.getVisibleSize();


//
        var iconImage = "#rank_top_rank1.png";
        var icon = new cc.Sprite(iconImage);
        icon.scale = 0.8;
        var iconSize = icon.getBoundingBox();

        var rankingList = args.rankingList;
        var cellH = iconSize.height + 10;
        var tabH = 60;
//init data
        this.m_pTableView = null;
        this.m_nTableWidth = visibleSize.width;
        this.m_nTableHeight = (cellH * rankingList.length > (visibleSize.height - tabH)) ? (visibleSize.height - tabH) : (cellH * rankingList.length);
        this.m_nCellWidth = visibleSize.width;
        this.m_nCelleHeight = cellH;
        this.m_nTableX = visibleOrigin.x;
        this.m_nTableY = visibleOrigin.y + visibleSize.height - tabH - this.m_nTableHeight;
        this.m_nCelleNum = rankingList.length;

        this.init();

    },
    init: function () {
        this.m_pTableView = new cc.TableView(this, cc.size(this.m_nTableWidth, this.m_nTableHeight));
        this.m_pTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_pTableView.x = this.m_nTableX;
        this.m_pTableView.y = this.m_nTableY;
        this.m_pTableView.setDelegate(this);
        this.m_pTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this.m_pTableView);
        this.m_pTableView.reloadData();
    },

    scrollViewDidScroll: function (view) {
        //c.log("----->scrollViewDidScroll ");
    },
    scrollViewDidZoom: function (view) {
        //cc.log("----->scrollViewDidZoom ");
    },

    tableCellTouched: function (table, cell) {
        //cc.log("cell touched at index: " + cell.getIdx());
    },

    tableCellSizeForIndex: function (table, idx) {
        return cc.size(this.m_nCellWidth, this.m_nCelleHeight);
    },

    tableCellAtIndex: function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        if (!cell) {
            cell = new CustomTableViewCell();
        }
        cell.removeAllChildren(true);
        var rankingList = this.data.rankingList;
        var oneRanking = rankingList[idx];

        var xx = 15;
//bg
        var bg = new cc.Scale9Sprite("bg_cell.png", cc.rect(70, 10, 10, 10));
        bg.width = this.m_nCellWidth;
        bg.height = this.m_nCelleHeight;
        bg.setPosition(this.m_nCellWidth / 2, this.m_nCelleHeight / 2);
        cell.addChild(bg);
        //图标
        var rankingImageString = "#rank_paimingkuang.png";

        if (idx == 0) {
            rankingImageString = "#rank_top_rank1.png";
        } else if (idx == 1) {
            rankingImageString = "#rank_top_rank2.png";
        } else if (idx == 2) {
            rankingImageString = "#rank_top_rank3.png";
        }
        var icon = new cc.Sprite(rankingImageString);
        icon.setPosition(xx, this.m_nCelleHeight / 2);
        icon.setAnchorPoint(0, 0.5);
        icon.scale = idx < 3 ? ZGZ.SCALE * 0.7 : 1.1;
        cell.addChild(icon);

        if (idx > 2) {
            var rankValue = new cc.LabelTTF(idx + 1, "Arial", 26);
            rankValue.setPosition(icon.width/2, icon.height/2)
            icon.addChild(rankValue);
        }

        xx = xx + 150;

        //
        var avatarSprite = new cc.Sprite(utils.getAvatar(oneRanking.avatar));
        avatarSprite.setPosition(xx, this.m_nCelleHeight / 2);
        avatarSprite.scale = 0.7
        cell.addChild(avatarSprite);

        var avatarSize = avatarSprite.getBoundingBox();
        xx = xx + avatarSize.width + 15;
        //玩家昵称
        var nickName = oneRanking.nickName;
        var nickNameLabel = new cc.LabelTTF(nickName, "Arial", 24);
        nickNameLabel.color = cc.color.WHITE;
        nickNameLabel.setAnchorPoint(0, 0);
        nickNameLabel.setPosition(xx, this.m_nCelleHeight / 2 + 4);
        cell.addChild(nickNameLabel);

        //
        var goldIcon = new cc.Sprite("#common_icon_coins_1.png");
        goldIcon.setPosition(xx, this.m_nCelleHeight / 2 - 30);
        goldIcon.scale = 0.4;
        goldIcon.setAnchorPoint(0, 0);
        cell.addChild(goldIcon);

        //玩家金币
        var goldValue = oneRanking.gold;
        var goldLabel = new cc.LabelTTF(zgzNumeral(goldValue).format('0,0'), "Arial", 22);
        goldLabel.color = cc.color.YELLOW;
        goldLabel.setAnchorPoint(0, 0);
        goldLabel.setPosition(xx + 30, this.m_nCelleHeight / 2 - 30);
        cell.addChild(goldLabel);

        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return this.m_nCelleNum;
    },
    onCallBack: function (sender) {

    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }
});


////////////////////
// 股神榜
//////////////////////
var GodRankingListLayer = cc.Layer.extend({
    sprite: null,
    ctor: function (args) {
        this._super();
        this.data = args;

        var winSize = cc.director.getWinSize();
        var visibleOrigin = cc.director.getVisibleOrigin();
        var visibleSize = cc.director.getVisibleSize();


//
        var iconImage = "#rank_top_rank1.png";
        var icon = new cc.Sprite(iconImage);
        icon.scale = 0.8;
        var iconSize = icon.getBoundingBox();

        var rankingList = args.rankingList;
        var cellH = iconSize.height + 10;
        var tabH = 60;
//init data
        this.m_pTableView = null;
        this.m_nTableWidth = visibleSize.width;
        this.m_nTableHeight = (cellH * rankingList.length > (visibleSize.height - tabH)) ? (visibleSize.height - tabH) : (cellH * rankingList.length);
        this.m_nCellWidth = visibleSize.width;
        this.m_nCelleHeight = cellH;
        this.m_nTableX = visibleOrigin.x;
        this.m_nTableY = visibleOrigin.y + visibleSize.height - tabH - this.m_nTableHeight;
        this.m_nCelleNum = rankingList.length;

        this.init();

    },
    init: function () {
        this.m_pTableView = new cc.TableView(this, cc.size(this.m_nTableWidth, this.m_nTableHeight));
        this.m_pTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_pTableView.x = this.m_nTableX;
        this.m_pTableView.y = this.m_nTableY;
        this.m_pTableView.setDelegate(this);
        this.m_pTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this.m_pTableView);
        this.m_pTableView.reloadData();
    },

    scrollViewDidScroll: function (view) {
        //c.log("----->scrollViewDidScroll ");
    },
    scrollViewDidZoom: function (view) {
        //cc.log("----->scrollViewDidZoom ");
    },

    tableCellTouched: function (table, cell) {
        //cc.log("cell touched at index: " + cell.getIdx());
    },

    tableCellSizeForIndex: function (table, idx) {
        return cc.size(this.m_nCellWidth, this.m_nCelleHeight);
    },

    tableCellAtIndex: function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        if (!cell) {
            cell = new CustomTableViewCell();
        }
        cell.removeAllChildren(true);
        var rankingList = this.data.rankingList;
        var oneRanking = rankingList[idx];

        var xx = 15;
//bg
        var bg = new cc.Scale9Sprite("bg_cell.png", cc.rect(70, 10, 10, 10));
        bg.width = this.m_nCellWidth;
        bg.height = this.m_nCelleHeight;
        bg.setPosition(this.m_nCellWidth / 2, this.m_nCelleHeight / 2);
        cell.addChild(bg);
        //图标
        var rankingImageString = "#rank_paimingkuang.png";

        if (idx == 0) {
            rankingImageString = "#rank_top_rank1.png";
        } else if (idx == 1) {
            rankingImageString = "#rank_top_rank2.png";
        } else if (idx == 2) {
            rankingImageString = "#rank_top_rank3.png";
        }
        var icon = new cc.Sprite(rankingImageString);
        icon.setPosition(xx, this.m_nCelleHeight / 2);
        icon.setAnchorPoint(0, 0.5);
        icon.scale = idx < 3 ? ZGZ.SCALE * 0.7 : 1.1;
        cell.addChild(icon);

        if (idx > 2) {
            var rankValue = new cc.LabelTTF(idx + 1, "Arial", 26);
            rankValue.setPosition(icon.width/2, icon.height/2)
            icon.addChild(rankValue);
        }

        xx = xx + 150;

        //
        var avatarSprite = new cc.Sprite(utils.getAvatar(oneRanking.avatar));
        avatarSprite.setPosition(xx, this.m_nCelleHeight / 2);
        avatarSprite.scale = 0.7
        cell.addChild(avatarSprite);

        var avatarSize = avatarSprite.getBoundingBox();
        xx = xx + avatarSize.width + 15;
        //玩家昵称
        var nickName = oneRanking.nickName;
        var nickNameLabel = new cc.LabelTTF(nickName, "Arial", 24);
        nickNameLabel.color = cc.color.WHITE;
        nickNameLabel.setAnchorPoint(0, 0);
        nickNameLabel.setPosition(xx, this.m_nCelleHeight / 2 + 4);
        cell.addChild(nickNameLabel);

        //
        var percentIcon = new cc.LabelTTF("胜率:", "Arial", 22);
        percentIcon.setPosition(xx, this.m_nCelleHeight / 2 - 30);
        percentIcon.setAnchorPoint(0, 0);
        cell.addChild(percentIcon);

        //玩家胜率
        var totalBattle = oneRanking.loseNr + oneRanking.winNr;

        var percentStr = utils.getPercent(oneRanking.winNr, totalBattle);

        var winningLabel = new cc.LabelTTF(percentStr, "Arial", 22);
        winningLabel.color = cc.color.GREEN;
        winningLabel.setAnchorPoint(0, 0);
        winningLabel.setPosition(xx + 60, this.m_nCelleHeight / 2 - 30);
        cell.addChild(winningLabel);

        //胜负


        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return this.m_nCelleNum;
    },
    onCallBack: function (sender) {

    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }
});


////////////////
/// 昨日充值榜
///////////
var RechargeRankingListLayer = cc.Layer.extend({
    sprite: null,
    ctor: function (args) {
        this._super();
        this.data = args;

        var winSize = cc.director.getWinSize();
        var visibleOrigin = cc.director.getVisibleOrigin();
        var visibleSize = cc.director.getVisibleSize();


//
        var iconImage = "#rank_top_rank1.png";
        var icon = new cc.Sprite(iconImage);
        icon.scale = 0.8;
        var iconSize = icon.getBoundingBox();

        var rankingList = args.rankingList;
        var cellH = iconSize.height + 10;
        var tabH = 60;
//init data
        this.m_pTableView = null;
        this.m_nTableWidth = visibleSize.width;
        this.m_nTableHeight = (cellH * rankingList.length > (visibleSize.height - tabH)) ? (visibleSize.height - tabH) : (cellH * rankingList.length);
        this.m_nCellWidth = visibleSize.width;
        this.m_nCelleHeight = cellH;
        this.m_nTableX = visibleOrigin.x;
        this.m_nTableY = visibleOrigin.y + visibleSize.height - tabH - this.m_nTableHeight;
        this.m_nCelleNum = rankingList.length;

        this.init();

    },
    init: function () {
        this.m_pTableView = new cc.TableView(this, cc.size(this.m_nTableWidth, this.m_nTableHeight));
        this.m_pTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_pTableView.x = this.m_nTableX;
        this.m_pTableView.y = this.m_nTableY;
        this.m_pTableView.setDelegate(this);
        this.m_pTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this.m_pTableView);
        this.m_pTableView.reloadData();
    },

    scrollViewDidScroll: function (view) {
        //c.log("----->scrollViewDidScroll ");
    },
    scrollViewDidZoom: function (view) {
        //cc.log("----->scrollViewDidZoom ");
    },

    tableCellTouched: function (table, cell) {
        //cc.log("cell touched at index: " + cell.getIdx());
    },

    tableCellSizeForIndex: function (table, idx) {
        return cc.size(this.m_nCellWidth, this.m_nCelleHeight);
    },

    tableCellAtIndex: function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        if (!cell) {
            cell = new CustomTableViewCell();
        }
        cell.removeAllChildren(true);
        var rankingList = this.data.rankingList;
        var oneRanking = rankingList[idx];

        var xx = 15;
//bg
        var bg = new cc.Scale9Sprite("bg_cell.png", cc.rect(70, 10, 10, 10));
        bg.width = this.m_nCellWidth;
        bg.height = this.m_nCelleHeight;
        bg.setPosition(this.m_nCellWidth / 2, this.m_nCelleHeight / 2);
        cell.addChild(bg);
        //图标
        var rankingImageString = "#rank_paimingkuang.png";

        if (idx == 0) {
            rankingImageString = "#rank_top_rank1.png";
        } else if (idx == 1) {
            rankingImageString = "#rank_top_rank2.png";
        } else if (idx == 2) {
            rankingImageString = "#rank_top_rank3.png";
        }
        var icon = new cc.Sprite(rankingImageString);
        icon.setPosition(xx, this.m_nCelleHeight / 2);
        icon.setAnchorPoint(0, 0.5);
        icon.scale = idx < 3 ? ZGZ.SCALE * 0.7 : 1.1;
        cell.addChild(icon);

        if (idx > 2) {
            var rankValue = new cc.LabelTTF(idx + 1, "Arial", 26);
            rankValue.setPosition(icon.width/2, icon.height/2)
            icon.addChild(rankValue);
        }

        xx = xx + 150;

        //
        var avatarSprite = new cc.Sprite(utils.getAvatar(oneRanking.avatar));
        avatarSprite.setPosition(xx, this.m_nCelleHeight / 2);
        avatarSprite.scale = 0.7
        cell.addChild(avatarSprite);

        var avatarSize = avatarSprite.getBoundingBox();
        xx = xx + avatarSize.width + 15;
        //玩家昵称
        var nickName = oneRanking.nickName;
        var nickNameLabel = new cc.LabelTTF(nickName, "Arial", 24);
        nickNameLabel.color = cc.color.WHITE;
        nickNameLabel.setAnchorPoint(0, 0);
        nickNameLabel.setPosition(xx, this.m_nCelleHeight / 2 + 4);
        cell.addChild(nickNameLabel);

        //
        var rechargeIcon = new cc.LabelTTF("充值:", "Arial", 22);
        rechargeIcon.setPosition(xx, this.m_nCelleHeight / 2 - 30);
        rechargeIcon.color = cc.color.RED;
        rechargeIcon.setAnchorPoint(0, 0);
        cell.addChild(rechargeIcon);

        //玩家充值金额
        var rechargeLabel = new cc.LabelTTF(zgzNumeral(oneRanking.totalAmount).format('0,0'), "Arial", 22);
        rechargeLabel.color = cc.color.YELLOW;
        rechargeLabel.setAnchorPoint(0, 0);
        rechargeLabel.setPosition(xx + 60, this.m_nCelleHeight / 2 - 30);
        cell.addChild(rechargeLabel);

        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return this.m_nCelleNum;
    },
    onCallBack: function (sender) {

    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }
});
