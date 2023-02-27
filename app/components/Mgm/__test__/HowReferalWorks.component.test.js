import React from 'react';
import renderer from 'react-test-renderer';

import HowReferralWorks from '../HowReferralWorks.component';

describe('HowReferralWorks component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<HowReferralWorks />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
