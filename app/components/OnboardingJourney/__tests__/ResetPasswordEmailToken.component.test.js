import React from 'react';
import renderer from 'react-test-renderer';
jest.mock('lodash');

import ResetPasswordEmailToken from '../ResetPasswordEmailToken.component';

describe('ResetPasswordEmailToken component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<ResetPasswordEmailToken />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
