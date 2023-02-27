import detailByCustNo from '../detailByCustNo.reducer';
import {SAVE_DETAIL_BY_CUST_NO, CLEAR_DETAIL_BY_CUST_NO} from '../../actions/index.actions';

describe('Reducer: detailByCustNo', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(detailByCustNo(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_DETAIL_BY_CUST_NO};
    expect(detailByCustNo(previousState, action)).toEqual(initialState);
  });
  it('Should update detailByCustNo', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_DETAIL_BY_CUST_NO, payload: {test: 'wa'}};
    expect(detailByCustNo(previousState, action)).toEqual(nextState);
  });
});
