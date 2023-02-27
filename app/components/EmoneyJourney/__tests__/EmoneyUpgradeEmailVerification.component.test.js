import React from 'react';
import renderer from 'react-test-renderer';
jest.mock('lodash');

import EmoneyUpgradeEmailVerification from '../EmoneyUpgradeEmailVerification.component';

describe('EmoneyUpgradeEmailVerification component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<EmoneyUpgradeEmailVerification />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
