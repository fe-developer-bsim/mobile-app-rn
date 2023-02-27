import {SIMOBI_MIGRATION_CODE, CLEAR_SIMOBI_MIGRATION_CODE} from '../actions/index.actions';

export default function encryptedToken (state = '', action) {
  switch (action.type) {
  case SIMOBI_MIGRATION_CODE: {
    return action.payload;
  }
  case CLEAR_SIMOBI_MIGRATION_CODE: {
    return '';
  }
  default: {
    return state;
  }
  }
}
