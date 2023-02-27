import qrPromoList from '../qrPromoList.reducer';
import {SET_PROMO_LIST, CLEAR_PROMO_LIST} from '../../actions/index.actions';

describe('Reducer: qrPromoList', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(qrPromoList(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  [];
    const previousState = [{
      test: 'wa'
    }];
    const action = {type: CLEAR_PROMO_LIST};
    expect(qrPromoList(previousState, action)).toEqual(initialState);
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
    const action = {type: SET_PROMO_LIST, payload};
    expect(qrPromoList(previousState, action)).toEqual(nextState);
  });
});
