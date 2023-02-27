import React from 'react';
import renderer from 'react-test-renderer';

import PaymentHistory from '../PaymentHistory.component';

jest.mock('lodash');

describe('PaymentHistory Component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(
      <PaymentHistory/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
