import React from 'react';
import renderer from 'react-test-renderer';
jest.mock('lodash');

import OTPComponent from '../EmailOtp.component';

describe('Email OTP component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<OTPComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
