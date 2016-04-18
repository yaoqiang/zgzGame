var gFrameCache = {};

var FrameCache = {

    addSpriteFrames : function (path) {
        if(path == null || path == "") return false;
        var count = gFrameCache[path]?gFrameCache[path]:0;

        if(count == 0){
            console.log("cc.spriteFrameCache.addSpriteFrames: ", path);
            cc.spriteFrameCache.addSpriteFrames(path);
        }
        gFrameCache[path] = count + 1;
        console.log("addSpriteFrames: ",path," : ",gFrameCache[path]);
        return true;
    },

    removeSpriteFrames : function (path) {
        if(path == null || path == "") return false;
        var count = gFrameCache[path]?gFrameCache[path]:0;
        if(count == 0){
            return false;
        }
        gFrameCache[path] = count - 1;
        console.log("removeSpriteFrames: " ,path," : ",gFrameCache[path]);
        if(gFrameCache[path] == 0){
            console.log("cc.spriteFrameCache.removeSpriteFramesFromFile: ", path);
            cc.spriteFrameCache.removeSpriteFramesFromFile(path);
        }
    },

    clearAllSpriteFrames : function () {
        for(var key in gFrameCache) {//不使用过滤
            console.log(key,":",gFrameCache[key]);
            cc.spriteFrameCache.removeSpriteFramesFromFile(key);
        }
        gFrameCache = {};
    }

}

