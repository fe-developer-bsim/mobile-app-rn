import {SAVE_UTM_AND_DATA_LINK, CLEAR_UTM_AND_DATA_LINK} from '../actions/index.actions';

export default function appInitKeys (state = {}, action) {
  switch (action.type) {
  case SAVE_UTM_AND_DATA_LINK: {
    return action.payload;
  }
  case CLEAR_UTM_AND_DATA_LINK: {
    return {};
  }
  default: {
    return state;
  }
  }
}
