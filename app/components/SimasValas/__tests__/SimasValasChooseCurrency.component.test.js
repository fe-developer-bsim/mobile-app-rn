import React from 'react';
import renderer from 'react-test-renderer';

import SimasValasChooseCurrency from '../SimasValasChooseCurrency.component';

describe('SimasValasChooseCurrency component', () => {
  it('SimasValasChooseCurrency: renders correctly', () => {
    const tree = renderer.create(<SimasValasChooseCurrency />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
