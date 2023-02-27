import {
  SET_CURRENT_MERCHANT
} from '../actions/index.actions';

const initState = {
  id: '',
  name: ''
};

function currentMerchant (state = initState, action) {
  const {type, payload} = action;

  switch (type) {
  case SET_CURRENT_MERCHANT:
    return {
      id: payload.id,
      name: payload.name
    };

  default:
    return state;
  }
}

export default currentMerchant;