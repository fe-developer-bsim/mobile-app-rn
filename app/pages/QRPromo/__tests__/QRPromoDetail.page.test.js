import React from 'react';
import renderer from 'react-test-renderer';
import QRPromoDetail from '../QRPromoDetail.page';

describe('QRPromoDetail', () => {
  it('renders correctly', () => {
    const navigation = {state: {
      params: {
        merchant: {
          latitude: 10,
          longitude: 10
        }
      }
    }};
    const tree = renderer.create(<QRPromoDetail navigation={navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
