import {NativeModules} from 'react-native';
import {publicRSAKey, publicRSAKeyNew} from '../../config/secure.config';

// Function takes a string and resolves a promise with the encrypted string
export const rsaEncode = (toEncrypt) => {
  const {RSAEncryptAndroid = {}} = NativeModules;
  return new Promise((resolve, reject) => {
    try {
      const {getRSAEncodedStr} = RSAEncryptAndroid;
      getRSAEncodedStr(toEncrypt, publicRSAKey, resolve);
    } catch (err) {
      reject(err); // Failed to load the Native Module properly
    }
  });
};

export const rsaEncodeNew = (toEncrypt) => {
  const {RSAEncryptAndroid = {}} = NativeModules;
  return new Promise((resolve, reject) => {
    try {
      const {getRSAEncodedStr} = RSAEncryptAndroid;
      getRSAEncodedStr(toEncrypt, publicRSAKeyNew, resolve);
    } catch (err) {
      reject(err); // Failed to load the Native Module properly
    }
  });
};
