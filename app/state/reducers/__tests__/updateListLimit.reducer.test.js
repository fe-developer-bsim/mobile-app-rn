import updateListLimit from '../updateListLimit.reducer';
import {UPDATE_LIST_LIMIT, CLEAR_LIST_LIMIT} from '../../actions/index.actions';

describe('Reducer: subDistrict', () => {
  xit('Should return default state by default', () => {
    expect(updateListLimit(undefined, {})).toEqual([]);
  });
  xit('Should save subDistrict list', () => {
    expect(updateListLimit([], {type: UPDATE_LIST_LIMIT, payload: ['Sub 1', 'Sub 2']})).toEqual(['Sub 1', 'Sub 2']);
  });
  xit('Should clear subDistrict list', () => {
    expect(updateListLimit(['Sub 1', 'Sub 2'], {type: CLEAR_LIST_LIMIT})).toEqual([]);
  });
});

