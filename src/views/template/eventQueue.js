var gCache = [];

var EventQueue = function(){
}

EventQueue.addEventToQueue = function (eventName, optionalUserData) {
    if(eventName == null || eventName == "") return true;

    var item = {event:eventName, data:optionalUserData};
    gCache.push(item);
};

EventQueue.dispatchEventFromQueue = function () {
    for (var i in gCache) {
        cc.eventManager.dispatchCustomEvent(i.event, i.data);
    }
    EventQueue.clearCache();
};

EventQueue.clearCache = function () {
    gCache = [];
};

EventQueue.dispatchCustomEvent = function (eventName, optionalUserData) {
    if(gGameSenceCompleted == false){
        EventQueue.addEventToQueue(eventName, optionalUserData);
        return;
    }
    cc.eventManager.dispatchCustomEvent(eventName, optionalUserData);
};