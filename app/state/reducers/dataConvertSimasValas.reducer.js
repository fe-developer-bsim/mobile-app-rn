import {SAVE_DATA_CONVERT_SIMAS_VALAS, CLEAR_DATA_CONVERT_SIMAS_VALAS} from '../actions/index.actions';

export default function dataConvertSimasValas (state = {}, action) {
  switch (action.type) {
  case SAVE_DATA_CONVERT_SIMAS_VALAS: {
    const dataConvertSimasValas = action.payload;
    return dataConvertSimasValas;
  }
  case CLEAR_DATA_CONVERT_SIMAS_VALAS: {
    return {};
  }
  default:
    return state;
  }
}
