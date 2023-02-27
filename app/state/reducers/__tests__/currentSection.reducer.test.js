import currentSection from '../currentSection.reducer';
import {SAVE_CURRENT_SECTION, CLEAR_CURRENT_SECTION} from '../../actions/index.actions';

describe('Reducer: currentSection', () => {
  it('Should return default state by default', () => {
    expect(currentSection(undefined, {})).toEqual([]);
  });
  it('Should save province list', () => {
    expect(currentSection([], {type: SAVE_CURRENT_SECTION, payload: ['Prov 1', 'Prov 2']})).toEqual(['Prov 1', 'Prov 2']);
  });
  it('Should clear province list', () => {
    expect(currentSection(['Prov 1', 'Prov 2'], {type: CLEAR_CURRENT_SECTION})).toEqual([]);
  });
});
