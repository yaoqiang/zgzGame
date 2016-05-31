var ChatInGameLayer = function () {
    return this.ctor();
}

ChatInGameLayer.prototype = {
    ctor: function () {

        this.selected = 0;
        this.rightBox = null;
        this.trumpetVal = 0;

        var winSize = cc.director.getWinSize();

        this.box = new DialogSmall_T('聊 天', 1, null, null, 0.4);

        var boxSize = this.box.bg.getBoundingBox();

        //nav tab
        this.initNavTab();



        this.initRightBox(this.selected);

        return this.box;
    },

    initNavTab: function () {
        var x = 130, y = 380;


        var quickChatButton = null;
        //常用语
        var quickChatLabel = new cc.LabelTTF("常用语", "AmericanTypewriter", 36);
        var quickChatLabelSelected = new cc.LabelTTF("常用语", "AmericanTypewriter", 36);
        var quickChatLabelDisabled = new cc.LabelTTF("常用语", "AmericanTypewriter", 36);
        if (this.selected == 0) {
            var quickChatNormal = new cc.Sprite("#common_btn_qianwang.png");
            quickChatNormal.addChild(quickChatLabel);
            quickChatLabel.x = quickChatNormal.getContentSize().width/2;
            quickChatLabel.y = quickChatNormal.getContentSize().height/2;

            var quickChatSelected = new cc.Sprite("#common_btn_qianwang.png");
            quickChatSelected.addChild(quickChatLabelSelected);
            quickChatLabelSelected.x = quickChatSelected.getContentSize().width/2;
            quickChatLabelSelected.y = quickChatSelected.getContentSize().height/2;

            var quickChatDisabled = new cc.Sprite("#common_btn_qianwang.png");
            quickChatDisabled.addChild(quickChatLabelDisabled);
            quickChatLabelDisabled.x = quickChatDisabled.getContentSize().width/2;
            quickChatLabelDisabled.y = quickChatDisabled.getContentSize().height/2;

            quickChatButton = new cc.MenuItemSprite(quickChatNormal, quickChatSelected, quickChatDisabled, this.onQuickChatClick, this);
        } else {
            quickChatButton = new cc.MenuItemSprite(quickChatLabel, quickChatLabelSelected, quickChatLabelDisabled, this.onQuickChatClick, this);
        }


        var expressChatButton = null;
        //表情
        var expressChatLabel = new cc.LabelTTF("表 情", "AmericanTypewriter", 36);
        var expressChatLabelSelected = new cc.LabelTTF("表 情", "AmericanTypewriter", 36);
        var expressChatLabelDisabled = new cc.LabelTTF("表 情", "AmericanTypewriter", 36);
        if (this.selected == 1) {
            var expressChatNormal = new cc.Sprite("#common_btn_qianwang.png");
            expressChatNormal.addChild(expressChatLabel);
            expressChatLabel.x = expressChatNormal.getContentSize().width/2;
            expressChatLabel.y = expressChatNormal.getContentSize().height/2;

            var expressChatSelected = new cc.Sprite("#common_btn_qianwang.png");
            expressChatSelected.addChild(expressChatLabelSelected);
            expressChatLabelSelected.x = expressChatSelected.getContentSize().width/2;
            expressChatLabelSelected.y = expressChatSelected.getContentSize().height/2;

            var expressChatDisabled = new cc.Sprite("#common_btn_qianwang.png");
            expressChatDisabled.addChild(expressChatLabelDisabled);
            expressChatLabelDisabled.x = expressChatDisabled.getContentSize().width/2;
            expressChatLabelDisabled.y = expressChatDisabled.getContentSize().height/2;

            expressChatButton = new cc.MenuItemSprite(expressChatNormal, expressChatSelected, expressChatDisabled, this.onExpressChatClick, this);
        } else {
            expressChatButton = new cc.MenuItemSprite(expressChatLabel, expressChatLabelSelected, expressChatLabelDisabled, this.onExpressChatClick, this);
        }


        //喇叭
        var trumpetChatButton = null;
        //表情
        var trumpetChatLabel = new cc.LabelTTF("小喇叭", "AmericanTypewriter", 36);
        var trumpetChatLabelSelected = new cc.LabelTTF("小喇叭", "AmericanTypewriter", 36);
        var trumpetChatLabelDisabled = new cc.LabelTTF("小喇叭", "AmericanTypewriter", 36);
        if (this.selected == 2) {
            var trumpetChatNormal = new cc.Sprite("#common_btn_qianwang.png");
            trumpetChatNormal.addChild(trumpetChatLabel);
            trumpetChatLabel.x = trumpetChatNormal.getContentSize().width/2;
            trumpetChatLabel.y = trumpetChatNormal.getContentSize().height/2;

            var trumpetChatSelected = new cc.Sprite("#common_btn_qianwang.png");
            trumpetChatSelected.addChild(trumpetChatLabelSelected);
            trumpetChatLabelSelected.x = trumpetChatSelected.getContentSize().width/2;
            trumpetChatLabelSelected.y = trumpetChatSelected.getContentSize().height/2;

            var trumpetChatDisabled = new cc.Sprite("#common_btn_qianwang.png");
            trumpetChatNormal.addChild(trumpetChatLabelDisabled);
            trumpetChatLabelDisabled.x = trumpetChatDisabled.getContentSize().width/2;
            trumpetChatLabelDisabled.y = trumpetChatDisabled.getContentSize().height/2;

            trumpetChatButton = new cc.MenuItemSprite(trumpetChatNormal, trumpetChatSelected, trumpetChatDisabled, this.onTrumpetChatClick, this);
        } else {
            trumpetChatButton = new cc.MenuItemSprite(trumpetChatLabel, trumpetChatLabelSelected, trumpetChatLabelDisabled, this.onTrumpetChatClick, this);
        }


        if (this.chatMenu) {
            this.chatMenu.removeFromParent(true);
            this.chatMenu = null;
        }
        this.chatMenu = new cc.Menu(quickChatButton, expressChatButton, trumpetChatButton);
        this.chatMenu.alignItemsVertically();
        this.chatMenu.alignItemsVerticallyWithPadding(50);
        this.chatMenu.setPosition(x, y);

        this.box.bg.addChild(this.chatMenu, 2);


    },

    initRightBox: function (tag) {
        if (this.rightBox) {
            this.rightBox.removeFromParent(true);
            this.rightBox = null;
        }

        switch (tag) {
            case 0:
                this.initQuickChatBox();
                break;
            case 1:
                this.initExpressChatBox();
                break;
            case 2:
                this.initTrumpetChatBox();
                break;
        }
    },

    initQuickChatBox: function () {
        this.quickChatArray = ChatConf.quick;

        // Create the list view
        this.rightBox = new ccui.ListView();
        // set list view ex direction
        this.rightBox.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.rightBox.setTouchEnabled(true);
        this.rightBox.setBounceEnabled(true);
        this.rightBox.setBackGroundImage("common_bg_mianban_touming_40.png", ccui.Widget.PLIST_TEXTURE);
        this.rightBox.setBackGroundImageScale9Enabled(true);
        this.rightBox.setContentSize(cc.size(700, 500));
        this.rightBox.x = 250;
        this.rightBox.y = 50;
        this.rightBox.addEventListener(this.doQuickChat, this);
        this.box.bg.addChild(this.rightBox);

        // create model
        var default_button = new ccui.Button();
        default_button.setName("TextButton");
        default_button.setTouchEnabled(true);
        default_button.loadTextures("common_btn_4.png", "common_btn_3.png", "", ccui.Widget.PLIST_TEXTURE);

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
        var count = this.quickChatArray.length;

        //
        // add custom item
        for (var i = 0; i < count; ++i) {
            var labelContent = new cc.LabelTTF(this.quickChatArray[i], "Arial", 44);
            labelContent.color = {r:218, g:112, b:214};
            labelContent.setContentSize(cc.size(200, 100));

            var custom_item = new ccui.Layout();
            custom_item.setContentSize(labelContent.getContentSize());
            custom_item.width = this.rightBox.width;
            labelContent.x = custom_item.width / 2;
            labelContent.y = custom_item.height / 2;
            custom_item.addChild(labelContent);
            custom_item.setTouchEnabled(true);

            var separatorLine = new cc.Sprite("#split_line.png");
            separatorLine.x = custom_item.width / 2;
            separatorLine.y = -3;
            separatorLine.scaleX = 2.5;
            custom_item.addChild(separatorLine);


            this.rightBox.pushBackCustomItem(custom_item);
        }


        // set all items layout gravity
        this.rightBox.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);

        this.rightBox.setItemsMargin(30);

    },

    initExpressChatBox: function () {
        this.rightBox = new cc.Layer();
        this.expressChatArray = ChatConf.express;


        // add default item
        var count = this.expressChatArray.length;


        //
        // add custom item
        var col = 4, currentIndex = 0;
        var cellWidth = 700 / col;
        var row = Math.ceil(count/col);
        //Browser和Native这里显示有偏差
        var expX = cc.sys.isNative ? 250 : 300;
        var expY = cc.sys.isNative ? 125 : 145;
        for (var i = 1; i <= row; ++i) {

            for (var j = 1; j <= col; j++) {
                if (currentIndex == count) break;

                var expSprite = new ccui.Button(""+this.expressChatArray[currentIndex]+"1.png", "", "", ccui.Widget.PLIST_TEXTURE);
                expSprite.setContentSize(cc.size(150, 150));
                expSprite.setTag(currentIndex);
                expSprite.scale = 1.5;
                expSprite.addTouchEventListener(this.doExpressChat, this);

                expSprite.x =  cellWidth * j - cellWidth / 2 + expX;
                expSprite.y = (row + 1 - i) * expY;

                this.rightBox.addChild(expSprite);

                currentIndex++;

            }

        }

        this.box.bg.addChild(this.rightBox);

    },

    editBoxEditingDidBegin: function (editBox) {
        cc.log("editBox " + this._getEditBoxName(editBox) + " DidBegin !");
    },

    editBoxEditingDidEnd: function (editBox) {
        cc.log("editBox " + this._getEditBoxName(editBox) + " DidEnd !");
    },

    editBoxTextChanged: function (editBox, text) {
        cc.log("editBox " + this._getEditBoxName(editBox) + ", TextChanged, text: " + text);
    },

    editBoxReturn: function (editBox) {
        cc.log("editBox " + this._getEditBoxName(editBox) + " was returned !");
    },

    _getEditBoxName :function(editBox){
        if (this.trumpetContent == editBox) {
            return "trumpetContent";
        }
        return "Unknown EditBox";
    },

    initTrumpetChatBox: function () {
        this.rightBox = new cc.Layer();
        var bgScale = this.box.bgScale;
        var bgRect = this.box.bg.getBoundingBox();

        var trumpetHeaderIcon = new cc.Sprite("#common_icon_laba_2.png");
        trumpetHeaderIcon.scale = 1.5*bgScale;
        trumpetHeaderIcon.setPosition(bgRect.x + 300*bgScale, bgRect.y + 490*bgScale);
        this.rightBox.addChild(trumpetHeaderIcon);

        var blockSize = cc.size(480*bgScale, 80*bgScale);
        //this.trumpetContent = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        //this.trumpetContent.setPlaceHolder('小喇叭内容');
        //this.trumpetContent.setFontColor(cc.color.BLACK);
        //this.trumpetContent.setFont("Arial", 30);
        //this.trumpetContent.setPosition(520, 400);
        //this.trumpetContent.color = cc.color.WHITE;
        //this.trumpetContent.setMaxLength(20);
        //this.rightBox.addChild(this.trumpetContent);

        this.trumpetContent = new cc.EditBox(blockSize, new cc.Scale9Sprite("common_shurukuang.png", cc.rect(14, 14, 25, 29)));
        //this.trumpetContent.setString("EditBox Sample");
        this.trumpetContent.x = bgRect.x + 520*bgScale;
        this.trumpetContent.y = bgRect.y + 420*bgScale;
        //this.trumpetContent.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.trumpetContent.setFontColor(cc.color.BLACK);
        this.trumpetContent.setFont("Arial", 36*bgScale);
       // this.trumpetContent.color = cc.color.WHITE;
        this.trumpetContent.setPlaceHolder('小喇叭内容');
        this.trumpetContent.setMaxLength(20);
        this.trumpetContent.setPlaceholderFontColor(cc.color.WHITE);
        this.trumpetContent.setDelegate(this);
        this.rightBox.addChild(this.trumpetContent);

        //btn
        var btnTrumpet = new ccui.Button("common_btn_lv.png", "common_btn_lv.png", "common_btn_lv.png", ccui.Widget.PLIST_TEXTURE);
        btnTrumpet.setPosition(bgRect.x+ 850*bgScale, bgRect.y + 420*bgScale);
        btnTrumpet.setTitleText("发送");
        btnTrumpet.setTitleFontSize(30);
        btnTrumpet.scale = bgScale;
        btnTrumpet.addTouchEventListener(this.doTrumpetChat, this);
        this.rightBox.addChild(btnTrumpet);






        var self = this;

        //当前玩家喇叭情况, 如果没有则显示快捷购买喇叭
        UniversalController.getMyItemList(function (data) {

            if (data.code != RETURN_CODE.OK) {
                return;
            }

            if (data.itemList.length == 0) {
                self.trumpetVal = 0;
            }

            _.each(data.itemList, function (item) {
                if (item.id == 2) {
                    self.trumpetVal = item.value;
                }
            });

            if (self.trumpetVal > 0) {
                self.trumpetCountString = new cc.LabelTTF('您还有' + self.trumpetVal + "个", "AmericanTypewriter", 34*bgScale);
                self.trumpetCountString.setPosition(bgRect.x + 480*bgScale, bgRect.y + 170*bgScale);
                self.trumpetCountString.color = {r: 0, g: 255, b: 127};
                self.rightBox.addChild(self.trumpetCountString);

                //
                var trumpetCountIcon = new cc.Sprite("#common_icon_laba.png");
                trumpetCountIcon.scale = 0.8*bgScale;
                trumpetCountIcon.setPosition(bgRect.x + 350*bgScale, bgRect.y + 170*bgScale);
                self.rightBox.addChild(trumpetCountIcon);
            }
            else {
                var trumpetCountString = new cc.LabelTTF("您当前没有小喇叭, 可前往商城购买", "AmericanTypewriter", 34*bgScale);
                trumpetCountString.setPosition(bgRect.x + 550*bgScale, bgRect.y + 170*bgScale);
                trumpetCountString.color = cc.color.RED;
                self.rightBox.addChild(trumpetCountString);
            }


        });


        this.box.addChild(this.rightBox);
    },

    onTabChange: function (index) {
        if (this.selected == index) return;

        this.selected = index;
        playEffect(audio_common.Button_Click);
        //
        this.initNavTab();

        this.initRightBox(this.selected);
    },

    onQuickChatClick: function () {
        this.onTabChange(0);

    },

    onExpressChatClick: function () {
        this.onTabChange(1);
    },

    onTrumpetChatClick: function () {
        this.onTabChange(2);
    },

    doQuickChat: function (sender, type) {
        //cc.log(type)
        switch (type) {
            case ccui.ListView.EVENT_SELECTED_ITEM:
                var listViewEx = sender;
                //cc.log("select child index = " + listViewEx.getCurSelectedIndex());
                break;
            case ccui.ListView.ON_SELECTED_ITEM_END:
                var listViewEx = sender;
                var item = listViewEx.getCurSelectedIndex();
                var now = (new Date()).format('yyyy-MM-dd hh:mm:ss');
                if (!this.lastQuickChatShortTime) {
                    this.lastQuickChatShortTime = (new Date()).format('yyyy-MM-dd hh:mm:ss');

                    GameController.chat(GAME.CHAT.SCOPE_GAME, GAME.CHAT.TYPE_QUICK, item, "");
                }
                else {
                    if (getDateDiff(this.lastQuickChatShortTime, now, 'second') > 5) {
                        this.lastQuickChatShortTime = (new Date()).format('yyyy-MM-dd hh:mm:ss');
                        GameController.chat(GAME.CHAT.SCOPE_GAME, GAME.CHAT.TYPE_QUICK, item, "");
                    }
                    else {
                        prompt.fadeMiddle('您说话太快啦!');
                    }
                }


                //bug on Native!!!
                //this.box.removeFromParent(true);
                break;
            default:
                break;
        }
    },

    doExpressChat: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;

            case ccui.Widget.TOUCH_MOVED:
                break;

            case ccui.Widget.TOUCH_ENDED:
                var item = sender.getTag();
                GameController.chat(GAME.CHAT.SCOPE_GAME, GAME.CHAT.TYPE_EXP, item, "");
                this.box.removeFromParent(true);
                break;

            case ccui.Widget.TOUCH_CANCELED:
                break;

            default:
                break;
        }
    },
    
    doTrumpetChat: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;

            case ccui.Widget.TOUCH_MOVED:
                break;

            case ccui.Widget.TOUCH_ENDED:

                if (this.trumpetVal == 0) {
                    prompt.fadeMiddle('您没有小喇叭,可在商城购买后使用');
                    return;
                }

                var content = this.trumpetContent.getString();
                if (content == '') {
                    prompt.fadeMiddle('请输入喇叭内容');
                    return;
                }

                this.trumpetVal -= 1;
                this.trumpetCountString.setString('您还有'+this.trumpetVal+'个');
                GameController.chat(GAME.CHAT.SCOPE_ALL, '', '', content);
                this.box.removeFromParent(true);

                break;

            case ccui.Widget.TOUCH_CANCELED:
                break;

            default:
                break;
        }
    }
}