import myDataOrderList from '../myDataOrderList.reducer';
import {GET_MY_ORDER_DATA_LIST, CLEAR_MY_ORDER_DATA_LIST} from '../../actions/index.actions';

describe('Reducer: myDataOrderList', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(myDataOrderList(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  [];
    const previousState = [{
      test: 'wa'
    }];
    const action = {type: CLEAR_MY_ORDER_DATA_LIST};
    expect(myDataOrderList(previousState, action)).toEqual(initialState);
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
    const action = {type: GET_MY_ORDER_DATA_LIST, payload};
    expect(myDataOrderList(previousState, action)).toEqual(nextState);
  });
});
