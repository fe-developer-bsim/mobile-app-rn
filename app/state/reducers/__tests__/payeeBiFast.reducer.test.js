import payeeBiFast from '../payeeBiFast.reducer';
import {SAVE_PAYEE_BIFAST, CLEAR_PAYEE_BIFAST} from '../../actions/index.actions';

describe('Reducer: payeeBiFast', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(payeeBiFast(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_PAYEE_BIFAST};
    expect(payeeBiFast(previousState, action)).toEqual(initialState);
  });
  it('Should update payeeBiFast', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_PAYEE_BIFAST, payload: {test: 'wa'}};
    expect(payeeBiFast(previousState, action)).toEqual(nextState);
  });
});
