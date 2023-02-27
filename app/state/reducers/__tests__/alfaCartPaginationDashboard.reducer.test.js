import simasPoinReducer from '../alfaCartPaginationDashboard.reducer';
import {SAVE_ALFA_PAGINATION_DASHBOARD, DELETE_ALFA_PAGINATION_DASHBOARD} from '../../actions/index.actions';

describe('Reducer: simasPoinReducer', () => {
  it('Should return default state by default', () => {
    expect(simasPoinReducer(undefined, {})).toEqual({});
  });
  it('Should save alfacart', () => {
    expect(simasPoinReducer('', {type: SAVE_ALFA_PAGINATION_DASHBOARD, payload: '123'})).toEqual('123');
  });
  it('Should clear alfacart', () => {
    expect(simasPoinReducer([], {type: DELETE_ALFA_PAGINATION_DASHBOARD})).toEqual([]);
  });
});
