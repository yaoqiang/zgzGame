
var CardRecognization = function(cardSeries, maxCardPoint, originalCard){
    // 牌型定义
    this.cardSeries = cardSeries;
    // 牌型中最大牌面（已求余）
    this.maxCardPoint = maxCardPoint;
    // 原始牌
    this.originalCard = originalCard;
}

