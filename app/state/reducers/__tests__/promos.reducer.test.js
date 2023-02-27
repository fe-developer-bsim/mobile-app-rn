import promos from '../promos.reducer';
import {PROMO_CHANGE_OFFERS, PROMO_CHANGE_BANNERS, PROMO_CHANGE_PUSH_NOTIFICATION_ROUTE, PROMO_RESET} from '../../actions/index.actions';

describe('Reducer: promos', () => {
  const defaultState = {offers: [], banners: [], navigateOnPushClicked: []};
  it('Should return default state by default', () => {
    expect(promos(undefined, '')).toEqual(defaultState);
  });
  it('Should change bannerData when PROMO_CHANGE_BANNERS is fired', () => {
    const expected = {offers: [], banners: [1], navigateOnPushClicked: []};
    expect(promos(undefined, {type: PROMO_CHANGE_BANNERS, payload: [1]})).toEqual(expected);
  });
  it('Should change offersData when PROMO_CHANGE_OFFERS is fired', () => {
    const expected = {offers: [1], banners: [], navigateOnPushClicked: []};
    expect(promos(undefined, {type: PROMO_CHANGE_OFFERS, payload: [1]})).toEqual(expected);
  });
  it('Should change pushnotification status when PROMO_CHANGE_PUSH_NOTIFICATION_ROUTE is fired', () => {
    const expected = {offers: [], banners: [], navigateOnPushClicked: [{a: 3}]};
    expect(promos(undefined, {type: PROMO_CHANGE_PUSH_NOTIFICATION_ROUTE, payload: [{a: 3}]})).toEqual(expected);
  });
  it('Should reset when PROMO_RESET is fired', () => {
    const expected = {offers: [], banners: [], navigateOnPushClicked: []};
    expect(promos(undefined, {type: PROMO_RESET, payload: true})).toEqual(expected);
  });
});
