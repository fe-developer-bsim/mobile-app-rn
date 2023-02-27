import {SAVE_DEVICE_DATA, CLEAR_DEVICE_DATA} from '../actions/index.actions';

export default function deviceData (state = {}, action) {
  switch (action.type) {
  case SAVE_DEVICE_DATA: {
    const deviceData = action.payload;
    return deviceData;
  }
  case CLEAR_DEVICE_DATA: {
    return {};
  }
  default: 
    return state;
  }
}
