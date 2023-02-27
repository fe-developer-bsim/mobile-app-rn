import networkStatus from '../networkStatus.reducer';
import {SET_NETWORK_STATUS} from '../../actions/index.actions';
describe('Reducer: networkStatus', () => {

  it('Should return default state by default', () => {
    expect(networkStatus({}, '')).toEqual({});
  });

  it('Should set the network status', () => {
    const action = {
      type: SET_NETWORK_STATUS,
      payload: true
    };
    const expectedResult = {isConnected: true};
    expect(networkStatus({}, action)).toEqual(expectedResult);
  });
});
