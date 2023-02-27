import getMoneyInsuredSil from '../getMoneyInsuredSil.reducer';
import {SAVE_MONEY_INSURED_SIL, CLEAR_MONEY_INSURED_SIL} from '../../actions/index.actions';

describe('Reducer: loan accounts', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(getMoneyInsuredSil(undefined, {})).toEqual(initialState);
  });
  it('Should update loan accounts', () => {
    const previousState = [];
    const nextState = [{'test': '1234'}];
    const action = {type: SAVE_MONEY_INSURED_SIL, payload: [{'test': '1234'}]};
    expect(getMoneyInsuredSil(previousState, action)).toEqual(nextState);
  });
  it('Should clear loan accounts', () => {
    const previousState = [{'test': '1234'}];
    const nextState = [];
    const action = {type: CLEAR_MONEY_INSURED_SIL, payload: {}};
    expect(getMoneyInsuredSil(previousState, action)).toEqual(nextState);
  });
});
