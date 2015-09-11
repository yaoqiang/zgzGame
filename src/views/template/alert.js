var prompt = function(){
}

prompt.fade = function (txt, opts) {
    var s = cc.director.getWinSize();
    var label1 = new cc.LabelTTF(txt, "Arial", 28);

    label1.color = opts && opts.color || cc.color.YELLOW;

    var topBox = new cc.Sprite('#common_bg_shangfangtishi.png');
    topBox.setScale(0.8);
    topBox.setAnchorPoint(0.5, 0);
    topBox.setPosition(s.width/2, s.height);
    cc.director.getRunningScene().addChild(topBox);

    label1.setPosition(topBox.width/2, topBox.height/2 - 12);
    topBox.addChild(label1);
    var moveDown = cc.moveBy(opts && opts.duration || 2, cc.p(0, -50));
    var moveBack = moveDown.reverse();

    topBox.runAction(cc.sequence(moveDown, moveBack));

}