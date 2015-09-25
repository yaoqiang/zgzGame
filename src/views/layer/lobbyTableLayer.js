/****************************************************************************

 ****************************************************************************/

var lobbyTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);
    }
});

var lobbyTableLayer = cc.Layer.extend({

    ctor:function (data) {
        this._super();
        //if(data == null)return;
        //init data
        var winSize = cc.director.getWinSize();
        this.m_pTableView = null;
        this.m_nTableWidth = data.width? data.width : winSize.width;
        this.m_nTableHeight = data.height? data.height : winSize.height;
        this.m_nCellWidth = data.cwidth? data.cwidth : winSize.width;
        this.m_nCelleHeight = data.cheight? data.cheight : winSize.height;
        this.m_nTableX = data.x? data.x : 0;
        this.m_nTableY = data.y? data.y : 0;
        this.m_nCelleNum = 10;
        //
        this.init();
    },

    init:function () {
        var winSize = cc.director.getWinSize();

        //this.m_pTableView = new cc.TableView(this, cc.size(600, 60));
        //this.m_pTableView.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        //this.m_pTableView.x = 20;
        //this.m_pTableView.y = winSize.height / 2 - 150;
        //this.m_pTableView.setDelegate(this);
        //this.addChild(this.m_pTableView);
        //this.m_pTableView.reloadData();

        this.m_pTableView = new cc.TableView(this, cc.size(this.m_nTableWidth, this.m_nTableHeight));
        this.m_pTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_pTableView.x = this.m_nTableX;
        this.m_pTableView.y = this.m_nTableY;
        this.m_pTableView.setDelegate(this);
        this.m_pTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this.m_pTableView);
        this.m_pTableView.reloadData();

        return true;
    },

    toExtensionsMainLayer:function (sender) {

    },

    scrollViewDidScroll:function (view) {
    },
    scrollViewDidZoom:function (view) {
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
            cell = new lobbyTableViewCell();

            //var sprite = new cc.Sprite(s_image_icon);
            //sprite.anchorX = 0;
            //sprite.anchorY = 0;
            //sprite.x = 0;
            //sprite.y = 0;
            //cell.addChild(sprite);

            var line = new cc.LabelTTF("------------------------------", "Arial", 24);
            line.color = cc.color.YELLOW;
            line.setPosition(this.m_nCellWidth/2, this.m_nCelleHeight);
            cell.addChild(line);

            label = new cc.LabelTTF(strValue, "Helvetica", 20.0);
            label.x = 0;
            label.y = 0;
            label.anchorX = 0;
            label.anchorY = 0;
            label.tag = 123;
            cell.addChild(label);
        } else {
            label = cell.getChildByTag(123);
            label.setString(strValue);
        }

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return this.m_nCelleNum;
    }
});

var createLobbyTableLayer = function (data) {
    var pLayer = new lobbyTableLayer(data);
    return pLayer;
};
