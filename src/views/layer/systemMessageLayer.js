var SystemMessageLayer = function (data) {
    return this.ctor(data);
}

SystemMessageLayer.prototype = {
    ctor: function (data) {

        var winSize = cc.director.getWinSize();
        this.data = data;

        this.box = new DialogMiddle('我的消息', 1, null);


        //init
        this.init();

        return this.box;
    },

    init: function () {
        var winSize = cc.director.getWinSize();

        if (this.data.systemMessageList == null || this.data.systemMessageList == undefined) {
            return;
        }

        if (this.data.systemMessageList.length == 0) {
            return;
        }


        // Create the list view
        this.rightBox = new ccui.ListView();
        // set list view ex direction
        this.rightBox.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.rightBox.setTouchEnabled(true);
        this.rightBox.setBounceEnabled(true);
        //this.rightBox.setBackGroundImage("common_bg_mianban_touming_40.png", ccui.Widget.PLIST_TEXTURE);
        this.rightBox.setBackGroundImageScale9Enabled(true);
        this.rightBox.setContentSize(cc.size(900, 520));
        this.rightBox.x = 40;
        this.rightBox.y = 45;
        //this.rightBox.addEventListener(this.doQuickChat, this);
        this.box.bg.addChild(this.rightBox);

        // create model
        var default_button = new ccui.Button();
        default_button.setScale9Enabled(true);
        default_button.setCapInsets(cc.rect(70, 10, 10, 10));
        default_button.setContentSize(880, 120);
        default_button.setName("BgButton");
        default_button.setTouchEnabled(true);
        default_button.loadTextures("readBtnBg.png", "readBtnBg.png", "", ccui.Widget.PLIST_TEXTURE);

        var default_item = new ccui.Layout();
        default_item.setTouchEnabled(true);
        default_item.setContentSize(default_button.getContentSize());
        default_item.width = this.rightBox.width;
        default_button.x = default_item.width / 2;
        default_button.y = default_item.height / 2;
        default_item.addChild(default_button);

        // set model
        this.rightBox.setItemModel(default_item);

        // add default item
        var count = this.data.systemMessageList.length;

        //
        // add custom item
        for (var i = 0; i < count; ++i) {

            var labelTitle = new cc.LabelTTF(this.data.systemMessageList[i].title, "Arial", 34);
            var labelContent = new cc.LabelTTF(this.data.systemMessageList[i].content, "Arial", 28);
            var labelDate = new cc.LabelTTF(new Date(this.data.systemMessageList[i].createdAt).format('yyyy-MM-dd'), "Arial", 28);
            labelTitle.color = {r:47, g:79, b:79};
            //labelTitle.color = {r:220, g:20, b:60};

            var custom_button = new ccui.Button();
            custom_button.setName("TextButton");
            custom_button.setTouchEnabled(true);
            custom_button.setScale9Enabled(true);
            custom_button.loadTextures("readBtnBg.png", "readBtnBg.png", "", ccui.Widget.PLIST_TEXTURE);
            custom_button.setContentSize(default_button.getContentSize());

            //icon
            var icon = new cc.Sprite('#system_flag.png');
            icon.x = 30;
            icon.y = custom_button.getContentSize().height/2+15;
            custom_button.addChild(icon);


            //
            labelTitle.x = 70;
            labelTitle.y = custom_button.getContentSize().height/2 + 30;
            labelTitle.setAnchorPoint(0, 0.5);
            custom_button.addChild(labelTitle);

            labelDate.x = custom_button.getContentSize().width - 18;
            labelDate.y = custom_button.getContentSize().height/2 + 30;
            labelDate.setAnchorPoint(1, 0.5);
            custom_button.addChild(labelDate);


            labelContent.x = 70;
            labelContent.y = custom_button.getContentSize().height/2 - 30;
            labelContent.setAnchorPoint(0, 0.5);
            custom_button.addChild(labelContent);



            var custom_item = new ccui.Layout();
            custom_item.setContentSize(custom_button.getContentSize());
            custom_item.width = this.rightBox.width;
            custom_button.x = custom_item.width / 2;
            custom_button.y = custom_item.height / 2;
            custom_item.addChild(custom_button);
            custom_item.setTouchEnabled(true);

            //var separatorLine = new cc.Sprite("#split_line.png");
            //separatorLine.x = custom_item.width / 2;
            //separatorLine.y = -3;
            //separatorLine.scaleX = 2.5;
            //custom_item.addChild(separatorLine);


            this.rightBox.pushBackCustomItem(custom_item);
        }


        // set all items layout gravity
        this.rightBox.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);

        this.rightBox.setItemsMargin(30);

    }
}