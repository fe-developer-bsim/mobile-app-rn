import cardless from '../cardlessWithdrawal.reducer';
import {SAVE_CARDLESS_WITHDRAWAL_TRANSFER_LIST, CLEAR_CARDLESS_WITHDRAWAL_TRANSFER_LIST} from '../../actions/index.actions';

describe('Reducer: user', () => {

  it('Should return default state by default', () => {
    expect(cardless([], '')).toEqual([]);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_CARDLESS_WITHDRAWAL_TRANSFER_LIST,
      payload: []
    };
    const expectedResult = [];
    expect(cardless([], action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_CARDLESS_WITHDRAWAL_TRANSFER_LIST
    };
    const expectedResult = [];
    expect(cardless([], action)).toEqual(expectedResult);
  });
});
