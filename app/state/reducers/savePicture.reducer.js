import {SAVE_PICTURE, CLEAR_PICTURE} from '../actions/index.actions';

export default function savePicture (state = {}, action) {
  switch (action.type) {
  case SAVE_PICTURE: {
    const userMetaData = action.payload;
    return userMetaData;
  }
  case CLEAR_PICTURE: {
    return {};
  }
  default:
    return state;
  }
}
