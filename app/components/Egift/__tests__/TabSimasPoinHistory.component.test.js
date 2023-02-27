import React from 'react';
import renderer from 'react-test-renderer';

import TabSimasPoinHistory from '../TabSimasPoinHistory.component';

describe('TabSimasPoinHistory component', () => {
  it('TabSimasPoinHistory: renders correctly', () => {
    const tree = renderer.create(<TabSimasPoinHistory />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
