import React from 'react';
import renderer from 'react-test-renderer';
import AccountMenu from '../AccountSettings.component';

describe('AccountMenu component', () => {
  it('renders correctly', () => {
    const accountInfo = {};
    const tree = renderer.create(<AccountMenu accountInfo={accountInfo} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
