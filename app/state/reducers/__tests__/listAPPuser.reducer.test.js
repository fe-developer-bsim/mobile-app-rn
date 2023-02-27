import lisAPPuser from '../listAPPuser.reducer';
import {GET_APP_USER_ISTALLED, CLEAR_APP_USER_ISTALLED} from '../../actions/index.actions';

describe('Reducer: lisAPPuser', () => {

  it('Should return default state by default', () => {
    expect(lisAPPuser([], {})).toEqual([]);
  });

  it('Should clear payee data', () => {
    const action = {
      type: CLEAR_APP_USER_ISTALLED
    };
    const expectedResult = [];
    expect(lisAPPuser([], action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: GET_APP_USER_ISTALLED,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(lisAPPuser([], action)).toEqual(expectedResult);
  });
});

