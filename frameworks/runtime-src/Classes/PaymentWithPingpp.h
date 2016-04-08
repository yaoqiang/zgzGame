#ifndef jsb_payment_pingpp_h
#define jsb_payment_pingpp_h


#include "jsapi.h"
#include "jsfriendapi.h"
#include "SDKBoxJSHelper.h"

#include "js_manual_conversions.h"



bool jsb_payment(JSContext *cx, uint32_t argc, jsval *vp);
//bool jsb_callback(JSContext *cx, JS::HandleObject obj);
void register_jsb_payment_pingpp(JSContext* cx, one_JSObject global);



#endif