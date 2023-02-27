import React from 'react';
import renderer from 'react-test-renderer';
import AccountInfoItem from '../AppLogo.component';

describe('AccountInfoItem component', () => {
  it('renders correctly', () => {
    const accountInfo = {};
    const tree = renderer.create(<AccountInfoItem accountInfo={accountInfo} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
