import transRefNum from '../transRefNum.reducer';
import {SAVE_TRANS_REF_NUM, CLEAR_TRANS_REF_NUM} from '../../actions/index.actions';

describe('Reducer: transRefNum', () => {

  it('Should return default state by default', () => {
    expect(transRefNum([], '')).toEqual([]);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_TRANS_REF_NUM,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(transRefNum([], action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_TRANS_REF_NUM
    };
    const expectedResult = '';
    expect(transRefNum([], action)).toEqual(expectedResult);
  });

});
