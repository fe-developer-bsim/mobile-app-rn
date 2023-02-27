import qrMerchantList from '../qrMerchant.reducer';
import {QR_MERCHANT_UPDATE, QR_MERCHANT_CLEAR} from '../../actions/index.actions';

describe('Reducer: qrMerchantList', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(qrMerchantList(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = [{
      test: 'wa'
    }];
    const action = {type: QR_MERCHANT_CLEAR};
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
    const action = {type: QR_MERCHANT_UPDATE, payload};
    expect(qrMerchantList(previousState, action)).toEqual(nextState);
  });
});
