/*
 content,文字内容，object
 size,显示范围
 x,坐标
 y,坐标
 nYSpace，行间距
 */

/*
 content：包含对象
 包含对象格式：
 color = [r,g,b],
 text = "", -- 支持 \n 换行
 fontname,文字类型
 fontsize,文字大小
 */

var CustomTableViewCell = cc.TableViewCell.extend({
    draw: function (ctx) {
        this._super(ctx);
    }
});

var MultiLabel = cc.Layer.extend({

    ctor: function (args) {
        //console.log(args);
        this._super();
        this.m_List = [];


        var winSize = cc.director.getWinSize();

        this.m_showSize = (args.size == null) ? winSize : args.size;
        this.m_x = (args.x == null) ? 0 : args.x;
        this.m_y = (args.y == null) ? 0 : args.y;
        this.m_YSpace = (args.space == null) ? 2 : args.space;

        this.analyze(args.content);

        this.init();
    },

    init: function () {
        var winSize = cc.director.getWinSize();

        var tableView = new cc.TableView(this, this.m_showSize);
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.x = this.m_x;
        tableView.y = this.m_y;
        tableView.setDelegate(this);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(tableView);
        tableView.reloadData();


        //var str = "一二三四五六\n七八";
        //console.log(str);
        //console.log(str.substr(2,3));
        //console.log(str);
        //
        //var textTable = str.split("\n");
        //console.log(textTable);
    },

    analyze: function (content) {
        //console.log("analyze begin");
        var winSize = cc.director.getWinSize();
        var len = content.length;

        var nLine = 0;
        var nWidth = 0;
        var p = 0;
        var idx = 0;

        for (var i = 0; i < len; i++) {
            var item = content[i];

            var lcolor = item.color || cc.color.WHITE;
            var lfontname = item.fontname || 'Arial';
            var lfontsize = item.fontsize || 24;
            var text = item.text;

            this.m_List.push({});
            this.m_List[this.m_List.length - 1].color = lcolor;
            this.m_List[this.m_List.length - 1].fontname = lfontname;
            this.m_List[this.m_List.length - 1].fontsize = lfontsize;
            this.m_List[this.m_List.length - 1].text = "";
            this.m_List[this.m_List.length - 1].size = cc.size(this.m_showSize.width, 5);
            //this.m_List.push({color:item.color, text:item.text, fontname:item.fontname, fontsize:item.fontsize, size:cc.size(this.m_showSize.width, item.fontsize)});

            var textTable = text.split("\n");

            p = 0;
            idx = 0;
            nWidth = 0;

            //continue;
            for (var j = 0; j < textTable.length; j++) {
                var one = textTable[j];
                while (true) {
                    var labelStr = one.substr(p + idx, 1);
                    //console.log("labelStr: " + labelStr);
                    if (labelStr == null || labelStr == "") {

                        p = 0;
                        idx = 0;
                        nWidth = 0;

                        this.m_List.push({});
                        this.m_List[this.m_List.length - 1].color = lcolor;
                        this.m_List[this.m_List.length - 1].fontname = lfontname;
                        this.m_List[this.m_List.length - 1].fontsize = lfontsize;
                        this.m_List[this.m_List.length - 1].text = "";
                        this.m_List[this.m_List.length - 1].size = cc.size(this.m_showSize.width, 5);
                        break;

                    } else {
                        var label = new cc.LabelTTF(labelStr, lfontname, lfontsize);
                        var csize = label.getContentSize();
                        nWidth = nWidth + csize.width;

                        if (nWidth > this.m_showSize.width) {

                            p = idx;
                            idx = 0;
                            nWidth = 0;

                            this.m_List.push({});
                            this.m_List[this.m_List.length - 1].color = lcolor;
                            this.m_List[this.m_List.length - 1].fontname = lfontname;
                            this.m_List[this.m_List.length - 1].fontsize = lfontsize;
                            this.m_List[this.m_List.length - 1].size = cc.size(this.m_showSize.width, 5);
                            continue;
                        }
                        idx++;
                        this.m_List[this.m_List.length - 1].text = one.substr(p, idx);


                        if (csize.height > this.m_List[this.m_List.length - 1].size.height) {
                            this.m_List[this.m_List.length - 1].size = cc.size(this.m_showSize.width, csize.height);
                        }


                    }
                }
            }
        }
        //console.log("analyze end");
        //console.log(this.m_List);
    },


    scrollViewDidScroll: function (view) {

    },
    scrollViewDidZoom: function (view) {

    },

    tableCellTouched: function (table, cell) {
        //cc.log("cell touched at index: " + cell.getIdx());
    },

    tableCellSizeForIndex: function (table, idx) {
        var len = this.m_List.length;
        var item = this.m_List[idx];

        return item.size;

        //if (idx == 2) {
        //    return cc.size(100, 100);
        //}
        //return cc.size(60, 60);
    },

    tableCellAtIndex: function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;

        var len = this.m_List.length;

        if (!cell) {
            cell = new CustomTableViewCell();
            var item = this.m_List[idx];
            label = new cc.LabelTTF(strValue, "Helvetica", 20.0);
            label.color = item.color;
            label.x = 0;
            label.y = 0;
            label.anchorX = 0;
            label.anchorY = 0;
            label.tag = 1;
            cell.addChild(label);

            label = new cc.LabelTTF(item.text, item.fontname, item.fontsize);
            label.color = item.color;
            label.x = 10;
            label.y = 0;
            label.anchorX = 0;
            label.anchorY = 0;
            label.tag = 2;
            cell.addChild(label);

        } else {
            var item = this.m_List[idx];
            label = cell.getChildByTag(1);
            label.setString(strValue);

            label = cell.getChildByTag(2);
            label.setString(item.text);
        }

        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return this.m_List.length;
    },

    onEnter: function () {
        //console.log("MultiLabel onEnter");
        this._super();
        this._touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,
            onTouchCancelled: this.onTouchCancelled
        });
        cc.eventManager.addListener(this._touchListener, this);
    },

    onExit: function () {
        //console.log("MultiLabel onExit");
        this._super();
        cc.eventManager.removeListener(this._touchListener);
    },

    onTouchBegan: function (touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        //cc.log("MultiLabel onTouchBegan at: " + pos.x + " " + pos.y);
        var winSize = cc.director.getWinSize();
        if (pos.x < winSize.width / 2) {

            return true;
        }
        return false;
    },
    onTouchMoved: function (touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        //cc.log("MultiLabel onTouchMoved");
        //event.getCurrentTarget().update_id(id,pos);
    },
    onTouchEnded: function (touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        //cc.log("MultiLabel onTouchEnded at: " + pos.x + " " + pos.y);
        //event.getCurrentTarget().release_id(id,pos);
    },
    onTouchCancelled: function (touch, event) {
        var pos = touch.getLocation();
        var id = touch.getID();
        //cc.log("MultiLabel onTouchCancelled");
        //event.getCurrentTarget().update_id(id,pos);
    }


});