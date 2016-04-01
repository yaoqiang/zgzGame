var gCache = [];

var EventQueue = function(){
}

EventQueue.addEventToQueue = function (eventName, optionalUserData) {
    //if(gGameSceneCompleted == true){
    //    return false;
    //}
    if(eventName == null || eventName == "") return false;

    var item = {event:eventName, data:optionalUserData};
    gCache.push(item);

    return true;
};

EventQueue.dispatchEventFromQueue = function () {
    for (var i in gCache) {
        cc.eventManager.dispatchCustomEvent(gCache[i].event, gCache[i].data);
    }
    EventQueue.clearCache();
};

EventQueue.clearCache = function () {
    gCache = [];
};

EventQueue.dispatchCustomEvent = function (eventName, optionalUserData) {
    if(gGameSceneCompleted == false){
        EventQueue.addEventToQueue(eventName, optionalUserData);
        return;
    }
    cc.eventManager.dispatchCustomEvent(eventName, optionalUserData);
};