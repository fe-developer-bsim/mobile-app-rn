import setLimitTransactionList from '../setLimitTransactionList.reducer';
import {SAVE_LIST_LIMIT_TRANSACTION, CLEAR_LIST_LIMIT_TRANSACTION} from '../../actions/index.actions';

describe('Reducer: setLimitTransactionList', () => {
  xit('Should return default state by default', () => {
    const initialState =  {};
    expect(setLimitTransactionList(undefined, {})).toEqual(initialState);
  });
  xit('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_LIST_LIMIT_TRANSACTION};
    expect(setLimitTransactionList(previousState, action)).toEqual(initialState);
  });
  xit('Should update setLimitTransactionList', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_LIST_LIMIT_TRANSACTION, payload: {test: 'wa'}};
    expect(setLimitTransactionList(previousState, action)).toEqual(nextState);
  });
});
