import transactions from '../transactionsEmoney.reducer';
import * as actions from '../../actions/index.actions';


describe('Reducer: transactions', () => {
  const initialState = {last10: [], lastMonth: [], last2Months: [], last3Months: [],
    filters: {
      selectedRange: {value: 'lastMonth', label: 'Last Month'},
    }
  };
  it('Should return default state by default', () => {
    expect(transactions(undefined, {})).toEqual(initialState);
  });

  it('Should update last10 transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_EMONEY_UPDATE_LAST_10,
      payload: [2]
    };
    const expectedLast10 = [2];
    expect(transactions(initialState, action).last10).toEqual(expectedLast10);
  });
  it('Should update lastMonth transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_EMONEY_UPDATE_LAST_MONTH,
      payload: [1]
    };
    const expectedLastMonth = [1];
    expect(transactions(initialState, action).lastMonth).toEqual(expectedLastMonth);
  });
  it('Should update last2Months transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_EMONEY_UPDATE_LAST_2_MONTHS,
      payload: [1]
    };
    const expectedLast2Months = [1];
    expect(transactions(initialState, action).last2Months).toEqual(expectedLast2Months);
  });
  it('Should update last3Months transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_EMONEY_UPDATE_LAST_3_MONTHS,
      payload: [1]
    };
    const expectedLast3Months = [1];
    expect(transactions(initialState, action).last3Months).toEqual(expectedLast3Months);
  });
  it('TRANSACTIONS_UPDATE_FILTERS: should update filters', () => {
    const action = {
      type: actions.TRANSACTIONS_EMONEY_UPDATE_FILTERS,
      payload: {
        selectedRange: {value: 'abc', label: 'abc'},
      }
    };
    const state = {last10: [1], lastMonth: [2, 3], last2Months: [0, 0], last3Months: [3],
      filters: {
        value: 'lastMonth',
        selectedRange: {value: 'abc', label: 'abc'},
        label: 'Last Month',
      }
    };
    const expected = {'filters':
    {
      'label': 'Last Month',
      'selectedRange': {
        'label': 'abc', 'value': 'abc'
      },
      'value': 'lastMonth'
    }, 'last10': [1], 'last2Months': [0, 0], 'last3Months': [3], 'lastMonth': [2, 3]};
    expect(transactions(state, action)).toEqual(expected);
  });
  it('TRANSACTIONS_CLEAR: should clear all the transactions keeping filters', () => {
    const action = {
      type: actions.TRANSACTIONS_EMONEY_CLEAR
    };
    const state = {last10: [1], lastMonth: [2, 3], last2Months: [0, 0], last3Months: [3],
      filters: {
        selectedRange: {value: 'abc', label: 'abc'},
      }
    };
    const expected = {last10: [], lastMonth: [], last2Months: [], last3Months: [],
      filters: {
        selectedRange: {value: 'abc', label: 'abc'},
      }
    };
    expect(transactions(state, action)).toEqual(expected);
  });
  it('TRANSACTIONS_CLEAN_CLEAR: should clear all the transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_EMONEY_CLEAN_CLEAR
    };
    const state = {last10: [1], lastMonth: [2, 3], last2Months: [0, 0], last3Months: [3],
      filters: {
        selectedRange: {value: 'abc', label: 'abc'},
      }
    };
    const expected = {last10: [], lastMonth: [], last2Months: [], last3Months: [],
      filters: {
        selectedRange: {
          value: 'lastMonth', label: 'Last Month'
        }
      }
    };
    expect(transactions(state, action)).toEqual(expected);
  });
});
