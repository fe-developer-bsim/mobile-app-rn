import React from 'react';
import renderer from 'react-test-renderer';
import ShareReferralCodeComponent from '../ShareRefferalCode.component';

describe('ShareReferralCode component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ShareReferralCodeComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
