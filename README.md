zgzGame
=======

基于cocos2d-js的游戏客户端（大同扎股子）

===
install：
拷贝cocos2d-js目录下frameworks目录和tools目录到程序根目录；

===
based on cocos2d-js v3.10


===
Native编译时候需要在project.json的jsList数组第一行添加
"src/pomelo-cocos2d-jsb/index.js",



===
# Android打包命令
cocos compile -p android --android-studio --app-abi armeabi:armeabi-v7a -m release
cocos compile -p android --android-studio --app-abi armeabi:armeabi-v7a -m debug


## 适配IPv6
因工程基于cocos2d-js v3.10, 导致默认不支持IPv6
下载cocos2d最新第三方库:[https://github.com/cocos2d/cocos2d-x-3rd-party-libs-bin/releases] 当前为v107
把工程里framework/cocos2d-x/external/下的curl和websocket替换为第三方库的版本. 编译运行即可.
当前(2016.7.29)最新第三方库的websocket有bug,[http://forum.cocos.com/t/websocket/38447],需要关注社区尽快解决.