import React from 'react';
import renderer from 'react-test-renderer';
import LinkCreditCard from '../LinkCreditCard.component';

describe('LinkCreditCard component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LinkCreditCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
