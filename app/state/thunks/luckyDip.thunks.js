import * as actionCreators from '../actions/index.actions.js';
import {storageKeys, set, getLastAddressLuckyDip} from '../../utils/storage.util';
import api from '../../utils/api.util';
import result from 'lodash/result';
import {getErrorMessage} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
import {find, sortBy, isEmpty, lowerCase, filter} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {change} from 'redux-form';
import moment from 'moment';

export function luckyDipSendDataAddress (pathRoute, reward, transRefNum) {
  return (dispatch, getState) => {
    const state = getState();
    const formValuesAddress = result(state, 'form.LuckyDipInformation.values', {});
    const fullName = result(formValuesAddress, 'fullName', '');
    const lastName = result(formValuesAddress, 'lastName', '');
    const customerName = lastName === '' ? fullName : fullName + ' ' + lastName;
    const mobileNumber = result(formValuesAddress, 'phoneNumber', '');
    const homeAddress = result(formValuesAddress, 'streetAddress', '');
    const province = result(formValuesAddress, 'province.name', '');
    const city = result(formValuesAddress, 'city.name', '');
    const district = result(formValuesAddress, 'district.name', '');
    const subDistrict = result(formValuesAddress, 'subDistrict.name', '');
    const zipCode = result(formValuesAddress, 'postalCode', '');
    const note = result(formValuesAddress, 'note', '');
    const destCode = result(formValuesAddress, 'subDistrict.destCode', '');
    const address = {homeAddress, province, city, district, subDistrict, zipCode, note, destCode, customerName};
    const payload = {reward, address, transRefNum, mobileNumber, customerName};
    dispatch(actionCreators.showSpinner());
    return api.saveAddressUser(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      const resultPushOrderCode = result(res, 'data.resultPushOrder.responseCode', '');
      const resultSaveAddressCode = result(res, 'data.resultSaveAddress.responseCode', '');
      const resultUpdateOrderStatusCode = result(res, 'data.resultUpdateOrderStatus.responseCode', '');
      if (resultPushOrderCode === '00' && resultSaveAddressCode === '00' && resultUpdateOrderStatusCode === '00') {
        set(storageKeys['LUCKY_DIP_ADDRESS_STORAGE'], formValuesAddress);
        dispatch(NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: pathRoute}),
            NavigationActions.navigate({routeName: 'LuckyDipMainPage'})
          ]
        }));
        Toast.show('Data berhasil dikirim!');
      } else {
        Toast.show('Data tidak berhasil dikirim, cobalah beberapa saat lagi!');
      }
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
      Toast.show('Koneksi ke server sedang bermasalah, cobalah beberapa saat lagi!');
    });
  };
}

export function getLocalDataAddress () {
  return (dispatch) => {
    getLastAddressLuckyDip().then((res) => {
      dispatch(actionCreators.saveLuckyDipAddress(res));
      const name = result(res, 'fullName', '');
      const phoneNumber = result(res, 'phoneNumber', '');
      if (name !== '' && phoneNumber !== '') {
        dispatch(change('LuckyDipInformation', 'province', result(res, 'province', {})));
        dispatch(change('LuckyDipInformation', 'city', result(res, 'city', {})));
        dispatch(change('LuckyDipInformation', 'district', result(res, 'district', {})));
        dispatch(change('LuckyDipInformation', 'subDistrict', result(res, 'subDistrict', {})));
        dispatch(change('LuckyDipInformation', 'postalCode', result(res, 'postalCode', '')));
        dispatch(change('LuckyDipInformation', 'fullName', result(res, 'fullName', '')));
        dispatch(change('LuckyDipInformation', 'lastName', result(res, 'lastName', '')));
        dispatch(change('LuckyDipInformation', 'streetAddress', result(res, 'streetAddress', '')));
        dispatch(change('LuckyDipInformation', 'phoneNumber', result(res, 'phoneNumber', '')));
        dispatch(change('LuckyDipInformation', 'note', result(res, 'note', '')));
      }
    });
  };
}

export function luckyDipGetHistory (pathRoute) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ' '));
    return api.getRewardHistory({}, dispatch).then((res) => {
      const luckyDipRewardRaw = result(res, 'data.simasPoin.data.dataUndian', []);
      const luckyDipReward = find(luckyDipRewardRaw, {cifCode: cifCode});
      const listPrize = result(luckyDipReward, 'listPrize', []);
      const searchEvoucher = filter(listPrize, function (o) {
        const type = result(o, 'rewards.0.type', '');
        return type !== '';
      });
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.navigate({routeName: 'LuckyDipHistoryPage', params: {pathRoute, listPrize: searchEvoucher}}));
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function trackingHistory (values, reward, shipmentID) {
  return (dispatch) => {
    dispatch(actionCreators.showSpinner());
    const payload = {shipmentID};
    return api.getTrackingNumber(payload, dispatch).then((res) => {
      const trackingNumber = result(res, 'data.resultTrackingShipment.awbNo', '');
      dispatch(actionCreators.hideSpinner());
      dispatch(NavigationActions.navigate({routeName: 'LuckyDipInformationDetailPage', params: {buttonOff: true, values, reward, trackingNumber}}));
    }).catch(() => {
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function getLuckyDipTicket () {
  return (dispatch, getState) => {
    const state = getState();
    const luckyDipMultiTierFlag = lowerCase(result(state, 'config.flag.flagHHHMultiTier', 'inactive')) === 'active';
    if (luckyDipMultiTierFlag) {
      return api.getCurrentTokenNew({}, dispatch).then((res) => {
        const tokenDataObjectRaw = result(res, 'data.listToken', []);
        // gold
        const listTokenGold = find(tokenDataObjectRaw, function (val) {
          return result(val, 'userToken.voucher.code', '') === 'LUCKYDIPGOLD';
        });
        const currentTokenGold = String(result(listTokenGold, 'userToken.redeemCounter', '0'));
        const tokenIdGold = String(result(listTokenGold, 'userToken.id', '0'));
        // platinnum
        const listTokenPlatinum = find(tokenDataObjectRaw, function (val) {
          return result(val, 'userToken.voucher.code', '') === 'LUCKYDIPPLATINUM';
        });
        const currentTokenPlatinum = String(result(listTokenPlatinum, 'userToken.redeemCounter', '0'));
        const tokenIdPlatinum = String(result(listTokenPlatinum, 'userToken.id', '0'));
        // silver
        const listTokenSilver = find(tokenDataObjectRaw, function (val) {
          return result(val, 'userToken.voucher.code', '') === 'LUCKYDIPSILVER';
        });
        const currentTokenSilver = String(result(listTokenSilver, 'userToken.redeemCounter', '0'));
        const tokenIdSilver = String(result(listTokenSilver, 'userToken.id', '0'));
        const currentToken = String(Number(currentTokenPlatinum) + Number(currentTokenGold) + Number(currentTokenSilver));
        // for backup cache + reducer
        const localTime = moment(new Date()).format('YYYY/MM/DD H:mm');
        const timeServerCurrent = result(state, 'timeConfig.serverTime', 0);
        const formatTimeserver = moment(timeServerCurrent).format('YYYY/MM/DD H:mm');
        const differenceTime = moment(localTime).diff(moment(formatTimeserver));
        const gapTime = Math.round(moment.duration(differenceTime).asSeconds());
        const rawnextDateServer = moment(timeServerCurrent).format('YYYY/MM/DD');
        const nextDate = rawnextDateServer + ' ' + '23:59';
        const diff = moment(nextDate).diff(moment(formatTimeserver));
        const gapTimeEndedServer = Math.round(moment.duration(diff).asSeconds());
        const payloadCacheTicket = {localTime, timeServerCurrent, formatTimeserver, tokenId: {tokenIdGold, tokenIdPlatinum, tokenIdSilver}, gaptimeServeLocal: gapTime, currentToken, gapTimeEndedServer, totalGapLocalServer: gapTimeEndedServer + gapTime};
        set(storageKeys['LUCKY_DIP_TICKET'], payloadCacheTicket);
        dispatch(actionCreators.getSaveLuckyDipBox(payloadCacheTicket));
        dispatch(actionCreators.saveCounterLuckydip({currentToken, tokenId: {tokenIdGold, tokenIdPlatinum, tokenIdSilver}, currentTokenGold: currentTokenGold, currentTokenPlatinum: currentTokenPlatinum, currentTokenSilver: currentTokenSilver}));
      }).catch(() => {
      });
    } else {
      return api.getCurrentToken({}, dispatch).then((res) => {
        const state = getState();
        const tokenDataObjectRaw = result(res, 'data.userToken', {});
        const currentToken = String(result(tokenDataObjectRaw, 'redeemCounter', '0'));
        const tokenId = String(result(tokenDataObjectRaw, 'id', '0'));
        // for backup cache + reducer
        const localTime = moment(new Date()).format('YYYY/MM/DD H:mm');
        const timeServerCurrent = result(state, 'timeConfig.serverTime', 0);
        const formatTimeserver = moment(timeServerCurrent).format('YYYY/MM/DD H:mm');
        const differenceTime = moment(localTime).diff(moment(formatTimeserver));
        const gapTime = Math.round(moment.duration(differenceTime).asSeconds());
        const rawnextDateServer = moment(timeServerCurrent).format('YYYY/MM/DD');
        const nextDate = rawnextDateServer + ' ' + '23:59';
        const diff = moment(nextDate).diff(moment(formatTimeserver));
        const gapTimeEndedServer = Math.round(moment.duration(diff).asSeconds());
        const payloadCacheTicket = {localTime, timeServerCurrent, formatTimeserver, tokenId, gaptimeServeLocal: gapTime, currentToken, gapTimeEndedServer, totalGapLocalServer: gapTimeEndedServer + gapTime};
        set(storageKeys['LUCKY_DIP_TICKET'], payloadCacheTicket);
        dispatch(actionCreators.getSaveLuckyDipBox(payloadCacheTicket));
        dispatch(actionCreators.saveCounterLuckydip({currentToken, tokenId}));
      }).catch(() => {
      });
    }
  };
}

export function getProvinceList () {
  return (dispatch, getState) => {
    const state = getState();
    const provinceListReducer = result(state, 'provinceList', []);
    if (isEmpty(provinceListReducer)) {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'province'};
      return api.getLocationAlfaTrex(payload, dispatch).then((res) => {
        const provinceList = sortBy(result(res, 'data.data.provinsi', []), 'name');
        dispatch(actionCreators.saveProvinceList(provinceList));
        dispatch(actionCreators.hideSpinner());
      }).catch((error) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
      });
    } else {
      return Promise.resolve();
    }
  };
}

export function getCityList (formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
    const form = result(state, 'form', {});
    const formValues = result(form[`${formName}`], 'values', {});
    const code = result(formValues[`${fieldName}`], 'code', '');
    if (code === '') {
      return Promise.resolve();
    } else {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'city', code};
      return api.getLocationAlfaTrex(payload, dispatch).then((res) => {
        const cityList = sortBy(result(res, 'data.data.city', []), 'name');
        dispatch(actionCreators.saveCityList(cityList));
        dispatch(actionCreators.hideSpinner());
      }).catch((error) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
      });
    }
  };
}

export function getDistrictList (formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
    const form = result(state, 'form', {});
    const formValues = result(form[`${formName}`], 'values', {});
    const code = result(formValues[`${fieldName}`], 'code', '');
    if (code === '') {
      return Promise.resolve();
    } else {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'district', code};
      return api.getLocationAlfaTrex(payload, dispatch).then((res) => {
        const districtList = sortBy(result(res, 'data.data.district', []), 'name');
        dispatch(actionCreators.saveDistrictList(districtList));
        dispatch(actionCreators.hideSpinner());
      }).catch((error) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
      });
    }
  };
}

export function getSubDistrictList (formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
    const form = result(state, 'form', {});
    const formValues = result(form[`${formName}`], 'values', {});
    const code = result(formValues[`${fieldName}`], 'code', '');
    if (code === '') {
      return Promise.resolve();
    } else {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'subDistrict', code};
      return api.getLocationAlfaTrex(payload, dispatch).then((res) => {
        const subDistrictList = sortBy(result(res, 'data.data.subDistrict', []), 'name');
        dispatch(actionCreators.saveSubDistrictList(subDistrictList));
        dispatch(actionCreators.hideSpinner());
      }).catch((error) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(error, language.APP_ERROR__TITLE), Toast.LONG);
      });
    }
  };
}

export function emptyBoxModal () {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.LUCKY__DIP_EMPTY_BOX,
      button1: language.SERVICE__OK_BUTTON,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      textEmptyBox1: language.LUCKY__DIP_EMPTY_BOX2,
      textEmptyBox2: language.LUCKY__DIP_EMPTY_BOX3,
      textEmptyBox3: language.LUCKY__DIP_EMPTY_BOX4
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'EMPTYLUCKYDIP'}));
  };
}
