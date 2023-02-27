import lastRecharges from '../lastRecharges.reducer';
import {LAST_RECHARGES_UPDATE, RECHARGES_CLEAR, ALL_RECHARGES} from '../../actions/index.actions';

describe('Reducer: lastRecharges', () => {
  it('Should return default state by default', () => {
    const initialState =  {allRecharges: [], frequentRecharges: []};
    expect(lastRecharges(undefined, {})).toEqual(initialState);
  });
  it('Should update fund transfer', () => {
    const previousState = {'allRecharges': [{'someKey': 1232, 'subscriberNoInput': '13'}], 'frequentRecharges': [{'someKey': 1232, 'subscriberNoInput': '13'}]};
    const payload = {subscriberNoInput: '43', someKey: 4562};
    const nextState = {'allRecharges': [{'someKey': 1232, 'subscriberNoInput': '13'}, {'someKey': 4562, 'subscriberNoInput': '43'}], 'frequentRecharges': [{'someKey': 4562, 'subscriberNoInput': '43'}, {'someKey': 1232, 'subscriberNoInput': '13'}]};
    const action = {type: LAST_RECHARGES_UPDATE, payload};
    expect(lastRecharges(previousState, action)).toEqual(nextState);
  });
  it('Should return all recharges', () => {
    const previousState = {};
    const payload = [{subscriberNoInput: '43', someKey: 4562}];
    const nextState = {'allRecharges': [{subscriberNoInput: '43', someKey: 4562}], frequentRecharges: [{subscriberNoInput: '43', someKey: 4562}]};
    const action = {type: ALL_RECHARGES, payload};
    expect(lastRecharges(previousState, action)).toEqual(nextState);
  });
  it('Should clear fund transfer', () => {
    const previousState = {'allRecharges': [{'someKey': 1232, 'subscriberNoInput': '13'}], 'frequentRecharges': [{'someKey': 1232, 'subscriberNoInput': '13'}]};
    const initialState =  {allRecharges: [], frequentRecharges: []};
    const action = {type: RECHARGES_CLEAR};
    expect(lastRecharges(previousState, action)).toEqual(initialState);
  });

});
