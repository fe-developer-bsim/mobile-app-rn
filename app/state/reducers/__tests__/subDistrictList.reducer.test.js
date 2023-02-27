import subDistrictList from '../subDistrictList.reducer';
import {SAVE_SUBDISTRICT_LIST, CLEAR_SUBDISTRICT_LIST} from '../../actions/index.actions';

describe('Reducer: subDistrict', () => {
  it('Should return default state by default', () => {
    expect(subDistrictList(undefined, {})).toEqual([]);
  });
  it('Should save subDistrict list', () => {
    expect(subDistrictList([], {type: SAVE_SUBDISTRICT_LIST, payload: ['Sub 1', 'Sub 2']})).toEqual(['Sub 1', 'Sub 2']);
  });
  it('Should clear subDistrict list', () => {
    expect(subDistrictList(['Sub 1', 'Sub 2'], {type: CLEAR_SUBDISTRICT_LIST})).toEqual([]);
  });
});
