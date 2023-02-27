import savingData from '../getMmqDetail.reducer';
import {SAVE_MMQ_DETAIL, CLEAR_MMQ_DETAIL} from '../../actions/index.actions';

describe('Reducer: savingData', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_MMQ_DETAIL,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(savingData([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_MMQ_DETAIL
    };
    const expectedResult = {};
    expect(savingData([], action)).toEqual(expectedResult);
  });

});

