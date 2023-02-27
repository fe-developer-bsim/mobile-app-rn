import React from 'react';
import renderer from 'react-test-renderer';

import SimasPoinLogin from '../SimasPoinLogin.component';

describe('SimasPoinLogin component', () => {
  xit('SimasPoinLogin: renders correctly', () => {
    const tree = renderer.create(<SimasPoinLogin />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
