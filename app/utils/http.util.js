import {SERVER_URL, endpoints, CAPTCHA_URL, QR_URL, URLV3, URLV4, URLEFORMCENTRAL, URLQR, URLESTORE, URLV1, URLALFACART} from '../config/api.config';
import axios from 'axios';
import {getStatusValidatorInterceptor, mockInterceptor, addDefaultPayloadInterceptor, demoAccountInterceptor, getNoNetWorkInterceptor, removeFalsyValues, addDefaultPayloadInterceptorFetch, removeNull} from './interceptors.util';
import {setAppTimeout, cleanAppState} from '../state/actions/index.actions';
import {noop, startsWith, isEmpty} from 'lodash';
import result from 'lodash/result';
import {getStateDefault} from '../state/thunks/common.thunks';
import {NativeModules, Platform} from 'react-native';
import {fetch} from 'react-native-ssl-pinning';
import {ENV} from '../config/env.config';


export const getStatusValidatorInterceptorFetch = (response, responseSSL, dispatch) => {
  if (response.status >= 200 && response.status < 300) {
    return responseSSL;
  }
  if (response.status === 401) {
    dispatch(cleanAppState());
  }
  throw responseSSL;
};

export const commonRequestResponseGetPrivate = (config, endpoint, dispatch = noop, dataGet) => {
  if (ENV === 'production') {
    const config = {
      headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'},
      timeoutInterval: 150000,
      method: 'GET',
      pkPinning: Platform.OS !== 'android',
      sslPinning: {
        certs: ['star_simas', 'digi_cert', 'star_simas_exp', 'digi_cert_exp']
      },
    };
    const dash = startsWith(endpoints[endpoint], '/') ? '' : '/';
    const url = SERVER_URL + dash + endpoints[endpoint] + dataGet;
    return fetch(url, config).then((response) => {
      const resdata = result(response, 'bodyString');
      const isHtml = startsWith(resdata, '<html>');
      const responseSSL = {
        data: isHtml ? resdata : JSON.parse(resdata)
      };
      const apires = getStatusValidatorInterceptorFetch(response, responseSSL, dispatch);
      return apires;
    }).catch((err) => {
      const errSSL = {
        data: JSON.parse(result(err, 'bodyString'))
      };
      throw errSSL;
    });
  } else {
    return axios(config);
  }
};

export const commonRequestResponseGet = (config, endpoint, dispatch = noop) => {
  if (ENV === 'production') {
    const config = {
      headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'},
      timeoutInterval: 150000,
      method: 'GET',
      pkPinning: Platform.OS !== 'android',
      sslPinning: {
        certs: ['star_simas', 'digi_cert', 'star_simas_exp', 'digi_cert_exp']
      },
    };
    const dash = startsWith(endpoints[endpoint], '/') ? '' : '/';
    const url = SERVER_URL + dash + endpoints[endpoint];
    return fetch(url, config).then((response) => {
      const resdata = result(response, 'bodyString');
      const isHtml = startsWith(resdata, '<html>');
      const responseSSL = {
        data: isHtml ? resdata : JSON.parse(resdata)
      };
      const apires = getStatusValidatorInterceptorFetch(response, responseSSL, dispatch);
      return apires;
    }).catch((err) => {
      const errSSL = {
        data: JSON.parse(result(err, 'bodyString'))
      };
      throw errSSL;
    });
  } else {
    return axios(config);
  }
};

export const commonRequestResponseGetPost = (config, endpoint, data, options, dispatch = noop, storeCurrent, configURL) => {
  const isCheckVersion = endpoint === 'VERSION_CHECK';
  const finalData = removeNull(data);
  if (isCheckVersion) {
    return axios(config);
  } else {
    if (ENV === 'production') {
      const additional = removeNull(addDefaultPayloadInterceptorFetch(storeCurrent, options));
      const config = {
        headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'},
        timeoutInterval: 150000,
        method: 'POST',
        body: JSON.stringify({...finalData, ...additional}),
        pkPinning: Platform.OS !== 'android',
        sslPinning: {
          certs: ['star_simas', 'digi_cert', 'star_simas_exp', 'digi_cert_exp']
        },
      };
      const dash = startsWith(endpoints[endpoint], '/') ? '' : '/';
      const checkUrl = configURL === 'POST_V4' ? URLV4 : configURL === 'EFORM_CENTRAL' ? URLEFORMCENTRAL : configURL === 'CAPTCHA' ? CAPTCHA_URL : SERVER_URL;
      const url = checkUrl + dash + endpoints[endpoint];
      return fetch(url, config).then((response) => {
        const resdata = result(response, 'bodyString');
        const isHtml = startsWith(resdata, '<html>');
        const responseSSL = {
          data: isHtml ? resdata : JSON.parse(resdata)
        };
        const apires = getStatusValidatorInterceptorFetch(response, responseSSL, dispatch);
        return apires;
      }).catch((err) => {
        const errSSL = {
          data: JSON.parse(result(err, 'bodyString'))
        };
        throw errSSL;
      });

    } else {
      return axios(config);
    }
  }

};

const baseConfig = {
  baseURL: SERVER_URL,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  params: {},
  timeout: 150000, // 60 seconds. for UAT TESTING
  withCredentials: true,
  validateStatus: () => true,
  cancelToken: null,
  // onDownloadProgress: () => {}, // Left this as a reference incase we need it
};

const baseConfigQrPayment = {
  baseURL: SERVER_URL,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  params: {},
  timeout: 150000, // 150 seconds. for UAT TESTING
  withCredentials: true,
  validateStatus: () => true,
  cancelToken: null,
  // onDownloadProgress: () => {}, // Left this as a reference incase we need it
};

const baseConfigCaptcha = {
  baseURL: CAPTCHA_URL,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  params: {},
  timeout: 150000, // 150 seconds. for UAT TESTING
  withCredentials: true,
  validateStatus: () => true,
  cancelToken: null,
  // onDownloadProgress: () => {}, // Left this as a reference incase we need it
};

const baseConfigQr = {
  baseURL: QR_URL,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  params: {},
  timeout: 150000, // 150 seconds. for UAT TESTING
  withCredentials: true,
  validateStatus: () => true,
  cancelToken: null,
  // onDownloadProgress: () => {}, // Left this as a reference incase we need it
};

const baseConfigV4 = {
  baseURL: URLV4,
  headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'},
  params: {},
  timeout: 150000, // 60 seconds. for UAT TESTING
  withCredentials: true,
  validateStatus: () => true,
  cancelToken: null,
  // onDownloadProgress: () => {}, // Left this as a reference incase we need it
};

const baseConfigV3 = {
  baseURL: URLV3,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  params: {},
  timeout: 150000, // 60 seconds. for UAT TESTING
  withCredentials: true,
  validateStatus: () => true,
  cancelToken: null,
  // onDownloadProgress: () => {}, // Left this as a reference incase we need it
};

const baseConfigFace = {
  baseURL: SERVER_URL,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  params: {},
  timeout: 20000, // 60 seconds. for UAT TESTING
  withCredentials: true,
  validateStatus: () => true,
  cancelToken: null,
  // onDownloadProgress: () => {}, // Left this as a reference incase we need it
};
// To create a cancel Token
// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();
// http.get('/test', {cancelToken: source.token});
// for http.post('/test',body, {cancelToken: source.token});
// source.cancel('Operation canceled by the user.');

const baseConfigEFormCentral = {
  baseURL: URLEFORMCENTRAL,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  params: {},
  timeout: 150000, // 60 seconds. for UAT TESTING
  withCredentials: true,
  validateStatus: () => true,
  cancelToken: null,
  // onDownloadProgress: () => {}, // Left this as a reference incase we need it
};

const baseConfigCGVPayment = {
  baseURL: SERVER_URL,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  params: {},
  timeout: 90000, // 150 seconds. for UAT TESTING
  withCredentials: true,
  validateStatus: () => true,
  cancelToken: null,
  // onDownloadProgress: () => {}, // Left this as a reference incase we need it
};

const baseConfigNewQrUrl = {
  baseURL: URLQR,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  params: {},
  timeout: 150000, // 150 seconds. for UAT TESTING
  withCredentials: true,
  validateStatus: () => true,
  cancelToken: null
  // onDownloadProgress: () => {}, // Left this as a reference incase we need it
};

const baseConfigEStore = {
  baseURL: URLESTORE,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  params: {},
  timeout: 150000, // 60 seconds. for UAT TESTING
  withCredentials: true,
  validateStatus: () => true,
  cancelToken: null,
  // onDownloadProgress: () => {}, // Left this as a reference incase we need it
};

const baseConfigV1 = {
  baseURL: URLV1,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  params: {},
  timeout: 60000, // 60 seconds. for UAT TESTING
  withCredentials: true,
  validateStatus: () => true,
  cancelToken: null,
  // onDownloadProgress: () => {}, // Left this as a reference incase we need it
};

const baseConfigURLALFA = {
  baseURL: URLALFACART,
  headers: {'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Basic YWRtaW46MTIzNDU2Nzg='},
  params: {},
  timeout: 150000, // 60 seconds. for UAT TESTING
  withCredentials: true,
  validateStatus: () => true,
  cancelToken: null,
  // onDownloadProgress: () => {}, // Left this as a reference incase we need it
};

export function get (endpoint, options = {}, dispatch = noop, mustProtectedUrl = false) {
  const config = {
    ...baseConfig,
    ...options,
    method: 'get',
    endpoint,
    url: endpoints[endpoint]
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  const protectedUrl = result(config, 'baseURL', '') + result(config, 'url', '');
  if (mustProtectedUrl) {
    const headerApiGuard = NativeModules.APIGuard.getRequestHeaders(protectedUrl);
    if (headerApiGuard !== null || headerApiGuard !== '') {
      const config = {
        headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...headerApiGuard},
        timeoutInterval: 150000,
        method: 'GET',
        pkPinning: Platform.OS !== 'android',
        sslPinning: {
          certs: ['star_simas', 'digi_cert', 'star_simas_exp', 'digi_cert_exp']
        },
      };
      const dash = startsWith(endpoints[endpoint], '/') ? '' : '/';
      const url = SERVER_URL + dash + endpoints[endpoint];
      return fetch(url, config).then((response) => {
        const resdata = result(response, 'bodyString');
        const isHtml = startsWith(resdata, '<html>');
        const responseSSL = {
          data: isHtml ? resdata : JSON.parse(resdata)
        };
        NativeModules.APIGuard.parseResponseHeaders(response.headers);
        if (response.status >= 200 && response.status < 300) {
          return responseSSL;
        }
        if (response.status === 401) {
          dispatch(cleanAppState());
        }
        throw responseSSL;
      }).catch((errorResponse) => {
        NativeModules.APIGuard.parseResponseHeaders(errorResponse.headers);
        const {status} = errorResponse;
        if (status >= 200 && status < 300) {
          return errorResponse;
        }
        if (status === 401) {
          dispatch(cleanAppState());
        }
        throw errorResponse;
      });
    } else {
      return commonRequestResponseGet(config, endpoint, dispatch);
    }
  } else {
    return commonRequestResponseGet(config, endpoint, dispatch);
  }
}

export const getPrivate = (endpoint, dataGet = '', options, dispatch = noop) => {
  const config = {
    ...baseConfig,
    ...options,
    method: 'get',
    endpoint,
    url: endpoints[endpoint] + dataGet
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  return commonRequestResponseGetPrivate(config, endpoint, dispatch, dataGet);
};

export const post = (endpoint, data = {}, options = {}, dispatch = noop, mustProtectedUrl = false) => {
  const config = {
    ...baseConfig,
    ...options,
    method: 'post',
    endpoint,
    url: endpoints[endpoint],
    data
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  const excludeReset = endpoint === 'GET_BALANCE_EMONEY' || endpoint === 'GET_BALANCE_EMONEY_LANDING';
  if (!excludeReset) {
    dispatch(setAppTimeout(apptimeOut));
  }
  const protectedUrl = result(config, 'baseURL', '') + result(config, 'url', '');
  if (mustProtectedUrl) {
    const headerApiGuard = NativeModules.APIGuard.getRequestHeaders(protectedUrl);
    if (headerApiGuard !== null || headerApiGuard !== '') {
      const additional = addDefaultPayloadInterceptorFetch(storeCurrent, options);
      const finalData = removeNull(data);
      const config = {
        headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', ...headerApiGuard},
        timeoutInterval: 150000,
        method: 'POST',
        body: JSON.stringify({...finalData, ...additional}),
        pkPinning: Platform.OS !== 'android',
        sslPinning: {
          certs: ['star_simas', 'digi_cert', 'star_simas_exp', 'digi_cert_exp']
        },
      };
      const dash = startsWith(endpoints[endpoint], '/') ? '' : '/';
      const url = SERVER_URL + dash + endpoints[endpoint];
      return fetch(url, config).then((response) => {
        const resdata = result(response, 'bodyString');
        const isHtml = startsWith(resdata, '<html>');
        const responseSSL = {
          data: isHtml ? resdata : JSON.parse(resdata)
        };
        NativeModules.APIGuard.parseResponseHeaders(response.headers);
        if (response.status >= 200 && response.status < 300) {
          return responseSSL;
        }
        if (response.status === 401) {
          dispatch(cleanAppState());
        }
        throw responseSSL;
      }).catch((errorResponse) => {
        const headers = result(errorResponse, 'headers', '');
        if (headers !== '') {
          NativeModules.APIGuard.parseResponseHeaders(errorResponse.headers);
        }
        const {status} = errorResponse;
        if (status >= 200 && status < 300) {
          return errorResponse;
        }
        const errData = result(errorResponse, 'bodyString', {});
        const errSSL = {
          data: isEmpty(errData) ? {} : JSON.parse(errData),
          status: status
        };
        if (status === 401) {
          dispatch(cleanAppState());
        }
        throw errSSL ? errSSL : errorResponse;
      });
    } else {
      return commonRequestResponseGetPost(config, endpoint, data, options, dispatch = noop, storeCurrent);
    }
  } else {
    return commonRequestResponseGetPost(config, endpoint, data, options, dispatch = noop, storeCurrent);
  }
};

export const postForQrPayment = (endpoint, data = {}, options = {}, dispatch = noop) => {
  const config = {
    ...baseConfigQrPayment,
    ...options,
    method: 'post',
    endpoint,
    url: endpoints[endpoint],
    data
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  return commonRequestResponseGetPost(config, endpoint, data, options, dispatch = noop, storeCurrent);
};

export const getForQR = (endpoint, data = '', options = {}, dispatch = noop) => {
  const config = {
    ...baseConfigQr,
    ...options,
    method: 'get',
    endpoint,
    url: endpoints[endpoint] + data
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  return commonRequestResponseGet(config, endpoint, dispatch);
};

export const postForCaptcha = (endpoint, data = {}, options = {}, dispatch = noop) => {
  const config = {
    ...baseConfigCaptcha,
    ...options,
    method: 'post',
    endpoint,
    url: endpoints[endpoint],
    data
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  const configURL = 'CAPTCHA';
  return commonRequestResponseGetPost(config, endpoint, data, options, dispatch = noop, storeCurrent, configURL);
};

export const postV4 = (endpoint, data = {}, options = {},  dispatch = noop) => {
  const config = {
    ...baseConfigV4,
    ...options,
    method: 'post',
    endpoint,
    url: endpoints[endpoint],
    data
  };
  const excludeReset = endpoint === 'INQUIRY_SIMAS_POIN';
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  if (!excludeReset) {
    dispatch(setAppTimeout(apptimeOut));
  }
  const configURL = 'POST_V4';
  return commonRequestResponseGetPost(config, endpoint, data, options, dispatch = noop, storeCurrent, configURL);
};

export const postEFormCentral = (endpoint, data = {}, options = {},  dispatch = noop,) => {
  const config = {
    ...baseConfigEFormCentral,
    ...options,
    method: 'post',
    endpoint,
    url: endpoints[endpoint],
    data
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  const configURL = 'EFORM_CENTRAL';
  return commonRequestResponseGetPost(config, endpoint, data, options, dispatch = noop, configURL);
};

export const postFace = (endpoint, data = {}, options = {},  dispatch = noop) => {
  const config = {
    ...baseConfigFace,
    ...options,
    method: 'post',
    endpoint,
    url: endpoints[endpoint],
    data
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  return commonRequestResponseGetPost(config, endpoint, data, options, dispatch = noop);
};

export const postCGVPayment = (endpoint, data = {}, options = {},  dispatch = noop) => {
  const config = {
    ...baseConfigCGVPayment,
    ...options,
    method: 'post',
    endpoint,
    url: endpoints[endpoint],
    data
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  return commonRequestResponseGetPost(config, endpoint, data, options, dispatch = noop);
};

export const postNewQr = (endpoint, data = {}, options = {}, dispatch = noop) => {
  const config = {
    ...baseConfigNewQrUrl,
    ...options,
    method: 'post',
    endpoint,
    url: endpoints[endpoint],
    data
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  return commonRequestResponseGetPost(config, endpoint, data, options, dispatch = noop);
};

export const postEStore = (endpoint, data = {}, options = {},  dispatch = noop) => {
  const config = {
    ...baseConfigEStore,
    ...options,
    method: 'post',
    endpoint,
    url: endpoints[endpoint],
    data
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  return commonRequestResponseGetPost(config, endpoint, data, options, dispatch = noop);
};

export const getEStore = (endpoint, options = {}, dispatch = noop) => {
  const config = {
    ...baseConfigEStore,
    ...options,
    method: 'get',
    endpoint,
    url: endpoints[endpoint]
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  return commonRequestResponseGet(config, endpoint, dispatch);
};

export const postV1 = (endpoint, data = {}, options = {},  dispatch = noop) => {
  const config = {
    ...baseConfigV1,
    ...options,
    method: 'post',
    endpoint,
    url: endpoints[endpoint],
    data
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  return commonRequestResponseGetPost(config, endpoint, data, options, dispatch = noop);
};

export const postALFACART = (endpoint, data = {}, options = {},  dispatch = noop) => {
  const config = {
    ...baseConfigURLALFA,
    ...options,
    method: 'post',
    endpoint,
    url: endpoints[endpoint],
    data
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  return commonRequestResponseGetPost(config, endpoint, data, options, dispatch = noop);
};


export const getV1 = (endpoint, options = {}, dispatch = noop) => {
  const config = {
    ...baseConfigV1,
    ...options,
    method: 'get',
    endpoint,
    url: endpoints[endpoint]
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  return commonRequestResponseGet(config, endpoint, dispatch);
};

export const postV3 = (endpoint, data = {}, options = {},  dispatch = noop) => {
  const config = {
    ...baseConfigV3,
    ...options,
    method: 'post',
    endpoint,
    url: endpoints[endpoint],
    data
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  return commonRequestResponseGetPost(config, endpoint, data, options, dispatch = noop);
};

export const getV3 = (endpoint, options = {}, dispatch = noop) => {
  const config = {
    ...baseConfigV3,
    ...options,
    method: 'get',
    endpoint,
    url: endpoints[endpoint]
  };
  const storeCurrent = dispatch(getStateDefault());
  const apptimeOut = result(storeCurrent, 'timeoutReducer', 300);
  dispatch(setAppTimeout(apptimeOut));
  return commonRequestResponseGet(config, endpoint, dispatch);
};


// Registering interceptors
export const initializeHTTPInterceptors = (store) => {
  // REQUEST INTERCEPTORS
  axios.interceptors.request.use(mockInterceptor, Promise.reject);
  axios.interceptors.request.use(getNoNetWorkInterceptor(store), Promise.reject);
  axios.interceptors.request.use(demoAccountInterceptor, Promise.reject);
  axios.interceptors.request.use(addDefaultPayloadInterceptor(store), Promise.reject);
  axios.interceptors.request.use(removeFalsyValues, Promise.reject);
  // RESPONSE INTERCEPTORS
  axios.interceptors.response.use(getStatusValidatorInterceptor(store), Promise.reject);
};

module.exports = {
  get,
  post,
  postForQrPayment,
  getForQR,
  postV3,
  postV4,
  postForCaptcha,
  postEFormCentral,
  postFace,
  postCGVPayment,
  initializeHTTPInterceptors,
  postV1,
  getPrivate,
  postALFACART
};
