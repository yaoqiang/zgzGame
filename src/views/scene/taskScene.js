var TaskScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
    },

    ctor: function (args) {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.task_plist);

        this.selected = args.selected;

        this.tabLayer = new TaskTabLayer({lobby: args.selected, callback: this.onTabChange});
        this.addChild(this.tabLayer, 9);

        this.layer = new DailyTaskLayer(args.data);
        this.addChild(this.layer);

    },

    onExit: function () {
        this._super();

    },

    onTabChange: function (index) {
        var scene = cc.director.getRunningScene();
        if (scene.selected == index) return;
        if (scene.layer) {
            scene.layer.removeFromParent(true);
            scene.layer = null;
        }

        scene.selected = index;

        if (scene.selected == 0) {
            scene.layer = new DailyTaskLayer();
        }

        if (scene.selected == 1) {
            scene.layer = new ForeverTaskLayer();
        }

        scene.addChild(scene.layer);


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

 //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width/2, winSize.height/2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);
//
        var taskList = args.taskList;
        var cellH = 100;
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
        var winSize = cc.director.getWinSize();

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
        var label;
        if (!cell) {
            cell = new CustomTableViewCell();
        }
        cell.removeAllChildren(true);
        var taskList = this.data.taskList;

        var desc = new cc.LabelTTF(taskList[idx].desc, "Arial", 24);
        desc.color = cc.color.YELLOW;
        desc.anchorX = 0;
        desc.anchorY = 0.5;
        desc.setPosition(10, this.m_nCelleHeight/2);
        cell.addChild(desc);

        var line = new cc.LabelTTF("------------------------------", "Arial", 24);
        line.color = cc.color.YELLOW;
        line.anchorX = 0.5;
        line.anchorY = 0;
        line.setPosition(this.m_nCellWidth/2, 0);
        cell.addChild(line);

        label = new cc.LabelTTF(strValue, "Helvetica", 20.0);
        label.x = 0;
        label.y = 0;
        label.anchorX = 0;
        label.anchorY = 0;
        label.tag = 123;
        cell.addChild(label);

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return this.m_nCelleNum;
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
    ctor: function () {
        this._super();

        var winSize = cc.director.getWinSize();

        //background
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width/2, winSize.height/2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);


        this.init();

    },
    init:function () {
        var winSize = cc.director.getWinSize();

    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }
});