import {GEO_LOCATION_SIMASCATALOG_SAVE, GEO_LOCATION_SIMASCATALOG_CLEAR} from '../actions/index.actions';

export default function appInitKeys (state = '', action) {
  switch (action.type) {
  case GEO_LOCATION_SIMASCATALOG_SAVE: {
    return action.payload;
  }
  case GEO_LOCATION_SIMASCATALOG_CLEAR: {
    return '';
  }
  default: {
    return state;
  }
  }
}
