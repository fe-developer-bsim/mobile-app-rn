import setLimitTransactionDelete from '../setLimitTransactionDelete.reducer';
import {SAVE_DELETE_LIMIT_TRANSACTION, CLEAR_DELETE_LIMIT_TRANSACTION} from '../../actions/index.actions';

describe('Reducer: setLimitTransactionDelete', () => {
  xit('Should return default state by default', () => {
    const initialState =  {};
    expect(setLimitTransactionDelete(undefined, {})).toEqual(initialState);
  });
  xit('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_DELETE_LIMIT_TRANSACTION};
    expect(setLimitTransactionDelete(previousState, action)).toEqual(initialState);
  });
  xit('Should update setLimitTransactionDelete', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_DELETE_LIMIT_TRANSACTION, payload: {test: 'wa'}};
    expect(setLimitTransactionDelete(previousState, action)).toEqual(nextState);
  });
});
