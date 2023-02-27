import {GEO_LOCATION_SAVE, GEO_LOCATION_CLEAR} from '../actions/index.actions';

export default function appInitKeys (state = {}, action) {
  switch (action.type) {
  case GEO_LOCATION_SAVE: {
    return action.payload;
  }
  case GEO_LOCATION_CLEAR: {
    return {};
  }
  default: {
    return state;
  }
  }
}
