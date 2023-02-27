import passenger from '../paramsDeeplinkSavingOrCC.reducer';
import {SAVE_PARAMS_LINK_SAVING, CLEAR_PARAMS_LINK_SAVING} from '../../actions/index.actions';


describe('Reducer: passenger', () => {

  it('Should return default state by default', () => {
    expect(passenger({}, {})).toEqual({});
  });

  it('Should clear passenger data', () => {
    const action = {
      type: CLEAR_PARAMS_LINK_SAVING
    };
    const expectedResult = {};
    expect(passenger({}, action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_PARAMS_LINK_SAVING,
      payload: {
        passenger: '123'
      }
    };
    const expectedResult = {
      passenger: '123'
    };
    expect(passenger({}, action)).toEqual(expectedResult);
  });
});
