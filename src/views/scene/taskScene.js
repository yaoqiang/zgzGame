var TaskScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.scheduleOnce(this.updateTime, 0.5);
    },

    ctor: function (args) {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.task_plist);

        this.selected = 100;//args.selected;

        //background
        var winSize = cc.director.getWinSize();
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width / 2, winSize.height / 2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        this.lobbyId = args.lobbyId;

        this.tabLayer = new TaskTabLayer({lobbyId: args.lobbyId, callback: this.onTabChange, target: this});
        this.addChild(this.tabLayer, 9);
        this.tasklayer = null;


        //add a keyboard event listener to statusLabel
        this.keyboardListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
            },
            onKeyReleased: function(keyCode, event){
                var target = event.getCurrentTarget();
                if (keyCode == cc.KEY.back) {
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
        //
        cc.eventManager.removeListener(this.keyboardListener);
    },

    updateTime: function () {
        this.onTabChange(0);

    },

    onTabChange: function (index) {

        var self = this;
        if (this.selected == index) return;

        if (this.tasklayer) {
            this.tasklayer.removeFromParent(true);
            this.tasklayer = null;
        }

        if (index == 0) {
            UniversalController.getDailyTaskList(function (data) {
                var scene = cc.director.getRunningScene();
                var layer = new DailyTaskLayer(data);
                self.addChild(layer);
                self.tasklayer = layer;
            });
        }

        if (index == 1) {
            UniversalController.getForeverTaskList(function (data) {
                var scene = cc.director.getRunningScene();
                var layer = new ForeverTaskLayer(data);
                self.addChild(layer);
                self.tasklayer = layer;
            });
        }
        this.selected = index;
    }

});

var CustomTableViewCell = cc.TableViewCell.extend({
    draw: function (ctx) {
        this._super(ctx);
    }
});

var DailyTaskLayer = cc.Layer.extend({
    sprite: null,
    ctor: function (args) {
        this._super();
        this.data = args;

        var winSize = cc.director.getWinSize();
        var visibleOrigin = cc.director.getVisibleOrigin();
        var visibleSize = cc.director.getVisibleSize();


//
        var iconImage = "#task_Quest_2.png";
        var icon = new cc.Sprite(iconImage);
        var iconSize = icon.getBoundingBox();

        var taskList = args.taskList;
        var cellH = iconSize.height + 10;
        var tabH = 60;
//init data
        this.m_pTableView = null;
        this.m_nTableWidth = visibleSize.width;
        this.m_nTableHeight = (cellH * taskList.length > (visibleSize.height - tabH)) ? (visibleSize.height - tabH) : (cellH * taskList.length);
        this.m_nCellWidth = visibleSize.width;
        this.m_nCelleHeight = cellH;
        this.m_nTableX = visibleOrigin.x;
        this.m_nTableY = visibleOrigin.y + visibleSize.height - tabH - this.m_nTableHeight;
        this.m_nCelleNum = taskList.length;

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
        var taskList = this.data.taskList;
        var oneTask = taskList[idx];

        var xx = 15;
//bg
        var bg = new cc.Scale9Sprite("bg_cell.png", cc.rect(70, 10, 10, 10));
        bg.width = this.m_nCellWidth;
        bg.height = this.m_nCelleHeight;
        bg.setPosition(this.m_nCellWidth / 2, this.m_nCelleHeight / 2);
        cell.addChild(bg);
//图标
        var type = oneTask.type;
        if (type == "battle") {
            var iconImage = "#task_Quest_1.png";
        } else if (type == "win") {
            var iconImage = "#task_Quest_2.png";
        } else {//meeting
            var iconImage = "#task_Quest_2.png";
        }
        var icon = new cc.Sprite(iconImage);
        icon.setPosition(xx, this.m_nCelleHeight / 2);
        icon.setAnchorPoint(0, 0.5);
        icon.scale = ZGZ.SCALE * 0.9;
        cell.addChild(icon);
        var iconSize = icon.getBoundingBox();
        xx = xx + iconSize.width + 25;
//任务名称
        var name = oneTask.name;
        var taskname = new cc.LabelTTF(name, "Arial", 24);
        taskname.color = cc.color.GREEN;
        taskname.setAnchorPoint(0, 0);
        taskname.setPosition(xx, this.m_nCelleHeight / 2 + 4);
        cell.addChild(taskname);
        var nameSize = taskname.getContentSize();
//任务简介
        var desc = oneTask.desc;
        var descText = new cc.LabelTTF(desc, "Arial", 18);
        descText.color = cc.color.WHITE;
        descText.setAnchorPoint(0, 1);
        descText.setPosition(xx, this.m_nCelleHeight / 2 - 15);
        cell.addChild(descText);
        xx = xx + nameSize.width + 60;
//任务进度
        var current = oneTask.current;
        var target = oneTask.target;
        var jindu = new cc.LabelTTF(current + "/" + target, "Arial", 22);
        jindu.color = current >= target ? cc.color.GREEN : cc.color.RED;
        jindu.setAnchorPoint(0, 0);
        jindu.setPosition(xx, this.m_nCelleHeight / 2 + 4);
        cell.addChild(jindu);
//menu
        var finished = oneTask.finished;
        xx = this.m_nCellWidth - 20;
        if (finished) {
            var finishedSprite = new cc.Sprite("#task_award_received.png");
            finishedSprite.setAnchorPoint(1, 0.5);
            finishedSprite.scale = 0.7;
            finishedSprite.setPosition(xx - 20, this.m_nCelleHeight / 2);
            cell.addChild(finishedSprite);
        } else {
            var Item = new cc.MenuItemImage("#common_btn_lv.png", "#common_btn_lan.png", this.onCallBack, this);
            Item.setPosition(xx, this.m_nCelleHeight / 2);
            Item.setAnchorPoint(1, 0.5);
            Item.scale = ZGZ.SCALE * 0.7;
            Item.tag = idx;
            var ItemSize = Item.getContentSize();

            var text = "去做任务";
            if (current >= target)
                text = "领取奖励";
            var textLable = new cc.LabelTTF(text, "Arial", 26);
            textLable.color = cc.color.WHITE;
            textLable.setAnchorPoint(0.5, 0.5);
            textLable.setPosition(ItemSize.width / 2, ItemSize.height / 2);
            Item.addChild(textLable);

            var menu = new cc.Menu(Item);
            menu.setPosition(0, 0);
            cell.addChild(menu);
        }

//任务奖励
        var grant = oneTask.grant;
        xx = this.m_nCellWidth - 300;
        var jiangImage = new cc.Sprite("#task_jiang.png");
        jiangImage.setPosition(xx, this.m_nCelleHeight / 2);
        jiangImage.setAnchorPoint(0, 0.5);
        jiangImage.scale = ZGZ.SCALE * 1;
        cell.addChild(jiangImage);
        var jiangSize = jiangImage.getBoundingBox();
        xx = xx + jiangSize.width + 3;

        var jiangText = new cc.LabelTTF(zgzNumeral(grant).format('0,0'), "Arial", 24);
        jiangText.color = cc.color.YELLOW;
        jiangText.setAnchorPoint(0, 0.5);
        jiangText.setPosition(xx, this.m_nCelleHeight / 2);
        cell.addChild(jiangText);


        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return this.m_nCelleNum;
    },
    onCallBack: function (sender) {
        var self = this;
        var tag = sender.tag;
        var taskList = this.data.taskList;
        var oneTask = taskList[tag];
        var current = oneTask.current;
        var target = oneTask.target;
        var id = oneTask.id;
        this.lastTaskId = id;
        if (current >= target) {
            //领取奖励
            UniversalController.getTaskGrant(id, function (data) {
                if (data.code == RETURN_CODE.FAIL) {
                    prompt.fadeMiddle('领取失败');
                    return;
                }
                self.getTaskGrant(data);
            });
        } else {
            //去做任务
            UniversalController.enterIndex();
        }

    },
    getTaskGrant: function (data) {

        prompt.fade('您成功领取任务奖励');

        //领取奖励
        var nextTask = data.nextTask;
        var taskList = this.data.taskList;

        for (var i = 0; i < taskList.length; i++) {
            var oneTask = taskList[i];
            if (oneTask.id == this.lastTaskId) {
                oneTask.current = nextTask.current;
                oneTask.desc = nextTask.desc;
                oneTask.finished = nextTask.finished;
                oneTask.grant = nextTask.grant;
                oneTask.icon = nextTask.icon;
                oneTask.name = nextTask.name;
                oneTask.target = nextTask.target;
                oneTask.type = nextTask.type;
                oneTask.id = nextTask.id;
                //oneTask.fragment = nextTask.fragment;

                this.m_pTableView.reloadData();
                break;
            }
        }
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }
});


////////////////////
//
//////////////////////
var ForeverTaskLayer = cc.Layer.extend({
    sprite: null,
    ctor: function (args) {
        this._super();
        this.data = args;
        var winSize = cc.director.getWinSize();
        var visibleOrigin = cc.director.getVisibleOrigin();
        var visibleSize = cc.director.getVisibleSize();

        //background
        //var bg = new cc.Sprite("#common_bg_beijing.png");
        //bg.setPosition(winSize.width/2, winSize.height/2);
        //bg.scale = ZGZ.SCALE * 10;
        //this.addChild(bg);

//
        var iconImage = "#task_Quest_2.png";
        var icon = new cc.Sprite(iconImage);
        var iconSize = icon.getBoundingBox();

        var taskList = args.taskList;
        var cellH = iconSize.height + 10;
        var tabH = 60;
//init data
        this.m_pTableView = null;
        this.m_nTableWidth = visibleSize.width;
        this.m_nTableHeight = (cellH * taskList.length > (visibleSize.height - tabH)) ? (visibleSize.height - tabH) : (cellH * taskList.length);
        this.m_nCellWidth = visibleSize.width;
        this.m_nCelleHeight = cellH;
        this.m_nTableX = visibleOrigin.x;
        this.m_nTableY = visibleOrigin.y + visibleSize.height - tabH - this.m_nTableHeight;
        this.m_nCelleNum = taskList.length;


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
        var taskList = this.data.taskList;
        var oneTask = taskList[idx];

        var xx = 15;
//bg
        var bg = new cc.Scale9Sprite("bg_cell.png", cc.rect(70, 10, 10, 10));
        bg.width = this.m_nCellWidth;
        bg.height = this.m_nCelleHeight;
        bg.setPosition(this.m_nCellWidth / 2, this.m_nCelleHeight / 2);
        cell.addChild(bg);
//图标
        var type = oneTask.type;

        //对战
        var iconImage = "#task_Quest_1.png";
        //胜利
        if (type == "win") {
            iconImage = "#task_Quest_2.png";
        }
        //meeting
        else if (type == 'meeting') {
            iconImage = "#task_Quest_4.png";
        }

        iconImage = !!oneTask.fragment ? "#task_Quest_9.png" : iconImage;

        var icon = new cc.Sprite(iconImage);
        icon.setPosition(xx, this.m_nCelleHeight / 2);
        icon.setAnchorPoint(0, 0.5);
        icon.scale = ZGZ.SCALE * 0.9;
        cell.addChild(icon);
        var iconSize = icon.getBoundingBox();
        xx = xx + iconSize.width + 25;
//任务名称
        var name = oneTask.name;
        var taskname = new cc.LabelTTF(name, "Arial", 24);
        taskname.color = cc.color.GREEN;
        taskname.setAnchorPoint(0, 0);
        taskname.setPosition(xx, this.m_nCelleHeight / 2 + 4);
        cell.addChild(taskname);
        var nameSize = taskname.getContentSize();
//任务简介
        var desc = oneTask.desc;
        var descText = new cc.LabelTTF(desc, "Arial", 18);
        descText.color = cc.color.WHITE;
        descText.setAnchorPoint(0, 1);
        descText.setPosition(xx, this.m_nCelleHeight / 2 - 15);
        cell.addChild(descText);
        xx = xx + nameSize.width + 60;
//任务进度
        var current = oneTask.current;
        var target = oneTask.target;
        var jindu = new cc.LabelTTF(current + "/" + target, "Arial", 22);
        jindu.color = current >= target ? cc.color.GREEN : cc.color.RED;
        jindu.setAnchorPoint(0, 0);
        jindu.setPosition(xx, this.m_nCelleHeight / 2 + 4);
        cell.addChild(jindu);
//menu
        var finished = oneTask.finished;
        xx = this.m_nCellWidth - 20;
        if (finished) {
            var finishedSprite = new cc.Sprite("#task_award_received.png");
            finishedSprite.setAnchorPoint(1, 0.5);
            finishedSprite.scale = 0.7;
            finishedSprite.setPosition(xx - 20, this.m_nCelleHeight / 2);
            cell.addChild(finishedSprite);

        } else {
            var Item = new cc.MenuItemImage("#common_btn_lv.png", "#common_btn_lan.png", this.onCallBack, this);
            Item.setPosition(xx, this.m_nCelleHeight / 2);
            Item.setAnchorPoint(1, 0.5);
            Item.scale = ZGZ.SCALE * 0.7;
            Item.tag = idx;
            var ItemSize = Item.getContentSize();

            var text = "去做任务";
            if (current >= target)
                text = "领取奖励";
            var textLable = new cc.LabelTTF(text, "Arial", 26);
            textLable.color = cc.color.WHITE;
            textLable.setAnchorPoint(0.5, 0.5);
            textLable.setPosition(ItemSize.width / 2, ItemSize.height / 2);
            Item.addChild(textLable);

            var menu = new cc.Menu(Item);
            menu.setPosition(0, 0);
            cell.addChild(menu);
        }

        //任务奖励明细
        var grant = oneTask.grant;
        xx = this.m_nCellWidth - 300;

        var grantImageString = "#task_jiang.png";
        var grantValue = grant;

        if (oneTask.fragment) {
            grantImageString = "#yuanbaoIcon.png";
            grantValue = oneTask.fragment;
        }
        var jiangImage = new cc.Sprite(grantImageString);
        jiangImage.setPosition(xx, this.m_nCelleHeight / 2);
        jiangImage.setAnchorPoint(0, 0.5);
        jiangImage.scale = !!oneTask.fragment ? ZGZ.SCALE * 0.8 : ZGZ.SCALE * 1;
        cell.addChild(jiangImage);
        var jiangSize = jiangImage.getBoundingBox();
        xx = xx + jiangSize.width + 3;

        //
        var jiangText = new cc.LabelTTF(zgzNumeral(grantValue).format('0,0'), "Arial", 24);
        jiangText.color = cc.color.YELLOW;
        jiangText.setAnchorPoint(0, 0.5);
        jiangText.setPosition(xx, this.m_nCelleHeight / 2);
        cell.addChild(jiangText);


        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return this.m_nCelleNum;
    },
    onCallBack: function (sender) {
        var self = this;
        var tag = sender.tag;
        var taskList = this.data.taskList;
        var oneTask = taskList[tag];
        var current = oneTask.current;
        var target = oneTask.target;
        var id = oneTask.id;
        if (current >= target) {
            //记录领奖的任务ID;
            this.lastTaskId = id;
            //领取奖励
            UniversalController.getTaskGrant(id, function (data) {
                if (data.code == RETURN_CODE.FAIL) {
                    prompt.fadeMiddle('领取失败');
                    return;
                }
                self.getTaskGrant(data);
            });
        } else {
            //去做任务
            UniversalController.enterIndex();
        }

    },
    getTaskGrant: function (data) {
        prompt.fade('您成功领取任务奖励!')
        //领取奖励
        var nextTask = data.nextTask;
        var taskList = this.data.taskList;

        for (var i = 0; i < taskList.length; i++) {
            var oneTask = taskList[i];
            if (oneTask.id == this.lastTaskId) {
                oneTask.id = nextTask.id;
                oneTask.current = nextTask.current;
                oneTask.desc = nextTask.desc;
                oneTask.finished = nextTask.finished;
                oneTask.grant = nextTask.grant;
                oneTask.icon = nextTask.icon;
                oneTask.name = nextTask.name;
                oneTask.target = nextTask.target;
                oneTask.type = nextTask.type;
                oneTask.fragment = nextTask.fragment;

                this.m_pTableView.reloadData();
                break;
            }
        }
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }
});