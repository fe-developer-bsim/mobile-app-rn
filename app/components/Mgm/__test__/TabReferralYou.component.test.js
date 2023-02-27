import React from 'react';
import renderer from 'react-test-renderer';

import TabReferralYou from '../TabReferralYou.component';

describe('TabReferralYou component', () => {
  it('TabReferralYou: renders correctly', () => {
    const tree = renderer.create(<TabReferralYou />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
