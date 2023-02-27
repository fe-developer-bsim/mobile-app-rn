import confirmFields from '../confirmFields.reducer';
import {SAVE_CONFIRM_FIELDS, CLEAR_CONFIRM_FIELDS} from '../../actions/index.actions';

describe('Reducer: confirmFields', () => {
  it('Should return default state by default', () => {
    expect(confirmFields(undefined, {})).toEqual([]);
  });
  it('Should save province list', () => {
    expect(confirmFields([], {type: SAVE_CONFIRM_FIELDS, payload: ['Prov 1', 'Prov 2']})).toEqual(['Prov 1', 'Prov 2']);
  });
  it('Should clear province list', () => {
    expect(confirmFields(['Prov 1', 'Prov 2'], {type: CLEAR_CONFIRM_FIELDS})).toEqual([]);
  });
});
