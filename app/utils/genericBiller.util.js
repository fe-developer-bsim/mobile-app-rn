import {NavigationActions} from 'react-navigation';
import result from 'lodash/result';

export const genericBillerNavigate = (dispatch, biller) => {
  const isEtax = result(biller, 'billerPreferences.code', '') === '009924';
  const billerType = isEtax ? result(biller, 'billerPreferences.code', '') : result(biller, 'billerPreferences.billerType', 0);
  switch (billerType) {
  case '1':
    dispatch(NavigationActions.navigate({routeName: 'BillerTypeOne', params: {biller}}));
    break;

  case '2':
    dispatch(NavigationActions.navigate({routeName: 'BillerTypeTwo', params: {biller}}));
    break;

  case '3':
    dispatch(NavigationActions.navigate({routeName: 'BillerTypeThree', params: {biller}}));
    break;

  case '5':
    dispatch(NavigationActions.navigate({routeName: 'CreditCard', params: {biller}}));
    break;
    
  case '6':
    if (result(biller, 'billerPreferences.isSubscriber', false)) {
      dispatch(NavigationActions.navigate({routeName: 'BillerTypeSix', params: {biller}}));
    } else {
      dispatch(NavigationActions.navigate({routeName: 'BillerTypeSixPayment', params: {biller}}));
    }
    break;

  case '7':
    dispatch(NavigationActions.navigate({routeName: 'BillerTypeSeven', params: {biller}}));
    break;

  case '8':
    dispatch(NavigationActions.navigate({routeName: 'BillerTypeEight', params: {biller}}));
    break;

  case '9':
    dispatch(NavigationActions.navigate({routeName: 'BillerTypeNine', params: {biller}}));
    break;

  case '10':
    dispatch(NavigationActions.navigate({routeName: 'BillerTypeTen', params: {biller}}));
    break;

  case '009924':
    dispatch(NavigationActions.navigate({routeName: 'ETax', params: {biller}}));
    break; 

  default:
  }
};
