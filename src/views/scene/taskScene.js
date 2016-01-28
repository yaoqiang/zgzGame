var TaskScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        TaskScenePoint = this;

        this.scheduleOnce(this.updateTime, 0.5);
    },

    ctor: function (args) {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.task_plist);

        this.selected = 100;//args.selected;
        //background
        var winSize = cc.director.getWinSize();
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width/2, winSize.height/2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);


        this.tabLayer = new TaskTabLayer({lobby: args.selected, callback: this.onTabChange, targe:this});
        this.addChild(this.tabLayer, 9);
        this.tasklayer = null;


    },

    onExit: function () {
        TaskScenePoint = null;
        this._super();

    },

    updateTime: function () {
        this.onTabChange(0);

    },

    onTabChange: function (index) {
        if (this.selected == index) return;

        if (this.tasklayer) {
            cc.log("----->remove tasklayer:"+this.selected);
            this.tasklayer.removeFromParent(true);
            this.tasklayer = null;
        }

        cc.log("----->onTabChange:"+index);

        if (index == 0) {
            UniversalController.getDailyTaskList(function (data) {
                var scene = cc.director.getRunningScene();
                var layer = new DailyTaskLayer(data);
                TaskScenePoint.addChild(layer);
                TaskScenePoint.tasklayer = layer;
            });
        }

        if (index == 1) {
            UniversalController.getForeverTaskList(function (data) {
                var scene = cc.director.getRunningScene();
                var layer = new ForeverTaskLayer(data);
                TaskScenePoint.addChild(layer);
                TaskScenePoint.tasklayer = layer;
            });
        }
        this.selected = index;
    }

});

var CustomTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);
    }
});

var DailyTaskLayer = cc.Layer.extend({
    sprite:null,
    ctor: function (args) {
        this._super();
        this.data = args;

        console.log('DailyTaskLayer event -> ', args);
        var winSize = cc.director.getWinSize();
        var visibleOrigin = cc.director.getVisibleOrigin();
        var visibleSize = cc.director.getVisibleSize();


//
        var iconImage = "#task_Quest_2.png";
        var icon = new cc.Sprite(iconImage);
        var iconSize = icon.getBoundingBox();

        var taskList = args.taskList;
        var cellH = iconSize.height + 10;
        var tabH = 80;
//init data
        this.m_pTableView = null;
        this.m_nTableWidth = visibleSize.width;
        this.m_nTableHeight = (cellH*taskList.length>(visibleSize.height-tabH)) ? (visibleSize.height-tabH):(cellH*taskList.length);
        this.m_nCellWidth = visibleSize.width;
        this.m_nCelleHeight = cellH;
        this.m_nTableX = visibleOrigin.x;
        this.m_nTableY = visibleOrigin.y + visibleSize.height - tabH - this.m_nTableHeight;
        this.m_nCelleNum = taskList.length;

        this.init();

    },
    init:function () {
        this.m_pTableView = new cc.TableView(this, cc.size(this.m_nTableWidth, this.m_nTableHeight));
        this.m_pTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_pTableView.x = this.m_nTableX;
        this.m_pTableView.y = this.m_nTableY;
        this.m_pTableView.setDelegate(this);
        this.m_pTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this.m_pTableView);
        this.m_pTableView.reloadData();
    },

    scrollViewDidScroll:function (view) {
        //c.log("----->scrollViewDidScroll ");
    },
    scrollViewDidZoom:function (view) {
        //cc.log("----->scrollViewDidZoom ");
    },

    tableCellTouched:function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
    },

    tableCellSizeForIndex:function (table, idx) {
        return cc.size(this.m_nCellWidth, this.m_nCelleHeight);
    },

    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        if (!cell) {
            cell = new CustomTableViewCell();
        }
        cell.removeAllChildren(true);
        var taskList = this.data.taskList;
        var oneTask = taskList[idx];

        var xx = 5;
//bg
        var bg = new cc.Scale9Sprite("task_jindutiao_dikuang.png", cc.rect(70, 10, 10, 10));
        bg.width = this.m_nCellWidth;
        bg.height = this.m_nCelleHeight;
        bg.setPosition(this.m_nCellWidth/2, this.m_nCelleHeight/2);
        cell.addChild(bg);
//图标
        var type = oneTask.type;
        if(type == "battle"){
            var iconImage = "#task_Quest_1.png";
        }else if(type == "win"){
            var iconImage = "#task_Quest_2.png";
        }else{//meeting
            var iconImage = "#task_Quest_2.png";
        }
        var icon = new cc.Sprite(iconImage);
        icon.setPosition(xx, this.m_nCelleHeight/2);
        icon.setAnchorPoint(0, 0.5);
        icon.scale = ZGZ.SCALE * 1;
        cell.addChild(icon);
        var iconSize = icon.getBoundingBox();
        xx = xx + iconSize.width +5;
//任务名称
        var name = oneTask.name;
        var taskname = new cc.LabelTTF(name, "Arial", 24);
        taskname.color = cc.color.YELLOW;
        taskname.setAnchorPoint(0, 0);
        taskname.setPosition(xx, this.m_nCelleHeight/2 + 4);
        cell.addChild(taskname);
        var nameSize = taskname.getContentSize();
//任务简介
        var desc = oneTask.desc;
        var descText = new cc.LabelTTF(desc, "Arial", 20);
        descText.color = cc.color.YELLOW;
        descText.setAnchorPoint(0, 1);
        descText.setPosition(xx, this.m_nCelleHeight/2 - 6);
        cell.addChild(descText);
        xx = xx + nameSize.width + 30;
//任务进度
        var current = oneTask.current;
        var target = oneTask.target;
        var jindu = new cc.LabelTTF(current+"/"+target , "Arial", 24);
        jindu.color = cc.color.YELLOW;
        jindu.setAnchorPoint(0, 0);
        jindu.setPosition(xx, this.m_nCelleHeight/2 + 4);
        cell.addChild(jindu);
//menu
        var finished = oneTask.finished;
        xx = this.m_nCellWidth-20;
        if(finished){
            var finishedText = new cc.LabelTTF("任务完成", "Arial", 24);
            finishedText.color = cc.color.YELLOW;
            finishedText.setAnchorPoint(1, 0.5);
            finishedText.setPosition(xx, this.m_nCelleHeight/2 );
            cell.addChild(finishedText);
        }else{
            var Item = new cc.MenuItemImage("#common_btn_lv.png", "#common_btn_lan.png", this.onCallBackk, this);
            Item.setPosition(xx, this.m_nCelleHeight/2);
            Item.setAnchorPoint(1, 0.5);
            Item.scale = ZGZ.SCALE * 0.7;
            Item.tag = idx;
            var ItemSize = Item.getContentSize();

            var text = "去做任务";
            if(current ==target )
                text = "领取奖励";
            var textLable = new cc.LabelTTF(text, "Arial", 30);
            textLable.color = cc.color.YELLOW;
            textLable.setAnchorPoint(0.5, 0.5);
            textLable.setPosition(ItemSize.width/2, ItemSize.height/2 );
            Item.addChild(textLable);

            var menu = new cc.Menu(Item);
            menu.setPosition(0, 0);
            cell.addChild(menu);
        }

//任务奖励
        var grant = oneTask.grant;
        xx = this.m_nCellWidth - 300;
        var jiangImage = new cc.Sprite("#task_jiang.png");
        jiangImage.setPosition(xx, this.m_nCelleHeight/2);
        jiangImage.setAnchorPoint(0, 0.5);
        jiangImage.scale = ZGZ.SCALE * 1;
        cell.addChild(jiangImage);
        var jiangSize = jiangImage.getBoundingBox();
        xx = xx + jiangSize.width + 3;

        var jiangText = new cc.LabelTTF(grant, "Arial", 24);
        jiangText.color = cc.color.YELLOW;
        jiangText.setAnchorPoint(0, 0.5);
        jiangText.setPosition(xx, this.m_nCelleHeight/2 );
        cell.addChild(jiangText);


        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return this.m_nCelleNum;
    },
    onCallBackk: function (sender) {
        var tag = sender.tag;
        console.log("----->tag:"+tag);
        var taskList = this.data.taskList;
        var oneTask = taskList[tag];
        var current = oneTask.current;
        var target = oneTask.target;
        var id = oneTask.id;
        if(current == target){
            //领取奖励
            UniversalController.getTaskGrant(id,this.getTaskGrant);
        }else{
            //去做任务
            UniversalController.enterIndex();
        }

    },
    getTaskGrant: function (data) {
        //领取奖励
        var nextTask = data.nextTask;
        var taskList = this.data.taskList;

        for(var i=0; i<taskList.length; i++){
            var oneTask = taskList[i];
            if(oneTask.id == nextTask.id){
                oneTask.current = nextTask.current;
                oneTask.desc = nextTask.desc;
                oneTask.finished = nextTask.finished;
                oneTask.grant = nextTask.grant;
                oneTask.icon = nextTask.icon;
                oneTask.name = nextTask.name;
                oneTask.target = nextTask.target;
                oneTask.type = nextTask.type;

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

var ForeverTaskLayer = cc.Layer.extend({
    sprite:null,
    ctor: function (args) {
        this._super();
        console.log('ForeverTaskLayer event -> ', args);
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
        var tabH = 80;
//init data
        this.m_pTableView = null;
        this.m_nTableWidth = visibleSize.width;
        this.m_nTableHeight = (cellH*taskList.length>(visibleSize.height-tabH)) ? (visibleSize.height-tabH):(cellH*taskList.length);
        this.m_nCellWidth = visibleSize.width;
        this.m_nCelleHeight = cellH;
        this.m_nTableX = visibleOrigin.x;
        this.m_nTableY = visibleOrigin.y + visibleSize.height - tabH - this.m_nTableHeight;
        this.m_nCelleNum = taskList.length;


        this.init();

    },
    init:function () {
        this.m_pTableView = new cc.TableView(this, cc.size(this.m_nTableWidth, this.m_nTableHeight));
        this.m_pTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_pTableView.x = this.m_nTableX;
        this.m_pTableView.y = this.m_nTableY;
        this.m_pTableView.setDelegate(this);
        this.m_pTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this.m_pTableView);
        this.m_pTableView.reloadData();

    },

    scrollViewDidScroll:function (view) {
        //c.log("----->scrollViewDidScroll ");
    },
    scrollViewDidZoom:function (view) {
        //cc.log("----->scrollViewDidZoom ");
    },

    tableCellTouched:function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
    },

    tableCellSizeForIndex:function (table, idx) {
        return cc.size(this.m_nCellWidth, this.m_nCelleHeight);
    },

    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        if (!cell) {
            cell = new CustomTableViewCell();
        }
        cell.removeAllChildren(true);
        var taskList = this.data.taskList;
        var oneTask = taskList[idx];

        var xx = 5;
//bg
        var bg = new cc.Scale9Sprite("task_jindutiao_dikuang.png", cc.rect(70, 10, 10, 10));
        bg.width = this.m_nCellWidth;
        bg.height = this.m_nCelleHeight;
        bg.setPosition(this.m_nCellWidth/2, this.m_nCelleHeight/2);
        cell.addChild(bg);
//图标
        var type = oneTask.type;
        if(type == "battle"){
            var iconImage = "#task_Quest_1.png";
        }else if(type == "win"){
            var iconImage = "#task_Quest_2.png";
        }else{//meeting
            var iconImage = "#task_Quest_2.png";
        }
        var icon = new cc.Sprite(iconImage);
        icon.setPosition(xx, this.m_nCelleHeight/2);
        icon.setAnchorPoint(0, 0.5);
        icon.scale = ZGZ.SCALE * 1;
        cell.addChild(icon);
        var iconSize = icon.getBoundingBox();
        xx = xx + iconSize.width +5;
//任务名称
        var name = oneTask.name;
        var taskname = new cc.LabelTTF(name, "Arial", 24);
        taskname.color = cc.color.YELLOW;
        taskname.setAnchorPoint(0, 0);
        taskname.setPosition(xx, this.m_nCelleHeight/2 + 4);
        cell.addChild(taskname);
        var nameSize = taskname.getContentSize();
//任务简介
        var desc = oneTask.desc;
        var descText = new cc.LabelTTF(desc, "Arial", 20);
        descText.color = cc.color.YELLOW;
        descText.setAnchorPoint(0, 1);
        descText.setPosition(xx, this.m_nCelleHeight/2 - 6);
        cell.addChild(descText);
        xx = xx + nameSize.width + 30;
//任务进度
        var current = oneTask.current;
        var target = oneTask.target;
        var jindu = new cc.LabelTTF(current+"/"+target , "Arial", 24);
        jindu.color = cc.color.YELLOW;
        jindu.setAnchorPoint(0, 0);
        jindu.setPosition(xx, this.m_nCelleHeight/2 + 4);
        cell.addChild(jindu);
//menu
        var finished = oneTask.finished;
        xx = this.m_nCellWidth-20;
        if(finished){
            var finishedText = new cc.LabelTTF("任务完成", "Arial", 24);
            finishedText.color = cc.color.YELLOW;
            finishedText.setAnchorPoint(1, 0.5);
            finishedText.setPosition(xx, this.m_nCelleHeight/2 );
            cell.addChild(finishedText);
        }else{
            var Item = new cc.MenuItemImage("#common_btn_lv.png", "#common_btn_lan.png", this.onCallBackk, this);
            Item.setPosition(xx, this.m_nCelleHeight/2);
            Item.setAnchorPoint(1, 0.5);
            Item.scale = ZGZ.SCALE * 0.7;
            Item.tag = idx;
            var ItemSize = Item.getContentSize();

            var text = "去做任务";
            if(current ==target )
                text = "领取奖励";
            var textLable = new cc.LabelTTF(text, "Arial", 30);
            textLable.color = cc.color.YELLOW;
            textLable.setAnchorPoint(0.5, 0.5);
            textLable.setPosition(ItemSize.width/2, ItemSize.height/2 );
            Item.addChild(textLable);

            var menu = new cc.Menu(Item);
            menu.setPosition(0, 0);
            cell.addChild(menu);
        }

//任务奖励
        var grant = oneTask.grant;
        xx = this.m_nCellWidth - 300;
        var jiangImage = new cc.Sprite("#task_jiang.png");
        jiangImage.setPosition(xx, this.m_nCelleHeight/2);
        jiangImage.setAnchorPoint(0, 0.5);
        jiangImage.scale = ZGZ.SCALE * 1;
        cell.addChild(jiangImage);
        var jiangSize = jiangImage.getBoundingBox();
        xx = xx + jiangSize.width + 3;

        var jiangText = new cc.LabelTTF(grant, "Arial", 24);
        jiangText.color = cc.color.YELLOW;
        jiangText.setAnchorPoint(0, 0.5);
        jiangText.setPosition(xx, this.m_nCelleHeight/2 );
        cell.addChild(jiangText);


        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return this.m_nCelleNum;
    },
    onCallBackk: function (sender) {
        var tag = sender.tag;
        console.log("----->tag:"+tag);
        var taskList = this.data.taskList;
        var oneTask = taskList[tag];
        var current = oneTask.current;
        var target = oneTask.target;
        var id = oneTask.id;
        if(current == target){
            //领取奖励
            UniversalController.getTaskGrant(id,this.getTaskGrant);
        }else{
            //去做任务
            UniversalController.enterIndex();
        }

    },
    getTaskGrant: function (data) {
        //领取奖励
        var nextTask = data.nextTask;
        var taskList = this.data.taskList;

        for(var i=0; i<taskList.length; i++){
            var oneTask = taskList[i];
            if(oneTask.id == nextTask.id){
                oneTask.current = nextTask.current;
                oneTask.desc = nextTask.desc;
                oneTask.finished = nextTask.finished;
                oneTask.grant = nextTask.grant;
                oneTask.icon = nextTask.icon;
                oneTask.name = nextTask.name;
                oneTask.target = nextTask.target;
                oneTask.type = nextTask.type;

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