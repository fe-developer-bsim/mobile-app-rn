import listDukcapil from '../listDukcapil.reducer';
import {SAVE_DUKCAPIL, CLEAR_DUKCAPIL} from '../../actions/index.actions';

describe('Reducer: listDukcapil', () => {
  it('Should return default state by default', () => {
    expect(listDukcapil(undefined, {})).toEqual({});
  });
  it('Should save dukcapil list', () => {
    expect(listDukcapil([], {type: SAVE_DUKCAPIL, payload: {list: ['abc']}})).toEqual({list: ['abc']});
  });
  it('Should clear dukcapil list', () => {
    expect(listDukcapil({list: ['abc']}, {type: CLEAR_DUKCAPIL})).toEqual({});
  });
});
