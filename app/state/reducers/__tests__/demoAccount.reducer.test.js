import networkStatus from '../demoAccount.reducer';
import {SAVE_DEMO_CODE, CLEAR_DEMO_CODE} from '../../actions/index.actions';
describe('Reducer: networkStatus', () => {

  it('Should return default state by default', () => {
    expect(networkStatus({}, '')).toEqual({});
  });

  it('Should set true', () => {
    const action = {
      type: SAVE_DEMO_CODE,
      payload: true
    };
    const expectedResult = true;
    expect(networkStatus({}, action)).toEqual(expectedResult);
  });

  it('Should set the network status', () => {
    const action = {
      type: CLEAR_DEMO_CODE,
      payload: false
    };
    const expectedResult = false;
    expect(networkStatus({}, action)).toEqual(expectedResult);
  });
});
