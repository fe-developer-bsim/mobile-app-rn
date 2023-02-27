import React from 'react';
import renderer from 'react-test-renderer';
import merchantLocation from '../merchantLocation.page';

describe('merchantLocation', () => {
  it('renders correctly', () => {
    const navigation = {state: {
      params: {
        merchant: {
          latitude: 10,
          longitude: 10
        }
      }
    }};
    const tree = renderer.create(<merchantLocation navigation={navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
