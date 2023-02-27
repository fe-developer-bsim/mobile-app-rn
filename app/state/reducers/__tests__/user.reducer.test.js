import user from '../user.reducer';
import {USER_UPDATE_METADATA, USER_CLEAR} from '../../actions/index.actions';

describe('Reducer: user', () => {

  it('Should return default state by default', () => {
    expect(user([], {})).toEqual([]);
  });

  it('Should clear user data', () => {
    const action = {
      type: USER_CLEAR,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = {};
    expect(user([], action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: USER_UPDATE_METADATA,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(user([], action)).toEqual(expectedResult);
  });
});
