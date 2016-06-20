var gMassageQueue = [];
var gHistoryMassage = [];

var MassageQueue = {

    pushMassage : function (massage) {
        if(massage == null || massage == "") return false;
        gMassageQueue.push(massage);

        gHistoryMassage.push(massage);
        if(gHistoryMassage.length > 5){
            gHistoryMassage.shift();
        }
    },

    shiftMassage : function () {
        return gMassageQueue.shift();
    },

    popMassage : function () {
        return gMassageQueue.pop();
    },
    clearAllMassage : function () {
        gHistoryMassage = [];
        gMassageQueue = [];
    }

}