import getMmq from '../getMmq.reducer';
import {SAVE_INQUIRY_MMQ, CLEAR_INQUIRY_MMQ} from '../../actions/index.actions';

describe('Reducer: getMmq', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_INQUIRY_MMQ,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(getMmq([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_INQUIRY_MMQ
    };
    const expectedResult = {};
    expect(getMmq([], action)).toEqual(expectedResult);
  });

});

