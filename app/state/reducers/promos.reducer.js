import {PROMO_CHANGE_OFFERS, PROMO_CHANGE_BANNERS, PROMO_CHANGE_PUSH_NOTIFICATION_ROUTE, PROMO_RESET} from '../actions/index.actions';

const defaultState = {offers: [], banners: [], navigateOnPushClicked: []};
export default function promos (state = defaultState, action) {
  switch (action.type) {
  case PROMO_CHANGE_OFFERS: {
    const newOffers = action.payload;
    return {...state, offers: [...newOffers]};
  }
  case PROMO_CHANGE_BANNERS: {
    const newBanners = action.payload;
    return {...state, banners: [...newBanners]};
  }
  case PROMO_CHANGE_PUSH_NOTIFICATION_ROUTE: {
    const navigateTo = action.payload;
    return {...state, navigateOnPushClicked: navigateTo};
  }
  case PROMO_RESET: {
    return defaultState;
  }
  default:
    return state;
  }
}
