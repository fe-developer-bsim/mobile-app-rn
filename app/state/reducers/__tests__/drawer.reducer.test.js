import drawer from '../drawer.reducer';
import {DRAWER_SHOW, DRAWER_HIDE} from '../../actions/index.actions';

describe('Reducer: drawer', () => {
  it('Should return default state by default', () => {
    const initialState =  false;
    expect(drawer(undefined, {})).toEqual(initialState);
  });
  it('Should update drawer visible', () => {
    const previousState = false;
    const nextState = true;
    const action = {type: DRAWER_SHOW};
    expect(drawer(previousState, action)).toEqual(nextState);
  });
  it('Should clear drawer visible', () => {
    const previousState = true;
    const nextState = false;
    const action = {type: DRAWER_HIDE};
    expect(drawer(previousState, action)).toEqual(nextState);
  });

});
