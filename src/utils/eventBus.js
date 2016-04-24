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
        return cc.eventManager.addCustomListener(eventName, function (event) {
            cb(event._userData);
        });
    },

    removeSubscribe: function (listener) {
        cc.eventManager.removeListener(listener);
    },

    filter: function () {

    }

}