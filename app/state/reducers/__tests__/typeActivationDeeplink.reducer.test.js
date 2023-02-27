import typeActivation from '../typeActivationDeeplink.reducer';
import {SAVE_TYPEACTIVATION_DEEPLINK, CLEAR_TYPEACTIVATION_DEEPLINK} from '../../actions/index.actions';

describe('Reducer:', () => {

  it('Should set billerDeeplink config', () => {
    const action = {
      type: SAVE_TYPEACTIVATION_DEEPLINK,
      payload: 'wasd'
    };
    const expectedResult = 'wasd';
    expect(typeActivation('', action)).toEqual(expectedResult);
  });

  it('Should reset billerDeeplink config', () => {
    const action = {
      type: CLEAR_TYPEACTIVATION_DEEPLINK,
      payload: ''
    };
    const expectedResult = '';
    expect(typeActivation('', action)).toEqual(expectedResult);
  });

});
