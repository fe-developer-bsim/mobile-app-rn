import cityList from '../cityList.reducer';
import {SAVE_CITY_LIST, CLEAR_CITY_LIST} from '../../actions/index.actions';

describe('Reducer: feedback', () => {
  it('Should return default state by default', () => {
    expect(cityList(undefined, {})).toEqual([]);
  });
  it('Should save city list', () => {
    expect(cityList([], {type: SAVE_CITY_LIST, payload: ['Jakarta', 'Palembang']})).toEqual(['Jakarta', 'Palembang']);
  });
  it('Should clear city list', () => {
    expect(cityList(['Jakarta', 'Palembang'], {type: CLEAR_CITY_LIST})).toEqual([]);
  });
});
