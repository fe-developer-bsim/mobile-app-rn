import * as Http from './http.util';
import {set as setKey, storageKeys, removeInitKeys} from '../utils/storage.util';
import {encryptText, encryptATMString, encryptEFormString, encryptATMStringVCC} from '../utils/secure.util';
import {setAPIPayloadParam} from '../state/actions/index.actions';
import {result} from 'lodash';
import {ENV} from '../config/env.config';

const permitShapeprotect = ENV === 'production'; // for shape config to activate , always active with env = prod

const resetDefaultPayload = (dispatch) => removeInitKeys().then(() => {
  dispatch(setAPIPayloadParam({tokenServer: ''}));
});

const retrieveHSMInitKeys = (dispatch) => Http.post('HSM_INIT', {'requestInitHsm': 'send'},
  {additional: ['TXID', 'sessionCode'], 'baseURL': 'https://www.banksinarmas.com/PersonalBanking/rest'},  dispatch);

const login = ({username = '', password, easyPin, smsPriority, OBMParameter, deviceInfoLogin, faceRecognition, orientation, flipImage, versionScope, billpayMethodType}, isLockedDevice, dispatch) => {
  let loginPayload = {};
  if (billpayMethodType === 1) {
    loginPayload = {
      'pushToken': '123456',
      'clientCheck': 'WEB_BROWSER',
      'versionScope': versionScope,
      'billpayMethodType': '1'
    };
  } else {
    loginPayload = {
      'pushToken': '123456',
      'clientCheck': 'WEB_BROWSER',
      'versionScope': versionScope,
    };
  }
  const payloadToAdd = [];
  if (!isLockedDevice) {
    loginPayload['username'] = username.trim();
    // If the mobile app does not have tokenClient or tokenServer,
    // This means the device is not linked to an account yet and Onboarding is needed. Hence, OTP needs to be sent
    loginPayload['activateOtp'] = true;
    loginPayload['smsPriority'] = smsPriority;
    loginPayload['loginPassword'] = encryptText(password);
    loginPayload['OBMParameter'] = OBMParameter;
    loginPayload['deviceInfoLogin'] = deviceInfoLogin;
  } else {
    // This means device is linked to just one user
    payloadToAdd.push('tokenClient', 'tokenServer', 'deviceParam');

    if (password) {
      loginPayload['loginPassword'] = encryptText(password);
      loginPayload['OBMParameter'] = OBMParameter;
      loginPayload['deviceInfoLogin'] = deviceInfoLogin;
    } else if (easyPin) {
      loginPayload['easyPin'] = encryptText(easyPin);
      loginPayload['OBMParameter'] = OBMParameter;
      loginPayload['deviceInfoLogin'] = deviceInfoLogin;
      loginPayload['billpayMethodType'] = billpayMethodType;

    } else if (faceRecognition) {
      loginPayload['faceRecognition'] = faceRecognition;
      loginPayload['orientation'] = orientation;
      loginPayload['flipImage'] = flipImage;
      loginPayload['OBMParameter'] = OBMParameter;
      loginPayload['deviceInfoLogin'] = deviceInfoLogin;
    }
  }
  return Http.post('LOGIN', loginPayload,
    {additional: ['TXID', 'sessionCode', 'randomNumber', 'lang', ...payloadToAdd]}, dispatch);
};

const loginV2 = ({username = '', password, easyPin, smsPriority, deviceInfoLogin, faceRecognition, orientation, flipImage, versionScope, billpayMethodType}, isLockedDevice, dispatch) => {
  let loginPayload = {};
  if (billpayMethodType === 1) {
    loginPayload = {
      'pushToken': '123456',
      'clientCheck': 'WEB_BROWSER',
      'versionScope': versionScope,
      'billpayMethodType': '1'
    };
  } else {
    loginPayload = {
      'pushToken': '123456',
      'clientCheck': 'WEB_BROWSER',
      'versionScope': versionScope,
    };
  }
  const payloadToAdd = [];
  if (!isLockedDevice) {
    loginPayload['username'] = username.trim();
    // If the mobile app does not have tokenClient or tokenServer,
    // This means the device is not linked to an account yet and Onboarding is needed. Hence, OTP needs to be sent
    loginPayload['activateOtp'] = true;
    loginPayload['smsPriority'] = smsPriority;
    loginPayload['loginPassword'] = password;
    loginPayload['deviceInfoLogin'] = deviceInfoLogin;
  } else {
    // This means device is linked to just one user
    payloadToAdd.push('tokenClient', 'tokenServer', 'deviceParam');

    if (password) {
      loginPayload['loginPassword'] = password;
      loginPayload['deviceInfoLogin'] = deviceInfoLogin;
    } else if (easyPin) {
      loginPayload['easyPin'] = easyPin;
      loginPayload['deviceInfoLogin'] = deviceInfoLogin;
      loginPayload['billpayMethodType'] = billpayMethodType;

    } else if (faceRecognition) {
      loginPayload['faceRecognition'] = faceRecognition;
      loginPayload['orientation'] = orientation;
      loginPayload['flipImage'] = flipImage;
      loginPayload['deviceInfoLogin'] = deviceInfoLogin;
    }
  }
  return Http.post('LOGIN', loginPayload,
    {additional: ['TXID', 'sessionCode', 'randomNumber', 'lang', ...payloadToAdd]}, dispatch);
};

const loginNew = ({username = '', password, easyPin, smsPriority, deviceInfoLogin, faceRecognition, orientation, flipImage, versionScope, billpayMethodType, isloginActivation = ''}, isLockedDevice, dispatch) => {
  let loginPayload = {};
  if (billpayMethodType === 1) {
    loginPayload = {
      'pushToken': '123456',
      'clientCheck': 'WEB_BROWSER',
      'versionScope': versionScope,
      'billpayMethodType': '1'
    };
  } else {
    loginPayload = {
      'pushToken': '123456',
      'clientCheck': 'WEB_BROWSER',
      'versionScope': versionScope,
    };
  }
  const payloadToAdd = [];
  if (!isLockedDevice) {
    payloadToAdd.push('deviceParam');
    loginPayload['username'] = username.trim();
    // If the mobile app does not have tokenClient or tokenServer,
    // This means the device is not linked to an account yet and Onboarding is needed. Hence, OTP needs to be sent
    loginPayload['activateOtp'] = isloginActivation !== 'yes';
    loginPayload['smsPriority'] = smsPriority;
    loginPayload['loginPassword'] = password;
    loginPayload['deviceInfoLogin'] = deviceInfoLogin;
  } else {
    // This means device is linked to just one user
    payloadToAdd.push('tokenClient', 'tokenServer', 'deviceParam');

    if (password) {
      loginPayload['loginPassword'] = password;
      loginPayload['deviceInfoLogin'] = deviceInfoLogin;
    } else if (easyPin) {
      loginPayload['easyPin'] = easyPin;
      loginPayload['deviceInfoLogin'] = deviceInfoLogin;
      loginPayload['billpayMethodType'] = billpayMethodType;

    } else if (faceRecognition) {
      loginPayload['faceRecognition'] = faceRecognition;
      loginPayload['orientation'] = orientation;
      loginPayload['flipImage'] = flipImage;
      loginPayload['deviceInfoLogin'] = deviceInfoLogin;
    }
  }
  return Http.post('LOGIN_NEW', loginPayload,
    {additional: ['TXID', 'sessionCode', 'randomNumber', 'lang', ...payloadToAdd]}, dispatch, permitShapeprotect);
};

const verifyATM = ({cardpin, cardnumber, smsPriority, isForgetPassword}, dispatch) => {
  const toEncrypt = ''.concat(cardnumber, cardpin);
  return encryptATMString(toEncrypt).
    then((panPinNumberEncrypt) => {
      Http.post('VERIFY_ATM_CARD_PIN', {panPinNumberEncrypt, smsPriority, isForgetPassword},
        {additional: ['TXID', 'sessionCode']}, dispatch);
    });
};

const otpVerify = (mPin, dispatch) => Http.post('OTP_VERIFY', {mPin},
  {additional: ['TXID', 'ipassport', 'versionScope']}, dispatch);

const verifyUsername = (username, dispatch) => Http.post('VERIFY_USERNAME', {username},
  {additional: ['TXID']}, dispatch);

const otpResend = (payload, dispatch) => Http.post('OTP_RESEND', payload,
  {additional: ['TXID', 'ipassport']}, dispatch);

const verifyPassword = (userPassword, profileScope, deviceInfoLogin, dispatch) => Http.post('VERFY_PASSWORD', {'userPassword': userPassword, profileScope, deviceInfoLogin},
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM']}, dispatch);

const verifyEasyPin = (easyPin, deviceInfoLogin, sessionId, dispatch) => Http.post('VERIFY_EASYPIN', {'easyPin': easyPin, deviceInfoLogin, sessionId},
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch);

const createUsernamePassword = ({username, password, isAllowedIB, deviceInfoLogin, token, versionScope}, dispatch) => Http.post('CREATE_USERNAME_PASSWORD',
  {username, password, isAllowedIB, deviceInfoLogin, token, versionScope}, // TODO What is this pin ?
  {additional: ['TXID', 'ipassport', 'sessionCode', 'E2EE_RANDOM', 'deviceParam', 'tokenClient']}, dispatch);

const easyPinRegister = (payload, dispatch) => Http.post('EASY_PIN_REGISTER', payload,
  {additional: ['TXID', 'lang', 'tokenClient', 'deviceParam', 'E2EE_RANDOM']}, dispatch).
  then((r) => {
    if (r.data.tokenServer) {
    // Set Server Token in AsyncStorage and after the process is complete, set it to default payload as well
      setKey(storageKeys['TOKEN_SERVER'], r.data.tokenServer).then(() => {
        dispatch(setAPIPayloadParam({tokenServer: result(r, 'data.tokenServer')}));
      });
    }
    return r;
  });

const updateEasyPin = ({easyPin, oldEasyPin, OBMParameterOld, OBMParameterNew, deviceInfoLogin}, dispatch) => Http.post('UPDATE_EASYPIN',
  {oldEasyPin, easyPin, OBMParameterOld, OBMParameterNew, deviceInfoLogin},
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch);

const changePassword = (payload, dispatch) => Http.post('CHANGE_PASSWORD', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch);

const addNewPayee = (payload, dispatch) => Http.postV4('ADD_PAYEE', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch); // TODO language ?

const getTransRefNum = (payload, dispatch) => Http.postV4('GET_TRANS_REF_NUM', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'easyPin', 'uniqueCode']}, dispatch);

const getPayeeName = (payload, additional, dispatch) => Http.post('GET_PAYEE_NAME', payload,
  {additional}, dispatch);

const getAppConfig = (dispatch) => Http.get('APPCONFIG', {}, dispatch);

const getBalances = (dispatch) => Http.post('BALANCES', {},
  {additional: ['TXID', 'ipassport']}, dispatch);

const transfer = (payload, dispatch) => Http.post('TRANSFER', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch);

const mobileTopup = (payload, dispatch) => Http.post('MOBILE_TOPUP', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const getbillerConfig = (dispatch) => Http.get('BILLER_CONFIG', {}, dispatch);

const resendPaymentOTP = (payload, dispatch) => Http.postV4('RESEND_PAYMENT_OTP', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const enquireWaterBill = (payload, dispatch) => Http.post('WATER_BILL_ENQUIRY', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const payWaterBill = (payload, dispatch) => Http.post('WATER_BILL_TRANSACTION', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const enquirePostpaidBill = (payload, dispatch) => Http.post('POSTPAID_ENQUIRY', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const payPostpaidBill = (payload, dispatch) => Http.post('POSTPAID_TRANSACTION', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const enquireElectricityBill = (payload, dispatch) => Http.post('ELECTRICITY_ENQUIRY', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const payElectricityBill = (payload, dispatch) => Http.post('ELECTRICITY_TRANSACTION', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const getTransactionHistory = (payload, dispatch) => Http.post('TRANSACTIONS_HISTORY', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const getTransactionHistoryNew = (payload, dispatch) => Http.getPrivate('TRANSACTIONS_HISTORY_NEW', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const getCreditCardTransactionHistory = (payload, dispatch) => Http.post('CREDIT_CARD_TRANSACTION', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const getMiniStatement = (payload, dispatch) => Http.post('TRANSACTIONS_MINI_NEW', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const getTimeDeposit = (payload, dispatch) => Http.post('TIMEDEPOSIT_DETAIL', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const logOut = (dispatch) => Http.post('LOGOUT', {},
  {additional: ['TXID', 'ipassport']}, dispatch);

const getCreditCard = (payload, dispatch) => Http.post('CREDIT_CARD_INQUIRY', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const tdConfig = (dispatch) => Http.post('TD_CONFIG', {},
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const tdConfirmation = (payload, dispatch) => Http.post('TD_CONFIRMATION', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const tdTransaction = (payload, dispatch) => Http.post('TD_TRANSACTION', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const tdsConfig = (dispatch) => Http.post('TDS_CONFIG', {},
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const tdsConfirmation = (payload, dispatch) => Http.post('TDS_CONFIRMATION', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const tdsTransaction = (payload, dispatch) => Http.post('TDS_TRANSACTION', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const refreshStorage = (payload, dispatch) => Http.post('REFRESH_STORAGE', payload,
  {additional: ['TXID', 'ipassport']}, dispatch);

const linkCreditCard = (dispatch) => Http.post('LINK_CREDIT_CARD', {},
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const inquireCreditCardBill = (payload, dispatch) => Http.post('CC_INQUIRY', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'tokenServer', 'tokenClient']}, dispatch);

const creditCardTransaction = (payload, dispatch) => Http.post('CC_TRANSACTION', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const creditCardStatement = (payload, dispatch) => Http.post('CREDIT_CARD_STATEMENT', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const creditCardSetInstallment = (payload, dispatch) => Http.post('CREDIT_CARD_SET_INSTALLMENT', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const creditCardChangeInstallment = (payload, dispatch) => Http.post('CREDIT_CARD_CHANGE_INSTALLMENT', payload,
  {additional: ['ipassport', 'lang', 'easyPin', 'tokenClient', 'E2EE_RANDOM']}, dispatch);

const creditCardTxnManage = (payload, dispatch) => Http.post('CREDIT_CARD_TXN_MANAGE', payload,
  {additional: ['ipassport', 'lang', 'easyPin', 'tokenClient', 'E2EE_RANDOM']}, dispatch);

const creditCardGetTxnManage = (payload, dispatch) => Http.post('CREDIT_CARD_GETTXN_MANAGE', payload,
  {additional: ['ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch);

const creditCardCashAdvanceFee = (payload, dispatch) => Http.post('CREDIT_CARD_CASH_ADVANCE_FEE', payload,
  {additional: ['TXID', 'lang', 'ipassport']}, dispatch);

const creditCardCashAdvance = (payload, dispatch) => Http.post('CREDIT_CARD_CASH_ADVANCE', payload,
  {additional: ['TXID', 'lang', 'ipassport', 'E2EE_RANDOM', 'tokenClient', 'easyPin']}, dispatch);

const creditCardSourceOfFund = (payload, dispatch) => Http.post('CREDIT_CARD_SOURCE_OF_FUND', payload,
  {additional: ['TXID', 'lang', 'ipassport', 'tokenClient', 'tokenServer', 'easyPin']}, dispatch);

const creditCardGetNotif = (payload, dispatch) => Http.post('CREDIT_CARD_SETTINGS_GET_NOTIF', payload,
  {additional: ['TXID', 'lang', 'ipassport']}, dispatch);

const creditCardSetNotif = (payload, dispatch) => Http.post('CREDIT_CARD_SETTINGS_SET_NOTIF', payload,
  {additional: ['TXID', 'lang', 'ipassport', 'easyPin', 'tokenClient', 'E2EE_RANDOM']}, dispatch);

const versionCheck = (payload, dispatch) => Http.post('VERSION_CHECK', payload,
  {additional: ['TXID', 'lang']}, dispatch);

const confirmBlockCreditCard = (payload, dispatch) => Http.post('CONFIRM_BLOCK_CREDIT_CARD', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const requestBlockCreditCard = (payload, dispatch) => Http.post('REQUEST_BLOCK_CREDIT_CARD', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const confirmCreditCardOption = (payload, dispatch) => Http.post('CONFIRM_CREDIT_CARD_OPTION', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const requestCreditCardOption = (payload, dispatch) => Http.post('REQUEST_CREDIT_CARD_OPTION', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const sendFeedback = (payload, dispatch) => Http.post('FEEDBACK_SUBMIT', payload, {additional: ['TXID', 'ipassport']}, dispatch);

const confirmCreditCardChangeLimit = (payload, dispatch) => Http.post('CONFIRM_CREDIT_CARD_CHANGE_LIMIT', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const requestCreditCardChangeLimit = (payload, dispatch) => Http.post('REQUEST_CREDIT_CARD_CREDIT_CARD_OPTION', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const getBanners = (dispatch) => Http.get('BANNERS', {}, dispatch);

const getOffers = (lang, dispatch) => lang === 'en' ? Http.get('OFFERS_EN', {}, dispatch) : Http.get('OFFERS_ID', {}, dispatch);

const closeTimeDeposit = (payload, dispatch) => Http.post('CLOSE_TD', payload,
  {additional: ['TXID', 'ipassport', 'lang',  'E2EE_RANDOM', 'easyPin']}, dispatch);

const getTdDisclaimer = (payload, dispatch) => payload === 'en' ? Http.get('TD_DISCLAIMER_EN', {}, dispatch) : Http.get('TD_DISCLAIMER_ID', {}, dispatch);

const shareReferralCode = (dispatch) => Http.post('SHARE_REFERRAL_CODE', {},
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const fetchPanNumber = ({panNumber, smsPriority, isForgetPassword, captchaInput, captchaId}, dispatch) => Http.post('FETCH_PAN_NUMBER', {panNumber, smsPriority, isForgetPassword, captchaInput, captchaId},
  {additional: ['TXID', 'sessionCode']}, dispatch);

const fetchPinNumber = ({cardpin, panNumber, smsPriority, transRefNum, isForgetPassword, token, versionScope}, dispatch) => encryptATMString(cardpin).
  then((pinNumberEncrypt) => Http.post('FETCH_PIN_NUMBER', {panNumber, pinNumberEncrypt, smsPriority, transRefNum, isForgetPassword, token, versionScope},
    {additional: ['TXID', 'sessionCode', 'ipassport', 'lang']}, dispatch));

const getUserApiKey = (payload, dispatch) => Http.post('GET_USER_API_KEY', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const qrPayment = (payload, dispatch) => Http.postForQrPayment('QR_PAYMENT', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const sendEFormNTB = (payload, dispatch) => Http.postForCaptcha('EFORM_NTB', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const enquireGenericBill = (payload, dispatch) => Http.post('GENERIC_BILLER_ENQUIRY', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'tokenServer', 'tokenClient']}, dispatch);

const payGenericBill = (payload, dispatch) => Http.post('GENERIC_BILLER_TRANSACTION', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const loginQR = (payload, dispatch) => Http.getForQR('QR_LOGIN', payload.additionalUrl, {}, dispatch);

const invoiceQR = (payload, dispatch) => Http.getForQR('QR_INVOICE', payload.additionalUrl, {}, dispatch);

const getQrStatus = (payload, dispatch) => Http.getForQR('QR_GET_STATUS', payload.additionalUrl, {}, dispatch);

const getQrPromoList = (dispatch) => Http.getForQR('QR_GET_PROMO_LIST', '', {}, dispatch);

const getLanguage = (dispatch) => Http.get('GET_LANGUAGE', {}, dispatch);

const getRegexPasswordPolicy = (dispatch) => Http.get('GET_REGEX_PASSWORD_POLICY', {}, dispatch);

const confirmationElectricityBill = (payload, dispatch) => Http.postV4('ELECTRICITY_CONFIRMATION', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const resultElectricityBill = (payload, dispatch) => Http.postV4('ELECTRICITY_RESULT', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const confirmationMobileTopup = (payload, dispatch) => Http.postV4('MOBILE_TOPUP_CONFIRMATION', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const resultMobileTopup = (payload, dispatch) => Http.postV4('MOBILE_TOPUP_RESULT', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const confirmationMobilePostPaid = (payload, dispatch) => Http.postV4('MOBILE_POSTPAID_CONFIRMATION', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const resultMobilePostPaid = (payload, dispatch) => Http.postV4('MOBILE_POSTPAID_RESULT', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const confirmationWaterBill = (payload, dispatch) => Http.postV4('WATERBILL_CONFIRMATION', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const resultWaterBill = (payload, dispatch) => Http.postV4('WATERBILL_RESULT', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const detailGenericBill = (payload, dispatch) => Http.post('GENERIC_BILLER_DETAIL', payload,
  {additional: ['TXID', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch);

const confirmGenericBill = (payload, dispatch) => Http.postV4('GENERIC_BILLER_CONFIRMATION', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const resultGenericBill = (payload, dispatch) => Http.postV4('GENERIC_BILLER_RESULT', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch);

const getwealthManagement = (dispatch) => Http.post('GET_WEALTH_MANAGEMENT_CONFIG', {},
  {additional: ['ipassport', 'lang']}, dispatch);

const getwealthManagementView = (code, dispatch) => Http.post('GET_WEALTH_MANAGEMENT_VIEW', {code},
  {additional: ['ipassport', 'lang']}, dispatch);

const getwealthManagementLinkUnlink = (code, modeChoose, portfolio, dispatch) => Http.post('GET_WEALTH_MANAGEMENT_LINK_UNLINK', {code, modeChoose, portfolio},
  {additional: ['ipassport', 'lang']}, dispatch);

const getDetailTransactionHistory = (payload, dispatch) => Http.post('GET_DETAIL_TRANSACTION', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const getFetchUserSimobi = (payload, dispatch) => Http.post('FETCH_USER_SIMOBI', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const merchantQR = (payload, dispatch) => Http.getForQR('QR_MERCHANT', payload.additionalUrl, {}, dispatch);

const confirmTransfer = (payload, additional, dispatch) => Http.postV4('CONFIRMATION_TRANSFER', payload,
  {additional}, dispatch);

const registerFace = (payload, dispatch) => Http.postFace('REGISTER_LOGIN_WITH_FACE', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const detectFace = (payload, dispatch) => Http.postFace('DETECT_LIVE_FACE', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getTravelInsurance = (dispatch) => Http.post('GET_TRAVEL_INSURANCE', {},
  {additional: ['ipassport', 'lang']}, dispatch);

const getPAInsurance = (dispatch) => Http.post('GET_PA_INSURANCE', {},
  {additional: ['ipassport', 'lang']}, dispatch);

const confirmPAInsurance = (payload, dispatch) => Http.post('CONFIRM_PA_INSURANCE', {payload},
  {additional: ['ipassport', 'lang']}, dispatch);

const resultPAInsurance = (payload, dispatch) => Http.post('RESULT_PA_INSURANCE', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'tokenClient', 'tokenServer']}, dispatch);

const confirmTravelInsurance = (payload, dispatch) => Http.post('CONFIRM_TRAVEL_INSURANCE', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getLoanList = (cifCode, dispatch) => Http.post('GET_LOAN_LIST', cifCode,
  {additional: ['ipassport', 'lang']}, dispatch);

const openAccountConfig = (dispatch) => Http.post('OPEN_ACCOUNT_CONFIG', {},
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const openAccountConfirmation = (payload, dispatch) => Http.post('OPEN_ACCOUNT_CONFIRMATION', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const openAccount = (payload, dispatch) => Http.post('OPEN_ACCOUNT', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const sendPaydayLoanForm = (cif, dispatch) => Http.post('SEND_PAYDAYLOAN_FORM', cif,
  {additional: ['ipassport', 'lang', 'TXID']}, dispatch);

const getPaydayLoanData = (cif, dispatch) => Http.post('GET_DATA_PAYDAYLOAN_FORM', cif,
  {additional: ['ipassport', 'lang', 'TXID']}, dispatch);

const sfRedeem = (payload, dispatch) => Http.post('SF_REDEEM', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const getRecurringTransferHistory = (payload, dispatch) => Http.post('GET_RECURRING_TRANSFER_LIST', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'tokenClient', 'tokenServer', 'isBeforeLogin']}, dispatch);

const posteditingRecurringTransferHistory = (payload, dispatch) => Http.post('EDIT_RECURRING_TRANSFER', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM', 'easyPin', 'tokenClient', 'tokenServer', 'isBeforeLogin']}, dispatch);

const deleteRecurringTransferHistory = (payload, dispatch) => Http.post('DELETE_RECURRING_TRANSFER', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM', 'easyPin', 'tokenServer', 'isBeforeLogin']}, dispatch);

const resultTravelInsurance = (payload, dispatch) => Http.post('RESULT_TRAVEL_INSURANCE', payload,
  {additional: ['ipassport', 'lang', 'E2EE_RANDOM', 'tokenClient', 'tokenServer']}, dispatch);

const getPaydayLoan = (dispatch, cifCode) => Http.post('GET_PAYDAY_LOAN', cifCode, {additional: ['ipassport', 'lang']}, dispatch);

const getBalanceEmoney = (dispatch) => Http.post('GET_BALANCE_EMONEY', {},
  {additional: ['ipassport']}, dispatch);

const checkRegisterEmoney = (payload, dispatch) => Http.post('CHECK_E_MONEY_REGISTER', payload,
  {additional: ['ipassport', 'lang', 'TXID']}, dispatch);

const sendEmailOtpEmoneyRegister = (payload, dispatch) => Http.post('SEND_EMAIL_REGISTER_E_MONEY', payload,
  {additional: ['ipassport', 'lang', 'TXID']}, dispatch);

const sendOtpActivation = (payload, dispatch) => Http.post('SEND_OTP_ACTIVATION', payload,
  {additional: ['ipassport', 'lang', 'TXID']}, dispatch);

const resendOtpActivation = (payload, dispatch) => Http.post('RESEND_OTP_ACTIVATION', payload,
  {additional: ['ipassport', 'lang', 'TXID']}, dispatch);

const sendOtpResetPassword = (payload, dispatch) => Http.post('SEND_OTP_RESET_PASSWORD_AUTOREGIST', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'sessionCode', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const verifyOtpResetPassword = (payload, dispatch) => Http.post('VERIFY_OTP_RESET_PASSWORD_AUTOREGIST', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'sessionCode', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const doResetPassword = (payload, dispatch) => Http.post('DO_RESET_PASSWORD_AUTOREGISTRATION', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'sessionCode', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const verifyOtpActivation = (payload, dispatch) => Http.post('VERIFY_OTP_ACTIVATION', payload,
  {additional: ['ipassport', 'lang', 'sessionCode', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const commonRegistrationActivation = (payload, dispatch) => Http.post('ACTIVATION_COMMON', payload,
  {additional: ['ipassport', 'lang', 'E2EE_RANDOM', 'deviceParam', 'tokenClient']}, dispatch, permitShapeprotect);

const registerEmoney = (payload, dispatch) => Http.post('GET_EMONEY_OFFERS', payload,
  {additional: ['ipassport', 'lang', 'TXID']}, dispatch);

const closeEmoneyAccount = (payload, dispatch) => Http.post('CLOSE_EMONEY_ACCOUNT', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const getTransactionEmoneyHistory = (payload, dispatch) => Http.post('GET_STATEMENT_EMONEY', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const getDetailTransactionEmoneyHistory = (payload, dispatch) => Http.post('GET_STATEMENT_EMONEY_DETAIL', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const checkResetPasskyc = (payload, dispatch) => Http.post('CHECK_EMONEY_RESET_PASSWORD', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const checkingResetPasskyc = (payload, dispatch) => Http.post('CHECKING_RESET_PASSWORD_EMONEY', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const resetPasswordEMoney = (payload, dispatch) => Http.post('RESET_PASSWORD_EMONEY', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);


const getEgiftListPage = (payload, dispatch) => Http.postV4('GET_EGIFT_PAGINATION', payload,
  {additional: ['lang']}, dispatch);

const inquirySimasPoin = (payload, dispatch) => Http.postV4('INQUIRY_SIMAS_POIN', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'easyPin']}, dispatch);

const inquirySimasPoinMgm = (payload, dispatch) => Http.postV4('INQUIRY_SIMAS_POIN', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'ipassport', 'deviceParam', 'lang', 'easyPin']}, dispatch);

const purchaseEgift = (payload, additional, dispatch) => Http.postV4('PURCHASE_EGIFT', payload,
  {additional}, dispatch);

const getDataMyOrder = (payload, dispatch) => Http.postV4('GET_DATA_MYORDER', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'searchName', 'searchValue', 'tokenClient', 'tokenServer', 'isBeforeLogin']}, dispatch);

const upgradeEmoneyKyc = (payload, dispatch) => Http.post('UPGRADE_EMONEY_KYC', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const checkPhoneForCC = (payload, dispatch) => Http.post('CHECK_PHONE_NUMBER_CC', payload,
  {additional: ['TXID', 'lang', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const checkEmailOrami = (payload, dispatch) => Http.post('CHECK_EMAIL_ORAMI', payload,
  {additional: []}, dispatch);

const registerVerifyOrami = (payload, dispatch) => Http.post('REGISTER_ORAMI', payload,
  {additional: []}, dispatch);

const dukcapilKTP = (payload, dispatch) => Http.post('CHECK_DUKCAPIL', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const requestOtpEform = (payload, dispatch) => Http.post('REQUEST_OTP_EFORM', payload,
  {additional: []}, dispatch);

const verifyOtpEform = (payload, dispatch) => Http.post('VERIFY_OTP_EFORM', payload,
  {additional: []}, dispatch);

const getProvinceList = (payload, dispatch) => Http.post('GET_PROVINCE_LIST', payload,
  {additional: []}, dispatch);

const getCityList = (payload, dispatch) => Http.post('GET_CITY_LIST', payload,
  {additional: []}, dispatch);

const getDistrictList = (payload, dispatch) => Http.post('GET_DISTRICT_LIST', payload,
  {additional: []}, dispatch);

const getSubDistrictList = (payload, dispatch) => Http.post('GET_SUBDISTRICT_LIST', payload,
  {additional: []}, dispatch);

const getCcDataCif = (payload, dispatch) => Http.post('GET_CC_DATA_CIF', payload,
  {additional: ['ipassport']}, dispatch);

// QR
const getGpnMerchant = (payload, dispatch) => Http.post('QR_GPN_MERCHANT', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const transactionQRGpn = (payload, dispatch) => Http.post('QR_GPN_TRANSACTION', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'easyPin']}, dispatch);

const transactionQRCrossBorder = (payload, dispatch) => Http.post('QR_CROSSBORDER_TRANSACTION', payload,
  {additional: ['ipassport', 'lang', 'easyPin', 'E2EE_RANDOM', 'tokenClient']}, dispatch);

const inquiryCrossBorder = (payload, dispatch) => Http.post('QR_CROSSBORDER_INQUIRY', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getTerminalList = (payload, dispatch) => Http.post('QR_TERMINAL_LIST', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getTerminalDelete = (payload, dispatch) => Http.post('QR_TERMINAL_DELETE', payload,
  {additional: ['ipassport', 'lang', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const getTerminalEdit = (payload, dispatch) => Http.post('QR_TERMINAL_EDIT', payload,
  {additional: ['ipassport', 'lang', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const getTerminalReset = (payload, dispatch) => Http.post('QR_TERMINAL_RESET', payload,
  {additional: ['ipassport', 'lang', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const getMerchantList = (payload, dispatch) => Http.post('QR_MERCHANT_LIST', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getRefundCode = (payload, dispatch) => Http.post('QR_REFUND_CODE', payload,
  {additional: ['ipassport', 'lang', 'TXID']}, dispatch);

const getGenerateRefundCode = (payload, dispatch) => Http.post('QR_GENERATE_REFUND_CODE', payload,
  {additional: ['ipassport', 'lang', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const getCpan = (payload, dispatch) => Http.post('GET_USER_CPAN', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const getSeatLayout = (payload, dispatch) => Http.post('GET_SEAT_LAYOUT', payload,
  {additional: ['lang']}, dispatch);

const getMovieCgv = (payload, dispatch) => Http.get('GET_MOVIE_CGV', {}, dispatch);

const getCinemaCgv = (payload, dispatch) => Http.get('GET_CINEMA_CGV', {}, dispatch);

const getCgvSchedule = (payload, dispatch) => Http.post('GET_CINEMA_SCHEDULE', payload,
  {additional: ['lang']}, dispatch);

const getCgvComingSoon = (payload, dispatch) => Http.get('GET_CINEMA_COMING_SOON', {}, dispatch);

const getSelectedSeat = (payload, dispatch) => Http.post('GET_SELECTED_SEAT', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getPaymentCinema = (payload, additional, dispatch) => Http.postCGVPayment('GET_PAYMENT_CINEMA', payload,
  {additional}, dispatch);

const getEgiftDetail = (payload, dispatch) => Http.postV4('GET_EGIFT_DETAIL', payload,
  {additional: ['lang']}, dispatch);

const getEgiftCache = (payload, dispatch) => Http.postV4('GET_EGIFT_CACHE', payload,
  {additional: ['lang']}, dispatch);

const getFlightReserv = (payload, dispatch) => Http.post('GET_FLIGHT_RESERV', payload,
  {additional: ['lang']}, dispatch);

const getSimasPoinHistory = (payload, dispatch) => Http.postV4('GET_SIMASPOIN_HISTORY', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'lang']}, dispatch);

const getSimasPoinHistoryMgm = (payload, dispatch) => Http.postV4('GET_SIMASPOIN_HISTORY', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'ipassport', 'lang']}, dispatch);

const qrVoucherDiscount = (payload, dispatch) => Http.postNewQr('QR_VOUCHER_DISCOUNT', payload,
  {additional: []}, dispatch);

const qrDiscountMerchantList = (payload, dispatch) => Http.postNewQr('QR_DISCOUNT_MERCHANT_LIST', payload,
  {additional: []}, dispatch);

const qrDiscountMerchantDetail = (payload, dispatch) => Http.postNewQr('QR_DISCOUNT_MERCHANT_DETAIL', payload,
  {additional: []}, dispatch);

const getVoucherList = (payload, dispatch) => Http.post('GET_VOCUHERLIST', payload,
  {additional: ['ipassport', 'lang', 'tokenClient', 'tokenServer', 'isBeforeLogin']}, dispatch);

const getVoucherListDetail = (payload, dispatch) => Http.post('GET_VOUCHER_DETAIL', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getSuggestVoucher = (payload, dispatch) => Http.post('GET_SUGGESTION_VOUCHER', payload,
  {additional: ['ipassport', 'lang', 'tokenClient', 'tokenServer']}, dispatch);

const checkVoucherValidity = (payload, dispatch) => Http.post('GET_VOUCHER_VALIDITY', payload,
  {additional: ['ipassport', 'lang', 'tokenClient', 'tokenServer']}, dispatch);

const deleteFromPayeeList = (payload, dispatch) => Http.postV4('DELETE_PAYEE_TRANSFER', payload,
  {additional: ['ipassport', 'lang', 'sessionCode', 'E2EE_RANDOM', 'easyPin', 'tokenClient', 'tokenServer']}, dispatch);

const getATMList = (payload, dispatch) => Http.post('ATM_LOCATOR', payload,
  {additional: ['lang']}, dispatch);

const getBillpayHistory = (payload, dispatch) => Http.post('GET_BILLPAY_HISTORY', payload,
  {additional: ['ipassport', 'lang', 'tokenClient', 'tokenServer']}, dispatch);

const deleteBillpayHistory = (payload, dispatch) => Http.post('DELETE_BILLPAY_HISTORY', payload,
  {additional: ['ipassport', 'lang', 'tokenClient', 'tokenServer']}, dispatch);

const registerSavingAccount = (payload, dispatch) => Http.post('REGISTER_SAG', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const getFlightAvailability = (payload, dispatch) => Http.post('GET_FLIGHT_AVAILABILITY', payload,
  {additional: ['TXID', 'lang']}, dispatch);

const getFareDetail = (payload, dispatch) => Http.post('GET_FARE_DETAIL', payload,
  {additional: ['TXID', 'lang']}, dispatch);

const getListPassenger = (payload, dispatch) => Http.postEStore('GET_LIST_PASSENGER', payload,
  {additional: ['TXID', 'lang']}, dispatch);

const addListPassenger = (payload, dispatch) => Http.postEStore('ADD_LIST_PASSENGER', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'easyPin']}, dispatch);

const getFlightPayment = (payload, additional, dispatch) => Http.post('GET_FLIGHT_PAYMENT', payload,
  {additional}, dispatch);

const countryIso = (payload, dispatch) => Http.getEStore('COUNTRY_ISO', payload, dispatch);

const usernameAvailability = (payload, dispatch) => Http.post('QR_USERNAME_AVAILABILITY', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getParamQRGPN = (payload, dispatch) => Http.post('QR_USERNAME_GET_PARAM', payload,
  {additional: ['lang']}, dispatch);

const registerQRGpn = (payload, dispatch) => Http.post('QR_GPN_MERCHANT_V2', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM']}, dispatch);

const getStoreQRList = (payload, dispatch) => Http.post('QR_STORE_LIST', payload,
  {additional: ['ipassport']}, dispatch);

const getStoreDelete = (payload, dispatch) => Http.post('QR_STORE_DELETE', payload,
  {additional: ['ipassport', 'lang', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const storenameAvailability = (payload, dispatch) => Http.post('QR_STORENAME_AVAILABILITY', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const addPicture = (payload, dispatch) => Http.post('ADD_PICTURE', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const updatePicture = (payload, dispatch) => Http.post('UPDATE_PICTURE', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const checkStatusInvoice = (payload, dispatch) => Http.postV3('CHECK_STATUS_INVOICE', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang']}, dispatch);

const generateCode = (payload, dispatch) => Http.postV3('GENERATE_CODE', payload,
  {additional: ['TXID', 'ipassport', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'easyPin']}, dispatch);

const generateOnlineCode = (payload, dispatch) => Http.postV3('GENERATE_ONLINE_CODE', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'easyPin']}, dispatch);

const generateCodeII = (payload, dispatch) => Http.postV3('GENERATE_ONLINE_CODE_II', payload,
  {additional: ['TXID', 'ipassport', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport', 'easyPin']}, dispatch);

const sendEmailLuckydraw = (payload, dispatch) => Http.postV4('SEND_EMAIL_LUCKYDRAW', payload,
  {additional: ['ipassport', 'lang', 'sessionCode']}, dispatch);

const inquiryToken = (payload, dispatch) => Http.post('INQUIRY_TOKEN_PAYMENT', payload,
  {additional: ['ipassport']}, dispatch);

const tokenPayment = (payload, dispatch) => Http.post('TOKEN_PAYMENT_PAY', payload,
  {additional: ['ipassport']}, dispatch);

const incompleteInvoice = (payload, dispatch) => Http.post('INCOMPLETE_INVOICE', payload,
  {additional: ['ipassport']}, dispatch);

const generateVoucherCode = (payload, dispatch) => Http.post('GENERATE_VOUCHER_CODE', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport']}, dispatch);

const subscriptionReksadana = (payload, dispatch) => Http.post('SUBSCRIPTION_REKSADANA', payload,
  {additional: ['TXID', 'ipassport']}, dispatch);

const redemptionReksadana = (payload, dispatch) => Http.post('REDEMPTION_REKSADANA', payload,
  {additional: ['TXID', 'ipassport']}, dispatch);

const summaryDetailLastTransReksadana = (dispatch) => Http.post('REKSADANA_SUMMARY_DETAIL_LAST_TRANSACTION', {},
  {additional: ['ipassport']}, dispatch);

const getFavBiller = (payload, dispatch) => Http.post('GET_FAVORITE_BILLER', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer']}, dispatch);

const addFavBiller = (payload, additional, dispatch) => Http.post('ADD_FAVORITE_BILLER', payload,
  {additional}, dispatch);

const deleteFavBiller = (payload, dispatch) => Http.post('DELETE_FAVORITE_BILLER', payload,
  {additional: ['ipassport']}, dispatch);

const editFavBiller = (payload, dispatch) => Http.post('EDIT_FAVORITE_BILLER', payload,
  {additional: ['ipassport']}, dispatch);

const inquiryGpnTag51 = (payload, dispatch) => Http.post('INQUIRY_QRGPN', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport', 'easyPin']}, dispatch);

const getDetailWinner = (payload, dispatch) => Http.postV4('GET_DETAIL_WINNER', payload,
  {additional: ['ipassport', 'lang', 'sessionCode']}, dispatch);

const checkWinnerLuckydraw = (payload, dispatch) => Http.postV4('CHECK_WINNER_LUCKYDRAW', payload,
  {additional: ['ipassport', 'lang', 'sessionCode']}, dispatch);

const getReleaseDeviceQR = (payload, dispatch) => Http.post('GET_RELEASE_DEVICE_QR', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport']}, dispatch);

const checkReleaseDeviceQR = (payload, dispatch) => Http.post('CHECK_RELEASE_DEVICE_QR', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport']}, dispatch);

const confirmReleaseDeviceQR = (payload, dispatch) => Http.post('CONFIRM_RELEASE_DEVICE_QR', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport', 'easyPin']}, dispatch);

const updateReleaseDeviceQR = (payload, dispatch) => Http.post('UPDATE_RELEASE_DEVICE_QR', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport', 'easyPin']}, dispatch);

const otpVerifyChangeDevice = (payload, dispatch) => Http.post('OTP_VERIFY_EFORM', payload, {additional: ['TXID']}, dispatch);

const getReleaseDeviceQRRevamp = (payload, dispatch) => Http.post('GET_RELEASE_DEVICE_QR_REVAMP', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport']}, dispatch);

const checkReleaseDeviceQRRevamp = (payload, dispatch) => Http.post('CHECK_RELEASE_DEVICE_QR_REVAMP', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport']}, dispatch);

const confirmReleaseDeviceQRRevamp = (payload, dispatch) => Http.post('CONFIRM_RELEASE_DEVICE_QR_REVAMP', payload,
  {additional: ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang']}, dispatch);

const updateReleaseDeviceQRRevamp = (payload, dispatch) => Http.post('UPDATE_RELEASE_DEVICE_QR_REVAMP', payload,
  {additional: ['TXID', 'sessionCode', 'tokenClient', 'tokenServer', 'deviceParam', 'lang']}, dispatch);

const logOutChangeDevice = (payload, dispatch) => Http.post('LOGOUT', payload, {additional: ['TXID']}, dispatch);

const getSavingProducts = (payload, dispatch) => Http.post('GET_GENERIC_SAVING_LIST', payload,
  {additional: []}, dispatch);

const getLoanProducts = (payload, dispatch) => Http.post('GET_GENERIC_LOAN_LIST', payload,
  {additional: []}, dispatch);

const getAutoDebitList = (payload, dispatch) => Http.post('GET_AUTO_DEBIT_LIST', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer', 'isBeforeLogin']}, dispatch);

const deleteAutoDebitList = (payload, dispatch) => Http.post('DELETE_AUTO_DEBIT_LIST', payload,
  {additional: ['ipassport']}, dispatch);

const addAutodebit = (payload, dispatch) => Http.post('ADD_AUTO_DEBIT', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'OBMParameter', 'easyPin']}, dispatch);

const editAutodebit = (payload, dispatch) => Http.post('EDIT_AUTO_DEBIT', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'OBMParameter']}, dispatch);

const deleteAutoDebitListNew = (payload, dispatch) => Http.post('DELETE_AUTO_DEBIT_NEW', payload,
  {additional: ['lang', 'ipassport']}, dispatch);

const getAutoDebitHistory = (payload, dispatch) => Http.post('GET_AUTO_DEBIT_HISTORY', payload,
  {additional: ['lang', 'ipassport']}, dispatch);

const apiGeneral = (payload, dispatch) => Http.post('SEND_TRACKING_DATA', payload,
  {additional: ['ipassport']}, dispatch);

const genericRegistration = (payload, dispatch) => Http.postEFormCentral('GENERIC_REGISTRATION', payload,
  {additional: ['ipassport']}, dispatch);

const getCurrentRegistration = (payload, dispatch) => Http.postEFormCentral('GET_REGISTRATION_DATA', payload,
  {additional: ['ipassport']}, dispatch);

const getCurrentToken = (payload, dispatch) => Http.post('GET_CURRENT_TOKEN', payload,
  {additional: ['lang', 'ipassport', 'tokenClient', 'tokenServer', 'isBeforeLogin']}, dispatch);

const getSpinRewards = (payload, dispatch) => Http.post('GET_SPIN_REWARDS', payload,
  {additional: ['lang', 'ipassport']}, dispatch);

const getCurrentTokenNew = (payload, dispatch) => Http.post('GET_CURRENT_TOKEN_NEW', payload,
  {additional: ['lang', 'ipassport', 'tokenClient', 'tokenServer', 'isBeforeLogin']}, dispatch);

const getSpinRewardsNew = (payload, dispatch) => Http.post('GET_SPIN_REWARDS_NEW', payload,
  {additional: ['lang', 'ipassport']}, dispatch);

const saveAddressUser = (payload, dispatch) => Http.post('SAVE_ADDRESS_USER', payload,
  {additional: ['lang', 'ipassport']}, dispatch);

const getTrackingNumber = (payload, dispatch) => Http.post('GET_TRACKING_NUMBER', payload,
  {additional: ['lang', 'ipassport']}, dispatch);

const getRewardHistory = (payload, dispatch) => Http.post('GET_REWARD_HISTORY', payload,
  {additional: ['lang', 'ipassport', 'tokenClient', 'tokenServer', 'isBeforeLogin']}, dispatch);

const getLocationAlfaTrex = (payload, dispatch) => Http.post('GET_LOCATION_ALFATREX', payload,
  {additional: []}, dispatch);

const getLocationAlfamart = (payload, dispatch) => Http.post('GET_LOCATION_ALFAMART', payload,
  {additional: []}, dispatch);

const creditcardActivation = ({panNumber}, dispatch) => encryptATMStringVCC(panNumber).then((panNumber) => Http.post('CREDIT_CARD_ACTIVATION', {panNumber},
  {additional: ['TXID', 'ipassport', 'lang', 'tokenClient', 'tokenServer', 'easyPin', 'E2EE_RANDOM']}, dispatch));

const creditcardBlockUnblock = ({panNumber, actCode, msgStat, reason}, dispatch) => encryptATMStringVCC(panNumber).then((panNumber) => Http.post('CREDIT_CARD_UNBLOCK_BLOCK', {panNumber, actCode, msgStat, reason},
  {additional: ['TXID', 'ipassport', 'lang', 'tokenClient', 'tokenServer', 'easyPin', 'E2EE_RANDOM']}, dispatch));

const creditcardCVV2 = (payload, dispatch) => Http.post('CREDIT_CARD_CVV_INQUIRY', payload,
  {additional: ['ipassport', 'lang', 'tokenClient', 'tokenServer', 'easyPin', 'E2EE_RANDOM']}, dispatch);

const createPINVCC = ({panNumber, inputPIN}, dispatch) => encryptATMStringVCC(panNumber).then((panNumber) => Http.post('CREDIT_CARD_CREATE_PIN', {panNumber, inputPIN},
  {additional: ['ipassport', 'lang', 'tokenClient', 'tokenServer', 'easyPin', 'E2EE_RANDOM']}, dispatch));

const printCardVCC = ({panNumber, CrdDelivOpt}, dispatch) => encryptATMStringVCC(panNumber).then((panNumber) => Http.post('CREDIT_CARD_PRINT_VCC', {panNumber, CrdDelivOpt},
  {additional: ['ipassport', 'lang', 'tokenClient', 'tokenServer', 'easyPin', 'E2EE_RANDOM']}, dispatch));

const getAddressCC = (payload, dispatch) => Http.post('CREDIT_CARD_GET_ADDRRESS', payload,
  {additional: ['ipassport', 'lang', 'tokenClient', 'tokenServer']}, dispatch);

const getAddressCCNew = ({panNumber}, dispatch) => encryptATMStringVCC(panNumber).then((panNumber) => Http.post('CREDIT_CARD_GET_ADDRRESS_NEW', {panNumber},
  {additional: ['ipassport', 'lang', 'tokenClient', 'tokenServer']}, dispatch));

const getInquirySIL = (payload, dispatch) => Http.post('GET_INQUIRY_SIL', payload,
  {additional: ['ipassport']}, dispatch);

const getDefaultAccount = (payload, dispatch) => Http.post('GET_DEFAULT_ACCOUNT', payload,
  {additional: ['deviceParam', 'E2EE_RANDOM']}, dispatch).then((r) => {
  if (r.data.tokenServer) {
    // Set Server Token in AsyncStorage and after the process is complete, set it to default payload as well
    setKey(storageKeys['TOKEN_SERVER'], r.data.tokenServer).then(() => {
      dispatch(setAPIPayloadParam({tokenServer: result(r, 'data.tokenServer')}));
    });
  }
  return r;
});

const setDefaultAccount = (payload, dispatch) => Http.post('SET_DEFAULT_ACCOUNT', payload,
  {additional: ['ipassport', 'E2EE_RANDOM']}, dispatch);
const getEmFundSIL = (payload, dispatch) => Http.post('SEND_EMFUND_SIL', payload,
  {additional: ['ipassport']}, dispatch);

const getInquiryMMQ = (payload, dispatch) => Http.post('GET_INQUIRY_MMQ', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getMMQDetail = (payload, dispatch) => Http.post('GET_MMQ_DETAIL', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getDukcapilData = (payload, dispatch) => Http.post('GET_DUKCAPIL_DATA', payload,
  {additional: ['ipassport']}, dispatch);

const sendDataPGO = (payload, dispatch) => Http.postEFormCentral('SEND_DATA_PGO', payload,
  {additional: ['ipassport']}, dispatch);

const getWorkList = (payload, dispatch) => Http.post('GET_WORK_LIST', payload,
  {additional: []}, dispatch);

const checkingCifNK = (payload, dispatch) => Http.postEFormCentral('CHECKING_KYC_EMONEY', payload,
  {additional: []}, dispatch);
const getQRCpan = (payload, dispatch) => Http.post('GET_QR_CPAN', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getCodeQRCPM = (payload, dispatch) => Http.post('GENERATE_CODE_CPM', payload,
  {additional: ['ipassport', 'lang', 'easyPin', 'E2EE_RANDOM', 'tokenClient']}, dispatch);

const getRedemptionFee = (payload, dispatch) => Http.post('GET_REDEMPTION_FEE', payload,
  {additional: ['ipassport']}, dispatch);

const eformGeneral = ({requestData, targetUrl, type, auth}, dispatch) => encryptEFormString(auth).
  then((auth) => Http.post('API_EFORM_GENERAL', {requestData, targetUrl, type, auth},
    {additional: ['ipassport']}, dispatch));

const setFeedbackData = (payload, dispatch) => Http.post('SET_FEEDBACK_DATA', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getFeedbackData = (payload, dispatch) => Http.post('GET_FEEDBACK_DATA', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getBalanceEmoneyLanding = (payload, dispatch) => Http.post('GET_BALANCE_EMONEY_LANDING', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer']}, dispatch);

const eformGeneralNoAuth = (payload, dispatch) => Http.post('API_EFORM_GENERAL', payload,
  {additional: ['ipassport']}, dispatch);

const getInquiryCardInfo = (payload, dispatch) => Http.post('GET_INQUIRY_CARD_INFO', payload,
  {additional: ['ipassport']}, dispatch);

const getActivationCard = (payload, dispatch) => Http.post('GET_ACTIVATION_CARD', payload,
  {additional: ['ipassport', 'tokenServer', 'tokenClient', 'lang', 'easyPin']}, dispatch);

const getLockdownFlag = (payload, dispatch) => Http.post('GET_LOCKDOWN_FLAG', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const setLockdownFlag = (payload, dispatch) => Http.post('SET_LOCKDOWN_FLAG', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const sendDataAdressBook = (payload, dispatch) => Http.postPGO('SEND_ADDRESS_DATA_PGO', payload,
  {additional: []}, dispatch);

const getCustomerProfile = (payload, dispatch) => Http.post('GET_CUSTOMER_PROFILE', payload,
  {additional: ['ipassport']}, dispatch);

const splitBillConfirmationReceipt = (payload, dispatch) => Http.post(' ', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const sendSplitBill = (payload, dispatch) => Http.post('SPLIT_BILL', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM']}, dispatch);

const getListSplitBillBySender = (dispatch) => Http.post('GET_LIST_SPLITBILLBYSENDER', {},
  {additional: ['ipassport', 'lang']}, dispatch);

const getListSplitBillByReceiver = (dispatch) => Http.post('GET_LIST_SPLITBILLBYRECEIVER', {},
  {additional: ['ipassport', 'lang']}, dispatch);

const editStatusSplitBillYouBill = (payload, dispatch) => Http.post('EDIT_STATUS_SPLITBILL_YOU_BILL', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const requestSplitBillYouBill = (payload, dispatch) => Http.post('REQUEST_STATUS_SPLITBILL_YOU_BILL', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const rejectSplitBillYouOwe = (payload, dispatch) => Http.post('REJECT_STATUS_SPLITBILL_YOU_OWE', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const deleteYouBillList = (payload, dispatch) => Http.post('DELETE_YOUBILL_LIST', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const reminderSplitBillYouBill = (payload, dispatch) => Http.post('REMINDER_STATUS_SPLITBILL_YOU_BILL', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const downloadReceiptSplitBill = (payload, dispatch) => Http.post('DOWNLOAD_RECEIPT_BILL', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const updateInvoiceFT = (payload, dispatch) => Http.post('UPDATE_INVOICE_AFTER_FT', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const reminderMaxBalanceSplitBill = (payload, dispatch) => Http.post('REMINDER_MAX_BALANCE_SPLITBILL', payload,
  {additional: ['ipassport']}, dispatch);

const getCustomerPortofolio = (payload, dispatch) => Http.post('GET_CUSTOMER_PORTOFOLIO', payload,
  {additional: ['ipassport']}, dispatch);

const checkAccountList = (payload, dispatch) => Http.post('CHECK_ACCOUNT_LIST', payload,
  {additional: ['ipassport', 'E2EE_RANDOM']}, dispatch, permitShapeprotect);

const locationUpgradeKyc = (payload, dispatch) => Http.post('LOCATION_UPGRADE_KYC', payload,
  {additional: []}, dispatch);

const getTargetAccount = (payload, additional, dispatch) => Http.post('GET_TARGET_ACCOUNT', payload,
  {additional}, dispatch);

const listCategoryProduct = (payload, dispatch) => Http.post('API_EFORM_GENERAL', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer']}, dispatch);

const listCategoryProductNewEstore = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer']}, dispatch);

const listAllProduct = (payload, dispatch) => Http.post('API_EFORM_GENERAL', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer']}, dispatch);

const listAllProductNewEstore = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer']}, dispatch);

const detailMerchantProduct = (payload, dispatch) => Http.post('API_EFORM_GENERAL', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer']}, dispatch);

const checkoutPurchaseOrder = (payload, dispatch) => Http.post('API_EFORM_GENERAL', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer', 'isBeforeLogin']}, dispatch);

const checkoutPurchaseOrderNewEstore = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer']}, dispatch);

const listaddress = (payload, dispatch) => Http.post('API_EFORM_GENERAL', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer']}, dispatch);

const listaddressNewEstore = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer']}, dispatch);

const paymentProductEstore = (payload, dispatch) => Http.postV4('PAYMENT_ESTORE', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'sessionCode', 'tokenClient', 'tokenServer', 'E2EE_RANDOM', 'easyPin']}, dispatch);

const paymentProductEstoreNew = (payload, dispatch) => Http.postV4('PAYMENT_ESTORE_NEW', payload,
  {additional: ['TXID', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient', 'ipassport', 'easyPin']}, dispatch);

const createJwt = (payload, dispatch) => Http.post('CREATE_JWT', payload, {}, dispatch);

const getOffersPrivate = (payload, dispatch) => Http.post('OFFERS', payload,
  {additional: ['lang', 'tokenClient', 'tokenServer']}, dispatch);

const getPurchaseOrderAlfa = (payload, dispatch) => Http.postALFACART('CHECKOUT_ALFA_CART', payload,
  {additional: ['lang', 'tokenClient', 'tokenServer']}, dispatch);

const refreshStorageV2 = (payload, dispatch) => Http.post('REFRESH_STORAGE_NEW', payload,
  {additional: ['TXID', 'ipassport']}, dispatch);

const detailProduct = (payload, dispatch) => Http.post('DETAIL_PRODUCT', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer']}, dispatch);

const detailProductNewEstore = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer']}, dispatch);


const saveAddressAlfaCart = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['lang', 'ipassport', 'tokenClient', 'tokenServer']}, dispatch);


const checkStockAlfa = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['lang', 'ipassport', 'tokenClient', 'tokenServer']}, dispatch);


const updateAddressAlfa = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['lang', 'ipassport', 'tokenClient', 'tokenServer']}, dispatch);


const setDefaultAddressAlfa = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['lang', 'ipassport', 'tokenClient', 'tokenServer']}, dispatch);

const deleteAddressAlfa = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['lang', 'ipassport', 'tokenClient', 'tokenServer']}, dispatch);


const searchAlfaStore = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['lang', 'tokenClient', 'tokenServer']}, dispatch);


const checkoutFromCart = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['lang', 'tokenClient', 'tokenServer']}, dispatch);

const updateDeliveryFeeEstore = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['lang', 'ipassport', 'tokenClient', 'tokenServer']}, dispatch);


const searchAlfaStoreName = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['lang', 'tokenClient', 'tokenServer']}, dispatch);
const checkSelfieImage = (payload, dispatch) => Http.post('CHECK_SELFIE_IMAGE', payload,
  {additional: ['ipassport']}, dispatch);

const upgradeKYCNew = (payload, dispatch) => Http.post('UPGRADE_KYC_NEW', payload,
  {additional: ['ipassport']}, dispatch);

const sendEmailToken = (payload, dispatch) => Http.post('SEND_EMAIL_TOKEN', payload,
  {additional: ['ipassport']}, dispatch);

const validateEmailToken = (payload, dispatch) => Http.post('VALIDATE_EMAIL_TOKEN', payload,
  {additional: ['ipassport']}, dispatch);

const transferSplitBill = (payload, dispatch) => Http.post('TRANSFER_SPLITBILL', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch);

const getDetailLockedAmount = (payload, dispatch) => Http.post('DETAIL_LOCKED_AMOUNT', payload,
  {additional: ['lang', 'TXID', 'ipassport']}, dispatch);

const getSimasTaraDetail = (payload, dispatch) => Http.post('SIMAS_TARA_DETAIL', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const getSimasTaraClose = (payload, dispatch) => Http.post('SIMAS_TARA_CLOSE', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM']}, dispatch);

const getUserDetailForNB = (payload, dispatch) => Http.post('GET_USER_DETAIL_NB', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getProductList = (lang, dispatch) => lang === 'en' ? Http.get('GET_PRODUCT_LIST_EN', {}, dispatch) : Http.get('GET_PRODUCT_LIST_ID', {}, dispatch);
// const getProductList = (payload, dispatch) =>  Http.get('GET_PRODUCT_LIST', payload, dispatch);

const getDropList = (lang, dispatch) => lang === 'en' ? Http.get('GET_DROP_LIST_EN', {}, dispatch) : Http.get('GET_DROP_LIST_ID', {},  dispatch);

const getCityListSil = (payload, dispatch) => Http.get('GET_CITY_LIST_SIL', payload, dispatch);

const getProfileQuestion = (payload, dispatch) => Http.post('GET_PROFILE_QUESTION', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getMoneyInsuredSil = (payload, dispatch) => Http.post('NB_PERTANGGUNGAN', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getHealthQuestion = (payload, dispatch) => Http.post('GET_HEALTH_QUESTION', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const inputPolisIndividu = (payload, dispatch) => Http.post('GET_POLIS_INDIVIDU', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const digitalSigning = (payload, dispatch) => Http.post('DIGITAL_SIGNING', payload,
  {additional: ['ipassport']}, dispatch);

const confirmTransIndividu = (payload, dispatch) => Http.post('CONFIRM_TRANSACTION_INDIVIDU', payload,
  {additional: ['ipassport']}, dispatch);

const getEgiftMost = (payload, dispatch) => Http.postV4('GET_EGIFT_MOST', payload,
  {additional: []}, dispatch);

const getPartnerList = (payload, dispatch) => Http.post('GET_PARTNER_LIST', payload,
  {additional: ['ipassport']}, dispatch);

const unlinkPartner = (payload, dispatch) => Http.post('UNLINK_PARTNER', payload,
  {additional: ['ipassport']}, dispatch);

const getInbox = (payload, additional, dispatch) => Http.post('GET_PUSH_NOTIF', payload,
  {additional}, dispatch);

const getListValas = (payload, dispatch) => Http.get('GET_LIST_VALAS', payload, dispatch);

const validateCode =  (payload, dispatch) => Http.post('VALIDATE_CODE', payload,
  {additional: ['ipassport']}, dispatch);

const generateCodeQrTcico = (payload, dispatch) => Http.postV3('GENERATE_CODE_QRTCICO', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const inquiryCashout = (payload, dispatch) => Http.post('INQUIRY_QRCASHOUT', payload,
  {additional: ['ipassport', 'lang', 'TXID']}, dispatch);

const transactionQRcashout = (payload, dispatch) => Http.post('PAYMENT_QRCASHOUT', payload,
  {additional: ['ipassport', 'lang', 'TXID', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'easyPin']}, dispatch);

const confirmTransferQr = (payload, additional, dispatch) => Http.postV4('CONFIRM_TRANSFER_QR', payload,
  {additional}, dispatch);

const transferQr = (payload, dispatch) => Http.post('TRANSFER_QR', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch);
// SET LIMIT TRANSACTION

const listLimitTransaction = (payload, dispatch) => Http.post('LIST_LIMIT_TRANSACTION', payload,
  {additional: ['ipassport']}, dispatch);

const editLimitTransaction = (payload, dispatch) => Http.post('EDIT_LIMIT_TRANSACTION', payload,
  {additional: ['ipassport', 'lang', 'sessionCode', 'E2EE_RANDOM', 'easyPin', 'tokenClient', 'tokenServer']}, dispatch);

const deleteLimitTransaction = (payload, dispatch) => Http.post('DELETE_LIMIT_TRANSACTION', payload,
  {additional: ['ipassport']}, dispatch);

const addLimitTransaction = (payload, dispatch) => Http.post('ADD_LIMIT_TRANSACTION', payload,
  {additional: ['ipassport', 'lang', 'sessionCode', 'E2EE_RANDOM', 'easyPin', 'tokenClient', 'tokenServer']}, dispatch);

const listStoreAlfamart = (payload, dispatch) => Http.post('LIST_STORE_ALFAMART', payload,
  {additional: ['lang', 'tokenClient', 'tokenServer']}, dispatch);

const getCacheData = (payload, dispatch) => Http.get('GET_CACHE_DATA', payload, dispatch);

const getCustomerDetailAddAtm = (payload, dispatch) => Http.post('GET_CUSTOMER_DETAIL_ADD_ATM', payload,
  {additional: ['ipassport']}, dispatch);

const checkBalanceAddAtm = (payload, dispatch) => Http.post('CHECK_BALANCE_ADD_ATM', payload,
  {additional: ['ipassport']}, dispatch);

const getLinkingCard = (payload, dispatch) => Http.post('GET_LINKING_CARD', payload,
  {additional: ['ipassport', 'tokenServer', 'tokenClient', 'lang']}, dispatch);

const getInquiryStarInvestama = (payload, dispatch) => Http.post('GET_INQ_STAR_INVESTAMA', payload,
  {additional: ['ipassport']}, dispatch);

const securityAuthenticate = (payload, dispatch) => Http.post('SECURITY_AUTHENTICATE', payload,
  {additional: ['ipassport']}, dispatch);

const checkOperationTime = (payload, dispatch) => Http.post('CHECK_REMITTANCE_OPERATION_TIME', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const validateSwiftCode = (payload, dispatch) => Http.post('VALIDATE_SWIFT_CODE', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const currencyPurpose = (payload, dispatch) => Http.post('CURRENCY_PURPOSE', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const detailSenderRemittance = (payload, dispatch) => Http.post('DETAIL_SENDER_REMITTANCE', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const exchangeCurrency = (payload, dispatch) => Http.post('EXCHANGE_CURRENCY', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getCurrencyMulti = (payload, dispatch) => Http.get('GET_CURRENCY_MULTI', payload, dispatch);

const digitalEForm = (payload, dispatch) => Http.post('DIGITAL_EFORM', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getCreditCardProducts = (payload, dispatch) => Http.post('GET_GENERIC_CREDIT_CARD_LIST', payload,
  {additional: []}, dispatch);

const sendDataProxyAccount = (payload, dispatch) => Http.post('SEND_DATA_PROXY', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer', 'lang']}, dispatch);

const getTargetAccountRemittance = (payload, additional, dispatch) => Http.post('HISTORY_REMITTANCE', payload,
  {additional: ['ipassport']}, dispatch);

const confirmRemittance = (payload, additional, dispatch) => Http.post('CONFIRMATION_REMITTANCE', payload,
  {additional}, dispatch);

const transferRemittance = (payload, dispatch) => Http.post('TRANSFER_REMITTANCE', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch);

const getConfigDataSavingValas = (payload, dispatch) => Http.post('GET_CONFIG_DATA_SAVING_VALAS', payload,
  {additional: ['ipassport']}, dispatch);

const getConvertAmountSavingValas = (payload, dispatch) => Http.post('GET_CONVERT_AMOUNT_SAVING_VALAS', payload,
  {additional: ['ipassport']}, dispatch);

const getRateSimasTara = (payload, dispatch) => Http.post('GET_RATE_SIMAS_TARA', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);
const getKeyVCC = (payload, dispatch) => Http.post('GET_KEY_VCC', payload,
  {additional: ['ipassport']}, dispatch);

const getVccTwo = ({panNumber, key, iv, easyPin}, dispatch) => encryptATMStringVCC(panNumber).
  then((panNumber) => encryptATMStringVCC(key).
    then((encryptKey) =>  encryptATMStringVCC(iv).
      then((encryptIv) => Http.post('CREDIT_CARD_CVV_INQUIRY', {panNumber, key: encryptKey, iv: encryptIv, easyPin},
        {additional: ['ipassport', 'lang', 'tokenClient', 'tokenServer', 'E2EE_RANDOM']}, dispatch))));

// const downloadStatement = ({panNumber, CrdDelivOpt, Name, easyPin}, dispatch) => encryptATMStringVCC(panNumber).then((panNumber) => Http.post('GET_DOWNLOAD_STATEMENT', {panNumber, CrdDelivOpt, Name, easyPin},
// {additional: ['ipassport', 'lang']}, dispatch));

const downloadStatement = (payload, dispatch) => Http.getForQR('GET_DOWNLOAD_STATEMENT', payload.accountNumber, {}, dispatch);
//
const downloadStatement2 = (payload, dispatch) => Http.post('GET_DOWNLOAD_STATEMENT2', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getEtaxInfo = (dispatch) => Http.get('GET_TAX_INFORMATION', {}, dispatch);

const saveEtaxImage = (payload, additional, dispatch) => Http.post('SAVE_IMAGE_ETAX', payload,
  {additional}, dispatch);

const getEtaxImage = (payload, additional, dispatch) => Http.post('GET_IMAGE_ETAX', payload,
  {additional}, dispatch);

const getEtaxUserDetail = (payload, additional, dispatch) => Http.post('TAX_USER_DETAIL', payload, 
  {additional}, dispatch);

const createIdBiling = (payload, additional, dispatch) => Http.post('CREATE_ID_BILLING', payload, 
  {additional}, dispatch);

const getJenisSetoran = (payload, additional, dispatch) => Http.post('GET_JENIS_SETORAN', payload, 
  {additional}, dispatch);

const getIdBillingDetail = (payload, additional, dispatch) => Http.post('TAX_BILLING_DETAIL', payload, 
  {additional}, dispatch);

const getEtaxHistory = (payload, additional, dispatch) => Http.post('GET_ETAX_HISTORY', payload, 
  {additional}, dispatch);
  
const deleteFromPayeeListRemittance = (payload, dispatch) => Http.post('DELETE_PAYEE_REMITTANCE', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getMerchantId = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer']}, dispatch);

const setAllowInternetBanking = (payload, dispatch) => Http.post('SET_ALLOW_IB', payload,
  {additional: ['lang', 'ipassport', 'easyPin', 'tokenClient', 'E2EE_RANDOM']}, dispatch);

const getAllowInternetBanking = (dispatch) => Http.post('GET_ALLOW_IB', {},
  {additional: ['ipassport']}, dispatch);

const getAutoSave = (payload, dispatch) => Http.post('AUTO_SAVE', payload,
  {additional: ['TXID', 'ipassport', 'lang']}, dispatch);

const getGiveAway = (payload, dispatch) => Http.postV4('GET_INQUIRY_GIVEAWAY', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getReferralCode = (payload, dispatch) => Http.post('GET_REFERRAL_CODE', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getReferralList = (payload, dispatch) => Http.post('GET_REFERRAL_LIST', payload,
  {additional: ['ipassport']}, dispatch);

const getHistoryReward = (payload, dispatch) => Http.post('GET_HISTORY_REWARD', payload,
  {additional: ['ipassport']}, dispatch);

const getDetailHistoryReward = (payload, dispatch) => Http.post('GET_DETAIL_HISTORY_REWARD', payload,
  {additional: ['ipassport']}, dispatch);

const getRewardBalance = (payload, dispatch) => Http.post('GET_REWARD_BALANCE', payload,
  {additional: ['ipassport']}, dispatch);

const getReedemPoin = (payload, dispatch) => Http.post('GET_REEDEM_POIN_MGM', payload,
  {additional: ['ipassport']}, dispatch);

const searchMetaData = (payload, dispatch) => Http.post('SEARCH_METADATA', payload,
  {additional: ['tokenClient', 'tokenServer']}, dispatch);

const resetPassWithoutCard = (payload, dispatch) => Http.post('RESET_PASS_WITHOUT_CARD', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const checkImage = (payload, dispatch) => Http.post('CHECK_IMAGE', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const commitPengkinianData = (payload, dispatch) => Http.post('COMMIT_PENGKINIAN', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const spreadMarginValasRefreshRateValas = (payload, dispatch) => Http.postV4('SPREAD_MARGIN_VALAS_REFRESH_RATE_VALAS', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const spreadMarginValasRefreshRateRemittance = (payload, dispatch) => Http.post('SPREAD_MARGIN_VALAS_REFRESH_RATE_REMITTANCE', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const redeemVoucher = (payload, dispatch) => Http.postV4('REDEEM_VOUCHER', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const deleteVoucher = (payload, dispatch) => Http.postV4('DELETE_VOUCHER', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const eformGeneralNew = ({requestData, targetUrl, type, auth, newChar}, dispatch) => encryptEFormString(auth).
  then((auth) => encryptEFormString(newChar).
    then((newChar) => Http.post('API_EFORM_GENERAL_NEW', {requestData, targetUrl, type, auth, newChar},
      {additional: ['ipassport']}, dispatch)));

const getConvertAmountMedalion = (payload, dispatch) => Http.post('GET_CONVERT_AMOUNT_MEDALION', payload,
  {additional: ['ipassport']}, dispatch);

const confirmInstallment = (payload, dispatch) => Http.post('CREDIT_CARD_INST_CONFIRM', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

// BI FAST
const inquiryProxyByEDW = (payload, dispatch) => Http.post('INQUIRY_PROXY_BY_EDW', payload,
  {additional: ['ipassport']}, dispatch);

const proxyRegister = (payload, dispatch) => Http.post('PROXY_REGISTER', payload,
  {additional: ['ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch);

const proxyPorting = (payload, dispatch) => Http.post('PROXY_PORTING', payload,
  {additional: ['ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch);

const detailByCustNo = (payload, dispatch) => Http.post('DETAIL_BY_CUST_NO', payload,
  {additional: ['ipassport']}, dispatch);

const proxyResolution = (payload, dispatch) => Http.post('PROXY_RESOLUTION', payload,
  {additional: ['ipassport']}, dispatch);

const proxyResolutionCT = (payload, dispatch) => Http.post('GET_RESOLUTION_CT', payload,
  {additional: ['ipassport']}, dispatch);

const confirmationProxyCT = (payload, dispatch) => Http.post('GET_CONFIRMATION_CT', payload,
  {additional: ['ipassport']}, dispatch);

const proxyUpdate = (payload, dispatch) => Http.post('PROXY_UPDATE', payload,
  {additional: ['ipassport', 'tokenServer', 'tokenClient', 'lang', 'E2EE_RANDOM']}, dispatch);

const proxyUnlink = (payload, dispatch) => Http.post('PROXY_UNLINK', payload,
  {additional: ['ipassport', 'tokenServer', 'tokenClient', 'lang', 'E2EE_RANDOM']}, dispatch);

const sumbitProxyTf = (payload, dispatch) => Http.post('SUBMIT_PROXY_TF', payload,
  {additional: ['ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch);

const getTargetAccountProxyAddress = (payload, additional, dispatch) => Http.post('HISTORY_PROXY_ADDRESS', payload,
  {additional: ['ipassport']}, dispatch);

const sendEmailTokenProxy = (payload, dispatch) => Http.post('SEND_EMAIL_TOKEN_PROXY', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const confirmTransferBiFast = (payload, additional, dispatch) => Http.postV4('CONFIRMATION_TRANSFER_BIFAST', payload,
  {additional}, dispatch);

const transferBiFast = (payload, dispatch) => Http.post('TRANSFER_BIFAST', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'E2EE_RANDOM', 'tokenServer', 'tokenClient']}, dispatch);

const getPayeeNameBiFast = (payload, additional, dispatch) => Http.post('GET_PAYEE_NAME_BIFAST', payload,
  {additional}, dispatch);

const deleteFromPayeeListBiFast = (payload, dispatch) => Http.postV4('DELETE_PAYEE_BIFAST', payload,
  {additional: ['ipassport', 'lang', 'sessionCode', 'E2EE_RANDOM', 'easyPin', 'tokenClient', 'tokenServer']}, dispatch);

const getUserLoanAcc = (dispatch) => Http.post('GET_LOAN_ACCOUNTS', {},
  {additional: ['ipassport']}, dispatch);

const getApprovalPPA = (dispatch, payload) => Http.getPrivate('GET_APPROVAL_PPA', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const getRiplayPdfUmum = (payload, dispatch) => Http.get('GET_RIPLAY_PDF_UMUM', payload,
  {additional: ['ipassport']}, dispatch);

const getRiplayPdfPersonal = (payload, dispatch) => Http.get('GET_RIPLAY_PDF_PERSONAL', payload,
  {additional: ['ipassport']}, dispatch);

const getRiplayPersonal = (payload, dispatch) => Http.post('GET_RIPLAY_PERSONAL', payload,
  {additional: ['ipassport', 'lang']}, dispatch);

const productListForCartWhislist = (payload, dispatch) => Http.post('API_FORM_ESTORE', payload,
  {additional: ['ipassport', 'tokenClient', 'tokenServer']}, dispatch);

const getListConfigEForm = (dispatch) => Http.get('LIST_CONFIG_EFORM', {}, dispatch);

const getBankList = (dispatch) => Http.get('GET_BANK_LIST', {}, dispatch);

const emoneyConfig = (payload, dispatch) => Http.get('EMONEY_CONFIG', payload, dispatch);

const getChargeList = (dispatch) => Http.get('CHARGE_CONFIG', {}, dispatch);

const releaseDormant = (payload, dispatch) => Http.post('RELEASE_DORMANT_ACCOUNT', payload,
  {additional: ['TXID', 'ipassport', 'lang', 'tokenClient', 'tokenServer', 'easyPin', 'E2EE_RANDOM']}, dispatch);

const getClosingDetails = (payload, dispatch) => Http.post('GET_CLOSING_DETAIL', payload, {additional: ['ipassport', 'lang']}, dispatch);

const commitClosingAccount = (payload, dispatch) => Http.post('COMMIT_CLOSING_ACCOUNT', payload, {additional: ['ipassport', 'lang']}, dispatch);

const getClosingConfig = (dispatch) => Http.get('GET_CLOSING_CONFIG', {}, dispatch);

const getNilaiQ = (payload, dispatch) => Http.post('GET_NILAI_Q', payload, {additional: ['ipassport']}, dispatch);

module.exports = {
  retrieveHSMInitKeys,
  login,
  loginV2,
  getAppConfig,
  transfer,
  getBalances,
  addNewPayee,
  mobileTopup,
  getbillerConfig,
  getPayeeName,
  enquireWaterBill,
  payWaterBill,
  enquireElectricityBill,
  payElectricityBill,
  enquirePostpaidBill,
  payPostpaidBill,
  otpVerify,
  verifyATM,
  verifyUsername,
  verifyPassword,
  verifyEasyPin,
  otpResend,
  createUsernamePassword,
  easyPinRegister,
  updateEasyPin,
  getTransactionHistory,
  getTransactionHistoryNew,
  getMiniStatement,
  getTimeDeposit,
  getCreditCard,
  getTransRefNum,
  logOut,
  tdConfig,
  tdConfirmation,
  tdTransaction,
  tdsConfig,
  tdsConfirmation,
  tdsTransaction,
  changePassword,
  refreshStorage,
  resetDefaultPayload,
  linkCreditCard,
  inquireCreditCardBill,
  creditCardTransaction,
  creditCardStatement,
  creditCardSetInstallment,
  creditCardChangeInstallment,
  creditCardTxnManage,
  creditCardGetTxnManage,
  resendPaymentOTP,
  getCreditCardTransactionHistory,
  versionCheck,
  confirmBlockCreditCard,
  requestBlockCreditCard,
  confirmCreditCardOption,
  requestCreditCardOption,
  sendFeedback,
  confirmCreditCardChangeLimit,
  requestCreditCardChangeLimit,
  getOffers,
  getBanners,
  closeTimeDeposit,
  getTdDisclaimer,
  shareReferralCode,
  fetchPanNumber,
  fetchPinNumber,
  getUserApiKey,
  qrPayment,
  sendEFormNTB,
  enquireGenericBill,
  payGenericBill,
  loginQR,
  invoiceQR,
  getLanguage,
  getRegexPasswordPolicy,
  confirmationElectricityBill,
  confirmationMobileTopup,
  resultElectricityBill,
  resultMobileTopup,
  confirmationMobilePostPaid,
  resultMobilePostPaid,
  confirmationWaterBill,
  resultWaterBill,
  getQrStatus,
  confirmGenericBill,
  detailGenericBill,
  resultGenericBill,
  getwealthManagement,
  getwealthManagementView,
  getwealthManagementLinkUnlink,
  getDetailTransactionHistory,
  getFetchUserSimobi,
  getQrPromoList,
  merchantQR,
  confirmTransfer,
  registerFace,
  getTravelInsurance,
  getPAInsurance,
  confirmPAInsurance,
  resultPAInsurance,
  detectFace,
  getPaydayLoan,
  getLoanList,
  openAccountConfig,
  openAccountConfirmation,
  openAccount,
  sendPaydayLoanForm,
  getPaydayLoanData,
  sfRedeem,
  getRecurringTransferHistory,
  posteditingRecurringTransferHistory,
  deleteRecurringTransferHistory,
  getBalanceEmoney,
  getGpnMerchant,
  transactionQRGpn,
  checkRegisterEmoney,
  sendEmailOtpEmoneyRegister,
  sendOtpActivation,
  resendOtpActivation,
  verifyOtpActivation,
  commonRegistrationActivation,
  registerEmoney,
  closeEmoneyAccount,
  getTransactionEmoneyHistory,
  checkResetPasskyc,
  checkingResetPasskyc,
  resetPasswordEMoney,
  getMerchantList,
  getTerminalList,
  getTerminalDelete,
  getTerminalEdit,
  getTerminalReset,
  getEgiftListPage,
  inquirySimasPoin,
  purchaseEgift,
  getDataMyOrder,
  getDetailTransactionEmoneyHistory,
  upgradeEmoneyKyc,
  checkPhoneForCC,
  checkEmailOrami,
  registerVerifyOrami,
  dukcapilKTP,
  requestOtpEform,
  verifyOtpEform,
  getProvinceList,
  getCityList,
  getDistrictList,
  getSubDistrictList,
  getCcDataCif,
  getRefundCode,
  getGenerateRefundCode,
  getCpan,
  getSeatLayout,
  getMovieCgv,
  getCinemaCgv,
  getCgvSchedule,
  getCgvComingSoon,
  getSelectedSeat,
  getPaymentCinema,
  getEgiftDetail,
  getEgiftCache,
  getSimasPoinHistory,
  qrVoucherDiscount,
  qrDiscountMerchantList,
  qrDiscountMerchantDetail,
  getVoucherList,
  getVoucherListDetail,
  checkVoucherValidity,
  deleteFromPayeeList,
  getATMList,
  getBillpayHistory,
  deleteBillpayHistory,
  registerSavingAccount,
  getFlightReserv,
  getFlightAvailability,
  getFareDetail,
  getListPassenger,
  addListPassenger,
  getFlightPayment,
  countryIso,
  confirmTravelInsurance,
  resultTravelInsurance,
  usernameAvailability,
  getParamQRGPN,
  registerQRGpn,
  getStoreQRList,
  getStoreDelete,
  storenameAvailability,
  addPicture,
  updatePicture,
  generateOnlineCode,
  generateCode,
  generateCodeII,
  sendEmailLuckydraw,
  inquiryToken,
  tokenPayment,
  incompleteInvoice,
  generateVoucherCode,
  getSuggestVoucher,
  subscriptionReksadana,
  redemptionReksadana,
  summaryDetailLastTransReksadana,
  getFavBiller,
  addFavBiller,
  deleteFavBiller,
  editFavBiller,
  inquiryGpnTag51,
  getDetailWinner,
  checkWinnerLuckydraw,
  sendOtpResetPassword,
  verifyOtpResetPassword,
  doResetPassword,
  getReleaseDeviceQR,
  checkReleaseDeviceQR,
  confirmReleaseDeviceQR,
  updateReleaseDeviceQR,
  otpVerifyChangeDevice,
  getReleaseDeviceQRRevamp,
  checkReleaseDeviceQRRevamp,
  confirmReleaseDeviceQRRevamp,
  updateReleaseDeviceQRRevamp,
  logOutChangeDevice,
  getSavingProducts,
  getAutoDebitList,
  deleteAutoDebitList,
  getCurrentToken,
  getEmFundSIL,
  getDefaultAccount,
  setDefaultAccount,
  getInquiryMMQ,
  getMMQDetail,
  apiGeneral,
  getLoanProducts,
  getWorkList,
  genericRegistration,
  getCurrentRegistration,
  sendDataPGO,
  sendDataAdressBook,
  checkingCifNK,
  getInquirySIL,
  getDukcapilData,
  eformGeneral,
  splitBillConfirmationReceipt,
  sendSplitBill,
  getListSplitBillBySender,
  getListSplitBillByReceiver,
  editStatusSplitBillYouBill,
  requestSplitBillYouBill,
  rejectSplitBillYouOwe,
  deleteYouBillList,
  reminderSplitBillYouBill,
  downloadReceiptSplitBill,
  setFeedbackData,
  getFeedbackData,
  getBalanceEmoneyLanding,
  eformGeneralNoAuth,
  getInquiryCardInfo,
  getActivationCard,
  getLockdownFlag,
  setLockdownFlag,
  getSpinRewards,
  getRewardHistory,
  getLocationAlfaTrex,
  saveAddressUser,
  getTrackingNumber,
  getCustomerPortofolio,
  getCustomerProfile,
  checkAccountList,
  checkStatusInvoice,
  locationUpgradeKyc,
  listAllProduct,
  getTargetAccount,
  listCategoryProduct,
  detailMerchantProduct,
  checkoutPurchaseOrder,
  listaddress,
  paymentProductEstore,
  getOffersPrivate,
  getPurchaseOrderAlfa,
  loginNew,
  refreshStorageV2,
  detailProduct,
  saveAddressAlfaCart,
  checkStockAlfa,
  updateAddressAlfa,
  setDefaultAddressAlfa,
  deleteAddressAlfa,
  searchAlfaStore,
  checkoutFromCart,
  updateDeliveryFeeEstore,
  listaddressNewEstore,
  detailProductNewEstore,
  listCategoryProductNewEstore,
  listAllProductNewEstore,
  checkoutPurchaseOrderNewEstore,
  searchAlfaStoreName,
  checkSelfieImage,
  upgradeKYCNew,
  sendEmailToken,
  validateEmailToken,
  getQRCpan,
  getCodeQRCPM,
  transferSplitBill,
  getSimasTaraDetail,
  getSimasTaraClose,
  getDetailLockedAmount,
  getUserDetailForNB,
  getProductList,
  getDropList,
  getCityListSil,
  getProfileQuestion,
  getMoneyInsuredSil,
  getHealthQuestion,
  inputPolisIndividu,
  digitalSigning,
  // getNoEspaj
  confirmTransIndividu,
  getEgiftMost,
  getLocationAlfamart,
  listStoreAlfamart,
  getListValas,
  getPartnerList,
  unlinkPartner,
  getInbox,
  validateCode,
  generateCodeQrTcico,
  listLimitTransaction,
  editLimitTransaction,
  addLimitTransaction,
  deleteLimitTransaction,
  getRedemptionFee,
  getCacheData,
  getCustomerDetailAddAtm,
  checkBalanceAddAtm,
  getLinkingCard,
  getInquiryStarInvestama,
  securityAuthenticate,
  inquiryCashout,
  transactionQRcashout,
  confirmTransferQr,
  transferQr,
  updateInvoiceFT,
  reminderMaxBalanceSplitBill,
  creditCardCashAdvanceFee,
  creditCardCashAdvance,
  creditCardSourceOfFund,
  creditCardGetNotif,
  creditCardSetNotif,
  checkOperationTime,
  validateSwiftCode,
  currencyPurpose,
  detailSenderRemittance,
  exchangeCurrency,
  getCurrencyMulti,
  digitalEForm,
  getCreditCardProducts,
  sendDataProxyAccount,
  getTargetAccountRemittance,
  confirmRemittance,
  transferRemittance,
  getConfigDataSavingValas,
  getConvertAmountSavingValas,
  getRateSimasTara,
  saveEtaxImage,
  getEtaxUserDetail,
  createIdBiling,
  getJenisSetoran,
  getIdBillingDetail,
  getEtaxHistory,
  getEtaxImage,
  getEtaxInfo,
  deleteFromPayeeListRemittance,
  getCurrentTokenNew,
  getSpinRewardsNew,
  setAllowInternetBanking,
  getAllowInternetBanking,
  getAutoSave,
  getGiveAway,
  transactionQRCrossBorder,
  inquiryCrossBorder,
  getReferralCode,
  getReferralList,
  getHistoryReward,
  getDetailHistoryReward,
  getRewardBalance,
  getReedemPoin,
  addAutodebit,
  getAutoDebitHistory,
  editAutodebit,
  deleteAutoDebitListNew,
  createJwt,
  paymentProductEstoreNew,
  searchMetaData,
  resetPassWithoutCard,
  getSimasPoinHistoryMgm,
  inquirySimasPoinMgm,
  commitPengkinianData,
  checkImage,
  creditcardActivation,
  creditcardBlockUnblock,
  creditcardCVV2,
  createPINVCC,
  printCardVCC,
  getAddressCC,
  getKeyVCC,
  getVccTwo,
  downloadStatement,
  downloadStatement2,
  getAddressCCNew,
  spreadMarginValasRefreshRateValas,
  spreadMarginValasRefreshRateRemittance,
  eformGeneralNew,
  redeemVoucher,
  getConvertAmountMedalion,
  confirmInstallment,
  inquiryProxyByEDW,
  proxyRegister,
  proxyPorting,
  detailByCustNo,
  proxyResolution,
  proxyResolutionCT,
  confirmationProxyCT,
  proxyUpdate,
  proxyUnlink,
  sumbitProxyTf,
  getTargetAccountProxyAddress,
  sendEmailTokenProxy,
  confirmTransferBiFast,
  transferBiFast, 
  getPayeeNameBiFast,
  deleteFromPayeeListBiFast,
  getUserLoanAcc,
  getApprovalPPA,
  getRiplayPdfUmum,
  getRiplayPdfPersonal,
  getRiplayPersonal,
  getMerchantId,
  productListForCartWhislist,
  getListConfigEForm,
  getBankList,
  emoneyConfig,
  getChargeList,
  deleteVoucher,
  releaseDormant,
  getClosingDetails,
  commitClosingAccount,
  getClosingConfig,
  getNilaiQ,
};
