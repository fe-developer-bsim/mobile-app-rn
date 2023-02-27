import React from 'react';
import renderer from 'react-test-renderer';
import RecentPaymentCard from '../RecentPaymentCard.component';

describe('RecentPaymentCard component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<RecentPaymentCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
