import listPhoneBook from '../listPhoneBook.reducer';
import {SAVE_PHONE_BOOK, CLEAR_PHONE_BOOK} from '../../actions/index.actions';

describe('Reducer: loan accounts', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(listPhoneBook(undefined, {})).toEqual(initialState);
  });
  it('Should update loan accounts', () => {
    const previousState = [];
    const nextState = [{'test': '1234'}];
    const action = {type: SAVE_PHONE_BOOK, payload: [{'test': '1234'}]};
    expect(listPhoneBook(previousState, action)).toEqual(nextState);
  });
  it('Should clear loan accounts', () => {
    const previousState = [{'test': '1234'}];
    const nextState = [];
    const action = {type: CLEAR_PHONE_BOOK, payload: {}};
    expect(listPhoneBook(previousState, action)).toEqual(nextState);
  });
});
