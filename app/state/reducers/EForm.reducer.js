import {SAVE_EFORM_DATA, CLEAR_EFORM_DATA, SAVE_FORM_ID, SAVE_EFORM_DUKCAPIL, SAVE_EFORM_CORE_DATA, SAVE_NTB_DATA} from '../actions/index.actions';
import result from 'lodash/result';

const defaultState = {};

export default function EForm (state = defaultState, action) {
  switch (action.type) {
  case SAVE_FORM_ID: 
  {
    const formid = result(action, 'payload.formid', '');
    const code = result(action, 'payload.code', '');
    return {...state, formid, code};
  }
  case SAVE_EFORM_DATA:
  {
    const {dataDukcapil, dataCore, formid, code} = state;
    return {...action.payload, dataDukcapil, dataCore, formid, code};
  }
  case SAVE_EFORM_DUKCAPIL:
  {
    return {...state, dataDukcapil: action.payload};
  }
  case SAVE_EFORM_CORE_DATA:
  {
    return {...state, dataCore: action.payload};
  }
  case SAVE_NTB_DATA: 
  {
    return {...state, data: action.payload};
  }
  case CLEAR_EFORM_DATA:
  {
    return defaultState;
  }
  default:
  {
    return state;
  }
  }
}
