import recurringtransfer from '../recurringTransferData.reducer';
import {SAVE_RECURRING_DATA, CLEAR_RECURRING_DATA} from '../../actions/index.actions';

describe('Reducer: recurringtransfer', () => {

  it('Should return default state by default', () => {
    expect(recurringtransfer([], '')).toEqual([]);
  });

  it('Should set biller config', () => {
    const action = {
      type: SAVE_RECURRING_DATA,
      payload: [{wasd: '123'}]
    };
    const expectedResult = [{wasd: '123'}];
    expect(recurringtransfer([], action)).toEqual(expectedResult);
  });

  it('Should reset biller config', () => {
    const action = {
      type: CLEAR_RECURRING_DATA
    };
    const expectedResult = [];
    expect(recurringtransfer([], action)).toEqual(expectedResult);
  });

});
