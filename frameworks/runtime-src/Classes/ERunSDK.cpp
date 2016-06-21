#include "ERunSDK.h"

#include "cocos2d_specifics.hpp"
#include "SDKBoxJSHelper.h"
#include "sdkbox/sdkbox.h"

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include <jni.h>
#include "platform/android/jni/JniHelper.h"
#include <cocos2d.h>
#endif


#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)


bool jsb_open_browser(JSContext *cx, uint32_t argc, jsval *vp) {

    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    if (argc == 1) {
        std::string arg0;

        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "jsb_open_browser : Error processing arguments");

        //
        cocos2d::JniMethodInfo methodInfo;
        
        
        bool isExist = cocos2d::JniHelper::getStaticMethodInfo(methodInfo, "org/cocos2dx/javascript/AppActivity", "getCurrentActivity", "()Ljava/lang/Object;");

        if (isExist)
        {

            jobject jobj = methodInfo.env->CallStaticObjectMethod(methodInfo.classID, methodInfo.methodID);

            bool isOpenBrowserExist = cocos2d::JniHelper::getMethodInfo(methodInfo, "org/cocos2dx/javascript/AppActivity", "openBrowser", "(Ljava/lang/String;)V");

            if (isOpenBrowserExist)
            {
                jstring jmsg = methodInfo.env->NewStringUTF(arg0.c_str());


                methodInfo.env->CallVoidMethod(jobj, methodInfo.methodID, jmsg);

            }


            methodInfo.env->DeleteLocalRef(methodInfo.classID);
        }

        args.rval().setUndefined();
        return true;
    }
    JS_ReportError(cx, "jsb_open_browser : wrong number of arguments");
    return false;
}


bool jsb_copy_string_to_clipboard(JSContext *cx, uint32_t argc, jsval *vp) {

    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    if (argc == 1) {
        std::string arg0;

        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "jsb_copy_string_to_clipboard : Error processing arguments");

        //
        cocos2d::JniMethodInfo methodInfo;


        bool isExist = cocos2d::JniHelper::getStaticMethodInfo(methodInfo, "org/cocos2dx/javascript/AppActivity", "getCurrentActivity", "()Ljava/lang/Object;");

        if (isExist)
        {

            jobject jobj = methodInfo.env->CallStaticObjectMethod(methodInfo.classID, methodInfo.methodID);

            bool isCopyStringToClipboardExist = cocos2d::JniHelper::getMethodInfo(methodInfo, "org/cocos2dx/javascript/AppActivity", "copyStringToClipboard", "(Ljava/lang/String;)V");

            if (isCopyStringToClipboardExist)
            {
                jstring jmsg = methodInfo.env->NewStringUTF(arg0.c_str());


                methodInfo.env->CallVoidMethod(jobj, methodInfo.methodID, jmsg);

            }


            methodInfo.env->DeleteLocalRef(methodInfo.classID);
        }

        args.rval().setUndefined();
        return true;
    }
    JS_ReportError(cx, "jsb_copy_string_to_clipboard : wrong number of arguments");
    return false;
}



#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS || CC_TARGET_PLATFORM == CC_PLATFORM_MAC)
bool jsb_open_browser(JSContext *cx, uint32_t argc, jsval *vp) {
    return true;
}

bool jsb_copy_string_to_clipboard(JSContext *cx, uint32_t argc, jsval *vp) {
    return true;
}

#endif


void register_jsb_erun_sdk_all(JSContext* cx, JS::HandleObject global) {
    JS::RootedObject pluginObj(cx);
    sdkbox::getJsObjOrCreat(cx, global, "erun", &pluginObj);

    JS_DefineFunction(cx, pluginObj, "openBrowser", jsb_open_browser, 1, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, pluginObj, "copyStringToClipboard", jsb_copy_string_to_clipboard, 1, JSPROP_READONLY | JSPROP_PERMANENT);

}