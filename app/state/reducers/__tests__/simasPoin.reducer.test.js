import simasPoin from '../simasPoin.reducer';
import {SAVE_SIMAS_POIN, CLEAR_SIMAS_POIN} from '../../actions/index.actions';

describe('Reducer: user', () => {

  it('Should return default state by default', () => {
    expect(simasPoin([], {})).toEqual([]);
  });

  it('Should set simasPoin data', () => {
    const action = {
      type: SAVE_SIMAS_POIN,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(simasPoin([], action)).toEqual(expectedResult);
  });

  it('Should clear simasPoin data', () => {
    const action = {
      type: CLEAR_SIMAS_POIN
    };
    const expectedResult = [];
    expect(simasPoin([], action)).toEqual(expectedResult);
  });
});
