import reksadanaIsResponseUnit from '../reksadanaIsResponseUnit.reducer';
import {SAVE_IS_RESPONSE_UNIT, CLEAR_IS_RESPONSE_UNIT} from '../../actions/index.actions';

describe('Reducer: reksadanaIsResponseUnit', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(reksadanaIsResponseUnit(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_IS_RESPONSE_UNIT};
    expect(reksadanaIsResponseUnit(previousState, action)).toEqual(initialState);
  });
  it('Should update reksadanaIsResponseUnit', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_IS_RESPONSE_UNIT, payload: {test: 'wa'}};
    expect(reksadanaIsResponseUnit(previousState, action)).toEqual(nextState);
  });
});
