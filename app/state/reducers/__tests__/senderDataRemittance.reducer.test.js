import senderDataRemittance from '../senderDataRemittance.reducer';
import {SAVE_SENDER_DATA_REMITTANCE, CLEAR_SENDER_DATA_REMITTANCE} from '../../actions/index.actions';

describe('Reducer: senderDataRemittance', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_SENDER_DATA_REMITTANCE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(senderDataRemittance([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_SENDER_DATA_REMITTANCE
    };
    const expectedResult = {};
    expect(senderDataRemittance([], action)).toEqual(expectedResult);
  });

});

