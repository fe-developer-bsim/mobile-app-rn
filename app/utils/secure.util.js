import {ENV} from '../config/env.config';
import RSAEngine from './vendor/hsmEncryption/rsa_jso';
import SHA256 from 'crypto-js/sha256';
import {rsaEncode, rsaEncodeNew} from './vendor/rsaNative';
import {deviceInfo} from './device.util';
import {get as getKey, set as setKey, storageKeys} from './storage.util';
import uuidV4 from 'uuid/v4';
import {setAPIPayloadParam} from '../state/actions/index.actions';

let rsa = null;

export const initializeRSA = (publicKey, sessionId, E2EE_RANDOM) => {
  rsa = new RSAEngine();
  return rsa.init(publicKey, sessionId, E2EE_RANDOM);
};

export function encryptText (str) {
  if (ENV === 'production') {
    if (!rsa) {
      return new Error({
        'error': 'RSA Not Found. Cannot Encrypt'
      });
    }
    return rsa.encryptPIN1(str);
  }
  return str;
}

export function encryptNewText (oldStr, newStr) {
  if (ENV === 'production') {
    if (!rsa) {
      return new Error({
        'error': 'RSA Not Found. Cannot Encrypt'
      });
    }
    return rsa.encryptPIN2(oldStr, newStr);
  }
  return newStr;
}

export function encryptSHA256 (text) {
  return SHA256(text).toString();
}

export function encryptATMString (ATMString) {
  return rsaEncode(ATMString); // returns a promise
}

export function encryptEFormString (EFormString) {
  return rsaEncodeNew(EFormString); // returns a promise
}
export function encryptATMStringVCC (ATMString) {
  return rsaEncodeNew(ATMString); // returns a promise
}


export const generateClientToken = (dispatch) => {
  const clientToken = encryptSHA256(deviceInfo.id);
  return getKey(storageKeys['TOKEN_CLIENT']).then((ct) => {
    if (ct) {
      dispatch(setAPIPayloadParam({tokenClient: ct}));
    } else {
      setKey(storageKeys['TOKEN_CLIENT'], clientToken).then(() => {
        dispatch(setAPIPayloadParam({tokenClient: clientToken}));
      });
    }
  });
};

export const generateServerToken = (dispatch) => getKey(storageKeys['TOKEN_SERVER']).then((st) => {
  if (st) {
    dispatch(setAPIPayloadParam({tokenServer: st}));
  }
});

export const generateSessionCode = (dispatch) => getKey(storageKeys['SESSION_CODE']).
  then((existingSessionCode) => {
    if (existingSessionCode) {
      dispatch(setAPIPayloadParam({sessionCode: existingSessionCode}));
      return existingSessionCode;
    } else {
      const newSessionCode = uuidV4();
      return setKey(storageKeys['SESSION_CODE'], newSessionCode).then(() => {
        dispatch(setAPIPayloadParam({sessionCode: newSessionCode}));
        return newSessionCode;
      });
    }
  });
