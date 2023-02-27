import reksadanaSummaryDetailLastTrans from '../reksadanaSummaryDetailLastTrans.reducer';
import {SAVE_REKSADANA_SUMMARY_DETAIL_LAST, CLEAR_REKSADANA_SUMMARY_DETAIL_LAST} from '../../actions/index.actions';

describe('Reducer: loan accounts', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(reksadanaSummaryDetailLastTrans(undefined, {})).toEqual(initialState);
  });
  it('Should update loan accounts', () => {
    const previousState = [];
    const nextState = [{'test': '1234'}];
    const action = {type: SAVE_REKSADANA_SUMMARY_DETAIL_LAST, payload: [{'test': '1234'}]};
    expect(reksadanaSummaryDetailLastTrans(previousState, action)).toEqual(nextState);
  });
  it('Should clear loan accounts', () => {
    const previousState = [{'test': '1234'}];
    const nextState = [];
    const action = {type: CLEAR_REKSADANA_SUMMARY_DETAIL_LAST, payload: {}};
    expect(reksadanaSummaryDetailLastTrans(previousState, action)).toEqual(nextState);
  });
});
