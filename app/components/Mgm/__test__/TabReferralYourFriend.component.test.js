import React from 'react';
import renderer from 'react-test-renderer';

import TabReferralYourFriend from '../TabReferralYourFriend.component';

describe('TabReferralYourFriend component', () => {
  it('TabReferralYourFriend: renders correctly', () => {
    const tree = renderer.create(<TabReferralYourFriend />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
