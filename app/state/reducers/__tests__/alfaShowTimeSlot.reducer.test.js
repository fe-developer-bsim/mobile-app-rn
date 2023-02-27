import showSpinner from '../alfaShowTimeSlot.reducer';
import {SHOW_TIME_SLOT_ALFA, HIDE_TIME_SLOT_ALFA} from '../../actions/index.actions';

describe('Reducer: showSpinner', () => {
  it('Should return default state by default', () => {
    expect(showSpinner(undefined, false)).toEqual(false);
  });
  it('Should save alfacart', () => {
    expect(showSpinner('', {type: SHOW_TIME_SLOT_ALFA, payload: true})).toEqual(true);
  });
  it('Should clear alfacart', () => {
    expect(showSpinner(false, {type: HIDE_TIME_SLOT_ALFA})).toEqual(false);
  });
});
