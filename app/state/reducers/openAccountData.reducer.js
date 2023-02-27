import {SAVE_OPEN_ACCOUNT_DATA, CLEAR_OPEN_ACCOUNT_DATA, SAVE_OPEN_ACCOUNT_DATA_NAME,
  SAVE_OPEN_ACCOUNT_DATA_KTP, SAVE_OPEN_ACCOUNT_DATA_NPWP, SAVE_OPEN_ACCOUNT_DATA_ID}
  from '../actions/index.actions';

export default function openAccountData (state = {}, action) {
  switch (action.type) {
  case SAVE_OPEN_ACCOUNT_DATA: {
    return {...state, ...action.payload};
  }
  case SAVE_OPEN_ACCOUNT_DATA_NAME: {
    return {...state, name: action.payload};
  }
  case SAVE_OPEN_ACCOUNT_DATA_KTP: {
    return {...state, ktpImage: action.payload};
  }
  case SAVE_OPEN_ACCOUNT_DATA_NPWP: {
    return {...state, npwpImage: action.payload};
  }
  case SAVE_OPEN_ACCOUNT_DATA_ID: {
    return {...state, id: action.payload};
  }
  case CLEAR_OPEN_ACCOUNT_DATA: {
    return {};
  }
  default: {
    return state;
  }
  }
}
