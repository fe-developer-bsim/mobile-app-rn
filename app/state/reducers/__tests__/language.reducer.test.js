import language from '../language.reducer';
import {SET_LANGUAGE} from '../../actions/index.actions';

describe('Reducer: lastRecharges', () => {
  it('Should return default state by default', () => {
    const initialState =  {id: 'id'};
    expect(language(undefined, {})).toEqual(initialState);
  });
  it('Should update language', () => {
    const previousState = {id: 'id'};
    const payload = 'en';
    const nextState = {id: 'en'};
    const action = {type: SET_LANGUAGE, payload};
    expect(language(previousState, action)).toEqual(nextState);
  });

});
