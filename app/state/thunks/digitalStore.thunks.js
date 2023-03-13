import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import {
  result,
  filter,
  size,
  sortBy,
  forEach,
  startsWith,
  slice,
  uniq,
  map,
  find,
  ceil,
  isEmpty,
  toUpper,
} from 'lodash';
import {StackActions, NavigationActions} from 'react-navigation';
import {set, storageKeys, get} from '../../utils/storage.util.js';
import {Toast, Alert} from '../../utils/RNHelpers.util.js';
import moment from 'moment';
import {
  assembleDataForDashboard,
  populateConfigData,
  checkCameraPermissionAndNavigate,
  populateBanners,
  registerPushId,
  refreshStorageNew,
  populateBillerData,
  updateBalances,
} from './common.thunks';
import {
  randomString,
  OBM_EncryptPassword,
  OBM_GetEncodingParameter,
  OBM_GetEncryptedPassword,
} from '../../utils/vendor/pinEncryption.util';
import {deviceInfo} from '../../utils/device.util';
import VersionNumber from 'react-native-version-number';
import {destroy, reset, change} from 'redux-form';
import {language} from '../../config/language';
import tracker from '../../utils/googleAnalytics.util';
import {
  getErrorMessage,
  obfuscateUsername,
  normalisePhoneNumber,
  generrateArrayItems,
  currencyFormatter,
} from '../../utils/transformer.util';
import split from 'lodash/split';
import {resetToLandingAndNavigate} from './navigation.thunks';
import {updatePicture} from './dashboard.thunks';
import {
  inquirySimasPoin,
  refreshStorage,
  popUpRewardMgm,
} from './common.thunks';
import {
  initStoreWithTransactionDetails,
  logout,
  clearAndResetPasswordBurgerMenu,
} from './onboarding.thunks';
import * as middlewareUtils from '../../utils/middleware.util';
import {
  getLastAddressLuckyDip,
  getDefaultAddress,
} from '../../utils/storage.util';
import Geolocation from '@react-native-community/geolocation';
import {Platform} from 'react-native';
import Permissions from 'react-native-permissions';
import lowerCase from 'lodash/lowerCase';

let LocationServices;

if (Platform.OS === 'android') {
  LocationServices =
    require('react-native-android-location-services-dialog-box').default;
}

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

let adjustAndroid;

if (Platform.OS === 'android') {
  adjustAndroid = require('react-native-adjust');
}

export function listProductAlfacart() {
  return (dispatch, getState) => {
    const state = getState();
    const data = {
      lang: 'en',
      mode: 'NOPAGE',
      listBy: 'allproduct',
      start: '3',
      pageSize: '40',
      orderBy: {
        code: 'DESC',
      },
      filter: {
        productCode: 'ALFACART',
        categoryCode: '',
        categoryType: '',
      },
    };
    const payload = {
      requestData: data,
      targetUrl: 'listProductEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    const egiftListUpdate = result(state, 'listProduct. ()', {});
    return api
      .listProduct(payload, dispatch)
      .then(() => {})
      .catch(() => {
        dispatch(
          actionCreators.saveEgiftPage({
            loading: false,
            reload: true,
            egiftListByConstructList: egiftListUpdate,
          }),
        );
      });
  };
}

export function listCategoryProduct(typeMerchant) {
  return dispatch => {
    const data = {
      categoryMerchant: 'KOPERASI_categoryProduct',
    };
    const dataAlfa = {
      categoryMerchant: 'ALFACART_categoryProduct',
    };
    dispatch(actionCreators.showSpinner());
    const payload = {
      requestData: typeMerchant === 'alfacart' ? dataAlfa : data,
      targetUrl: 'listCategoryEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .listCategoryProduct(payload, dispatch)
      .then(res => {
        const categoryData = sortBy(
          result(res, 'data.result', []),
          'categoryCode',
        );
        if (typeMerchant === 'alfacart') {
          dispatch(actionCreators.saveAllProduct(categoryData));
        } else {
          dispatch(actionCreators.saveAllDataProductCategory(categoryData));
        }
        setTimeout(() => {
          dispatch(listAllProduct(typeMerchant));
        }, 3000);
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function listCategoryProductAlfacart() {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const data = {
      lang: 'en',
      merchantId: 41,
    };
    const payload = {
      requestData: data,
      targetUrl: 'listCategoryEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .listCategoryProductNewEstore(payload, dispatch)
      .then(res => {
        const categoryData = result(res, 'data.result', []);
        dispatch(actionCreators.saveCategory(categoryData));
        dispatch(listAllProductAlfacart('ALFACART'));
      })
      .catch(() => {
        dispatch(listAllProductAlfacart('ALFACART'));
      });
  };
}

export function listCategoryProductKoperasi() {
  return dispatch => {
    dispatch(actionCreators.showSpinner());
    const data = {
      lang: 'en',
      merchantId: 141,
    };
    const payload = {
      requestData: data,
      targetUrl: 'listCategoryEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .listCategoryProductNewEstore(payload, dispatch)
      .then(res => {
        const categoryData = result(res, 'data.result', []);
        dispatch(actionCreators.saveCategory(categoryData));
        dispatch(actionCreators.saveAllDataProductCategory(categoryData));
        dispatch(listAllProductKoperasi('KOPERASI'));
      })
      .catch(() => {
        dispatch(listAllProductKoperasi('KOPERASI'));
      });
  };
}

export function seeAllCategoryAlfacart() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'CategoryAlfacart'}));
  };
}

export function detailProductAlfacart(item) {
  return (dispatch, getState) => {
    const productCode = result(item, 'productCode', '');
    const state = getState();
    const merchantId = result(state, 'currentMerchant.id', -1);
    const data = {
      lang: 'en',
      productCode,
      merchantId,
    };
    const payload = {
      requestData: data,
      targetUrl: 'detailProductEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .detailProductNewEstore(payload, dispatch)
      .then(res => {
        const detailProductData = result(res, 'data.result', []);
        dispatch(actionCreators.saveDetailProduct(detailProductData));
        dispatch(
          NavigationActions.navigate({
            routeName: 'DetailProductAlfacart',
            params: {productDetail: detailProductData},
          }),
        );
      })
      .catch(() => {
        dispatch(
          NavigationActions.navigate({routeName: 'DetailProductAlfacart'}),
        );
      });
  };
}

export function detailProduct(item) {
  return (dispatch, getState) => {
    const productCode = result(item, 'productCode', '');
    const state = getState();
    const merchantId = result(state, 'currentMerchant.id', -1);
    const data = {
      lang: 'en',
      productCode,
      merchantId,
    };
    const payload = {
      requestData: data,
      targetUrl: 'detailProductEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .detailMerchantProduct(payload, dispatch)
      .then(res => {
        const detailProductData = result(res, 'data.result', []);
        dispatch(
          NavigationActions.navigate({
            routeName: 'DetailProductMerchant',
            params: {productDetail: detailProductData},
          }),
        );
      })
      .catch(() => {});
  };
}

export function getCgvLogin(seatData) {
  return dispatch => {
    dispatch(NavigationActions.back());
    dispatch(
      NavigationActions.navigate({
        routeName: 'EmallLogin',
        params: {seatData, type: 'cgv'},
      }),
    );
  };
}

export function detailCategory() {
  return dispatch => {
    dispatch(actionCreators.updateEmoney({status: 'loading'}));
    return api
      .getBalanceEmoneyLanding({}, dispatch)
      .then(res => {
        dispatch(actionCreators.updateEmoney(res.data.accounts));
        dispatch(actionCreators.updateBalanceEmoney(res.data.accounts));
      })
      .catch(() => {
        dispatch(actionCreators.updateEmoney({status: 'error'}));
      });
  };
}

export function listAllProduct(typeMerchant) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());

    const data = {
      lang: 'en',
      mode: 'NOPAGE',
      listBy: 'allproduct',
      start: '0',
      pageSize: '14',
      orderBy: {
        date: 'DESC',
      },
      filter: {
        productCode: 'KOPERASI',
        categoryCode: '',
        categoryType: '',
      },
    };
    const dataAlfa = {
      lang: 'en',
      mode: '',
      listBy: 'allproduct',
      start: '0',
      pageSize: '40',
      orderBy: {
        code: 'DESC',
      },
      filter: {
        productCode: 'ALFACART',
        categoryCode: '',
        categoryType: '',
      },
    };
    const payload = {
      requestData: typeMerchant === 'alfacart' ? dataAlfa : data,
      targetUrl: 'listProductEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .listAllProduct(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        dispatch(populateBillerData());
        const listAllProductData = result(res, 'data.result', []);
        if (typeMerchant === 'alfacart') {
          dispatch(actionCreators.saveAllProduct(listAllProductData));
          dispatch(actionCreators.saveAllProductAlfaFilter(listAllProductData));
          dispatch(
            NavigationActions.navigate({routeName: 'AlfacartDashboard'}),
          );
        } else {
          dispatch(actionCreators.saveAllDataProduct(listAllProductData));
          dispatch(actionCreators.saveAllDataProductFilter(listAllProductData));
          dispatch(
            NavigationActions.navigate({routeName: 'MerchantDashboard'}),
          );
        }
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function listAllProductAlfacart(merchantCode) {
  return async (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    await dispatch(getMerchantId(merchantCode));
    const state = getState();
    const merchantId = result(state, 'currentMerchant.id', -1);
    const data = {
      lang: 'en',
      mode: '',
      listBy: 'allproduct',
      start: '0',
      pageSize: '40',
      orderBy: {
        date: 'DESC',
      },
      filter: {
        merchantId: merchantId,
        categoryCode: '',
        categoryType: '',
        iseligiblePromo: '',
      },
    };

    const payload = {
      requestData: data,
      targetUrl: 'listProductEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };

    return api
      .listAllProductNewEstore(payload, dispatch)
      .then(res => {
        const listAllProductData = result(res, 'data.result', []);
        const countCurrentPage = result(res, 'data.pageCtrl-start', 0);
        const productInPage = result(res, 'data.pageCtrl-count', 0);
        const allTotalData = result(res, 'data.pageCtrl-total', 0);
        const estimatedPage = ceil(allTotalData / productInPage) - 1;

        dispatch(actionCreators.saveAllProduct(listAllProductData));
        dispatch(
          actionCreators.savePaginationDashboardALfa({
            countCurrentPage,
            productInPage,
            allTotalData,
            estimatedPage,
            mode: 'all',
          }),
        );
        dispatch(NavigationActions.navigate({routeName: 'AlfacartDashboard'}));
        dispatch(actionCreators.hideSpinner());
      })
      .catch(() => {
        dispatch(NavigationActions.navigate({routeName: 'AlfacartDashboard'}));
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function listAllProductKoperasi(merchantCode) {
  return async (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    await dispatch(getMerchantId(merchantCode));
    const state = getState();
    const merchantId = result(state, 'currentMerchant.id', -1);
    const data = {
      lang: 'en',
      mode: '',
      listBy: 'allproduct',
      start: '0',
      pageSize: '40',
      orderBy: {
        date: 'DESC',
      },
      filter: {
        merchantId: merchantId,
        categoryCode: '',
        categoryType: '',
        iseligiblePromo: '',
      },
    };

    const payload = {
      requestData: data,
      targetUrl: 'listProductEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };

    return api
      .listAllProductNewEstore(payload, dispatch)
      .then(res => {
        const listAllProductData = result(res, 'data.result', []);
        const countCurrentPage = result(res, 'data.pageCtrl-start', 0);
        const productInPage = result(res, 'data.pageCtrl-count', 0);
        const allTotalData = result(res, 'data.pageCtrl-total', 0);
        const estimatedPage = ceil(allTotalData / productInPage) - 1;

        dispatch(actionCreators.saveAllDataProduct(listAllProductData));
        dispatch(actionCreators.saveAllDataProductFilter(listAllProductData));
        dispatch(NavigationActions.navigate({routeName: 'MerchantDashboard'}));
        dispatch(
          actionCreators.savePaginationDashboardALfa({
            countCurrentPage,
            productInPage,
            allTotalData,
            estimatedPage,
            mode: 'all',
          }),
        );
        dispatch(NavigationActions.navigate({routeName: 'MerchantDashboard'}));
        dispatch(actionCreators.hideSpinner());
      })
      .catch(() => {
        dispatch(NavigationActions.navigate({routeName: 'MerchantDashboard'}));
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function addToCart(product, typeMerchant) {
  return (dispatch, getState) => {
    const state = getState();
    const items =
      typeMerchant === 'alfaCart'
        ? result(state, 'cartAlfacart', [])
        : result(state, 'merchantCart', []);
    const code = result(product, 'items.productId', '');
    const stock = result(product, 'items.stock', '');
    const filterProductExist = filter(items, function (o) {
      return o.items.productId === code;
    });
    if (size(filterProductExist) >= 1) {
      Toast.show(language.DIGISTORE__PRODUCT_ALREADY_TO_CART, Toast.LONG);
    } else {
      if (stock === 0 || stock < 0) {
        Toast.show(language.DIGISTORE__PRODUCT_EMPTY_TO_CART, Toast.LONG);
      } else {
        const selectItem = [...items, product];
        if (typeMerchant === 'alfacart') {
          // reducer buat koperasi
        } else {
          dispatch(actionCreators.updateProductMerchantCart(selectItem));
        }
        Toast.show(language.DIGISTORE__PRODUCT_SUCCESS_TO_CART, Toast.LONG);
      }
    }
  };
}

export function listSaleProduct() {
  return dispatch => {
    const data = {
      lang: 'en',
      mode: 'NOPAGE',
      listBy: 'allproduct',
      isEligiblePromo: 'YES',
      start: '0',
      pageSize: '40',
      orderBy: {
        code: 'DESC',
      },
      filter: {
        productCode: 'ALFACART',
        categoryCode: '',
        categoryType: '',
      },
    };
    const payload = {
      requestData: data,
      targetUrl: 'listProductEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .listAllProductNewEstore(payload, dispatch)
      .then(res => {
        const listAllProductData = result(res, 'data.result', []);
        dispatch(actionCreators.saveSaleproductAlfacart(listAllProductData));
        dispatch(NavigationActions.navigate({routeName: 'AlfacartDashboard'}));
      })
      .catch(() => {
        dispatch(NavigationActions.navigate({routeName: 'AlfacartDashboard'}));
      });
  };
}

export function addToWishlist(product) {
  return (dispatch, getState) => {
    const state = getState();
    let items = result(state, 'wishlistAlfacart', []);
    if (isEmpty(items)) {
      items = [...items, product];
    } else {
      items = [...items, product];
    }
    set(storageKeys.WISHLIST_ALFACART, items);
    dispatch(actionCreators.saveWishlistAlfacart(items));
  };
}

export function buyNow(product) {
  return (dispatch, getState) => {
    const state = getState();
    const currentMerchant = result(state, 'currentMerchant', []);
    const merchant = result(currentMerchant, 'name', '');

    if (merchant === 'ALFACART') {
      const items = result(state, 'cartAlfacart', []);
      const code = result(product, 'items.productId', '');
      const filterProductExist = size(
        filter(items, function (o) {
          return result(o, 'items.productId', '') === code;
        }),
      );

      const itemsFinal = [...items, product];
      const grupItemFinal = uniq(itemsFinal);
      const finalOrdercart = map(grupItemFinal, function (value) {
        const firstDataId = result(value, 'items.productId', '');
        const countQuantity = size(
          filter(itemsFinal, function (val) {
            const firstCounting = result(val, 'items.productId', '');
            return firstDataId === firstCounting;
          }),
        );
        const productCodePurchase = result(value, 'items', '');
        const finalReturn = {
          items: productCodePurchase,
          quantity: countQuantity,
        };
        return finalReturn;
      });

      if (filterProductExist > 0) {
        dispatch(actionCreators.confrimCheckoutAlfa(items));
        dispatch(actionCreators.saveCartAlfacart(items));
        Toast.show(language.DIGISTORE__PRODUCT_SUCCESS_TO_CART);
      } else {
        set(storageKeys.CART_ALFACART, finalOrdercart);
        dispatch(actionCreators.confrimCheckoutAlfa([...items, product]));
        dispatch(actionCreators.saveCartAlfacart([...items, product]));
        Toast.show(language.DIGISTORE__PRODUCT_SUCCESS_TO_CART);
      }

      dispatch(NavigationActions.navigate({routeName: 'AlfacartCart'}));
    } else {
      const items = result(state, 'cartCMI', []);
      const code = result(product, 'items.productId', '');
      const filterProductExist = size(
        filter(items, function (o) {
          return result(o, 'items.productId', '') === code;
        }),
      );

      const itemsFinal = [...items, product];
      const grupItemFinal = uniq(itemsFinal);
      const finalOrdercart = map(grupItemFinal, function (value) {
        const firstDataId = result(value, 'items.productId', '');
        const countQuantity = size(
          filter(itemsFinal, function (val) {
            const firstCounting = result(val, 'items.productId', '');
            return firstDataId === firstCounting;
          }),
        );
        const productCodePurchase = result(value, 'items', '');
        const finalReturn = {
          items: productCodePurchase,
          quantity: countQuantity,
        };
        return finalReturn;
      });

      if (filterProductExist > 0) {
        dispatch(actionCreators.confrimCheckoutAlfa(items));
        dispatch(actionCreators.saveCartCMI(items));
        Toast.show(language.DIGISTORE__PRODUCT_SUCCESS_TO_CART);
      } else {
        set(storageKeys.CART_CMI, finalOrdercart);
        dispatch(actionCreators.confrimCheckoutAlfa([...items, product]));
        dispatch(actionCreators.saveCartCMI([...items, product]));
        Toast.show(language.DIGISTORE__PRODUCT_SUCCESS_TO_CART);
      }

      dispatch(NavigationActions.navigate({routeName: 'AlfacartCart'}));
    }
  };
}

export function addToCartAlfacart(product) {
  return (dispatch, getState) => {
    const state = getState();
    const currentMerchant = result(state, 'currentMerchant', []);
    const merchant = result(currentMerchant, 'name', '');
    if (merchant === 'ALFACART') {
      const items = result(state, 'cartAlfacart', []);
      const code = result(product, 'items.productId', '');
      const currentPick = result(product, 'quantity', 1);
      const filterProductExist = filter(items, function (o) {
        return result(o, 'items.productId', '') !== code;
      });
      const productNew = {items: result(product, 'items'), quantity: 1};
      const selectedItems = generrateArrayItems(productNew, currentPick);

      const itemsFinal = [...filterProductExist, ...selectedItems];

      const grupItemFinal = uniq(itemsFinal);
      const finalOrdercart = map(grupItemFinal, function (value) {
        const firstDataId = result(value, 'items.productId', '');
        const countQuantity = size(
          filter(itemsFinal, function (val) {
            const firstCounting = result(val, 'items.productId', '');
            return firstDataId === firstCounting;
          }),
        );
        const productCodePurchase = result(value, 'items', '');
        const finalReturn = {
          items: productCodePurchase,
          quantity: countQuantity,
        };
        return finalReturn;
      });
      set(storageKeys.CART_ALFACART, finalOrdercart);
      dispatch(actionCreators.saveCartAlfacart(itemsFinal));
      Toast.show(language.DIGISTORE__PRODUCT_SUCCESS_TO_CART, Toast.LONG);
    } else {
      const items = result(state, 'cartCMI', []);
      const code = result(product, 'items.productId', '');
      const currentPick = result(product, 'quantity', 1);
      const filterProductExist = filter(items, function (o) {
        return result(o, 'items.productId', '') !== code;
      });
      const productNew = {items: result(product, 'items'), quantity: 1};
      const selectedItems = generrateArrayItems(productNew, currentPick);

      const itemsFinal = [...filterProductExist, ...selectedItems];
      const grupItemFinal = uniq(itemsFinal);
      const finalOrdercart = map(grupItemFinal, function (value) {
        const firstDataId = result(value, 'items.productId', '');
        const countQuantity = size(
          filter(itemsFinal, function (val) {
            const firstCounting = result(val, 'items.productId', '');
            return firstDataId === firstCounting;
          }),
        );

        const productCodePurchase = result(value, 'items', '');
        const finalReturn = {
          items: productCodePurchase,
          quantity: countQuantity,
        };
        return finalReturn;
      });
      set(storageKeys.CART_CMI, finalOrdercart);
      dispatch(actionCreators.saveCartCMI(itemsFinal));
      Toast.show(language.DIGISTORE__PRODUCT_SUCCESS_TO_CART, Toast.LONG);
    }
  };
}

export function addToCartHeader(product) {
  return (dispatch, getState) => {
    const state = getState();
    const currentMerchant = result(state, 'currentMerchant', []);
    const merchant = result(currentMerchant, 'name', '');
    if (merchant === 'ALFACART') {
      const items = result(state, 'cartAlfacart', []);
      const itemsFinal = [...items, product];
      const code = result(product, 'items.productId', '');
      const itemsSelection = result(state, 'confirmCheckoutAlfaProduct', []);
      const filterProductExist = size(
        filter(itemsSelection, function (o) {
          return result(o, 'items.productId', '') === code;
        }),
      );

      const grupItemFinal = uniq(itemsFinal);
      const finalOrdercart = map(grupItemFinal, function (value) {
        const firstDataId = result(value, 'items.productId', '');
        const countQuantity = size(
          filter(itemsFinal, function (val) {
            const firstCounting = result(val, 'items.productId', '');
            return firstDataId === firstCounting;
          }),
        );
        const productCodePurchase = result(value, 'items', '');
        const finalReturn = {
          items: productCodePurchase,
          quantity: countQuantity,
        };
        return finalReturn;
      });

      if (filterProductExist > 0) {
        dispatch(
          actionCreators.confrimCheckoutAlfa([...itemsSelection, product]),
        );
        dispatch(actionCreators.saveCartAlfacart(itemsFinal));
        set(storageKeys.CART_ALFACART, finalOrdercart);
      } else {
        dispatch(actionCreators.saveCartAlfacart(itemsFinal));
        set(storageKeys.CART_ALFACART, finalOrdercart);
      }
    } else {
      const items = result(state, 'cartCMI', []);
      const itemsFinal = [...items, product];
      const code = result(product, 'items.productId', '');
      const itemsSelection = result(state, 'confirmCheckoutAlfaProduct', []);
      const filterProductExist = size(
        filter(itemsSelection, function (o) {
          return result(o, 'items.productId', '') === code;
        }),
      );

      const grupItemFinal = uniq(itemsFinal);
      const finalOrdercart = map(grupItemFinal, function (value) {
        const firstDataId = result(value, 'items.productId', '');
        const countQuantity = size(
          filter(itemsFinal, function (val) {
            const firstCounting = result(val, 'items.productId', '');
            return firstDataId === firstCounting;
          }),
        );
        const productCodePurchase = result(value, 'items', '');
        const finalReturn = {
          items: productCodePurchase,
          quantity: countQuantity,
        };
        return finalReturn;
      });

      if (filterProductExist > 0) {
        dispatch(
          actionCreators.confrimCheckoutAlfa([...itemsSelection, product]),
        );
        dispatch(actionCreators.saveCartCMI(itemsFinal));
        set(storageKeys.CART_CMI, finalOrdercart);
      } else {
        dispatch(actionCreators.saveCartCMI(itemsFinal));
        set(storageKeys.CART_CMI, finalOrdercart);
      }
    }
  };
}

export function goToLogin(typeMerchant) {
  return (dispatch, getState) => {
    const state = getState();
    const confirmCheckoutAlfaProduct = result(
      state,
      'confirmCheckoutAlfaProduct',
      {},
    );
    const productId = map(confirmCheckoutAlfaProduct, 'items.productId', '');
    const data = {
      lang: 'en',
      item: productId,
    };
    const payload = {
      requestData: data,
      targetUrl: 'productListForCartWhislist',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api.productListForCartWhislist(payload, dispatch).then(res => {
      const listAllProductData = result(res, 'data.result.0.success', []);
      const currentMerchant = result(state, 'currentMerchant', []);
      const merchant = result(currentMerchant, 'name', '');
      if (merchant === 'ALFACART') {
        dispatch(
          NavigationActions.navigate({
            routeName: 'MerchantLogin',
            params: {typeMerchant},
          }),
        );
      } else {
        let finalData = [];
        forEach(listAllProductData, function (value) {
          let quantity;
          forEach(confirmCheckoutAlfaProduct, function (item) {
            quantity = result(item, 'quantity', 0);
          });
          finalData = [...finalData, {items: {...value}, quantity}];
        });
        dispatch(actionCreators.updateConfirmCheckoutAlfa(finalData));
        dispatch(
          NavigationActions.navigate({
            routeName: 'MerchantLogin',
            params: {typeMerchant},
          }),
        );
      }
    });
  };
}

export function minusToCart(product) {
  return (dispatch, getState) => {
    const state = getState();
    let cartItems = result(state, 'merchantCart', []);
    const items = result(product, 'items', {});
    const isnondeleted = filter(cartItems, function (val) {
      return val.items.productId !== items.productId;
    });
    const isdeleted = filter(cartItems, function (val) {
      return val.items.productId === items.productId;
    });
    const removedList = slice(isdeleted, 0, -1);
    dispatch(
      actionCreators.updateProductMerchantCart([
        ...isnondeleted,
        ...removedList,
      ]),
    );
    dispatch(actionCreators.updateEgiftCart([...cartItems, ...removedList]));
  };
}

export function addToCartMerchant(product) {
  return (dispatch, getState) => {
    const state = getState();
    let items = result(state, 'merchantCart', []);
    dispatch(actionCreators.updateProductMerchantCart([...items, product]));
  };
}

export function minusToCartAlfacart(product) {
  return (dispatch, getState) => {
    const state = getState();
    const currentMerchant = result(state, 'currentMerchant', []);
    const merchant = result(currentMerchant, 'name', '');
    if (merchant === 'ALFACART') {
      let cartItems = result(state, 'cartAlfacart', []);
      const code = result(product, 'items.productId', '');
      const itemsSelection = result(state, 'confirmCheckoutAlfaProduct', []);
      const filterProductExist = size(
        filter(itemsSelection, function (o) {
          return result(o, 'items.productId', '') === code;
        }),
      );

      const isnondeletedFromCheck = filter(itemsSelection, function (val) {
        return (
          result(val, 'items.productId', '') !==
          result(product, 'items.productId', '')
        );
      });
      const isnondeleted = filter(cartItems, function (val) {
        return (
          result(val, 'items.productId', '') !==
          result(product, 'items.productId', '')
        );
      });
      const isdeleted = filter(cartItems, function (val) {
        return (
          result(val, 'items.productId', '') ===
          result(product, 'items.productId', '')
        );
      });
      const removedList = slice(isdeleted, 0, -1);

      const mergeAll = [...isnondeleted, ...removedList];
      const grupItemFinal = uniq(mergeAll);
      const finalOrdercart = map(grupItemFinal, function (value) {
        const firstDataId = result(value, 'items.productId', '');
        const countQuantity = size(
          filter(mergeAll, function (val) {
            const firstCounting = result(val, 'items.productId', '');
            return firstDataId === firstCounting;
          }),
        );
        const productCodePurchase = result(value, 'items', '');
        const finalReturn = {
          items: productCodePurchase,
          quantity: countQuantity,
        };
        return finalReturn;
      });

      if (filterProductExist > 0) {
        dispatch(
          actionCreators.updateCartAlfacart([...isnondeleted, ...removedList]),
        );
        dispatch(
          actionCreators.confrimCheckoutAlfa([
            ...isnondeletedFromCheck,
            ...removedList,
          ]),
        );
        set(storageKeys.CART_ALFACART, finalOrdercart);
      } else {
        dispatch(
          actionCreators.updateCartAlfacart([...isnondeleted, ...removedList]),
        );
        set(storageKeys.CART_ALFACART, finalOrdercart);
      }
    } else {
      let cartItems = result(state, 'cartCMI', []);
      const code = result(product, 'items.productId', '');
      const itemsSelection = result(state, 'confirmCheckoutAlfaProduct', []);
      const filterProductExist = size(
        filter(itemsSelection, function (o) {
          return result(o, 'items.productId', '') === code;
        }),
      );

      const isnondeletedFromCheck = filter(itemsSelection, function (val) {
        return (
          result(val, 'items.productId', '') !==
          result(product, 'items.productId', '')
        );
      });
      const isnondeleted = filter(cartItems, function (val) {
        return (
          result(val, 'items.productId', '') !==
          result(product, 'items.productId', '')
        );
      });
      const isdeleted = filter(cartItems, function (val) {
        return (
          result(val, 'items.productId', '') ===
          result(product, 'items.productId', '')
        );
      });
      const removedList = slice(isdeleted, 0, -1);

      const mergeAll = [...isnondeleted, ...removedList];
      const grupItemFinal = uniq(mergeAll);
      const finalOrdercart = map(grupItemFinal, function (value) {
        const firstDataId = result(value, 'items.productId', '');
        const countQuantity = size(
          filter(mergeAll, function (val) {
            const firstCounting = result(val, 'items.productId', '');
            return firstDataId === firstCounting;
          }),
        );
        const productCodePurchase = result(value, 'items', '');
        const finalReturn = {
          items: productCodePurchase,
          quantity: countQuantity,
        };
        return finalReturn;
      });

      if (filterProductExist > 0) {
        dispatch(
          actionCreators.updateCartCMI([...isnondeleted, ...removedList]),
        );
        dispatch(
          actionCreators.confrimCheckoutAlfa([
            ...isnondeletedFromCheck,
            ...removedList,
          ]),
        );
        set(storageKeys.CART_CMI, finalOrdercart);
      } else {
        dispatch(
          actionCreators.updateCartCMI([...isnondeleted, ...removedList]),
        );
        set(storageKeys.CART_CMI, finalOrdercart);
      }
    }
  };
}

export function dropFromCart(product) {
  return (dispatch, getState) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const deleteProduct = () => {
      const state = getState();
      const cartItems = result(state, 'merchantCart', []);
      const newList = filter(cartItems, function (items) {
        return items.items.productId !== product.productId;
      });
      dispatch(actionCreators.updateProductMerchantCart(newList));
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const productName = result(product, 'itemName', '');
    const sinarmasModalOptions = {
      heading1: language.EGIFT__CART_DELETE_HEADER,
      text: productName,
      button1: language.EGIFT__CART_CANCEL_BUTTON,
      onButton1Press: hideAlert,
      button2: language.EGIFT__CART_DELETE_BUTTON,
      onButton2Press: deleteProduct,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  };
}

export function dropFromCartAlfacart(product) {
  return (dispatch, getState) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const state = getState();
    const currentMerchant = result(state, 'currentMerchant', []);
    const merchant = result(currentMerchant, 'name', '');
    if (merchant === 'ALFACART') {
      const deleteProduct = () => {
        const state = getState();
        const checkoutList = result(state, 'confirmCheckoutAlfaProduct', []);
        const filterCheckoutList = filter(checkoutList, function (val) {
          return (
            result(val, 'items.productId', '') !== result(product, 'productId')
          );
        });
        dispatch(actionCreators.confrimCheckoutAlfa(filterCheckoutList));
        const cartAlfacart = result(state, 'cartAlfacart', []);
        const newList = filter(cartAlfacart, function (items) {
          return (
            result(items, 'items.productId', '') !==
            result(product, 'productId', '')
          );
        });
        dispatch(actionCreators.updateCartAlfacart(newList));
        dispatch(actionCreators.hideSinarmasAlert());

        const grupItemFinal = uniq(newList);
        const finalOrdercart = map(grupItemFinal, function (value) {
          const firstDataId = result(value, 'items.productId', '');
          const countQuantity = size(
            filter(newList, function (val) {
              const firstCounting = result(val, 'items.productId', '');
              return firstDataId === firstCounting;
            }),
          );
          const productCodePurchase = result(value, 'items', '');
          const finalReturn = {
            items: productCodePurchase,
            quantity: countQuantity,
          };
          return finalReturn;
        });

        set(storageKeys.CART_ALFACART, finalOrdercart);
      };

      const productName = result(product, 'productName', '');
      const sinarmasModalOptions = {
        heading1: language.EGIFT__CART_DELETE_HEADER,
        text: productName,
        button1: language.EGIFT__CART_CANCEL_BUTTON,
        onButton1Press: hideAlert,
        button2: language.EGIFT__CART_DELETE_BUTTON,
        onButton2Press: deleteProduct,
        onClose: hideAlert,
      };
      dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
    } else {
      const deleteProduct = () => {
        const state = getState();
        const checkoutList = result(state, 'confirmCheckoutAlfaProduct', []);
        const filterCheckoutList = filter(checkoutList, function (val) {
          return (
            result(val, 'items.productId', '') !== result(product, 'productId')
          );
        });
        dispatch(actionCreators.confrimCheckoutAlfa(filterCheckoutList));
        const cartCMI = result(state, 'cartCMI', []);
        const newList = filter(cartCMI, function (items) {
          return (
            result(items, 'items.productId', '') !==
            result(product, 'productId', '')
          );
        });
        dispatch(actionCreators.updateCartCMI(newList));
        dispatch(actionCreators.hideSinarmasAlert());

        const grupItemFinal = uniq(newList);
        const finalOrdercart = map(grupItemFinal, function (value) {
          const firstDataId = result(value, 'items.productId', '');
          const countQuantity = size(
            filter(newList, function (val) {
              const firstCounting = result(val, 'items.productId', '');
              return firstDataId === firstCounting;
            }),
          );
          const productCodePurchase = result(value, 'items', '');
          const finalReturn = {
            items: productCodePurchase,
            quantity: countQuantity,
          };
          return finalReturn;
        });

        set(storageKeys.CART_CMI, finalOrdercart);
      };

      const productName = result(product, 'productName', '');
      const sinarmasModalOptions = {
        heading1: language.EGIFT__CART_DELETE_HEADER,
        text: productName,
        button1: language.EGIFT__CART_CANCEL_BUTTON,
        onButton1Press: hideAlert,
        button2: language.EGIFT__CART_DELETE_BUTTON,
        onButton2Press: deleteProduct,
        onClose: hideAlert,
      };
      dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
    }
  };
}

export function goToCart(typeMerchant) {
  return (dispatch, getState) => {
    const state = getState();
    let items = result(state, 'cartAlfacart', []);
    if (typeMerchant === 'alfacart') {
      dispatch(actionCreators.confrimCheckoutAlfa(items));
      dispatch(NavigationActions.navigate({routeName: 'AlfacartCart'}));
    } else {
      dispatch(NavigationActions.navigate({routeName: 'MerchantCart'}));
    }
  };
}

export function goToCheckout() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'AlfacartCheckout'}));
  };
}

export function goToShipping(typeMerchant) {
  return dispatch => {
    if (typeMerchant === 'alfacart') {
      dispatch(
        NavigationActions.navigate({routeName: 'AlfacartShippingMethodReal'}),
      );
    } else {
      dispatch(
        NavigationActions.navigate({routeName: 'AlfacartShippingMethod'}),
      );
    }
  };
}

export function goToFormFillAddres(isEdit) {
  return dispatch => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'FormFillAlfaAddress',
        params: {isEdit},
      }),
    );
  };
}

export function goToFormFillNewStore() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'FormFillAlfaNewStore'}));
  };
}

export function filterCartProduct(typePick) {
  return dispatch => {
    const payload = {
      lang: 'en',
      mode: '',
      listBy: 'category',
      start: '0',
      pageSize: '14',
      orderBy: {
        code: 'DESC',
      },
      filter: {
        productCode: '',
        categoryCode: typePick,
        categoryType: 'KOPERASI_categoryProduct',
      },
    };
    return api
      .listAllProductNewEstore(payload, dispatch)
      .then(res => {
        const listAllProductData = result(res, 'data.result', []);
        dispatch(actionCreators.saveAllDataProduct(listAllProductData));
      })
      .catch(() => {});
  };
}

export function loginToEstoreMerchant(
  {username, password, easyPin},
  isLockedDevice,
  isResetEasypin = false,
  regisATM = false,
  loginATM = false,
  isUserRegistered = false,
  typeMerchant,
) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    dispatch(populateBanners());
    return dispatch(populateConfigData())
      .then(() => {
        const smsPriority = Boolean(
          result(getState(), 'config.smsPriority.login', false),
        );
        const randomNumber = randomString(16);
        OBM_EncryptPassword(password ? password : easyPin, randomNumber);
        if (easyPin) {
          easyPin =
            'encryptedPassword:' +
            OBM_GetEncryptedPassword() +
            '|encodingParameter:' +
            OBM_GetEncodingParameter() +
            '|randomNumber:' +
            randomNumber;
        } else {
          password =
            'encryptedPassword:' +
            OBM_GetEncryptedPassword() +
            '|encodingParameter:' +
            OBM_GetEncodingParameter() +
            '|randomNumber:' +
            randomNumber;
        }

        const deviceInfoLogin = {
          name: deviceInfo.name,
          model: deviceInfo.model,
        };
        const version = split(VersionNumber.appVersion, '.');
        const versionScope = version[0] + ',' + version[1];
        const isLoginV2 =
          result(getState(), 'config.toogleLoginNew', '') === 'YES';
        const loginAPI = isLoginV2 ? api.loginNew : api.loginV2;
        return loginAPI(
          {
            username: normalisePhoneNumber(username),
            password,
            easyPin,
            smsPriority,
            deviceInfoLogin,
            versionScope,
          },
          isLockedDevice,
          dispatch,
        );
      })
      .then(res => {
        dispatch(actionCreators.clearQRTcico());
        dispatch(updatePicture());
        dispatch(actionCreators.clearLastLogin());
        set(storageKeys.LAST_SUCCESSFUL_LOGIN, 'easypin').catch(err => {
          Toast.show(
            getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_STORE_TRANSACTION,
            ),
            Toast.LONG,
          );
        });
        const serverTime = moment(
          result(res, 'data.serverTime', '').toString(),
        );
        const appTime = new Date();
        const diff = moment(appTime, 'DD/MM/YYYY').diff(
          moment(serverTime, 'DD/MM/YYYY'),
        );
        const gapTime = Math.round(moment.duration(diff).asSeconds());
        const userApiKey = result(res.data, 'userApiKey', '');
        const stateReduc = getState();
        const defaultValueAccount = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.accountList',
          {},
        );
        const getdefaultAccount = find(defaultValueAccount, {
          accountType: 'emoneyAccount',
        });
        set(
          storageKeys.ACCOUNT_DATA_DEFAULT,
          middlewareUtils.getAccountDefaultEmoney(getdefaultAccount),
        );
        const tooglePushLoginID = result(
          stateReduc,
          'config.flag.flagPushNotifCifCode',
          'INACTIVE',
        );
        const loginPushwooshID =
          tooglePushLoginID === 'ACTIVE'
            ? result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.customer.cifCode',
                '',
              )
            : result(
                res,
                'data.ipassportData.ipassDataClient.profileScope.userLogin.loginName',
                '',
              ).toLowerCase();
        const loginSetTagID = result(
          res,
          'data.ipassportData.ipassDataClient.profileScope.userLogin.title',
          '',
        ).toLowerCase();
        const cardlessWithdrawalTransferList = result(
          res.data,
          'ipassportData.ipassDataClient.profileScope.cardlessWithdrawalTransferList',
          [],
        );
        const isAutoSave = result(res, 'data.isAutoSave', []);
        const transfer = result(isAutoSave, 'transfer', false);
        const billPay = result(isAutoSave, 'billPay', false);
        const isSaving = result(isAutoSave, 'isSaving', false);
        const DigitalStore = result(isAutoSave, 'DigitalStore', false);
        const QR = result(isAutoSave, 'QR', false);
        dispatch(
          actionCreators.saveAutoSave({
            transfer: transfer,
            billPay: billPay,
            isSaving: isSaving,
            DigitalStore: DigitalStore,
            QR: QR,
          }),
        );
        dispatch(actionCreators.saveUserApiKey(userApiKey));
        dispatch(actionCreators.setGapTimeServer(gapTime));
        dispatch(
          actionCreators.saveCardlessWithdrawalTransferList(
            cardlessWithdrawalTransferList,
          ),
        );
        dispatch(
          actionCreators.saveTransRefNum(result(res, 'data.transRefNum', '')),
        );
        const privateOffers = result(res.data, 'privateOffers', []);
        dispatch(actionCreators.savePrivateOffers(privateOffers));
        if (regisATM) {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.attributeMap.iPassport'),
            }),
          );
        } else {
          dispatch(
            actionCreators.setAPIPayloadParam({
              ipassport: result(res, 'data.ipassport'),
            }),
          );
          assembleDataForDashboard(dispatch, res);
        }
        dispatch(actionCreators.hideSpinner());
        dispatch(change('loginWithUsernamePassword', 'password', ''));
        tracker.setUser(
          String(result(getState(), 'user.profile.customer.id', deviceInfo.id)),
        );
        const isDemoAccount = /^DEMO-/.test(
          result(res, 'data.ipassport', undefined),
        );
        if ((isLockedDevice || isDemoAccount) && !isResetEasypin) {
          dispatch(registerPushId(loginPushwooshID, loginSetTagID));
          const skipFunction = () => dispatch(prepareGoEstore(typeMerchant));
          dispatch(
            checkCameraPermissionAndNavigate(
              'CameraPage',
              {action: 'RegisterLockdown'},
              true,
              skipFunction,
            ),
          );
        } else {
          const mobileNumber = result(
            res,
            'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking',
            '',
          );
          const mobileNumberATM = result(
            res,
            'data.attributeMap.mobileNumberMasking',
            '',
          );
          const payload = JSON.parse(result(res, 'config.data', '{}'));
          if (mobileNumber || mobileNumberATM) {
            if (loginATM) {
              const params = {
                maskedUsername: obfuscateUsername(username),
                isResetEasypin,
              };
              dispatch(resetToLandingAndNavigate('EasyPin', params));
            } else {
              const params = {
                isEasyPinSet: res.data.isEasyPinSet,
                maskedUsername: obfuscateUsername(username),
                disableEasyPinLogin: true,
                TXID: payload.TXID,
                isResetEasypin,
                regisATM,
                newUserMobile: mobileNumberATM,
              };
              dispatch(registerPushId(loginPushwooshID, loginSetTagID));
              dispatch(resetToLandingAndNavigate('OTP', params));
            }
          } else {
            Alert.alert(
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TITLE,
              language.ONBOARDING__ACCOUNT_INITIAL_NOT_EXIST_TEXT,
              [
                {
                  text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                  onPress: () => {
                    dispatch(
                      NavigationActions.navigate({routeName: 'Onboarding'}),
                    );
                  },
                },
              ],
            );
          }
        }
      })
      .catch(err => {
        if (password === '' && easyPin === '') {
          tracker.trackEvent(
            'LOGIN_FINGERPRINT_FAILED',
            'ONBOARDING',
            null,
            {},
          );
        }
        dispatch(actionCreators.hideSpinner());
        isLockedDevice || isUserRegistered
          ? dispatch(change('loginWithUsernamePassword', 'password', ''))
          : dispatch(reset('loginWithUsernamePassword'));
        dispatch(reset('loginEasyPinForm'));
        const errorCode = result(err, 'data.responseCode', '');
        if (errorCode === '05') {
          Alert.alert(
            language.ONBOARDING__DORMANT_TITLE,
            language.ONBOARDING__DORMANT_TEXT,
            [
              {
                text: language.ONBOARDING__ALREADY_REGISTERED_OK_TEXT,
                onPress: dispatch(clearAndResetPasswordBurgerMenu()),
              },
            ],
          );
          return;
        }
        Toast.show(
          getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_LOG_IN),
          Toast.LONG,
        );
      });
  };
}

export function prepareGoEstore(typeMerchant) {
  return (dispatch, getState) => {
    const state = getState();
    const navigationKeys = result(state, 'promos.navigateOnPushClicked', false);
    const cifCode = state.user.profile.customer.cifCode;
    const accountList = result(state, 'accounts', []);
    dispatch(refreshStorage());
    dispatch(inquirySimasPoin());
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(initStoreWithTransactionDetails());
    if (navigationKeys.length) {
      forEach(navigationKeys, navigateKey =>
        dispatch(NavigationActions.navigate({routeName: navigateKey})),
      );
      dispatch(actionCreators.changeNotificationRoute([]));
    }
    dispatch(actionCreators.showSpinner());
    if (startsWith(cifCode, 'NK')) {
      if (typeMerchant === 'alfacart') {
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'AlfacartCheckout'}),
            ],
          }),
        );
      } else {
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'MerchantCheckout'}),
            ],
          }),
        );
      }
      dispatch(actionCreators.hideSpinner());
    } else {
      if (
        accountList.length === 1 &&
        find(accountList, {accountType: 'emoneyAccount'})
      ) {
        if (typeMerchant === 'alfacart') {
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'AlfacartCheckout'}),
              ],
            }),
          );
        } else {
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'MerchantCheckout'}),
              ],
            }),
          );
        }
        dispatch(actionCreators.hideSpinner());
      } else {
        dispatch(actionCreators.hideSpinner());
        if (typeMerchant === 'alfacart') {
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'AlfacartCheckout'}),
              ],
            }),
          );
        } else {
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'MerchantCheckout'}),
              ],
            }),
          );
        }
      }
    }
  };
}

export function goToEasyPinDigitalStore(
  formValues,
  totalAll,
  subscriberNoInput,
) {
  return (dispatch, getState) => {
    const state = getState();
    const merchantName = result(state, 'currentMerchant.name', '');
    const onSubmit = () => {
      const newState = getState();
      const merchantName = result(newState, 'currentMerchant.name', '');
      const confirmCheckoutAlfaProduct = result(
        newState,
        'confirmCheckoutAlfaProduct',
        [],
      );
      const totalItemsAlfa = confirmCheckoutAlfaProduct.length;
      const transRefNum = result(newState, 'transRefNum', '');
      const cartItems = result(newState, 'merchantCart', []);
      const name = result(state, 'simasPoin.fullName', '');
      const sourceAcc = result(formValues, 'myAccount', {});
      const accountFrom = String(result(formValues, 'myAccount.id', {}));
      const shippingAddress = result(formValues, 'shippingAddress', {});
      const billerList = result(newState, 'billerConfig.billerList', {});
      const billerFind = find(billerList, function (biller) {
        return biller.name === merchantName;
      });
      const idbillPay = parseInt(result(billerFind, 'id', ''));
      const securityTypeCode = '1';
      const descInput = 'Simobi';
      const dateAlfa = result(
        formValues,
        'shipmentaddress.recepientValue.datePicker',
        {},
      );
      const timeAlfa = result(
        formValues,
        'shipmentaddress.recepientValue.timeSlot.timeSlotDesc',
        {},
      );
      const voucherId = result(state, 'couponCheck.voucherId', '').toString();
      const ownership = result(state, 'couponCheck.ownership', '');
      const additionalInfoMap = {voucherId, ownership};
      const payload = {
        securityTypeCode,
        transRefNum,
        descInput,
        subscriberNoInput,
        accountFrom,
        idbillPay,
        additionalInfoMap,
      };
      dispatch(actionCreators.showSpinner());
      const descriptionCouponSuccess = result(
        newState,
        'couponCheck.description',
        '',
      );
      const flagMgm = result(state, 'config.hideNotifMGM', '');
      const flagMgmOn = lowerCase(flagMgm) === 'yes';
      dispatch(
        actionCreators.saveCouponSuccessStatus(descriptionCouponSuccess),
      );
      return api
        .paymentProductEstore(payload, dispatch)
        .then(res => {
          const emailNew = result(
            res,
            'data.paymentResult.paymentInvoiceInfo.email',
            '',
          );
          const orderNum = result(res, 'data.purchaseOrderCode', '');
          const storeNameAlfa = result(res, 'data.merchant', '');
          const datality = result(res, 'data', '');
          const totalNew = parseInt(result(datality, 'amount', ''));
          const feeNew = parseInt(result(datality, 'fee', ''));
          const total = totalNew + feeNew;
          dispatch(actionCreators.hideSpinner());

          if (merchantName === 'ALFACART' || merchantName === 'CMI') {
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'Landing'}),
                  NavigationActions.navigate({
                    routeName: 'DigitalStorePaymentStatus',
                  }),
                ],
              }),
            );
            if (!flagMgmOn) {
              dispatch(popUpRewardMgm());
            }
          } else {
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'Landing'}),
                  NavigationActions.navigate({
                    routeName: 'DigitalStorePaymentStatusKoperasi',
                  }),
                ],
              }),
            );
            if (!flagMgmOn) {
              dispatch(popUpRewardMgm());
            }
          }
          const paymentStatusData = {
            status: 'SUCCESS',
            resultData: cartItems,
            name,
            transRefNum,
            total,
            emailNew,
            sourceAcc,
            shippingAddress,
            storeNameAlfa,
            totalItemsAlfa,
            dateAlfa,
            timeAlfa,
            orderNum,
          };

          dispatch(actionCreators.updatePaymentStatus({...paymentStatusData}));
          dispatch(destroy('EgiftPaymentForm'));
          dispatch(actionCreators.clearProductMerchantCart());
          dispatch(actionCreators.clearTransRefNum());
          dispatch(refreshStorageNew());
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.deleteUsingCouponUI());
          dispatch(destroy('alfaCheckoutForm'));
          if (merchantName === 'ALFACART') {
            const confirmItems = result(
              state,
              'confirmCheckoutAlfaProduct',
              [],
            );
            const cartAfla = result(state, 'cartAlfacart', []);
            const products = uniq(confirmItems);
            const finalOrdercart = map(cartAfla, function (value) {
              const firstDataId = result(value, 'items.productId', '');
              const countQuantity = size(
                filter(products, function (val) {
                  const firstCounting = result(val, 'items.productId', '');
                  return firstDataId === firstCounting;
                }),
              );
              const productCodePurchase = result(value, 'items', '');
              const finalReturn = {
                items: productCodePurchase,
                quantity: countQuantity,
              };
              return finalReturn;
            });
            const filterNonexistOrder = filter(finalOrdercart, function (val) {
              const firstCounting = result(val, 'quantity', 0);
              return firstCounting === 0;
            });
            const grupItemFinal = uniq(filterNonexistOrder);
            const finalOrdercartFinal = map(grupItemFinal, function (value) {
              const firstDataIdCart = result(value, 'items.productId', '');
              const countQuantityCart = size(
                filter(cartAfla, function (val) {
                  const firstCounting = result(val, 'items.productId', '');
                  return firstDataIdCart === firstCounting;
                }),
              );
              const productCodePurchase = result(value, 'items', '');
              const finalReturn = {
                items: productCodePurchase,
                quantity: countQuantityCart,
              };
              return finalReturn;
            });
            set(storageKeys.CART_ALFACART, finalOrdercartFinal);
          } else if (merchantName === 'CMI') {
            const confirmItems = result(
              state,
              'confirmCheckoutAlfaProduct',
              [],
            );
            const cartCMI = result(state, 'cartCMI', []);
            const products = uniq(confirmItems);
            const finalOrdercart = map(cartCMI, function (value) {
              const firstDataId = result(value, 'items.productId', '');
              const countQuantity = size(
                filter(products, function (val) {
                  const firstCounting = result(val, 'items.productId', '');
                  return firstDataId === firstCounting;
                }),
              );
              const productCodePurchase = result(value, 'items', '');
              const finalReturn = {
                items: productCodePurchase,
                quantity: countQuantity,
              };
              return finalReturn;
            });
            const filterNonexistOrder = filter(finalOrdercart, function (val) {
              const firstCounting = result(val, 'quantity', 0);
              return firstCounting === 0;
            });
            const grupItemFinal = uniq(filterNonexistOrder);
            const finalOrdercartFinal = map(grupItemFinal, function (value) {
              const firstDataIdCart = result(value, 'items.productId', '');
              const countQuantityCart = size(
                filter(cartCMI, function (val) {
                  const firstCounting = result(val, 'items.productId', '');
                  return firstDataIdCart === firstCounting;
                }),
              );
              const productCodePurchase = result(value, 'items', '');
              const finalReturn = {
                items: productCodePurchase,
                quantity: countQuantityCart,
              };
              return finalReturn;
            });
            set(storageKeys.CART_CMI, finalOrdercartFinal);
          }
        })
        .catch(err => {
          const easyPinAttempt = result(err, 'data.easypinAttempt', '');
          if (easyPinAttempt === 'invalid') {
            dispatch(actionCreators.hideSpinner());
            dispatch(reset('AuthenticateForm'));
            Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
          } else if (easyPinAttempt === 'blocked') {
            dispatch(actionCreators.hideSpinner());
            dispatch(actionCreators.clearTransRefNum());
            Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
            dispatch(logout());
          } else if (easyPinAttempt === 'errHsm') {
            dispatch(actionCreators.hideSpinner());
            dispatch(reset('AuthenticateForm'));
            Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);
          } else {
            dispatch(actionCreators.hideSpinner());
            if (merchantName === 'ALFACART' || merchantName === 'CMI') {
              dispatch(
                StackActions.reset({
                  index: 1,
                  actions: [
                    NavigationActions.navigate({routeName: 'Landing'}),
                    NavigationActions.navigate({
                      routeName: 'DigitalStorePaymentStatus',
                    }),
                  ],
                }),
              );
              if (!flagMgmOn) {
                dispatch(popUpRewardMgm());
              }
            } else {
              dispatch(
                StackActions.reset({
                  index: 1,
                  actions: [
                    NavigationActions.navigate({routeName: 'Landing'}),
                    NavigationActions.navigate({
                      routeName: 'DigitalStorePaymentStatusKoperasi',
                    }),
                  ],
                }),
              );
              if (!flagMgmOn) {
                dispatch(popUpRewardMgm());
              }
            }
            const errorText = getErrorMessage(
              err,
              language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
            );
            const paymentStatusData = {
              status: 'FAILED',
              name,
              errorText,
              transRefNum,
              sourceAcc,
            };
            dispatch(
              actionCreators.updatePaymentStatus({...paymentStatusData}),
            );
            dispatch(destroy('EgiftPaymentForm'));
            dispatch(actionCreators.clearProductMerchantCart());
            dispatch(actionCreators.clearTransRefNum());
            dispatch(actionCreators.deleteCoupon());
            dispatch(actionCreators.deleteUsingCouponUI());
            dispatch(destroy('alfaCheckoutForm'));
          }
        });
    };
    dispatch(populateConfigData())
      .then(() => {
        const payload = middlewareUtils.prepateTransRefNumPayload(
          'eCommerce',
          false,
        );
        dispatch(actionCreators.showSpinner());
        return api.getTransRefNum({...payload, smsPriority: false}, dispatch);
      })
      .then(response => {
        dispatch(actionCreators.saveTransRefNum(response.data.transRefNum));
        dispatch(actionCreators.hideSpinner());
        if (merchantName === 'ALFACART' || merchantName === 'CMI') {
          dispatch(
            NavigationActions.navigate({
              routeName: 'AlfaAuthenticate',
              params: {isEasypin: true, onSubmit},
            }),
          );
        } else {
          dispatch(
            NavigationActions.navigate({
              routeName: 'MerchantEasyPin',
              params: {isEasypin: true, onSubmit},
            }),
          );
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, result(err, 'data.responseMessage', '')),
        );
      });
  };
}

export function paymentUltraVoucher(orderNumber) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const securityTypeCode = '1';
    const descInput = '';
    const payload = {
      descInput: descInput,
      subscriberNoInput: orderNumber,
      securityTypeCode: securityTypeCode,
      additionalInfoMap: {
        voucherId: '',
        ownership: '',
      },
    };
    return api
      .paymentProductEstoreNew(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        const newState = getState();
        const responseMessage = result(res, 'data.responseMessage', '');
        const isPending = responseMessage.toUpperCase() === 'INPROCESS';
        const emailNew = result(
          res,
          'data.paymentResult.paymentInvoiceInfo.email',
          '',
        );
        const invoiceCode = result(
          res,
          'data.paymentResult.paymentInvoiceCode',
          '',
        );
        const orderNumber = result(res, 'data.purchaseOrderCode', '');
        const transNumber = result(
          res,
          'data.paymentResult.paymentInvoiceInfo.transRefNum',
          '',
        );
        const accList = result(newState, 'accounts', []);
        const sourceAccountNumber = result(res, 'data.sourceOfFunds', '');
        const sourceAccount = find(accList, {
          accountNumber: sourceAccountNumber,
        });
        const storeName = result(res, 'data.merchant', '');
        const totalItems = result(
          res,
          'data.paymentResult.paymentInvoiceInfo.purchaseItemList',
          [],
        ).length;
        const purchaseDate = result(
          res,
          'data.paymentResult.paymentInvoiceDate',
          '',
        );
        const description = result(
          res,
          'data.paymentResult.paymentInvoiceDescription',
          '',
        );
        const total = result(res, 'data.amount', '');
        const voucherValidity = result(res, 'data.flagValidity', false);
        const voucherDetail = result(res, 'data.voucherDetail', {});
        const note = result(res, 'data.note', '');
        const paymentStatusData = {
          status: isPending ? 'PENDING' : 'SUCCESS',
          total: total,
          emailNew: emailNew,
          sourceAcc: sourceAccount,
          storeName: storeName,
          totalItems: totalItems,
          date: purchaseDate,
          orderNumber: orderNumber,
          invoiceCode: invoiceCode,
          transRefNum: transNumber,
          description: description,
          note,
          voucherValidity,
          voucherDetail,
        };
        dispatch(refreshStorageNew());
        dispatch(updateBalances());
        dispatch(actionCreators.updatePaymentStatus({...paymentStatusData}));
        dispatch(actionCreators.clearTransRefNum());
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
              NavigationActions.navigate({
                routeName: 'UltraVoucherPaymentStatus',
              }),
            ],
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        const easyPinAttempt = result(err, 'data.easypinAttempt', '');
        if (easyPinAttempt === 'invalid') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_INVALID_EASYPIN_TRANSACTION);
        } else if (easyPinAttempt === 'blocked') {
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.clearTransRefNum());
          Toast.show(language.ERROR_MESSAGE_BLOCKED_EASYPIN_TRANSACTION);
          dispatch(logout());
        } else if (easyPinAttempt === 'errHsm') {
          dispatch(actionCreators.hideSpinner());
          dispatch(reset('AuthenticateForm'));
          Toast.show(language.ERROR_MESSAGE_SYSTEM_UNDER_MAINTENANCE);
        } else {
          dispatch(actionCreators.hideSpinner());
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'Landing'}),
                NavigationActions.navigate({
                  routeName: 'UltraVoucherPaymentStatus',
                }),
              ],
            }),
          );
          const errorText = getErrorMessage(
            err,
            language.ERROR_MESSAGE__COULD_NOT_PAY_BILL,
          );
          const paymentStatusData = {
            status: 'FAILED',
            errorText,
            transRefNum,
          };
          dispatch(actionCreators.updatePaymentStatus({...paymentStatusData}));
          dispatch(actionCreators.clearTransRefNum());
        }
      });
  };
}

export function goToEasyPinUltraVoucher(orderNumber) {
  return dispatch => {
    const onSubmit = () => {
      dispatch(paymentUltraVoucher(orderNumber));
    };
    dispatch(populateConfigData())
      .then(() => {
        dispatch(actionCreators.showSpinner());
        const payload = middlewareUtils.prepateTransRefNumPayload(
          'eCommerce',
          false,
        );
        return api.getTransRefNum({...payload, smsPriority: false}, dispatch);
      })
      .then(response => {
        dispatch(actionCreators.saveTransRefNum(response.data.transRefNum));
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: 'Auth',
            params: {isEasypin: true, onSubmit},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, result(err, 'data.responseMessage', '')),
        );
      });
  };
}

export function generateJwt() {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const tokenServer = result(state, 'appInitKeys.tokenServer', '');
    const tokenClient = result(state, 'appInitKeys.tokenClient', '');
    const payload = {
      tokenServer: tokenServer,
      tokenClient: tokenClient,
    };
    return api
      .createJwt(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        return res.data;
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, 'Failed to get user'), Toast.LONG);
      });
  };
}

export function checkoutPurchaseOrder(formValues, totalAll) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const cartItems = result(state, 'merchantCart', []);
    const products = uniq(cartItems);
    const filterPurchaseOrder = map(products, function (value) {
      const firstDataId = result(value, 'items.productId', '');
      const countQuantity = size(
        filter(cartItems, function (val) {
          const firstCounting = result(val, 'items.productId', '');
          return firstDataId === firstCounting;
        }),
      );
      const productCodePurchase = result(value, 'items.productCode', '');
      const finalReturn = {
        productCode: productCodePurchase,
        quantity: countQuantity,
      };
      return finalReturn;
    });
    const codeAddress = result(formValues, 'shippingAddress.codeAddress', '');
    const feeShipping = result(formValues, 'shippingAddress.fee', '');
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ''));
    const name = String(result(state, 'user.profile.name', ''));
    const data = {
      lang: 'en',
      customerDetail: {
        cifCode: cifCode,
        customerName: name,
      },
      purchaseOrderList: filterPurchaseOrder,
      fee: feeShipping,
      addressDetail: codeAddress,
    };
    const payload = {
      requestData: data,
      targetUrl: 'checkoutPurchaseOrderEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .checkoutPurchaseOrder(payload, dispatch)
      .then(res => {
        const purchaseCode = result(
          res,
          'data.result.purchaseOrderDetail.code',
          '',
        );
        dispatch(actionCreators.hideSpinner());
        dispatch(populateBillerData());
        dispatch(
          NavigationActions.navigate({
            routeName: 'MerchantInputCustomerEmail',
            params: {formValues, totalAll, purchaseCode},
          }),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, result(err, 'data.responseMessage', '')),
        );
        dispatch(destroy('loginEasyPinForm'));
      });
  };
}

export function listaddress(typeMerchant) {
  return dispatch => {
    const data = {
      lang: 'en',
      owner: 'KOPERASI',
    };
    const dataAlfa = {
      lang: 'en',
      owner: 'TEST0001',
    };
    const payload = {
      requestData: typeMerchant === 'alfacart' ? dataAlfa : data,
      targetUrl: 'listAddressesEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .listaddress(payload, dispatch)
      .then(res => {
        const addressResult = result(res, 'data.result', []);
        if (typeMerchant === 'alfacart') {
          dispatch(actionCreators.saveAllShipmentAddressAlfa(addressResult));
        } else {
          dispatch(actionCreators.saveAddressMerchant(addressResult));
        }
      })
      .catch(() => {});
  };
}

export function goDashboardDigitalStore() {
  return dispatch => {
    dispatch(actionCreators.clearTransRefNum());
    dispatch(prepareGoDashboardEstore());
  };
}

export function prepareGoDashboardEstore() {
  return (dispatch, getState) => {
    const state = getState();
    const accountList = result(state, 'accounts', []);
    const navigationKeys = result(
      getState(),
      'promos.navigateOnPushClicked',
      false,
    );
    const cifCode = state.user.profile.customer.cifCode;
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(initStoreWithTransactionDetails());
    if (startsWith(cifCode, 'NK')) {
      dispatch(NavigationActions.navigate({routeName: 'MainEmoney'}));
    } else {
      if (
        accountList.length === 1 &&
        find(accountList, {accountType: 'emoneyAccount'})
      ) {
        dispatch(NavigationActions.navigate({routeName: 'Main'}));
      } else {
        dispatch(NavigationActions.navigate({routeName: 'Main'}));
      }
    }
    if (navigationKeys.length) {
      forEach(navigationKeys, navigateKey =>
        dispatch(NavigationActions.navigate({routeName: navigateKey})),
      );
      dispatch(actionCreators.changeNotificationRoute([]));
    }
  };
}

export function couponCustomerMerchant(amount, billType) {
  return (dispatch, getState) => {
    const state = getState();
    const transRefNum = result(state, 'transRefNum', '');
    const type = 'billPayment';
    const billerCode = billType;
    dispatch(actionCreators.savebillerCode({billerCode}));
    const transactionAmount = String(amount);
    const payload = {type, transactionAmount, transRefNum, billerCode};
    dispatch(actionCreators.showSpinner());
    return api
      .getVoucherList(payload, dispatch)
      .then(res => {
        dispatch(actionCreators.hideSpinner());
        if (billerCode) {
          const privateVoucher = result(res, 'data.privateVoucherList', []);
          const publicVoucher = result(res, 'data.publicVoucher', []);
          dispatch(
            NavigationActions.navigate({
              routeName: 'CouponList',
              params: {
                privateVoucher,
                publicVoucher,
                transactionAmount,
                billerCode,
              },
            }),
          );
        } else {
          dispatch(
            NavigationActions.navigate({
              routeName: 'CouponList',
              params: {
                privateVoucher: [],
                publicVoucher: [],
                transactionAmount,
                billerCode,
              },
            }),
          );
        }
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(
            err,
            language.REDEEM__SMARTFREN__HEADING__RESULT__ERROR,
          ),
          Toast.LONG,
        );
      });
  };
}

export function getPurchaseOrderAlfa() {
  return dispatch => {
    const dataAlfa = {
      purchaseOrderList: [
        {
          productCode: 'ALFACART-A12630003378',
          quantity: 1,
        },
        {
          productCode: 'ALFACART-A12890003851',
          quantity: 1,
        },
      ],
    };
    return api
      .getPurchaseOrderAlfa(dataAlfa, dispatch)
      .then(() => {})
      .catch(() => {});
  };
}

export function getConfirmProduct(product) {
  return (dispatch, getState) => {
    const state = getState();
    const code = result(product, 'productId', '');
    const items = result(state, 'cartAlfacart', []);
    const itemsSelection = result(state, 'confirmCheckoutAlfaProduct', []);
    const filterProductExist = size(
      filter(itemsSelection, function (o) {
        return o.items.productId === code;
      }),
    );
    let confirmDataProduct = [];
    if (filterProductExist > 0) {
      const filterProductNonTarget = filter(itemsSelection, function (o) {
        return o.items.productId !== code;
      });
      confirmDataProduct = [...filterProductNonTarget];
    } else {
      const filterProductTarget = filter(items, function (o) {
        return o.items.productId === code;
      });
      confirmDataProduct = [...filterProductTarget, ...itemsSelection];
    }
    dispatch(actionCreators.confrimCheckoutAlfa(confirmDataProduct));
  };
}

export function getCheckListAlfaConfirm() {
  return (dispatch, getState) => {
    const state = getState();
    const items = result(state, 'cartAlfacart', []);
    const itemsSelection = result(state, 'confirmCheckoutAlfaProduct', []);
    const itemsSize = size(items);
    const itemsSelectionSize = size(itemsSelection);
    if (itemsSize > itemsSelectionSize) {
      dispatch(actionCreators.confrimCheckoutAlfa(items));
    } else {
      dispatch(actionCreators.clearConfirmCheckoutAlfa(items));
    }
  };
}

export function getDataAddressAlfa() {
  return dispatch => {
    getLastAddressLuckyDip().then(res => {
      dispatch(actionCreators.saveLuckyDipAddress(res));
      const name = result(res, 'fullName', '');
      const phoneNumber = result(res, 'phoneNumber', '');
      if (name !== '' && phoneNumber !== '') {
        dispatch(
          change(
            'FormFillAlfaAddress',
            'province',
            result(res, 'province', {}),
          ),
        );
        dispatch(
          change('FormFillAlfaAddress', 'city', result(res, 'city', {})),
        );
        dispatch(
          change(
            'FormFillAlfaAddress',
            'district',
            result(res, 'district', {}),
          ),
        );
        dispatch(
          change(
            'FormFillAlfaAddress',
            'subDistrict',
            result(res, 'subDistrict', {}),
          ),
        );
        dispatch(
          change(
            'FormFillAlfaAddress',
            'postalCode',
            result(res, 'postalCode', ''),
          ),
        );
        dispatch(
          change(
            'FormFillAlfaAddress',
            'fullName',
            result(res, 'fullName', ''),
          ),
        );
        dispatch(
          change(
            'FormFillAlfaAddress',
            'lastName',
            result(res, 'lastName', ''),
          ),
        );
        dispatch(
          change(
            'FormFillAlfaAddress',
            'streetAddress',
            result(res, 'streetAddress', ''),
          ),
        );
        dispatch(
          change(
            'FormFillAlfaAddress',
            'phoneNumber',
            result(res, 'phoneNumber', ''),
          ),
        );
        dispatch(
          change('FormFillAlfaAddress', 'note', result(res, 'note', '')),
        );
      }
    });
  };
}

export function listaddressAlfa(
  updateOrAdd = false,
  isDeleteOrDefault = false,
) {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ''));
    const dataAlfa = {
      lang: 'en',
      owner: cifCode,
      mode: 'NOPAGE',
      start: '0',
      pageSize: '5',
    };
    const payload = {
      requestData: dataAlfa,
      targetUrl: 'listAddressesEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    dispatch(actionCreators.showSpinner());
    return api
      .listaddressNewEstore(payload, dispatch)
      .then(res => {
        const addressResult = result(res, 'data.result', []);
        if (size(addressResult) === 0) {
          if (!updateOrAdd) {
            dispatch(
              NavigationActions.navigate({
                routeName: 'FormFillAlfaAddress',
                params: {isNew: true},
              }),
            );
          }
          dispatch(actionCreators.hideSpinner());
        } else {
          setTimeout(() => {
            dispatch(
              listPickupAlfa(addressResult, updateOrAdd, isDeleteOrDefault),
            );
          }, 3000);
        }
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          NavigationActions.navigate({
            routeName: 'FormFillAlfaAddress',
            params: {isNew: true},
          }),
        );
      });
  };
}
export function listPickupAlfa(addressResult, updateOrAdd, isDeleteOrDefault) {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ''));
    const dataAlfa = {
      lang: 'en',
      owner: cifCode,
      store: 'ALFACART',
    };
    const payload = {
      requestData: dataAlfa,
      targetUrl: 'listAddressesEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .listaddressNewEstore(payload, dispatch)
      .then(res => {
        const addressResultStore = result(res, 'data.result', []);
        dispatch(
          actionCreators.saveAllShipmentAddressAlfa({
            addressList: addressResult,
            storeList: addressResultStore,
          }),
        );
        if (updateOrAdd) {
          if (isDeleteOrDefault) {
            dispatch(actionCreators.hideSpinner());
          } else {
            dispatch(actionCreators.hideSpinner());
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'AlfacartCheckout'}),
                  NavigationActions.navigate({
                    routeName: 'AlfacartShippingMethodReal',
                  }),
                ],
              }),
            );
          }
        } else {
          dispatch(
            NavigationActions.navigate({
              routeName: 'AlfacartShippingMethodReal',
            }),
          );
        }
        dispatch(actionCreators.hideSpinner());
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(
          actionCreators.saveAllShipmentAddressAlfa({
            addressList: addressResult,
            storeList: [],
          }),
        );
        if (updateOrAdd) {
          if (isDeleteOrDefault) {
            dispatch(actionCreators.hideSpinner());
          } else {
            dispatch(actionCreators.hideSpinner());
            dispatch(
              StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({routeName: 'AlfacartCheckout'}),
                  NavigationActions.navigate({
                    routeName: 'AlfacartShippingMethodReal',
                  }),
                ],
              }),
            );
          }
        } else {
          dispatch(
            NavigationActions.navigate({
              routeName: 'AlfacartShippingMethodReal',
            }),
          );
        }
      });
  };
}

export function addNewAddressAlfacart(values, checked, isNew) {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ''));
    Geolocation.getCurrentPosition(info => {
      const lat = result(info, 'coords.latitude', '0').toString();
      const lot = result(info, 'coords.longitude', '0').toString();
      const payload = {
        requestData: {
          lang: 'en',
          name: result(values, 'fullName', ''),
          nameProvince: result(values, 'province.name', ''),
          codeProvince: result(values, 'province.code', ''),
          nameCity: result(values, 'city.name', ''),
          codeCity: result(values, 'city.code', ''),
          country: 'Indonesia',
          postalCode: result(values, 'postalCode', ''),
          email: result(values, 'email', ''),
          homePhone: '',
          mobilePhone: result(values, 'phoneNumber', ''),
          otherPhone: '',
          address1: result(values, 'streetAddress', ''),
          address2: '',
          longitude: lot,
          latitude: lat,
          owner: cifCode,
          addressMark: result(values, 'setAs', ''),
          isDefault: checked ? 'YES' : 'NO',
          nameDistrict: result(values, 'district.name', ''),
          codeDistrict: result(values, 'district.code', ''),
          nameSubDistrict: result(values, 'subDistrict.name', ''),
          codeSubDistrict: result(values, 'subDistrict.code', ''),
          villageId: result(values, 'subDistrict.villageId', ''),
        },
        targetUrl: 'saveAddressEstore',
        partner: 'ESTOREMANAGER',
        type: 'post',
        auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
      };
      dispatch(actionCreators.showSpinner());
      return api
        .saveAddressAlfaCart(payload, dispatch)
        .then(() => {
          dispatch(listaddressAlfa(true));
          if (isNew) {
            dispatch(NavigationActions.back());
            Toast.show(language.ALFACART__TOAST_SAVE_ADDRESS, Toast.LONG);
          }
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
        });
    });
  };
}
export function goToAddAddressALfacart(
  values,
  checked,
  isEdit = false,
  isNew = false,
) {
  return dispatch => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(response => {
        if (response === 'granted') {
          LocationServices.checkLocationServicesIsEnabled({
            message: language.QR_PROMO__ACCESS_LOCATION,
            ok: language.GENERIC__YES,
            cancel: language.GENERIC__NO,
            enableHighAccuracy: false,
            showDialog: true,
            openLocationServices: true,
          })
            .then(() => {
              if (!isEdit) {
                dispatch(addNewAddressAlfacart(values, checked, isNew));
              } else {
                dispatch(updateAddressAlfa(values, checked));
              }
            })
            .catch(() => {
              Toast.show(language.PERMISSION__LOCATION, Toast.LONG);
            });
        } else {
          Toast.show(language.PERMISSION__LOCATION, Toast.LONG);
        }
      });
    } else {
      Permissions.check('ios.permission.LOCATION_ALWAYS').then(response => {
        if (response === 'granted') {
          if (!isEdit) {
            dispatch(addNewAddressAlfacart(values, checked));
          } else {
            dispatch(updateAddressAlfa(values, checked, isNew));
          }
        } else {
          Permissions.request('ios.permission.LOCATION_ALWAYS').then(
            response => {
              if (response === 'granted') {
                if (!isEdit) {
                  dispatch(addNewAddressAlfacart(values, checked, isNew));
                } else {
                  dispatch(updateAddressAlfa(values, checked));
                }
              } else {
                Toast.show(language.PERMISSION__LOCATION, Toast.LONG);
              }
            },
          );
        }
      });
    }
  };
}

export function checkoutPurchaseOrderAlfacart(
  formValues,
  totalAll,
  typeMerchant,
) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const cartItems = result(state, 'merchantCart', []);
    const alfacartItems = result(state, 'confirmCheckoutAlfaProduct', []);
    const storeCode = result(
      state,
      'form.alfaCheckoutForm.values.timeSelection.StoreCode',
      '',
    );
    const products =
      typeMerchant === 'alfacart' ? uniq(alfacartItems) : uniq(cartItems);
    const fromItems = typeMerchant === 'alfacart' ? alfacartItems : cartItems;
    const method = result(formValues, 'shipmentaddress.formValues.method', '');
    const currentMerchant = result(state, 'currentMerchant', []);
    const merchant = result(currentMerchant, 'name', '');
    const merchantId = result(state, 'currentMerchant.id', '');
    const filterPurchaseOrder = map(products, function (value) {
      const firstDataId = result(value, 'items.productId', '');
      const countQuantity = size(
        filter(fromItems, function (val) {
          const firstCounting = result(val, 'items.productId', '');
          return firstDataId === firstCounting;
        }),
      );
      const productCodePurchase = result(value, 'items.productCode', '');
      const finalReturn = {
        productCode: productCodePurchase,
        quantity: countQuantity,
      };
      return finalReturn;
    });
    const idResult = require('lodash');
    const finalFilterPurchaseOrder = idResult.uniqWith(
      filterPurchaseOrder,
      function (arrVal, othVal) {
        return arrVal.productCode === othVal.productCode;
      },
    );
    const codeAddress = result(
      formValues,
      'shipmentaddress.formValues.codeAddress',
      '',
    );
    const timeSlotCode = result(
      formValues,
      'shipmentaddress.recepientValue.timeSlot.timeSlotId',
      '',
    );
    const timeSlot = result(
      formValues,
      'shipmentaddress.recepientValue.timeSlot.timeSlotDesc',
      '',
    );
    const dateSlot = result(
      formValues,
      'shipmentaddress.recepientValue.datePicker',
      '',
    );
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ''));
    const name = String(result(state, 'user.profile.name', ''));

    const dataAlfa = {
      lang: 'en',
      customerDetail: {
        cifCode: cifCode,
        customerName: name,
      },
      purchaseOrderList: filterPurchaseOrder,
      type: '0',
      method: method,
      timeSlot: timeSlot,
      timeSlotCode: timeSlotCode,
      dateSlot: dateSlot,
      addressDetail: codeAddress,
      storeCode: storeCode,
      receiverName: name,
      description: '',
      merchantId: merchantId,
    };
    const dataCMI = {
      lang: 'en',
      customerDetail: {
        cifCode: cifCode,
        customerName: name,
      },
      purchaseOrderList: finalFilterPurchaseOrder,
      method: method,
      addressDetail: codeAddress,
      receiverName: name,
      description: '',
      merchantId: merchantId,
    };

    const payload = {
      requestData: merchant === 'ALFACART' ? dataAlfa : dataCMI,
      targetUrl: 'checkoutPurchaseOrderEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .checkoutPurchaseOrderNewEstore(payload, dispatch)
      .then(res => {
        const purchaseCode = result(
          res,
          'data.result.purchaseOrderDetail.code',
          '',
        );
        dispatch(actionCreators.hideSpinner());
        dispatch(populateBillerData());
        startsWith(cifCode, 'NK');
        dispatch(
          goToEasyPinDigitalStore(
            formValues,
            totalAll,
            purchaseCode,
            typeMerchant,
          ),
        );
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, result(err, 'data.responseMessage', '')),
        );
        dispatch(destroy('loginEasyPinForm'));
      });
  };
}

export function checkoutStockALfa(formValues) {
  return (dispatch, getState) => {
    dispatch(actionCreators.deleteResultStock());
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const currentMerchant = result(state, 'currentMerchant', []);
    const merchantId = result(state, 'currentMerchant.id', '');
    const merchant = result(currentMerchant, 'name', '');
    const alfacartItems = result(state, 'confirmCheckoutAlfaProduct', []);
    const products = uniq(alfacartItems);
    const fromItems = alfacartItems;
    const method = result(formValues, 'method', '');
    const codeAddress = result(formValues, 'codeAddress', '');
    const filterPurchaseOrder = map(products, function (value) {
      const firstDataId = result(value, 'items.productId', '');
      const countQuantity = size(
        filter(fromItems, function (val) {
          const firstCounting = result(val, 'items.productId', '');
          return firstDataId === firstCounting;
        }),
      );
      const productCodePurchase = result(value, 'items.productCode', '');
      const finalReturn = {
        productCode: productCodePurchase,
        quantity: countQuantity,
      };
      return finalReturn;
    });

    const dataAlfa = {
      lang: 'en',
      isGroceries: 'true',
      purchaseOrderList: filterPurchaseOrder,
      codeAddress: codeAddress,
      method: method,
      storeCode: codeAddress,
      merchantId: merchantId,
    };

    const payload = {
      requestData: dataAlfa,
      targetUrl: 'checkStockEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    if (merchant === 'ALFACART') {
      return api
        .checkStockAlfa(payload, dispatch)
        .then(res => {
          const stockRemain = result(res, 'data.result.stock', []);
          const deliverFee = result(res, 'data.result.fee', 0);
          const findAvailableStock = find(stockRemain, {status: 'AVAILABLE'});
          const findOutOfStock = find(stockRemain, {status: 'OOS'});
          const checkAvailable = isEmpty(findAvailableStock);
          const checkOOS = isEmpty(findOutOfStock);

          if (!checkAvailable && !checkOOS) {
            const timeSlotPick = result(findAvailableStock, 'timeSlots', []);
            const lastUpdateRaw = size(timeSlotPick) - 1;
            const StoreCode = result(findAvailableStock, 'storeCode', '');
            const lastDate = result(
              timeSlotPick[`${lastUpdateRaw}`],
              'availabledate',
              '',
            );
            const firstDate = result(timeSlotPick, '0.availabledate', '');
            dispatch(
              change('alfaCheckoutForm', 'timeSelection', {
                firstDate,
                timeSlotPick,
                lastDate,
                deliverFee,
                StoreCode,
              }),
            );

            dispatch(actionCreators.hideSpinner());
            dispatch(actionCreators.showTimeSlot());
            const productsRaw = uniq(alfacartItems);
            const outStock = result(findOutOfStock, 'sku');
            const filterStockOrder = map(productsRaw, function (value) {
              const countQuantity = size(
                filter(outStock, function (val) {
                  const firstCounting = result(value, 'items.productCode', '');
                  const addingParam = 'ALFACART-' + val;
                  const isStock = firstCounting === addingParam;
                  const valueReturn = isStock ? value : null;
                  return valueReturn;
                }),
              );
              const finalReturn = {
                ...value,
                status: countQuantity !== 1 ? 'available' : 'oos',
              };
              return finalReturn;
            });
            const secondFilter = filter(filterStockOrder, function (o) {
              return result(o, 'status', '') === 'oos';
            });
            dispatch(actionCreators.saveResultStock(secondFilter));
          } else if (!checkAvailable) {
            const timeSlotPick = result(findAvailableStock, 'timeSlots', []);
            const lastUpdateRaw = size(timeSlotPick) - 1;
            const StoreCode = result(findAvailableStock, 'storeCode', '');
            const lastDate = result(
              timeSlotPick[`${lastUpdateRaw}`],
              'availabledate',
              '',
            );
            const firstDate = result(timeSlotPick, '0.availabledate', '');
            dispatch(
              change('alfaCheckoutForm', 'timeSelection', {
                firstDate,
                timeSlotPick,
                lastDate,
                deliverFee,
                StoreCode,
              }),
            );
            dispatch(actionCreators.hideSpinner());
            dispatch(actionCreators.showTimeSlot());
          } else if (!checkOOS) {
            const productsRaw = uniq(alfacartItems);
            const outStock = result(findOutOfStock, 'sku');
            const filterStockOrder = map(productsRaw, function (value) {
              const countQuantity = size(
                filter(outStock, function (val) {
                  const firstCounting = result(value, 'items.productCode', '');
                  const addingParam = 'ALFACART-' + val;
                  const isStock = firstCounting === addingParam;
                  const valueReturn = isStock ? value : null;
                  return valueReturn;
                }),
              );
              const finalReturn = {
                ...value,
                status: countQuantity !== 1 ? 'available' : 'oos',
              };
              return finalReturn;
            });
            const secondFilter = filter(filterStockOrder, function (o) {
              return result(o, 'status', '') === 'oos';
            });
            dispatch(actionCreators.saveResultStock(secondFilter));
            dispatch(NavigationActions.back());
            const valueRecepient = result(
              state,
              'form.alfaShipmentForm.values',
              {},
            );
            dispatch(
              change('alfaCheckoutForm', 'shipmentaddress', {
                formValues,
                recepientValue: valueRecepient,
              }),
            );
            dispatch(change('alfaCheckoutForm', 'timeSelection', {deliverFee}));
            dispatch(destroy('alfaShipmentForm'));
            dispatch(actionCreators.hideSpinner());
            Toast.show(language.TOAST__PRODUCT_OOS_WORDING, Toast.LONG);
          } else {
            dispatch(actionCreators.hideSpinner());
            Toast.show('Stock tidak bisa dibeli', Toast.LONG);
          }
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(err, result(err, 'data.responseMessage', '')),
          );
          dispatch(destroy('loginEasyPinForm'));
        });
    } else {
      return api
        .checkStockAlfa(payload, dispatch)
        .then(res => {
          const stockRemain = result(res, 'data.result.stock', []);
          const findAvailableStock = find(stockRemain, {status: 'AVAILABLE'});
          const findOutOfStock = find(stockRemain, {status: 'OOS'});
          const checkAvailable = isEmpty(findAvailableStock);
          const checkOOS = isEmpty(findOutOfStock);

          if (!checkAvailable && !checkOOS) {
            dispatch(actionCreators.showTimeSlot());
            const productsRaw = uniq(alfacartItems);
            const outStock = result(findOutOfStock, 'sku');
            const filterStockOrder = map(productsRaw, function (value) {
              const countQuantity = size(
                filter(outStock, function (val) {
                  const firstCounting = result(value, 'items.productCode', '');
                  const addingParam = val;
                  const isStock = firstCounting === addingParam;
                  const valueReturn = isStock ? value : null;
                  return valueReturn;
                }),
              );
              const finalReturn = {
                ...value,
                status: countQuantity !== 1 ? 'available' : 'oos',
              };
              return finalReturn;
            });

            const secondFilter = filter(filterStockOrder, function (o) {
              return result(o, 'status', '') === 'oos';
            });
            dispatch(actionCreators.saveResultStock(secondFilter));
            dispatch(actionCreators.hideSpinner());
            dispatch(NavigationActions.back());
            const valueRecepient = result(
              state,
              'form.alfaShipmentForm.values',
              {},
            );
            dispatch(
              change('alfaCheckoutForm', 'shipmentaddress', {
                formValues,
                recepientValue: valueRecepient,
              }),
            );
            dispatch(destroy('alfaShipmentForm'));
            dispatch(actionCreators.hideSpinner());
          } else if (!checkAvailable) {
            dispatch(NavigationActions.back());
            const valueRecepient = result(
              state,
              'form.alfaShipmentForm.values',
              {},
            );
            dispatch(
              change('alfaCheckoutForm', 'shipmentaddress', {
                formValues,
                recepientValue: valueRecepient,
              }),
            );
            dispatch(destroy('alfaShipmentForm'));
            dispatch(actionCreators.hideSpinner());
          } else if (!checkOOS) {
            const productsRaw = uniq(alfacartItems);
            const outStock = result(findOutOfStock, 'sku');
            const filterStockOrder = map(productsRaw, function (value) {
              const countQuantity = size(
                filter(outStock, function (val) {
                  const firstCounting = result(value, 'items.productCode', '');
                  const addingParam = val;
                  const isStock = firstCounting === addingParam;
                  const valueReturn = isStock ? value : null;
                  return valueReturn;
                }),
              );
              const finalReturn = {
                ...value,
                status: countQuantity !== 1 ? 'available' : 'oos',
              };
              return finalReturn;
            });
            const secondFilter = filter(filterStockOrder, function (o) {
              return result(o, 'status', '') === 'oos';
            });
            dispatch(actionCreators.saveResultStock(secondFilter));
            dispatch(NavigationActions.back());
            const valueRecepient = result(
              state,
              'form.alfaShipmentForm.values',
              {},
            );
            dispatch(
              change('alfaCheckoutForm', 'shipmentaddress', {
                formValues,
                recepientValue: valueRecepient,
              }),
            );
            dispatch(destroy('alfaShipmentForm'));
            dispatch(destroy('alfaShipmentForm'));
            dispatch(actionCreators.hideSpinner());
            Toast.show(language.TOAST__PRODUCT_OOS_WORDING, Toast.LONG);
          } else {
            dispatch(actionCreators.hideSpinner());
            Toast.show('Stock tidak bisa dibeli', Toast.LONG);
          }
        })
        .catch(err => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(err, result(err, 'data.responseMessage', '')),
          );
          dispatch(destroy('loginEasyPinForm'));
        });
    }
  };
}

export function oncloseTimeSlot() {
  return dispatch => {
    dispatch(actionCreators.hideTimeSlot());
  };
}

export function selectAddressShippingAlfa(formValues) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(NavigationActions.back());
    const valueRecepient = result(state, 'form.alfaShipmentForm.values', {});
    dispatch(
      change('alfaCheckoutForm', 'shipmentaddress', {
        formValues,
        recepientValue: valueRecepient,
      }),
    );
    dispatch(destroy('alfaShipmentForm'));
    dispatch(actionCreators.hideTimeSlot());
  };
}

export function wishlistDetailAlfacart(product) {
  return (dispatch, getState) => {
    const state = getState();
    const currentMerchant = result(state, 'currentMerchant', []);
    const merchant = result(currentMerchant, 'name', '');
    if (merchant === 'ALFACART') {
      const items = result(state, 'wishlistAlfacart', []);
      const code = result(product, 'productId', '');
      const filterProductExist = filter(items, function (o) {
        return o.productId !== code;
      });

      const itemsFinal = [...filterProductExist, product];
      set(storageKeys.WISHLIST_ALFACART, itemsFinal);
      dispatch(actionCreators.saveWishlistAlfacart(itemsFinal));
      dispatch(actionCreators.hideSinarmasAlert());
    } else {
      const items = result(state, 'wishlistCMI', []);
      const code = result(product, 'productId', '');
      const filterProductExist = filter(items, function (o) {
        return o.productId !== code;
      });

      const itemsFinal = [...filterProductExist, product];
      set(storageKeys.WISHLIST_CMI, itemsFinal);
      dispatch(actionCreators.saveWishlistCMI(itemsFinal));
      dispatch(actionCreators.hideSinarmasAlert());
    }
  };
}

export function addWishlistFromCart(product) {
  return (dispatch, getState) => {
    const state = getState();
    const currentMerchant = result(state, 'currentMerchant', []);
    const merchant = result(currentMerchant, 'name', '');
    if (merchant === 'ALFACART') {
      const items = result(state, 'wishlistAlfacart', []);
      const code = result(product, 'items.productId', '');
      const filterProductExist = filter(items, function (o) {
        return o.productId !== code;
      });

      const itemsFinal = [...filterProductExist, product];
      set(storageKeys.WISHLIST_ALFACART, itemsFinal);
      dispatch(actionCreators.saveWishlistAlfacart(itemsFinal));
      dispatch(actionCreators.hideSinarmasAlert());
    } else {
      const items = result(state, 'wishlistCMI', []);
      const code = result(product, 'items.productId', '');
      const filterProductExist = filter(items, function (o) {
        return o.productId !== code;
      });

      const itemsFinal = [...filterProductExist, product];
      set(storageKeys.WISHLIST_CMI, itemsFinal);
      dispatch(actionCreators.saveWishlistCMI(itemsFinal));
      dispatch(actionCreators.hideSinarmasAlert());
    }
  };
}

export function editAddressAlfa(value) {
  return dispatch => {
    dispatch(
      change('FormFillAlfaAddress', 'fullName', result(value, 'name', '')),
    );
    dispatch(
      change('FormFillAlfaAddress', 'email', result(value, 'email', '')),
    );
    dispatch(
      change(
        'FormFillAlfaAddress',
        'phoneNumber',
        result(value, 'mobilePhone', ''),
      ),
    );
    dispatch(
      change('FormFillAlfaAddress', 'setAs', result(value, 'markAddress', '')),
    );
    dispatch(
      change('FormFillAlfaAddress', 'province', {
        name: result(value, 'nameProvince', ''),
        code: result(value, 'codeProvince', ''),
      }),
    );
    dispatch(
      change('FormFillAlfaAddress', 'city', {
        name: result(value, 'nameCity', ''),
        code: result(value, 'codeCity', ''),
      }),
    );
    dispatch(
      change('FormFillAlfaAddress', 'subDistrict', {
        name: result(value, 'nameSubDistrict', ''),
        code: result(value, 'codeSubDistrict', ''),
        zipCode: result(value, 'postalCode', ''),
      }),
    );
    dispatch(
      change('FormFillAlfaAddress', 'district', {
        name: result(value, 'nameDistrict', ''),
        code: result(value, 'codeDistrict', ''),
      }),
    );
    dispatch(
      change(
        'FormFillAlfaAddress',
        'postalCode',
        result(value, 'postalCode', ''),
      ),
    );
    dispatch(
      change(
        'FormFillAlfaAddress',
        'streetAddress',
        result(value, 'address1', ''),
      ),
    );
    dispatch(
      change(
        'FormFillAlfaAddress',
        'codeAddress',
        result(value, 'codeAddress', ''),
      ),
    );
    const isDefault = result(value, 'isDefault', '');
    dispatch(goToFormFillAddres(isDefault));
  };
}

export function updateAddressAlfa(values, checked) {
  return (dispatch, getState) => {
    const state = getState();

    const cifCode = String(result(state, 'user.profile.customer.cifCode', ''));
    Geolocation.getCurrentPosition(info => {
      const lat = result(info, 'coords.latitude', '0').toString();
      const lot = result(info, 'coords.longitude', '0').toString();
      const date = new Date();
      const rawnextDate = moment(date).format('DD/MM/YYYY');
      const payload = {
        requestData: {
          lang: 'en',
          codeAddress: result(values, 'codeAddress', ''),
          name: result(values, 'fullName', ''),
          nameProvince: result(values, 'province.name', ''),
          codeProvince: result(values, 'province.code', ''),
          nameCity: result(values, 'city.name', ''),
          codeCity: result(values, 'city.code', ''),
          country: 'Indonesia',
          postalCode: result(values, 'postalCode', ''),
          email: result(values, 'email', ''),
          homePhone: '',
          mobilePhone: result(values, 'phoneNumber', ''),
          otherPhone: '',
          address1: result(values, 'streetAddress', ''),
          address2: '',
          longitude: lot,
          latitude: lat,
          verified: rawnextDate,
          owner: cifCode,
          addressMark: result(values, 'setAs', ''),
          isDefault: checked ? 'YES' : 'NO',
          nameDistrict: result(values, 'district.name', ''),
          codeDistrict: result(values, 'district.code', ''),
          nameSubDistrict: result(values, 'subDistrict.name', ''),
          codeSubDistrict: result(values, 'subDistrict.code', ''),
          villageId: result(values, 'subDistrict.villageId', ''),
        },
        targetUrl: 'updateAddressEstore',
        partner: 'ESTOREMANAGER',
        type: 'post',
        auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
      };
      dispatch(actionCreators.showSpinner());
      return api
        .updateAddressAlfa(payload, dispatch)
        .then(() => {
          dispatch(listaddressAlfa(true));
        })
        .catch(() => {
          dispatch(actionCreators.hideSpinner());
        });
    });
  };
}

export function setDefaultAlfaAddress(formValues) {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ''));
    dispatch(actionCreators.showSpinner());
    const code = result(formValues, 'codeAddress', '');
    const owner = cifCode;
    const payload = {
      requestData: {
        lang: 'en',
        code: code,
        owner: owner,
      },
      targetUrl: 'setAsDefaultAddressEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .setDefaultAddressAlfa(payload, dispatch)
      .then(() => {
        dispatch(listaddressAlfa(true, true));
        set(storageKeys.GET_DEFAULT_ADDRESS, code);
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function getDefaultAlfaAddress() {
  return dispatch => {
    getDefaultAddress().then(res => {
      dispatch(actionCreators.setDefaultAddress(res));
    });
  };
}

export function searchAlfaStore(values) {
  return (dispatch, getState) => {
    const state = getState();

    const alfaStoreName = toUpper(
      result(state, 'form.alfaStoreSearchForm.values.searchBox', ''),
    );
    const alfaStoreRegion = result(
      state,
      'form.alfaStoreSearchForm.values.subDistrict',
      {},
    );

    const alfacartShipmentAddress = result(
      state,
      'alfacartShipmentAddress',
      [],
    );
    const addressCustomer = result(alfacartShipmentAddress, 'addressList', []);
    dispatch(actionCreators.showSpinner());
    const dataName = {
      lang: 'en',
      mode: 'NOPAGE',
      start: 0,
      pageSize: 10,
      orderBy: {
        code: 'ASC',
      },
      filter: {
        name: alfaStoreName,
        owner: 'ALFACART',
      },
    };
    const payloadName = {
      requestData: dataName,
      targetUrl: 'searchAddressEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    const dataRegion = {
      lang: 'en',
      mode: 'NOPAGE',
      start: 0,
      pageSize: 10,
      orderBy: {
        code: 'ASC',
      },
      filter: {
        province: result(values, 'province.name', ''),
        city: result(values, 'city.name', ''),
        district: result(values, 'district.name', ''),
        subDistrict: result(values, 'subDistrict.name', ''),
        owner: 'ALFACART',
      },
    };

    const payloadRegion = {
      requestData: dataRegion,
      targetUrl: 'searchAddressEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    if (!isEmpty(alfaStoreName)) {
      return api
        .searchAlfaStore(payloadName, dispatch)
        .then(res => {
          dispatch(NavigationActions.back());
          dispatch(actionCreators.hideSpinner());
          const addressResultStore = result(res, 'data.result', []);
          dispatch(
            actionCreators.saveAllShipmentAddressAlfa({
              addressList: addressCustomer,
              storeList: addressResultStore,
            }),
          );
          dispatch(destroy('alfaStoreSearchForm'));
        })
        .catch(err => {
          Toast.show(result(err, 'data.responseMessage', ''));
          dispatch(actionCreators.hideSpinner());
        });
    }
    if (!isEmpty(alfaStoreRegion)) {
      return api
        .searchAlfaStore(payloadRegion, dispatch)
        .then(res => {
          dispatch(NavigationActions.back());
          dispatch(actionCreators.hideSpinner());
          const addressResultStore = result(res, 'data.result', []);
          dispatch(
            actionCreators.saveAllShipmentAddressAlfa({
              addressList: addressCustomer,
              storeList: addressResultStore,
            }),
          );
          dispatch(destroy('alfaStoreSearchForm'));
        })
        .catch(err => {
          Toast.show(result(err, 'data.responseMessage', ''));
          dispatch(actionCreators.hideSpinner());
        });
    }
  };
}

export function deleteAlfaAddress(formValues) {
  return (dispatch, getState) => {
    const state = getState();
    const cifCode = String(result(state, 'user.profile.customer.cifCode', ''));
    dispatch(actionCreators.showSpinner());
    const code = result(formValues, 'codeAddress', '');
    const owner = cifCode;

    const payload = {
      requestData: {
        lang: 'en',
        code: code,
        owner: owner,
      },
      targetUrl: 'deleteAddressEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .deleteAddressAlfa(payload, dispatch)
      .then(() => {
        dispatch(listaddressAlfa(true, true));
        Toast.show(language.ALFACART_TOAST__ADDRESS_DELETE, Toast.LONG);
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function deleteBuyItems(value) {
  return (dispatch, getState) => {
    const state = getState();
    const alfacartItems = result(state, 'confirmCheckoutAlfaProduct', []);
    const method = result(
      state,
      'form.alfaCheckoutForm.values.shipmentaddress.formValues.method',
      '',
    );
    const fromItems = alfacartItems;
    const merchantId = result(state, 'currentMerchant.id', '');
    const checkoutList = result(state, 'confirmCheckoutAlfaProduct', []);
    const saveResultStockAlfa = result(state, 'saveResultStockAlfa', []);
    const filterCheckoutList = filter(checkoutList, function (val) {
      const firstCounting = result(val, 'items.productCode', '');
      return value !== firstCounting;
    });
    const filterPurchaseOrder = map(filterCheckoutList, function (value) {
      const firstDataId = result(value, 'items.productId', '');
      const countQuantity = size(
        filter(fromItems, function (val) {
          const firstCounting = result(val, 'items.productId', '');
          return firstDataId === firstCounting;
        }),
      );
      const productCodePurchase = result(value, 'items.productCode', '');
      const finalReturn = {
        productCode: productCodePurchase,
        quantity: countQuantity,
      };
      return finalReturn;
    });
    const data = {
      lang: 'en',
      purchaseOrderList: filterPurchaseOrder,
      method: method,
      merchantId: merchantId,
    };
    const payload = {
      requestData: data,
      targetUrl: 'updateDeliveryFeeEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .updateDeliveryFeeEstore(payload, dispatch)
      .then(() => {
        const filterSaveResultStockAlfa = filter(
          saveResultStockAlfa,
          function (val) {
            const firstCounting = result(val, 'items.productCode', '');
            return value !== firstCounting;
          },
        );
        dispatch(actionCreators.saveResultStock(filterSaveResultStockAlfa));
        dispatch(actionCreators.confrimCheckoutAlfa(filterCheckoutList));
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}
export function storageAlfacart() {
  return dispatch => {
    get(storageKeys.CART_ALFACART).then(res => {
      let finalItems = [];
      let junkHere = [];

      const filterCount = filter(res, function (val) {
        const currentPick = result(val, 'quantity', 1);
        const productNew = {items: result(val, 'items'), quantity: 1};
        const selectedItems = generrateArrayItems(productNew, currentPick);
        finalItems = [...finalItems, ...selectedItems];
        return;
      });

      junkHere = [...junkHere, ...filterCount];
      dispatch(change('formDataalfaDidntUse', 'neverUse', junkHere));
      dispatch(actionCreators.saveCartAlfacart(finalItems));
    });
  };
}

export function storageCartCMI() {
  return dispatch => {
    get(storageKeys.CART_CMI).then(res => {
      let finalItems = [];
      let junkHere = [];

      const filterCount = filter(res, function (val) {
        const currentPick = result(val, 'quantity', 1);
        const productNew = {items: result(val, 'items'), quantity: 1};
        const selectedItems = generrateArrayItems(productNew, currentPick);
        finalItems = [...finalItems, ...selectedItems];
        return;
      });

      junkHere = [...junkHere, ...filterCount];
      dispatch(change('formDataalfaDidntUse', 'neverUse', junkHere));
      dispatch(actionCreators.saveCartCMI(finalItems));
    });
  };
}

export function buyNowDashboard(product) {
  return (dispatch, getState) => {
    const state = getState();
    const currentMerchant = result(state, 'currentMerchant', []);
    const merchant = result(currentMerchant, 'name', '');

    if (merchant === 'ALFACART') {
      const items = result(state, 'cartAlfacart', []);
      const code = result(product, 'items.productId', '');
      const currentPick = result(product, 'quantity', 1);
      const filterProductExist = filter(items, function (o) {
        return result(o, 'items.productId', '') !== code;
      });
      const productNew = {items: result(product, 'items'), quantity: 1};
      const selectedItems = generrateArrayItems(productNew, currentPick);

      const itemsFinal = [...filterProductExist, ...selectedItems];

      const grupItemFinal = uniq(itemsFinal);
      const finalOrdercart = map(grupItemFinal, function (value) {
        const firstDataId = result(value, 'items.productId', '');
        const countQuantity = size(
          filter(itemsFinal, function (val) {
            const firstCounting = result(val, 'items.productId', '');
            return firstDataId === firstCounting;
          }),
        );
        const productCodePurchase = result(value, 'items', '');
        const finalReturn = {
          items: productCodePurchase,
          quantity: countQuantity,
        };
        return finalReturn;
      });

      set(storageKeys.CART_ALFACART, finalOrdercart);
      dispatch(actionCreators.saveCartAlfacart(itemsFinal));
      Toast.show(language.DIGISTORE__PRODUCT_SUCCESS_TO_CART, Toast.LONG);
      dispatch(NavigationActions.navigate({routeName: 'AlfacartCart'}));
    } else {
      const items = result(state, 'cartCMI', []);
      const code = result(product, 'items.productId', '');
      const currentPick = result(product, 'quantity', 1);
      const filterProductExist = filter(items, function (o) {
        return result(o, 'items.productId', '') !== code;
      });
      const productNew = {items: result(product, 'items'), quantity: 1};
      const selectedItems = generrateArrayItems(productNew, currentPick);

      const itemsFinal = [...filterProductExist, ...selectedItems];

      const grupItemFinal = uniq(itemsFinal);
      const finalOrdercart = map(grupItemFinal, function (value) {
        const firstDataId = result(value, 'items.productId', '');
        const countQuantity = size(
          filter(itemsFinal, function (val) {
            const firstCounting = result(val, 'items.productId', '');
            return firstDataId === firstCounting;
          }),
        );
        const productCodePurchase = result(value, 'items', '');
        const finalReturn = {
          items: productCodePurchase,
          quantity: countQuantity,
        };
        return finalReturn;
      });

      set(storageKeys.CART_CMI, finalOrdercart);
      dispatch(actionCreators.saveCartCMI(itemsFinal));
      Toast.show(language.DIGISTORE__PRODUCT_SUCCESS_TO_CART, Toast.LONG);
      dispatch(NavigationActions.navigate({routeName: 'AlfacartCart'}));
    }
  };
}

export function dropFromWishlist(item) {
  return (dispatch, getState) => {
    const state = getState();
    const currentMerchant = result(state, 'currentMerchant', []);
    const merchant = result(currentMerchant, 'name', '');
    if (merchant === 'ALFACART') {
      const wishlistAlfacart = result(state, 'wishlistAlfacart', []);
      const code = result(item, 'productId', '');
      const newList = filter(wishlistAlfacart, function (o) {
        return o.productId !== code;
      });
      dispatch(actionCreators.updateWishlistAlfacart(newList));
      dispatch(actionCreators.hideSinarmasAlert());
      set(storageKeys.WISHLIST_ALFACART, newList);
    } else {
      const wishlistCMI = result(state, 'wishlistCMI', []);
      const code = result(item, 'productId', '');
      const newList = filter(wishlistCMI, function (o) {
        return o.productId !== code;
      });
      dispatch(actionCreators.updateWishlistCMI(newList));
      dispatch(actionCreators.hideSinarmasAlert());
      set(storageKeys.WISHLIST_CMI, newList);
    }
  };
}

export function dropWishlistFromCart(item) {
  return (dispatch, getState) => {
    const state = getState();
    const currentMerchant = result(state, 'currentMerchant', []);
    const merchant = result(currentMerchant, 'name', '');
    if (merchant === 'ALFACART') {
      const wishlistAlfacart = result(state, 'wishlistAlfacart', []);
      const code = result(item, 'items.productId', '');

      const newList = filter(wishlistAlfacart, function (o) {
        return o.productId !== code;
      });
      dispatch(actionCreators.updateWishlistAlfacart(newList));
      dispatch(actionCreators.hideSinarmasAlert());
      set(storageKeys.WISHLIST_ALFACART, newList);
    } else {
      const wishlistCMI = result(state, 'wishlistCMI', []);
      const code = result(item, 'items.productId', '');

      const newList = filter(wishlistCMI, function (o) {
        return o.productId !== code;
      });
      dispatch(actionCreators.updateWishlistCMI(newList));
      dispatch(actionCreators.hideSinarmasAlert());
      set(storageKeys.WISHLIST_CMI, newList);
    }
  };
}

export function goToCartAlfacart() {
  return (dispatch, getState) => {
    const state = getState();
    const currentMerchant = result(state, 'currentMerchant', []);
    const merchant = result(currentMerchant, 'name', '');
    if (merchant === 'ALFACART') {
      let items = result(state, 'cartAlfacart', []);
      dispatch(actionCreators.confrimCheckoutAlfa(items));
      dispatch(NavigationActions.navigate({routeName: 'AlfacartCart'}));
    } else {
      let items = result(state, 'cartCMI', []);
      dispatch(actionCreators.confrimCheckoutAlfa(items));
      dispatch(NavigationActions.navigate({routeName: 'AlfacartCart'}));
    }
  };
}

export function buyNowFromWishlist(product) {
  return (dispatch, getState) => {
    const state = getState();
    const items = result(state, 'cartAlfacart', []);
    const code = result(product, 'items.items.productId', '');
    const currentPick = result(product, 'quantity', 1);
    const filterProductExist = filter(items, function (o) {
      return result(o, 'items.productId', '') !== code;
    });
    const productNew = {items: result(product, 'items.items'), quantity: 1};
    const selectedItems = generrateArrayItems(productNew, currentPick);

    const itemsFinal = [...filterProductExist, ...selectedItems];
    const grupItemFinal = uniq(itemsFinal);
    const finalOrdercart = map(grupItemFinal, function (value) {
      const firstDataId = result(value, 'items.productId', '');
      const countQuantity = size(
        filter(itemsFinal, function (val) {
          const firstCounting = result(val, 'items.productId', '');
          return firstDataId === firstCounting;
        }),
      );
      const productCodePurchase = result(value, 'items', '');
      const finalReturn = {items: productCodePurchase, quantity: countQuantity};
      return finalReturn;
    });

    set(storageKeys.CART_ALFACART, finalOrdercart);
    dispatch(actionCreators.saveCartAlfacart(itemsFinal));
    Toast.show(language.DIGISTORE__PRODUCT_SUCCESS_TO_CART, Toast.LONG);
    dispatch(NavigationActions.navigate({routeName: 'AlfacartCart'}));
  };
}

export function categoryDashboard(categoryCode) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());

    const dataCategory = {
      lang: 'en',
      mode: '',
      listBy: 'category',
      start: '0',
      pageSize: '40',
      orderBy: {
        code: 'DESC',
      },
      filter: {
        productCode: '',
        categoryCode: categoryCode,
        categoryType: 'ALFACART_categoryProduct',
      },
    };
    const payload = {
      requestData: dataCategory,
      targetUrl: 'listProductEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .listAllProductNewEstore(payload, dispatch)
      .then(res => {
        const listAllProductData = result(res, 'data.result', []);
        const countCurrentPage = result(res, 'data.pageCtrl-start', 0);
        const productInPage = result(res, 'data.pageCtrl-count', 0);
        const allTotalData = result(res, 'data.pageCtrl-total', 0);
        const estimatedPage = ceil(allTotalData / productInPage);
        dispatch(actionCreators.clearAllProduct());
        dispatch(actionCreators.saveAllProduct(listAllProductData));
        dispatch(
          actionCreators.savePaginationDashboardALfa({
            countCurrentPage,
            productInPage,
            allTotalData,
            estimatedPage,
            mode: 'category',
            categoryCode: categoryCode,
          }),
        );
        dispatch(actionCreators.hideSpinner());
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function goToSearchAlfacart() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'SearchAlfacartPage'}));
    dispatch(actionCreators.deletePaginationSearchAlfa());
    dispatch(actionCreators.deleteSearchallProductAlfa());
  };
}

export function goToPageAlfa(value) {
  return (dispatch, getState) => {
    const state = getState();
    const countCurrentPage = result(
      state,
      'paginationAlfaDashboard.countCurrentPage',
      '',
    );
    const productInPage = result(
      state,
      'paginationAlfaDashboard.productInPage',
      '',
    );
    const mode = result(state, 'paginationAlfaDashboard.mode', 'category');
    const categoryCode = result(
      state,
      'paginationAlfaDashboard.categoryCode',
      '0',
    );
    dispatch(actionCreators.showSpinner());
    const data = {
      lang: 'en',
      mode: '',
      listBy: 'allproduct',
      start: String(countCurrentPage + value),
      pageSize: String(productInPage),
      orderBy: {
        code: 'DESC',
      },
      filter: {
        productCode: 'ALFACART',
        categoryCode: '',
        categoryType: '',
      },
    };
    const dataCategory = {
      lang: 'en',
      mode: '',
      listBy: 'category',
      start: String(countCurrentPage + value),
      pageSize: String(productInPage),
      orderBy: {
        code: 'DESC',
      },
      filter: {
        productCode: '',
        categoryCode: categoryCode,
        categoryType: 'ALFACART_categoryProduct',
      },
    };
    const payload = {
      requestData: mode === 'all' ? data : dataCategory,
      targetUrl: 'listProductEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .listAllProductNewEstore(payload, dispatch)
      .then(res => {
        const listAllProductData = result(res, 'data.result', []);
        const countCurrentPage = result(res, 'data.pageCtrl-start', 0);
        const productInPage = result(res, 'data.pageCtrl-count', 0);
        const allTotalData = result(res, 'data.pageCtrl-total', 0);
        const estimatedPage = ceil(allTotalData / productInPage);
        dispatch(actionCreators.clearAllProduct());
        setTimeout(() => {
          dispatch(actionCreators.saveAllProduct(listAllProductData));
          dispatch(actionCreators.hideSpinner());
        }, 2000);

        dispatch(
          actionCreators.savePaginationDashboardALfa({
            countCurrentPage,
            productInPage,
            allTotalData,
            estimatedPage,
            mode: mode,
            categoryCode: categoryCode,
          }),
        );
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function goToShowProductAlfa() {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'ShowResultPage'}));
  };
}

export function goToPageSearch(value) {
  return (dispatch, getState) => {
    const state = getState();
    const countCurrentPage = result(
      state,
      'paginationAlfaSearch.countCurrentPage',
      '',
    );
    const productInPage = result(
      state,
      'paginationAlfaSearch.productInPage',
      '',
    );
    const mode = result(state, 'paginationAlfaSearch.mode', 'category');
    const keyWord = result(state, 'paginationAlfaSearch.keyWord', '');
    const merchantId = result(state, 'currentMerchant.id', '');
    dispatch(actionCreators.showSpinner());
    const data = {
      lang: 'en',
      mode: '',
      listBy: 'searchproduct',
      start: String(countCurrentPage + value),
      pageSize: String(productInPage),
      orderBy: {
        date: 'DESC',
      },
      filter: {
        merchantId: merchantId,
        productName: keyWord,
        categoryCode: '',
        categoryType: '',
      },
    };

    const payload = {
      requestData: data,
      targetUrl: 'listProductEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .listAllProductNewEstore(payload, dispatch)
      .then(res => {
        const listAllProductData = result(res, 'data.result', []);
        const countCurrentPage = result(res, 'data.pageCtrl-start', 0);
        const productInPage = result(res, 'data.pageCtrl-count', 0);
        const allTotalData = result(res, 'data.pageCtrl-total', 0);
        const estimatedPage = ceil(allTotalData / productInPage);
        dispatch(actionCreators.deleteSearchallProductAlfa());
        dispatch(actionCreators.saveSearchallProductAlfa(listAllProductData));
        dispatch(
          actionCreators.savePaginationSearchALfa({
            countCurrentPage,
            productInPage,
            allTotalData,
            estimatedPage,
            mode: mode,
            keyWord: keyWord,
          }),
        );
        dispatch(actionCreators.hideSpinner());
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function searchDashboard(keyWord) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(actionCreators.showSpinner());
    const merchantId = result(state, 'currentMerchant.id', '');
    const dataCategory = {
      lang: 'en',
      mode: '',
      listBy: 'searchproduct',
      start: '0',
      pageSize: '40',
      orderBy: {
        date: 'DESC',
      },
      filter: {
        merchantId: merchantId,
        productName: keyWord,
        categoryCode: '',
        categoryType: '',
      },
    };
    const payload = {
      requestData: dataCategory,
      targetUrl: 'listProductEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .listAllProductNewEstore(payload, dispatch)
      .then(res => {
        const listAllProductData = result(res, 'data.result', []);
        const countCurrentPage = result(res, 'data.pageCtrl-start', 0);
        const productInPage = result(res, 'data.pageCtrl-count', 0);
        const allTotalData = result(res, 'data.pageCtrl-total', 0);
        const estimatedPage = ceil(allTotalData / productInPage);
        dispatch(actionCreators.deleteSearchallProductAlfa());
        dispatch(actionCreators.saveSearchallProductAlfa(listAllProductData));
        dispatch(
          actionCreators.savePaginationSearchALfa({
            countCurrentPage,
            productInPage,
            allTotalData,
            estimatedPage,
            mode: 'search',
            keyWord: keyWord,
          }),
        );
        dispatch(actionCreators.hideSpinner());
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function CheckoutFromCart() {
  return dispatch => {
    dispatch(actionCreators.showSpinner());

    const dataAlfa = {
      lang: 'en',
      purchaseOrderList: [
        {
          productCode: 'ALFACART-A00010000638',
          quantity: 2,
        },
        {
          productCode: 'ALFACART-A12460003260',
          quantity: 2,
        },
      ],
    };
    const payload = {
      requestData: dataAlfa,
      targetUrl: 'checkOutFromCartEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .checkoutFromCart(payload, dispatch)
      .then(() => {})
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function categorySeeAll(categoryCode) {
  return dispatch => {
    dispatch(actionCreators.showSpinner());

    const dataCategory = {
      lang: 'en',
      mode: '',
      listBy: 'category',
      start: '0',
      pageSize: '40',
      orderBy: {
        code: 'DESC',
      },
      filter: {
        productCode: '',
        categoryCode: categoryCode,
        categoryType: 'ALFACART_categoryProduct',
      },
    };
    const payload = {
      requestData: dataCategory,
      targetUrl: 'listProductEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .listAllProductNewEstore(payload, dispatch)
      .then(res => {
        const listAllProductData = result(res, 'data.result', []);
        const countCurrentPage = result(res, 'data.pageCtrl-start', 0);
        const productInPage = result(res, 'data.pageCtrl-count', 0);
        const allTotalData = result(res, 'data.pageCtrl-total', 0);
        const estimatedPage = ceil(allTotalData / productInPage);
        dispatch(actionCreators.clearAllProduct());
        dispatch(actionCreators.saveAllProduct(listAllProductData));
        dispatch(
          actionCreators.savePaginationDashboardALfa({
            countCurrentPage,
            productInPage,
            allTotalData,
            estimatedPage,
            mode: 'category',
            categoryCode: categoryCode,
          }),
        );
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({routeName: 'AlfacartDashboard'}));
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({routeName: 'AlfacartDashboard'}));
      });
  };
}

export function shouldGiveChecklist(isFromTnc = false, navigation = {}) {
  return (dispatch, getState) => {
    const state = getState();
    const feedbackChecklist = false;
    const isLockedDevice = Boolean(
      state.appInitKeys &&
        state.appInitKeys.username &&
        state.appInitKeys.tokenClient &&
        state.appInitKeys.tokenServer,
    );
    const navKey = result(navigation, 'state.key', ''); // key of tnc page to be replaced
    return get(storageKeys.FEEDBACK_CHECKLIST).then(storedFeedBack => {
      if (feedbackChecklist !== storedFeedBack && isLockedDevice === true) {
        dispatch(NavigationActions.navigate({routeName: 'AlfacartTnc'}));
      } else {
        dispatch(generateJwt()).then(res => {
          const jwt = result(res, 'jwt', '');
          const merchant = 'ALFACART';
          if (!isEmpty(jwt)) {
            if (!isEmpty(navKey) && isFromTnc) {
              dispatch(
                NavigationActions.replace({
                  key: navKey,
                  routeName: 'UltraVoucherWebView',
                  params: {jwt: jwt, merchant: merchant},
                }),
              );
            } else {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'UltraVoucherWebView',
                  params: {jwt: jwt, merchant: merchant},
                }),
              );
            }
          }
        });
      }
      return shouldGiveChecklist;
    });
  };
}

export function storageWishlistAlfacart() {
  return dispatch => {
    get(storageKeys.WISHLIST_ALFACART).then(res => {
      dispatch(actionCreators.saveWishlistAlfacart(res));
    });
  };
}

export function storageWishlistCMI() {
  return dispatch => {
    get(storageKeys.WISHLIST_CMI).then(res => {
      dispatch(actionCreators.saveWishlistCMI(res));
    });
  };
}

export function searchAlfaRegion() {
  return (dispatch, getState) => {
    const state = getState();
    const alfacartShipmentAddress = result(
      state,
      'alfacartShipmentAddress',
      [],
    );
    const addressCustomer = result(alfacartShipmentAddress, 'addressList', []);
    dispatch(actionCreators.showSpinner());
    const data = {
      lang: 'en',
      mode: 'NOPAGE',
      start: 0,
      pageSize: 1,
      orderBy: {
        code: 'ASC',
      },
      filter: {
        name: 'CIKOKOL',
        address1: '',
        owner: 'ALFACART',
      },
    };
    const payload = {
      requestData: data,
      targetUrl: 'searchAddressEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .searchAlfaStoreName(payload, dispatch)
      .then(res => {
        dispatch(NavigationActions.back());
        dispatch(actionCreators.hideSpinner());
        const addressResultStore = result(res, 'data.result', []);
        dispatch(
          actionCreators.saveAllShipmentAddressAlfa({
            addressList: addressCustomer,
            storeList: addressResultStore,
          }),
        );
        dispatch(destroy('alfaStoreSearchForm'));
      })
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function addToCartFromWishlist(product) {
  return (dispatch, getState) => {
    const state = getState();
    const currentMerchant = result(state, 'currentMerchant', []);
    const merchant = result(currentMerchant, 'name', '');

    if (merchant === 'ALFACART') {
      const items = result(state, 'cartAlfacart', []);
      const code = result(product, 'items.productId', '');
      const currentPick = result(product, 'quantity', 1);
      const filterProductExist = filter(items, function (o) {
        return result(o, 'items.productId', '') !== code;
      });
      const productNew = {items: result(product, 'items'), quantity: 1};
      const selectedItems = generrateArrayItems(productNew, currentPick);

      const itemsFinal = [...filterProductExist, ...selectedItems];
      const grupItemFinal = uniq(itemsFinal);
      const finalOrdercart = map(grupItemFinal, function (value) {
        const firstDataId = result(value, 'items.productId', '');
        const countQuantity = size(
          filter(itemsFinal, function (val) {
            const firstCounting = result(val, 'items.productId', '');
            return firstDataId === firstCounting;
          }),
        );
        const productCodePurchase = result(value, 'items', '');
        const finalReturn = {
          items: productCodePurchase,
          quantity: countQuantity,
        };
        return finalReturn;
      });

      set(storageKeys.CART_ALFACART, finalOrdercart);
      dispatch(actionCreators.saveCartAlfacart(itemsFinal));
      Toast.show(language.DIGISTORE__PRODUCT_SUCCESS_TO_CART, Toast.LONG);
    } else {
      const items = result(state, 'cartCMI', []);
      const code = result(product, 'items.productId', '');
      const currentPick = result(product, 'quantity', 1);
      const filterProductExist = filter(items, function (o) {
        return result(o, 'items.productId', '') !== code;
      });
      const productNew = {items: result(product, 'items'), quantity: 1};
      const selectedItems = generrateArrayItems(productNew, currentPick);

      const itemsFinal = [...filterProductExist, ...selectedItems];
      const grupItemFinal = uniq(itemsFinal);
      const finalOrdercart = map(grupItemFinal, function (value) {
        const firstDataId = result(value, 'items.productId', '');
        const countQuantity = size(
          filter(itemsFinal, function (val) {
            const firstCounting = result(val, 'items.productId', '');
            return firstDataId === firstCounting;
          }),
        );
        const productCodePurchase = result(value, 'items', '');
        const finalReturn = {
          items: productCodePurchase,
          quantity: countQuantity,
        };
        return finalReturn;
      });

      set(storageKeys.CART_CMI, finalOrdercart);
      dispatch(actionCreators.saveCartCMI(itemsFinal));
      Toast.show(language.DIGISTORE__PRODUCT_SUCCESS_TO_CART, Toast.LONG);
    }
  };
}

export function productAlreadyAlfacart() {
  return () => {
    Toast.show(language.DIGISTORE__PRODUCT_ALREADY_TO_CART, Toast.LONG);
  };
}

export function updateDeliveryFee() {
  return dispatch => {
    const dataAlfa = {
      lang: 'en',
      purchaseOrderList: [
        {
          productCode: 'ALFACART-A00010000638',
          quantity: 2,
        },
        {
          productCode: 'ALFACART-A12460003260',
          quantity: 2,
        },
      ],
      method: 1,
    };
    const payload = {
      requestData: dataAlfa,
      targetUrl: 'checkOutFromCartEstore',
      partner: 'ESTOREMANAGER',
      type: 'post',
      auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
    };
    return api
      .checkoutFromCart(payload, dispatch)
      .then(() => {})
      .catch(() => {
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function getProvinceList() {
  return (dispatch, getState) => {
    const state = getState();
    const provinceListReducer = result(state, 'provinceList', []);
    if (isEmpty(provinceListReducer)) {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'province'};
      return api
        .getLocationAlfamart(payload, dispatch)
        .then(res => {
          const provinceList = sortBy(
            result(res, 'data.data.provinsi', []),
            'name',
          );
          dispatch(actionCreators.saveProvinceList(provinceList));
          dispatch(actionCreators.hideSpinner());
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    } else {
      return Promise.resolve();
    }
  };
}

export function getCityList(formName, fieldName) {
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
      return api
        .getLocationAlfamart(payload, dispatch)
        .then(res => {
          const cityList = sortBy(result(res, 'data.data.city', []), 'name');
          dispatch(actionCreators.saveCityList(cityList));
          dispatch(actionCreators.hideSpinner());
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    }
  };
}

export function getDistrictList(formName, fieldName) {
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
      return api
        .getLocationAlfamart(payload, dispatch)
        .then(res => {
          const districtList = sortBy(
            result(res, 'data.data.district', []),
            'name',
          );
          dispatch(actionCreators.saveDistrictList(districtList));
          dispatch(actionCreators.hideSpinner());
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    }
  };
}

export function getSubDistrictList(formName, fieldName) {
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
      return api
        .getLocationAlfamart(payload, dispatch)
        .then(res => {
          const subDistrictList = sortBy(
            result(res, 'data.data.subDistrict', []),
            'name',
          );
          dispatch(actionCreators.saveSubDistrictList(subDistrictList));
          dispatch(actionCreators.hideSpinner());
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    }
  };
}

export function listStoreAlfamartProvince() {
  return (dispatch, getState) => {
    const state = getState();
    const provinceListStoreReducer = result(state, 'provinceListStore', []);
    if (isEmpty(provinceListStoreReducer)) {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'province'};
      return api
        .listStoreAlfamart(payload, dispatch)
        .then(res => {
          const provinceListStore = sortBy(
            result(res, 'data.data.provinsi', []),
            'name',
          );
          dispatch(actionCreators.saveProvinceListStore(provinceListStore));
          dispatch(actionCreators.hideSpinner());
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    } else {
      return Promise.resolve();
    }
  };
}

export function listStoreAlfamartCity(formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
    const form = result(state, 'form', {});
    const formValues = result(form[`${formName}`], 'values', {});
    const code = result(formValues[`${fieldName}`], 'code', '');
    const provinceDetected = result(
      state,
      'form.alfaStoreSearchForm.values.province.name',
      '',
    );

    if (code === '') {
      return Promise.resolve();
    } else {
      dispatch(actionCreators.showSpinner());
      const payload = {mode: 'city', code, province: provinceDetected};
      return api
        .listStoreAlfamart(payload, dispatch)
        .then(res => {
          const cityListStore = sortBy(
            result(res, 'data.data.city', []),
            'name',
          );
          dispatch(actionCreators.saveCityListStore(cityListStore));
          dispatch(actionCreators.hideSpinner());
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    }
  };
}

export function listStoreAlfamartDistrict(formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
    const form = result(state, 'form', {});
    const formValues = result(form[`${formName}`], 'values', {});
    const code = result(formValues[`${fieldName}`], 'code', '');
    const provinceDetected = result(
      state,
      'form.alfaStoreSearchForm.values.province.name',
      '',
    );
    const cityDetected = result(
      state,
      'form.alfaStoreSearchForm.values.city.name',
      '',
    );

    if (code === '') {
      return Promise.resolve();
    } else {
      dispatch(actionCreators.showSpinner());
      const payload = {
        mode: 'district',
        code,
        province: provinceDetected,
        city: cityDetected,
      };
      return api
        .listStoreAlfamart(payload, dispatch)
        .then(res => {
          const districtListStore = sortBy(
            result(res, 'data.data.district', []),
            'name',
          );
          dispatch(actionCreators.saveDistrictListStore(districtListStore));
          dispatch(actionCreators.hideSpinner());
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    }
  };
}

export function listStoreAlfamartSubDistrict(formName, fieldName) {
  return (dispatch, getState) => {
    const state = getState();
    const form = result(state, 'form', {});
    const formValues = result(form[`${formName}`], 'values', {});
    const code = result(formValues[`${fieldName}`], 'code', '');
    const provinceDetected = result(
      state,
      'form.alfaStoreSearchForm.values.province.name',
      '',
    );
    const cityDetected = result(
      state,
      'form.alfaStoreSearchForm.values.city.name',
      '',
    );
    const districtDetected = result(
      state,
      'form.alfaStoreSearchForm.values.district.name',
      '',
    );

    if (code === '') {
      return Promise.resolve();
    } else {
      dispatch(actionCreators.showSpinner());
      const payload = {
        mode: 'subDistrict',
        code,
        province: provinceDetected,
        city: cityDetected,
        district: districtDetected,
      };
      return api
        .listStoreAlfamart(payload, dispatch)
        .then(res => {
          const subDistrictListStore = sortBy(
            result(res, 'data.data.subDistrict', []),
            'name',
          );
          dispatch(
            actionCreators.saveSubDistrictListStore(subDistrictListStore),
          );
          dispatch(actionCreators.hideSpinner());
        })
        .catch(error => {
          dispatch(actionCreators.hideSpinner());
          Toast.show(
            getErrorMessage(error, language.APP_ERROR__TITLE),
            Toast.LONG,
          );
        });
    }
  };
}

export function getVoucherAlfa(amountValue) {
  return (dispatch, getState) => {
    const state = getState();
    const isUsingVoucherUI = result(state, 'isUsingVoucherUI', '0');
    const isLogin = !isEmpty(result(state, 'user', {}));
    const billpayMethodType = isLogin ? null : '1';
    const transRefNum = result(state, 'transRefNum', '');
    const ownership = result(state, 'couponCheck.ownership', '');
    const voucherId = result(state, 'couponCheck.voucherId', '').toString();
    const type = 'billPayment';
    const payloadCouponCheckingValidity = {
      transactionAmount: amountValue,
      transRefNum,
      voucherId,
      type,
      ownership,
      billerCode: '990003',
      billpayMethodType,
    };
    const payloadCoupon = {
      billerCode: '990003',
      type,
      transactionAmount: amountValue,
      billpayMethodType,
    };
    if (isUsingVoucherUI !== '1') {
      dispatch(actionCreators.deleteCoupon());
    }
    if (isUsingVoucherUI !== '1') {
      return api
        .getSuggestVoucher(payloadCoupon, dispatch)
        .then(responseSuggest => {
          const dataRes = result(responseSuggest, 'data.selectedVoucher', {});
          const decideCoupon = result(dataRes, 'voucher.ownership', 'public');
          if (!isEmpty(dataRes)) {
            const amount =
              decideCoupon === 'private'
                ? result(dataRes, 'voucher.amount', '0')
                : result(dataRes, 'amount', '0');
            const voucherId = result(dataRes, 'id', '').toString();
            const modifierType =
              decideCoupon === 'private'
                ? result(dataRes, 'voucher.modifierType', '0')
                : result(dataRes, 'modifierType', '');
            const fixAmount =
              modifierType === 'percent'
                ? amount.toString() + '%'
                : currencyFormatter(amount);
            const endTimehour =
              decideCoupon === 'private'
                ? result(dataRes, 'voucher.endTime', '0')
                    .toString()
                    .substring(0, 2)
                : result(dataRes, 'endTime', '').toString().substring(0, 2);
            const endTimemin =
              decideCoupon === 'private'
                ? result(dataRes, 'voucher.endTime', '0')
                    .toString()
                    .substring(2, 4)
                : result(dataRes, 'endTime', '').toString().substring(2, 4);
            const decideStartTimeHour =
              decideCoupon === 'private'
                ? result(dataRes, 'voucher.startTime', '0').toString()
                : result(dataRes, 'startTime', '').toString();
            const startTimehour =
              decideStartTimeHour === '0'
                ? '00'
                : decideStartTimeHour.substring(0, 2);
            const startTimemin =
              decideStartTimeHour === '0'
                ? '00'
                : decideStartTimeHour.substring(2, 4);
            const endTimeMod = endTimehour + ':' + endTimemin;
            const startTimeMod = startTimehour + ':' + startTimemin;
            const custAmount =
              language.GENERIC__TITLE_COUPON +
              ' ' +
              fixAmount +
              ' ' +
              language.GENERIC__SIMAS_POIN;
            const ownership =
              decideCoupon === 'private'
                ? result(dataRes, 'voucher.ownership', '0')
                : result(dataRes, 'ownership', '');
            const endDatesub =
              decideCoupon === 'private'
                ? result(dataRes, 'expiredDateString', '0')
                : result(dataRes, 'endDateString', 0).toString();
            const startDatesub =
              decideCoupon === 'private'
                ? result(dataRes, 'createdDateString', '0')
                : result(dataRes, 'startDateString', 0).toString();
            const subendDate = moment(endDatesub).format('YYYY/MM/DD');
            const subnewDate = moment(startDatesub).format('YYYY/MM/DD');
            const custPoin = fixAmount;
            dispatch(
              actionCreators.saveCoupon({
                voucherId,
                description: custAmount,
                ownership,
                subnewDate,
                subendDate,
                endTimeMod,
                startTimeMod,
                custPoin,
              }),
            );
          }
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.deleteUsingCouponUI());
        })
        .catch(() => {});
    } else {
      return api
        .checkVoucherValidity(payloadCouponCheckingValidity, dispatch)
        .then(res => {
          const responseCode = result(res, 'data.responseCode', '');
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.deleteUsingCouponUI());
          if (responseCode === '00') {
            dispatch(actionCreators.hideSpinner());
          } else {
            dispatch(actionCreators.deleteCoupon());
            dispatch(actionCreators.hideSpinner());
          }
        })
        .catch(() => {
          dispatch(actionCreators.deleteCoupon());
          dispatch(actionCreators.hideSpinner());
          dispatch(actionCreators.deleteUsingCouponUI());
        });
    }
  };
}

export function triggerAuthBillpayAlfa(
  currentAmount,
  triggerAuthData,
  isSyariah,
) {
  return (dispatch, getState) => {
    const state = getState();
    const couponUse = result(state, 'couponCheck.description', '');
    const timeEndCoupon = result(state, 'couponCheck.endTimeMod', '');
    const timeStartCoupon = result(state, 'couponCheck.startTimeMod', '');
    const dateEndCoupon = result(state, 'couponCheck.subendDate', '');
    const dateStartCoupon = result(state, 'couponCheck.subnewDate', '');
    const usingFromLine = result(state, 'couponCheck.usingFromLine', '0');
    const minAmount = result(state, 'couponCheck.minAmount', 0);
    const maxAmount = result(state, 'couponCheck.maxAmount', 0);
    const now = new Date();
    const nowTimeDate = moment(now).format('YYYY/MM/DD');
    const nowTime = moment(now).format('YYYY/MM/DD H:mm');
    const timeDateEnded = dateEndCoupon + ' ' + timeEndCoupon;
    const timeDateStarted = dateStartCoupon + ' ' + timeStartCoupon;
    const diffDateStart = moment(nowTime).diff(moment(timeDateStarted));
    const diffDateEnd = moment(nowTime).diff(moment(timeDateEnded));
    const gapTimeServer = result(state, 'gapTimeServer');
    const gapTimeStart =
      Math.round(moment.duration(diffDateStart).asSeconds()) - gapTimeServer;
    const gapTimeEnd =
      Math.round(moment.duration(diffDateEnd).asSeconds()) - gapTimeServer;

    const timeDateEndedElse = nowTimeDate + ' ' + timeEndCoupon;
    const timeDateStartedElse = nowTimeDate + ' ' + timeStartCoupon;
    const diffDateStartElse = moment(nowTime).diff(moment(timeDateStartedElse));
    const diffDateEndElse = moment(nowTime).diff(moment(timeDateEndedElse));
    const gapTimeStartElse =
      Math.round(moment.duration(diffDateStartElse).asSeconds()) -
      gapTimeServer;
    const gapTimeEndElse =
      Math.round(moment.duration(diffDateEndElse).asSeconds()) - gapTimeServer;
    if (!isSyariah) {
      if (couponUse !== '') {
        if (timeEndCoupon === '23:59' && timeStartCoupon === '00:00') {
          if (gapTimeStart > 0 && gapTimeEnd < 0) {
            if (usingFromLine === '1') {
              if (
                (currentAmount > minAmount && currentAmount < maxAmount) ||
                (currentAmount > minAmount && maxAmount === 0)
              ) {
                triggerAuthData();
              } else {
                Toast.show(language.GENERIC__AMOUNT_INSUFFICIENT, Toast.LONG);
              }
            } else {
              triggerAuthData();
            }
          } else {
            Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
          }
        } else {
          if (gapTimeStart > 0 && gapTimeEnd < 0) {
            if (gapTimeStartElse > 0 && gapTimeEndElse < 0) {
              if (usingFromLine === '1') {
                if (
                  (currentAmount > minAmount && currentAmount < maxAmount) ||
                  (currentAmount > minAmount && maxAmount === 0)
                ) {
                  triggerAuthData();
                } else {
                  Toast.show(language.GENERIC__AMOUNT_INSUFFICIENT, Toast.LONG);
                }
              } else {
                triggerAuthData();
              }
            } else {
              Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
            }
          } else {
            Toast.show(language.GENERIC__CANT_USE_COUPON, Toast.LONG);
          }
        }
      } else {
        triggerAuthData();
      }
    } else {
      Toast.show(
        language.ERROR_MESSAGE_FOR_SYARIAHSAVING_WITH_COUPON,
        Toast.LONG,
      );
    }
  };
}

export function goToMerchantStore(merchantCode) {
  return dispatch => {
    if (merchantCode === 'ALFACART') {
      dispatch(shouldGiveChecklist());
    } else if (merchantCode === 'CMI') {
      dispatch(listAllProductAlfacart(merchantCode));
    } else if (merchantCode === 'KOPERASI') {
      dispatch(listCategoryProductKoperasi(merchantCode));
    } else if (merchantCode === 'ORAMI') {
      dispatch(listAllProductAlfacart(merchantCode));
    }
  };
}

export function getMerchantId(merchantCode) {
  const payload = {
    lang: 'en',
    requestData: {
      merchantCode,
    },
    targetUrl: 'getIdMerchantEstore',
    partner: 'ESTOREMANAGER',
    type: 'post',
    auth: 'PNVflf0aqzaoIVeb03Frc3MXtCsfKEkzZRBS4b2enrRIJHeTCtis00UaoTs2Vm6EVqlZFuRAxWjkwX4veSWL4pavfq7BdjXANzr16hrKRPpa/mKGHRsl2h6Yw93NQmbDeQotn/6dHlkd3Olqiw4vSFO5U/xZ0N82CKbKo85Mz4nP57nUZTSPQZf+HgqXanFBPHTdWN1Las8xpUDFwe5F6AeFXCv30klHuCJXzDDVVk0/KiXUYttm42Xe3EGGNfAJd4tF7cgbDCs6iMu5hLky/yH0Q4P2UTtxn7GroznL4Khrqi0rAjD+8VEwkiFd+YNxWSpBpbEy+qXP36PwlPIfSQ==',
  };

  return dispatch =>
    api.getMerchantId(payload, dispatch).then(res => {
      const merchantId = result(res, 'data.result.merchantId', '1');
      const payload = {
        id: merchantId,
        name: merchantCode,
      };
      dispatch(actionCreators.setCurrentMerchant(payload));
    });
}

export function selectAddressShippingCMI() {
  return dispatch => {
    dispatch(NavigationActions.back());
  };
}

export function getCheckListCMIConfirm() {
  return (dispatch, getState) => {
    const state = getState();
    const items = result(state, 'cartCMI', []);
    const itemsSelection = result(state, 'confirmCheckoutAlfaProduct', []);
    const itemsSize = size(items);
    const itemsSelectionSize = size(itemsSelection);
    if (itemsSize > itemsSelectionSize) {
      dispatch(actionCreators.confrimCheckoutAlfa(items));
    } else {
      dispatch(actionCreators.clearConfirmCheckoutAlfa(items));
    }
  };
}

export function getConfirmProductCMI(product) {
  return (dispatch, getState) => {
    const state = getState();
    const code = result(product, 'productId', '');
    const items = result(state, 'cartCMI', []);
    const itemsSelection = result(state, 'confirmCheckoutAlfaProduct', []);
    const filterProductExist = size(
      filter(itemsSelection, function (o) {
        return o.items.productId === code;
      }),
    );
    let confirmDataProduct = [];
    if (filterProductExist > 0) {
      const filterProductNonTarget = filter(itemsSelection, function (o) {
        return o.items.productId !== code;
      });
      confirmDataProduct = [...filterProductNonTarget];
    } else {
      const filterProductTarget = filter(items, function (o) {
        return o.items.productId === code;
      });
      confirmDataProduct = [...filterProductTarget, ...itemsSelection];
    }
    dispatch(actionCreators.confrimCheckoutAlfa(confirmDataProduct));
  };
}

export function shouldGiveChecklistSimasCatalog(
  isFromTnc = false,
  navigation = {},
) {
  return (dispatch, getState) => {
    const state = getState();
    const feedbackChecklist = false;
    const isLockedDevice = Boolean(
      state.appInitKeys &&
        state.appInitKeys.username &&
        state.appInitKeys.tokenClient &&
        state.appInitKeys.tokenServer,
    );
    const cif = result(state, 'user.profile.customer.cifCode', '');
    const navKey = result(navigation, 'state.key', ''); // key of tnc page to be replaced
    let adjustEvent;

    return get(storageKeys.FEEDBACK_CHECKLIST_CATALOG).then(storedFeedBack => {
      if (feedbackChecklist !== storedFeedBack && isLockedDevice === true) {
        dispatch(NavigationActions.navigate({routeName: 'UltraVoucherTnc'}));
      } else {
        // event adjust tracking UV
        if (Platform.OS === 'android') {
          adjustEvent = new adjustAndroid.AdjustEvent('m2wd5a');
          adjustEvent.addCallbackParameter('page_id', 'tr-uv-1-1');
          adjustEvent.addCallbackParameter('cif', cif);
          adjustAndroid.Adjust.trackEvent(adjustEvent);
        }
        dispatch(generateJwt()).then(res => {
          const jwt = result(res, 'jwt', '');
          if (!isEmpty(jwt)) {
            if (!isEmpty(navKey) && isFromTnc) {
              dispatch(
                NavigationActions.replace({
                  key: navKey,
                  routeName: 'UltraVoucherWebView',
                  params: {jwt: jwt},
                }),
              );
            } else {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'UltraVoucherWebView',
                  params: {jwt: jwt},
                }),
              );
            }
          }
        });
      }
      return shouldGiveChecklistSimasCatalog;
    });
  };
}

export function checklistUnipin(isFromTnc = false, navigation = {}) {
  return (dispatch, getState) => {
    const state = getState();
    const checklist = false;
    const isLockedDevice = Boolean(
      state.appInitKeys &&
        state.appInitKeys.username &&
        state.appInitKeys.tokenClient &&
        state.appInitKeys.tokenServer,
    );
    const navKey = result(navigation, 'state.key', ''); // key of tnc page to be replaced
    return get(storageKeys.TNC_UNIPIN).then(storedChecklist => {
      if (checklist !== storedChecklist && isLockedDevice === true) {
        dispatch(NavigationActions.navigate({routeName: 'UnipinTnc'}));
      } else {
        dispatch(generateJwt()).then(res => {
          const jwt = result(res, 'jwt', '');
          const merchant = 'UNIPIN';
          if (!isEmpty(jwt)) {
            if (!isEmpty(navKey) && isFromTnc) {
              dispatch(
                NavigationActions.replace({
                  key: navKey,
                  routeName: 'UltraVoucherWebView',
                  params: {jwt: jwt, merchant: merchant},
                }),
              );
            } else {
              dispatch(
                NavigationActions.navigate({
                  routeName: 'UltraVoucherWebView',
                  params: {jwt: jwt, merchant: merchant},
                }),
              );
            }
          }
        });
      }
    });
  };
}

export function accessLocation() {
  return dispatch => {
    get(storageKeys.SIMAS_CATALOG_LOCATION).then(res => {
      const locationStorage = res;
      if (locationStorage !== null && locationStorage !== undefined) {
        dispatch(actionCreators.saveSimasCatalogLocation(locationStorage));
      } else {
        let permissionDevice = 'no';
        if (Platform.OS === 'android') {
          dispatch(actionCreators.hideSinarmasAlert());
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          )
            .then(status => {
              if (status === 'granted') {
                permissionDevice = 'yes';
                Geolocation.getCurrentPosition(
                  info => {
                    const lat = result(info, 'coords.latitude', '0').toString();
                    const long = result(
                      info,
                      'coords.longitude',
                      '0',
                    ).toString();
                    dispatch(
                      actionCreators.saveSimasCatalogLocation({
                        lat,
                        long,
                        permissionDevice,
                      }),
                    );
                    set(storageKeys.SIMAS_CATALOG_LOCATION, {
                      lat,
                      long,
                      permissionDevice,
                    });
                  },
                  () => {
                    dispatch(actionCreators.hideSpinner());
                  },
                  {enableHighAccuracy: false, timeout: 3000, maximumAge: 1000},
                );
              } else {
                return Promise.resolve();
              }
            })
            .catch(() => Promise.resolve());
        } else {
          dispatch(actionCreators.hideSinarmasAlert());
          Permissions.request('ios.permission.LOCATION_ALWAYS').then(
            response => {
              if (response === 'granted') {
                permissionDevice = 'yes';
                Geolocation.getCurrentPosition(
                  info => {
                    const lat = result(info, 'coords.latitude', '0').toString();
                    const long = result(
                      info,
                      'coords.longitude',
                      '0',
                    ).toString();
                    dispatch(
                      actionCreators.saveSimasCatalogLocation({
                        lat,
                        long,
                        permissionDevice,
                      }),
                    );
                    set(storageKeys.SIMAS_CATALOG_LOCATION, {
                      lat,
                      long,
                      permissionDevice,
                    });
                  },
                  () => {
                    dispatch(actionCreators.hideSpinner());
                  },
                  {enableHighAccuracy: false, timeout: 3000, maximumAge: 1000},
                );
              } else {
                return Promise.resolve();
              }
            },
          );
        }
      }
    });
  };
}

export function getPermissionLocationAccess() {
  return (dispatch, getState) => {
    const state = getState();
    const geolocationSimasCatalog = result(state, 'geolocationSimasCatalog');
    if (isEmpty(geolocationSimasCatalog)) {
      get(storageKeys.SIMAS_CATALOG_LOCATION).then(res => {
        const locationStorage = res;
        if (locationStorage !== null && locationStorage !== undefined) {
          dispatch(actionCreators.saveSimasCatalogLocation(locationStorage));
        } else {
          if (Platform.OS === 'android') {
            dispatch(actionCreators.hideSinarmasAlert());
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
              .then(status => {
                if (status === 'granted') {
                  accessLocation();
                } else {
                  return Promise.resolve();
                }
              })
              .catch(() => Promise.resolve());
          } else {
            dispatch(actionCreators.hideSinarmasAlert());
            Permissions.request('ios.permission.LOCATION_ALWAYS').then(
              response => {
                if (response === 'granted') {
                  accessLocation();
                } else {
                  return Promise.resolve();
                }
              },
            );
          }
        }
      });
    }
  };
}

export function gotoOrderHistorySimasCatalog(merchant) {
  return (dispatch, getState) => {
    const state = getState();
    const cif = result(state, 'user.profile.customer.cifCode', '');
    let adjustEvent;
    const merchantCode = (merchant === 'Alfamart' ? 'ALFACART' : merchant)
      .replace(/ /g, '')
      .toUpperCase();
    // event adjust tracking UV
    if (Platform.OS === 'android') {
      adjustEvent = new adjustAndroid.AdjustEvent('m2wd5a');
      adjustEvent.addCallbackParameter('page_id', 'tr-uv-1-1');
      adjustEvent.addCallbackParameter('cif', cif);
      adjustAndroid.Adjust.trackEvent(adjustEvent);
    }
    dispatch(generateJwt()).then(res => {
      const jwt = result(res, 'jwt', '');
      if (!isEmpty(jwt)) {
        dispatch(
          NavigationActions.navigate({
            routeName: 'UltraVoucherWebView',
            params: {jwt: jwt, isOrderHistory: true, merchant: merchantCode},
          }),
        );
      }
    });
  };
}
