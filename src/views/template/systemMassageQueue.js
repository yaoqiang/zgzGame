var gSystemMassageQueue = [];

var SystemMassageQueue = {

    pushMassage : function (massage) {
        if(massage == null || massage == "") return false;
        gSystemMassageQueue.push(massage);
    },

    shiftMassage : function () {
        return gSystemMassageQueue.shift();
    },

    popMassage : function () {
        return gSystemMassageQueue.pop();
    },
    clearAllMassage : function () {

        gSystemMassageQueue = [];
    }

}