import React from 'react';
import renderer from 'react-test-renderer';
import ChangeDeviceConfirm from '../ChangeDeviceConfirm.component';

describe('AccountMenu component', () => {
  it('renders correctly', () => {
    const accountInfo = {};
    const tree = renderer.create(<ChangeDeviceConfirm accountInfo={accountInfo} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
