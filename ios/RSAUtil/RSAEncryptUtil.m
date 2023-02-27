//
//  RSAEncryptUtil.m
//  ubyapp
//
//  Created by Balasubramanya Ramananda on 03/04/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RSAEncryptUtil.h"
#import "RSAEncrypt.h"

@implementation RSAEncryptUtil

RCT_EXPORT_MODULE();

/* 
 * Method to be exported into RN
 */
RCT_EXPORT_METHOD(getEncryptedString:(NSString *)string publicKey:(NSString *)pubkey callback:(RCTResponseSenderBlock)callback) {
 
  NSString *ret = [RSAEncrypt encryptString:string publicKey:pubkey];
  
  // callback
  callback(@[[NSNull null], ret]);
  
}

@end
