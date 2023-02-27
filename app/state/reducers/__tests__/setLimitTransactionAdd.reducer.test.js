import setLimitTransactionAdd from '../setLimitTransactionAdd.reducer';
import {SAVE_ADD_LIMIT_TRANSACTION, CLEAR_ADD_LIMIT_TRANSACTION} from '../../actions/index.actions';

describe('Reducer: setLimitTransactionAdd', () => {
  xit('Should return default state by default', () => {
    const initialState =  {};
    expect(setLimitTransactionAdd(undefined, {})).toEqual(initialState);
  });
  xit('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_ADD_LIMIT_TRANSACTION};
    expect(setLimitTransactionAdd(previousState, action)).toEqual(initialState);
  });
  xit('Should update setLimitTransactionAdd', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_ADD_LIMIT_TRANSACTION, payload: {test: 'wa'}};
    expect(setLimitTransactionAdd(previousState, action)).toEqual(nextState);
  });
});
