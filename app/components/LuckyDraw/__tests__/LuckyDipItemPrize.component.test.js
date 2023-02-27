import React from 'react';
import renderer from 'react-test-renderer';

import LuckyDipItemPrize from '../LuckyDipItemPrize.component';

describe('LuckyDipItemPrize component', () => {
  it('LuckyDipItemPrize: renders correctly', () => {
    const tree = renderer.create(<LuckyDipItemPrize />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
