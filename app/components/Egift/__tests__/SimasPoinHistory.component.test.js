import React from 'react';
import renderer from 'react-test-renderer';

import SimasPoinHistory from '../SimasPoinHistory.component';

describe('SimasPoinHistory component', () => {
  it('SimasPoinHistory: renders correctly', () => {
    const tree = renderer.create(<SimasPoinHistory />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
