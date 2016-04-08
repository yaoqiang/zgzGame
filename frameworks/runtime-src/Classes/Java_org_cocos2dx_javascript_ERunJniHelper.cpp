#include "ScriptingCore.h"

#include "ERunSDK.h"

//===================== android ======================

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)


#include <string>
#include "platform/android/jni/JniHelper.h"
#include <cocos2d.h>

#include "Java_org_cocos2dx_javascript_ERunJniHelper.h"

#include "base/ccUTF8.h"

#define  LOG_TAG    "Java_org_cocos2dx_javascript_ERunJniHelper.cpp"

#define  LOGD(...)  __android_log_print(ANDROID_LOG_DEBUG,LOG_TAG,__VA_ARGS__)



extern "C" {

    JNIEXPORT void JNICALL Java_org_cocos2dx_javascript_ERunJniHelper_processPaidFailed(JNIEnv*  env, jobject thiz, jstring result) {
        std::string str = cocos2d::JniHelper::jstring2string(result);


        std::string rStr = std::string("cppCallback_processPaidFailed") + std::string("(\"") + str + std::string("\");");
        

        ScriptingCore::getInstance()->evalString(rStr.c_str());
        
    }

}


#endif

