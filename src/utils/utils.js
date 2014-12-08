var utils = {};
utils.getAvatar = function (avatar, type) {
    switch (type)
    {
        case 1:
            return avatars[avatar][0];

        default :
            return  avatars[avatar][1];
    }
}