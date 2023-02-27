import React from 'react';
import renderer from 'react-test-renderer';
jest.mock('lodash');

import SmsOtpComponent from '../SmsOtpComponent.component';

describe('SmsOtpComponent component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SmsOtpComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
