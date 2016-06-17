#import <Foundation/Foundation.h>

@interface NativeOcClass : NSObject
+(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content;
@end

@implementation NativeOcClass
+(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:content delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
    [alertView show];
    return true;
}

+(BOOL)callNativePasteboard:(NSString *) shortid{
    UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
    pasteboard.string = shortid;
    return true;
}
@end
