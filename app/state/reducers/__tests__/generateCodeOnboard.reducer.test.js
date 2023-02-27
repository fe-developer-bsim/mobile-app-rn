import generateCodeOnboard from '../generateCodeOnboard.reducer';
import {SAVE_CODE_ONBOARD, CLEAR_CODE_ONBOARD} from '../../actions/index.actions';

describe('Reducer: generateCodeOnboard', () => {

  it('Should return default state by default', () => {
    expect(generateCodeOnboard('', '')).toEqual('');
  });

  it('Should set gap time', () => {
    const action = {
      type: SAVE_CODE_ONBOARD,
      payload: {test: '123'}
    };
    const expectedResult = {test: '123'};
    expect(generateCodeOnboard('', action)).toEqual(expectedResult);
  });

  it('Should reset gap time', () => {
    const action = {
      type: CLEAR_CODE_ONBOARD
    };
    const expectedResult = {};
    expect(generateCodeOnboard('', action)).toEqual(expectedResult);
  });

});
