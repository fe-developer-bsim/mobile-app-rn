import getQRparams from '../getQRparams.reducer';
import {SAVE_QR_PARAMS, CLEAR_QR_PARAMS} from '../../actions/index.actions';

describe('Reducer: getQRparams', () => {

  it('Should set movies', () => {
    const action = {
      type: SAVE_QR_PARAMS,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(getQRparams({}, action)).toEqual(expectedResult);
  });

  it('Should reset movies', () => {
    const action = {
      type: CLEAR_QR_PARAMS
    };
    const expectedResult = {};
    expect(getQRparams({}, action)).toEqual(expectedResult);
  });

});
