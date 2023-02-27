import {NavigationActions} from 'react-navigation';
jest.mock('../../utils/transformer.util');
import tracker from '../../utils/googleAnalytics.util';
import {screenTracking, debounceNavActions} from '../reduxMiddlewares.js';

const createFakeStore = (fakeData) => ({
  getState () {
    return fakeData;
  }
});

const dispatchWithStoreOf = (storeData, action) => {
  let dispatched = null;
  const dispatch = screenTracking(createFakeStore(storeData))((actionAttempt) => dispatched = actionAttempt);
  dispatch(action);
  return dispatched;
};

describe('middlewares', () => {
  it('should not call google analytics tracker', () => {
    const action = {
      type: 'TEST_ACTION'
    };
    dispatchWithStoreOf({}, action);
    expect(tracker.trackScreenView).not.toBeCalled();
  });
  it('should dispatch an action', () => {
    const action = {
      type: NavigationActions.NAVIGATE
    };
    expect(
      dispatchWithStoreOf({}, action)
    ).toEqual(action);
  });
  xit('should call google analytics tracker', () => {
    expect(tracker.trackScreenView).toBeCalled('B');
  });
  it('debounceNavActions: should debouce NAVIGATE/BACK actions', () => {
    const mockDispatch = jest.fn();
    const action = {
      type: NavigationActions.BACK
    };
    const middlewareInstance = debounceNavActions()(mockDispatch);
    middlewareInstance(action);
    middlewareInstance(action);
    middlewareInstance(action);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  it('debounceNavActions: should not debouce other than nav actions', () => {
    const mockDispatch = jest.fn();
    const action = {
      type: 'TEST_ACTION'
    };
    const middlewareInstance = debounceNavActions()(mockDispatch);
    middlewareInstance(action);
    middlewareInstance(action);
    middlewareInstance(action);
    expect(mockDispatch).toHaveBeenCalledTimes(3);
  });
});
