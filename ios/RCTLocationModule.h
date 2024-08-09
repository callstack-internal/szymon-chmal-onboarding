#import <React/RCTBridgeModule.h>
#import <CoreLocation/CoreLocation.h>

@interface RCTLocationModule : NSObject <RCTBridgeModule, CLLocationManagerDelegate>
  @property (nonatomic, strong) CLLocationManager *locationManager;
  @property (nonatomic, copy) RCTPromiseResolveBlock resolveBlock;
  @property (nonatomic, copy) RCTPromiseRejectBlock rejectBlock;
@end
