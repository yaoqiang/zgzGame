var loadingLayer = function (data, opt) {
    var winSize = cc.director.getWinSize();
    var sg = new MaskLayer(false);

    var resultTxt = "加载中...";

    var bg = new cc.Sprite("");
    bg.setPosition(x, y);
    bg.scale = 0.5;
    sg.addChild(bg);

    var label = new cc.LabelTTF(resultTxt, "Arial", 34);
    label.color = cc.color.YELLOW;
    label.setPosition(winSize.width/2, winSize.height/2);
    sg.addChild(label);

    return sg;
};
