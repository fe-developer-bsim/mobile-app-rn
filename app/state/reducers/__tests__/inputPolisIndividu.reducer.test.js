import inputPolisIndividu from '../inputPolisIndividu.reducer';
import {SAVE_INPUT_INDIVIDU, CLEAR_INPUT_INDIVIDU} from '../../actions/index.actions';

describe('Reducer: inputPolisIndividu', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(inputPolisIndividu(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_INPUT_INDIVIDU};
    expect(inputPolisIndividu(previousState, action)).toEqual(initialState);
  });
  it('Should update inputPolisIndividu', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_INPUT_INDIVIDU, payload: {test: 'wa'}};
    expect(inputPolisIndividu(previousState, action)).toEqual(nextState);
  });
});
