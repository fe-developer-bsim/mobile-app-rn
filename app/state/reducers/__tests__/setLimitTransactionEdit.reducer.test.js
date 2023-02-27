import setLimitTransactionEdit from '../setLimitTransactionEdit.reducer';
import {SAVE_EDIT_LIMIT_TRANSACTION, CLEAR_EDIT_LIMIT_TRANSACTION} from '../../actions/index.actions';

describe('Reducer: setLimitTransactionEdit', () => {
  xit('Should return default state by default', () => {
    const initialState =  {};
    expect(setLimitTransactionEdit(undefined, {})).toEqual(initialState);
  });
  xit('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_EDIT_LIMIT_TRANSACTION};
    expect(setLimitTransactionEdit(previousState, action)).toEqual(initialState);
  });
  xit('Should update setLimitTransactionEdit', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_EDIT_LIMIT_TRANSACTION, payload: {test: 'wa'}};
    expect(setLimitTransactionEdit(previousState, action)).toEqual(nextState);
  });
});
