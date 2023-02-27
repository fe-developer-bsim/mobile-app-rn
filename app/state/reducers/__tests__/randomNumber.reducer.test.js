import randomNumber from '../randomNumber.reducer';
import {GENERATE_RANDOM_NUMBER, CLEAR_GENERATE_RANDOM_NUMBER} from '../../actions/index.actions';

describe('Reducer:', () => {

  it('Should set randomNumber config', () => {
    const action = {
      type: GENERATE_RANDOM_NUMBER,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(randomNumber([], action)).toEqual(expectedResult);
  });

  it('Should reset randomNumber config', () => {
    const action = {
      type: CLEAR_GENERATE_RANDOM_NUMBER
    };
    const expectedResult = '';
    expect(randomNumber([], action)).toEqual(expectedResult);
  });

});
