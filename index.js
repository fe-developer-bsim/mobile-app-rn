/* eslint-disable */
/* global GLOBAL */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Fragment} from 'react';
import {AppRegistry} from 'react-native';
import {wrapObjectInFunction} from './app/utils/transformer.util';
import {Provider} from 'react-redux';
import {initStore} from './app/state/store';
import {initializeHTTPInterceptors} from './app/utils/http.util';
import App from './app/App.container';
import {setJSExceptionHandler} from 'react-native-exception-handler';
import errorHandler from './app/utils/errorHandler.util';
import Pushwoosh from 'pushwoosh-react-native-plugin';
import {pushWooshAppConstants, ENV} from './app/config/env.config';
import {initLanguage} from './app/config/language';

const store = initStore();
setJSExceptionHandler(errorHandler);
initializeHTTPInterceptors(store);
initLanguage();

// ===========================================
// CONFIG FOR MAKING NETWORK REQUEST SHOW UP
// ON DEBUGGER
// !!! DELETE ON PRODUCTION BUILD FOR CERTIFICATE PINNING TO WORK PROPERLY !!!
// ===========================================
if (ENV === 'dev') {
  // GLOBAL.XMLHttpRequest =
  //   GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  // GLOBAL.FormData = GLOBAL.originalFormData || GLOBAL.FormData;
}

// ===========================================
const UbyApp = () => (
  <Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </Fragment>
);

export default UbyApp;
AppRegistry.registerComponent('ubyapp', wrapObjectInFunction(UbyApp));

Pushwoosh.init({
  pw_appid: pushWooshAppConstants.applicationID,
  project_number: pushWooshAppConstants.FCMID,
});
Pushwoosh.register();
