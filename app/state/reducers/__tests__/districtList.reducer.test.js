import districtList from '../districtList.reducer';
import {SAVE_DISTRICT_LIST, CLEAR_DISTRICT_LIST} from '../../actions/index.actions';

describe('Reducer: district', () => {
  it('Should return default state by default', () => {
    expect(districtList(undefined, {})).toEqual([]);
  });
  it('Should save subDistrict list', () => {
    expect(districtList([], {type: SAVE_DISTRICT_LIST, payload: ['Dis 1', 'Dis 2']})).toEqual(['Dis 1', 'Dis 2']);
  });
  it('Should clear district list', () => {
    expect(districtList(['Dis 1', 'Dis 2'], {type: CLEAR_DISTRICT_LIST})).toEqual([]);
  });
});
