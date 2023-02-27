import newOnboarding from '../newOnboarding.reducer';
import {SAVE_NEW_ONBOARDING, CLEAR_NEW_ONBOARDING} from '../../actions/index.actions';

describe('Reducer: newOnboarding', () => {
  it('Should return default state by default', () => {
    expect(newOnboarding(undefined, '')).toEqual('');
  });
  it('Should save cc code', () => {
    expect(newOnboarding('', {type: SAVE_NEW_ONBOARDING, payload: '123'})).toEqual('123');
  });
  it('Should clear cc code', () => {
    expect(newOnboarding('123', {type: CLEAR_NEW_ONBOARDING})).toEqual('');
  });
});
