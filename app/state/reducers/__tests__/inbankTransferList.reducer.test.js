import inbankTransferList from '../inbankTransferList.reducer';
import {SAVE_INBANK_TRANSACTION_LIST, CLEAR_INBANK_TRANSACTION_LIST} from '../../actions/index.actions';

describe('Reducer: inbankTransferList', () => {
  xit('Should return default state by default', () => {
    const initialState =  {};
    expect(inbankTransferList(undefined, {})).toEqual(initialState);
  });
  xit('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_INBANK_TRANSACTION_LIST};
    expect(inbankTransferList(previousState, action)).toEqual(initialState);
  });
  xit('Should update inbankTransferList', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_INBANK_TRANSACTION_LIST, payload: {test: 'wa'}};
    expect(inbankTransferList(previousState, action)).toEqual(nextState);
  });
});
