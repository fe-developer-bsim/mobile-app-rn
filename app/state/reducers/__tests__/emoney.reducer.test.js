import emoney from '../emoney.reducer';
import {EMONEY_UPDATE, EMONEY_CLEAR} from '../../actions/index.actions';

describe('Reducer: emoney', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(emoney(undefined, {})).toEqual(initialState);
  });
  it('Should update emoney', () => {
    const nextState = {1: 1, 2: 2, 3: 3};
    const action = {type: EMONEY_UPDATE, payload: {1: 1, 2: 2, 3: 3}};
    expect(emoney({1: 1, 2: 2, 3: 3}, action)).toEqual(nextState);
  });
  it('Should clear emoney', () => {
    const nextState = {};
    const action = {type: EMONEY_CLEAR};
    expect(emoney({}, action)).toEqual(nextState);
  });
});
