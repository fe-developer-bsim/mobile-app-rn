/**
 * Copyright (c) 2019 Shape Security, Inc. This source code and/or documentation is the confidential and copyrighted
 * property of Shape Security, Inc. All rights are reserved to Shape Security, Inc. The reproduction, preparation of
 * derivative works, distribution, public performance or public display of the source code and/or documentation is
 * not authorized unless expressly licensed.
 * Please contact
 *      Shape Security, Inc., Attn: Licensing Department,
 *      P.O. Box 772, Palo Alto, CA 94302
 *      licensing@shapesecurity.com
 *      650-399-0400
 * for information regarding commercial and/or trial license availability.
 */

#import "RN_APIGuard_Bridge.h"
#import "React/RCTBridgeModule.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
@import APIGuard;
#if RCT_DEV
#import <React/RCTDevLoadingView.h>
#endif

static NSString *apiGuardLogEventName = @"APIGuardLogEvent";

@interface RN_APIGuard_Bridge () <APIGuardDelegate>
@end

@implementation RN_APIGuard_Bridge

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

RCT_EXPORT_MODULE(APIGuard);

- (NSArray<NSString *> *)supportedEvents {
    return @[apiGuardLogEventName];
}

/**
 initialize -
 Initializes the Mobile SDK with a base config name. Call this function as early as possible;
 it must be called at least once for Mobile SDK to work. SDK initialization creates
 the resources needed to load current configuration file, schedule configuration updates, and tag SDK events.
 */
RCT_EXPORT_METHOD(initialize:(NSString *)filename withEnvironment:(NSString *) environment) {
  NSString *path = [[NSBundle mainBundle] pathForResource:filename ofType:@"json"];
  if (!path) {
    return;
  }
  
  // For SDK version 3.3.2 or below, APIGuard needs to be called on the main thread to be initalized.
  dispatch_async(dispatch_get_main_queue(), ^{
    [[APIGuard sharedInstance] initializeWithConfigFile:path withEnvironment:environment delegate:self];
  });
}

/**
 getRequestHeaders -
 This function returns the HTTP headers that the app must add to the request.

 @param NSString url - The url of the endpoint to protect.
 @param RCTResponseSenderBlock callback - block to be called whenever headers are ready.
 */
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getRequestHeaders:(NSString *)url) {  
  NSDictionary *headers = [[APIGuard sharedInstance] getRequestHeaders:url body:nil];  
return headers;
}

/**
 parseResponseHeaders -
 Parses response's headers
 
 @param NSDictionary headers - The response's headers
 */
RCT_EXPORT_METHOD(parseResponseHeaders:
                  (NSDictionary *)headers) {
  [[APIGuard sharedInstance] parseResponseHeaders:headers];
}

/**
 APIGuard delegate to log information of APIGuard SDK during initialization and while running.
 @param string The information reported by the APIGuard SDK.
 */
- (void)log:(NSString *)string {
  [self sendEventWithName:apiGuardLogEventName body:string];
}

/**
 APIGuard delegate to check the validity of certificates.
 @param challenge The Authentication Challenge
 */
- (BOOL)checkCertificates:(NSURLAuthenticationChallenge *)challenge {
  return true;
}

@end
