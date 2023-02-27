import filterCalendar from '../filterCalendar.reducer';
import {SAVE_FILTER_CALENDAR, CLEAR_FILTER_CALENDAR} from '../../actions/index.actions';

describe('Reducer: filterCalendar', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(filterCalendar(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_FILTER_CALENDAR};
    expect(filterCalendar(previousState, action)).toEqual(initialState);
  });
  it('Should update filterCalendar', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_FILTER_CALENDAR, payload: {test: 'wa'}};
    expect(filterCalendar(previousState, action)).toEqual(nextState);
  });
});
