import generateCodeTag from '../generateCodeTag.reducer';
import {SAVE_CODE_TAG_FASTCODE, CLEAR_CODE_TAG_FASTCODE} from '../../actions/index.actions';

describe('Reducer: generateCodeTag', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_CODE_TAG_FASTCODE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(generateCodeTag([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_CODE_TAG_FASTCODE
    };
    const expectedResult = {};
    expect(generateCodeTag([], action)).toEqual(expectedResult);
  });

});

