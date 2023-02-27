import React from 'react';
import renderer from 'react-test-renderer';

import CardLessWithdrawalAccItem from '../CardLessWithdrawalAccItem.component';

describe('Carousel component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CardLessWithdrawalAccItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
