#include <sys/socket.h> // Per msqr
#include <sys/sysctl.h>
#include <net/if.h>
#include <net/if_dl.h>

#import <Foundation/Foundation.h>
#import "Pingpp.h"

#warning \
URL Schemes 需要在 Xcode 的 Info 标签页的 URL Types 中添加，\
需要你自定义（不能使用 "alipay", "wx", "wechat" 等等这些），首字母必须是英文字母，支持英文和数字，不建议使用特殊符号。\
如果这个不设置，可能会导致支付完成之后，无法跳转回 App 或者无法得到结果回调。\
对于微信支付来说，必须添加一项值为微信平台上注册的应用程序 id（"wx" 开头的字符串）作为 URL Scheme。
#define kUrlScheme      @"wxdd0d80915f7054e5" // 这个是你定义的 URL Scheme，支付宝、微信支付、银联和测试模式需要。


@interface NativeOcClass : NSObject
+(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content;
@end

@implementation NativeOcClass
+ (BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:content delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
    [alertView show];
    return true;
}

+ (BOOL)callNativePasteboard:(NSString *) shortid{
    UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
    pasteboard.string = shortid;
    return true;
}

+ (void)callNativecreatePingppPayment:(NSString *) charge {
    [Pingpp createPayment:charge
             appURLScheme:kUrlScheme
           withCompletion:^(NSString *result, PingppError *error) {
               NSLog(@"completion block: %@", result);
               if (error == nil) {
                   NSLog(@"PingppError is nil");
               } else {
                   NSLog(@"PingppError: code=%lu msg=%@", (unsigned  long)error.code, [error getMsg]);
               }
               if ([result  isEqual: @"cancel"]) {
                   UIAlertView* mAlert = [[UIAlertView alloc] initWithTitle:@"提示" message:@"您已取消订单" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil, nil];
                   [mAlert show];
               }
               else if ([result isEqual: @"fail"]) {
                   UIAlertView* mAlert = [[UIAlertView alloc] initWithTitle:@"提示" message:@"充值失败,请联系客服" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil, nil];
                   [mAlert show];
               }
               
               
               NSLog(@"Pingpp payment OK..");
               
           }];
}

+ (void)showAlertMessage:(NSString*)msg
{
    
}

@end
