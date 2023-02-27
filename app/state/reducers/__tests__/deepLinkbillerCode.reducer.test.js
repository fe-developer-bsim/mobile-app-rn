import deepLinkbillerCode from '../deeplinkbillerCode.reducer';
import {SAVE_BILLERCODE_DEEPLINK, CLEAR_BILLERCODE_DEEPLINK} from '../../actions/index.actions';

describe('Reducer:', () => {

  it('Should set billerDeeplink config', () => {
    const action = {
      type: SAVE_BILLERCODE_DEEPLINK,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(deepLinkbillerCode('', action)).toEqual(expectedResult);
  });

  it('Should reset billerDeeplink config', () => {
    const action = {
      type: CLEAR_BILLERCODE_DEEPLINK,
      payload: ''
    };
    const expectedResult = '';
    expect(deepLinkbillerCode('', action)).toEqual(expectedResult);
  });

});
