///////////////////////////////////////////////
// 定义全局函数用来处理C++回调
//////////////////////////////////////////////

function cppCallback_processPaidFailed(result) {
    //console.log('-------cppCallback_processPaidFailed-------');
    //console.log(result);
    UniversalController.payment4PingppFromClient(result, function () {
        //console.log('payment4PingppFromClient finished..');
    });
}