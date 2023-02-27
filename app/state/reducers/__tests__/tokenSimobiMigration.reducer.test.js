import tokenSimobi from '../tokenSimbobiMigration.reducer';
import {SIMOBI_MIGRATION_CODE, CLEAR_SIMOBI_MIGRATION_CODE} from '../../actions/index.actions';

describe('Reducer: tokenSimobi', () => {

  it('Should return default state by default', () => {
    expect(tokenSimobi('', '')).toEqual('');
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SIMOBI_MIGRATION_CODE,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(tokenSimobi('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_SIMOBI_MIGRATION_CODE
    };
    const expectedResult = '';
    expect(tokenSimobi('', action)).toEqual(expectedResult);
  });

});
