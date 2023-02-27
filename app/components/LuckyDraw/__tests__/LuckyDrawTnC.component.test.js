import React from 'react';
import renderer from 'react-test-renderer';

import LuckyDrawTnC from '../LuckyDrawTnC.component';

jest.mock('../LuckyDrawTnC.component');
describe('LuckyDrawTnC component', () => {
  it('LuckyDrawTnC: renders correctly', () => {
    const tree = renderer.create(<LuckyDrawTnC />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
