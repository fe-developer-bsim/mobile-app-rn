import React from 'react';
import renderer from 'react-test-renderer';
import BillerItem from '../BillerItem.component';

describe('BillerItem component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<BillerItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
