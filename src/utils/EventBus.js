var EventBus = {

    publish: function (eventName, data) {

        if (!gGameSceneCompleted) {
            if (eventName == gameEvents.JOIN) {
                EventQueue.addEventToQueue(eventName, data);
                return;
            }
        }

        cc.eventManager.dispatchCustomEvent(eventName, data);
    },

    subscribe: function (eventName, cb) {
        cc.eventManager.addCustomListener(eventName, function (event) {
            cb(event._userData);
        });
    },
    filter: function () {
        
    }

}