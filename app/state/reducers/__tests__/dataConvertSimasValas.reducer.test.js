import dataConvertSimasValas from '../dataConvertSimasValas.reducer';
import {SAVE_DATA_CONVERT_SIMAS_VALAS, CLEAR_DATA_CONVERT_SIMAS_VALAS} from '../../actions/index.actions';

describe('Reducer: dataConvertSimasValas', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_DATA_CONVERT_SIMAS_VALAS,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(dataConvertSimasValas([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_DATA_CONVERT_SIMAS_VALAS
    };
    const expectedResult = {};
    expect(dataConvertSimasValas([], action)).toEqual(expectedResult);
  });

});

