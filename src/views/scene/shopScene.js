var ShopScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.scheduleOnce(this.updateTime, 0.5);
    },

    ctor: function (args) {
        this._super();
        //console.log("---->ShopScene ctor");
        FrameCache.addSpriteFrames(res.common_plist);
        FrameCache.addSpriteFrames(res.shop_plist);
        FrameCache.addSpriteFrames(res.index_plist);
       // cc.spriteFrameCache.addSpriteFrames(res.shop_plist);

        this.selected = 100;

        //background
        var winSize = cc.director.getWinSize();
        var bg = new cc.Sprite("#common_bg_beijing.png");
        bg.setPosition(winSize.width / 2, winSize.height / 2);
        bg.scale = ZGZ.SCALE * 10;
        this.addChild(bg);

        this.lobbyId = args.lobbyId;

        this.tabLayer = new ShopTabLayer({lobbyId: args.lobbyId, callback: this.onTabChange, target: this});
        this.addChild(this.tabLayer, 9);
        this.layer = null;


        //add a keyboard event listener to statusLabel
        this.keyboardListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
            },
            onKeyReleased: function (keyCode, event) {
                playEffect(audio_common.Button_Click);
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
        //console.log("---->ShopScene onExit");
        cc.eventManager.removeListener(this.keyboardListener);
        FrameCache.removeSpriteFrames(res.common_plist);
        FrameCache.removeSpriteFrames(res.rank_plist);
        FrameCache.removeSpriteFrames(res.index_plist);
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
            playEffect(audio_common.Button_Click);
            UniversalController.getShopList(CommonConf.SHOP.TYPE.GOLD, function (data) {
                var layer = new ShopGoldLayer(data);
                self.addChild(layer);
                self.tasklayer = layer;
            });
        }

        if (index == 1) {
            playEffect(audio_common.Button_Click);
            UniversalController.getShopList(CommonConf.SHOP.TYPE.PROP, function (data) {
                var layer = new ShopPropLayer(data);
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

var ShopGoldLayer = cc.Layer.extend({
    sprite: null,
    ctor: function (args) {


        this._super();
        this.data = args;

        var winSize = cc.director.getWinSize();
        var visibleOrigin = cc.director.getVisibleOrigin();
        var visibleSize = cc.director.getVisibleSize();


        //
        var iconImage = "#shop_dalibao.png";
        var icon = new cc.Sprite(iconImage);
        //icon.scale = 0.8;
        var iconSize = icon.getBoundingBox();

        var shopList = args.shopList;
        var cellH = iconSize.height + 10;
        var tabH = 60;
//init data
        this.m_pTableView = null;
        this.m_nTableWidth = visibleSize.width;
        this.m_nTableHeight = (cellH * shopList.length > (visibleSize.height - tabH)) ? (visibleSize.height - tabH) : (cellH * shopList.length);
        this.m_nCellWidth = visibleSize.width;
        this.m_nCelleHeight = cellH;
        this.m_nTableX = visibleOrigin.x;
        this.m_nTableY = visibleOrigin.y + visibleSize.height - tabH - this.m_nTableHeight;
        this.m_nCelleNum = shopList.length;

        this.init();

        //如果是苹果手机, 提示充值失败处理方式
        if (cc.sys.os == cc.sys.OS_IOS) {
            UniversalController.getAppleStoreApproveState(function (data) {
                if (!data.inReview) {
                    prompt.fadeMiddle('苹果充值偶尔会失败, 如果您充值失败, 请加微信: 7405510\n建议直接通过添加微信进行人工充值', 7)
                }
            });
        }

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
        var shopList = this.data.shopList;
        var product = shopList[idx];

        var xx = 15;
//bg
        var bg = new cc.Scale9Sprite("bg_cell.png", cc.rect(70, 10, 10, 10));
        bg.width = this.m_nCellWidth;
        bg.height = this.m_nCelleHeight;
        bg.setPosition(this.m_nCellWidth / 2, this.m_nCelleHeight / 2);
        cell.addChild(bg);
        //图标
        var itemImageString = "#shop_gift_" + product.icon + ".png";


        var icon = new cc.Sprite(itemImageString);
        icon.setPosition(xx, this.m_nCelleHeight / 2);
        icon.setAnchorPoint(0, 0.5);
        cell.addChild(icon);

        xx = xx + 150;


        //物品名称
        var nameLabel = new cc.LabelTTF(product.title, "Arial", 22);
        nameLabel.color = cc.color.WHITE;
        nameLabel.setAnchorPoint(0, 0.5);
        nameLabel.setPosition(60, icon.getContentSize().height / 2);
        icon.addChild(nameLabel);

        //+gold icon
        var goldPlusIcon = new cc.Sprite("#common_icon_gold_10.png");
        goldPlusIcon.setAnchorPoint(0, 0.5);
        goldPlusIcon.scale = 0.45;
        goldPlusIcon.setPosition(xx + 55, this.m_nCelleHeight / 2 + 20);

        cell.addChild(goldPlusIcon);

        //+gold
        var goldLabel = new cc.LabelTTF('+' + zgzNumeral(product.gold).format('0,0'), "Arial", 20);
        goldLabel.color = cc.color.YELLOW;
        goldLabel.setAnchorPoint(0, 0.5);
        goldLabel.setPosition(xx + 110, this.m_nCelleHeight / 2 + 20);

        cell.addChild(goldLabel);

        //DESC
        var descLabel = new cc.LabelTTF(product.desc, "Arial", 18);
        descLabel.color = cc.color.RED;
        descLabel.setAnchorPoint(0, 0.5);
        descLabel.setPosition(xx + 65, this.m_nCelleHeight / 2 - 20);

        cell.addChild(descLabel);

        if (product.hot) {
            var hotSprite = new cc.Sprite("#shop_hot.png");
            hotSprite.setPosition(xx + 400, this.m_nCelleHeight / 2);
            cell.addChild(hotSprite);
        }

        //
        var item = new cc.MenuItemImage("#common_btn_lv.png", "#common_btn_lan.png", this.onProductClicked, this);
        item.setPosition(this.m_nCellWidth - 30, this.m_nCelleHeight / 2);
        item.setAnchorPoint(1, 0.5);
        item.scale = ZGZ.SCALE * 0.7;
        item.tag = idx;
        var itemSize = item.getContentSize();

        var text = "¥" + product.amount;
        var textLabel = new cc.LabelTTF(text, "Arial", 28);
        textLabel.color = cc.color.WHITE;
        textLabel.setAnchorPoint(0.5, 0.5);
        textLabel.setPosition(itemSize.width / 2, itemSize.height / 2);
        item.addChild(textLabel);

        var menu = new cc.Menu(item);
        menu.setPosition(0, 0);
        cell.addChild(menu);

        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return this.m_nCelleNum;
    },

    onProductClicked: function (sender) {

        var self = this;
        var tag = sender.tag;
        var shopList = this.data.shopList;
        var product = shopList[tag];

        //设置购买物品信息
        this.productId = product.id;

        //暂时iOS只支持苹果支付, 如果是安卓则接其他支付
        if (cc.sys.os == cc.sys.OS_IOS) {
            sdkbox.IAP.purchase(this.productId);
        } else {
            var paymentLayer = new PaymentLayer(this.productId);
            this.addChild(paymentLayer);
        }

    },




    paymentCallback: function () {


    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }
});

var ShopPropLayer = cc.Layer.extend({
    sprite: null,
    ctor: function (args) {


        this._super();
        this.data = args;

        var winSize = cc.director.getWinSize();
        var visibleOrigin = cc.director.getVisibleOrigin();
        var visibleSize = cc.director.getVisibleSize();


        //
        var iconImage = "#shop_dalibao.png";
        var icon = new cc.Sprite(iconImage);
        //icon.scale = 0.8;
        var iconSize = icon.getBoundingBox();

        var shopList = args.shopList;
        var cellH = iconSize.height + 10;
        var tabH = 60;
//init data
        this.m_pTableView = null;
        this.m_nTableWidth = visibleSize.width;
        this.m_nTableHeight = (cellH * shopList.length > (visibleSize.height - tabH)) ? (visibleSize.height - tabH) : (cellH * shopList.length);
        this.m_nCellWidth = visibleSize.width;
        this.m_nCelleHeight = cellH;
        this.m_nTableX = visibleOrigin.x;
        this.m_nTableY = visibleOrigin.y + visibleSize.height - tabH - this.m_nTableHeight;
        this.m_nCelleNum = shopList.length;

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
        var shopList = this.data.shopList;
        var product = shopList[idx];

        var xx = 15;
//bg
        var bg = new cc.Scale9Sprite("bg_cell.png", cc.rect(70, 10, 10, 10));
        bg.width = this.m_nCellWidth;
        bg.height = this.m_nCelleHeight;
        bg.setPosition(this.m_nCellWidth / 2, this.m_nCelleHeight / 2);
        cell.addChild(bg);
        //图标
        var itemImageString = "#shop_gift_" + product.icon + ".png";


        var icon = new cc.Sprite(itemImageString);
        icon.setPosition(xx, this.m_nCelleHeight / 2);
        icon.setAnchorPoint(0, 0.5);
        cell.addChild(icon);

        xx = xx + 150;


        //物品名称
        var nameLabel = new cc.LabelTTF(product.title, "Arial", 22);
        nameLabel.color = cc.color.WHITE;
        nameLabel.setAnchorPoint(0, 0.5);
        nameLabel.setPosition(60, icon.getContentSize().height / 2);
        icon.addChild(nameLabel);

        var innerIcon = null;
        if (product.title.indexOf('喇叭') > -1) {
            innerIcon= new cc.Sprite("#common_icon_laba.png");
            innerIcon.setAnchorPoint(0, 0.5);
            innerIcon.scale = 0.45;
            innerIcon.setPosition(xx + 55, this.m_nCelleHeight / 2 + 20);
            cell.addChild(innerIcon);
        }
        else if (product.title.indexOf('记牌器') > -1) {
            innerIcon= new cc.Sprite("#jipaiqi.png");
            innerIcon.setAnchorPoint(0, 0.5);
            innerIcon.scale = 0.45;
            innerIcon.setPosition(xx + 55, this.m_nCelleHeight / 2 + 20);
            cell.addChild(innerIcon);
        }

        ////+number
        //var goldLabel = new cc.LabelTTF('+' + zgzNumeral(product.gold).format('0,0'), "Arial", 20);
        //goldLabel.color = cc.color.YELLOW;
        //goldLabel.setAnchorPoint(0, 0.5);
        //goldLabel.setPosition(xx + 110, this.m_nCelleHeight / 2 + 20);
        //
        //cell.addChild(goldLabel);

        //DESC
        var descLabel = new cc.LabelTTF(product.desc, "Arial", 18);
        descLabel.color = cc.color.RED;
        descLabel.setAnchorPoint(0, 0.5);
        descLabel.setPosition(xx + 65, this.m_nCelleHeight / 2 - 20);

        cell.addChild(descLabel);

        if (product.hot) {
            var hotSprite = new cc.Sprite("#shop_hot.png");
            hotSprite.setPosition(xx + 400, this.m_nCelleHeight / 2);
            cell.addChild(hotSprite);
        }

        //
        var item = new cc.MenuItemImage("#common_btn_lv.png", "#common_btn_lan.png", this.onProductClicked, this);
        item.setPosition(this.m_nCellWidth - 30, this.m_nCelleHeight / 2);
        item.setAnchorPoint(1, 0.5);
        item.scale = ZGZ.SCALE * 0.7;
        item.tag = idx;
        var itemSize = item.getContentSize();

        var text = "¥" + product.amount;
        var textLabel = new cc.LabelTTF(text, "Arial", 28);
        textLabel.color = cc.color.WHITE;
        textLabel.setAnchorPoint(0.5, 0.5);
        textLabel.setPosition(itemSize.width / 2, itemSize.height / 2);
        item.addChild(textLabel);

        var menu = new cc.Menu(item);
        menu.setPosition(0, 0);
        cell.addChild(menu);

        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return this.m_nCelleNum;
    },

    onProductClicked: function (sender) {

        var self = this;
        var tag = sender.tag;
        var shopList = this.data.shopList;
        var product = shopList[tag];

        //设置购买物品信息
        this.productId = product.id;

        //暂时iOS只支持苹果支付, 如果是安卓则接其他支付
        if (cc.sys.os == cc.sys.OS_IOS) {
            sdkbox.IAP.purchase(this.productId);
        } else {
            var paymentLayer = new PaymentLayer(this.productId);
            this.addChild(paymentLayer);
        }

    },




    paymentCallback: function () {


    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
    }
});
