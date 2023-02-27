import * as storage from '../../utils/storage.util';
import {storageKeys, get} from '../../utils/storage.util';
import {currentAppVersion} from '../../utils/device.util';
import * as actionCreators from '../actions/index.actions.js';
import * as api from '../../utils/api.util';
import tracker from '../../utils/googleAnalytics.util';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {language} from '../../config/language';
import moment from 'moment';
import {getErrorMessage} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util.js';

export function shouldGiveFeedback () {
  const date = new Date();
  const currentDate = moment(date).format('DD MMM YYYY');
  return get(storageKeys['FEEDBACK_GIVEN']).then((storedDate) => {
    if (currentDate !== storedDate) {
      return getNPS();
    }
    return shouldGiveFeedback;
  });
}
export function getNPS () {
  return (dispatch, getState) => {
    const state = getState();
    const ipassport = result(state, 'user.ipassport', '');
    const payload = {ipassport};

    return api.getFeedbackData(payload, dispatch).then((res) => {
      if (res.data.responseCode === '00') {
        dispatch(NavigationActions.navigate({routeName: 'feedbackPage'}));
      }
    }).catch(() => {});
  };
}

export function handleFeedback (action, data, urlImg) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const userId = result(getState(), 'user.profile.customer.id', 0);
    const state = getState();
    const ipassport = result(state, 'user.ipassport', '');
    const accountNumber = result(state, 'accounts.accountNumber');
    const npsScore = parseInt(result(data, 'rating', ''));
    const notes = result(data, 'suggestionText', '');
    const scooring = result(data, 'suggestionPool', '');
    const payload = {ipassport, npsScore, scooring, notes, accountNumber};
    switch (action) {
    case 'SUBMIT': {
      dispatch(actionCreators.hideFeedback());
      storage.set('FEEDBACK_COUNT', 0);
      tracker.trackEvent('FEEDBACK', String(data.rating), null, {label: 'ID: ' + String(userId) + ' : ' + data.suggestion});
      return api.setFeedbackData(payload, dispatch).
        then(() => {
          dispatch(actionCreators.hideSpinner());
          dispatch(NavigationActions.navigate({routeName: 'Main'}));
          dispatch(popUpThanks(urlImg));
        }).
        catch((err) => {
        // error message 
          Toast.show(getErrorMessage(err, result(err, 'data.responseMessage', '')));
          dispatch(actionCreators.hideSpinner());
        }); 
    }
    case 'DISMISS': {
      dispatch(actionCreators.hideSpinner());
      return Promise.resolve(dispatch(actionCreators.hideFeedback()));
    }
    case 'NEVER_SHOW': {
      dispatch(actionCreators.hideFeedback());
      storage.set('FEEDBACK_GIVEN', currentAppVersion);
      dispatch(actionCreators.hideSpinner());
    }
    }
  };
}

export function popUpThanks (urlImg) {
  return (dispatch) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const uriImage = urlImg;
    const sinarmasModalOptions = {
      heading1: language.NPS_THANKYOU,
      text: language.NPS_FEEDBACK_TEXT,
      button1: language.NPS__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'THANKYOU', uriImage}));
  };
}


