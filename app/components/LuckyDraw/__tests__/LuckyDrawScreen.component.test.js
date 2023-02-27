import React from 'react';
import renderer from 'react-test-renderer';

import LuckyDrawScreen from '../LuckyDrawScreen.component';

describe('LuckyDrawScreen component', () => {
  it('LuckyDrawScreen: renders correctly', () => {
    const tree = renderer.create(<LuckyDrawScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
