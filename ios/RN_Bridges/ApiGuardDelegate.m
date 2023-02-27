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

#import "ApiGuardDelegate.h"

@implementation ApiGuardDelegate

-(instancetype)init {
  self = [super init];
  return self;
}

-(void)log:(NSString *)logMsg {
  NSLog(@"APIGUARD: %@", logMsg);
}

-(Boolean)checkCertificates:(NSURLAuthenticationChallenge*) checker {
  return true;
}

@end
