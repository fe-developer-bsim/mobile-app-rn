import {NavigationActions} from 'react-navigation';
import {getCurrentRouteName} from '../utils/transformer.util';
import tracker from '../utils/googleAnalytics.util';
import callOnce from 'call-once-in-interval';

export const screenTracking = ({getState}) => (next) => (action) => {
  if (
    action.type !== NavigationActions.NAVIGATE
     && action.type !== NavigationActions.BACK
  ) {
    return next(action);
  }

  const currentScreen = getCurrentRouteName(getState().nav);
  const result = next(action);
  const nextScreen = getCurrentRouteName(getState().nav);
  if (nextScreen !== currentScreen) {
    tracker.trackScreenView(nextScreen);
  }
  return result;
};


export const debounceNavActions = () => (dispatch) => {
  const result = callOnce(dispatch, 600);
  return (action) => {
    if (action.type === NavigationActions.BACK && !action.preventDebounce) {
      return result(action);
    }
    return dispatch(action);
  };
};
