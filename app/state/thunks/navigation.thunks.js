import {NavigationActions} from 'react-navigation';
import result from 'lodash/result';

export function resetToLandingAndNavigate (routeName, params) {
  return (dispatch, getState) => {
    const state = getState();
    const appInitKeys = result(state, 'appInitKeys', []);
    const isLockedDevice = Boolean(appInitKeys && appInitKeys.username && appInitKeys.tokenClient && appInitKeys.tokenServer);
    if (!isLockedDevice) {
      dispatch(NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'Login'}),
          NavigationActions.navigate({routeName, params}),
        ]
      }));
    } else {
      dispatch(NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'Landing'}),
          NavigationActions.navigate({routeName, params}),
        ]
      }));
    }
  };
}
