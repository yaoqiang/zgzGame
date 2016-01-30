var EventBus = {

    publish: function (eventName, data) {
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