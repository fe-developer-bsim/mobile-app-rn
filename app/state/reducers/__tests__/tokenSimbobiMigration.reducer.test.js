import tokenSimbobiMigration from '../tokenSimbobiMigration.reducer';
import {SIMOBI_MIGRATION_CODE, CLEAR_SIMOBI_MIGRATION_CODE} from '../../actions/index.actions';

describe('Reducer: ccCode', () => {
  it('Should return default state by default', () => {
    expect(tokenSimbobiMigration(undefined, '')).toEqual('');
  });
  it('Should save cc code', () => {
    expect(tokenSimbobiMigration('', {type: SIMOBI_MIGRATION_CODE, payload: '123'})).toEqual('123');
  });
  it('Should clear cc code', () => {
    expect(tokenSimbobiMigration('123', {type: CLEAR_SIMOBI_MIGRATION_CODE})).toEqual('');
  });
});
