import simasTaraDetail from '../simasTaraDetail.reducer';
import {SAVE_SIMAS_TARA_DETAIL, CLEAR_SIMAS_TARA_DETAIL} from '../../actions/index.actions';

describe('Reducer: simasTaraDetail', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_SIMAS_TARA_DETAIL,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(simasTaraDetail([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_SIMAS_TARA_DETAIL
    };
    const expectedResult = {};
    expect(simasTaraDetail([], action)).toEqual(expectedResult);
  });

});

