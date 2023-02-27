import transactions from '../transactions.reducer';
import * as actions from '../../actions/index.actions';


describe('Reducer: transactions', () => {
  const initialState = {last10: [], lastMonth: [], last2Months: [], last3Months: [], today: [], selectDateRange: [], currentMonth: [],
    filters: {
      selectedFilter: {value: 'currentMonth', label: 'Current Month'},
    }
  };
  it('Should return default state by default', () => {
    expect(transactions(undefined, {})).toEqual(initialState);
  });

  it('Should update last10 transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_UPDATE_LAST_10,
      payload: [2]
    };
    const expectedLast10 = [2];
    expect(transactions(initialState, action).last10).toEqual(expectedLast10);
  });
  it('Should update lastMonth transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_UPDATE_LAST_MONTH,
      payload: [1]
    };
    const expectedLastMonth = [1];
    expect(transactions(initialState, action).lastMonth).toEqual(expectedLastMonth);
  });
  it('Should update last2Months transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_UPDATE_LAST_2_MONTHS,
      payload: [1]
    };
    const expectedLast2Months = [1];
    expect(transactions(initialState, action).last2Months).toEqual(expectedLast2Months);
  });
  it('Should update last3Months transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_UPDATE_LAST_3_MONTHS,
      payload: [1]
    };
    const expectedLast3Months = [1];
    expect(transactions(initialState, action).last3Months).toEqual(expectedLast3Months);
  });
  it('Should update today transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_UPDATE_TODAY,
      payload: [1]
    };
    const expectedToday = [1];
    expect(transactions(initialState, action).today).toEqual(expectedToday);
  });
  it('Should update current month transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_UPDATE_CURRENT_MONTH,
      payload: [1]
    };
    const expectedCurrentMonth = [1];
    expect(transactions(initialState, action).currentMonth).toEqual(expectedCurrentMonth);
  });
  it('Should update selected date range transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_UPDATE_DATE_RANGE,
      payload: [1]
    };
    const expectedDateRange = [1];
    expect(transactions(initialState, action).selectDateRange).toEqual(expectedDateRange);
  });
  it('TRANSACTIONS_UPDATE_FILTERS: should update filters', () => {
    const action = {
      type: actions.TRANSACTIONS_UPDATE_FILTERS,
      payload: {
        selectedFilter: {value: 'abc', label: 'abc'},
      }
    };
    const state = {last10: [1], lastMonth: [2, 3], last2Months: [0, 0], last3Months: [3], today: [1, 1], selectDateRange: [2, 2], currentMonth: [3, 3],
      filters: {
        value: 'currentMonth',
        selectedFilter: {value: 'abc', label: 'abc'},
        label: 'Current Month',
      }
    };
    const expected = {'filters':
    {
      'label': 'Current Month',
      'selectedFilter': {
        'label': 'abc', 'value': 'abc'
      },
      'value': 'currentMonth'
    }, 'last10': [1], 'last2Months': [0, 0], 'last3Months': [3], 'lastMonth': [2, 3], 'today': [1, 1], 'selectDateRange': [2, 2], 'currentMonth': [3, 3]};
    expect(transactions(state, action)).toEqual(expected);
  });
  it('TRANSACTIONS_CLEAR: should clear all the transactions keeping filters', () => {
    const action = {
      type: actions.TRANSACTIONS_CLEAR
    };
    const state = {last10: [1], lastMonth: [2, 3], last2Months: [0, 0], last3Months: [3], today: [1, 1], selectDateRange: [2, 2], currentMonth: [3, 3],
      filters: {
        selectedFilter: {value: 'abc', label: 'abc'},
      }
    };
    const expected = {last10: [], lastMonth: [], last2Months: [], last3Months: [], today: [], selectDateRange: [], currentMonth: [],
      filters: {
        selectedFilter: {value: 'abc', label: 'abc'},
      }
    };
    expect(transactions(state, action)).toEqual(expected);
  });
  it('TRANSACTIONS_CLEAN_CLEAR: should clear all the transactions', () => {
    const action = {
      type: actions.TRANSACTIONS_CLEAN_CLEAR
    };
    const state = {last10: [1], lastMonth: [2, 3], last2Months: [0, 0], last3Months: [3], today: [1, 1], selectDateRange: [2, 2], currentMonth: [3, 3],
      filters: {
        selectedFilter: {value: 'abc', label: 'abc'},
      }
    };
    const expected = {last10: [], lastMonth: [], last2Months: [], last3Months: [], today: [], selectDateRange: [], currentMonth: [],
      filters: {
        selectedFilter: {
          value: 'currentMonth', label: 'Current Month'
        }
      }
    };
    expect(transactions(state, action)).toEqual(expected);
  });
});
