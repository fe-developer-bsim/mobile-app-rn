import React from 'react';
import renderer from 'react-test-renderer';

import EmoneyUpgradeFinalize from '../EmoneyUpgradeFinalize.component';

describe('EmoneyUpgradeFinalize component', () => {
  it('EmoneyUpgradeFinalize: renders correctly', () => {
    const tree = renderer.create(<EmoneyUpgradeFinalize />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
