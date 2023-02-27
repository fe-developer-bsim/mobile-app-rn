import userApiKey from '../userApiKey.reducer';
import {SAVE_USER_API_KEY, CLEAR_USER_API_KEY} from '../../actions/index.actions';

describe('Reducer: user', () => {

  it('Should return default state by default', () => {
    expect(userApiKey('', {})).toEqual('');
  });

  it('Should set user api key', () => {
    const action = {
      type: SAVE_USER_API_KEY,
      payload: 'e5bf56c6ad2a771383691569ba0945f06365373f'
    };
    const expectedResult = 'e5bf56c6ad2a771383691569ba0945f06365373f';
    expect(userApiKey({}, action)).toEqual(expectedResult);
  });

  it('Should reset user api key', () => {
    const action = {
      type: CLEAR_USER_API_KEY,
      payload: undefined
    };
    const expectedResult = '';
    expect(userApiKey({}, action)).toEqual(expectedResult);
  });

});
