import referralListMgmReducer from '../referralListMgm.reducer';
import * as actions from '../../actions/index.actions';


describe('Reducer: transactions', () => {
  const initialState = {last7days: [], today: [], last30days: [], thisMonth: [], custom: [],
  };
  it('Should return default state by default', () => {
    expect(referralListMgmReducer(undefined, {})).toEqual(initialState);
  });

  it('Should update last7days transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_UPDATE_LAST_7_DAYS,
      payload: [2]
    };
    const expectedLast7days = [2];
    expect(referralListMgmReducer(initialState, action).last7days).toEqual(expectedLast7days);
  });
  it('Should update today transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_UPDATE_TODAY_REFERRAL,
      payload: [1]
    };
    const expectedToday = [1];
    expect(referralListMgmReducer(initialState, action).today).toEqual(expectedToday);
  });
  it('Should update last30days transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_UPDATE_LAST_30_DAYS,
      payload: [1]
    };
    const expectedLast30days = [1];
    expect(referralListMgmReducer(initialState, action).last30days).toEqual(expectedLast30days);
  });
  it('Should update thisMonth transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_UPDATE_THIS_MONTHS,
      payload: [1]
    };
    const expectedThisMonth = [1];
    expect(referralListMgmReducer(initialState, action).thisMonth).toEqual(expectedThisMonth);
  });
  it('Should update custom transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_UPDATE_CUSTOM,
      payload: [1]
    };
    const expectedCustom = [1];
    expect(referralListMgmReducer(initialState, action).custom).toEqual(expectedCustom);
  });
  it('TRANSACTIONS_CLEAN_CLEAR_MGM: should clear all the transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_CLEAN_CLEAR_MGM
    };
    const state = {last7days: [1], today: [2, 3], last30days: [3, 3], thisMonth: [0, 0], custom: [3],
     
    };
    const expected = {last7days: [], today: [], last30days: [], thisMonth: [], custom: [],
    };
    expect(referralListMgmReducer(state, action)).toEqual(expected);
  });
});
