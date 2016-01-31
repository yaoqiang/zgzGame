var utils = utils || {};
utils.getAvatar = function (avatar, type) {
    switch (type)
    {
        case 1:
            return avatars[avatar][0];

        default :
            return  avatars[avatar][1];
    }
};

utils.getPercent = function (num, total) {
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
        return "-";
    }
    return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00 + "%");
}