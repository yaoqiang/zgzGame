var gMassageQueue = [];

var MassageQueue = {

    pushMassage : function (massage) {
        if(massage == null || massage == "") return false;
        gMassageQueue.push(massage);
    },

    shiftMassage : function () {
        return gMassageQueue.shift();
    },

    popMassage : function () {
        return gMassageQueue.pop();
    },
    clearAllMassage : function () {

        gMassageQueue = [];
    }

}