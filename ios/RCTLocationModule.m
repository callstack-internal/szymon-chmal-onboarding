#import "RCTLocationModule.h"

@implementation RCTLocationModule
 
RCT_EXPORT_METHOD(getLocation:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  self.resolveBlock = resolve;
  self.rejectBlock = reject;
  
  if ([CLLocationManager locationServicesEnabled]) {
    dispatch_async(dispatch_get_main_queue(), ^{
        self.locationManager = [[CLLocationManager alloc] init];
        self.locationManager.delegate = self;
        self.locationManager.desiredAccuracy = kCLLocationAccuracyKilometer;

        CLAuthorizationStatus status = [CLLocationManager authorizationStatus];
        if (status == kCLAuthorizationStatusNotDetermined) {
          [self.locationManager requestWhenInUseAuthorization];
        } else if (status == kCLAuthorizationStatusDenied || status == kCLAuthorizationStatusRestricted) {
          reject(@"no_permission", @"Location permission denied", nil);
          return;
        } else {
          [self.locationManager startUpdatingLocation];
        }
    });
  }  else {
    reject(@"no_location_services", @"Location services were disabled", nil);
  }
}

- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status {
  if (status == kCLAuthorizationStatusAuthorizedWhenInUse || status == kCLAuthorizationStatusAuthorizedAlways) {
    [self.locationManager startUpdatingLocation];
  } else if (status == kCLAuthorizationStatusDenied || status == kCLAuthorizationStatusRestricted) {
    if (self.rejectBlock) {
      self.rejectBlock(@"no_permission", @"Location permission denied", nil);
      self.resolveBlock = nil;
      self.rejectBlock = nil;
    }
  }
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations {
  CLLocation* location = [locations lastObject];
    if (location) {
      NSDictionary* locationData = @{
        @"lat": @(location.coordinate.latitude),
        @"lng": @(location.coordinate.longitude)
      };
      if (self.resolveBlock) {
        self.resolveBlock(locationData);
        self.resolveBlock = nil;
        self.rejectBlock = nil;
      }
      [self.locationManager stopUpdatingLocation];
    }
}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error {
  if (self.rejectBlock) {
    self.rejectBlock(@"location_error", @"Failed to get location", error);
    self.resolveBlock = nil;
    self.rejectBlock = nil;
  }
}

RCT_EXPORT_MODULE();

@end
