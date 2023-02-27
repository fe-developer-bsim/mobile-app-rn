import generateCode from '../generateCode.reducer';
import {SAVE_GENERATE_CODE, CLEAR_GENERATE_CODE} from '../../actions/index.actions';

describe('Reducer: generateCode', () => {

  it('Should return default state by default', () => {
    expect(generateCode('', '')).toEqual('');
  });

  it('Should set gap time', () => {
    const action = {
      type: SAVE_GENERATE_CODE,
      payload: {test: '123'}
    };
    const expectedResult = {test: '123'};
    expect(generateCode('', action)).toEqual(expectedResult);
  });

  it('Should reset gap time', () => {
    const action = {
      type: CLEAR_GENERATE_CODE
    };
    const expectedResult = {};
    expect(generateCode('', action)).toEqual(expectedResult);
  });

});
