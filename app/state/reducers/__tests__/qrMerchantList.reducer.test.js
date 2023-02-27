import qrMerchantList from '../qrMerchantList.reducer';
import {QR_SET_MERCHANT, QR_CLEAR_MERCHANT} from '../../actions/index.actions';

describe('Reducer: qrMerchantList', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(qrMerchantList(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  [];
    const previousState = [{
      test: 'wa'
    }];
    const action = {type: QR_CLEAR_MERCHANT};
    expect(qrMerchantList(previousState, action)).toEqual(initialState);
  });
  it('Should update fingerprint', () => {
    const previousState = [{
      test: 'wa'
    }];
    const nextState = [{
      test: 'wa'
    },
    {
      test: 'qa'
    }];
    const payload = [{
      test: 'wa'
    },
    {
      test: 'qa'
    }];
    const action = {type: QR_SET_MERCHANT, payload};
    expect(qrMerchantList(previousState, action)).toEqual(nextState);
  });
});
