import provinceList from '../provinceList.reducer';
import {SAVE_PROVINCE_LIST, CLEAR_PROVINCE_LIST} from '../../actions/index.actions';

describe('Reducer: provinceList', () => {
  it('Should return default state by default', () => {
    expect(provinceList(undefined, {})).toEqual([]);
  });
  it('Should save province list', () => {
    expect(provinceList([], {type: SAVE_PROVINCE_LIST, payload: ['Prov 1', 'Prov 2']})).toEqual(['Prov 1', 'Prov 2']);
  });
  it('Should clear province list', () => {
    expect(provinceList(['Prov 1', 'Prov 2'], {type: CLEAR_PROVINCE_LIST})).toEqual([]);
  });
});
