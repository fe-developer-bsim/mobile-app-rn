import saveResultStockAlfa from '../saveResultStockAlfa.reducer';
import {SAVE_SALEPRODUCT_ALFACART, CLEAR_SALEPRODUCT_ALFACART} from '../../actions/index.actions';

describe('Reducer: subDistrict', () => {
  xit('Should return default state by default', () => {
    expect(saveResultStockAlfa(undefined, {})).toEqual([]);
  });
  xit('Should save subDistrict list', () => {
    expect(saveResultStockAlfa([], {type: SAVE_SALEPRODUCT_ALFACART, payload: ['Sub 1', 'Sub 2']})).toEqual(['Sub 1', 'Sub 2']);
  });
  xit('Should clear subDistrict list', () => {
    expect(saveResultStockAlfa(['Sub 1', 'Sub 2'], {type: CLEAR_SALEPRODUCT_ALFACART})).toEqual([]);
  });
});
