var gCache = [];

var EventQueue = function(){
}

EventQueue.addEventToQueue = function (eventName, optionalUserData) {
    if(gGameSenceCompleted == true){
        console.log("-----> No addEventToQueue");
        return false;
    }
    if(eventName == null || eventName == "") return false;

    var item = {event:eventName, data:optionalUserData};
    gCache.push(item);
    console.log("----->    addEventToQueue");
    return true;
};

EventQueue.dispatchEventFromQueue = function () {
    for (var i in gCache) {
        cc.eventManager.dispatchCustomEvent(gCache[i].event, gCache[i].data);
        console.log("----->dispatchEventFromQueue");
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