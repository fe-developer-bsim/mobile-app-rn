import React from 'react';
import renderer from 'react-test-renderer';
import AlfacartCheckout from '../AlfacartCheckout.component';

describe('AlfacartCheckout component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<AlfacartCheckout />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
