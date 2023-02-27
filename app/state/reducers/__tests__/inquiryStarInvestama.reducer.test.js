import inquiryStarInvestama from '../inquiryStarInvestama.reducer';
import {SAVE_INQUIRY_STAR_INVESTAMA, CLEAR_INQUIRY_STAR_INVESTAMA} from '../../actions/index.actions';

describe('Reducer: loan accounts', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(inquiryStarInvestama(undefined, {})).toEqual(initialState);
  });
  it('Should update loan accounts', () => {
    const previousState = [];
    const nextState = [{'test': '1234'}];
    const action = {type: SAVE_INQUIRY_STAR_INVESTAMA, payload: [{'test': '1234'}]};
    expect(inquiryStarInvestama(previousState, action)).toEqual(nextState);
  });
  it('Should clear loan accounts', () => {
    const previousState = [{'test': '1234'}];
    const nextState = [];
    const action = {type: CLEAR_INQUIRY_STAR_INVESTAMA, payload: {}};
    expect(inquiryStarInvestama(previousState, action)).toEqual(nextState);
  });
});
