#ifndef jsb_erun_sdk_h
#define jsb_erun_sdk_h


#include "jsapi.h"
#include "jsfriendapi.h"
#include "SDKBoxJSHelper.h"

#include "js_manual_conversions.h"

//#include "ScriptingCore.h"


//jsbinding: javascript -> c++

bool jsb_open_browser(JSContext *cx, uint32_t argc, jsval *vp);

bool jsb_copy_string_to_clipboard(JSContext *cx, uint32_t argc, jsval *vp);


void register_jsb_erun_sdk_all(JSContext* cx, one_JSObject global);


////c++ -> javascript
//void runJavascriptFunction(std::string funcName, std::string args)
//{
//    std::string runScript = funcName + std::string("(\"") + args + std::string("\");");
//    
//    ScriptingCore::getInstance()->evalString(runScript.c_str());
//
//}


#endif