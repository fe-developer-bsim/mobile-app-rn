import dirtyMiniStatement from '../dirtyMiniStatement.reducer';
import {SET_DIRTY_MINI_STATEMENT} from '../../actions/index.actions';

describe('Reducer: dirtyMiniStatement', () => {

  it('Should return default state by default', () => {
    expect(dirtyMiniStatement(false, '')).toEqual(false);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SET_DIRTY_MINI_STATEMENT,
      payload: true
    };
    const expectedResult = true;
    expect(dirtyMiniStatement('', action)).toEqual(expectedResult);
  });
});
