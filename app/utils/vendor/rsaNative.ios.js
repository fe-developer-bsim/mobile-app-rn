// // Function takes a string and resolves a promise with the encrypted string
// export const rsaEncode = (toEncrypt) => Promise.reject({
//   data: {
//     responseMessage: 'RSA encryption not implemented yet!'
//   },
//   toEncrypt
// });
//

import {NativeModules} from 'react-native';
import {publicRSAKey, publicRSAKeyNew} from '../../config/secure.config';

// Function takes a string and resolves a promise with the encrypted string
export const rsaEncode = (toEncrypt) => {
  const {RSAEncryptUtil = {}} = NativeModules;
  return new Promise((resolve, reject) => {
    try {
      const {getEncryptedString} = RSAEncryptUtil;
      getEncryptedString(toEncrypt, publicRSAKey, (err, d) => {
        if (err) {
          reject(err);
        }
        resolve(d);
      });
    } catch (err) {
      reject(err); // Failed to load the Native Module properly
    }
  });
};

export const rsaEncodeNew = (toEncrypt) => {
  const {RSAEncryptUtil = {}} = NativeModules;
  return new Promise((resolve, reject) => {
    try {
      const {getEncryptedString} = RSAEncryptUtil;
      getEncryptedString(toEncrypt, publicRSAKeyNew, (err, d) => {
        if (err) {
          reject(err);
        }
        resolve(d);
      });
    } catch (err) {
      reject(err); // Failed to load the Native Module properly
    }
  });
};
