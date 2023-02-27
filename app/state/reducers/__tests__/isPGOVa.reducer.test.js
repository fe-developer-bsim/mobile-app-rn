import deepLinkbillerCode from '../isPGOVa.reducer';
import {SAVE_PGO_VA_STATUS, CLEAR_PGO_VA_STATUS} from '../../actions/index.actions';

describe('Reducer:', () => {

  it('Should set billerDeeplink config', () => {
    const action = {
      type: SAVE_PGO_VA_STATUS,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(deepLinkbillerCode('', action)).toEqual(expectedResult);
  });

  it('Should reset billerDeeplink config', () => {
    const action = {
      type: CLEAR_PGO_VA_STATUS,
      payload: ''
    };
    const expectedResult = '';
    expect(deepLinkbillerCode('', action)).toEqual(expectedResult);
  });

});
