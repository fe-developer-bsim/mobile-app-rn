import txTravelDetail from '../txTravelDetail.reducer';
import {SAVE_DATA_TX_TRAVEL_DETAIL, CLEAR_DATA_TX_TRAVEL_DETAIL} from '../../actions/index.actions';

describe('Reducer: txTravelDetail', () => {

  it('Should set movies', () => {
    const action = {
      type: SAVE_DATA_TX_TRAVEL_DETAIL,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(txTravelDetail({}, action)).toEqual(expectedResult);
  });

  it('Should reset movies', () => {
    const action = {
      type: CLEAR_DATA_TX_TRAVEL_DETAIL
    };
    const expectedResult = {};
    expect(txTravelDetail({}, action)).toEqual(expectedResult);
  });

});
