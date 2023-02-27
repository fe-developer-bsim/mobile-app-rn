import React from 'react';
import renderer from 'react-test-renderer';

import ShareReferralCode from '../ShareReferralCodeMgm.component';

describe('ShareReferralCode component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ShareReferralCode />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
